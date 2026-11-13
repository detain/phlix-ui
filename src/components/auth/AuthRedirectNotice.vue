<!--
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
-->

<script setup lang="ts">
/**
 * AuthRedirectNotice — renders the message the server carries on a legacy
 * auth redirect (`/login?error=…&code=…`, `/login?notice=…`,
 * `/auth/register?error=…`, OAuth `?error=<code>`). Machine code first
 * (localized), human text fallback. Renders nothing when no envelope is present.
 */
import { computed, inject } from 'vue';
import { useRoute } from 'vue-router';
import { resolveRedirectEnvelope } from '../../utils/redirectEnvelope';
import type { PhlixAppConfig } from '../../app/types';

const route = useRoute();
const config = inject<PhlixAppConfig | null>('phlixConfig', null);
const envelope = computed(() => resolveRedirectEnvelope(route.query, config?.locale));
</script>

<template>
  <p
    v-if="envelope"
    class="auth-redirect"
    :class="`auth-redirect--${envelope.kind}`"
    :role="envelope.kind === 'error' ? 'alert' : 'status'"
    :data-code="envelope.code ?? undefined"
  >{{ envelope.message }}</p>
</template>

<style scoped>
.auth-redirect {
  margin: 0 0 var(--space-4);
  padding: var(--space-3) var(--space-4);
  border-radius: var(--radius-md);
  font-size: var(--text-sm);
  max-width: 28rem;
}
.auth-redirect--error {
  background: var(--error-bg);
  border: 1px solid color-mix(in srgb, var(--error) 50%, transparent);
  color: var(--error);
}
.auth-redirect--notice {
  border: 1px solid var(--border, currentColor);
  color: inherit;
}
/* CU-076: static fallback for engines without color-mix() (declared floor). */
@supports not (color: color-mix(in srgb, red, blue)) {
  .auth-redirect--error { border: 1px solid rgba(239, 94, 87, 0.5); }
}
</style>
