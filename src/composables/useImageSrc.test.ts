/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { defineComponent, computed, ref, h, nextTick } from 'vue';
import { useImageSrc } from './useImageSrc';

/**
 * S241 — the composable seam, asserted through RENDERED MARKUP.
 *
 * Every expectation reads the `src`/`srcset` attribute the browser would fetch,
 * so a no-op `imgSrc` (`(u) => u`) fails these rather than passing them.
 */

const RELAY = 'https://hub.example/api/v1/servers/srv-7/proxy';
const SIGNED = '/api/v1/artwork/abc-123?size=w500&exp=1785000000&sig=deadbeefcafe';
const CDN = 'https://image.tmdb.org/t/p/w500/aBcDeF.jpg';

/** A one-image host that binds a URL through the seam, exactly as a real card does. */
const ImgHost = defineComponent({
  props: { url: { type: String, default: null } },
  setup(props) {
    const { imgSrc } = useImageSrc();
    return () => h('img', { src: imgSrc(props.url) });
  },
});

describe('useImageSrc — the resolved src on the hub', () => {
  it('resolves a signed poster path against the relay-proxy base', () => {
    const w = mount(ImgHost, {
      props: { url: SIGNED },
      global: { provide: { apiBase: 'https://hub.example', mediaApiBase: RELAY } },
    });
    expect(w.get('img').attributes('src')).toBe(`${RELAY}${SIGNED}`);
  });

  it('resolves an avatar path against the relay-proxy base', () => {
    const w = mount(ImgHost, {
      props: { url: '/api/v1/users/u-1/avatar' },
      global: { provide: { apiBase: 'https://hub.example', mediaApiBase: RELAY } },
    });
    expect(w.get('img').attributes('src')).toBe(`${RELAY}/api/v1/users/u-1/avatar`);
  });

  it('THE CONTROL: an absolute CDN poster renders byte-identical', () => {
    const w = mount(ImgHost, {
      props: { url: CDN },
      global: { provide: { apiBase: 'https://hub.example', mediaApiBase: RELAY } },
    });
    expect(w.get('img').attributes('src')).toBe(CDN);
  });
});

describe('useImageSrc — the media server is untouched', () => {
  it('renders a root-relative path verbatim when only an empty apiBase is provided', () => {
    const w = mount(ImgHost, {
      props: { url: SIGNED },
      global: { provide: { apiBase: '' } },
    });
    expect(w.get('img').attributes('src')).toBe(SIGNED);
  });

  it('renders a root-relative path verbatim with NO provides at all', () => {
    const w = mount(ImgHost, { props: { url: SIGNED } });
    expect(w.get('img').attributes('src')).toBe(SIGNED);
  });
});

describe('useImageSrc — reactivity to the selected server', () => {
  it('re-renders every poster against the NEW base when the selection changes', async () => {
    const serverId = ref('srv-1');
    const mediaApiBase = computed(() => `https://hub.example/api/v1/servers/${serverId.value}/proxy`);
    const w = mount(ImgHost, {
      props: { url: SIGNED },
      global: { provide: { apiBase: 'https://hub.example', mediaApiBase } },
    });
    expect(w.get('img').attributes('src')).toBe(
      `https://hub.example/api/v1/servers/srv-1/proxy${SIGNED}`,
    );
    serverId.value = 'srv-2';
    await nextTick();
    expect(w.get('img').attributes('src')).toBe(
      `https://hub.example/api/v1/servers/srv-2/proxy${SIGNED}`,
    );
  });
});

describe('useImageSrc — srcset', () => {
  const SrcsetHost = defineComponent({
    props: { srcset: { type: String, default: null } },
    setup(props) {
      const { imgSrcset } = useImageSrc();
      return () => h('img', { srcset: imgSrcset(props.srcset) });
    },
  });

  it('resolves each candidate and leaves an absolute one alone', () => {
    const w = mount(SrcsetHost, {
      props: { srcset: `/api/v1/artwork/x?size=w200 200w, ${CDN} 500w` },
      global: { provide: { mediaApiBase: RELAY } },
    });
    expect(w.get('img').attributes('srcset')).toBe(
      `${RELAY}/api/v1/artwork/x?size=w200 200w, ${CDN} 500w`,
    );
  });
});
