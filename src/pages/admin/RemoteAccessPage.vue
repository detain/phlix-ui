<script setup lang="ts">
/**
 * Admin RemoteAccessPage (RA.10) — remote-access configuration, ported 1:1 from
 * the deleted React `RemoteAccessPage` onto the `@phlix/ui` primitives. Four
 * collapsible sections, each loaded on mount:
 *   1. Hub Pairing  — initiate (claim-code modal + poll/complete) / heartbeat / unenroll
 *   2. Subdomain    — claim / release a subdomain from the hub
 *   3. Relay Tunnel — enable / disable + ping (latency)
 *   4. Port Forward — enable / disable + hostname candidates
 * Every mutation refetches the affected section's status. Errors surface as
 * toasts; the page never blocks. No timers are used.
 */
import { ref, computed, onMounted, inject, type ComputedRef } from 'vue';
import { ApiClient } from '../../api/client';
import { LocalStorageTokenStore } from '../../api/tokenStore';
import {
  AdminRemoteAccessApi,
  type HubStatus,
  type SubdomainStatus,
  type RelayStatus,
  type PortForwardStatus,
  type HostnameCandidate,
} from '../../api/admin/remoteAccess';
import { useToastStore } from '../../stores/useToastStore';
import { errMessage } from '../../api/errors';
import Badge from '../../components/ui/Badge.vue';
import Button from '../../components/ui/Button.vue';
import Modal from '../../components/ui/Modal.vue';
import Skeleton from '../../components/ui/Skeleton.vue';
import Icon from '../../components/Icon.vue';

const props = defineProps<{
  /** Inject a pre-built API client for tests; otherwise one is built from `apiBase`. */
  client?: ApiClient;
}>();

const injectedApiBase = inject<string | ComputedRef<string> | undefined>('apiBase', '');
const apiBase = computed(() =>
  typeof injectedApiBase === 'string' ? injectedApiBase : injectedApiBase?.value ?? '',
);
const api = new AdminRemoteAccessApi(
  props.client ?? new ApiClient({ baseUrl: apiBase.value, tokenStore: new LocalStorageTokenStore() }),
);
const toasts = useToastStore();

function formatDate(value: string): string {
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? value : d.toLocaleString();
}

// ── Section expand/collapse ─────────────────────────────────────────────────
const expanded = ref<Record<string, boolean>>({
  hub: true,
  subdomain: false,
  relay: false,
  portforward: false,
});
function toggleSection(section: string): void {
  expanded.value[section] = !expanded.value[section];
}

// ── Hub pairing state ────────────────────────────────────────────────────────
const hubStatus = ref<HubStatus | null>(null);
const hubLoading = ref(true);
const hubUnenrolling = ref(false);
const hubHeartbeating = ref(false);

const showPairModal = ref(false);
const pairingHubUrl = ref('');
const pairingServerName = ref('Phlix Server');
const pairingClaimCode = ref<string | null>(null);
const pairingClaimId = ref<string | null>(null);
const hubPairing = ref(false);
const pairingPolling = ref(false);

const hubSummary = computed(() => {
  if (hubLoading.value) return 'Loading…';
  if (hubStatus.value === null) return 'Unable to load';
  if (hubStatus.value.paired) {
    return `Paired${hubStatus.value.serverId ? ` (${hubStatus.value.serverId})` : ''}`;
  }
  return 'Not paired';
});

async function loadHubStatus(): Promise<void> {
  try {
    hubStatus.value = await api.hubStatus();
  } catch (e) {
    toasts.error(errMessage(e, 'Failed to load hub status.'));
  } finally {
    hubLoading.value = false;
  }
}

function openPairModal(): void {
  showPairModal.value = true;
}
function closePairModal(): void {
  showPairModal.value = false;
  pairingClaimCode.value = null;
  pairingClaimId.value = null;
}

async function initiatePairing(): Promise<void> {
  if (hubPairing.value) return;
  if (pairingHubUrl.value === '') {
    toasts.error('Hub URL is required.');
    return;
  }
  hubPairing.value = true;
  try {
    const result = await api.hubPair(pairingHubUrl.value, pairingServerName.value);
    if (result.success) {
      pairingClaimCode.value = result.claimCode ?? null;
      pairingClaimId.value = result.claimId ?? null;
      toasts.success('Pairing initiated. Complete the claim on the hub, then poll.');
    }
  } catch (e) {
    toasts.error(errMessage(e, 'Failed to initiate pairing.'));
  } finally {
    hubPairing.value = false;
  }
}

