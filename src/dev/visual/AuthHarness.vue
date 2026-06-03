<script setup lang="ts">
/**
 * Auth surface visual harness (R6.4b). Mounts the real `LoginForm` (which renders
 * the `AuthCard` glass "ticket-stub" + `AuthField`s) centered on the page, signed
 * out (no token seeded → the form is shown). Acceptance target:
 * `src/dev/mockups/auth-screen.html`. The projector-glow backdrop in the mockup is
 * atmosphere (off here for determinism); the card's own beam/sprocket signatures
 * still render (frozen by Playwright's `animations:'disabled'`).
 */
import LoginForm from '../../components/LoginForm.vue';
</script>

<template>
  <div class="vh-auth">
    <LoginForm />
  </div>
</template>

<style scoped>
.vh-auth {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-8) var(--space-6);
}
</style>
