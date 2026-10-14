<!--
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
-->

<script setup lang="ts">
/**
 * NotFoundPage (R13-08) — the honest terminal for the router catch-all.
 *
 * The catch-all used to render the "Shared UI loading…" placeholder, which
 * lied: the app had long finished loading, the ROUTE simply does not exist.
 * This page says so (EmptyState) and offers one way out — back to the browse
 * home the app shell itself treats as home.
 */
import { useRouter } from 'vue-router';
import EmptyState from '../../components/ui/EmptyState.vue';
import Button from '../../components/ui/Button.vue';
import { useMessages } from '../../composables/useMessages';

const { t } = useMessages();
const router = useRouter();

function goHome(): void {
  // Same resolution order the shell uses for "home": the named browse route
  // when the host registered it, the app root otherwise.
  if (router.hasRoute('browse')) void router.replace({ name: 'browse' });
  else void router.replace('/');
}
</script>

<template>
  <div class="phlix-not-found">
    <EmptyState icon="search" :title="t('notFound.title')" :description="t('notFound.description')">
      <template #actions>
        <Button variant="solid" size="sm" @click="goHome">{{ t('notFound.goHome') }}</Button>
      </template>
    </EmptyState>
  </div>
</template>

<style scoped>
.phlix-not-found {
  display: grid;
  place-items: center;
  min-height: 60vh;
  padding: var(--space-6);
}
</style>
