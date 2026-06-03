<script setup lang="ts">
/**
 * SignupForm (R4.1) — the redesigned account-creation card.
 *
 * Same cinematic AuthCard + AuthField surface as LoginForm, with client-side
 * validation (email format, username ≥ 3, password ≥ 8, password match). The
 * auth flow is unchanged: `useAuthStore.signup` -> on success emit `success` +
 * route to the app home; failures surface a top banner + an error toast.
 */
import { computed, inject, ref } from 'vue';
import { useRouter } from 'vue-router';
import AuthCard from './auth/AuthCard.vue';
import AuthField from './auth/AuthField.vue';
import Button from './ui/Button.vue';
import Icon from './Icon.vue';
import { useAuthStore } from '../stores/useAuthStore';
import { useToastStore } from '../stores/useToastStore';
import type { PhlixAppConfig } from '../app/types';

const emit = defineEmits<{ success: [] }>();

const auth = useAuthStore();
const toasts = useToastStore();
const router = useRouter();

const config = inject<PhlixAppConfig | null>('phlixConfig', null);
const homePath = computed(() => config?.routerBase ?? '/app');
const loginPath = computed(() => `${homePath.value}/login`);

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const email = ref('');
const username = ref('');
const password = ref('');
const confirmPassword = ref('');

const emailError = ref<string | null>(null);
const usernameError = ref<string | null>(null);
const passwordError = ref<string | null>(null);
const confirmError = ref<string | null>(null);

function validate(): boolean {
  emailError.value = !email.value.trim()
    ? 'Enter your email.'
    : !EMAIL_RE.test(email.value.trim())
      ? 'Enter a valid email address.'
      : null;
  usernameError.value = !username.value.trim()
    ? 'Choose a username.'
    : username.value.trim().length < 3
      ? 'Username must be at least 3 characters.'
      : null;
  passwordError.value = !password.value
    ? 'Choose a password.'
    : password.value.length < 8
      ? 'Password must be at least 8 characters.'
      : null;
  confirmError.value =
    confirmPassword.value !== password.value ? 'Passwords do not match.' : null;
  return !emailError.value && !usernameError.value && !passwordError.value && !confirmError.value;
}

async function handleSubmit(): Promise<void> {
  if (!validate()) return;
  const ok = await auth.signup(email.value.trim(), username.value.trim(), password.value);
  if (ok) {
    emit('success');
    void router.push(homePath.value);
  } else {
    toasts.error(auth.error ?? 'Registration failed.');
  }
}
</script>

<template>
  <AuthCard eyebrow="Now showing" title="Create your account" subtitle="Your private cinema, anywhere.">
    <p v-if="auth.error" class="signup__banner" role="alert">
      <Icon name="alert" class="signup__banner-icon" />
      <span>{{ auth.error }}</span>
    </p>

    <form class="signup__form" novalidate @submit.prevent="handleSubmit">
      <AuthField
        v-model="email"
        label="Email"
        type="email"
        autocomplete="email"
        inputmode="email"
        placeholder="you@example.com"
        :error="emailError"
        required
      />
      <AuthField
        v-model="username"
        label="Username"
        type="text"
        autocomplete="username"
        placeholder="Your username"
        :error="usernameError"
        :minlength="3"
        required
      />
      <AuthField
        v-model="password"
        label="Password"
        type="password"
        autocomplete="new-password"
        placeholder="At least 8 characters"
        :error="passwordError"
        :minlength="8"
        required
      />
      <AuthField
        v-model="confirmPassword"
        label="Confirm password"
        type="password"
        autocomplete="new-password"
        placeholder="Repeat your password"
        :error="confirmError"
        required
      />

      <Button type="submit" variant="solid" size="lg" block :loading="auth.loading">
        {{ auth.loading ? 'Creating account…' : 'Create account' }}
      </Button>

      <template v-if="$slots.oauth">
        <div class="signup__divider">or continue with</div>
        <div class="signup__oauth"><slot name="oauth" /></div>
      </template>
    </form>

    <template #footer>
      Already have an account?
      <RouterLink :to="loginPath" class="signup__link">Sign in</RouterLink>
    </template>
  </AuthCard>
</template>

<style scoped>
.signup__banner {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  margin-top: var(--space-5);
  padding: var(--space-3) var(--space-4);
  border-radius: var(--radius-md);
  background: var(--error-bg);
  border: 1px solid color-mix(in srgb, var(--error) 50%, transparent);
  color: var(--error);
  font-size: var(--text-sm);
}
.signup__banner-icon {
  flex-shrink: 0;
  font-size: 1.1em;
}
.signup__form {
  margin-top: var(--space-6);
  display: grid;
  gap: var(--space-5);
}
.signup__divider {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  color: var(--text-faint);
  font-size: var(--text-2xs);
  letter-spacing: var(--tracking-caps);
  text-transform: uppercase;
}
.signup__divider::before,
.signup__divider::after {
  content: '';
  height: 1px;
  flex: 1;
  background: var(--border);
}
.signup__oauth {
  display: grid;
  gap: var(--space-3);
}
.signup__link {
  color: var(--accent-text);
  text-decoration: none;
  font-weight: var(--fw-semibold, 600);
}
.signup__link:hover {
  text-decoration: underline;
}
</style>