async function pollPairing(): Promise<void> {
  if (pairingClaimId.value === null || pairingHubUrl.value === '') return;
  if (pairingPolling.value) return;
  pairingPolling.value = true;
  try {
    const result = await api.hubPoll(pairingClaimId.value, pairingHubUrl.value);
    if (result.success && result.token) {
      await api.hubComplete(result.token, '', result.serverId ?? '', pairingHubUrl.value);
      toasts.success('Hub paired successfully.');
      closePairModal();
      await loadHubStatus();
    } else if (!result.success && result.message) {
      toasts.error(result.message);
    }
  } catch (e) {
    toasts.error(errMessage(e, 'Failed to poll pairing status.'));
  } finally {
    pairingPolling.value = false;
  }
}

async function unenrollHub(): Promise<void> {
  if (hubUnenrolling.value) return;
  hubUnenrolling.value = true;
  try {
    await api.hubUnenroll();
    toasts.success('Hub unenrolled.');
    await loadHubStatus();
  } catch (e) {
    toasts.error(errMessage(e, 'Failed to unenroll.'));
  } finally {
    hubUnenrolling.value = false;
  }
}

async function sendHeartbeat(): Promise<void> {
  if (hubHeartbeating.value) return;
  hubHeartbeating.value = true;
  try {
    const result = await api.hubHeartbeat();
    if (result.success) toasts.success('Heartbeat sent.');
  } catch (e) {
    toasts.error(errMessage(e, 'Failed to send heartbeat.'));
  } finally {
    hubHeartbeating.value = false;
  }
}

// ── Subdomain state ────────────────────────────────────────────────────────────
const subdomainStatus = ref<SubdomainStatus | null>(null);
const subdomainLoading = ref(true);
const subdomainClaiming = ref(false);
const subdomainReleasing = ref(false);

const subdomainSummary = computed(() => {
  if (subdomainLoading.value) return 'Loading…';
  if (subdomainStatus.value === null) return 'Unable to load';
  if (subdomainStatus.value.claimed) {
    return `Claimed${subdomainStatus.value.subdomain ? ` (${subdomainStatus.value.subdomain})` : ''}`;
  }
  return 'Not claimed';
});

async function loadSubdomainStatus(): Promise<void> {
  try {
    subdomainStatus.value = await api.subdomainStatus();
  } catch (e) {
    toasts.error(errMessage(e, 'Failed to load subdomain status.'));
  } finally {
    subdomainLoading.value = false;
  }
}

async function claimSubdomain(): Promise<void> {
  if (subdomainClaiming.value) return;
  subdomainClaiming.value = true;
  try {
    await api.subdomainClaim();
    toasts.success('Subdomain claimed.');
    await loadSubdomainStatus();
  } catch (e) {
    toasts.error(errMessage(e, 'Failed to claim subdomain.'));
  } finally {
    subdomainClaiming.value = false;
  }
}

async function releaseSubdomain(): Promise<void> {
  if (subdomainReleasing.value) return;
  subdomainReleasing.value = true;
  try {
    await api.subdomainRelease();
    toasts.success('Subdomain released.');
    await loadSubdomainStatus();
  } catch (e) {
    toasts.error(errMessage(e, 'Failed to release subdomain.'));
  } finally {
    subdomainReleasing.value = false;
  }
}

// ── Relay state ────────────────────────────────────────────────────────────────
const relayStatus = ref<RelayStatus | null>(null);
const relayLoading = ref(true);
const relayEnabling = ref(false);
const relayDisabling = ref(false);
const relayPinging = ref(false);
const relayLatency = ref<number | null>(null);

const relaySummary = computed(() => {
  if (relayLoading.value) return 'Loading…';
  if (relayStatus.value === null) return 'Unable to load';
  if (relayStatus.value.connected) {
    return `Connected${relayLatency.value !== null ? ` (${relayLatency.value}ms latency)` : ''}`;
  }
  return 'Disconnected';
});
const relayActionInProgress = computed(() => relayEnabling.value || relayDisabling.value);

async function loadRelayStatus(): Promise<void> {
  try {
    relayStatus.value = await api.relayStatus();
    relayLatency.value = null;
  } catch (e) {
    toasts.error(errMessage(e, 'Failed to load relay status.'));
  } finally {
    relayLoading.value = false;
  }
}

