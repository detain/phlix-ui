/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 */

import { describe, it, expect, afterEach } from 'vitest';
import { mount, type VueWrapper } from '@vue/test-utils';
import { defineComponent } from 'vue';
import { useMessages, type UseMessages } from './useMessages';
import type { PhlixAppConfig } from '../app/types';

// Renderless host so `useMessages()` runs inside a real component scope where
// `inject('phlixConfig')` resolves the provided config.
const Host = defineComponent({
  setup(_props, { expose }) {
    const api = useMessages();
    expose({ api });
    return () => null;
  },
});

let wrapper: VueWrapper | null = null;

function mountWith(config: Partial<PhlixAppConfig> | null): UseMessages {
  wrapper = mount(Host, {
    global: { provide: { phlixConfig: config } },
  });
  return (wrapper.vm as unknown as { api: UseMessages }).api;
}

afterEach(() => {
  wrapper?.unmount();
  wrapper = null;
});

describe('useMessages (R6.5c)', () => {
  it('resolves English defaults when no config is provided', () => {
    const { t } = mountWith(null);
    expect(t('player.play')).toBe('Play');
    expect(t('common.retry')).toBe('Retry');
  });

  it('resolves English defaults when config has no messages override', () => {
    const { t } = mountWith({ app: 'server', apiBase: '' });
    expect(t('player.play')).toBe('Play');
  });

  it('applies consumer message overrides from PhlixAppConfig.messages', () => {
    const { t } = mountWith({
      app: 'server',
      apiBase: '',
      messages: { player: { play: 'Reproducir' }, common: { retry: 'Reintentar' } },
    });
    expect(t('player.play')).toBe('Reproducir');
    expect(t('common.retry')).toBe('Reintentar');
    // a non-overridden key in an overridden group still falls back to English
    expect(t('player.pause')).toBe('Pause');
  });

  it('interpolates params through the injected resolver', () => {
    const { t } = mountWith(null);
    expect(t('player.resumeFrom', { time: '12:30' })).toBe('Resume from 12:30?');
  });
});
