<!--
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
-->

<script setup lang="ts">
/**
 * Admin PluginConfigPage (U6 extended) — installed plugin settings management.
 *
 * Lists every installed plugin with its current enabled/disabled state and
 * provides a dedicated configuration view when a plugin is selected. Unlike
 * PluginsPage.vue (which also handles catalog browsing and installation), this
 * page focuses purely on:
 * - Toggling plugin enabled/disabled state
 * - Configuring plugin settings via the manifest settings_schema
 *
 * Secret fields start EMPTY — the server only ever sends the `***` mask for
 * them, so prefilling it made a configured secret look identical to an unset
 * one. A Configured/Not set cue driven by the server's `secret_status` carries
 * that information instead, and a blank secret is omitted from the save so the
 * stored value survives. Per-field validation errors from a
 * `400 plugin.settings.validation_failed` render under the offending field.
 * Errors surface as toasts.
 */
import { ref, computed, onMounted, inject, watch, type ComputedRef } from 'vue';
import { ApiClient } from '../../api/client';
import { LocalStorageTokenStore } from '../../api/tokenStore';
import {
  AdminPluginsApi,
  PLUGIN_SECRET_MASK,
  pluginErrorCode,
  pluginValidationErrors,
  type Plugin,
  type PluginDetail,
  type PluginSecretStatus,
  type PluginSettingDescriptor,
} from '../../api/admin/plugins';
import { useToastStore } from '../../stores/useToastStore';
import { useSettingsPrefsStore } from '../../stores/useSettingsPrefs';
import { errMessage } from '../../api/errors';
import Badge from '../../components/ui/Badge.vue';
import Button from '../../components/ui/Button.vue';
import PageHint from '../../components/ui/PageHint.vue';
import Skeleton from '../../components/ui/Skeleton.vue';
import EmptyState from '../../components/ui/EmptyState.vue';
import Switch from '../../components/ui/Switch.vue';
import HelpText from '../../components/ui/HelpText.vue';

const props = defineProps<{
  /** Inject a pre-built API client for tests; otherwise one is built from `apiBase`. */
  client?: ApiClient;
}>();

const injectedApiBase = inject<string | ComputedRef<string> | undefined>('apiBase', '');
const apiBase = computed(() =>
  typeof injectedApiBase === 'string' ? injectedApiBase : injectedApiBase?.value ?? '',
);
const api = new AdminPluginsApi(
  props.client ?? new ApiClient({ baseUrl: apiBase.value, tokenStore: new LocalStorageTokenStore() }),
);
const toasts = useToastStore();
const settingsPrefsStore = useSettingsPrefsStore();

// ── Installed plugin list state ──────────────────────────────────────────────
const plugins = ref<Plugin[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);

async function loadPlugins(): Promise<void> {
  loading.value = true;
  error.value = null;
  try {
    plugins.value = await api.list();
  } catch (e) {
    error.value = errMessage(e, 'Failed to load plugins.');
    toasts.error(error.value);
  } finally {
    loading.value = false;
  }
}

// ── Selected plugin for configuration ────────────────────────────────────────
const selectedPlugin = ref<PluginDetail | null>(null);
const loadingDetail = ref(false);
const detailError = ref<string | null>(null);

// Form state
const settingsValues = ref<Record<string, string>>({});
const validationErrors = ref<Record<string, string>>({});
const saving = ref(false);
const savingError = ref<string | null>(null);

// Test credentials state
const testing = ref(false);
const testResult = ref<{ success: boolean; message: string } | null>(null);

/** Map of setting key → whether the user has typed a new secret value */
const secretTouched = ref<Record<string, boolean>>({});

/**
 * Secret keys the admin has explicitly armed for removal.
 *
 * Secret inputs start blank and a blank field means "keep the stored value", so
 * clearing the box cannot express "delete this". This map is the explicit
 * opt-in: an armed key sends `''`, which the server persists as an empty secret
 * (it only skips a secret whose value is the mask sentinel).
 */
