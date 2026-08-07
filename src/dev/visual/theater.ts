/**
 * S231 — theater-mode geometry harness.
 *
 * Unlike the other `src/dev/visual/*` harnesses (which mount ONE surface component),
 * this one boots the **real app shell on the real player route**: `PhlixApp` +
 * `buildRoutes()`, so `/app/player/:id` carries its production `meta.fullBleed` and
 * `PhlixApp`'s own `isFullBleed` computed decides whether `shell--flush` lands on the
 * shell. Nothing about the S34 chain is re-implemented here — the harness only supplies
 * offline data and a local video file.
 *
 * It exists because S34's third acceptance criterion ("theater mode fills the viewport")
 * is a LAYOUT claim: `.shell.shell--flush .shell__bar{display:none}` and
 * `.player.is-theater{height:100dvh}` only mean anything once a real engine has
 * cascaded, laid out and painted them. jsdom applies neither an SFC's compiled
 * `<style>` nor `dvh`, so every existing S34 assertion is a regex over source text.
 * `src/test/theater-geometry.browser.test.ts` drives this page in headless chromium
 * and measures `getBoundingClientRect()`.
 *
 * Offline by construction: `fetch` is stubbed before mount and the stream is the
 * committed `sample.mp4` the player harness already uses, so there is no network.
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
import { HERO } from './mock-data';

/** The id the harness plays; the browser test navigates to `/app/player/${MEDIA_ID}`. */
const MEDIA_ID = 'theater-1';

/**
 * The item the stubbed `/api/v1/media/:id` returns. `stream_url` points at the
 * committed offline `sample.mp4` (a real, decodable h.264 file) so `<video>` loads
 * without flipping the player into its transcode notice — which would replace the
 * control bar, and with it the theater toggle.
 */
const ITEM: MediaItem = {
    ...HERO,
    id: MEDIA_ID,
    name: 'Theater Geometry Fixture',
    stream_url: '/src/dev/visual/sample.mp4',
};

/**
 * Offline `fetch`: the by-id detail, an empty list for the up-next queue, and 404 for
 * playback-info (markers are best-effort — `PlayerPage` degrades to no skip buttons).
 * Everything else 404s rather than reaching the network.
 */
function installOfflineFetch(): void {
    window.fetch = ((input: RequestInfo | URL): Promise<Response> => {
        const url = typeof input === 'string' ? input : input instanceof URL ? input.href : input.url;
        const path = url.split('?')[0];
        const json = (body: unknown, status = 200): Promise<Response> =>
            Promise.resolve(
                new Response(JSON.stringify(body), {
                    status,
                    headers: { 'Content-Type': 'application/json' },
                }),
            );
        if (path.endsWith(`/api/v1/media/${MEDIA_ID}`)) return json({ item: ITEM });
        if (path.endsWith('/playback-info')) return json({ error: 'NotFound' }, 404);
        if (path.includes('/api/v1/media')) return json({ items: [], total: 0 });
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
    // Atmosphere off + motion reduced: the film-grain/ambient layers are non-deterministic
    // GPU work and the theater transition would otherwise be mid-flight when we measure.
    prefs.atmosphere = false;
    prefs.reducedMotion = 'on';
    prefs.accent = null;

    const router = createRouter({
        history: createMemoryHistory(),
        // The REAL route table — `/app/player/:id` brings its own `meta: { fullBleed: true }`.
        routes: buildRoutes(CONFIG),
    });
    await router.push(`/app/player/${MEDIA_ID}`);
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
