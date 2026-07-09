<!--
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
-->

<template>
    <div class="phlix-placeholder">
        <div class="placeholder-content">
            <h1>Shared UI loading...</h1>
            <p>Phlix {{ appName }} is initializing</p>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    appName: string;
}>();
</script>

<style scoped>
.phlix-placeholder {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background-color: var(--color-bg, #0a0a0f);
    color: var(--color-text, #e4e4e7);
}

.placeholder-content {
    text-align: center;
}

.placeholder-content h1 {
    font-size: var(--text-2xl, 1.5rem);
    margin-bottom: var(--space-2, 0.5rem);
}

.placeholder-content p {
    color: var(--color-text-muted, #a1a1aa);
}
</style>