async function enableRelay(): Promise<void> {
  if (relayEnabling.value) return;
  relayEnabling.value = true;
  try {
    await api.relayEnable();
    toasts.success('Relay enabled.');
    await loadRelayStatus();
  } catch (e) {
    toasts.error(errMessage(e, 'Failed to enable relay.'));
  } finally {
    relayEnabling.value = false;
  }
}

async function disableRelay(): Promise<void> {
  if (relayDisabling.value) return;
  relayDisabling.value = true;
  try {
    await api.relayDisable();
    toasts.success('Relay disabled.');
    await loadRelayStatus();
  } catch (e) {
    toasts.error(errMessage(e, 'Failed to disable relay.'));
  } finally {
    relayDisabling.value = false;
  }
}

async function pingRelay(): Promise<void> {
  if (relayPinging.value) return;
  relayPinging.value = true;
  try {
    const result = await api.relayPing();
    relayLatency.value = result.latencyMs;
    toasts.success(`Relay latency: ${result.latencyMs}ms`);
  } catch (e) {
    toasts.error(errMessage(e, 'Failed to ping relay.'));
  } finally {
    relayPinging.value = false;
  }
}

// ── Port forward state ──────────────────────────────────────────────────────────
const portForwardStatus = ref<PortForwardStatus | null>(null);
const portForwardLoading = ref(true);
const portForwardEnabling = ref(false);
const portForwardDisabling = ref(false);
const candidates = ref<HostnameCandidate[]>([]);

const portForwardSummary = computed(() => {
  if (portForwardLoading.value) return 'Loading…';
  if (portForwardStatus.value === null) return 'Unable to load';
  if (portForwardStatus.value.enabled) {
    return portForwardStatus.value.externalIp
      ? `Enabled (${portForwardStatus.value.externalIp}:${portForwardStatus.value.externalPort})`
      : 'Enabled';
  }
  return 'Disabled';
});
const portForwardActionInProgress = computed(
  () => portForwardEnabling.value || portForwardDisabling.value,
);

async function loadPortForwardStatus(): Promise<void> {
  try {
    const [status, candidatesResult] = await Promise.all([
      api.portForwardStatus(),
      api.portForwardCandidates(),
    ]);
    portForwardStatus.value = status;
    candidates.value = candidatesResult.candidates;
  } catch (e) {
    toasts.error(errMessage(e, 'Failed to load port-forward status.'));
  } finally {
    portForwardLoading.value = false;
  }
}

async function enablePortForward(): Promise<void> {
  if (portForwardEnabling.value) return;
  portForwardEnabling.value = true;
  try {
    await api.portForwardEnable();
    toasts.success('Port forwarding enabled.');
    await loadPortForwardStatus();
  } catch (e) {
    toasts.error(errMessage(e, 'Failed to enable port forwarding.'));
  } finally {
    portForwardEnabling.value = false;
  }
}

async function disablePortForward(): Promise<void> {
  if (portForwardDisabling.value) return;
  portForwardDisabling.value = true;
  try {
    await api.portForwardDisable();
    toasts.success('Port forwarding disabled.');
    await loadPortForwardStatus();
  } catch (e) {
    toasts.error(errMessage(e, 'Failed to disable port forwarding.'));
  } finally {
    portForwardDisabling.value = false;
  }
}

onMounted(() => {
  void loadHubStatus();
  void loadSubdomainStatus();
  void loadRelayStatus();
  void loadPortForwardStatus();
});
</script>

