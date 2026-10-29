/**
 * `HelpText` — reference-link rendering, including the M-UI-11 sink law:
 * `links[].url` arrives from the server settings-schema wire (`helpLinks`)
 * and must never land raw in an anchor href.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import HelpText from './HelpText.vue';

describe('HelpText', () => {
  it('renders escaped plain text (literal markup stays text)', () => {
    const w = mount(HelpText, { props: { text: 'Use <strong>Scan</strong> to add files.' } });
    expect(w.find('.phlix-help-text__paragraph').text()).toBe('Use <strong>Scan</strong> to add files.');
    expect(w.find('.phlix-help-text__paragraph strong').exists()).toBe(false);
  });

  it('renders benign links with their URL intact', () => {
    const w = mount(HelpText, {
      props: { text: 'Docs', links: [{ text: 'Learn more', url: 'https://docs.phlix.example/x' }] },
    });
    const link = w.find('.phlix-help-text__link');
    expect(link.attributes('href')).toBe('https://docs.phlix.example/x');
    expect(link.attributes('rel')).toContain('noopener');
  });

  it('drops the href when a wire-supplied link url is a javascript: URL', () => {
    const w = mount(HelpText, {
      props: {
        text: 'Help',
        links: [
          { text: 'Docs', url: 'https://docs.phlix.example/x' },
          { text: 'Evil', url: 'javascript:alert(document.cookie)' },
        ],
      },
    });
    const links = w.findAll('.phlix-help-text__link');
    expect(links).toHaveLength(2);
    expect(links[0].attributes('href')).toBe('https://docs.phlix.example/x');
    // inert: the anchor still renders (label stays honest) but carries no destination
    expect(links[1].attributes('href')).toBeUndefined();
  });

  it('defeats control-char-obfuscated script schemes in link urls (L6)', () => {
    const w = mount(HelpText, {
      props: { text: 'Help', links: [{ text: 'Evil', url: 'java\tscript:alert(1)' }] },
    });
    expect(w.find('.phlix-help-text__link').attributes('href')).toBeUndefined();
  });

  it('drops the href for data: link urls', () => {
    const w = mount(HelpText, {
      props: { text: 'Help', links: [{ text: 'Evil', url: 'data:text/html,<script>alert(1)</script>' }] },
    });
    expect(w.find('.phlix-help-text__link').attributes('href')).toBeUndefined();
  });
});
