<script setup lang="ts">
/**
 * Admin ServicesPage (RA.5) — manage the Trakt.tv and Last.fm service
 * connections, a 1:1 port of the deleted React `ServicesPage` onto the
 * `@phlix/ui` primitives. Two sections, each showing connect/disconnect +
 * a connection status badge. OAuth connect is a full-page browser redirect;
 * disconnect/status are real `/api/v1/admin/services/*` calls. Loading shows a
 * Skeleton, a failed status load shows an EmptyState, and errors surface as
 * toasts; every disconnect awaits a status refetch afterward.
 */
import { ref, computed, onMounted, inject, type ComputedRef } from 'vue';
import { ApiClient } from '../../api/client';
import { LocalStorageTokenStore } from '../../api/tokenStore';
import {
  AdminServicesApi,
  type TraktStatus,
  type LastfmStatus,
} from '../../api/admin/services';
import { useToastStore } from '../../stores/useToastStore';
import { errMessage } from '../../api/errors';
import Button from '../../components/ui/Button.vue';
import Badge from '../../components/ui/Badge.vue';
import Skeleton from '../../components/ui/Skeleton.vue';
import EmptyState from '../../components/ui/EmptyState.vue';

const props = defineProps<{
  /** Inject a pre-built API for tests; otherwise one is built from `apiBase`. */
  client?: ApiClient;
}>();

const injectedApiBase = inject<string | ComputedRef<string> | undefined>('apiBase', '');
const apiBase = computed(() =>
  typeof injectedApiBase === 'string' ? injectedApiBase : injectedApiBase?.value ?? '',
);
const api = new AdminServicesApi(
  props.client ?? new ApiClient({ baseUrl: apiBase.value, tokenStore: new LocalStorageTokenStore() }),
);
const toasts = useToastStore();

// ─── Trakt state ─────────────────────────────────────────────────────────────
const traktStatus = ref<TraktStatus | null>(null);
const traktLoading = ref(true);
const traktError = ref<string | null>(null);
const traktDisconnecting = ref(false);

const traktConfiguredMissing = computed(() => traktStatus.value?.configured === false);

async function loadTraktStatus(): Promise<void> {
  traktLoading.value = true;
  traktError.value = null;
  try {
    traktStatus.value = await api.getTraktStatus();
  } catch (e) {
    traktError.value = errMessage(e, 'Failed to load Trakt status.');
    toasts.error(traktError.value);
  } finally {
    traktLoading.value = false;
  }
}

function connectTrakt(): void {
  api.navigateToTraktAuthorize();
}

async function disconnectTrakt(): Promise<void> {
  if (traktDisconnecting.value) return;
  traktDisconnecting.value = true;
  try {
    await api.disconnectTrakt();
    toasts.success('Trakt disconnected.');
    await loadTraktStatus();
  } catch (e) {
    toasts.error(errMessage(e, 'Failed to disconnect Trakt.'));
  } finally {
    traktDisconnecting.value = false;
  }
}

// ─── Last.fm state ───────────────────────────────────────────────────────────
const lastfmStatus = ref<LastfmStatus | null>(null);
const lastfmLoading = ref(true);
const lastfmError = ref<string | null>(null);
const lastfmDisconnecting = ref(false);

async function loadLastfmStatus(): Promise<void> {
  lastfmLoading.value = true;
  lastfmError.value = null;
  try {
    lastfmStatus.value = await api.getLastfmStatus();
  } catch (e) {
    lastfmError.value = errMessage(e, 'Failed to load Last.fm status.');
    toasts.error(lastfmError.value);
  } finally {
    lastfmLoading.value = false;
  }
}

function connectLastfm(): void {
  api.navigateToLastfmConnect();
}

async function disconnectLastfm(): Promise<void> {
  if (lastfmDisconnecting.value) return;
  lastfmDisconnecting.value = true;
  try {
    await api.disconnectLastfm();
    toasts.success('Last.fm disconnected.');
    await loadLastfmStatus();
  } catch (e) {
    toasts.error(errMessage(e, 'Failed to disconnect Last.fm.'));
  } finally {
    lastfmDisconnecting.value = false;
  }
}

onMounted(() => {
  void loadTraktStatus();
  void loadLastfmStatus();
});
</script>

