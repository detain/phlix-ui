<!--
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
-->

<script setup lang="ts">
/**
 * Admin IntegrationsPage (RA.6) — a 1:1 port of the deleted React
 * `IntegrationsPage` onto the `@phlix/ui` primitives. Two sections:
 *
 *   1. Arr sync (TRaSH-Guides) — status (last sync + enabled), an auto-sync
 *      `Switch`, and a "Sync now" trigger that may be long (button spinner +
 *      disabled + a 30 s client-side timeout toast, matching the React source).
 *   2. Authentication providers (OIDC + LDAP) — enable/disable each via a
 *      `Switch`, and configure each in a `Modal` form (OIDC: provider URL /
 *      client id / secret / scopes; LDAP: host / port / ssl / DNs / filter /
 *      group / bind password + a "Test connection" action). Secrets are entered
 *      in password inputs with a show/hide toggle and are omitted from the save
 *      body when left blank so the server keeps the existing value.
 *
 * Each mutation awaits a refetch afterward. Errors surface as toasts; form
 * validation errors render inline. The sync-timeout timer clears on unmount.
 */
import { ref, computed, onMounted, onBeforeUnmount, inject, type ComputedRef } from 'vue';
import { ApiClient } from '../../api/client';
import { LocalStorageTokenStore } from '../../api/tokenStore';
import {
  AdminIntegrationsApi,
  type ArrSyncStatus,
  type AuthProvider,
  type OidcSettings,
  type LdapSettings,
  type SaveOidcInput,
  type SaveLdapInput,
} from '../../api/admin/integrations';
import { useToastStore } from '../../stores/useToastStore';
import { errMessage } from '../../api/errors';
import Badge from '../../components/ui/Badge.vue';
import PageHint from '../../components/ui/PageHint.vue';
import { adminPageHelp } from './helpLinks';
import Button from '../../components/ui/Button.vue';
import Modal from '../../components/ui/Modal.vue';
import Switch from '../../components/ui/Switch.vue';
import Skeleton from '../../components/ui/Skeleton.vue';
import EmptyState from '../../components/ui/EmptyState.vue';

type ProviderName = 'oidc' | 'ldap';

/** Map provider name → display label. */
const PROVIDER_LABELS: Record<ProviderName, string> = {
  oidc: 'OIDC',
  ldap: 'LDAP',
};

const PROVIDER_NAMES: ProviderName[] = ['oidc', 'ldap'];
const SYNC_TIMEOUT_MS = 30_000;
const DEFAULT_SCOPES = 'openid profile email';

const props = defineProps<{
  /** Inject a pre-built API client for tests; otherwise one is built from `apiBase`. */
  client?: ApiClient;
}>();

const injectedApiBase = inject<string | ComputedRef<string> | undefined>('apiBase', '');
const apiBase = computed(() =>
  typeof injectedApiBase === 'string' ? injectedApiBase : injectedApiBase?.value ?? '',
);
const api = new AdminIntegrationsApi(
  props.client ?? new ApiClient({ baseUrl: apiBase.value, tokenStore: new LocalStorageTokenStore() }),
);
const toasts = useToastStore();

// ── Arr sync state ────────────────────────────────────────────────────────────
const syncStatus = ref<ArrSyncStatus | null>(null);
const syncLoading = ref(true);
const syncError = ref<string | null>(null);
const syncing = ref(false);
let syncTimer: ReturnType<typeof setTimeout> | null = null;

function clearSyncTimer(): void {
  if (syncTimer !== null) {
    clearTimeout(syncTimer);
    syncTimer = null;
  }
}

async function loadSyncStatus(): Promise<void> {
  syncLoading.value = true;
  syncError.value = null;
  try {
    syncStatus.value = await api.getSyncStatus();
  } catch (e) {
    syncError.value = errMessage(e, 'Failed to load sync status.');
    toasts.error(syncError.value);
  } finally {
    syncLoading.value = false;
  }
}

async function triggerSync(): Promise<void> {
  if (syncing.value) return;
  syncing.value = true;
  let timedOut = false;
  clearSyncTimer();
  syncTimer = setTimeout(() => {
    timedOut = true;
    syncing.value = false;
    toasts.error('Sync timed out after 30 seconds. Check the server logs.');
  }, SYNC_TIMEOUT_MS);

  try {
    const result = await api.triggerSync();
    clearSyncTimer();
    if (timedOut) return;
    if (result.success) {
      toasts.success(result.message || 'Sync complete.');
      await loadSyncStatus();
    } else {
      toasts.error(result.message || 'Sync failed.');
    }
  } catch (e) {
    clearSyncTimer();
    if (timedOut) return;
    toasts.error(errMessage(e, 'Sync request failed.'));
  } finally {
    if (!timedOut) syncing.value = false;
  }
}

