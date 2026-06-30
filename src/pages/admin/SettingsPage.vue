<script setup lang="ts">
/**
 * Admin SettingsPage (RA.16) — server "Settings" administration, ported 1:1 from
 * the deleted React `SettingsPage` onto the `@phlix/ui` primitives. Reads the
 * grouped `/api/v1/admin/settings` map (9 schema groups / ~19 keys), renders each
 * group as a tab of fields typed from the server `types` map (bool → Switch,
 * int/float → native number input, string → native text/password input, and an
 * enumerated string → Select), tracks per-key dirty state, coerces each changed
 * value to its schema type, and PUTs only the changed keys. Per-field validation
 * errors from a 400 response render inline; success/error otherwise surface as
 * toasts. Each save refetches the resolved settings + overridden list (matching
 * the React source).
 */
import { ref, computed, reactive, onMounted, watch, inject, type ComputedRef } from 'vue';
import { ApiClient, ApiError } from '../../api/client';
import { errMessage } from '../../api/errors';
import { LocalStorageTokenStore } from '../../api/tokenStore';
import { AdminSettingsApi } from '../../api/admin/settings';
import { AdminMetadataSourcesApi } from '../../api/admin/metadata-sources';
import { useToastStore } from '../../stores/useToastStore';
import SourcePriorityEditor from '../../components/SourcePriorityEditor.vue';
import type { ProviderPriority } from '../../types/server-settings';
import Badge from '../../components/ui/Badge.vue';
import Button from '../../components/ui/Button.vue';
import Select from '../../components/ui/Select.vue';
import Switch from '../../components/ui/Switch.vue';
import Tabs, { type TabItem } from '../../components/ui/Tabs.vue';
import Skeleton from '../../components/ui/Skeleton.vue';
import EmptyState from '../../components/ui/EmptyState.vue';
import type { SelectOptionInput } from '../../components/ui/listbox';

const props = defineProps<{
  /** Inject a pre-built API client for tests; otherwise one is built from `apiBase`. */
  client?: ApiClient;
}>();

const injectedApiBase = inject<string | ComputedRef<string> | undefined>('apiBase', '');
const apiBase = computed(() =>
  typeof injectedApiBase === 'string' ? injectedApiBase : injectedApiBase?.value ?? '',
);
const apiClient =
  props.client ?? new ApiClient({ baseUrl: apiBase.value, tokenStore: new LocalStorageTokenStore() });
const api = new AdminSettingsApi(apiClient);
const sourcesApi = new AdminMetadataSourcesApi(apiClient);
const toasts = useToastStore();

/**
 * The two object/enum metadata keys that drive the bespoke Metadata-tab UI
 * (the per-media-type {@link SourcePriorityEditor} + the genres-mode select).
 * They are served by the same `/api/v1/admin/settings` map (the shared schema
 * types them `object`→`json` and `string` respectively) but cannot use the
 * generic string-coercing form path — they are tracked in their own state and
 * sent back through the same PUT.
 */
const PROVIDER_PRIORITY_KEY = 'metadata.provider_priority';
const GENRES_MODE_KEY = 'metadata.genres_mode';

/** Options for the genres-mode select (mirrors the shared schema `enum`). */
const GENRES_MODE_OPTIONS: ReadonlyArray<SelectOptionInput> = [
  { value: 'first', label: 'First — genres from the first source that supplies any' },
  { value: 'union', label: 'Union — merge distinct genres from every source' },
];

/** Tab definitions — order must match the spec. */
const TABS = [
  { id: 'access', label: 'Access' },
  { id: 'transcoding', label: 'Transcoding' },
  { id: 'metadata', label: 'Metadata' },
  { id: 'markers', label: 'Markers' },
  { id: 'subtitles', label: 'Subtitles' },
  { id: 'discovery', label: 'Discovery' },
  { id: 'trickplay', label: 'Trickplay' },
  { id: 'newsletter', label: 'Newsletter' },
  { id: 'port-forward', label: 'Port Forward' },
  { id: 'scrobblers', label: 'Scrobblers' },
] as const;

type TabId = (typeof TABS)[number]['id'];

