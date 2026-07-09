/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import AuthField from './AuthField.vue';

describe('AuthField', () => {
  it('associates the label with the input and uses a provided id', () => {
    const w = mount(AuthField, { props: { modelValue: '', label: 'Email', id: 'my-email' } });
    const label = w.get('label');
    const input = w.get('input');
    expect(label.attributes('for')).toBe('my-email');
    expect(input.attributes('id')).toBe('my-email');
    expect(label.text()).toBe('Email');
  });

  it('generates a unique id (and matching label/msg ids) when none is provided', () => {
    const w = mount(AuthField, { props: { modelValue: '', label: 'Name' } });
    const id = w.get('input').attributes('id');
    expect(id).toBeTruthy();
    expect(w.get('label').attributes('for')).toBe(id);
  });

  it('emits update:modelValue on input', async () => {
    const w = mount(AuthField, { props: { modelValue: '', label: 'Email' } });
    await w.get('input').setValue('a@b.c');
    expect(w.emitted('update:modelValue')?.[0]).toEqual(['a@b.c']);
  });

  it('reflects the modelValue into the input', () => {
    const w = mount(AuthField, { props: { modelValue: 'seed', label: 'Email' } });
    expect((w.get('input').element as HTMLInputElement).value).toBe('seed');
  });

  it('renders text/email inputs without a reveal toggle', () => {
    const text = mount(AuthField, { props: { modelValue: '', label: 'A', type: 'text' } });
    expect(text.get('input').attributes('type')).toBe('text');
    expect(text.find('.authfield__toggle').exists()).toBe(false);

    const email = mount(AuthField, { props: { modelValue: '', label: 'B', type: 'email' } });
    expect(email.get('input').attributes('type')).toBe('email');
  });

  it('password fields render a reveal toggle that swaps type + aria state', async () => {
    const w = mount(AuthField, { props: { modelValue: 'secret', label: 'Password', type: 'password' } });
    const input = () => w.get('input');
    const toggle = w.get('.authfield__toggle');
    // hidden by default
    expect(input().attributes('type')).toBe('password');
    expect(toggle.attributes('aria-pressed')).toBe('false');
    expect(toggle.attributes('aria-label')).toBe('Show password');
    // reveal
    await toggle.trigger('click');
    expect(input().attributes('type')).toBe('text');
    expect(toggle.attributes('aria-pressed')).toBe('true');
    expect(toggle.attributes('aria-label')).toBe('Hide password');
    // hide again
    await toggle.trigger('click');
    expect(input().attributes('type')).toBe('password');
    expect(toggle.attributes('aria-pressed')).toBe('false');
  });

  it('the reveal toggle is a real button (type=button) so it never submits a form', () => {
    const w = mount(AuthField, { props: { modelValue: '', label: 'Password', type: 'password' } });
    expect(w.get('.authfield__toggle').attributes('type')).toBe('button');
  });

  it('wires aria-invalid + aria-describedby and shows the message when error is set', () => {
    const w = mount(AuthField, {
      props: { modelValue: '', label: 'Email', error: 'Enter a valid email address.' },
    });
    const input = w.get('input');
    const msg = w.get('.authfield__msg');
    expect(w.classes()).toContain('is-invalid');
    expect(input.attributes('aria-invalid')).toBe('true');
    expect(input.attributes('aria-describedby')).toBe(msg.attributes('id'));
    expect(msg.text()).toBe('Enter a valid email address.');
    expect(msg.attributes('aria-live')).toBe('polite');
  });

  it('drops aria-invalid/describedby and renders an empty message when valid', () => {
    const w = mount(AuthField, { props: { modelValue: '', label: 'Email', error: null } });
    const input = w.get('input');
    expect(w.classes()).not.toContain('is-invalid');
    expect(input.attributes('aria-invalid')).toBeUndefined();
    expect(input.attributes('aria-describedby')).toBeUndefined();
    expect(w.get('.authfield__msg').text()).toBe('');
  });

  it('passes through input attributes (autocomplete, placeholder, required, minlength, inputmode)', () => {
    const w = mount(AuthField, {
      props: {
        modelValue: '',
        label: 'Email',
        type: 'email',
        autocomplete: 'email',
        placeholder: 'you@example.com',
        required: true,
        minlength: 3,
        inputmode: 'email',
        name: 'email',
      },
    });
    const input = w.get('input');
    expect(input.attributes('autocomplete')).toBe('email');
    expect(input.attributes('placeholder')).toBe('you@example.com');
    expect(input.attributes('required')).toBeDefined();
    expect(input.attributes('minlength')).toBe('3');
    expect(input.attributes('inputmode')).toBe('email');
    expect(input.attributes('name')).toBe('email');
  });

  it('disables the input and the reveal toggle when disabled', () => {
    const w = mount(AuthField, {
      props: { modelValue: '', label: 'Password', type: 'password', disabled: true },
    });
    expect(w.get('input').attributes('disabled')).toBeDefined();
    expect(w.get('.authfield__toggle').attributes('disabled')).toBeDefined();
  });

  it('renders no emoji glyphs (icon-only)', () => {
    const w = mount(AuthField, { props: { modelValue: '', label: 'Password', type: 'password' } });
    expect(/[🙈👁🎬▶❚🔊🔇⤢⤓←↑↓]/u.test(w.html())).toBe(false);
  });
});
