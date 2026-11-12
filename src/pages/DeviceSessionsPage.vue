<!--
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
-->

<script setup lang="ts">
/**
 * DeviceSessionsPage — the auth-token family (D-1a) management surface:
 * list every ACTIVE login session of the signed-in account, revoke one, or
 * sign out everything except the device you are using.
 *
 * EMBEDDED as the "Sessions" tab of SettingsPage (the Security tab's
 * passkey-sibling pattern), not a standalone route.
 *
 * API BASE LAW: this reads/writes `/api/v1/auth/sessions` — the HOST's own
 * auth surface. `useApiBase()` is the mandated seam: auth endpoints must
 * NEVER be proxied to a paired media server via the hub relay (a relayed
 * session list would show the wrong account's logins, or none). The server
 * (413765b6) and the hub twin (c0ed2c28) both serve these two routes, so
 * the page is honest on both mounts.
 *
 * WHY THE BULK ACTION IS CLIENT-SIDE: the server register ships exactly the
 * list + single-revoke pair — no "others" endpoint exists on either host or
 * in the contracts manifest — so "sign out others" is a bounded SEQUENTIAL
 * fan-out over the non-current rows. Sequential (not Promise.all) because a
 * burst of parallel DELETEs against the same refresh-reuse watermark can
 * false-trip family revocation on the server; one-at-a-time is the shape
 * the backend docs recommend for composed bulk flows. Stop-at-first-failure
 * then RELOAD: the list re-fetch is the honest reconciler — partial success
 * renders as whatever the server now agrees exists.
 *
 * FOCUS LAW (UI-12/UI-13, CU-117 class): the control the user confirmed from
 * goes BUSY through the loading/aria-disabled arm (never native `disabled`,
 * which drops a focused button out of the focus order and dumps focus to
 * <body> the moment the dialog hands it back). Each revoke button carries a
 * row-named accessible label ("Sign out Living Room TV") — an icon-only
 * destructive control must say WHICH session it ends. After a user-initiated
 * reload, if the focused control unmounted with its row (or the bulk button
 * vanished with the last other session), focus parks on the card heading
 * instead of falling to <body>.
 *
 * LOAD-BOUNDARY HONESTY (UI-14/UI-41): a list response without a `sessions`
 * array is a LOAD FAILURE (the error card + Retry), never "No active
 * sessions" — the empty state is only ever the server's own `[]`. And the
 * server caps the list at DEVICE_SESSIONS_LIST_CAP rows, so a full page
 * renders the count as "200+" instead of claiming an exact total.
 */
import { computed, inject, nextTick, onMounted, ref } from 'vue';
import { useApiBase } from '../composables/useApiBase';
import EmptyState from '../components/ui/EmptyState.vue';
import Spinner from '../components/ui/Spinner.vue';
import Button from '../components/ui/Button.vue';
import IconButton from '../components/ui/IconButton.vue';
import ConfirmDialog from '../components/ui/ConfirmDialog.vue';
import Icon, { type IconName } from '../components/Icon.vue';
import { useToastStore } from '../stores/useToastStore';
import { useMessages } from '../composables/useMessages';
import { wireErrorLine } from '../utils/wireErrors';
import {
  DEVICE_SESSIONS_LIST_CAP,
  MalformedSessionsEnvelopeError,
  fetchDeviceSessions,
  isSessionGoneError,
  revokeDeviceSession,
  type DeviceSessionRow,
} from '../api/deviceSessions';
import type { PhlixAppConfig } from '../app/types';

const apiBase = useApiBase();
const toasts = useToastStore();
const { t } = useMessages();
// Locale seam for the wire-error classifier (same idiom as SecuritySettingsPage).
const config = inject<PhlixAppConfig | null>('phlixConfig', null);

const sessions = ref<DeviceSessionRow[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);

