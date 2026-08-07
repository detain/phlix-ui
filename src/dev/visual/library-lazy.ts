/**
 * S223 — the poster-loading measurement harness.
 *
 * S35 shipped `:lazy="false"` (i.e. DROP the native `loading="lazy"` attribute) on
 * every MediaGrid-hosted card, on the plan's guess that native lazy-load layered over
 * transform-repositioned virtual cells stalls. Its acceptance criterion demanded a
 * LIVE-BROWSER Network/Performance repro before that shipped; only a jsdom/vitest
 * repro was ever recorded, and jsdom ignores the `loading` attribute entirely — so the
 * one claim the change rests on has never been observed.
 *
 * This harness renders the REAL `LibraryPage` (real router, real `useMediaStore`, real
 * virtualized `MediaGrid`) against a stubbed catalogue whose posters are DISTINCT URLs
 * served by the dev server, so every poster is its own network request and a scroll
 * past the first screenful is directly countable on the Network timeline.
 *
 * Drive it with `measure-poster-loading.mjs` (same directory) — see the S223 worklog
 * for the capture procedure and MediaCard.vue's `lazy` prop docblock for the numbers.
 * `?view=grid|list|backdrop|table` picks which of LibraryPage's four `#card`
 * renderers is under measurement.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createRouter, createMemoryHistory } from 'vue-router';
import '../../assets/fonts/fonts.css';
import '@phlix/tokens/style.css';
import PhlixApp from '../../app/PhlixApp.vue';
import { buildRoutes } from '../../app/createPhlixApp';
import { usePreferencesStore } from '../../stores/usePreferencesStore';
import type { PhlixAppConfig } from '../../app/types';
import type { MediaItem } from '../../types/media-item';

const LIBRARY_ID = 'lib-1';
/** Big enough that a scroll past ~24 posters still leaves plenty un-rendered. */
const CATALOGUE_SIZE = 400;

/** One synthetic item; `poster_url` is unique per index so each is its own request. */
function itemAt(i: number): MediaItem {
    return {
        id: `it-${i}`,
        name: `Title ${i}`,
        type: 'movie',
        // A committed SVG plus a per-item query string: same bytes, distinct URL,
        // therefore distinct cache entry and distinct network request.
        poster_url: `/src/dev/visual/poster.svg?i=${i}`,
        backdrop_url: `/src/dev/visual/poster.svg?bd=${i}`,
        genres: ['Drama'],
        year: 2000 + (i % 25),
        rating: 'PG-13',
        runtime: 100,
        overview: null,
        actors: [],
        director: null,
        external_ids: null,
        production_companies: [],
        created_at: null,
        updated_at: null,
    } as unknown as MediaItem;
}

const CATALOGUE: MediaItem[] = Array.from({ length: CATALOGUE_SIZE }, (_, i) => itemAt(i));

/** Offline API: the library list plus a paged `/api/v1/media` slice. */
function installOfflineFetch(): void {
    window.fetch = ((input: RequestInfo | URL): Promise<Response> => {
        const url = typeof input === 'string' ? input : input instanceof URL ? input.href : input.url;
        const parsed = new URL(url, window.location.origin);
        const json = (body: unknown, status = 200): Promise<Response> =>
            Promise.resolve(
                new Response(JSON.stringify(body), {
                    status,
                    headers: { 'Content-Type': 'application/json' },
                }),
            );
        if (parsed.pathname.endsWith('/api/v1/libraries')) {
            return json({ libraries: [{ id: LIBRARY_ID, name: 'Perf Library', type: 'movies', item_count: CATALOGUE_SIZE }] });
        }
        if (parsed.pathname.endsWith('/api/v1/media')) {
            const limit = Number(parsed.searchParams.get('limit') ?? '60');
            const offset = Number(parsed.searchParams.get('offset') ?? '0');
            return json({ items: CATALOGUE.slice(offset, offset + limit), total: CATALOGUE_SIZE });
        }
        return json({ error: 'NotFound' }, 404);
    }) as typeof fetch;
}

const CONFIG: PhlixAppConfig = {
    app: 'server',
    apiBase: '',
    routerBase: '/app',
    defaultTheme: 'nocturne',
    branding: { wordmark: 'Phlix' },
    menu: [],
};

async function boot(): Promise<void> {
    installOfflineFetch();

    const pinia = createPinia();
    const prefs = usePreferencesStore(pinia);
    prefs.theme = 'nocturne';
    prefs.density = 'comfortable';
    prefs.atmosphere = false;
    prefs.reducedMotion = 'on';
    prefs.accent = null;
    // `?view=grid|list|backdrop|table` selects which of LibraryPage's four `#card`
    // renderers is measured — all four were given `:lazy="false"` on the same S35
    // rationale, so all four have to be measured rather than extrapolated to.
    const view = new URLSearchParams(window.location.search).get('view');
    if (view === 'list' || view === 'backdrop' || view === 'table' || view === 'grid') {
        prefs.viewMode = view;
    }

    const router = createRouter({
        history: createMemoryHistory(),
        routes: buildRoutes(CONFIG),
    });
    await router.push(`/app/library/${LIBRARY_ID}`);
    await router.isReady();

    const app = createApp(PhlixApp);
    app.use(pinia);
    app.use(router);
    app.provide('apiBase', '');
    app.provide('phlixConfig', CONFIG);
    app.provide('phlixCommands', []);
    app.mount('#app');
}

void boot();
