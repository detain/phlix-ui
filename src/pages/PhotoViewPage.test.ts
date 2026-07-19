/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mount, flushPromises, type VueWrapper } from '@vue/test-utils';
import { createRouter, createMemoryHistory, type Router } from 'vue-router';
import PhotoViewPage from './PhotoViewPage.vue';
import type { PhotoDetail, PhotoExif, Photo, PhotoAlbum } from '../types/photo';

function jsonResponse(body: unknown): Response {
  return {
    ok: true,
    status: 200,
    headers: { get: () => 'application/json' } as unknown as Headers,
    json: async () => body,
    text: async () => JSON.stringify(body),
  } as unknown as Response;
}

function exif(over: Partial<PhotoExif> = {}): PhotoExif {
  return {
    camera_make: 'Canon',
    camera_model: 'EOS R5',
    lens: 'RF 24-70mm',
    aperture: 'f/2.8',
    iso: 400,
    shutter_speed: '1/250s',
    focal_length: '50mm',
    width: 8192,
    height: 5464,
    orientation: 1,
    orientation_name: 'normal',
    date_taken_unix: 1700000000,
    date_taken_formatted: 'March 15, 2024',
    date_taken_year: '2024',
    date_taken_month: '03',
    gps_lat: 37.77,
    gps_lng: -122.41,
    gps_alt: 10,
    gps_display: '37.77, -122.41',
    ...over,
  };
}

function photoDetail(over: Partial<PhotoDetail> = {}): PhotoDetail {
  const ex = over.exif ?? exif();
  return {
    id: 'p2',
    name: 'sunset.jpg',
    path: '/sunset.jpg',
    metadata: ex,
    exif: ex,
    thumbnail_url: 'thumb.jpg',
    full_url: 'https://cdn.example/full.jpg?sig=abc',
    ...over,
  };
}

function albumPhoto(id: string): Photo {
  return { id, name: `${id}.jpg`, path: `/${id}.jpg`, thumbnail_url: 't.jpg', full_url: 'f.jpg' };
}

function albumWith(ids: string[]): PhotoAlbum {
  return {
    id: 'alb1',
    date: '2024-03-15',
    photo_count: ids.length,
    photos: ids.map(albumPhoto),
  };
}

function stubFetch(opts: { photo?: PhotoDetail; album?: PhotoAlbum; error?: boolean } = {}) {
  const fn = vi.fn((url: unknown) => {
    const u = typeof url === 'string' ? url : '';
    if (u.includes('/api/v1/photo/photos/')) {
      if (opts.error) return Promise.reject(new Error('photo down'));
      return Promise.resolve(jsonResponse({ photo: opts.photo ?? photoDetail() }));
    }
    if (u.includes('/api/v1/photo/albums/')) {
      return Promise.resolve(jsonResponse({ album: opts.album ?? albumWith(['p1', 'p2', 'p3']) }));
    }
    return Promise.reject(new Error(`Unexpected fetch URL: ${u}`));
  });
  vi.stubGlobal('fetch', fn);
  return fn;
}

const stub = { template: '<div />' };
function makeRouter(): Router {
  return createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/app/photo/albums', name: 'photo-albums', component: stub },
      { path: '/app/photo/album/:id', name: 'photo-album', component: stub },
      { path: '/app/photo/photo/:id', name: 'photo-view', component: stub },
    ],
  });
}

async function mountPage(
  router: Router,
  id = 'p2',
  query: Record<string, string> = { library_id: 'lib1', album_id: 'alb1' },
): Promise<VueWrapper> {
  await router.push({ path: `/app/photo/photo/${id}`, query });
  await router.isReady();
  return mount(PhotoViewPage, {
    props: { id },
    global: {
      plugins: [router],
      provide: { apiBase: '' },
      stubs: { Icon: { props: ['name'], template: '<span class="icon" :data-icon="name" />' } },
    },
  });
}

beforeEach(() => localStorage.clear());
afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe('PhotoViewPage', () => {
  it('loads the photo and renders the full image', async () => {
    stubFetch();
    const w = await mountPage(makeRouter());
    await flushPromises();
    const img = w.find('.image-wrapper img');
    expect(img.exists()).toBe(true);
    expect(img.attributes('src')).toBe('https://cdn.example/full.jpg?sig=abc');
    w.unmount();
  });

  it('renders the EXIF camera-info fields the component surfaces', async () => {
    stubFetch();
    const w = await mountPage(makeRouter());
    await flushPromises();

    const lines = w.findAll('.exif-list li').map((li) => li.text());
    // formatExifSummary order: camera, lens, dimensions, aperture, ISO, shutter, focal, date, GPS.
    expect(lines).toContain('Canon EOS R5');
    expect(lines).toContain('RF 24-70mm');
    expect(lines).toContain('8192×5464');
    expect(lines).toContain('f/2.8');
    expect(lines).toContain('ISO 400');
    expect(lines).toContain('1/250s');
    expect(lines).toContain('50mm');
    expect(lines).toContain('March 15, 2024');
    expect(lines).toContain('37.77, -122.41');

    // File-info sidebar shows resolution from the dedicated width/height fields.
    expect(w.find('.metadata-list').text()).toContain('8192 × 5464');
    w.unmount();
  });

  it('exposes a Download Full Size link pointing at the signed full_url', async () => {
    stubFetch();
    const w = await mountPage(makeRouter());
    await flushPromises();
    const link = w.find('a.download-link');
    expect(link.exists()).toBe(true);
    expect(link.attributes('href')).toBe('https://cdn.example/full.jpg?sig=abc');
    expect(link.attributes('download')).toBeDefined();
    w.unmount();
  });

  it('renders prev/next nav for a middle photo and replaces route on click', async () => {
    // Current photo p2 sits between p1 and p3 in the album → both arrows show.
    stubFetch({ photo: photoDetail({ id: 'p2' }), album: albumWith(['p1', 'p2', 'p3']) });
    const router = makeRouter();
    const replace = vi.spyOn(router, 'replace');
    const w = await mountPage(router);
    await flushPromises();

    expect(w.find('.nav-prev').exists()).toBe(true);
    expect(w.find('.nav-next').exists()).toBe(true);
    expect(w.find('.nav-info').text()).toContain('Photo 2 of 3');

    await w.find('.nav-next').trigger('click');
    expect(replace).toHaveBeenCalledWith(
      expect.objectContaining({ path: '/app/photo/photo/p3' }),
    );

    await w.find('.nav-prev').trigger('click');
    expect(replace).toHaveBeenCalledWith(
      expect.objectContaining({ path: '/app/photo/photo/p1' }),
    );
    w.unmount();
  });

  it('toggles zoom when the toggle-zoom button is clicked', async () => {
    stubFetch();
    const w = await mountPage(makeRouter());
    await flushPromises();
    expect(w.find('.image-container').classes()).not.toContain('zoomed');
    // First header-actions button is the zoom toggle.
    await w.find('.header-actions button').trigger('click');
    expect(w.find('.image-container').classes()).toContain('zoomed');
    w.unmount();
  });

  it('shows the error state when the photo fails to load', async () => {
    stubFetch({ error: true });
    const w = await mountPage(makeRouter());
    await flushPromises();
    expect(w.text()).toContain('photo down');
    w.unmount();
  });
});