/** id whose single revoke is in flight (row spinner + button disable). */
const busyId = ref<string | null>(null);
/** the bulk revoke is in flight (all row actions disabled). */
const revokingOthers = ref(false);
/** dialog arm: which action the open ConfirmDialog belongs to. */
const pending = ref<{ kind: 'one'; id: string } | { kind: 'others' } | null>(null);

const otherSessions = computed(() => sessions.value.filter((s) => !s.current));
const hasOthers = computed(() => otherSessions.value.length > 0);
const anyBusy = computed(() => busyId.value !== null || revokingOthers.value);
/** The server returned a full capped page — more sessions may exist. */
const truncated = computed(() => sessions.value.length >= DEVICE_SESSIONS_LIST_CAP);

/** Focus park target: the always-mounted card heading (tabindex="-1"). */
const parkEl = ref<HTMLElement | null>(null);

async function loadSessions(): Promise<void> {
  loading.value = true;
  error.value = null;
  try {
    sessions.value = await fetchDeviceSessions(apiBase.value);
  } catch (e) {
    // Wire-error survivor law: registered codes localize through the
    // contracts catalog; unregistered/transport keeps the generic line. A
    // malformed envelope is a plain Error whose English message must never
    // render — it takes the generic localized line too.
    error.value =
      e instanceof MalformedSessionsEnvelopeError
        ? t('sessions.loadError')
        : wireErrorLine(e, t('sessions.loadError'), config?.locale);
  } finally {
    loading.value = false;
  }
}

/**
 * Reload, then park focus if it was orphaned. The list unmounts while
 * `loading` (and a revoked row never comes back), so a focused row control
 * is gone by the time the reload settles; only a lost focus (<body>, or a
 * detached node) is re-homed — focus the user moved elsewhere is left alone.
 */
async function reloadAndParkFocus(): Promise<void> {
  await loadSessions();
  await nextTick();
  if (typeof document === 'undefined') return;
  const active = document.activeElement;
  if (active === null || active === document.body || !active.isConnected) {
    parkEl.value?.focus();
  }
}

function retry(): void {
  void reloadAndParkFocus();
}

/**
 * The wire date is 'YYYY-MM-DD HH:MM:SS' on the SERVER clock with NO
 * timezone marker. Parsing the numeric parts (never `new Date(string)`,
 * which would apply browser-TZ semantics to a tz-less string and silently
 * shift the calendar day) lets us render the calendar day the server WROTE
 * as a plain localized date — the display never pretends to know an instant.
 */
function formatDate(value: string | null): string | null {
  if (!value) return null;
  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(value);
  if (!match) return null;
  const [, year, month, day] = match;
  const date = new Date(Number(year), Number(month) - 1, Number(day));
  return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
}

function deviceLabel(row: DeviceSessionRow): string {
  return row.device_name ?? t('sessions.unknownDevice');
}

/**
 * `device_type` is untrusted free text; only a literal 'tv' earns the tv
 * glyph, everything else (including 'mobile' the server's own clients do
 * NOT currently send) renders the honest generic monitor glyph rather than
 * a guessed phone icon.
 */
function deviceIcon(row: DeviceSessionRow): IconName {
  return row.device_type === 'tv' ? 'tv' : 'monitor';
}

function metaLine(row: DeviceSessionRow): string {
  const created = formatDate(row.created_at);
  const lastUsed = formatDate(row.last_used_at);
  const parts: string[] = [];
  if (created) parts.push(t('sessions.created', { date: created }));
  if (lastUsed) parts.push(t('sessions.lastUsed', { date: lastUsed }));
  return parts.join(' · ');
}

function handleRevoke(id: string): void {
  pending.value = { kind: 'one', id };
}

function handleRevokeOthers(): void {
  pending.value = { kind: 'others' };
}

function onDialogDismiss(open: boolean): void {
  if (!open) pending.value = null;
}

/**
 * THE one confirm path: capture + dismiss the arm first (the dialog must
 * close on both success and failure — a stuck-open dialog over a half-
 * applied list is worse copy than a toast), then run the arm. The bulk arm
 * is sequential, stop-at-first-failure (see module docblock for the
 * watermark reason); every row control is disabled while either arm is in
 * flight, so a double-click cannot interleave two fan-outs.
 */
