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
import { computed, inject, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import AppBackdrop from '../components/AppBackdrop.vue';
import AuthCard from '../components/auth/AuthCard.vue';
import AuthField from '../components/auth/AuthField.vue';
import Button from '../components/ui/Button.vue';
import Icon from '../components/Icon.vue';
import { usePreferencesStore } from '../stores/usePreferencesStore';
import { useConnectionStore, withScheme, probeServer } from '../stores/useConnectionStore';
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

/** Resolve where to go once connected: the route that bounced us here, else home. */
function destination(): string {
  const redirect = route.query['redirect'];
  return typeof redirect === 'string' && redirect ? redirect : homePath.value;
}

function commit(url: string): void {
  connection.setApiBase(url);
  // Not authenticated yet — pushing home lets the auth guard route on to login.
  void router.push(destination());
}

async function handleConnect(): Promise<void> {
  fieldError.value = null;
  unreachable.value = false;
  const url = withScheme(address.value);
  if (!url) {
    fieldError.value = t('connect.addressRequired');
    return;
  }
  probing.value = true;
  try {
    const ok = await probeServer(url);
    if (ok) {
      commit(url);
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
  if (url) commit(url);
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
</style>
