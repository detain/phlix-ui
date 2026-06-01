<script setup lang="ts">
import SignupForm from '../components/SignupForm.vue';
</script>

<template>
    <div class="auth-page">
        <div class="auth-card">
            <SignupForm @success="() => {}" />
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
