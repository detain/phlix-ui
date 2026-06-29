<script setup lang="ts">
/**
 * ConnectPage — the first-run "point this app at your Phlix server" screen for
 * native clients (Windows/Tizen/…) that ship with NO server baked in.
 *
 * A web-hosted server/hub never reaches here (its origin IS the API base, so
 * `requireConnection` is false). A native client boots with no stored connection
 * and `createPhlixApp`'s guard redirects every route here until one is chosen.
 * The user enters their server (or hub) address; we infer a scheme, probe its
 * public `/health`, and on success persist it to {@link useConnectionStore}
 * (which re-points every API call reactively and notifies the host shell so it
 * can mirror the URL into its own durable store). On a failed probe we surface a
 * "couldn't reach" message but still offer "Connect anyway" — some back ends
 * don't expose `/health` cross-origin, and the chosen base must still be usable.
 *
 * Reuses the cinematic auth chrome (AppBackdrop + AuthCard + AuthField + Button)
 * so it reads as part of the same "box office" entry flow as Login/Signup.
 */
import { computed, inject, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import AppBackdrop from '../components/AppBackdrop.vue';
import AuthCard from '../components/auth/AuthCard.vue';
import AuthField from '../components/auth/AuthField.vue';
import Button from '../components/ui/Button.vue';
import Icon from '../components/Icon.vue';
import { usePreferencesStore } from '../stores/usePreferencesStore';
import {
  useConnectionStore,
  withScheme,
  isPlaintextPublic,
  originOf,
  probeServer,
} from '../stores/useConnectionStore';
import { useMessages } from '../composables/useMessages';
import type { PhlixAppConfig } from '../app/types';

const prefs = usePreferencesStore();
const connection = useConnectionStore();
const route = useRoute();
const router = useRouter();
const { t } = useMessages();

const config = inject<PhlixAppConfig | null>('phlixConfig', null);
const homePath = computed(() => config?.home ?? config?.routerBase ?? '/app');

const address = ref('');
const fieldError = ref<string | null>(null);
const probing = ref(false);
// Set after a failed probe so we can reveal a non-blocking "Connect anyway"
// affordance (the URL may still be valid behind a CORS-restricted /health).
const unreachable = ref(false);
// Holds the resolved ORIGIN for which the plaintext-public warning has been
// acknowledged. Keying the acknowledgement to the exact origin (rather than a
// one-shot boolean) means editing the address to a DIFFERENT plaintext-public
// host re-warns on its own — a stale ack can never wave a new host through.
const plaintextWarnedOrigin = ref<string | null>(null);
// True only while the CURRENT resolved origin is the one that was acknowledged.
const plaintextWarned = computed(
  () =>
    plaintextWarnedOrigin.value !== null &&
    plaintextWarnedOrigin.value === originOf(address.value),
);
// Set when committing would point the client (and its Bearer token) at an origin
// the user has not confirmed before — require a one-time explicit confirm. Holds
// the origin string for the prompt copy; null when no confirm is pending.
const pendingOrigin = ref<string | null>(null);
// The resolved (scheme-prefixed) base awaiting a pending confirm, so the confirm
// button commits exactly what was probed — not a value the user has since edited.
const pendingUrl = ref<string | null>(null);

// Editing the address invalidates any state keyed to the PREVIOUS value: the
// "couldn't reach" affordance and a pending new-origin confirm both describe a
// URL the user has now changed, so clear them. (The plaintext acknowledgement is
// keyed to its origin via `plaintextWarned`, so it self-invalidates and needs no
// reset here.)
watch(address, () => {
  unreachable.value = false;
  pendingOrigin.value = null;
  pendingUrl.value = null;
});

/** Resolve where to go once connected: the route that bounced us here, else home. */
function destination(): string {
  const redirect = route.query['redirect'];
  return typeof redirect === 'string' && redirect ? redirect : homePath.value;
}

function commit(url: string): void {
  // setApiBase records this origin as confirmed, so a later return visit to the
  // same origin won't re-prompt.
  connection.setApiBase(url);
  // Not authenticated yet — pushing home lets the auth guard route on to login.
  void router.push(destination());
}

/**
 * Run the gauntlet for a resolved base before committing:
 *  1. plaintext-public → one-time warning + explicit confirm,
 *  2. new origin (token recipient) → one-time send confirm.
 * Returns true if `url` was committed; false if a confirm step is now pending.
 */
function commitWithGuards(url: string): boolean {
  if (isPlaintextPublic(url) && !plaintextWarned.value) {
    plaintextWarnedOrigin.value = originOf(url);
    fieldError.value = null;
    return false;
  }
  if (connection.isNewOrigin(url)) {
    pendingUrl.value = url;
    pendingOrigin.value = originOf(url);
    return false;
  }
  commit(url);
  return true;
}

async function handleConnect(): Promise<void> {
  fieldError.value = null;
  unreachable.value = false;
  // A fresh attempt clears any stale pending-origin confirm.
  pendingOrigin.value = null;
  pendingUrl.value = null;
  const url = withScheme(address.value);
  if (!url) {
    // '' = empty OR a non-http(s) / malformed value (javascript:, data:, file:…).
    fieldError.value = address.value.trim()
      ? t('connect.invalidAddress')
      : t('connect.addressRequired');
    return;
  }
  // Surface the plaintext-public warning up front (before any network call), so
  // the user acknowledges it before we probe/commit.
  if (isPlaintextPublic(url) && !plaintextWarned.value) {
    plaintextWarnedOrigin.value = originOf(url);
    return;
  }
  probing.value = true;
  try {
    const ok = await probeServer(url);
    if (ok) {
      commitWithGuards(url);
    } else {
      unreachable.value = true;
      fieldError.value = t('connect.unreachable');
    }
  } finally {
    probing.value = false;
  }
}

function connectAnyway(): void {
  const url = withScheme(address.value);
  if (url) commitWithGuards(url);
}

/** User confirmed sending the token to the pending NEW origin. */
function confirmOrigin(): void {
  const url = pendingUrl.value;
  pendingOrigin.value = null;
  pendingUrl.value = null;
  if (url) commit(url);
}

/** User backed out of the new-origin token-send confirm. */
function cancelOrigin(): void {
  pendingOrigin.value = null;
  pendingUrl.value = null;
}
</script>

<template>
  <div class="auth-page">
    <AppBackdrop :enabled="prefs.atmosphere" :grain="true" :vignette="true" />
    <div v-if="prefs.atmosphere" class="auth-page__glow" aria-hidden="true" />
    <div class="auth-page__center">
      <AuthCard
        :eyebrow="t('connect.eyebrow')"
        :title="t('connect.title')"
        :subtitle="t('connect.subtitle')"
      >
        <form class="connect__form" novalidate @submit.prevent="handleConnect">
          <AuthField
            v-model="address"
            name="server-address"
            :label="t('connect.addressLabel')"
            type="text"
            inputmode="url"
            autocomplete="url"
            :placeholder="t('connect.addressPlaceholder')"
            :error="fieldError"
            required
          />

          <p class="connect__hint">{{ t('connect.hint') }}</p>

          <p
            v-if="plaintextWarned && !pendingOrigin"
            class="connect__warning"
            role="alert"
          >
            <Icon name="alert" class="connect__warning-icon" />
            <span>{{ t('connect.plaintextWarning') }}</span>
          </p>

          <Button type="submit" variant="solid" size="lg" block :loading="probing">
            {{ probing ? t('connect.connecting') : t('connect.connect') }}
          </Button>

          <button
            v-if="unreachable"
            type="button"
            class="connect__anyway"
            @click="connectAnyway"
          >
            <Icon name="alert" class="connect__anyway-icon" />
            <span>{{ t('connect.connectAnyway') }}</span>
          </button>

          <!-- One-time confirm before the first authed call sends the Bearer
               token to a NEW origin (typo / hostile-address guard). -->
          <div v-if="pendingOrigin" class="connect__confirm" role="alertdialog">
            <p class="connect__confirm-text">
              {{ t('connect.originConfirm', { origin: pendingOrigin }) }}
            </p>
            <div class="connect__confirm-actions">
              <Button type="button" variant="solid" size="md" @click="confirmOrigin">
                {{ t('connect.confirmContinue') }}
              </Button>
              <Button type="button" variant="ghost" size="md" @click="cancelOrigin">
                {{ t('connect.confirmCancel') }}
              </Button>
            </div>
          </div>
        </form>
      </AuthCard>
    </div>
  </div>
</template>

<style scoped>
.auth-page {
  position: relative;
  min-height: 100%;
}
.auth-page__glow {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background:
    radial-gradient(60% 50% at 50% -8%, rgba(245, 165, 36, 0.2), transparent 62%),
    radial-gradient(40% 36% at 84% 110%, rgba(245, 165, 36, 0.1), transparent 70%);
}
.auth-page__center {
  position: relative;
  z-index: 1;
  min-height: inherit;
  display: grid;
  place-items: center;
  padding: var(--space-12) var(--space-4);
}
.connect__form {
  margin-top: var(--space-6);
  display: grid;
  gap: var(--space-5);
}
.connect__hint {
  margin-top: calc(-1 * var(--space-2));
  font-size: var(--text-sm);
  color: var(--text-muted);
}
.connect__anyway {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  background: none;
  border: none;
  cursor: pointer;
  color: var(--text-muted);
  font-size: var(--text-sm);
}
.connect__anyway:hover {
  color: var(--text);
  text-decoration: underline;
}
.connect__anyway-icon {
  flex-shrink: 0;
  font-size: 1.05em;
  color: var(--accent-text);
}
.connect__warning {
  display: flex;
  align-items: flex-start;
  gap: var(--space-2);
  margin: 0;
  padding: var(--space-3);
  border-radius: var(--radius-md, 8px);
  background: rgba(245, 165, 36, 0.12);
  border: 1px solid rgba(245, 165, 36, 0.4);
  color: var(--text);
  font-size: var(--text-sm);
}
.connect__warning-icon {
  flex-shrink: 0;
  margin-top: 0.1em;
  font-size: 1.1em;
  color: var(--accent-text);
}
.connect__confirm {
  display: grid;
  gap: var(--space-3);
  padding: var(--space-4);
  border-radius: var(--radius-md, 8px);
  background: var(--surface-2, rgba(255, 255, 255, 0.04));
  border: 1px solid var(--border, rgba(255, 255, 255, 0.12));
}
.connect__confirm-text {
  margin: 0;
  font-size: var(--text-sm);
  color: var(--text);
}
.connect__confirm-actions {
  display: flex;
  gap: var(--space-3);
}
</style>
