<script setup lang="ts">
import LoginForm from '../components/LoginForm.vue';
</script>

<template>
    <div class="auth-page">
        <div class="auth-card">
            <LoginForm @success="() => {}" />
        </div>
    </div>
</template>

<style scoped>
.auth-page {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    background: var(--color-bg, #0a0a0f);
}

.auth-card {
    width: 100%;
}
</style>