async function toggleSyncEnabled(enabled: boolean): Promise<void> {
  try {
    await api.setSyncEnabled(enabled);
    toasts.success(enabled ? 'Auto-sync enabled.' : 'Auto-sync disabled.');
    await loadSyncStatus();
  } catch (e) {
    toasts.error(errMessage(e, 'Failed to update sync setting.'));
  }
}

// ── Auth providers state ────────────────────────────────────────────────────
const providers = ref<AuthProvider[]>([]);
const providersLoading = ref(true);
const providersError = ref<string | null>(null);

const oidcSettings = ref<OidcSettings | null>(null);
const ldapSettings = ref<LdapSettings | null>(null);

async function loadProviders(): Promise<void> {
  providersLoading.value = true;
  providersError.value = null;
  try {
    providers.value = await api.listProviders();
  } catch (e) {
    providersError.value = errMessage(e, 'Failed to load auth providers.');
    toasts.error(providersError.value);
  } finally {
    providersLoading.value = false;
  }
}

// Determine which providers are currently enabled. The server reports
// `configured` per settings payload; fall back to the list `supports_authentication`.
function providerEnabled(name: ProviderName): boolean {
  if (name === 'oidc') return oidcSettings.value?.configured ?? false;
  if (name === 'ldap') return ldapSettings.value?.configured ?? false;
  const p = providers.value.find((pr) => pr.name === name);
  return p?.supports_authentication ?? false;
}

async function toggleProvider(name: ProviderName, currentEnabled: boolean): Promise<void> {
  try {
    if (currentEnabled) {
      await api.disableProvider(name);
      toasts.success(`${PROVIDER_LABELS[name]} disabled.`);
    } else {
      await api.enableProvider(name);
      toasts.success(`${PROVIDER_LABELS[name]} enabled.`);
    }
    await loadProviders();
  } catch (e) {
    toasts.error(errMessage(e, `Failed to update ${PROVIDER_LABELS[name]}.`));
  }
}

// ── OIDC config modal ─────────────────────────────────────────────────────────
const oidcModalOpen = ref(false);
const oidcForm = ref({ provider_url: '', client_id: '', client_secret: '', scopes: DEFAULT_SCOPES });
const oidcSaving = ref(false);
const oidcFormError = ref('');
const showOidcSecret = ref(false);

async function openOidcConfig(): Promise<void> {
  oidcFormError.value = '';
  showOidcSecret.value = false;
  try {
    const settings = await api.getOidcSettings();
    oidcSettings.value = settings;
    oidcForm.value = {
      provider_url: settings.provider_url ?? '',
      client_id: settings.client_id ?? '',
      client_secret: '',
      scopes: settings.scopes ?? DEFAULT_SCOPES,
    };
  } catch (e) {
    toasts.error(errMessage(e, 'Failed to load OIDC settings.'));
  }
  oidcModalOpen.value = true;
}

function closeOidcConfig(): void {
  oidcModalOpen.value = false;
  oidcFormError.value = '';
}

async function saveOidc(): Promise<void> {
  oidcFormError.value = '';
  if (!oidcForm.value.provider_url.trim()) {
    oidcFormError.value = 'Provider URL is required.';
    return;
  }
  if (!oidcForm.value.client_id.trim()) {
    oidcFormError.value = 'Client ID is required.';
    return;
  }
  oidcSaving.value = true;
  try {
    const input: SaveOidcInput = {
      provider_url: oidcForm.value.provider_url.trim(),
      client_id: oidcForm.value.client_id.trim(),
      scopes: oidcForm.value.scopes.trim() || DEFAULT_SCOPES,
    };
    if (oidcForm.value.client_secret.trim()) {
      input.client_secret = oidcForm.value.client_secret;
    }
    await api.saveOidcSettings(input);
    toasts.success('OIDC settings saved.');
    oidcModalOpen.value = false;
    // Refetch the settings too — `providerEnabled()` reads `oidcSettings.configured`,
    // so a first-time configure must refresh it (not just the provider list).
    oidcSettings.value = await api.getOidcSettings();
    await loadProviders();
  } catch (e) {
    oidcFormError.value = errMessage(e, 'Failed to save OIDC settings.');
  } finally {
    oidcSaving.value = false;
  }
}