const secretRemoval = ref<Record<string, boolean>>({});

watch(settingsValues, () => {
  if (testResult.value !== null) {
    testResult.value = null;
  }
});

async function selectPlugin(plugin: Plugin): Promise<void> {
  // Already selected — deselect
  if (selectedPlugin.value?.name === plugin.name) {
    selectedPlugin.value = null;
    settingsValues.value = {};
    validationErrors.value = {};
    secretTouched.value = {};
    secretRemoval.value = {};
    return;
  }

  loadingDetail.value = true;
  detailError.value = null;
  selectedPlugin.value = null;
  settingsValues.value = {};
  validationErrors.value = {};
  secretTouched.value = {};
  secretRemoval.value = {};

  try {
    const detail = await api.get(plugin.name);
    selectedPlugin.value = detail;

    // Seed the form from the masked settings. Secret fields deliberately start
    // EMPTY (see `isSecretKey`) rather than pre-filled with the `***` sentinel
    // the server sends for them — see `toFormString`.
    for (const [key, value] of Object.entries(detail.settings)) {
      settingsValues.value[key] = toFormString(key, value);
    }
  } catch (e) {
    detailError.value = errMessage(e, `Failed to load plugin details for "${plugin.name}".`);
    toasts.error(detailError.value);
  } finally {
    loadingDetail.value = false;
  }
}

function onSecretInput(key: string): void {
  secretTouched.value[key] = true;
}

/** True when the loaded manifest schema flags this key `secret: true`. */
function isSecretKey(key: string): boolean {
  return selectedPlugin.value?.settings_schema[key]?.secret === true;
}

/**
 * Serialise a loaded value into its editable string form.
 *
 * Secret fields deliberately start EMPTY rather than pre-filled: the server only
 * ever sends {@link PLUGIN_SECRET_MASK} for them, so rendering that sentinel in
 * the input made a configured secret indistinguishable from an unset one while
 * putting a meaningless `***` in the DOM. An empty box plus the adjacent
 * Configured/Not set cue tells the truth instead. It also means an untouched
 * secret stays blank and is excluded from the PUT entirely, so the stored value
 * survives — and if a server ever regressed and sent a real secret, this keeps
 * it out of the DOM regardless.
 */
function toFormString(key: string, value: unknown): string {
  if (isSecretKey(key)) return '';
  return String(value ?? '');
}

/**
 * Whether a secret is configured on the server, or `null` when the server did
 * not report a status for it (too old to emit `secret_status`) — which must read
 * as "unknown", never as "not configured".
 */