<template>
  <section class="admin-services" aria-labelledby="services-heading">
    <header class="admin-services__head">
      <h1 id="services-heading" class="admin-services__title">Services</h1>
    </header>

    <!-- Section 1: Trakt.tv -->
    <section class="admin-services__section" aria-labelledby="trakt-heading">
      <div class="admin-services__section-head">
        <h2 id="trakt-heading" class="admin-services__section-title">Trakt.tv</h2>
        <Badge
          v-if="traktStatus !== null"
          :tone="traktStatus.connected ? 'success' : 'neutral'"
          :label="traktStatus.connected ? 'Connected' : 'Not connected'"
        >
          {{ traktStatus.connected ? 'Connected' : 'Not connected' }}
        </Badge>
      </div>

      <div class="admin-services__card">
        <div v-if="traktLoading" class="admin-services__loading" aria-hidden="true">
          <Skeleton variant="text" :lines="2" />
        </div>
        <EmptyState
          v-else-if="traktStatus === null"
          icon="alert"
          title="Couldn't load Trakt"
          :description="traktError ?? undefined"
        >
          <template #actions>
            <Button variant="solid" size="sm" left-icon="rewind" @click="loadTraktStatus">Retry</Button>
          </template>
        </EmptyState>
        <template v-else>
          <dl
            v-if="traktStatus.connected && traktStatus.username !== null"
            class="admin-services__dl"
          >
            <dt>Username</dt>
            <dd>{{ traktStatus.username }}</dd>
          </dl>

          <p v-if="!traktStatus.connected && traktConfiguredMissing" class="admin-services__hint">
            Trakt isn't configured yet. Register an application at
            <a
              href="https://trakt.tv/oauth/applications"
              target="_blank"
              rel="noopener noreferrer"
            >trakt.tv/oauth/applications</a>
            (set its redirect URI to this server's
            <code>/api/v1/oauth/trakt/callback</code>), then add the client ID and
            secret in Settings or via the
            <code>TRAKT_CLIENT_ID</code> / <code>TRAKT_CLIENT_SECRET</code>
            environment variables.
          </p>

          <div class="admin-services__actions">
            <Button
              v-if="!traktStatus.connected"
              variant="solid"
              :disabled="traktConfiguredMissing"
              :title="traktConfiguredMissing ? 'Add Trakt client ID and secret first' : undefined"
              @click="connectTrakt"
            >
              Connect to Trakt
            </Button>
            <Button
              v-else
              variant="outline"
              :loading="traktDisconnecting"
              @click="disconnectTrakt"
            >
              {{ traktDisconnecting ? 'Disconnecting' : 'Disconnect' }}
            </Button>
          </div>
        </template>
      </div>
    </section>

    <!-- Section 2: Last.fm -->
    <section class="admin-services__section" aria-labelledby="lastfm-heading">
      <div class="admin-services__section-head">
        <h2 id="lastfm-heading" class="admin-services__section-title">Last.fm</h2>
        <Badge
          v-if="lastfmStatus !== null"
          :tone="lastfmStatus.connected ? 'success' : 'neutral'"
          :label="lastfmStatus.connected ? 'Connected' : 'Not connected'"
        >
          {{ lastfmStatus.connected ? 'Connected' : 'Not connected' }}
        </Badge>
      </div>

      <div class="admin-services__card">
        <div v-if="lastfmLoading" class="admin-services__loading" aria-hidden="true">
          <Skeleton variant="text" :lines="2" />
        </div>
        <EmptyState
          v-else-if="lastfmStatus === null"
          icon="alert"
          title="Couldn't load Last.fm"
          :description="lastfmError ?? undefined"
        >
          <template #actions>
            <Button variant="solid" size="sm" left-icon="rewind" @click="loadLastfmStatus">Retry</Button>
          </template>
        </EmptyState>
        <template v-else>
          <dl
            v-if="lastfmStatus.connected && lastfmStatus.username !== null"
            class="admin-services__dl"
          >
            <dt>Username</dt>
            <dd>{{ lastfmStatus.username }}</dd>
            <dt>API key</dt>
            <dd>{{ lastfmStatus.api_key_set ? 'Set' : 'Not set' }}</dd>
          </dl>

          <div class="admin-services__actions">
            <Button
              v-if="!lastfmStatus.connected"
              variant="solid"
              @click="connectLastfm"
            >
              Connect Last.fm
            </Button>
            <Button
              v-else
              variant="outline"
              :loading="lastfmDisconnecting"
              @click="disconnectLastfm"
            >
              {{ lastfmDisconnecting ? 'Disconnecting' : 'Disconnect' }}
            </Button>
          </div>
        </template>
      </div>
    </section>
  </section>
</template>

<style scoped>
.admin-services {
  max-width: 900px;
  margin: 0 auto;
  padding: var(--space-6);
}
.admin-services__title {
  font-family: var(--font-display);
  font-weight: var(--font-semibold);
  font-size: var(--text-xl);
  letter-spacing: var(--tracking-tight);
  color: var(--text);
  margin-bottom: var(--space-4);
}
.admin-services__section {
  margin-bottom: var(--space-6);
}
.admin-services__section-head {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  margin-bottom: var(--space-3);
}
.admin-services__section-title {
  font-family: var(--font-display);
  font-weight: var(--font-semibold);
  font-size: var(--text-lg);
  letter-spacing: var(--tracking-tight);
  color: var(--text);
}
.admin-services__card {
  padding: var(--space-5);
  border-radius: var(--radius-lg);
  background: var(--surface-1, var(--surface));
  border: 1px solid var(--border-subtle);
}
.admin-services__loading {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}
.admin-services__dl {
  display: grid;
  grid-template-columns: max-content 1fr;
  gap: var(--space-1) var(--space-4);
  margin: 0 0 var(--space-4);
}
.admin-services__dl dt {
  font-size: var(--text-xs);
  font-weight: var(--font-semibold);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  color: var(--text-subtle);
}
.admin-services__dl dd {
  margin: 0;
  font-size: var(--text-sm);
  color: var(--text);
}
.admin-services__hint {
  font-size: var(--text-sm);
  line-height: 1.5;
  color: var(--text-muted);
  margin: 0 0 var(--space-4);
}
.admin-services__hint a {
  color: var(--accent-text);
  text-decoration: underline;
}
.admin-services__hint code {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--text);
}
.admin-services__actions {
  display: flex;
  gap: var(--space-3);
}
</style>