// ── LDAP config modal ─────────────────────────────────────────────────────────
const ldapModalOpen = ref(false);
const ldapForm = ref({
  host: '',
  port: 389,
  ssl: false,
  base_dn: '',
  bind_dn: '',
  bind_pw: '',
  user_filter: '',
  admin_group: '',
});
const ldapSaving = ref(false);
const ldapTesting = ref(false);
const ldapFormError = ref('');
const showLdapBindPw = ref(false);

async function openLdapConfig(): Promise<void> {
  ldapFormError.value = '';
  showLdapBindPw.value = false;
  try {
    const settings = await api.getLdapSettings();
    ldapSettings.value = settings;
    ldapForm.value = {
      host: settings.host ?? '',
      port: settings.port ?? 389,
      ssl: settings.ssl ?? false,
      base_dn: settings.base_dn ?? '',
      bind_dn: settings.bind_dn ?? '',
      bind_pw: '',
      user_filter: settings.user_filter ?? '',
      admin_group: settings.admin_group ?? '',
    };
  } catch (e) {
    toasts.error(errMessage(e, 'Failed to load LDAP settings.'));
  }
  ldapModalOpen.value = true;
}

function closeLdapConfig(): void {
  ldapModalOpen.value = false;
  ldapFormError.value = '';
}

function buildLdapInput(): SaveLdapInput {
  const input: SaveLdapInput = {
    host: ldapForm.value.host.trim(),
    port: ldapForm.value.port,
    ssl: ldapForm.value.ssl,
    base_dn: ldapForm.value.base_dn.trim(),
    bind_dn: ldapForm.value.bind_dn.trim(),
    user_filter: ldapForm.value.user_filter.trim(),
    admin_group: ldapForm.value.admin_group.trim(),
  };
  if (ldapForm.value.bind_pw.trim()) {
    input.bind_pw = ldapForm.value.bind_pw;
  }
  return input;
}

async function saveLdap(): Promise<void> {
  ldapFormError.value = '';
  if (!ldapForm.value.host.trim()) {
    ldapFormError.value = 'Host is required.';
    return;
  }
  if (!ldapForm.value.base_dn.trim()) {
    ldapFormError.value = 'Base DN is required.';
    return;
  }
  ldapSaving.value = true;
  try {
    await api.saveLdapSettings(buildLdapInput());
    toasts.success('LDAP settings saved.');
    ldapModalOpen.value = false;
    // Refetch the settings too — `providerEnabled()` reads `ldapSettings.configured`,
    // so a first-time configure must refresh it (not just the provider list).
    ldapSettings.value = await api.getLdapSettings();
    await loadProviders();
  } catch (e) {
    ldapFormError.value = errMessage(e, 'Failed to save LDAP settings.');
  } finally {
    ldapSaving.value = false;
  }
}

async function testLdap(): Promise<void> {
  ldapTesting.value = true;
  try {
    const result = await api.testLdapConnection(buildLdapInput());
    if (result.success) {
      toasts.success(result.message || 'Connection OK.');
    } else {
      toasts.error(result.message || 'Connection failed.');
    }
  } catch (e) {
    toasts.error(errMessage(e, 'LDAP connection test failed.'));
  } finally {
    ldapTesting.value = false;
  }
}

function onPortInput(value: string): void {
  const n = parseInt(value, 10);
  ldapForm.value.port = Number.isNaN(n) ? 0 : n;
}

function openProviderConfig(name: ProviderName): void {
  if (name === 'oidc') {
    void openOidcConfig();
  } else {
    void openLdapConfig();
  }
}

onMounted(() => {
  void loadSyncStatus();
  void loadProviders();
});
onBeforeUnmount(clearSyncTimer);
</script>