/** Tabs in the shared `ui/Tabs` primitive's `{ value, label }` shape. */
const TAB_ITEMS: TabItem[] = TABS.map((t) => ({ value: t.id, label: t.label }));

/** Keys that belong to each tab group. */
const TAB_KEYS: Record<TabId, string[]> = {
  access: ['auth.signup_mode'],
  transcoding: ['hwaccel.enabled', 'hwaccel.prefer_hardware', 'hwaccel.probe_timeout'],
  metadata: ['tmdb.api_key', 'metadata.provider_priority', 'metadata.genres_mode'],
  markers: ['marker_detection.similarity_threshold', 'marker_detection.intro_max_duration'],
  subtitles: ['subtitles.enabled', 'subtitles.default_language', 'subtitles.burn_in_by_default'],
  discovery: ['discovery.discovery_port'],
  trickplay: ['trickplay.enabled', 'trickplay.interval_seconds'],
  newsletter: ['newsletter.enabled', 'newsletter.send_hour'],
  'port-forward': ['port-forward.port_forwarding.upnp_enabled'],
  scrobblers: ['trakt.client_id', 'trakt.client_secret', 'trakt.redirect_uri'],
};

/** Constraints for number fields (min/max from schema). */
const NUMERIC_CONSTRAINTS: Record<string, { min?: number; max?: number }> = {
  'hwaccel.probe_timeout': { min: 0 },
  'marker_detection.similarity_threshold': { min: 0, max: 1 },
  'marker_detection.intro_max_duration': { min: 0 },
  'discovery.discovery_port': { min: 1, max: 65535 },
  'trickplay.interval_seconds': { min: 1 },
  'newsletter.send_hour': { min: 0, max: 23 },
};

/** Fields that should render as a password input. */
const PASSWORD_FIELDS = new Set(['tmdb.api_key', 'trakt.client_secret']);

/**
 * String keys with a fixed enumerated set of values — rendered as a Select.
 * (A strict improvement over the React source's free-text input for these.)
 */
const SELECT_OPTIONS: Record<string, ReadonlyArray<SelectOptionInput>> = {
  'auth.signup_mode': [
    { value: 'open', label: 'Open — anyone can sign up' },
    { value: 'approval', label: 'Require admin approval' },
    { value: 'disabled', label: 'Disabled — no new signups' },
  ],
  'subtitles.default_language': [
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Spanish' },
    { value: 'fr', label: 'French' },
    { value: 'de', label: 'German' },
    { value: 'it', label: 'Italian' },
    { value: 'ja', label: 'Japanese' },
  ],
};

/** Explicit, unambiguous labels for keys whose derived name is unclear. */
const FIELD_LABELS: Record<string, string> = {
  'auth.signup_mode': 'Signup mode',
  'tmdb.api_key': 'TMDB API Key',
  'metadata.provider_priority': 'Metadata source priority',
  'metadata.genres_mode': 'Genres mode',
  'trakt.client_id': 'Trakt Client ID',
  'trakt.client_secret': 'Trakt Client Secret',
  'trakt.redirect_uri': 'Trakt Redirect URI',
};

/** Inline help shown under a field. */
const FIELD_HELP: Record<string, string> = {
  'auth.signup_mode':
    'Controls who can create an account. "Open" lets anyone register and sign in immediately. "Require admin approval" creates accounts in a pending state — review them in the Users page approval queue before they can sign in. "Disabled" turns off new signups entirely.',
  'tmdb.api_key':
    'Your TMDB (The Movie Database) API key — get one free at themoviedb.org → Settings → API (v3 auth). Used to fetch movie & TV metadata, posters, and external IDs.',
  'trakt.client_id':
    'Register an application at trakt.tv/oauth/applications to get a client ID and secret. Saving here overrides the TRAKT_CLIENT_ID environment variable.',
  'trakt.client_secret':
    'The client secret paired with your Trakt client ID. Overrides the TRAKT_CLIENT_SECRET environment variable.',
  'trakt.redirect_uri':
    "Must exactly match the redirect URI registered in your Trakt app — this server's /api/v1/oauth/trakt/callback URL.",
  'metadata.provider_priority':
    'For each media type, the ordered list of metadata sources the matcher walks per field — the first source supplying a non-empty value wins. Reorder with the up/down buttons; remove or add sources per type. A media type left empty falls back to the server default.',
  'metadata.genres_mode':
    'How genres are combined across sources. "First" takes the genres from the first source in the priority order that supplies any; "Union" merges the distinct genres from every contributing source.',
};

