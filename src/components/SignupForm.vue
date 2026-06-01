<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/useAuthStore';

const emit = defineEmits<{
    success: [];
}>();

const auth = useAuthStore();
const router = useRouter();

const email = ref('');
const username = ref('');
const password = ref('');
const confirmPassword = ref('');
const showPassword = ref(false);
const validationError = ref<string | null>(null);

async function handleSubmit() {
    validationError.value = null;

    if (password.value.length < 8) {
        validationError.value = 'Password must be at least 8 characters.';
        return;
    }

    if (password.value !== confirmPassword.value) {
        validationError.value = 'Passwords do not match.';
        return;
    }

    const ok = await auth.signup(email.value, username.value, password.value);
    if (ok) {
        emit('success');
        router.push('/app');
    }
}
</script>

<template>
    <form class="signup-form" @submit.prevent="handleSubmit">
        <h2 class="form-title">Create your Phlix account</h2>

        <div v-if="auth.error || validationError" class="form-error">
            {{ auth.error || validationError }}
        </div>

        <div class="field">
            <label for="email" class="label">Email</label>
            <input
                id="email"
                v-model="email"
                type="email"
                class="input"
                placeholder="you@example.com"
                required
                autocomplete="email"
            />
        </div>

        <div class="field">
            <label for="username" class="label">Username</label>
            <input
                id="username"
                v-model="username"
                type="text"
                class="input"
                placeholder="Your username"
                required
                autocomplete="username"
                minlength="3"
            />
        </div>

        <div class="field">
            <label for="password" class="label">Password</label>
            <div class="password-wrapper">
                <input
                    id="password"
                    v-model="password"
                    :type="showPassword ? 'text' : 'password'"
                    class="input"
                    placeholder="At least 8 characters"
                    required
                    autocomplete="new-password"
                    minlength="8"
                />
                <button
                    type="button"
                    class="toggle-password"
                    @click="showPassword = !showPassword"
                >
                    {{ showPassword ? '🙈' : '👁' }}
                </button>
            </div>
        </div>

        <div class="field">
            <label for="confirm" class="label">Confirm password</label>
            <input
                id="confirm"
                v-model="confirmPassword"
                :type="showPassword ? 'text' : 'password'"
                class="input"
                placeholder="Repeat your password"
                required
                autocomplete="new-password"
            />
        </div>

        <button type="submit" class="submit-btn" :disabled="auth.loading">
            {{ auth.loading ? 'Creating account...' : 'Create account' }}
        </button>

        <p class="form-footer">
            Already have an account?
            <router-link to="/app/login" class="link">Sign in</router-link>
        </p>
    </form>
</template>

<style scoped>
.signup-form {
    width: 100%;
    max-width: 400px;
    padding: 32px;
    background: var(--color-surface, #141420);
    border-radius: var(--radius-lg, 12px);
    border: 1px solid var(--color-border, #27272a);
}

.form-title {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 24px;
    color: var(--color-text, #e4e4e7);
}

.form-error {
    padding: 10px 14px;
    background: var(--color-error-bg, rgba(239, 68, 68, 0.1));
    border: 1px solid var(--color-error, #ef4444);
    border-radius: var(--radius-md, 8px);
    color: var(--color-error, #ef4444);
    font-size: 0.875rem;
    margin-bottom: 16px;
}

.field {
    margin-bottom: 16px;
}

.label {
    display: block;
    font-size: 0.8rem;
    font-weight: 500;
    color: var(--color-text-muted, #a1a1aa);
    margin-bottom: 6px;
}

.input {
    width: 100%;
    padding: 10px 14px;
    border-radius: var(--radius-md, 8px);
    border: 1px solid var(--color-border, #27272a);
    background: var(--color-bg, #0a0a0f);
    color: var(--color-text, #e4e4e7);
    font-size: 0.9rem;
    transition: border-color 0.15s ease;
}

.input:focus {
    outline: none;
    border-color: var(--color-primary, #6366f1);
}

.input::placeholder {
    color: var(--color-text-subtle, #71717a);
}

.password-wrapper {
    position: relative;
}

.password-wrapper .input {
    padding-right: 40px;
}

.toggle-password {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1rem;
    opacity: 0.5;
}

.toggle-password:hover {
    opacity: 1;
}

.submit-btn {
    width: 100%;
    padding: 10px 16px;
    margin-top: 8px;
    background: var(--color-primary, #6366f1);
    color: #fff;
    border: none;
    border-radius: var(--radius-md, 8px);
    font-size: 0.95rem;
    font-weight: 500;
    cursor: pointer;
    transition: background 0.15s ease;
}

.submit-btn:hover:not(:disabled) {
    background: var(--color-primary-hover, #818cf8);
}

.submit-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

.form-footer {
    margin-top: 20px;
    text-align: center;
    font-size: 0.85rem;
    color: var(--color-text-muted, #a1a1aa);
}

.link {
    color: var(--color-primary, #6366f1);
    text-decoration: none;
}

.link:hover {
    text-decoration: underline;
}
</style>