async function onConfirm(): Promise<void> {
  const action = pending.value;
  pending.value = null;
  if (!action) return;

  if (action.kind === 'one') {
    busyId.value = action.id;
    try {
      await revokeDeviceSession(apiBase.value, action.id);
      toasts.success(t('sessions.revokeSuccess'));
    } catch (e) {
      toasts.error(wireErrorLine(e, t('sessions.revokeError'), config?.locale));
    } finally {
      busyId.value = null;
    }
    await reloadAndParkFocus();
    return;
  }

  const targets = otherSessions.value.map((s) => s.id);
  revokingOthers.value = true;
  let failure: unknown = null;
  for (const id of targets) {
    // UI-52: surface per-row progress — the row in flight shows its spinner.
    busyId.value = id;
    try {
      await revokeDeviceSession(apiBase.value, id);
    } catch (e) {
      // UI-32: an already-dead / unknown session is the desired end state —
      // count it and keep going. Genuine errors still stop at first.
      if (isSessionGoneError(e)) continue;
      failure = e;
      break;
    }
  }
  busyId.value = null;
  revokingOthers.value = false;

  if (failure === null) {
    toasts.success(t('sessions.revokeOthersSuccess', { count: targets.length }));
  } else {
    toasts.error(wireErrorLine(failure, t('sessions.revokeOthersError'), config?.locale));
  }
  await reloadAndParkFocus();
}

onMounted(() => {
  void loadSessions();
});
</script>

<template>
  <div class="device-sessions-page">
    <header class="device-sessions-page__head">
      <p class="device-sessions-page__eyebrow">{{ t('sessions.eyebrow') }}</p>
      <h1 class="device-sessions-page__title">{{ t('sessions.title') }}</h1>
      <p class="device-sessions-page__desc">{{ t('sessions.desc') }}</p>
    </header>

    <section class="device-sessions-page__card">
      <header class="device-sessions-page__card-header">
        <div class="device-sessions-page__card-heading">
          <h2 ref="parkEl" class="device-sessions-page__card-title" tabindex="-1" data-testid="sessions-card-title">
            {{ t('sessions.cardTitle') }}
          </h2>
          <span v-if="!loading && !error" class="device-sessions-page__count" data-testid="sessions-count">
            {{
              truncated
                ? t('sessions.truncated', { count: DEVICE_SESSIONS_LIST_CAP })
                : t('sessions.count', { count: sessions.length })
            }}
          </span>
        </div>
        <div class="device-sessions-page__card-actions">
          <Button
            variant="ghost"
            size="sm"
            left-icon="refresh"
            :loading="loading"
            :disabled="anyBusy"
            data-testid="sessions-refresh"
            @click="retry"
          >
            {{ t('sessions.refresh') }}
          </Button>
          <Button
            v-if="hasOthers"
            variant="ghost"
            size="sm"
            :loading="revokingOthers"
            :disabled="anyBusy && !revokingOthers"
            data-testid="sessions-revoke-others"
            @click="handleRevokeOthers"
          >
            {{ t('sessions.revokeAll') }}
          </Button>
        </div>
      </header>

      <div class="device-sessions-page__card-body">
        <Spinner v-if="loading" :label="t('sessions.loading')" />

        <EmptyState
          v-else-if="error"
          icon="alert"
          :title="t('sessions.loadErrorTitle')"
          :description="error"
        >
          <template #actions>
            <Button variant="solid" size="sm" left-icon="refresh" data-testid="sessions-retry" @click="retry">
              {{ t('sessions.refresh') }}
            </Button>
          </template>
        </EmptyState>

        <EmptyState
          v-else-if="sessions.length === 0"
          icon="monitor"
          :title="t('sessions.emptyTitle')"
          :description="t('sessions.emptyDescription')"
        />

        <ul v-else class="session-list">
          <li v-for="row in sessions" :key="row.id" class="session-item" data-testid="session-item">
            <div class="session-item__icon">
              <Icon :name="deviceIcon(row)" />
            </div>
            <div class="session-item__info">
              <span class="session-item__label">
                {{ deviceLabel(row) }}
                <span v-if="row.current" class="session-item__badge" data-testid="session-current-badge">
                  {{ t('sessions.thisDevice') }}
                </span>
              </span>
              <span v-if="metaLine(row)" class="session-item__meta">{{ metaLine(row) }}</span>
            </div>
            <IconButton
              v-if="!row.current"
              name="trash"
              size="sm"
              class="session-item__revoke"
              :label="t('sessions.revokeDevice', { device: deviceLabel(row) })"
              :loading="busyId === row.id"
              :disabled="anyBusy && busyId !== row.id"
              :data-testid="`session-revoke-${row.id}`"
              @click="handleRevoke(row.id)"
            />
          </li>
        </ul>
      </div>
    </section>

    <ConfirmDialog
      :open="pending !== null"
      :message="pending?.kind === 'others' ? t('sessions.revokeAllConfirm', { count: otherSessions.length }) : t('sessions.revokeConfirm')"
      :confirm-label="pending?.kind === 'others' ? t('sessions.revokeAll') : t('sessions.revoke')"
      danger
      @update:open="onDialogDismiss"
      @confirm="onConfirm"
    />
  </div>