<template>
  <section class="admin-remote" aria-labelledby="remote-access-heading">
    <header class="admin-remote__head">
      <h1 id="remote-access-heading" class="admin-remote__title">
        <Icon name="monitor" class="admin-remote__title-icon" />
        Remote Access
      </h1>
    </header>

    <!-- Section 1: Hub Pairing -->
    <section class="admin-remote__section" aria-labelledby="remote-hub-heading">
      <button
        type="button"
        class="admin-remote__section-header"
        :aria-expanded="expanded.hub"
        aria-controls="remote-hub-body"
        @click="toggleSection('hub')"
      >
        <span class="admin-remote__section-title">
          <h2 id="remote-hub-heading">Hub Pairing</h2>
          <Icon :name="expanded.hub ? 'chevron-up' : 'chevron-down'" class="admin-remote__chevron" />
        </span>
        <span class="admin-remote__section-summary">{{ hubSummary }}</span>
      </button>
      <div v-if="expanded.hub" id="remote-hub-body" class="admin-remote__section-body">
        <div v-if="hubLoading" class="admin-remote__skel"><Skeleton variant="text" :lines="3" /></div>
        <p v-else-if="hubStatus === null" class="admin-remote__empty" role="status">
          Unable to load hub status.
        </p>
        <template v-else>
          <dl v-if="hubStatus.paired" class="admin-remote__dl">
            <template v-if="hubStatus.serverId"><dt>Server ID</dt><dd>{{ hubStatus.serverId }}</dd></template>
            <template v-if="hubStatus.hubUrl"><dt>Hub URL</dt><dd>{{ hubStatus.hubUrl }}</dd></template>
            <template v-if="hubStatus.enrolledAt">
              <dt>Enrolled at</dt><dd>{{ formatDate(hubStatus.enrolledAt) }}</dd>
            </template>
          </dl>
          <div class="admin-remote__actions">
            <Button v-if="!hubStatus.paired" variant="solid" size="sm" @click="openPairModal">
              Initiate Pairing
            </Button>
            <template v-else>
              <Button
                variant="outline"
                size="sm"
                :loading="hubHeartbeating"
                @click="sendHeartbeat"
              >
                Send Heartbeat
              </Button>
              <Button variant="ghost" size="sm" :loading="hubUnenrolling" @click="unenrollHub">
                Unenroll
              </Button>
            </template>
          </div>
        </template>
      </div>
    </section>

    <!-- Section 2: Subdomain -->
    <section class="admin-remote__section" aria-labelledby="remote-subdomain-heading">
      <button
        type="button"
        class="admin-remote__section-header"
        :aria-expanded="expanded.subdomain"
        aria-controls="remote-subdomain-body"
        @click="toggleSection('subdomain')"
      >
        <span class="admin-remote__section-title">
          <h2 id="remote-subdomain-heading">Subdomain</h2>
          <Icon :name="expanded.subdomain ? 'chevron-up' : 'chevron-down'" class="admin-remote__chevron" />
        </span>
        <span class="admin-remote__section-summary">{{ subdomainSummary }}</span>
      </button>
      <div v-if="expanded.subdomain" id="remote-subdomain-body" class="admin-remote__section-body">
        <div v-if="subdomainLoading" class="admin-remote__skel"><Skeleton variant="text" :lines="2" /></div>
        <p v-else-if="subdomainStatus === null" class="admin-remote__empty" role="status">
          Unable to load subdomain status.
        </p>
        <template v-else>
          <dl v-if="subdomainStatus.claimed" class="admin-remote__dl">
            <template v-if="subdomainStatus.subdomain">
              <dt>Subdomain</dt><dd>{{ subdomainStatus.subdomain }}</dd>
            </template>
            <template v-if="subdomainStatus.fqdn"><dt>FQDN</dt><dd>{{ subdomainStatus.fqdn }}</dd></template>
          </dl>
          <div class="admin-remote__actions">
            <Button
              v-if="!subdomainStatus.claimed"
              variant="solid"
              size="sm"
              :loading="subdomainClaiming"
              @click="claimSubdomain"
            >
              Claim Subdomain
            </Button>
            <Button v-else variant="ghost" size="sm" :loading="subdomainReleasing" @click="releaseSubdomain">
              Release Subdomain
            </Button>
          </div>
        </template>
      </div>
    </section>

    <!-- Section 3: Relay Tunnel -->
    <section class="admin-remote__section" aria-labelledby="remote-relay-heading">
      <button
        type="button"
        class="admin-remote__section-header"
        :aria-expanded="expanded.relay"
        aria-controls="remote-relay-body"
        @click="toggleSection('relay')"
      >
        <span class="admin-remote__section-title">
          <h2 id="remote-relay-heading">Relay Tunnel</h2>
          <Icon :name="expanded.relay ? 'chevron-up' : 'chevron-down'" class="admin-remote__chevron" />
        </span>
        <span class="admin-remote__section-summary">{{ relaySummary }}</span>
      </button>
      <div v-if="expanded.relay" id="remote-relay-body" class="admin-remote__section-body">
        <div v-if="relayLoading" class="admin-remote__skel"><Skeleton variant="text" :lines="2" /></div>
        <p v-else-if="relayStatus === null" class="admin-remote__empty" role="status">
          Unable to load relay status.
        </p>
        <template v-else>
          <dl class="admin-remote__dl">
            <dt>Status</dt>
            <dd>
              <Badge :tone="relayStatus.connected ? 'success' : 'neutral'">
                {{ relayStatus.connected ? 'Connected' : 'Disconnected' }}
              </Badge>
            </dd>
            <dt>Active</dt>
            <dd>{{ relayStatus.active ? 'Yes' : 'No' }}</dd>
            <template v-if="relayLatency !== null">
              <dt>Latency</dt><dd>{{ relayLatency }}ms</dd>
            </template>
          </dl>
          <div class="admin-remote__actions">
            <Button
              variant="outline"
              size="sm"
              :loading="relayPinging"
              :disabled="!relayStatus.connected"
              @click="pingRelay"
            >
              Ping
            </Button>
            <Button
              v-if="!relayStatus.connected"
              variant="solid"
              size="sm"
              :loading="relayEnabling"
              :disabled="relayActionInProgress"
              @click="enableRelay"
            >
              Enable
            </Button>
            <Button
              v-else
              variant="ghost"
              size="sm"
              :loading="relayDisabling"
              :disabled="relayActionInProgress"
              @click="disableRelay"
            >
              Disable
            </Button>
          </div>
        </template>
      </div>
    </section>

    <!-- Section 4: Port Forward -->
    <section class="admin-remote__section" aria-labelledby="remote-portforward-heading">
      <button
        type="button"
        class="admin-remote__section-header"
        :aria-expanded="expanded.portforward"
        aria-controls="remote-portforward-body"
        @click="toggleSection('portforward')"
      >
        <span class="admin-remote__section-title">
          <h2 id="remote-portforward-heading">Port Forward</h2>
          <Icon :name="expanded.portforward ? 'chevron-up' : 'chevron-down'" class="admin-remote__chevron" />
        </span>
        <span class="admin-remote__section-summary">{{ portForwardSummary }}</span>
      </button>
      <div v-if="expanded.portforward" id="remote-portforward-body" class="admin-remote__section-body">
        <div v-if="portForwardLoading" class="admin-remote__skel"><Skeleton variant="text" :lines="3" /></div>
        <p v-else-if="portForwardStatus === null" class="admin-remote__empty" role="status">
          Unable to load port-forward status.
        </p>
        <template v-else>
          <dl class="admin-remote__dl">
            <dt>Enabled</dt>
            <dd>
              <Badge :tone="portForwardStatus.enabled ? 'success' : 'neutral'">
                {{ portForwardStatus.enabled ? 'Yes' : 'No' }}
              </Badge>
            </dd>
            <template v-if="portForwardStatus.method"><dt>Method</dt><dd>{{ portForwardStatus.method }}</dd></template>
            <template v-if="portForwardStatus.externalIp">
              <dt>External IP</dt><dd>{{ portForwardStatus.externalIp }}</dd>
            </template>
            <template v-if="portForwardStatus.externalPort">
              <dt>External port</dt><dd>{{ portForwardStatus.externalPort }}</dd>
            </template>
          </dl>

          <div v-if="candidates.length > 0" class="admin-remote__candidates">
            <h3 class="admin-remote__candidates-title">Hostname Candidates</h3>
            <ul class="admin-remote__candidates-list">
              <li v-for="(candidate, index) in candidates" :key="index">{{ candidate.hostname }}</li>
            </ul>
          </div>

          <div class="admin-remote__actions">
            <Button
              v-if="!portForwardStatus.enabled"
              variant="solid"
              size="sm"
              :loading="portForwardEnabling"
              :disabled="portForwardActionInProgress"
              @click="enablePortForward"
            >
              Enable
            </Button>
            <Button
              v-else
              variant="ghost"
              size="sm"
              :loading="portForwardDisabling"
              :disabled="portForwardActionInProgress"
              @click="disablePortForward"
            >
              Disable
            </Button>
          </div>
        </template>
      </div>
    </section>

    <!-- Pairing modal -->
    <Modal v-model="showPairModal" title="Initiate Hub Pairing" @close="closePairModal">
      <div v-if="pairingClaimCode" class="admin-remote__claim">
        <p>Enter this claim code on the hub:</p>
        <p class="admin-remote__claim-code">{{ pairingClaimCode }}</p>
      </div>
      <form v-else class="admin-remote__form" @submit.prevent="initiatePairing">
        <label class="admin-remote__field">
          <span class="admin-remote__label">Hub URL</span>
          <input
            v-model="pairingHubUrl"
            type="url"
            class="admin-remote__input"
            autocomplete="off"
            placeholder="https://hub.example.com"
            required
          />
        </label>
        <label class="admin-remote__field">
          <span class="admin-remote__label">Server name</span>
          <input
            v-model="pairingServerName"
            type="text"
            class="admin-remote__input"
            autocomplete="off"
            placeholder="Phlix Server"
          />
        </label>
      </form>
      <template #footer>
        <Button variant="ghost" size="sm" @click="closePairModal">Cancel</Button>
        <Button
          v-if="pairingClaimCode"
          variant="solid"
          size="sm"
          :loading="pairingPolling"
          @click="pollPairing"
        >
          Poll for Completion
        </Button>
        <Button
          v-else
          variant="solid"
          size="sm"
          :loading="hubPairing"
          :disabled="pairingHubUrl === ''"
          @click="initiatePairing"
        >
          Initiate Pairing
        </Button>
      </template>
    </Modal>
  </section>