<template>
  <section class="admin-integrations" aria-labelledby="integrations-heading">
    <header class="admin-integrations__head">
      <h1 id="integrations-heading" class="admin-integrations__title">Integrations</h1>
    </header>

    <PageHint :links="adminPageHelp.integrations.links" :details="adminPageHelp.integrations.details" title="What's on this page">
      Connect Phlix to outside tools. <strong>Arr sync</strong> pulls quality-profile settings
      from TRaSH-Guides for Radarr/Sonarr — <strong>Sync now</strong> runs it once, and
      <strong>Auto-sync</strong> keeps it updated on a schedule. The
      <strong>OIDC</strong> and <strong>LDAP</strong> sections let people sign in with your
      company's single-sign-on or directory: flip a section's switch to turn that login method on,
      then use <strong>Configure</strong> to enter the connection details (provider URL, client
      ID/secret for OIDC; host, port, base DN, and bind credentials for LDAP).
      <strong>Test connection</strong> in the LDAP dialog checks your settings before you
      <strong>Save</strong>.
    </PageHint>

    <!-- Section 1: Arr sync -->
    <section class="admin-integrations__section" aria-labelledby="arr-sync-heading">
      <div class="admin-integrations__section-head">
        <h2 id="arr-sync-heading" class="admin-integrations__section-title">Arr sync (TRaSH-Guides)</h2>
        <Badge v-if="syncStatus" :tone="syncStatus.enabled ? 'success' : 'neutral'">
          {{ syncStatus.enabled ? 'Enabled' : 'Disabled' }}
        </Badge>
      </div>

      <div class="admin-integrations__card">
        <div v-if="syncLoading" class="admin-integrations__skel"><Skeleton variant="text" :lines="3" /></div>
        <EmptyState
          v-else-if="syncError"
          icon="alert"
          title="Couldn't load sync status"
          :description="syncError"
        >
          <template #actions>
            <Button variant="solid" size="sm" left-icon="rewind" @click="loadSyncStatus">Retry</Button>
          </template>
        </EmptyState>
        <p v-else-if="syncStatus === null" class="admin-integrations__empty" role="status">
          No sync status available.
        </p>
        <template v-else>
          <dl class="admin-integrations__dl">
            <dt class="admin-integrations__dt">Last sync</dt>
            <dd class="admin-integrations__dd">{{ syncStatus.last_sync_at ?? 'Never synced' }}</dd>
            <dt class="admin-integrations__dt">Auto-sync</dt>
            <dd class="admin-integrations__dd">
              <Switch
                :model-value="syncStatus.enabled"
                :label="syncStatus.enabled ? 'Enabled' : 'Disabled'"
                @update:model-value="toggleSyncEnabled"
              />
            </dd>
          </dl>
          <div class="admin-integrations__card-actions">
            <Button variant="solid" size="sm" left-icon="rewind" :loading="syncing" @click="triggerSync">
              {{ syncing ? 'Syncing' : 'Sync now' }}
            </Button>
          </div>
        </template>
      </div>
    </section>

    <!-- Section 2: Auth providers -->
    <section class="admin-integrations__section" aria-labelledby="auth-providers-heading">
      <div class="admin-integrations__section-head">
        <h2 id="auth-providers-heading" class="admin-integrations__section-title">
          Authentication providers
        </h2>
      </div>

      <div v-if="providersLoading" class="admin-integrations__skel"><Skeleton variant="text" :lines="4" /></div>
      <EmptyState
        v-else-if="providersError"
        icon="alert"
        title="Couldn't load auth providers"
        :description="providersError"
      >
        <template #actions>
          <Button variant="solid" size="sm" left-icon="rewind" @click="loadProviders">Retry</Button>
        </template>
      </EmptyState>
      <div v-else class="admin-integrations__providers">
        <div v-for="name in PROVIDER_NAMES" :key="name" class="admin-integrations__provider">
          <div class="admin-integrations__provider-info">
            <span class="admin-integrations__provider-name">{{ PROVIDER_LABELS[name] }}</span>
            <Badge :tone="providerEnabled(name) ? 'success' : 'neutral'">
              {{ providerEnabled(name) ? 'Enabled' : 'Disabled' }}
            </Badge>
          </div>
          <div class="admin-integrations__provider-actions">
            <Switch
              :model-value="providerEnabled(name)"
              :label="`Enable ${PROVIDER_LABELS[name]}`"
              @update:model-value="() => toggleProvider(name, providerEnabled(name))"
            />
            <Button
              variant="outline"
              size="sm"
              left-icon="settings"
              :aria-label="`Configure ${PROVIDER_LABELS[name]}`"
              @click="openProviderConfig(name)"
            >
              Configure
            </Button>
          </div>
        </div>
      </div>
    </section>

    <!-- OIDC config modal -->
    <Modal v-model="oidcModalOpen" title="Configure OIDC" @close="closeOidcConfig">
      <form class="admin-integrations__form" @submit.prevent="saveOidc">
        <label class="admin-integrations__field">
          <span class="admin-integrations__label">Provider URL</span>
          <input
            v-model="oidcForm.provider_url"
            type="text"
            class="admin-integrations__input"
            placeholder="https://idp.example.com"
            autocomplete="off"
            required
          />
        </label>
        <label class="admin-integrations__field">
          <span class="admin-integrations__label">Client ID</span>
          <input
            v-model="oidcForm.client_id"
            type="text"
            class="admin-integrations__input"
            autocomplete="off"
            required
          />
        </label>
        <label class="admin-integrations__field">
          <span class="admin-integrations__label">Client secret</span>
          <span class="admin-integrations__hint">
            {{ oidcSettings?.configured ? 'Leave blank to keep the current secret.' : 'Required when configuring for the first time.' }}
          </span>
          <div class="admin-integrations__password-row">
            <input
              v-model="oidcForm.client_secret"
              :type="showOidcSecret ? 'text' : 'password'"
              class="admin-integrations__input"
              :placeholder="oidcSettings?.configured ? '(unchanged)' : 'Client secret'"
              autocomplete="new-password"
            />
            <Button
              variant="ghost"
              size="sm"
              :left-icon="showOidcSecret ? 'eye-off' : 'eye'"
              :aria-label="showOidcSecret ? 'Hide secret' : 'Show secret'"
              @click="showOidcSecret = !showOidcSecret"
            >
              {{ showOidcSecret ? 'Hide' : 'Show' }}
            </Button>
          </div>
        </label>
        <label class="admin-integrations__field">
          <span class="admin-integrations__label">Scopes</span>
          <input
            v-model="oidcForm.scopes"
            type="text"
            class="admin-integrations__input"
            placeholder="openid profile email"
            autocomplete="off"
          />
        </label>
        <p v-if="oidcFormError" class="admin-integrations__error" role="alert">{{ oidcFormError }}</p>
      </form>
      <template #footer>
        <Button variant="ghost" size="sm" @click="closeOidcConfig">Cancel</Button>
        <Button variant="solid" size="sm" :loading="oidcSaving" @click="saveOidc">Save OIDC</Button>
      </template>
    </Modal>

    <!-- LDAP config modal -->
    <Modal v-model="ldapModalOpen" title="Configure LDAP" size="lg" @close="closeLdapConfig">
      <form class="admin-integrations__form" @submit.prevent="saveLdap">
        <label class="admin-integrations__field">
          <span class="admin-integrations__label">Host</span>
          <input
            v-model="ldapForm.host"
            type="text"
            class="admin-integrations__input"
            placeholder="ldap.example.com"
            autocomplete="off"
            required
          />
        </label>
        <label class="admin-integrations__field">
          <span class="admin-integrations__label">Port</span>
          <input
            :value="ldapForm.port"
            type="number"
            min="1"
            max="65535"
            class="admin-integrations__input"
            autocomplete="off"
            @input="onPortInput(($event.target as HTMLInputElement).value)"
          />
        </label>
        <Switch v-model="ldapForm.ssl" label="Use SSL" />
        <label class="admin-integrations__field">
          <span class="admin-integrations__label">Base DN</span>
          <input
            v-model="ldapForm.base_dn"
            type="text"
            class="admin-integrations__input"
            placeholder="dc=example,dc=com"
            autocomplete="off"
            required
          />
        </label>
        <label class="admin-integrations__field">
          <span class="admin-integrations__label">Bind DN</span>
          <input
            v-model="ldapForm.bind_dn"
            type="text"
            class="admin-integrations__input"
            placeholder="cn=admin,dc=example,dc=com"
            autocomplete="off"
          />
        </label>
        <label class="admin-integrations__field">
          <span class="admin-integrations__label">Bind password</span>
          <span class="admin-integrations__hint">
            {{ ldapSettings?.configured ? 'Leave blank to keep the current password.' : 'Required when configuring for the first time.' }}
          </span>
          <div class="admin-integrations__password-row">
            <input
              v-model="ldapForm.bind_pw"
              :type="showLdapBindPw ? 'text' : 'password'"
              class="admin-integrations__input"
              :placeholder="ldapSettings?.configured ? '(unchanged)' : 'Bind password'"
              autocomplete="new-password"
            />
            <Button
              variant="ghost"
              size="sm"
              :left-icon="showLdapBindPw ? 'eye-off' : 'eye'"
              :aria-label="showLdapBindPw ? 'Hide password' : 'Show password'"
              @click="showLdapBindPw = !showLdapBindPw"
            >
              {{ showLdapBindPw ? 'Hide' : 'Show' }}
            </Button>
          </div>
        </label>
        <label class="admin-integrations__field">
          <span class="admin-integrations__label">User filter</span>
          <input
            v-model="ldapForm.user_filter"
            type="text"
            class="admin-integrations__input"
            placeholder="(uid=%s)"
            autocomplete="off"
          />
        </label>
        <label class="admin-integrations__field">
          <span class="admin-integrations__label">Admin group DN</span>
          <input
            v-model="ldapForm.admin_group"
            type="text"
            class="admin-integrations__input"
            placeholder="cn=admins,dc=example,dc=com"
            autocomplete="off"
          />
        </label>
        <p v-if="ldapFormError" class="admin-integrations__error" role="alert">{{ ldapFormError }}</p>
      </form>
      <template #footer>
        <Button variant="ghost" size="sm" @click="closeLdapConfig">Cancel</Button>
        <Button
          variant="outline"
          size="sm"
          left-icon="settings"
          :loading="ldapTesting"
          :disabled="ldapSaving"
          @click="testLdap"
        >
          Test connection
        </Button>
        <Button variant="solid" size="sm" :loading="ldapSaving" :disabled="ldapTesting" @click="saveLdap">
          Save LDAP
        </Button>
      </template>
    </Modal>
  </section>
