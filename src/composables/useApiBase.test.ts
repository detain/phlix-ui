/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { defineComponent, computed, ref, type ComputedRef } from 'vue';
import { useApiBase, useMediaApiBase, useMediaDirectBase } from './useApiBase';

/**
 * Mount a tiny host that captures the resolved bases, with the given
 * `apiBase`/`mediaApiBase`/`mediaDirectBase` provides. Returns the captured refs so
 * a test can read (and, for a reactive provide, mutate the source then re-read) the
 * values.
 */
function mountWith(provide: Record<string, unknown>): {
  appBase: ComputedRef<string>;
  mediaBase: ComputedRef<string>;
  directBase: ComputedRef<string>;
} {
  const captured = {} as {
    appBase: ComputedRef<string>;
    mediaBase: ComputedRef<string>;
    directBase: ComputedRef<string>;
  };
  const Host = defineComponent({
    setup() {
      captured.appBase = useApiBase();
      captured.mediaBase = useMediaApiBase();
      captured.directBase = useMediaDirectBase();
      return () => null;
    },
  });
  mount(Host, { global: { provide } });
  return captured;
}

describe('useApiBase / useMediaApiBase', () => {
  it('resolves a plain-string apiBase for both bases when no mediaApiBase is provided', () => {
    const { appBase, mediaBase } = mountWith({ apiBase: 'https://server.test' });
    expect(appBase.value).toBe('https://server.test');
    // No mediaApiBase provided → falls back to apiBase (the media-server case).
    expect(mediaBase.value).toBe('https://server.test');
  });

  it('defaults to an empty base when nothing is provided', () => {
    const { appBase, mediaBase } = mountWith({});
    expect(appBase.value).toBe('');
    expect(mediaBase.value).toBe('');
  });

  it('useMediaApiBase prefers an explicit mediaApiBase over apiBase', () => {
    const { appBase, mediaBase } = mountWith({
      apiBase: '',
      mediaApiBase: '/api/v1/servers/srv-1/proxy',
    });
    // The host's own base stays unproxied; only the media base is the proxy.
    expect(appBase.value).toBe('');
    expect(mediaBase.value).toBe('/api/v1/servers/srv-1/proxy');
  });

  it('tracks a reactive (ComputedRef) mediaApiBase — re-points when the source changes', () => {
    const serverId = ref<string | null>(null);
    const mediaApiBase = computed(() =>
      serverId.value ? `/api/v1/servers/${serverId.value}/proxy` : '',
    );
    const { mediaBase } = mountWith({ apiBase: '', mediaApiBase });
    // No server selected → empty (falls back to the empty apiBase).
    expect(mediaBase.value).toBe('');
    serverId.value = 'srv-9';
    expect(mediaBase.value).toBe('/api/v1/servers/srv-9/proxy');
    serverId.value = 'srv-42';
    expect(mediaBase.value).toBe('/api/v1/servers/srv-42/proxy');
  });

  it('resolves a ComputedRef apiBase too', () => {
    const base = computed(() => 'https://hub.test');
    const { appBase, mediaBase } = mountWith({ apiBase: base });
    expect(appBase.value).toBe('https://hub.test');
    expect(mediaBase.value).toBe('https://hub.test');
  });
});

describe('useMediaDirectBase', () => {
  it('returns "" when no mediaDirectBase is provided (media server / no server selected)', () => {
    const { directBase } = mountWith({ apiBase: 'https://server.test' });
    // The direct base never falls back to apiBase — absence means "stream from page origin".
    expect(directBase.value).toBe('');
  });

  it('returns a provided plain-string mediaDirectBase', () => {
    const { directBase } = mountWith({ apiBase: '', mediaDirectBase: 'https://server.test' });
    expect(directBase.value).toBe('https://server.test');
  });

  it('unwraps a provided ComputedRef and tracks its reactive changes', () => {
    const url = ref<string | null>(null);
    const mediaDirectBase = computed(() => url.value ?? '');
    const { directBase } = mountWith({ apiBase: '', mediaDirectBase });
    // No server origin selected → empty.
    expect(directBase.value).toBe('');
    url.value = 'https://server.test';
    expect(directBase.value).toBe('https://server.test');
    url.value = 'https://other.test';
    expect(directBase.value).toBe('https://other.test');
  });
});