function secretState(key: string): PluginSecretStatus | null {
  return selectedPlugin.value?.secret_status?.[key] ?? null;
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

/** True while `key` is armed to have its stored secret cleared on the next save. */
function isRemovingSecret(key: string): boolean {
  return secretRemoval.value[key] === true;
}

/**
 * Whether to offer a Remove control for a secret field.
 *
 * Offered unless the server positively reports the secret as unset — there is
 * nothing to remove then. A server too old to send `secret_status` reports
 * `null` (unknown), where the control MUST stay available: that admin may well
 * have a stored value and would otherwise have no way to clear it.
 */
function canRemoveSecret(key: string, descriptor: PluginSettingDescriptor): boolean {
  return descriptor.secret && !isDisabled(descriptor) && secretState(key)?.set !== false;
}

/**
 * Arm a secret for removal. Also drops any half-typed replacement, so the field
 * cannot both "be removed" and "carry a new value" — the two intents are
 * mutually exclusive and the last one clicked wins.
 */
function requestSecretRemoval(key: string): void {
  secretRemoval.value[key] = true;
  settingsValues.value[key] = '';
  delete secretTouched.value[key];
}

/** Disarm a pending removal, returning the field to "leave the stored value alone". */
function cancelSecretRemoval(key: string): void {
  delete secretRemoval.value[key];
}

function buildSettingsPayload(): Record<string, unknown> {
  const payload: Record<string, unknown> = {};
  if (!selectedPlugin.value) return payload;

  for (const [key, descriptor] of Object.entries(selectedPlugin.value.settings_schema)) {
    const value = settingsValues.value[key];

    // Advanced fields the admin cannot currently edit are omitted entirely, so a
    // save in Standard mode is a partial update and never rewrites them.
    if (isDisabled(descriptor)) continue;

    // Secret fields: only send a value the admin actually typed. Secrets start
    // blank, so an untouched one is `''` and is omitted — the server then keeps
    // whatever is stored. A BLANK field is likewise omitted even once touched
    // (typed-then-cleared means "never mind", not "wipe the stored secret" —
    // there is no other way to express "keep" after touching the field). The
    // mask guard is belt-and-braces: the sentinel is never seeded any more, so
    // this only fires if an admin literally types `***`, which the server would
    // read as "unchanged" anyway.
    if (descriptor.secret) {
      // An explicit removal wins over everything: `''` is what clears it.
      if (isRemovingSecret(key)) {
        payload[key] = '';
      } else if (secretTouched.value[key] && value !== '' && value !== PLUGIN_SECRET_MASK) {
        payload[key] = value;
      }
    } else {
      // Non-secret: always send (empty string becomes null for optional fields)
      payload[key] = value === '' ? null : castValue(value, descriptor.type);
    }
  }

  return payload;
}

function castValue(value: string, type: string): unknown {
  switch (type) {
    case 'int':
    case 'integer':
      return parseInt(value, 10) || 0;
    case 'bool':
    case 'boolean':
      return value === 'true' || value === '1';
    case 'number':
    case 'float':
      return parseFloat(value) || 0;
    case 'array':
    case 'object':
      try {
        return JSON.parse(value);
      } catch {
        return value;
      }
    default:
      return value;
  }
}

async function handleSaveSettings(): Promise<void> {
  if (!selectedPlugin.value || saving.value) return;

  saving.value = true;
  savingError.value = null;
  validationErrors.value = {};

  const payload = buildSettingsPayload();

  try {
    await api.updateSettings(selectedPlugin.value.name, payload);
    toasts.success(`Settings saved for "${selectedPlugin.value.name}".`);
    // Refresh plugin detail to get fresh masked values
    await selectPlugin({ name: selectedPlugin.value.name } as Plugin);
  } catch (e) {
    const code = pluginErrorCode(e);
    if (code === 'plugin.settings.validation_failed') {
      validationErrors.value = pluginValidationErrors(e);
      savingError.value = 'Please fix the errors below and try again.';
    } else {
      savingError.value = errMessage(e, 'Failed to save settings.');
      toasts.error(savingError.value);
    }
  } finally {
    saving.value = false;
  }
}

async function testPluginCredentials(): Promise<void> {
  if (!selectedPlugin.value || testing.value) return;

  testing.value = true;
  testResult.value = null;

  const payload = buildSettingsPayload();
  const stringSettings: Record<string, string> = {};
  for (const [key, value] of Object.entries(payload)) {
    stringSettings[key] = typeof value === 'string' ? value : JSON.stringify(value);
  }

  try {
    const result = await api.testCredentials(selectedPlugin.value.name, stringSettings);
    testResult.value = result;
    if (result.success) {
      toasts.success(`Test succeeded: ${result.message}`);
    } else {
      toasts.error(`Test failed: ${result.message}`);
    }
  } catch (e) {
    testResult.value = { success: false, message: errMessage(e, 'Test request failed.') };
    toasts.error(testResult.value.message);
  } finally {
    testing.value = false;
  }
}

async function copyToClipboard(text: string): Promise<void> {
  try {
    await navigator.clipboard.writeText(text);
    toasts.success('Copied to clipboard.');
  } catch {
    toasts.error('Failed to copy to clipboard.');
  }
}

// ── Enable / disable ──────────────────────────────────────────────────────────
const togglingPlugin = ref<string | null>(null);

async function handleToggle(plugin: Plugin): Promise<void> {
  if (togglingPlugin.value !== null) return;
  togglingPlugin.value = plugin.name;

  try {
    if (plugin.enabled) {
      await api.disable(plugin.name);
      toasts.success(`"${plugin.name}" has been disabled.`);
    } else {
      await api.enable(plugin.name);
      toasts.success(`"${plugin.name}" has been enabled.`);
    }
    await loadPlugins();
  } catch (e) {
    toasts.error(errMessage(e, `Failed to ${plugin.enabled ? 'disable' : 'enable'} "${plugin.name}".`));
  } finally {
    togglingPlugin.value = null;
  }
}

// ── Standard / Advanced tier gating (plan §3.3) ───────────────────────────────
/**
 * True when a descriptor is advanced-tier. Manifests (and the server's
 * field-help overlay) that predate the `tier` concept omit it entirely — a
 * missing tier is treated as `standard` so those plugins keep rendering exactly
 * as before.
 */
function isAdvanced(descriptor: PluginSettingDescriptor): boolean {
  return descriptor.tier === 'advanced';
}

/** Advanced fields always render, but stay greyed + disabled until Advanced is on. */
function isDisabled(descriptor: PluginSettingDescriptor): boolean {
  return isAdvanced(descriptor) && !settingsPrefsStore.advancedMode;
}

/**
 * Help links for a descriptor. `link_text` is independently optional, so a
 * link-only entry must still render — with a sensible default anchor — rather
 * than silently dropping the URL.
 */
function helpLinks(
  descriptor: PluginSettingDescriptor,
): Array<{ text: string; url: string }> | undefined {
  if (!descriptor.link) return undefined;
  return [{ text: descriptor.link_text || 'Learn more', url: descriptor.link }];
}

// ── Control type renderer helper ──────────────────────────────────────────────
function inputType(descriptor: PluginSettingDescriptor): string {
  switch (descriptor.type) {
    case 'int':
    case 'integer':
    case 'number':
    case 'float':
      return 'number';
    case 'bool':
    case 'boolean':
      return 'checkbox';
    default:
      return 'text';
  }
}

// ── Init ──────────────────────────────────────────────────────────────────────
onMounted(loadPlugins);
</script>

<template>
  <section class="admin-plugin-config" aria-labelledby="plugin-config-heading">
    <header class="admin-plugin-config__head">
      <h1 id="plugin-config-heading" class="admin-plugin-config__title">Plugin Configuration</h1>
      <div class="settings-advanced-toggle">
        <span class="settings-advanced-toggle__label">Advanced</span>
        <Switch
          :model-value="settingsPrefsStore.advancedMode"
          @update:model-value="settingsPrefsStore.setAdvancedMode($event)"
        />
      </div>
    </header>

    <PageHint>
      Manage settings for installed plugins. Click a plugin to expand its configuration
      form. Use the <strong>toggle</strong> to enable or disable a plugin without
      uninstalling it, and the <strong>Advanced</strong> switch to unlock expert-tier
      fields. Settings are validated against the plugin manifest schema.
    </PageHint>

    <!-- Plugin list -->
    <div class="admin-plugin-config__layout">
      <aside class="admin-plugin-config__sidebar">
        <div v-if="loading" class="admin-plugin-config__skel">
          <Skeleton variant="text" :lines="6" />
        </div>

        <EmptyState
          v-else-if="error"
          title="Couldn't load plugins"
          :message="error"
        >
          <Button variant="solid" size="sm" @click="loadPlugins">Retry</Button>
        </EmptyState>

        <EmptyState
          v-else-if="plugins.length === 0"
          title="No plugins installed"
          message="Install plugins from the Plugins catalog."
        />

        <ul v-else class="admin-plugin-config__list" aria-label="Installed plugins">
          <li
            v-for="plugin in plugins"
            :key="plugin.name"
            class="admin-plugin-config__list-item"
            :class="{ 'admin-plugin-config__list-item--selected': selectedPlugin?.name === plugin.name }"
          >
            <button
              class="admin-plugin-config__plugin-btn"
              type="button"
              :aria-expanded="selectedPlugin?.name === plugin.name"
              @click="selectPlugin(plugin)"
            >
              <div class="admin-plugin-config__plugin-info">
                <span class="admin-plugin-config__plugin-name">{{ plugin.name }}</span>
                <span class="admin-plugin-config__plugin-meta">
                  v{{ plugin.version }} · {{ plugin.type }}
                </span>
              </div>
              <div class="admin-plugin-config__plugin-right">
                <Badge :tone="plugin.enabled ? 'success' : 'neutral'">
                  {{ plugin.enabled ? 'Enabled' : 'Disabled' }}
                </Badge>
              </div>
            </button>

            <!-- Enable/disable toggle inline -->
            <div class="admin-plugin-config__toggle">
              <Switch
                :model-value="plugin.enabled"
                :loading="togglingPlugin === plugin.name"
                :disabled="togglingPlugin === plugin.name"
                size="sm"
                @update:model-value="handleToggle(plugin)"
              />
            </div>
          </li>
        </ul>
      </aside>

      <!-- Configuration panel -->
      <main class="admin-plugin-config__main">
        <div v-if="loadingDetail" class="admin-plugin-config__panel">
          <Skeleton variant="text" :lines="6" />
        </div>

        <EmptyState
          v-else-if="detailError"
          title="Couldn't load plugin"
          :message="detailError"
        />

        <EmptyState
          v-else-if="!selectedPlugin"
          title="Select a plugin"
          message="Click a plugin on the left to configure its settings."
        />

        <div v-else class="admin-plugin-config__panel" aria-live="polite">
          <header class="admin-plugin-config__panel-head">
            <h2 class="admin-plugin-config__panel-title">{{ selectedPlugin.name }}</h2>
            <p class="admin-plugin-config__panel-desc">
              v{{ selectedPlugin.version }} · {{ selectedPlugin.type }}
            </p>
          </header>

          <!-- Redirect URL display for OAuth-style plugins -->
          <div v-if="selectedPlugin.redirect_url" class="admin-plugin-config__redirect-url">
            <label class="admin-plugin-config__label">Redirect URL</label>
            <div class="admin-plugin-config__redirect-url-row">
              <code class="admin-plugin-config__redirect-url-value">{{ selectedPlugin.redirect_url }}</code>
              <Button
                variant="outline"
                size="sm"
                @click="copyToClipboard(selectedPlugin.redirect_url!)"
              >
                Copy
              </Button>
            </div>
          </div>

          <form class="admin-plugin-config__form" @submit.prevent="handleSaveSettings">
            <!-- Global error -->
            <div v-if="savingError" class="admin-plugin-config__error-banner" role="alert">
              {{ savingError }}
            </div>

            <!-- Settings fields -->
            <div
              v-for="(descriptor, key) in selectedPlugin.settings_schema"
              :key="key"
              class="admin-plugin-config__field"
            >
              <label
                :for="`setting-${key}`"
                class="admin-plugin-config__label"
              >
                {{ descriptor.label || key }}
                <span v-if="descriptor.required" class="admin-plugin-config__required">*</span>
                <span v-if="descriptor.secret" class="admin-plugin-config__secret-badge">Secret</span>
                <span v-if="isAdvanced(descriptor)" class="admin-plugin-config__advanced-badge">Advanced</span>
              </label>

              <HelpText
                v-if="descriptor.description || descriptor.link"
                :text="descriptor.description"
                :links="helpLinks(descriptor)"
              />

              <!-- Boolean (checkbox) -->
              <template v-if="descriptor.type === 'bool' || descriptor.type === 'boolean'">
                <input
                  :id="`setting-${key}`"
                  v-model="settingsValues[key]"
                  type="checkbox"
                  :true-value="'true'"
                  :false-value="'false'"
                  class="admin-plugin-config__checkbox"
                  :disabled="isDisabled(descriptor)"
                />
                <span class="admin-plugin-config__checkbox-label">
                  {{ settingsValues[key] === 'true' ? 'Enabled' : 'Disabled' }}
                </span>
              </template>

              <!--
                Secret string → always-empty password box + a Configured/Not set
                cue. The stored value never reaches the browser (the server sends
                only the mask sentinel), so the box starts blank and stays out of
                the PUT unless the admin types a replacement.
              -->
              <template v-else-if="descriptor.secret">
                <p :id="secretStatusId(key as string)" class="admin-plugin-config__secret-status">
                  <template v-if="isRemovingSecret(key as string)">
                    <Badge tone="warning" class="admin-plugin-config__secret-state">
                      Will be removed
                    </Badge>
                    <span class="admin-plugin-config__secret-hint">
                      The stored value will be deleted when you save. Undo to keep it.
                    </span>
                  </template>
                  <template v-else-if="secretState(key as string) === null">
                    <span class="admin-plugin-config__secret-hint">
                      This server did not report whether a value is stored. Type a new one to
                      replace whatever is there; leave it blank to keep it.
                    </span>
                  </template>
                  <template v-else-if="secretIsSet(key as string)">
                    <Badge tone="success" class="admin-plugin-config__secret-state">Configured</Badge>
                    <span class="admin-plugin-config__secret-hint">
                      A value is stored ({{ secretLength(key as string) }}
                      {{ secretLength(key as string) === 1 ? 'character' : 'characters' }}). It is
                      never sent to your browser. Leave this blank to keep it, or type a new one to
                      replace it.
                    </span>
                  </template>
                  <template v-else>
                    <Badge tone="neutral" class="admin-plugin-config__secret-state">Not set</Badge>
                    <span class="admin-plugin-config__secret-hint">No value is stored yet.</span>
                  </template>
                </p>
                <div class="admin-plugin-config__secret-row">
                  <input
                    :id="`setting-${key}`"
                    v-model="settingsValues[key]"
                    type="password"
                    autocomplete="new-password"
                    class="admin-plugin-config__input"
                    :class="{ 'admin-plugin-config__input--error': validationErrors[key] }"
                    :aria-describedby="secretStatusId(key as string)"
                    :placeholder="
                      isRemovingSecret(key as string)
                        ? 'Will be removed on save'
                        : secretIsSet(key as string)
                          ? 'Leave blank to keep the stored value'
                          : `Enter ${descriptor.label || key}`
                    "
                    :disabled="isDisabled(descriptor) || isRemovingSecret(key as string)"
                    @input="onSecretInput(key as string)"
                  />
                  <Button
                    v-if="isRemovingSecret(key as string)"
                    variant="ghost"
                    size="sm"
                    :aria-label="`Keep the stored ${descriptor.label || key}`"
                    @click="cancelSecretRemoval(key as string)"
                  >
                    Undo
                  </Button>
                  <Button
                    v-else-if="canRemoveSecret(key as string, descriptor)"
                    variant="ghost"
                    size="sm"
                    :aria-label="`Remove the stored ${descriptor.label || key}`"
                    @click="requestSecretRemoval(key as string)"
                  >
                    Remove
                  </Button>
                </div>
              </template>

              <!-- Text / number inputs -->
              <template v-else>
                <input
                  :id="`setting-${key}`"
                  v-model="settingsValues[key]"
                  :type="inputType(descriptor)"
                  class="admin-plugin-config__input"
                  :class="{ 'admin-plugin-config__input--error': validationErrors[key] }"
                  :placeholder="descriptor.default !== undefined ? String(descriptor.default) : ''"
                  :disabled="isDisabled(descriptor)"
                />
              </template>

              <!-- Per-field validation error -->
              <p v-if="validationErrors[key]" class="admin-plugin-config__field-error" role="alert">
                {{ validationErrors[key] }}
              </p>
            </div>

            <div class="admin-plugin-config__actions">
              <Button
                type="submit"
                variant="solid"
                :loading="saving"
                :disabled="saving"
              >
                Save settings
              </Button>
              <Button
                variant="outline"
                :loading="testing"
                :disabled="testing || saving"
                @click="testPluginCredentials"
              >
                Test credentials
              </Button>
            </div>

            <!-- Inline test result -->
            <div
              v-if="testResult"
              class="admin-plugin-config__test-result"
              :class="testResult.success ? 'admin-plugin-config__test-result--success' : 'admin-plugin-config__test-result--error'"
              role="alert"
            >
              {{ testResult.message }}
            </div>
          </form>
        </div>
      </main>
    </div>
  </section>
</template>

<style scoped>
.admin-plugin-config {
  padding: 1.5rem;
  max-width: 1400px;
}

.admin-plugin-config__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 0.5rem;
}

