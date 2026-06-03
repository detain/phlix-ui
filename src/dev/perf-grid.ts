/**
 * Dev-only perf harness (R6.3) — served by `vite` via perf-grid.html. NOT shipped
 * (`src/dev/**` is excluded from the lib build + coverage). Renders:
 *   1. a `Scrubber` with a fixed position so the compositor fill (`transform:
 *      scaleX()`) can be read in real Chromium, and
 *   2. a 5000-item virtualized `MediaGrid` for the 60fps scroll trace + the
 *      "DOM node count stays flat while scrolling" check.
 *
 * Used with the chrome-devtools MCP performance trace; see
 * `steps/R6-perf-rollout.worklog.md` (R6.3 verification).
 */
import { createApp, h } from 'vue';
import { createPinia } from 'pinia';
import '../assets/fonts/fonts.css';
import '../tokens/index.css';
import MediaGrid from '../components/MediaGrid.vue';
import Scrubber from '../components/player/Scrubber.vue';
import type { MediaItem, MediaType } from '../types/media-item';

const GENRES = ['Drama', 'Sci-Fi', 'Action', 'Comedy', 'Thriller', 'Horror', 'Romance', 'Documentary'];
const RATINGS = ['G', 'PG', 'PG-13', 'R', 'NC-17'] as const;

/** Deterministic 5k mock library — poster_url:null exercises the card path without
 *  network noise so the trace measures windowing/scroll, not image loading. */
function mockItems(n: number): MediaItem[] {
  const out: MediaItem[] = [];
  for (let i = 0; i < n; i++) {
    out.push({
      id: String(i),
      name: `Mock Title ${i}`,
      type: 'movie' as MediaType,
      poster_url: null,
      genres: [GENRES[i % GENRES.length], GENRES[(i + 3) % GENRES.length]],
      year: 1980 + (i % 45),
      rating: RATINGS[i % RATINGS.length],
      runtime: 88 + (i % 72),
      overview: null,
      actors: [],
      director: null,
      created_at: null,
      updated_at: null,
    });
  }
  return out;
}

const items = mockItems(5000);

const App = {
  setup() {
    return () =>
      h('div', { style: 'max-width:1280px;margin:0 auto;padding:24px;' }, [
        h(
          'div',
          {
            id: 'scrubber-probe',
            style: 'padding:28px 24px;background:#0c0a07;border-radius:12px;margin-bottom:32px;',
          },
          [
            h(
              'p',
              { style: 'color:#e7e2d8;font-family:sans-serif;font-size:14px;margin:0 0 16px;' },
              'R6.3 — Scrubber fill should animate via transform: scaleX (composited), not width',
            ),
            h(Scrubber, { position: 50, duration: 200, buffered: 120 }),
          ],
        ),
        h('p', { id: 'grid-count', style: 'color:#9a958a;font-family:sans-serif;font-size:13px;margin:0 0 12px;' }, `5000-item virtualized grid`),
        h(MediaGrid, { items }),
      ]);
  },
};

createApp(App).use(createPinia()).mount('#app');
