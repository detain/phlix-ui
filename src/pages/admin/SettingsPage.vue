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
 * min/max, enum options/labels/optionHelp, and secret flag — replacing all
 * formerly hardcoded maps. There is no per-key special case in this file: a new
 * schema key auto-renders with the correct control, tab, label, help and tier.
 *
 * Control selection is driven by the server `types` map (`bool` | `int` |
 * `float` | `json` | `string`) plus `meta.enum` / `meta.secret`; `json` (the
 * server's projection of schema `array`/`object`) renders a JSON textarea whose
 * contents are parsed before the PUT, and an unparseable value blocks the save.
 *
 * Degradation: when a server is too old to emit `meta`, the page falls back to
 * rendering every key in `types` under a single "Other" tab with derived labels,
 * and shows a notice explaining that help/tiers are unavailable.
 *
 * Per-key dirty state, type coercion, per-field validation errors, and partial
 * PUT are preserved from the original implementation.
 */
import { ref, computed, reactive, onMounted, inject, type ComputedRef } from 'vue';
import { ApiClient, ApiError } from '../../api/client';
import { errMessage } from '../../api/errors';
import { LocalStorageTokenStore } from '../../api/tokenStore';
import {
  AdminSettingsApi,
  type SecretStatus,
  type SettingMeta,
} from '../../api/admin/settings';
import { useToastStore } from '../../stores/useToastStore';
import { useSettingsPrefsStore } from '../../stores/useSettingsPrefs';
import Badge from '../../components/ui/Badge.vue';
import PageHint from '../../components/ui/PageHint.vue';
import { adminPageHelp } from './helpLinks';
import Button from '../../components/ui/Button.vue';
import Select from '../../components/ui/Select.vue';
import Switch from '../../components/ui/Switch.vue';
import Tabs, { type TabItem } from '../../components/ui/Tabs.vue';
import Skeleton from '../../components/ui/Skeleton.vue';
import EmptyState from '../../components/ui/EmptyState.vue';
import HelpText from '../../components/ui/HelpText.vue';
import type { SelectOptionInput } from '../../components/ui/listbox';

const props = withDefaults(
  defineProps<{
    /** Inject a pre-built API client for tests; otherwise one is built from `apiBase`. */
    client?: ApiClient;
    /** Delay between "is the server back?" polls after a restart (ms). */
    restartPollIntervalMs?: number;
    /** Total budget to wait for the server to come back after a restart (ms). */
    restartPollTimeoutMs?: number;
  }>(),
  { client: undefined, restartPollIntervalMs: 1000, restartPollTimeoutMs: 60000 },
);

const injectedApiBase = inject<string | ComputedRef<string> | undefined>('apiBase', '');
const apiBase = computed(() =>
  typeof injectedApiBase === 'string' ? injectedApiBase : injectedApiBase?.value ?? '',
);
const apiClient =
  props.client ?? new ApiClient({ baseUrl: apiBase.value, tokenStore: new LocalStorageTokenStore() });
const api = new AdminSettingsApi(apiClient);
const toasts = useToastStore();
const settingsPrefsStore = useSettingsPrefsStore();

/** Group assigned to every key when the server sent no `meta` at all. */
const FALLBACK_GROUP = 'other';

/** localStorage key prefix for the "a restart is pending" flag (per API base). */
const RESTART_PENDING_PREFIX = 'phlix-restart-pending';

// ── Settings data ─────────────────────────────────────────────────────────────
const settings = ref<Record<string, unknown>>({});
const overridden = ref<string[]>([]);
const types = ref<Record<string, string>>({});

/**
 * Per-secret `{ set, length }` from the server. The masked `settings` map cannot
 * distinguish a configured secret from an empty one — both arrive as
 * `SETTINGS_SECRET_MASK` — so this is the ONLY source for the
 * configured/not-configured cue. An older server omits it, leaving `{}`.
 */
const secretStatus = ref<Record<string, SecretStatus>>({});

// ── Schema-driven meta ─────────────────────────────────────────────────────────
/** Full metadata block from server — drives all labels, help, options, constraints. */
const serverMeta = ref<Record<string, SettingMeta>>({});

/** True when the server sent settings but no `meta` block (older server). */
const metaMissing = computed(
  () => Object.keys(serverMeta.value).length === 0 && Object.keys(types.value).length > 0,
);

/** Human-readable label derived from a dotted setting key. */
function humanizeKey(key: string): string {
  return (
    key
      .split('.')
      .pop()
      ?.replace(/[_-]+/g, ' ')
      .replace(/\b[a-z]/g, c => c.toUpperCase()) ?? key
  );
}

/** Human-readable label derived from a group key (`port-forward` → `Port Forward`). */
function humanizeGroup(group: string): string {
  return group.replace(/[_-]+/g, ' ').replace(/\b[a-z]/g, c => c.toUpperCase());
}

/**
 * Human-readable label derived from the WHOLE dotted key. Used only in the
 * no-`meta` fallback, where the trailing segment alone is often ambiguous
 * (a dozen keys end in `.enabled`).
 */
function humanizeFullKey(key: string): string {
  return key.replace(/[._-]+/g, ' ').replace(/\b[a-z]/g, c => c.toUpperCase());
}

/** A synthesised meta entry for a key the server described only in `types`. */
function fallbackMeta(key: string): SettingMeta {
  return {
    label: humanizeFullKey(key),
    helpText: '',
    helpLinks: [],
    tier: 'standard',
    group: FALLBACK_GROUP,
    enum: null,
    enumLabels: null,
    optionHelp: null,
    minimum: null,
    maximum: null,
    default: undefined,
    secret: false,
    restart: false,
  };
}

/**
 * The meta map the whole page renders from. Normally this is the server's
 * `meta` verbatim; when the server sent none, it is synthesised from `types` so
 * an older server still yields an editable page rather than a blank one.
 */
const effectiveMeta = computed<Record<string, SettingMeta>>(() => {
  if (!metaMissing.value) return serverMeta.value;
  const synth: Record<string, SettingMeta> = {};
  for (const key of Object.keys(types.value)) synth[key] = fallbackMeta(key);
  return synth;
});

/** Build tab list from unique groups in meta, labelled for humans. */
const tabs = computed<TabItem[]>(() => {
  const groups = new Set(Object.values(effectiveMeta.value).map(m => m.group));
  return Array.from(groups)
    .sort()
    .map(g => ({ value: g, label: groupLabel(g) }));
});

/**
 * Tab caption for a group. Prefers a server-supplied `groupLabel` (optional, so
 * the server can take over this responsibility later without a UI change) and
 * otherwise derives one from the group key.
 */
function groupLabel(group: string): string {
  for (const m of Object.values(effectiveMeta.value)) {
    if (m.group === group && typeof m.groupLabel === 'string' && m.groupLabel !== '') {
      return m.groupLabel;
    }
  }
  return humanizeGroup(group);
}

/** Currently active tab. */
const currentTab = ref<string>('');

// ── UI state ──────────────────────────────────────────────────────────────────
const loading = ref(true);
const error = ref<string | null>(null);
const submitting = ref(false);
const restarting = ref(false);
const fieldErrors = ref<Record<string, string>>({});
const showPassword = reactive<Record<string, boolean>>({});
/**
 * Secret keys the admin has explicitly armed for removal.
 *
 * Since secret inputs start blank and a blank field means "keep the stored
 * value", clearing the box cannot express "delete this". This map is the
 * explicit opt-in: an armed key sends `''` on the next save, which is what the
 * server reads as "clear it" (`AdminSettingsController::update()` only skips a
 * secret when it equals the mask sentinel).
 */
const secretRemoval = reactive<Record<string, boolean>>({});

// ── Form state ────────────────────────────────────────────────────────────────
const formValues = reactive<Record<string, string>>({});
const dirty = reactive<Record<string, boolean>>({});
/** Per-key JSON parse errors for `json`-typed fields (blocks the save). */
const jsonErrors = reactive<Record<string, string>>({});

/**
 * Whether anything is pending. A pending secret removal counts even though it
 * is not "dirty" — an armed field is blank, which IS its baseline — otherwise
 * arming a removal alone would leave Save disabled and the intent unsendable.
 */
const hasAnyChanges = computed(
  () => Object.values(dirty).some(Boolean) || Object.values(secretRemoval).some(Boolean),
);

/** Keys belonging to the current tab, in schema declaration order. */
const tabKeys = computed<string[]>(() =>
  Object.entries(effectiveMeta.value)
    .filter(([, m]) => m.group === currentTab.value)
    .map(([key]) => key),
);

/** Keys that require a server restart when changed. */
const restartKeys = computed<string[]>(() =>
  Object.entries(effectiveMeta.value)
    .filter(([, m]) => m.restart === true)
    .map(([key]) => key),
);

function requiresRestart(key: string): boolean {
  return effectiveMeta.value[key]?.restart === true;
}

// ── Pending-restart state (survives navigation + reload) ──────────────────────
/**
 * Keys that were SUCCESSFULLY SAVED and carry `restart: true`. Persisted so the
 * banner (and its Restart button) survives navigation and a page reload, and is
 * cleared only by a confirmed restart or an explicit dismissal.
 */
const restartPendingKeys = ref<string[]>([]);
const restartPending = computed(() => restartPendingKeys.value.length > 0);

const restartStorageKey = computed(() => `${RESTART_PENDING_PREFIX}:${apiBase.value || 'default'}`);

/** Labels of the pending keys, for the banner copy. */
const restartPendingLabels = computed(() => restartPendingKeys.value.map(k => getLabel(k)));

function loadRestartPending(): void {
  if (typeof localStorage === 'undefined') return;
  try {
    const raw = localStorage.getItem(restartStorageKey.value);
    if (!raw) return;
    const parsed = JSON.parse(raw) as unknown;
    if (Array.isArray(parsed)) {
      restartPendingKeys.value = parsed.filter((v): v is string => typeof v === 'string');
    }
  } catch {
    /* corrupt entry — ignore */
  }
}

function persistRestartPending(): void {
  if (typeof localStorage === 'undefined') return;
  try {
    if (restartPendingKeys.value.length === 0) {
      localStorage.removeItem(restartStorageKey.value);
    } else {
      localStorage.setItem(restartStorageKey.value, JSON.stringify(restartPendingKeys.value));
    }
  } catch {
    /* quota / private mode — ignore */
  }
}

function markRestartPending(keys: string[]): void {
  const merged = new Set([...restartPendingKeys.value, ...keys]);
  restartPendingKeys.value = Array.from(merged);
  persistRestartPending();
}

function clearRestartPending(): void {
  restartPendingKeys.value = [];
  persistRestartPending();
}

function isOverridden(key: string): boolean {
  return overridden.value.includes(key);
}

/** True when the server projects this key as JSON (schema `array` / `object`). */
function isJsonField(key: string): boolean {
  return fieldType(key) === 'json';
}

/** True when the schema flags this key `secret: true` (value is masked in transit). */
function isSecret(key: string): boolean {
  return effectiveMeta.value[key]?.secret === true;
}

/**
 * Whether a secret is configured on the server, or `null` when the server did
 * not report a status for it (too old to emit `secretStatus`) — which must read
 * as "unknown", never as "not configured".
 */
function secretState(key: string): SecretStatus | null {
  return secretStatus.value[key] ?? null;
}

function secretIsSet(key: string): boolean {
  return secretState(key)?.set === true;
}

/** Character count of a configured secret, or 0 when unset/unknown. */
function secretLength(key: string): number {
  const state = secretState(key);
  return state?.set === true ? state.length : 0;
}

/** `id` of the status line describing a secret field, for `aria-describedby`. */
function secretStatusId(key: string): string {
  return `secret-status-${key}`;
}

/**
 * Serialise a loaded value into its editable string form.
 *
 * Secret fields deliberately start EMPTY rather than pre-filled: the server only
 * ever sends `SETTINGS_SECRET_MASK` for them, and rendering that sentinel
 * in the input made a configured secret indistinguishable from an unset one
 * while giving the Show button nothing to reveal but `***`. An empty box plus
 * the adjacent Configured/Not set cue tells the truth instead. It also means an
 * untouched secret is never dirty (its baseline IS the empty string), so it is
 * excluded from the PUT entirely and the stored value survives — and if a server
 * ever regressed and sent a real secret, this still keeps it out of the DOM.
 */
function toFormString(key: string, val: unknown): string {
  if (isSecret(key)) return '';
  if (isJsonField(key) || (val !== null && typeof val === 'object')) {
    try {
      return JSON.stringify(val ?? null, null, 2);
    } catch {
      return '';
    }
  }
  return String(val ?? '');
}

function syncFormValues(source: Record<string, unknown>): void {
  for (const key of Object.keys(formValues)) delete formValues[key];
  for (const key of Object.keys(jsonErrors)) delete jsonErrors[key];
  for (const [key, val] of Object.entries(source)) {
    formValues[key] = toFormString(key, val);
  }
}

function clearDirty(): void {
  for (const key of Object.keys(dirty)) delete dirty[key];
  // Nothing is being edited any more, so no secret is in the clear: collapse
  // every reveal toggle rather than leave one armed for the next keystroke.
  for (const key of Object.keys(showPassword)) delete showPassword[key];
  // Pending removals are intent about the PREVIOUS state; once a save or reload
  // has landed they must not survive to fire against the new one.
  for (const key of Object.keys(secretRemoval)) delete secretRemoval[key];
}

/**
 * Apply a freshly fetched/saved payload to the page state.
 *
 * `secretStatus` is only present on the GET; the PUT response omits it, so it is
 * left untouched on a save and reconciled separately from what was persisted.
 */
function applySettings(data: {
  settings: Record<string, unknown>;
  overridden: string[];
  secretStatus?: Record<string, SecretStatus>;
}): void {
  settings.value = data.settings;
  overridden.value = data.overridden;
  if (data.secretStatus) secretStatus.value = data.secretStatus;
  syncFormValues(data.settings);
  clearDirty();
}

async function loadSettings(): Promise<void> {
  loading.value = true;
  error.value = null;
  try {
    const data = await api.get();
    types.value = data.types;
    serverMeta.value = data.meta;
    applySettings(data);
    fieldErrors.value = {};
    // Set initial tab to first available group
    if ((!currentTab.value || !tabs.value.some(t => t.value === currentTab.value)) && tabs.value.length > 0) {
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
  const m = effectiveMeta.value[key];
  return m != null && Array.isArray(m.enum) && m.enum.length > 0;
}

/** Build Select options from meta enum + enumLabels. */
function selectOptions(key: string): ReadonlyArray<SelectOptionInput> {
  const m = effectiveMeta.value[key];
  if (!m || !Array.isArray(m.enum)) return [];
  const labels = m.enumLabels;
  return m.enum.map(v => ({
    value: v,
    // The empty string is a real enum member on some keys (an "auto-detect"
    // sentinel); it needs a readable caption rather than an invisible one.
    label: labels?.[v] ?? (v === '' ? 'Auto' : v),
  }));
}

/** Per-option help entries for an enum key (`optionHelp`), in enum order. */
function optionHelpEntries(key: string): Array<{ value: string; label: string; help: string }> {
  const m = effectiveMeta.value[key];
  if (!m || !Array.isArray(m.enum) || !m.optionHelp) return [];
  const help = m.optionHelp;
  return m.enum
    .filter(v => typeof help[v] === 'string' && help[v] !== '')
    .map(v => ({
      value: v,
      label: m.enumLabels?.[v] ?? (v === '' ? 'Auto' : v),
      help: help[v],
    }));
}

function constraintFor(key: string): { min?: number; max?: number } {
  const m = effectiveMeta.value[key];
  if (!m) return {};
  return {
    min: typeof m.minimum === 'number' ? m.minimum : undefined,
    max: typeof m.maximum === 'number' ? m.maximum : undefined,
  };
}

/** True if this key's tier is 'advanced' and advanced mode is off. */
function isAdvanced(key: string): boolean {
  return effectiveMeta.value[key]?.tier === 'advanced';
}
function isDisabled(key: string): boolean {
  return isAdvanced(key) && !settingsPrefsStore.advancedMode;
}

/** Field label from meta, falling back to a human-readable key derivative. */
function getLabel(key: string): string {
  return effectiveMeta.value[key]?.label || humanizeKey(key);
}

/** Help text from meta. */
function getHelpText(key: string): string | undefined {
  return effectiveMeta.value[key]?.helpText;
}

/** Help links from meta. */
function getHelpLinks(key: string): Array<{ text: string; url: string }> | undefined {
  return effectiveMeta.value[key]?.helpLinks;
}

/** True when a key has any help affordance worth rendering a (?) for. */
function hasHelp(key: string): boolean {
  return Boolean(getHelpText(key)) || (getHelpLinks(key)?.length ?? 0) > 0;
}

function setFieldValue(key: string, value: string): void {
  formValues[key] = value;
  dirty[key] = value !== toFormString(key, settings.value[key]);
}

/** Canonical JSON of the currently stored value, for dirty comparison. */
function jsonBaseline(key: string): string {
  try {
    return JSON.stringify(settings.value[key] ?? null);
  } catch {
    return '';
  }
}

/**
 * `json` field input: keeps the raw text (so the user's formatting survives),
 * records a parse error when it is not valid JSON, and only marks the key dirty
 * against the canonical form of the stored value.
 */
function setJsonValue(key: string, raw: string): void {
  formValues[key] = raw;
  try {
    const parsed: unknown = JSON.parse(raw);
    delete jsonErrors[key];
    dirty[key] = JSON.stringify(parsed) !== jsonBaseline(key);
  } catch (e) {
    jsonErrors[key] = `Invalid JSON: ${e instanceof Error ? e.message : 'could not be parsed'}`;
    dirty[key] = true;
  }
}

/** Dirty, editable `json` keys whose current text does not parse. */
const blockingJsonKeys = computed<string[]>(() =>
  Object.keys(jsonErrors).filter(k => dirty[k] && !isDisabled(k)),
);

/**
 * Reveal toggle for a secret field. Only offered once the field is dirty (see
 * `canRevealSecret`), so it can only ever reveal the value the ADMIN is
 * currently typing — never a stored secret, which the browser does not have.
 */
function toggleShowPassword(key: string): void {
  showPassword[key] = !showPassword[key];
}

/**
 * Whether to offer a Show toggle for a secret field.
 *
 * Only when the admin has typed something. An untouched secret box is empty and
 * its stored value is unknown to the browser, so a Show button there would
 * reveal nothing at best, and — back when the box was pre-filled with the mask —
 * actively implied `***` was the secret. Gating on dirty keeps the affordance
 * exactly where it is useful: checking a long API key you just pasted.
 */
function canRevealSecret(key: string): boolean {
  return dirty[key] === true && !isDisabled(key) && !isRemovingSecret(key);
}

/** True while `key` is armed to have its stored secret cleared on the next save. */
function isRemovingSecret(key: string): boolean {
  return secretRemoval[key] === true;
}

/**
 * Whether to offer a Remove control for a secret field.
 *
 * Offered unless the server positively reports the secret as unset — there is
 * nothing to remove then. A server too old to send `secretStatus` reports
 * `null` (unknown), where the control MUST stay available: that admin may well
 * have a stored value and would otherwise have no way to clear it.
 */
function canRemoveSecret(key: string): boolean {
  return isSecret(key) && !isDisabled(key) && secretState(key)?.set !== false;
}

/**
 * Arm a secret for removal. Also clears any half-typed replacement, so the
 * field cannot both "be removed" and "carry a new value" — the two intents are
 * mutually exclusive and the last one clicked wins.
 */
function requestSecretRemoval(key: string): void {
  secretRemoval[key] = true;
  setFieldValue(key, '');
  showPassword[key] = false;
}

/** Disarm a pending removal, returning the field to "leave the stored value alone". */
function cancelSecretRemoval(key: string): void {
  delete secretRemoval[key];
}

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Poll the settings endpoint until the server answers again, with a linear
 * backoff capped at 3× the base interval and a hard budget. The previously
 * loaded settings stay on screen throughout, so the page never blanks while the
 * server is coming back.
 *
 * @returns true when the server answered within the budget.
 */
async function waitForServer(): Promise<boolean> {
  const start = Date.now();
  let wait = props.restartPollIntervalMs;
  while (Date.now() - start < props.restartPollTimeoutMs) {
    await sleep(wait);
    wait = Math.min(wait + props.restartPollIntervalMs / 2, props.restartPollIntervalMs * 3);
    try {
      const data = await api.get();
      types.value = data.types;
      serverMeta.value = data.meta;
      applySettings(data);
      fieldErrors.value = {};
      return true;
    } catch {
      /* not back yet — keep polling */
    }
  }
  return false;
}

async function restartServer(): Promise<void> {
  if (restarting.value) return;
  restarting.value = true;
  try {
    await api.restartServer();
    toasts.success('Restart signal sent — waiting for the server to come back…');
    if (await waitForServer()) {
      clearRestartPending();
      toasts.success('Server is back online.');
    } else {
      toasts.error(
        `The server did not respond within ${Math.round(props.restartPollTimeoutMs / 1000)}s. ` +
          'It may still be starting — reload this page in a moment.',
      );
    }
  } catch (e) {
    toasts.error(errMessage(e, 'Failed to restart server.'));
  } finally {
    restarting.value = false;
  }
}

async function handleSubmit(): Promise<void> {
  if (submitting.value) return;

  // Save-gate: never PUT a `json` field whose text does not parse.
  if (blockingJsonKeys.value.length > 0) {
    const names = blockingJsonKeys.value.map(getLabel).join(', ');
    toasts.error(`Fix the invalid JSON in ${names} before saving.`);
    return;
  }

  submitting.value = true;
  fieldErrors.value = {};
  try {
    const toSave: Record<string, unknown> = {};
    for (const [key, isDirtyKey] of Object.entries(dirty)) {
      if (!isDirtyKey) continue;
      // Skip disabled advanced fields (they can't be edited)
      if (isDisabled(key)) continue;
      const type = types.value[key];
      const value = formValues[key] ?? '';
      if (type === 'bool') {
        toSave[key] = value === 'true' || value === '1';
      } else if (type === 'int') {
        toSave[key] = parseInt(value, 10);
      } else if (type === 'float') {
        toSave[key] = parseFloat(value);
      } else if (type === 'json') {
        toSave[key] = JSON.parse(value);
      } else {
        toSave[key] = value;
      }
    }

    // Explicit secret removals. These are NOT dirty (an armed field is blank,
    // which is its own baseline), so they are added here on purpose: `''` is
    // the only value the server reads as "clear this secret".
    for (const key of Object.keys(secretRemoval)) {
      if (!isRemovingSecret(key) || isDisabled(key)) continue;
      toSave[key] = '';
    }

    const result = await api.save(toSave);
    toasts.success('Settings saved.');
    applySettings(result);

    // The PUT response carries no `secretStatus`, so reconcile it from what we
    // just persisted — otherwise a freshly saved secret would keep reading
    // "Not set" until the next full load.
    for (const [key, value] of Object.entries(toSave)) {
      if (!isSecret(key)) continue;
      const text = String(value ?? '');
      secretStatus.value = {
        ...secretStatus.value,
        [key]: { set: text !== '', length: text.length },
      };
    }

    // Restart semantics: the banner is driven by what was SUCCESSFULLY SAVED,
    // never by the dirty set — so it appears exactly when a restart becomes
    // necessary and stays until the restart happens (or is dismissed).
    const savedRestartKeys = Object.keys(toSave).filter(k => restartKeys.value.includes(k));
    if (savedRestartKeys.length > 0) markRestartPending(savedRestartKeys);
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

onMounted(() => {
  loadRestartPending();
  return loadSettings();
});
</script>

<template>
  <section class="admin-settings" aria-labelledby="settings-heading">
    <header class="admin-settings__head">
      <h1 id="settings-heading" class="admin-settings__title">Settings</h1>
    </header>

    <PageHint :links="adminPageHelp.settings.links" :details="adminPageHelp.settings.details">
      All of your server's configuration, grouped into tabs. Change fields on any tab, then
      click <strong>Save settings</strong> to apply only what you changed; a
      <strong>custom</strong> badge marks a value you have saved here, overriding the
      built-in default, and the <strong>Advanced</strong> switch unlocks the expert-tier
      fields.
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
      <!-- Older server: no `meta` block, so labels/help/tiers are unavailable. -->
      <div v-if="metaMissing" class="settings-meta-notice" role="status">
        This server did not send settings metadata, so help, grouping and Advanced tiers are
        unavailable. Every setting is listed below with a name derived from its key. Update the
        server to restore the full settings experience.
      </div>

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

      <!--
        Restart banner — driven by SAVED restart:true keys (persisted), so it
        appears once the restart actually becomes necessary and survives
        navigation and reload until the restart is confirmed or dismissed.
      -->
      <div v-if="restartPending" class="settings-restart-banner" role="alert">
        <span>
          Saved changes to {{ restartPendingLabels.join(', ') }} require a server restart to take
          effect.
        </span>
        <span class="settings-restart-banner__actions">
          <button
            type="button"
            class="settings-restart-banner__btn"
            :disabled="restarting"
            @click="restartServer"
          >
            {{ restarting ? 'Restarting…' : 'Restart server' }}
          </button>
          <button
            type="button"
            class="settings-restart-banner__dismiss"
            :disabled="restarting"
            @click="clearRestartPending"
          >
            Dismiss
          </button>
        </span>
      </div>

      <div class="admin-settings__panel">
        <p v-if="tabKeys.length === 0" class="admin-settings__empty" role="status">
          No settings in this group.
        </p>
        <form v-else class="admin-settings__form" @submit.prevent="handleSubmit">
          <div v-for="key in tabKeys" :key="key" class="admin-settings__field">
            <!-- bool → Switch -->
            <template v-if="fieldType(key) === 'bool'">
              <div class="admin-settings__row">
                <Switch
                  :model-value="formValues[key] === 'true' || formValues[key] === '1'"
                  :label="getLabel(key)"
                  :disabled="isDisabled(key)"
                  @update:model-value="(v) => setFieldValue(key, v ? 'true' : 'false')"
                />
                <Badge v-if="isOverridden(key)" tone="accent">custom</Badge>
                <Badge v-if="isAdvanced(key)" tone="neutral" class="field-advanced-badge">Advanced</Badge>
              </div>
              <HelpText
                v-if="hasHelp(key)"
                :text="getHelpText(key) ?? ''"
                :links="getHelpLinks(key)"
              />
            </template>

            <!-- int / float → native number input -->
            <template v-else-if="fieldType(key) === 'int' || fieldType(key) === 'float'">
              <label class="admin-settings__label" :for="`field-${key}`">
                {{ getLabel(key) }}
                <Badge v-if="isOverridden(key)" tone="accent">custom</Badge>
                <Badge v-if="isAdvanced(key)" tone="neutral" class="field-advanced-badge">Advanced</Badge>
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
              <HelpText
                v-if="hasHelp(key)"
                :text="getHelpText(key) ?? ''"
                :links="getHelpLinks(key)"
              />
            </template>

            <!-- enumerated string → Select (driven by meta enum) -->
            <template v-else-if="isEnumField(key)">
              <label class="admin-settings__label" :for="`field-${key}`">
                {{ getLabel(key) }}
                <Badge v-if="isOverridden(key)" tone="accent">custom</Badge>
                <Badge v-if="isAdvanced(key)" tone="neutral" class="field-advanced-badge">Advanced</Badge>
              </label>
              <Select
                :model-value="formValues[key] ?? ''"
                :options="selectOptions(key)"
                :label="getLabel(key)"
                :disabled="isDisabled(key)"
                @update:model-value="(v) => setFieldValue(key, String(v))"
              />
              <HelpText
                v-if="hasHelp(key)"
                :text="getHelpText(key) ?? ''"
                :links="getHelpLinks(key)"
              />
              <!-- Per-option help (schema `optionHelp`) — one line per choice. -->
              <dl v-if="optionHelpEntries(key).length" class="admin-settings__option-help">
                <template v-for="opt in optionHelpEntries(key)" :key="opt.value">
                  <dt class="admin-settings__option-help-term">{{ opt.label }}</dt>
                  <dd class="admin-settings__option-help-desc">{{ opt.help }}</dd>
                </template>
              </dl>
            </template>

            <!-- array / object → JSON textarea -->
            <template v-else-if="isJsonField(key)">
              <label class="admin-settings__label" :for="`field-${key}`">
                {{ getLabel(key) }}
                <Badge v-if="isOverridden(key)" tone="accent">custom</Badge>
                <Badge v-if="isAdvanced(key)" tone="neutral" class="field-advanced-badge">Advanced</Badge>
              </label>
              <textarea
                :id="`field-${key}`"
                class="admin-settings__input admin-settings__textarea"
                :class="{ 'admin-settings__textarea--invalid': jsonErrors[key] }"
                rows="6"
                spellcheck="false"
                autocomplete="off"
                :value="formValues[key]"
                :aria-invalid="jsonErrors[key] ? 'true' : undefined"
                :disabled="isDisabled(key)"
                @input="(e) => setJsonValue(key, (e.target as HTMLTextAreaElement).value)"
              />
              <HelpText
                v-if="hasHelp(key)"
                :text="getHelpText(key) ?? ''"
                :links="getHelpLinks(key)"
              />
              <span v-if="jsonErrors[key]" class="admin-settings__error" role="alert">
                {{ jsonErrors[key] }}
              </span>
            </template>

            <!--
              secret string → always-empty password box + a configured/not-set
              cue. The stored value never reaches the browser (the server sends
              only the mask sentinel), so the box starts blank and stays out of
              the PUT unless the admin types a replacement; the Show toggle
              appears only once they have, since it can then reveal their OWN
              input rather than a meaningless `***`.
            -->
            <template v-else-if="effectiveMeta[key]?.secret">
              <label class="admin-settings__label" :for="`field-${key}`">
                {{ getLabel(key) }}
                <Badge v-if="isOverridden(key)" tone="accent">custom</Badge>
                <Badge v-if="isAdvanced(key)" tone="neutral" class="field-advanced-badge">Advanced</Badge>
              </label>
              <p :id="secretStatusId(key)" class="admin-settings__secret-status">
                <template v-if="isRemovingSecret(key)">
                  <Badge tone="warning" class="admin-settings__secret-badge">Will be removed</Badge>
                  <span class="admin-settings__secret-hint">
                    The stored value will be deleted when you save. Undo to keep it.
                  </span>
                </template>
                <template v-else-if="secretState(key) === null">
                  <span class="admin-settings__secret-hint">
                    This server did not report whether a value is stored. Type a new one to
                    replace whatever is there; leave it blank to keep it.
                  </span>
                </template>
                <template v-else-if="secretIsSet(key)">
                  <Badge tone="accent" class="admin-settings__secret-badge">Configured</Badge>
                  <span class="admin-settings__secret-hint">
                    A value is stored ({{ secretLength(key) }}
                    {{ secretLength(key) === 1 ? 'character' : 'characters' }}). It is never sent
                    to your browser. Leave this blank to keep it, or type a new one to replace it.
                  </span>
                </template>
                <template v-else>
                  <Badge tone="neutral" class="admin-settings__secret-badge">Not set</Badge>
                  <span class="admin-settings__secret-hint">
                    No value is stored yet.
                  </span>
                </template>
              </p>
              <div class="admin-settings__row">
                <input
                  :id="`field-${key}`"
                  class="admin-settings__input"
                  :type="showPassword[key] ? 'text' : 'password'"
                  autocomplete="new-password"
                  data-lpignore="true"
                  data-1p-ignore
                  data-bwignore
                  data-form-type="other"
                  :aria-describedby="secretStatusId(key)"
                  :placeholder="
                    isRemovingSecret(key)
                      ? 'Will be removed on save'
                      : secretIsSet(key)
                        ? 'Leave blank to keep the stored value'
                        : `Enter ${getLabel(key)}`
                  "
                  :value="formValues[key]"
                  :disabled="isDisabled(key) || isRemovingSecret(key)"
                  @input="(e) => setFieldValue(key, (e.target as HTMLInputElement).value)"
                />
                <Button
                  v-if="canRevealSecret(key)"
                  variant="ghost"
                  size="sm"
                  :left-icon="showPassword[key] ? 'eye-off' : 'eye'"
                  :aria-label="showPassword[key] ? `Hide ${getLabel(key)}` : `Show ${getLabel(key)}`"
                  @click="toggleShowPassword(key)"
                >
                  {{ showPassword[key] ? 'Hide' : 'Show' }}
                </Button>
                <Button
                  v-if="isRemovingSecret(key)"
                  variant="ghost"
                  size="sm"
                  :aria-label="`Keep the stored ${getLabel(key)}`"
                  @click="cancelSecretRemoval(key)"
                >
                  Undo
                </Button>
                <Button
                  v-else-if="canRemoveSecret(key)"
                  variant="ghost"
                  size="sm"
                  :aria-label="`Remove the stored ${getLabel(key)}`"
                  @click="requestSecretRemoval(key)"
                >
                  Remove
                </Button>
              </div>
              <HelpText
                v-if="hasHelp(key)"
                :text="getHelpText(key) ?? ''"
                :links="getHelpLinks(key)"
              />
            </template>

            <!-- plain string → text input -->
            <template v-else>
              <label class="admin-settings__label" :for="`field-${key}`">
                {{ getLabel(key) }}
                <Badge v-if="isOverridden(key)" tone="accent">custom</Badge>
                <Badge v-if="isAdvanced(key)" tone="neutral" class="field-advanced-badge">Advanced</Badge>
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
              <HelpText
                v-if="hasHelp(key)"
                :text="getHelpText(key) ?? ''"
                :links="getHelpLinks(key)"
              />
            </template>

            <!-- Per-field restart note (schema `restart: true`) — §3.35 -->
            <span v-if="requiresRestart(key)" class="field-restart-note">
              Requires a server restart to take effect
            </span>

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
.admin-settings__textarea {
  height: auto;
  min-height: 8rem;
  padding: var(--space-2) var(--control-pad-x);
  font-family: var(--font-mono, ui-monospace, monospace);
  line-height: 1.5;
  resize: vertical;
}
.admin-settings__textarea--invalid {
  border-color: var(--error);
}
.admin-settings__option-help {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: var(--space-1) var(--space-3);
  margin: 0;
  max-width: 40rem;
  font-size: var(--text-xs);
}
.admin-settings__option-help-term {
  font-weight: var(--font-semibold);
  color: var(--text-muted);
}
.admin-settings__option-help-desc {
  margin: 0;
  color: var(--text-subtle);
}
.admin-settings__error {
  font-size: var(--text-xs);
  color: var(--error);
}
/* Secret field: configured / not-set cue above the (always empty) input */
.admin-settings__secret-status {
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: var(--space-2);
  margin: 0;
  max-width: 40rem;
}
.admin-settings__secret-badge {
  flex-shrink: 0;
}
.admin-settings__secret-hint {
  font-size: var(--text-xs);
  color: var(--text-subtle);
  line-height: var(--leading-normal, 1.5);
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

/* "This server is too old to send metadata" notice */
.settings-meta-notice {
  padding: var(--space-3) var(--space-4);
  margin-bottom: var(--space-4);
  border-radius: var(--radius-md);
  background: var(--surface-2);
  border: 1px solid var(--border);
  color: var(--text-muted);
  font-size: var(--text-sm);
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
.settings-restart-banner__actions {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  flex-shrink: 0;
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
.settings-restart-banner__btn:disabled,
.settings-restart-banner__dismiss:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
.settings-restart-banner__dismiss {
  padding: var(--space-1) var(--space-2);
  border-radius: var(--radius-sm);
  background: none;
  border: 1px solid currentcolor;
  color: inherit;
  font-size: var(--text-xs);
  cursor: pointer;
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

/* Per-field "requires restart" note */
.field-restart-note {
  font-size: var(--text-xs);
  color: var(--warning-text, var(--text-muted));
}

@media (prefers-reduced-motion: reduce) {
  .admin-settings__input,
  .settings-restart-banner__btn {
    transition: none;
  }
}
</style>