</template>

<style scoped>
.device-sessions-page {
  max-width: 640px;
  margin: 0 auto;
  padding: var(--space-8) var(--space-4) var(--space-16);
}

.device-sessions-page__head {
  margin-bottom: var(--space-6);
}

.device-sessions-page__eyebrow {
  font-size: var(--text-2xs);
  font-weight: var(--fw-semibold, 600);
  letter-spacing: var(--tracking-caps);
  text-transform: uppercase;
  color: var(--text-subtle);
}

.device-sessions-page__title {
  margin-top: var(--space-1);
  font-family: var(--font-display);
  font-weight: var(--fw-semibold, 600);
  font-size: var(--text-2xl);
  letter-spacing: var(--tracking-tight);
  color: var(--text);
}

.device-sessions-page__desc {
  margin-top: var(--space-2);
  color: var(--text-muted);
  font-size: var(--text-sm);
}

.device-sessions-page__card {
  background: var(--surface-1);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.device-sessions-page__card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-3);
  flex-wrap: wrap;
  padding: var(--space-4);
  border-bottom: 1px solid var(--border-subtle);
}

.device-sessions-page__card-heading {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.device-sessions-page__card-title {
  font-family: var(--font-display);
  font-size: var(--text-base);
  font-weight: 600;
  color: var(--text);
  margin: 0;
}

.device-sessions-page__card-title:focus:not(:focus-visible) {
  outline: none;
}

.device-sessions-page__count {
  font-size: var(--text-xs);
  color: var(--text-subtle);
}

.device-sessions-page__card-actions {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
}

.device-sessions-page__card-body {
  padding: var(--space-4);
  min-height: 80px;
}

.session-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.session-item {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3);
  border-radius: var(--radius-md);
  background: var(--surface-2);
}

.session-item__icon {
  width: 36px;
  height: 36px;
  display: grid;
  place-items: center;
  border-radius: var(--radius-full);
  background: var(--surface-3);
  color: var(--text-muted);
}

.session-item__info {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.session-item__label {
  font-size: var(--text-sm);
  color: var(--text);
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.session-item__badge {
  font-size: var(--text-2xs);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: var(--tracking-caps);
  color: var(--text-muted);
  background: var(--surface-3);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-full);
  padding: 1px var(--space-2);
}

.session-item__meta {
  font-size: var(--text-xs);
  color: var(--text-subtle);
}

.session-item__revoke {
  color: var(--text-muted);
}

.session-item .session-item__revoke:hover:not(:disabled):not(.is-loading) {
  color: var(--error);
}
</style>
