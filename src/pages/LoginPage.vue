<script setup lang="ts">
/**
 * LoginPage (R4.1) — full-bleed cinematic host for the sign-in card.
 *
 * Mounts the Nocturne atmosphere (AppBackdrop vignette+grain, gated on
 * `prefs.atmosphere`) + a static amber "booth" glow, and centers the LoginForm
 * over it. Forwards a `#oauth` slot through to the form for config-driven SSO.
 */
import LoginForm from '../components/LoginForm.vue';
import AppBackdrop from '../components/AppBackdrop.vue';
import { usePreferencesStore } from '../stores/usePreferencesStore';

const prefs = usePreferencesStore();
</script>

<template>
  <div class="auth-page">
    <AppBackdrop :enabled="prefs.atmosphere" :grain="true" :vignette="true" />
    <div v-if="prefs.atmosphere" class="auth-page__glow" aria-hidden="true" />
    <div class="auth-page__center">
      <LoginForm>
        <template v-if="$slots.oauth" #oauth><slot name="oauth" /></template>
      </LoginForm>
    </div>
  </div>
</template>

<style scoped>
.auth-page {
  position: relative;
  min-height: 100%;
}
/* Static amber "box-office" glow — projector spill from top + a corner kiss. */
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
</style>
