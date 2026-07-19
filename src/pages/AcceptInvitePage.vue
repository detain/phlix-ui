<!--
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 -->

<script setup lang="ts">
/**
 * AcceptInvitePage (WS-D-HUB #7) — the PUBLIC invite-acceptance surface.
 *
 * Reached at `/app/invite/:token`, where the hub redirects the public
 * `GET /invite/{token}` link. This is the only genuinely broken hub surface: the
 * PHP redirect had no matching Vue route (404). This restores parity with the
 * retired Smarty `home/accept-invite.tpl` + `accept-invite.js` flow:
 *
 *   - NOT logged in → generic "you've been invited" message + Log In / Sign Up
 *     buttons that carry a `?redirect=/app/invite/<token>` hop back here (honoured
 *     by LoginForm/SignupForm's safe-redirect guard) so the user returns to accept.
 *   - Logged in → an "Accept Invite" button → `POST /api/v1/me/invite-links/{token}/redeem`
 *     (auth-gated). On success a confirmation + a "View Shared Libraries" button
 *     to `/app/shared-with-me`. Errors map: 401 re-login, 404 not found, 410
 *     expired/exhausted, else generic.
 *
 * The route is `meta: { public: true }` so the auth guard lets an unauthenticated
 * visitor reach it. `isLoggedIn` here is only a token-PRESENCE flag (the public
 * route skips `auth.init()`); a stale token simply surfaces as a 401 on redeem,
 * which routes the user to log in again — matching the Smarty behaviour.
 *
 * `client` is an injectable test seam; it defaults to the shared `api` singleton.
 */
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { api, ApiClient } from '../api/client';
import { ApiError, errMessage } from '../api/errors';
import { useAuthStore } from '../stores/useAuthStore';
import Button from '../components/ui/Button.vue';

const props = defineProps<{
  /** The opaque invite token from the URL (may contain `/` — captured via `:token(.*)`). */
  token: string;
  /** Inject an API client for tests; defaults to the shared `api` singleton. */
  client?: ApiClient;
}>();

const http = props.client ?? api;
const auth = useAuthStore();
const router = useRouter();

const isLoggedIn = computed(() => auth.isLoggedIn);

const submitting = ref(false);
const accepted = ref(false);
const error = ref<string | null>(null);

/** The `?redirect=` value the auth buttons carry so login/signup returns here. */
const loginTo = computed(() => ({
  path: '/app/login',
  query: { redirect: `/app/invite/${props.token}` },
}));
const signupTo = computed(() => ({
  path: '/app/signup',
  query: { redirect: `/app/invite/${props.token}` },
}));

/**
 * Redeem the invite. Mirrors the retired accept-invite.js error map exactly:
 * 401 → re-login (and hop back here), 404 → not found, 410 → expired/exhausted,
 * anything else → the server message or a generic fallback.
 */
async function accept(): Promise<void> {
  if (!props.token) {
    error.value = 'Invalid invite token.';
    return;
  }
  submitting.value = true;
  error.value = null;
  try {
    await http.post(`/api/v1/me/invite-links/${encodeURIComponent(props.token)}/redeem`);
    accepted.value = true;
  } catch (e) {
    const status = e instanceof ApiError ? e.status : 0;
    if (status === 401) {
      error.value = 'Session expired. Please log in again.';
      void router.push(loginTo.value);
    } else if (status === 410) {
      error.value = 'This invite link has expired or been exhausted.';
    } else if (status === 404) {
      error.value = 'This invite link was not found.';
    } else {
      error.value = errMessage(e, 'Failed to accept invite.');
    }
  } finally {
    submitting.value = false;
  }
}

function viewShared(): void {
  void router.push('/app/shared-with-me');
}
</script>

<template>
  <section class="accept-invite" aria-labelledby="accept-invite-heading">
    <div class="accept-invite__card">
      <h1 id="accept-invite-heading" class="accept-invite__title">Accept Invite</h1>

      <!-- Authenticated: accept flow -->
      <template v-if="isLoggedIn">
        <template v-if="accepted">
          <div class="accept-invite__success" role="status">
            <p>You've been granted access to the library!</p>
          </div>
          <Button variant="solid" size="lg" block @click="viewShared">
            View Shared Libraries
          </Button>
        </template>

        <template v-else>
          <p class="accept-invite__lead">You've been invited to access a library.</p>

          <p v-if="error" class="accept-invite__error" role="alert">{{ error }}</p>

          <Button
            variant="solid"
            size="lg"
            block
            :loading="submitting"
            @click="accept"
          >
            {{ submitting ? 'Accepting…' : 'Accept Invite' }}
          </Button>
        </template>
      </template>

      <!-- Unauthenticated: log in / sign up to continue -->
      <template v-else>
        <p class="accept-invite__lead">
          You've been invited to access a library. Log in or create an account to accept.
        </p>
        <div class="accept-invite__actions">
          <Button variant="solid" size="lg" block @click="router.push(loginTo)">
            Log In
          </Button>
          <Button variant="ghost" size="lg" block @click="router.push(signupTo)">
            Sign Up
          </Button>
        </div>
      </template>
    </div>
  </section>
</template>

<style scoped>
.accept-invite {
  display: flex;
  justify-content: center;
  padding: var(--space-8) var(--space-4);
}

.accept-invite__card {
  width: 100%;
  max-width: 440px;
  padding: var(--space-6);
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-2);
}

.accept-invite__title {
  font-family: var(--font-display);
  font-weight: var(--font-semibold);
  font-size: var(--text-xl);
  letter-spacing: var(--tracking-tight);
  color: var(--text);
  margin: 0 0 var(--space-4);
}

.accept-invite__lead {
  font-size: var(--text-sm);
  color: var(--text-muted);
  margin: 0 0 var(--space-5);
}

.accept-invite__success {
  margin-bottom: var(--space-5);
  padding: var(--space-4);
  border-radius: var(--radius-md);
  background: var(--success-bg, color-mix(in srgb, var(--success) 12%, transparent));
  border: 1px solid color-mix(in srgb, var(--success) 40%, transparent);
  color: var(--success);
  font-size: var(--text-sm);
}

.accept-invite__success p {
  margin: 0;
}

.accept-invite__error {
  margin: 0 0 var(--space-4);
  padding: var(--space-3) var(--space-4);
  border-radius: var(--radius-md);
  background: var(--error-bg);
  border: 1px solid color-mix(in srgb, var(--error) 50%, transparent);
  color: var(--error);
  font-size: var(--text-sm);
}

.accept-invite__actions {
  display: grid;
  gap: var(--space-3);
}
</style>
