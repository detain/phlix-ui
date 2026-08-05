<!--
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
-->

<script setup lang="ts">
/**
 * UpdateAvailableBanner (S76 / updates.md #48) — the shared "a new version of
 * this service is available" notice for the admin console.
 *
 * Mounted ONCE, at the top of {@link AdminLayout}'s content column, so every
 * `/app/admin/*` page carries it without each page wiring it up.
 *
 * ## Which service does it report on?
 *
 * The one hosting this admin console. `AdminLayout` is mounted by BOTH
 * consumers — `buildAdminRoutes()` in phlix-server's web-ui and
 * `buildHubAdminRoutes()` in phlix-hub's — and both back ends serve the SAME
 * path (`GET /api/v1/admin/updates/status`) with the SAME wire shape, so this
 * ONE component + ONE parser surfaces phlix-server's status in the server
 * console and phlix-hub's in the hub console. That is exactly what S74's DTO
 * docblock specifies ("so S76's shared `UpdateAvailableBanner.vue` can consume
 * this endpoint and phlix-hub's twin with ONE parser").
 *
 * ⚠ It deliberately does NOT try to read the *other* service's status from one
 * console. The hub's only route to a paired server is the relay proxy, whose
 * `BROWSE_SCOPE_ALLOWLIST` (`ServerProxyController.php`) refuses every
 * `/api/v1/admin/**` path with 403 `proxy.scope_denied` by design, and the hub
 * stores no server version anywhere else. Reaching across would mean widening
 * that allowlist — a security regression the hub's own source explicitly warns
 * against. See the S76 worklog.
 *
 * ## What it renders, and when (the three states are NOT collapsed)
 *
 * 1. `updateAvailable === true` → the UPDATE banner: versions + the service's
 *    own `updateCommand` in a `<code>` block with a copy-to-clipboard button.
 *    The command is ALWAYS the string the endpoint supplied — this component
 *    contains no `curl`/`git`/`composer` literal of its own.
 * 2. No update, but the service reports `lastError` (its own background check
 *    FAILED) → the WARNING banner. A silently-broken update check is the whole
 *    failure mode this feature exists to prevent, so "the check is broken" must
 *    never render the same as "you are up to date".
 * 3. Neither → nothing at all. `v-if` on the root, not a hidden element.
 *
 * ## Why some failures render nothing
 *
 * A FAILED status request is not evidence about update availability, so it is
 * surfaced as the WARNING banner (state 2) — except for 401/403/404, which are
 * suppressed:
 *  - **404** — the host back end predates S74/S75. `@phlix/ui` is repinned into
 *    consumers independently of their back ends, so a console WILL be newer than
 *    its server at times; a permanent red banner there would be pure noise.
 *  - **401/403** — a logout race or a non-admin; the layout's route guard and
 *    the back end already handle authorization.
 * `checkEnabled === false` also suppresses the warning: the operator turned
 * checking off deliberately. It does NOT suppress state 1 — a previously-found
 * update is still real and still worth showing.
 */
import { ref, computed, onMounted, inject, type ComputedRef } from 'vue';
import { ApiClient } from '../../api/client';
import { LocalStorageTokenStore } from '../../api/tokenStore';
import { ApiError, errMessage } from '../../api/errors';
import { AdminUpdatesApi, type CoreUpdateStatus } from '../../api/admin/updates';
import Icon from '../Icon.vue';
import Button from '../ui/Button.vue';

/**
 * HTTP statuses that mean "there is nothing meaningful to warn about", so the
 * banner stays hidden rather than nagging. Everything else (5xx, timeout,
 * network) is a real "the update check is not working" signal.
 */
const SUPPRESSED_STATUSES = [401, 403, 404];

const injectedApiBase = inject<string | ComputedRef<string> | undefined>('apiBase', '');
const apiBase = computed(() =>
  typeof injectedApiBase === 'string' ? injectedApiBase : injectedApiBase?.value ?? '',
);
const api = new AdminUpdatesApi(
  new ApiClient({ baseUrl: apiBase.value, tokenStore: new LocalStorageTokenStore() }),
);

// ── State ───────────────────────────────────────────────────────────────────

/** The last successfully parsed status, or null when the request failed. */
const status = ref<CoreUpdateStatus | null>(null);
/** A non-suppressed transport/HTTP failure of the status request itself. */
const requestFailure = ref<string | null>(null);
/** Polite announcement for the copy action (the banner has no toast dependency). */
const announcement = ref('');

// ── Derived state ───────────────────────────────────────────────────────────

/** True only when the SERVICE says an update is available. Never re-derived here. */
const updateAvailable = computed(() => status.value?.updateAvailable === true);

/**
 * The service's own report that its background check failed, honouring the
 * operator's opt-out. Null when the check is disabled or the last check was clean.
 */
const serviceCheckError = computed<string | null>(() => {
  const s = status.value;
  if (s === null || !s.checkEnabled) {
    return null;
  }
  return s.lastError;
});

/** Whichever "the update check is not working" evidence we have, if any. */
const checkFailure = computed<string | null>(
  () => serviceCheckError.value ?? requestFailure.value,
);