function getDisplayName(key: string): string {
  if (FIELD_LABELS[key]) return FIELD_LABELS[key];
  const tail = key.split('.').pop() ?? key;
  return tail.replace(/_/g, ' ').replace(/\b[a-z]/g, (c) => c.toUpperCase());
}

function isOverridden(key: string): boolean {
  return overridden.value.includes(key);
}

// ── Settings data ─────────────────────────────────────────────────────────────
const settings = ref<Record<string, unknown>>({});
const overridden = ref<string[]>([]);
const types = ref<Record<string, string>>({});

// ── UI state ──────────────────────────────────────────────────────────────────
const activeTab = ref<string>('access');
const loading = ref(true);
const error = ref<string | null>(null);
const submitting = ref(false);
const fieldErrors = ref<Record<string, string>>({});
const showPassword = reactive<Record<string, boolean>>({});

// ── Form state ────────────────────────────────────────────────────────────────
const formValues = reactive<Record<string, string>>({});
const dirty = reactive<Record<string, boolean>>({});

// ── Metadata tab bespoke state (provider_priority object + genres_mode) ─────────
/** Available metadata-source names (built-ins + plugin sources) for the editors. */
const availableSources = ref<string[]>([]);
/** Working copy of the provider_priority object (mediaType → ordered source list). */
const providerPriority = ref<ProviderPriority>({});
/** Working copy of the genres_mode enum. */
const genresMode = ref<string>('first');

const hasAnyChanges = computed(() => Object.values(dirty).some(Boolean));
const activeKeys = computed<string[]>(() => TAB_KEYS[activeTab.value as TabId] ?? []);

/** The media types present in the provider_priority object, in a stable order. */
const providerTypes = computed<string[]>(() => Object.keys(providerPriority.value));

/** Narrow an unknown into the provider_priority shape (mediaType → string[]). */
function asProviderPriority(v: unknown): ProviderPriority {
  if (typeof v !== 'object' || v === null || Array.isArray(v)) return {};
  const out: ProviderPriority = {};
  for (const [type, list] of Object.entries(v as Record<string, unknown>)) {
    out[type] = Array.isArray(list) ? list.filter((s): s is string => typeof s === 'string') : [];
  }
  return out;
}

function syncFormValues(source: Record<string, unknown>): void {
  for (const key of Object.keys(formValues)) delete formValues[key];
  for (const [key, val] of Object.entries(source)) {
    // The bespoke metadata keys are object/enum-shaped and have their own
    // editors + state — never stringify them into the generic text formValues.
    if (key === PROVIDER_PRIORITY_KEY || key === GENRES_MODE_KEY) continue;
    formValues[key] = String(val ?? '');
  }
}

/** Seed the bespoke Metadata-tab state from the loaded settings map. */
function syncMetadataState(source: Record<string, unknown>): void {
  providerPriority.value = asProviderPriority(source[PROVIDER_PRIORITY_KEY]);
  const mode = source[GENRES_MODE_KEY];
  genresMode.value = typeof mode === 'string' && mode !== '' ? mode : 'first';
}

function clearDirty(): void {
  for (const key of Object.keys(dirty)) delete dirty[key];
}

async function loadSettings(): Promise<void> {
  loading.value = true;
  error.value = null;
  try {
    const data = await api.get();
    settings.value = data.settings;
    overridden.value = data.overridden;
    types.value = data.types;
    syncFormValues(data.settings);
    syncMetadataState(data.settings);
    clearDirty();
    fieldErrors.value = {};
  } catch (e) {
    error.value = errMessage(e, 'Failed to load settings.');
    toasts.error(error.value);
  } finally {
    loading.value = false;
  }
}

function fieldType(key: string): string {
  return types.value[key] ?? 'string';
}

function isSelectField(key: string): boolean {
  return SELECT_OPTIONS[key] !== undefined;
}

function selectOptions(key: string): ReadonlyArray<SelectOptionInput> {
  return SELECT_OPTIONS[key] ?? [];
}

