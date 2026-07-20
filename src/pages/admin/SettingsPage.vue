<!--
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 -->

<script setup lang="ts">
/**
 * Admin SettingsPage (RA.16) — schema-driven settings administration.
 *
 * ALL rendering is driven by the server's `meta` block received from
 * `GET /api/v1/admin/settings`. The server provides: group (tab), label,
 * helpText, helpLinks, tier (standard|advanced), restart flag, numeric
 * min/max, enum options/labels, and secret flag — replacing all formerly
 * hardcoded maps.
 *
 * Per-key dirty state, type coercion, per-field validation errors, and
 * partial PUT are preserved from the original implementation.
 */
import { ref, computed, reactive, onMounted, inject, type ComputedRef } from 'vue';
import { ApiClient, ApiError } from '../../api/client';
import { errMessage } from '../../api/errors';
import { LocalStorageTokenStore } from '../../api/tokenStore';
import { AdminSettingsApi } from '../../api/admin/settings';
import { useToastStore } from '../../stores/useToastStore';
import { useSettingsPrefsStore } from '../../stores/useSettingsPrefs';
import Badge from '../../components/ui/Badge.vue';
import PageHint from '../../components/ui/PageHint.vue';
import Button from '../../components/ui/Button.vue';
import Select from '../../components/ui/Select.vue';
import Switch from '../../components/ui/Switch.vue';
import Tabs, { type TabItem } from '../../components/ui/Tabs.vue';
import Skeleton from '../../components/ui/Skeleton.vue';
import EmptyState from '../../components/ui/EmptyState.vue';
import HelpPopover from '../../components/ui/HelpPopover.vue';
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
const toasts = useToastStore();
const settingsPrefsStore = useSettingsPrefsStore();

/**
 * The enum metadata key that drives the bespoke Metadata-tab UI (the genres-mode
 * select). It cannot use the generic string-coercing form path — it is tracked
 * in its own state and sent back through the same PUT.
 */
const GENRES_MODE_KEY = 'metadata.genres_mode';

// ── Settings data ─────────────────────────────────────────────────────────────
const settings = ref<Record<string, unknown>>({});
const overridden = ref<string[]>([]);
const types = ref<Record<string, string>>({});

// ── Schema-driven meta ─────────────────────────────────────────────────────────
/** Full metadata block from server — drives all labels, help, options, constraints. */
const serverMeta = ref<Record<string, import('../../api/admin/settings').SettingMeta>>({});

/** Build tab list from unique groups in meta. */
const tabs = computed<TabItem[]>(() => {
  const groups = new Set(Object.values(serverMeta.value).map(m => m.group));
  return Array.from(groups).sort().map(g => ({ value: g, label: g }));
});

/** Currently active tab. */
const currentTab = ref<string>('');

// ── UI state ──────────────────────────────────────────────────────────────────
const loading = ref(true);
const error = ref<string | null>(null);
const submitting = ref(false);
const fieldErrors = ref<Record<string, string>>({});
const showPassword = reactive<Record<string, boolean>>({});

// ── Form state ────────────────────────────────────────────────────────────────
const formValues = reactive<Record<string, string>>({});
const dirty = reactive<Record<string, boolean>>({});

// ── Metadata tab bespoke state (genres_mode enum) ───────────────────────────────
/** Working copy of the genres_mode enum. */
const genresMode = ref<string>('first');

const hasAnyChanges = computed(() => Object.values(dirty).some(Boolean));

/** Keys belonging to the current tab, ordered by their index in serverMeta. */
const tabKeys = computed<string[]>(() =>
  Object.entries(serverMeta.value)
    .filter(([, m]) => m.group === currentTab.value)
    .sort(([, a], [, b]) => {
      // Maintain server-provided ordering if available, otherwise alphabetical
      const aIdx = (a as any)._order ?? 0;
      const bIdx = (b as any)._order ?? 0;
      return aIdx - bIdx;
    })
    .map(([key]) => key)
);

/** Keys that require a server restart when changed. */
const restartKeys = computed<string[]>(() =>
  Object.entries(serverMeta.value)
    .filter(([, m]) => m.restart === true)
    .map(([key]) => key)
);

/** Whether any dirty key requires a restart. */
const needsRestart = computed(() =>
  Object.keys(dirty).filter(k => dirty[k]).some(k => restartKeys.value.includes(k))
);

function isOverridden(key: string): boolean {
  return overridden.value.includes(key);
}