const visible = computed(() => updateAvailable.value || checkFailure.value !== null);
const variant = computed<'update' | 'warning'>(() => (updateAvailable.value ? 'update' : 'warning'));

const currentVersion = computed(() => status.value?.currentVersion ?? '');
const latestVersion = computed(() => status.value?.latestVersion ?? null);

/** The copy-to-clipboard command, verbatim from the endpoint. Empty ⇒ no button. */
const updateCommand = computed(() => status.value?.updateCommand ?? '');
const canCopy = computed(() => updateAvailable.value && updateCommand.value !== '');

/** "Last checked" text for the warning state. */
const lastCheckedLabel = computed(() => {
  const at = status.value?.lastCheckedAt ?? null;
  return at === null ? 'never' : formatRelativeTime(at);
});

// ── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Format a UNIX timestamp in SECONDS (PHP `time()`, which is what both DTOs
 * emit) as a coarse relative age. The `* 1000` is load-bearing: without it every
 * timestamp reads as ~1970 and the label is decades wrong.
 */
function formatRelativeTime(unixSeconds: number): string {
  const seconds = Math.floor(Date.now() / 1000 - unixSeconds);
  if (seconds < 60) return `${Math.max(seconds, 0)}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

/** True for a failure the banner must stay silent about (see the header). */
function isSuppressed(e: unknown): boolean {
  return e instanceof ApiError && SUPPRESSED_STATUSES.includes(e.status);
}

// ── Load ────────────────────────────────────────────────────────────────────

async function load(): Promise<void> {
  try {
    status.value = await api.getStatus();
    requestFailure.value = null;
  } catch (e) {
    status.value = null;
    requestFailure.value = isSuppressed(e)
      ? null
      : errMessage(e, 'The update check could not be reached.');
  }
}

async function copyCommand(): Promise<void> {
  const command = updateCommand.value;
  if (command === '') {
    return;
  }
  try {
    await navigator.clipboard.writeText(command);
    announcement.value = 'Update command copied to clipboard.';
  } catch {
    announcement.value = 'Could not copy the update command. Copy it manually instead.';
  }
}

onMounted(() => {
  void load();
});
</script>

<template>
  <section
    v-if="visible"
    class="update-banner"
    :class="`update-banner--${variant}`"
    :data-variant="variant"
    role="status"
    aria-labelledby="update-banner-title"
  >
    <Icon
      :name="variant === 'update' ? 'arrow-up' : 'alert'"
      class="update-banner__icon"
      aria-hidden="true"
    />

    <div class="update-banner__body">
      <p id="update-banner-title" class="update-banner__title">
        <template v-if="variant === 'update'">Update available</template>
        <template v-else>Update check is not working</template>
      </p>

      <p v-if="variant === 'update'" class="update-banner__versions">
        Running {{ currentVersion }} — {{ latestVersion }} is available.
      </p>
      <p v-else class="update-banner__versions">
        Running {{ currentVersion }}. Last successful check: {{ lastCheckedLabel }}.
      </p>

      <p v-if="checkFailure !== null" class="update-banner__error">{{ checkFailure }}</p>

      <code v-if="canCopy" class="update-banner__command">{{ updateCommand }}</code>

      <p class="update-banner__announcement" aria-live="polite">{{ announcement }}</p>
    </div>

    <Button
      v-if="canCopy"
      class="update-banner__copy"
      variant="outline"
      size="sm"
      left-icon="check"
      @click="copyCommand"
    >
      Copy update command
    </Button>
  </section>
</template>

<style scoped>
.update-banner {
  display: flex;
  align-items: flex-start;
  gap: var(--space-3);
  margin-bottom: var(--space-5);
  padding: var(--space-4);
  border: 1px solid transparent;
  border-radius: var(--radius-lg);
  background: var(--surface-glass);
}
.update-banner--update {
  border-color: var(--accent);
  background: var(--accent-bg, var(--surface-glass));
  color: var(--text-primary);
}
.update-banner--warning {
  border-color: var(--warning);
  background: var(--warning-bg, var(--surface-glass));
  color: var(--text-primary);
}
.update-banner__icon {
  flex: 0 0 auto;
  width: 1.25rem;
  height: 1.25rem;
  margin-top: 0.15rem;
}
.update-banner__body {
  flex: 1 1 auto;
  min-width: 0;
}
.update-banner__title {
  margin: 0;
  font-weight: var(--font-semibold);
}
.update-banner__versions,
.update-banner__error {
  margin: var(--space-1) 0 0;
  font-size: var(--text-sm);
  color: var(--text-secondary);
}
.update-banner__error {
  color: var(--warning);
}
.update-banner__command {
  display: block;
  margin-top: var(--space-2);
  padding: var(--space-2);
  border-radius: var(--radius-md);
  background: var(--surface-2, rgb(0 0 0 / 25%));
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  overflow-x: auto;
  white-space: pre;
}
.update-banner__announcement {
  margin: 0;
  font-size: var(--text-sm);
  color: var(--text-secondary);
}
.update-banner__announcement:empty {
  display: none;
}
.update-banner__copy {
  flex: 0 0 auto;
}
</style>