.settings-advanced-toggle {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2, 0.5rem);
  padding: var(--space-2, 0.5rem) var(--space-3, 0.75rem);
  border-radius: var(--radius-md, 6px);
  background: var(--surface-2, #f8f9fa);
  border: 1px solid var(--border-subtle, #e5e7eb);
}

.settings-advanced-toggle__label {
  font-size: var(--text-xs, 0.75rem);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-muted, #6b7280);
}

.admin-plugin-config__advanced-badge {
  font-size: 0.6rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 0.1em 0.4em;
  border-radius: var(--radius-sm, 4px);
  background: var(--surface-2, #f8f9fa);
  border: 1px solid var(--border, #e5e7eb);
  color: var(--text-subtle, #6b7280);
}

.admin-plugin-config__input:disabled,
.admin-plugin-config__checkbox:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.admin-plugin-config__title {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--color-heading, #1a1a1a);
  margin: 0;
}

.admin-plugin-config__layout {
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: 1.5rem;
  margin-top: 1.5rem;
  min-height: 500px;
}

.admin-plugin-config__sidebar {
  background: var(--color-background, #ffffff);
  border: 1px solid var(--color-border, #e5e7eb);
  border-radius: 8px;
  overflow: hidden;
  height: fit-content;
}

.admin-plugin-config__skel {
  padding: 1rem;
}

.admin-plugin-config__list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.admin-plugin-config__list-item {
  border-bottom: 1px solid var(--color-border, #e5e7eb);
  position: relative;
}

.admin-plugin-config__list-item:last-child {
  border-bottom: none;
}

.admin-plugin-config__list-item--selected {
  background: var(--color-surface, #f8f9fa);
}

.admin-plugin-config__plugin-btn {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
  gap: 0.5rem;
}

.admin-plugin-config__plugin-btn:hover {
  background: var(--color-surface, #f8f9fa);
}

.admin-plugin-config__plugin-info {
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
  min-width: 0;
}

.admin-plugin-config__plugin-name {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-text, #1a1a1a);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.admin-plugin-config__plugin-meta {
  font-size: 0.75rem;
  color: var(--color-text-muted, #6b7280);
}

.admin-plugin-config__plugin-right {
  flex-shrink: 0;
}

.admin-plugin-config__toggle {
  padding: 0 1rem 0.75rem;
  display: flex;
  justify-content: flex-end;
}

.admin-plugin-config__main {
  min-width: 0;
}

.admin-plugin-config__panel {
  background: var(--color-background, #ffffff);
  border: 1px solid var(--color-border, #e5e7eb);
  border-radius: 8px;
  padding: 1.5rem;
}

.admin-plugin-config__panel-head {
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--color-border, #e5e7eb);
}

.admin-plugin-config__panel-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--color-heading, #1a1a1a);
  margin: 0 0 0.25rem;
}

.admin-plugin-config__panel-desc {
  font-size: 0.875rem;
  color: var(--color-text-muted, #6b7280);
  margin: 0;
}

.admin-plugin-config__form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.admin-plugin-config__error-banner {
  padding: 0.75rem 1rem;
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 6px;
  color: #dc2626;
  font-size: 0.875rem;
}

.admin-plugin-config__field {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
}

.admin-plugin-config__label {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-text, #1a1a1a);
  display: flex;
  align-items: center;
  gap: 0.375rem;
}

.admin-plugin-config__required {
  color: #dc2626;
}

.admin-plugin-config__secret-badge {
  font-size: 0.625rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 0.125rem 0.375rem;
  background: #fef3c7;
  color: #92400e;
  border-radius: 4px;
}

.admin-plugin-config__secret-status {
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 0.375rem;
  margin: 0;
  font-size: 0.8125rem;
  color: var(--color-text-muted, #6b7280);
  line-height: 1.4;
}

.admin-plugin-config__secret-state {
  flex-shrink: 0;
}

.admin-plugin-config__secret-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  max-width: 400px;
}

.admin-plugin-config__secret-hint {
  min-width: 0;
}

.admin-plugin-config__desc {
  font-size: 0.8125rem;
  color: var(--color-text-muted, #6b7280);
  margin: 0;
  line-height: 1.4;
}

.admin-plugin-config__input {
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  border: 1px solid var(--color-border, #e5e7eb);
  border-radius: 6px;
  background: var(--color-background, #ffffff);
  color: var(--color-text, #1a1a1a);
  transition: border-color 0.15s ease;
  width: 100%;
  max-width: 400px;
}

.admin-plugin-config__input:focus {
  outline: none;
  border-color: var(--color-primary, #3b82f6);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.admin-plugin-config__input--error {
  border-color: #dc2626;
}

.admin-plugin-config__input--error:focus {
  box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
}

.admin-plugin-config__checkbox {
  width: 1rem;
  height: 1rem;
  cursor: pointer;
}

.admin-plugin-config__checkbox-label {
  font-size: 0.875rem;
  color: var(--color-text, #1a1a1a);
  margin-left: 0.5rem;
}

.admin-plugin-config__field-error {
  font-size: 0.8125rem;
  color: #dc2626;
  margin: 0;
}

.admin-plugin-config__actions {
  margin-top: 0.5rem;
  padding-top: 1rem;
  border-top: 1px solid var(--color-border, #e5e7eb);
  display: flex;
  gap: 0.75rem;
  align-items: center;
}

.admin-plugin-config__redirect-url {
  margin-bottom: 1rem;
  padding: 0.75rem 1rem;
  background: var(--color-surface, #f8f9fa);
  border: 1px solid var(--color-border, #e5e7eb);
  border-radius: 6px;
}

.admin-plugin-config__redirect-url-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-top: 0.375rem;
}

.admin-plugin-config__redirect-url-value {
  font-size: 0.8125rem;
  color: var(--color-text, #1a1a1a);
  background: var(--color-background, #ffffff);
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  border: 1px solid var(--color-border, #e5e7eb);
  word-break: break-all;
  flex: 1;
}

.admin-plugin-config__test-result {
  margin-top: 0.75rem;
  padding: 0.75rem 1rem;
  border-radius: 6px;
  font-size: 0.875rem;
}

.admin-plugin-config__test-result--success {
  background: #f0fdf4;
  border: 1px solid #86efac;
  color: #166534;
}

.admin-plugin-config__test-result--error {
  background: #fef2f2;
  border: 1px solid #fecaca;
  color: #dc2626;
}
</style>