function syncFormValues(source: Record<string, unknown>): void {
  for (const key of Object.keys(formValues)) delete formValues[key];
  for (const [key, val] of Object.entries(source)) {
    if (key === GENRES_MODE_KEY) continue;
    if (key.startsWith('_')) continue; // skip internal keys like _meta
    formValues[key] = String(val ?? '');
  }
}

/** Seed the bespoke Metadata-tab state from the loaded settings map. */
function syncMetadataState(source: Record<string, unknown>): void {
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
    serverMeta.value = data.meta;
    syncFormValues(data.settings);
    syncMetadataState(data.settings);
    clearDirty();
    fieldErrors.value = {};
    // Set initial tab to first available group
    if (!currentTab.value && tabs.value.length > 0) {
      currentTab.value = tabs.value[0].value;
    }
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

/** True when meta declares enum options for this key (render as Select). */
function isEnumField(key: string): boolean {
  const m = serverMeta.value[key];
  return m != null && Array.isArray(m['enum']) && (m['enum'] as unknown[]).length > 0;
}

/** Build Select options from meta enum + enumLabels. */
function selectOptions(key: string): ReadonlyArray<SelectOptionInput> {
  const m = serverMeta.value[key];
  if (!m || !Array.isArray(m['enum'])) return [];
  const enumArr = m['enum'] as string[];
  const labels = m['enumLabels'] as Record<string, string> | null;
  return enumArr.map(v => ({
    value: v,
    label: labels?.[v] ?? v,
  }));
}

function constraintFor(key: string): { min?: number; max?: number } {
  const m = serverMeta.value[key];
  if (!m) return {};
  return {
    min: typeof m.minimum === 'number' ? m.minimum : undefined,
    max: typeof m.maximum === 'number' ? m.maximum : undefined,
  };
}

/** True if this key's tier is 'advanced' and advanced mode is off. */
function isAdvanced(key: string): boolean {
  return serverMeta.value[key]?.tier === 'advanced';
}
function isDisabled(key: string): boolean {
  return isAdvanced(key) && !settingsPrefsStore.advancedMode;
}

/** Field label from meta, falling back to a human-readable key derivative. */
function getLabel(key: string): string {
  return serverMeta.value[key]?.label
    ?? key.split('.').pop()?.replace(/_/g, ' ').replace(/\b[a-z]/g, c => c.toUpperCase())
    ?? key;
}

/** Help text from meta. */
function getHelpText(key: string): string | undefined {
  return serverMeta.value[key]?.helpText;
}

/** Help links from meta. */
function getHelpLinks(key: string): Array<{ text: string; url: string }> | undefined {
  return serverMeta.value[key]?.helpLinks;
}

function setFieldValue(key: string, value: string): void {
  formValues[key] = value;
  dirty[key] = value !== String(settings.value[key] ?? '');
}

function toggleShowPassword(key: string): void {
  showPassword[key] = !showPassword[key];
}

/** Apply the chosen genres mode and mark the key dirty. */
function setGenresMode(mode: string): void {
  genresMode.value = mode;
  dirty[GENRES_MODE_KEY] = mode !== String(settings.value[GENRES_MODE_KEY] ?? 'first');
}

/** Placeholder for restart functionality (Phase 8). */
function restartServer(): void {
  // TODO(Phase 8): Implement actual restart HTTP call
  toasts.info('Restart triggered (placeholder).');
}

async function handleSubmit(): Promise<void> {
  submitting.value = true;
  fieldErrors.value = {};
  try {
    const toSave: Record<string, unknown> = {};
    for (const [key, isDirty] of Object.entries(dirty)) {
      if (!isDirty) continue;
      // Skip disabled advanced fields (they can't be edited)
      if (isDisabled(key)) continue;
      // The bespoke enum metadata key carries its own working state and is sent
      // verbatim (the server types it string), NOT string-coerced.
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

onMounted(loadSettings);
</script>

<template>
  <section class="admin-settings" aria-labelledby="settings-heading">
    <header class="admin-settings__head">
      <h1 id="settings-heading" class="admin-settings__title">Settings</h1>
    </header>

    <PageHint>
      All of your server's configuration, grouped into tabs — <strong>Access</strong> (sign-up
      mode), <strong>Transcoding</strong>, <strong>Metadata</strong> (TMDB key and genres
      mode), <strong>Markers</strong>, <strong>Subtitles</strong>,
      <strong>Discovery</strong>, <strong>Trickplay</strong>, <strong>Newsletter</strong>,
      <strong>Port Forward</strong>, and <strong>Scrobblers</strong>. Change fields on any tab,
      then click <strong>Save settings</strong> to apply only what you changed; a
      <strong>custom</strong> badge marks values overridden by your environment or config file.
    </PageHint>

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
      <!-- Tabs driven from meta groups -->
      <div class="admin-settings__header-row">
        <Tabs v-model="currentTab" :tabs="tabs" label="Settings groups" />
        <div class="settings-advanced-toggle">
          <span class="settings-advanced-toggle__label">Advanced</span>
          <Switch
            :model-value="settingsPrefsStore.advancedMode"
            @update:model-value="settingsPrefsStore.setAdvancedMode($event)"
          />
        </div>
      </div>

      <!-- Restart banner — only shows when dirty keys include a restart:true field -->
      <div v-if="needsRestart" class="settings-restart-banner" role="alert">
        <span>Some changes require a server restart to take effect.</span>
        <button type="button" class="settings-restart-banner__btn" @click="restartServer">
          Restart server
        </button>
      </div>

      <div class="admin-settings__panel">
        <p v-if="tabKeys.length === 0" class="admin-settings__empty" role="status">
          No settings in this group.
        </p>
        <form v-else class="admin-settings__form" @submit.prevent="handleSubmit">
          <div v-for="key in tabKeys" :key="key" class="admin-settings__field">
            <!-- metadata.genres_mode → enumerated Select (special case, kept from original) -->
            <template v-if="key === GENRES_MODE_KEY">
              <label class="admin-settings__label" :for="`field-${key}`">
                {{ getLabel(key) }}
                <Badge v-if="isOverridden(key)" tone="accent">custom</Badge>
                <Badge v-if="isAdvanced(key)" tone="neutral" class="field-advanced-badge">Advanced</Badge>
                <HelpPopover
                  v-if="getHelpText(key)"
                  :help-text="getHelpText(key) ?? ''"
                  :help-links="getHelpLinks(key)"
                />
              </label>
              <Select
                :model-value="genresMode"
                :options="selectOptions(key)"
                :label="getLabel(key)"
                @update:model-value="(v) => setGenresMode(String(v))"
              />
            </template>

            <!-- bool → Switch -->
            <template v-else-if="fieldType(key) === 'bool'">
              <div class="admin-settings__row">
                <Switch
                  :model-value="formValues[key] === 'true' || formValues[key] === '1'"
                  :label="getLabel(key)"
                  :disabled="isDisabled(key)"
                  @update:model-value="(v) => setFieldValue(key, v ? 'true' : 'false')"
                />
                <Badge v-if="isOverridden(key)" tone="accent">custom</Badge>
                <Badge v-if="isAdvanced(key)" tone="neutral" class="field-advanced-badge">Advanced</Badge>
                <HelpPopover
                  v-if="getHelpText(key)"
                  :help-text="getHelpText(key) ?? ''"
                  :help-links="getHelpLinks(key)"
                />
              </div>
            </template>

            <!-- int / float → native number input -->
            <template v-else-if="fieldType(key) === 'int' || fieldType(key) === 'float'">
              <label class="admin-settings__label" :for="`field-${key}`">
                {{ getLabel(key) }}
                <Badge v-if="isOverridden(key)" tone="accent">custom</Badge>
                <Badge v-if="isAdvanced(key)" tone="neutral" class="field-advanced-badge">Advanced</Badge>
                <HelpPopover
                  v-if="getHelpText(key)"
                  :help-text="getHelpText(key) ?? ''"
                  :help-links="getHelpLinks(key)"
                />
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
                :disabled="isDisabled(key)"
                @input="(e) => setFieldValue(key, (e.target as HTMLInputElement).value)"
              />
            </template>

            <!-- enumerated string → Select (driven by meta enum) -->
            <template v-else-if="isEnumField(key)">
              <label class="admin-settings__label" :for="`field-${key}`">
                {{ getLabel(key) }}
                <Badge v-if="isOverridden(key)" tone="accent">custom</Badge>
                <Badge v-if="isAdvanced(key)" tone="neutral" class="field-advanced-badge">Advanced</Badge>
                <HelpPopover
                  v-if="getHelpText(key)"
                  :help-text="getHelpText(key) ?? ''"
                  :help-links="getHelpLinks(key)"
                />
              </label>
              <Select
                :model-value="formValues[key] ?? ''"
                :options="selectOptions(key)"
                :label="getLabel(key)"
                :disabled="isDisabled(key)"
                @update:model-value="(v) => setFieldValue(key, String(v))"
              />
            </template>

            <!-- secret string → text/password input with show toggle -->
            <template v-else-if="serverMeta[key]?.secret">
              <label class="admin-settings__label" :for="`field-${key}`">
                {{ getLabel(key) }}
                <Badge v-if="isOverridden(key)" tone="accent">custom</Badge>
                <Badge v-if="isAdvanced(key)" tone="neutral" class="field-advanced-badge">Advanced</Badge>
                <HelpPopover
                  v-if="getHelpText(key)"
                  :help-text="getHelpText(key) ?? ''"
                  :help-links="getHelpLinks(key)"
                />
              </label>
              <div class="admin-settings__row">
                <input
                  :id="`field-${key}`"
                  class="admin-settings__input"
                  :type="showPassword[key] ? 'text' : 'password'"
                  autocomplete="off"
                  :value="formValues[key]"
                  :disabled="isDisabled(key)"
                  @input="(e) => setFieldValue(key, (e.target as HTMLInputElement).value)"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  :left-icon="showPassword[key] ? 'eye-off' : 'eye'"
                  :aria-label="showPassword[key] ? `Hide ${getLabel(key)}` : `Show ${getLabel(key)}`"
                  @click="toggleShowPassword(key)"
                >
                  {{ showPassword[key] ? 'Hide' : 'Show' }}
                </Button>
              </div>
            </template>

            <!-- plain string → text input -->
            <template v-else>
              <label class="admin-settings__label" :for="`field-${key}`">
                {{ getLabel(key) }}
                <Badge v-if="isOverridden(key)" tone="accent">custom</Badge>
                <Badge v-if="isAdvanced(key)" tone="neutral" class="field-advanced-badge">Advanced</Badge>
                <HelpPopover
                  v-if="getHelpText(key)"
                  :help-text="getHelpText(key) ?? ''"
                  :help-links="getHelpLinks(key)"
                />
              </label>
              <input
                :id="`field-${key}`"
                class="admin-settings__input"
                type="text"
                autocomplete="off"
                :value="formValues[key]"
                :disabled="isDisabled(key)"
                @input="(e) => setFieldValue(key, (e.target as HTMLInputElement).value)"
              />
            </template>

            <span v-if="fieldErrors[key]" class="admin-settings__error" role="alert">
              {{ fieldErrors[key] }}
            </span>
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

.admin-settings__header-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  margin-bottom: var(--space-2);
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
.admin-settings__input:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background: var(--surface-2);
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
.admin-settings__actions {
  display: flex;
  justify-content: flex-start;
  padding-top: var(--space-2);
  border-top: 1px solid var(--border-subtle);
}

/* Advanced toggle */
.settings-advanced-toggle {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-md);
  background: var(--surface-2);
  border: 1px solid var(--border-subtle);
}
.settings-advanced-toggle__label {
  font-size: var(--text-xs);
  font-weight: var(--font-semibold);
  text-transform: uppercase;
  letter-spacing: var(--tracking-wide);
  color: var(--text-muted);
}

/* Restart banner */
.settings-restart-banner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-3);
  padding: var(--space-3) var(--space-4);
  margin-bottom: var(--space-4);
  border-radius: var(--radius-md);
  background: var(--warning-soft, rgba(234, 179, 8, 0.1));
  border: 1px solid var(--warning-border, rgba(234, 179, 8, 0.3));
  color: var(--warning-text, var(--text));
  font-size: var(--text-sm);
}
.settings-restart-banner__btn {
  padding: var(--space-1) var(--space-3);
  border-radius: var(--radius-sm);
  background: var(--warning, #eab308);
  color: var(--warning-fg, #000);
  font-size: var(--text-xs);
  font-weight: var(--font-semibold);
  border: none;
  cursor: pointer;
  transition: background var(--dur-fast) var(--ease-out);
}
.settings-restart-banner__btn:hover {
  background: var(--warning-hover, #ca8a04);
}

/* Advanced badge */
.field-advanced-badge {
  font-size: 0.6rem;
  font-weight: var(--font-bold);
  text-transform: uppercase;
  letter-spacing: var(--tracking-wide);
  padding: 0.1em 0.4em;
  border-radius: var(--radius-sm);
  background: var(--surface-2);
  border: 1px solid var(--border);
  color: var(--text-subtle);
}

@media (prefers-reduced-motion: reduce) {
  .admin-settings__input,
  .settings-restart-banner__btn {
    transition: none;
  }
}
</style>