</template>

<style scoped>
.admin-integrations {
  max-width: 1100px;
  margin: 0 auto;
  padding: var(--space-6);
}
.admin-integrations__head {
  margin-bottom: var(--space-6);
}
.admin-integrations__title {
  font-family: var(--font-display);
  font-weight: var(--font-semibold);
  font-size: var(--text-xl);
  letter-spacing: var(--tracking-tight);
  color: var(--text);
}
.admin-integrations__section {
  margin-bottom: var(--space-8);
}
.admin-integrations__section-head {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  margin-bottom: var(--space-4);
}
.admin-integrations__section-title {
  font-family: var(--font-display);
  font-weight: var(--font-semibold);
  font-size: var(--text-lg);
  letter-spacing: var(--tracking-tight);
  color: var(--text);
}
.admin-integrations__card {
  padding: var(--space-5);
  border-radius: var(--radius-lg);
  background: var(--surface-1, var(--surface));
  border: 1px solid var(--border-subtle);
}
.admin-integrations__skel {
  padding-block: var(--space-2);
}
.admin-integrations__empty {
  color: var(--text-muted);
  font-size: var(--text-sm);
}
.admin-integrations__dl {
  display: grid;
  grid-template-columns: max-content 1fr;
  gap: var(--space-2) var(--space-5);
  align-items: center;
  margin-bottom: var(--space-4);
}
.admin-integrations__dt {
  font-size: var(--text-xs);
  font-weight: var(--font-semibold);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  color: var(--text-subtle);
}
.admin-integrations__dd {
  color: var(--text);
  font-size: var(--text-sm);
}
.admin-integrations__card-actions {
  display: flex;
  gap: var(--space-3);
}
.admin-integrations__providers {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}
.admin-integrations__provider {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  padding: var(--space-4) var(--space-5);
  border-radius: var(--radius-lg);
  background: var(--surface-1, var(--surface));
  border: 1px solid var(--border-subtle);
}
.admin-integrations__provider-info {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}
.admin-integrations__provider-name {
  font-weight: var(--font-semibold);
  color: var(--text);
}
.admin-integrations__provider-actions {
  display: flex;
  align-items: center;
  gap: var(--space-4);
}

/* Forms */
.admin-integrations__form {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}
.admin-integrations__field {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}
.admin-integrations__label {
  font-size: var(--text-xs);
  font-weight: var(--font-semibold);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  color: var(--text-subtle);
}
.admin-integrations__hint {
  font-size: var(--text-xs);
  color: var(--text-subtle);
}
.admin-integrations__input {
  width: 100%;
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
.admin-integrations__input:focus-visible {
  outline: none;
  border-color: var(--accent-ring);
  box-shadow: 0 0 0 3px var(--accent-soft);
}
.admin-integrations__input::placeholder {
  color: var(--text-subtle);
}
.admin-integrations__password-row {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}
.admin-integrations__error {
  color: var(--error);
  font-size: var(--text-sm);
}
@media (prefers-reduced-motion: reduce) {
  .admin-integrations__input {
    transition: none;
  }
}
</style>
