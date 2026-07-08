/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 */

import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import AuthCard from './AuthCard.vue';
import type { PhlixAppConfig } from '../../app/types';

function mountCard(opts: { config?: Partial<PhlixAppConfig> | null; props?: Record<string, unknown>; slots?: Record<string, string> } = {}) {
  return mount(AuthCard, {
    props: { title: 'Welcome back', ...opts.props },
    slots: { default: '<form class="probe">body</form>', ...opts.slots },
    global: { provide: { phlixConfig: opts.config ?? null } },
  });
}

describe('AuthCard', () => {
  it('renders the title + default slot', () => {
    const w = mountCard();
    expect(w.get('.authcard__title').text()).toBe('Welcome back');
    expect(w.find('.probe').exists()).toBe(true);
  });

  it('defaults the wordmark to "Phlix" with no config', () => {
    const w = mountCard();
    expect(w.get('.authcard__wordmark').text()).toContain('Phlix');
  });

  it('renders the wordmark from config branding', () => {
    const w = mountCard({ config: { branding: { wordmark: 'Phlix Hub' } } });
    expect(w.get('.authcard__wordmark').text()).toContain('Phlix Hub');
  });

  it('renders a branding logo with alt text (logoAlt, falling back to the wordmark)', () => {
    const withAlt = mountCard({ config: { branding: { logoSrc: '/logo.svg', logoAlt: 'Acme' } } });
    const img = withAlt.get('img.authcard__logo');
    expect(img.attributes('src')).toBe('/logo.svg');
    expect(img.attributes('alt')).toBe('Acme');

    const noAlt = mountCard({ config: { branding: { wordmark: 'Brand', logoSrc: '/l.svg' } } });
    expect(noAlt.get('img.authcard__logo').attributes('alt')).toBe('Brand');
  });

  it('omits the logo img when no logoSrc is configured', () => {
    const w = mountCard({ config: { branding: { wordmark: 'X' } } });
    expect(w.find('img.authcard__logo').exists()).toBe(false);
  });

  it('renders the eyebrow + subtitle only when provided', () => {
    const without = mountCard();
    expect(without.find('.authcard__eyebrow').exists()).toBe(false);
    expect(without.find('.authcard__sub').exists()).toBe(false);

    const withProps = mountCard({ props: { eyebrow: 'Member access', subtitle: 'Sign in.' } });
    expect(withProps.get('.authcard__eyebrow').text()).toBe('Member access');
    expect(withProps.get('.authcard__sub').text()).toBe('Sign in.');
  });

  it('renders the footer slot only when provided', () => {
    const without = mountCard();
    expect(without.find('.authcard__foot').exists()).toBe(false);

    const withFoot = mountCard({ slots: { footer: '<a class="x">Sign up</a>' } });
    expect(withFoot.get('.authcard__foot .x').text()).toBe('Sign up');
  });

  it('renders no emoji glyphs (icon-only)', () => {
    const w = mountCard({ props: { eyebrow: 'E', subtitle: 'S' }, config: { branding: { wordmark: 'Phlix' } } });
    expect(/[🙈👁🎬▶❚🔊🔇🎟️🎭]/u.test(w.html())).toBe(false);
  });
});
