<script setup lang="ts">
import SettingsForm from '../components/SettingsForm.vue';
</script>

<template>
    <div class="settings-page">
        <div class="settings-header">
            <h1 class="settings-title">Settings</h1>
        </div>
        <SettingsForm />
    </div>
</template>

<style scoped>
.settings-page {
    max-width: 900px;
    margin: 0 auto;
}

.settings-header {
    padding: 24px 24px 0;
}

.settings-title {
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--color-text, #e4e4e7);
}
</style>