</template>

<style scoped>
.admin-remote {
  max-width: 880px;
  margin: 0 auto;
  padding: var(--space-6);
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}
.admin-remote__head {
  margin-bottom: var(--space-2);
}
.admin-remote__title {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  font-family: var(--font-display);
  font-weight: var(--font-semibold);
  font-size: var(--text-xl);
  letter-spacing: var(--tracking-tight);
  color: var(--text);
}
.admin-remote__title-icon {
  color: var(--text-subtle);
}
.admin-remote__section {
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  background: var(--surface-1, var(--surface));
  overflow: hidden;
}
.admin-remote__section-header {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  width: 100%;
  padding: var(--space-4) var(--space-5);
  background: transparent;
  border: none;
  text-align: left;
  cursor: pointer;
  color: var(--text);
  transition: background var(--dur-fast) var(--ease-out);
}
.admin-remote__section-header:hover {
  background: var(--surface-glass-strong);
}
.admin-remote__section-header:focus-visible {
  outline: 2px solid var(--accent-ring);
  outline-offset: -2px;
}
.admin-remote__section-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.admin-remote__section-title h2 {
  font-family: var(--font-display);
  font-weight: var(--font-semibold);
  font-size: var(--text-base);
  letter-spacing: var(--tracking-tight);
  color: var(--text);
}
.admin-remote__chevron {
  color: var(--text-subtle);
}
.admin-remote__section-summary {
  font-size: var(--text-sm);
  color: var(--text-subtle);
}
.admin-remote__section-body {
  padding: var(--space-5);
  border-top: 1px solid var(--border-subtle);
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}
.admin-remote__skel {
  padding-block: var(--space-1);
}
.admin-remote__empty {
  color: var(--text-muted);
  font-size: var(--text-sm);
}
.admin-remote__dl {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: var(--space-2) var(--space-4);
  margin: 0;
  font-size: var(--text-sm);
}
.admin-remote__dl dt {
  font-weight: var(--font-semibold);
  color: var(--text-subtle);
}
.admin-remote__dl dd {
  margin: 0;
  color: var(--text);
  word-break: break-word;
}
.admin-remote__candidates-title {
  font-family: var(--font-display);
  font-weight: var(--font-semibold);
  font-size: var(--text-sm);
  color: var(--text);
  margin-bottom: var(--space-2);
}
.admin-remote__candidates-list {
  margin: 0;
  padding-left: var(--space-5);
  color: var(--text-muted);
  font-size: var(--text-sm);
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}
.admin-remote__actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

/* Pairing modal form */
.admin-remote__form {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}
.admin-remote__field {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}
.admin-remote__label {
  font-size: var(--text-xs);
  font-weight: var(--font-semibold);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  color: var(--text-subtle);
}
.admin-remote__input {
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
.admin-remote__input:focus-visible {
  outline: none;
  border-color: var(--accent-ring);
  box-shadow: 0 0 0 3px var(--accent-soft);
}
.admin-remote__input::placeholder {
  color: var(--text-subtle);
}
.admin-remote__claim-code {
  font-family: var(--font-mono);
  font-size: var(--text-lg);
  font-weight: var(--font-bold);
  letter-spacing: var(--tracking-wide);
  color: var(--text);
  padding: var(--space-3) var(--space-4);
  border-radius: var(--radius-md);
  background: var(--surface-glass-strong);
  border: 1px solid var(--border-subtle);
  margin-top: var(--space-3);
  word-break: break-all;
}
@media (prefers-reduced-motion: reduce) {
  .admin-remote__section-header,
  .admin-remote__input {
    transition: none;
  }
}
</style>
