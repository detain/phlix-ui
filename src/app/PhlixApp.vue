<template>
    <AppLayout>
        <template #nav>
            <nav class="main-nav">
                <RouterLink to="/app" class="nav-link">Browse</RouterLink>
                <RouterLink to="/app/settings" class="nav-link">Settings</RouterLink>
            </nav>
        </template>
        <RouterView />
    </AppLayout>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import AppLayout from './AppLayout.vue';
</script>

<style scoped>
.main-nav {
    display: flex;
    gap: var(--space-4, 1rem);
}

.nav-link {
    color: var(--color-text-muted, #a1a1aa);
    font-size: var(--text-sm, 0.875rem);
    font-weight: var(--font-medium, 500);
    transition: color 0.15s ease;
}

.nav-link:hover,
.nav-link.router-link-active {
    color: var(--color-text, #e4e4e7);
}
</style>