function constraintFor(key: string): { min?: number; max?: number } {
  return NUMERIC_CONSTRAINTS[key] ?? {};
}

function setFieldValue(key: string, value: string): void {
  formValues[key] = value;
  dirty[key] = value !== String(settings.value[key] ?? '');
}

function toggleShowPassword(key: string): void {
  showPassword[key] = !showPassword[key];
}

/** Apply a reordered list for one media type and mark the key dirty. */
function setProviderOrder(type: string, order: string[]): void {
  providerPriority.value = { ...providerPriority.value, [type]: order };
  dirty[PROVIDER_PRIORITY_KEY] = true;
}

/** Apply the chosen genres mode and mark the key dirty. */
function setGenresMode(mode: string): void {
  genresMode.value = mode;
  dirty[GENRES_MODE_KEY] = mode !== String(settings.value[GENRES_MODE_KEY] ?? 'first');
}

async function handleSubmit(): Promise<void> {
  submitting.value = true;
  fieldErrors.value = {};
  try {
    const toSave: Record<string, unknown> = {};
    for (const [key, isDirty] of Object.entries(dirty)) {
      if (!isDirty) continue;
      // Bespoke object/enum metadata keys carry their own working state and are
      // sent verbatim (the server types them json/string), NOT string-coerced.
      if (key === PROVIDER_PRIORITY_KEY) {
        toSave[key] = providerPriority.value;
        continue;
      }
      if (key === GENRES_MODE_KEY) {
        toSave[key] = genresMode.value;
        continue;
      }
      const type = types.value[key];
      const value = formValues[key] ?? '';
      if (type === 'bool') {
        toSave[key] = value === 'true' || value === '1';
      } else if (type === 'int') {
        toSave[key] = parseInt(value, 10);
      } else if (type === 'float') {
        toSave[key] = parseFloat(value);
      } else {
        toSave[key] = value;
      }
    }

    const result = await api.save(toSave);
    toasts.success('Settings saved.');
    settings.value = result.settings;
    overridden.value = result.overridden;
    clearDirty();
    syncFormValues(result.settings);
    syncMetadataState(result.settings);
  } catch (e) {
    if (e instanceof ApiError && e.status === 400) {
      const body = e.body as { errors?: Record<string, string> } | undefined;
      if (body?.errors && Object.keys(body.errors).length > 0) {
        fieldErrors.value = body.errors;
        toasts.error('Please fix the validation errors.');
      } else {
        toasts.error(e.message);
      }
    } else {
      toasts.error(e instanceof ApiError ? e.message : 'Failed to save settings.');
    }
  } finally {
    submitting.value = false;
  }
}

/** Guards a single sources fetch (lazy, on first Metadata-tab entry). */
const sourcesLoaded = ref(false);

/**
 * Fetch the selectable source names for the priority editors. Runs LAZILY the
 * first time the Metadata tab is opened, independently of {@link loadSettings}
 * (it does NOT gate the page's loading/error state): a failure is non-fatal —
 * the editors still render the current order, marking any source not in this
 * list as "unknown".
 */
async function loadSources(): Promise<void> {
  if (sourcesLoaded.value) return;
  sourcesLoaded.value = true;
  try {
    availableSources.value = await sourcesApi.listSources();
  } catch {
    availableSources.value = [];
  }
}

/** Lazily fetch the editor source list the first time Metadata is opened. */
watch(activeTab, (tab) => {
  if (tab === 'metadata') void loadSources();
});

onMounted(loadSettings);
</script>

