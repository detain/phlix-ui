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
 * Secrets are sent only when the admin types a new value (masked as `***` on
 * load and when unchanged). Per-field validation errors from a
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
  type PluginSettingDescriptor,
} from '../../api/admin/plugins';
import { useToastStore } from '../../stores/useToastStore';
import { errMessage } from '../../api/errors';
import Badge from '../../components/ui/Badge.vue';
import Button from '../../components/ui/Button.vue';
import PageHint from '../../components/ui/PageHint.vue';
import Skeleton from '../../components/ui/Skeleton.vue';
import EmptyState from '../../components/ui/EmptyState.vue';
import Switch from '../../components/ui/Switch.vue';

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
    return;
  }

  loadingDetail.value = true;
  detailError.value = null;
  selectedPlugin.value = null;
  settingsValues.value = {};
  validationErrors.value = {};
  secretTouched.value = {};

  try {
    const detail = await api.get(plugin.name);
    selectedPlugin.value = detail;

    // Initialize form values from masked settings
    for (const [key, value] of Object.entries(detail.settings)) {
      settingsValues.value[key] = String(value ?? '');
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

function buildSettingsPayload(): Record<string, unknown> {
  const payload: Record<string, unknown> = {};
  if (!selectedPlugin.value) return payload;

  for (const [key, descriptor] of Object.entries(selectedPlugin.value.settings_schema)) {
    const value = settingsValues.value[key];

    // Secret fields: only send if user typed a new value (not the mask)
    if (descriptor.secret) {
      if (secretTouched.value[key] && value !== PLUGIN_SECRET_MASK) {
        payload[key] = value;
      }
      // If not touched or still the mask, omit — server keeps current
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
    </header>

    <PageHint>
      Manage settings for installed plugins. Click a plugin to expand its configuration
      form. Use the <strong>toggle</strong> to enable or disable a plugin without
      uninstalling it. Settings are validated against the plugin manifest schema.
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
              </label>

              <p v-if="descriptor.description" class="admin-plugin-config__desc">
                {{ descriptor.description }}
              </p>

              <!-- Boolean (checkbox) -->
              <template v-if="descriptor.type === 'bool' || descriptor.type === 'boolean'">
                <input
                  :id="`setting-${key}`"
                  v-model="settingsValues[key]"
                  type="checkbox"
                  :true-value="'true'"
                  :false-value="'false'"
                  class="admin-plugin-config__checkbox"
                />
                <span class="admin-plugin-config__checkbox-label">
                  {{ settingsValues[key] === 'true' ? 'Enabled' : 'Disabled' }}
                </span>
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
                  @input="descriptor.secret ? onSecretInput(key as string) : undefined"
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
  margin-bottom: 0.5rem;
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
