<!--
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
-->

<script setup lang="ts">
/**
 * LoginForm (R4.1) — the redesigned sign-in card.
 *
 * Cinematic glass ticket-stub (AuthCard) with token-driven, accessible fields
 * (AuthField), inline validation, a top error banner AND an error toast on
 * failure, and a config-driven `#oauth` slot. The auth flow is unchanged:
 * `useAuthStore.login` -> on success emit `success` + route to the app home.
 */
import { computed, inject, ref } from 'vue';
import { useRouter } from 'vue-router';
import AuthCard from './auth/AuthCard.vue';
import AuthField from './auth/AuthField.vue';
import Button from './ui/Button.vue';
import Icon from './Icon.vue';
import { useAuthStore } from '../stores/useAuthStore';
import { useToastStore } from '../stores/useToastStore';
import { useMessages } from '../composables/useMessages';
import type { PhlixAppConfig } from '../app/types';

const emit = defineEmits<{ success: [] }>();

const auth = useAuthStore();
const toasts = useToastStore();
const router = useRouter();
const { t } = useMessages();

const config = inject<PhlixAppConfig | null>('phlixConfig', null);
const homePath = computed(() => config?.home ?? config?.routerBase ?? '/app');
const signupPath = computed(() => `${config?.routerBase ?? '/app'}/signup`);

// The identifier may be a username OR an email — the store sends it under both
// keys and the back ends resolve either, so there's no email-format gate here.
const identifier = ref('');
const password = ref('');
const identifierError = ref<string | null>(null);
const passwordError = ref<string | null>(null);

function validate(): boolean {
  identifierError.value = !identifier.value.trim() ? t('auth.identifierRequired') : null;
  passwordError.value = !password.value ? t('auth.passwordRequired') : null;
  return !identifierError.value && !passwordError.value;
}

async function handleSubmit(): Promise<void> {
  if (!validate()) return;
  const ok = await auth.login(identifier.value.trim(), password.value);
  if (ok) {
    emit('success');
    void router.push(homePath.value);
  } else {
    toasts.error(auth.error ?? t('auth.signInFailed'));
  }
}
</script>

<template>
  <AuthCard :eyebrow="t('auth.loginEyebrow')" :title="t('auth.loginTitle')" :subtitle="t('auth.loginSubtitle')">
    <p v-if="auth.error" class="login__banner" role="alert">
      <Icon name="alert" class="login__banner-icon" />
      <span>{{ auth.error }}</span>
    </p>

    <form class="login__form" novalidate @submit.prevent="handleSubmit">
      <AuthField
        v-model="identifier"
        name="identifier"
        :label="t('auth.usernameOrEmail')"
        type="text"
        autocomplete="username"
        :placeholder="t('auth.usernameOrEmailPlaceholder')"
        :error="identifierError"
        required
      />
      <AuthField
        v-model="password"
        :label="t('auth.password')"
        type="password"
        autocomplete="current-password"
        :placeholder="t('auth.passwordPlaceholder')"
        :error="passwordError"
        required
      />

      <Button type="submit" variant="solid" size="lg" block :loading="auth.loading">
        {{ auth.loading ? t('auth.signingIn') : t('auth.signIn') }}
      </Button>

      <template v-if="$slots.oauth">
        <div class="login__divider">{{ t('auth.orContinueWith') }}</div>
        <div class="login__oauth"><slot name="oauth" /></div>
      </template>
    </form>

    <template #footer>
      {{ t('auth.loginFooterPrompt') }}
      <RouterLink :to="signupPath" class="login__link">{{ t('auth.signupLink') }}</RouterLink>
    </template>
  </AuthCard>
</template>

<style scoped>
.login__banner {
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
.login__banner-icon {
  flex-shrink: 0;
  font-size: 1.1em;
}
.login__form {
  margin-top: var(--space-6);
  display: grid;
  gap: var(--space-5);
}
.login__divider {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  color: var(--text-faint);
  font-size: var(--text-2xs);
  letter-spacing: var(--tracking-caps);
  text-transform: uppercase;
}
.login__divider::before,
.login__divider::after {
  content: '';
  height: 1px;
  flex: 1;
  background: var(--border);
}
.login__oauth {
  display: grid;
  gap: var(--space-3);
}
.login__link {
  color: var(--accent-text);
  text-decoration: none;
  font-weight: var(--fw-semibold, 600);
}
.login__link:hover {
  text-decoration: underline;
}
</style>