<template>
  <section class="admin-settings" aria-labelledby="settings-heading">
    <header class="admin-settings__head">
      <h1 id="settings-heading" class="admin-settings__title">Settings</h1>
    </header>

    <div v-if="loading" class="admin-settings__skel"><Skeleton variant="text" :lines="6" /></div>

    <EmptyState
      v-else-if="error"
      icon="alert"
      title="Couldn't load settings"
      :description="error"
    >
      <template #actions>
        <Button variant="solid" size="sm" left-icon="rewind" @click="loadSettings">Retry</Button>
      </template>
    </EmptyState>

    <template v-else>
      <!-- Tabs (shared a11y primitive: roving tabindex + aria-controls/labelledby) -->
      <Tabs v-model="activeTab" :tabs="TAB_ITEMS" label="Settings groups">
        <div class="admin-settings__panel">
        <p v-if="activeKeys.length === 0" class="admin-settings__empty" role="status">
          No settings in this group.
        </p>
        <form v-else class="admin-settings__form" @submit.prevent="handleSubmit">
          <div v-for="key in activeKeys" :key="key" class="admin-settings__field">
            <!-- metadata.provider_priority → per-media-type SourcePriorityEditor -->
            <template v-if="key === PROVIDER_PRIORITY_KEY">
              <span class="admin-settings__label">
                {{ getDisplayName(key) }}
                <Badge v-if="isOverridden(key)" tone="accent">custom</Badge>
              </span>
              <p v-if="FIELD_HELP[key]" class="admin-settings__help">{{ FIELD_HELP[key] }}</p>
              <div class="admin-settings__priority">
                <div
                  v-for="type in providerTypes"
                  :key="type"
                  class="admin-settings__priority-group"
                >
                  <h3 class="admin-settings__priority-title">{{ type }}</h3>
                  <SourcePriorityEditor
                    :model-value="providerPriority[type] ?? []"
                    :available="availableSources"
                    :label="`${type} sources`"
                    @update:model-value="(order) => setProviderOrder(type, order)"
                  />
                </div>
                <p
                  v-if="providerTypes.length === 0"
                  class="admin-settings__empty"
                  role="status"
                >
                  No media-type priority lists configured.
                </p>
              </div>
            </template>

            <!-- metadata.genres_mode → enumerated Select -->
            <template v-else-if="key === GENRES_MODE_KEY">
              <label class="admin-settings__label" :for="`field-${key}`">
                {{ getDisplayName(key) }}
                <Badge v-if="isOverridden(key)" tone="accent">custom</Badge>
              </label>
              <Select
                :model-value="genresMode"
                :options="GENRES_MODE_OPTIONS"
                :label="getDisplayName(key)"
                @update:model-value="(v) => setGenresMode(String(v))"
              />
            </template>

            <!-- bool → Switch -->
            <template v-else-if="fieldType(key) === 'bool'">
              <div class="admin-settings__row">
                <Switch
                  :model-value="formValues[key] === 'true' || formValues[key] === '1'"
                  :label="getDisplayName(key)"
                  @update:model-value="(v) => setFieldValue(key, v ? 'true' : 'false')"
                />
                <Badge v-if="isOverridden(key)" tone="accent">custom</Badge>
              </div>
            </template>

            <!-- int / float → native number input -->
            <template v-else-if="fieldType(key) === 'int' || fieldType(key) === 'float'">
              <label class="admin-settings__label" :for="`field-${key}`">
                {{ getDisplayName(key) }}
                <Badge v-if="isOverridden(key)" tone="accent">custom</Badge>
              </label>
              <input
                :id="`field-${key}`"
                class="admin-settings__input"
                type="number"
                :value="formValues[key]"
                :min="constraintFor(key).min"
                :max="constraintFor(key).max"
                :step="fieldType(key) === 'float' ? 'any' : undefined"
                :placeholder="constraintFor(key).min !== undefined ? `min: ${constraintFor(key).min}` : undefined"
                @input="(e) => setFieldValue(key, (e.target as HTMLInputElement).value)"
              />
            </template>

            <!-- enumerated string → Select -->
            <template v-else-if="isSelectField(key)">
              <label class="admin-settings__label" :for="`field-${key}`">
                {{ getDisplayName(key) }}
                <Badge v-if="isOverridden(key)" tone="accent">custom</Badge>
              </label>
              <Select
                :model-value="formValues[key] ?? ''"
                :options="selectOptions(key)"
                :label="getDisplayName(key)"
                @update:model-value="(v) => setFieldValue(key, String(v))"
              />
            </template>

            <!-- password string → text/password input with show toggle -->
            <template v-else-if="PASSWORD_FIELDS.has(key)">
              <label class="admin-settings__label" :for="`field-${key}`">
                {{ getDisplayName(key) }}
                <Badge v-if="isOverridden(key)" tone="accent">custom</Badge>
              </label>
              <div class="admin-settings__row">
                <input
                  :id="`field-${key}`"
                  class="admin-settings__input"
                  :type="showPassword[key] ? 'text' : 'password'"
                  autocomplete="off"
                  :value="formValues[key]"
                  @input="(e) => setFieldValue(key, (e.target as HTMLInputElement).value)"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  :left-icon="showPassword[key] ? 'eye-off' : 'eye'"
                  :aria-label="showPassword[key] ? `Hide ${getDisplayName(key)}` : `Show ${getDisplayName(key)}`"
                  @click="toggleShowPassword(key)"
                >
                  {{ showPassword[key] ? 'Hide' : 'Show' }}
                </Button>
              </div>
            </template>

            <!-- plain string → text input -->
            <template v-else>
              <label class="admin-settings__label" :for="`field-${key}`">
                {{ getDisplayName(key) }}
                <Badge v-if="isOverridden(key)" tone="accent">custom</Badge>
              </label>
              <input
                :id="`field-${key}`"
                class="admin-settings__input"
                type="text"
                autocomplete="off"
                :value="formValues[key]"
                @input="(e) => setFieldValue(key, (e.target as HTMLInputElement).value)"
              />
            </template>

            <span v-if="fieldErrors[key]" class="admin-settings__error" role="alert">
              {{ fieldErrors[key] }}
            </span>
            <p
              v-if="FIELD_HELP[key] && key !== PROVIDER_PRIORITY_KEY"
              class="admin-settings__help"
            >
              {{ FIELD_HELP[key] }}
            </p>
          </div>

          <div class="admin-settings__actions">
            <Button
              type="button"
              variant="solid"
              size="sm"
              :disabled="!hasAnyChanges"
              :loading="submitting"
              @click="handleSubmit"
            >
              Save settings
            </Button>
          </div>
        </form>
        </div>
      </Tabs>
    </template>
  </section>
