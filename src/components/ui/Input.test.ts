/**
 * ui__webux M19 — Input's missing accessible error channel.
 *
 * The form primitive renders a label but never a validation message, and sets
 * no aria-invalid/aria-describedby, so an invalid field announces nothing.
 * These pins establish the channel (the same one AuthField already ships).
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import Input from './Input.vue';

beforeEach(() => setActivePinia(createPinia()));
afterEach(() => document.body.innerHTML = '');

describe('Input — accessible error channel (ui__webux M19)', () => {
  it('renders no error state when `error` is absent', () => {
    const w = mount(Input, { props: { modelValue: 'hello' } });
    const input = w.get('input');
    expect(input.attributes('aria-invalid')).toBeUndefined();
    expect(input.attributes('aria-describedby')).toBeUndefined();
    const msg = w.find('.phlix-input__error');
    // The message node either is absent or is an empty aria-live region — but
    // describedby must not point at it when there is no error.
    expect(input.attributes('aria-describedby')).toBeUndefined();
    expect(msg.exists() ? msg.text() : '').toBe('');
    w.unmount();
  });

  it('sets aria-invalid=true and wires aria-describedby to the message when `error` is set', () => {
    const w = mount(Input, { props: { modelValue: '', error: 'A name is required.' } });
    const input = w.get('input');
    expect(input.attributes('aria-invalid')).toBe('true');
    const describedBy = input.attributes('aria-describedby');
    expect(describedBy).toBeTruthy();
    const msg = w.get(`#${describedBy}`);
    expect(msg.text()).toBe('A name is required.');
    w.unmount();
  });

  it('the error message is announced (aria-live) and visible', () => {
    const w = mount(Input, { props: { modelValue: '', error: 'Enter a number from 1 to 10.' } });
    const msg = w.get('.phlix-input__error');
    expect(msg.attributes('aria-live')).toBe('polite');
    expect(msg.text()).toBe('Enter a number from 1 to 10.');
    w.unmount();
  });

  it('clearing `error` drops the invalid state and the description link', async () => {
    const w = mount(Input, { props: { modelValue: 'x', error: 'Bad.' } });
    expect(w.get('input').attributes('aria-invalid')).toBe('true');
    await w.setProps({ error: null });
    expect(w.get('input').attributes('aria-invalid')).toBeUndefined();
    expect(w.get('input').attributes('aria-describedby')).toBeUndefined();
    w.unmount();
  });
});

describe('Input — number clearing keeps "no value" (ui__webux UI-m23)', () => {
  it('emits the empty string — not 0 — when a number field is cleared', async () => {
    const w = mount(Input, { props: { modelValue: 5, type: 'number' } });
    await w.get('input').setValue('');
    const emitted = w.emitted('update:modelValue')!;
    expect(emitted[emitted.length - 1]).toEqual(['']);
    w.unmount();
  });

  it('still emits a NUMBER for typed number values (coercion law held)', async () => {
    const w = mount(Input, { props: { modelValue: 5, type: 'number', min: 1 } });
    await w.get('input').setValue('42');
    const emitted = w.emitted('update:modelValue')!;
    expect(emitted[emitted.length - 1]).toEqual([42]);
    w.unmount();
  });

  it('text fields pass the raw string through unchanged', async () => {
    const w = mount(Input, { props: { modelValue: '', type: 'text' } });
    await w.get('input').setValue('');
    const emitted = w.emitted('update:modelValue')!;
    expect(emitted[emitted.length - 1]).toEqual(['']);
    w.unmount();
  });
});
