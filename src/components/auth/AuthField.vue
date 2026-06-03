<script setup lang="ts">
/**
 * AuthField (R4.1) — a labelled text/email/password input for the auth cards.
 *
 * Token-driven + accessible: a real <label>, `aria-invalid` + `aria-describedby`
 * wiring to an `aria-live` message line, and (for `type="password"`) an in-field
 * `eye`/`eye-off` reveal toggle exposed as a real button with `aria-pressed` +
 * a dynamic `aria-label`. Two-way bound via v-model. Icon-only (no emoji).
 */
import { computed, ref, useId } from 'vue';
import Icon from '../Icon.vue';

const props = withDefaults(
  defineProps<{
    modelValue: string;
    label: string;
    type?: 'text' | 'email' | 'password';
    id?: string;
    name?: string;
    placeholder?: string;
    autocomplete?: string;
    inputmode?: 'text' | 'email' | 'numeric' | 'tel' | 'url' | 'none';
    /** Inline validation message; when set the field renders invalid + describes the input. */
    error?: string | null;
    required?: boolean;
    minlength?: number;
    disabled?: boolean;
  }>(),
  { type: 'text', error: null, required: false, disabled: false },
);

const emit = defineEmits<{ (e: 'update:modelValue', v: string): void }>();

const uid = useId();
const fieldId = computed(() => props.id ?? `authfield-${uid}`);
const msgId = computed(() => `${fieldId.value}-msg`);

const revealed = ref(false);
const isPassword = computed(() => props.type === 'password');
const inputType = computed(() =>
  isPassword.value ? (revealed.value ? 'text' : 'password') : props.type,
);

function onInput(e: Event): void {
  emit('update:modelValue', (e.target as HTMLInputElement).value);
}
function toggleReveal(): void {
  revealed.value = !revealed.value;
}
</script>

<template>
  <div class="authfield" :class="{ 'is-invalid': !!error, 'has-toggle': isPassword }">
    <label class="authfield__label" :for="fieldId">{{ label }}</label>
    <div class="authfield__wrap">
      <input
        :id="fieldId"
        class="authfield__input"
        :name="name"
        :type="inputType"
        :value="modelValue"
        :placeholder="placeholder"
        :autocomplete="autocomplete"
        :inputmode="inputmode"
        :required="required"
        :minlength="minlength"
        :disabled="disabled"
        :aria-invalid="error ? 'true' : undefined"
        :aria-describedby="error ? msgId : undefined"
        @input="onInput"
      />
      <button
        v-if="isPassword"
        type="button"
        class="authfield__toggle"
        :aria-label="revealed ? 'Hide password' : 'Show password'"
        :aria-pressed="revealed"
        :disabled="disabled"
        @click="toggleReveal"
      >
        <Icon :name="revealed ? 'eye-off' : 'eye'" />
      </button>
    </div>
    <p :id="msgId" class="authfield__msg" aria-live="polite">{{ error || '' }}</p>
  </div>
</template>

<style scoped>
.authfield {
  display: grid;
  gap: var(--space-2);
}
.authfield__label {
  font-size: var(--text-2xs);
  font-weight: var(--fw-semibold, 600);
  letter-spacing: var(--tracking-caps);
  text-transform: uppercase;
  color: var(--text-subtle);
}
.authfield__wrap {
  position: relative;
}
.authfield__input {
  width: 100%;
  height: 46px;
  padding: 0 var(--space-4);
  border-radius: var(--radius-md);
  background: color-mix(in srgb, var(--surface) 80%, transparent);
  border: 1px solid var(--border);
  color: var(--text);
  font: inherit;
  font-size: var(--text-base);
  transition: border-color var(--dur-fast) var(--ease-out),
    box-shadow var(--dur-base) var(--ease-out), background var(--dur-base) var(--ease-out);
}
.authfield__input::placeholder {
  color: var(--text-faint);
}
.authfield__input:hover:not(:disabled) {
  border-color: var(--border-strong);
}
.authfield__input:focus {
  outline: none;
  border-color: var(--accent-ring);
  box-shadow: 0 0 0 3px var(--accent-soft);
  background: color-mix(in srgb, var(--surface) 95%, transparent);
}
.authfield__input:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
.has-toggle .authfield__input {
  padding-right: 46px;
}
.is-invalid .authfield__input {
  border-color: color-mix(in srgb, var(--error) 60%, var(--border));
}
.is-invalid .authfield__input:focus {
  box-shadow: 0 0 0 3px var(--error-bg);
}

.authfield__toggle {
  position: absolute;
  right: 6px;
  top: 50%;
  transform: translateY(-50%);
  width: 34px;
  height: 34px;
  display: grid;
  place-items: center;
  border-radius: var(--radius-sm);
  color: var(--text-subtle);
  font-size: 1.18em;
  transition: color var(--dur-fast) var(--ease-out), background var(--dur-fast) var(--ease-out);
}
.authfield__toggle:hover:not(:disabled) {
  color: var(--text);
  background: var(--surface-2);
}
.authfield__toggle:focus-visible {
  outline: none;
  color: var(--accent);
  box-shadow: 0 0 0 2px var(--accent-ring);
}
.authfield__toggle:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.authfield__msg {
  min-height: 1em;
  font-size: var(--text-xs);
  line-height: 1.2;
  color: var(--error);
}
</style>