</template>

<style scoped>
.admin-settings {
  max-width: 900px;
  margin: 0 auto;
  padding: var(--space-6);
}
.admin-settings__head {
  margin-bottom: var(--space-6);
}
.admin-settings__title {
  font-family: var(--font-display);
  font-weight: var(--font-semibold);
  font-size: var(--text-xl);
  letter-spacing: var(--tracking-tight);
  color: var(--text);
}
.admin-settings__skel {
  padding-block: var(--space-2);
}

.admin-settings__panel {
  min-height: 8rem;
}
.admin-settings__empty {
  color: var(--text-subtle);
  font-size: var(--text-sm);
}
.admin-settings__form {
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
}
.admin-settings__field {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}
.admin-settings__row {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}
.admin-settings__label {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--text-xs);
  font-weight: var(--font-semibold);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  color: var(--text-subtle);
}
.admin-settings__input {
  width: 100%;
  max-width: 28rem;
  height: var(--control-h);
  padding-inline: var(--control-pad-x);
  border-radius: var(--radius-md);
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--text);
  font: inherit;
  font-size: var(--text-sm);
  transition: border-color var(--dur-fast) var(--ease-out), box-shadow var(--dur-base) var(--ease-out);
}
.admin-settings__input:focus-visible {
  outline: none;
  border-color: var(--accent-ring);
  box-shadow: 0 0 0 3px var(--accent-soft);
}
.admin-settings__input::placeholder {
  color: var(--text-subtle);
}
.admin-settings__error {
  font-size: var(--text-xs);
  color: var(--error);
}
.admin-settings__help {
  font-size: var(--text-xs);
  color: var(--text-subtle);
  line-height: var(--leading-normal, 1.5);
  max-width: 40rem;
}
.admin-settings__priority {
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
}
.admin-settings__priority-group {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}
.admin-settings__priority-title {
  font-size: var(--text-xs);
  font-weight: var(--font-semibold);
  letter-spacing: var(--tracking-wide);
  text-transform: capitalize;
  color: var(--text);
  margin: 0;
}
.admin-settings__actions {
  display: flex;
  justify-content: flex-start;
  padding-top: var(--space-2);
  border-top: 1px solid var(--border-subtle);
}
@media (prefers-reduced-motion: reduce) {
  .admin-settings__input {
    transition: none;
  }
}
</style>
