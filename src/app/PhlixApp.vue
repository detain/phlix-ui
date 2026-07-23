<!--
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
-->

<template>
    <AppLayout :class="{ 'shell--flush': isFullBleed }">
        <template #logo>
            <RouterLink :to="homePath" class="brand">
                <img v-if="branding.logoSrc" :src="branding.logoSrc" :alt="branding.logoAlt ?? wordmark" class="brand-logo" />
                <span class="brand-wordmark">{{ wordmark }}<span class="brand-dot">.</span></span>
                <span v-if="branding.tagline" class="brand-tagline">{{ branding.tagline }}</span>
            </RouterLink>
        </template>

        <template #nav>
            <template v-if="menu.length">
                <template v-for="item in menu" :key="item.id">
                    <component
                        :is="item.href ? 'a' : RouterLink"
                        :to="item.href ? undefined : item.to"
                        :href="item.href ? safeHref(item.href) : undefined"
                        :target="item.href ? item.target : undefined"
                        :rel="item.href && item.target === '_blank' ? 'noopener noreferrer' : undefined"
                        class="nav-link"
                    >
                        <Icon v-if="item.icon" :name="item.icon" class="nav-link-icon" />
                        {{ item.label }}
                    </component>
                    <!-- Expand a `libraryLinks` item into one link per library
                         (the media server's "Browse"); the hub never sets it. -->
                    <RouterLink
                        v-for="lib in (item.libraryLinks ? libraries.items : [])"
                        :key="`${item.id}-${lib.id}`"
                        :to="{ name: 'library', params: { id: lib.id } }"
                        class="nav-link nav-link--sub"
                    >
                        {{ lib.name }}
                    </RouterLink>
                </template>
            </template>
            <template v-else>
                <RouterLink :to="homePath" class="nav-link">{{ t('shell.browse') }}</RouterLink>
                <RouterLink :to="`${homePath}/recommendations`" class="nav-link">{{ t('shell.recommendations') }}</RouterLink>
                <RouterLink :to="`${homePath}/explore`" class="nav-link">{{ t('shell.explore') }}</RouterLink>
                <RouterLink :to="`${homePath}/syncplay`" class="nav-link">{{ t('syncplay.syncPlay') }}</RouterLink>
                <RouterLink :to="`${homePath}/music`" class="nav-link">{{ t('music.nav') }}</RouterLink>
                <RouterLink :to="`${homePath}/settings`" class="nav-link">{{ t('shell.settings') }}</RouterLink>
            </template>
        </template>

        <template #actions>
            <IconButton
                name="search"
                :label="t('shell.openCommandPalette')"
                variant="ghost"
                @click="commands.openPalette()"
            />
            <ThemeToggle />
            <NetworkHealthIndicator v-if="auth.isAdmin" />
            <UserMenu />
        </template>

        <RouterView />
        <CommandPalette v-if="paletteActivated" />
        <MiniPlayer v-if="auth.isLoggedIn" @expand="onExpandMini" />
    </AppLayout>
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent, inject, provide, ref, watch } from 'vue';
import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router';
import AppLayout from './AppLayout.vue';
import ThemeToggle from './ThemeToggle.vue';
import UserMenu from './UserMenu.vue';
import Icon from '../components/Icon.vue';
import IconButton from '../components/ui/IconButton.vue';
import MiniPlayer from '../components/MiniPlayer.vue';
import NetworkHealthIndicator from '../components/NetworkHealthIndicator.vue';
import { useTheme } from '../composables/useTheme';
import { useCommandStore } from '../stores/useCommandStore';
import { useAuthStore } from '../stores/useAuthStore';
import { useLibrariesStore } from '../stores/useLibrariesStore';
import { useCommandPaletteHotkey } from '../composables/useCommandPaletteHotkey';
import { usePreconnect, resolveImageOrigin } from '../composables/usePreconnect';
import { useResumeSync } from '../composables/useResumeSync';
import { useResumeReporter } from '../composables/useResumeReporter';
import { useMessages } from '../composables/useMessages';
import type { PhlixAppConfig, MenuItem, BrandingConfig } from './types';

// Reflect the preferences store onto <html> (theme / accent / density / motion).
useTheme();
const commands = useCommandStore();
const router = useRouter();
const route = useRoute();
const { t } = useMessages();

// Full-bleed shell (S34): a route may opt out of the chrome via `meta.fullBleed`
// (the player route does). When active, AppLayout renders `.shell--flush` — the
// sticky header is hidden and the main padding zeroed — so the in-window player
// owns the whole viewport. Every other route leaves the class off, so the normal
// shell is byte-identical. MiniPlayer/CommandPalette are fixed-position overlays,
// so the flush layout never hides or shifts them.
const isFullBleed = computed(() => route.meta?.fullBleed === true);

// Always-on ⌘K hotkey (stays in the main bundle); the palette UI is lazy below.
useCommandPaletteHotkey();

// The command palette is a lazy chunk (R6.1b): fetch + mount it only once it has
// been opened at least once — via the ⌘K hotkey, the actions-cluster button, or any
// programmatic open. `commands.open` is the single source of truth for "is the
// palette open", so watching it covers every open path. Once activated it stays
// mounted, so command registration + recents persist across subsequent opens
// (matching the pre-lazy always-mounted behavior).
const CommandPalette = defineAsyncComponent(() => import('../components/CommandPalette.vue'));
const paletteActivated = ref(false);
watch(
  () => commands.open,
  (open) => {
    if (open) paletteActivated.value = true;
  },
);

/** Expanding the persistent mini-player navigates to the full player route. */
function onExpandMini(id: string): void {
  void router.push(`${homePath.value}/player/${id}`);
}

// Branding, menu and home path all come from config — never `if (app === 'hub')`.
const config = inject<PhlixAppConfig | null>('phlixConfig', null);

// Warm the poster image origin's connection early (R6.2c) when posters are served
// cross-origin (a CDN/image-proxy via `config.imageOrigin`, or an absolute `apiBase`
// host). A same-origin host resolves to `null` → no-op. Posters are plain `<img src>`
// (no-cors), so no `crossOrigin` — a CORS preconnect wouldn't be reused. Cleaned up
// with the shell's scope.
usePreconnect(
  resolveImageOrigin({
    imageOrigin: config?.imageOrigin ?? null,
    apiBase: config?.apiBase ?? null,
    documentOrigin: typeof window !== 'undefined' ? window.location.origin : null,
  }),
);

const auth = useAuthStore();

// Cross-device resume: once authenticated, pull the user's server-side resume
// positions and merge them into the local map (best-effort), so a title paused on
// another device offers to resume here. `immediate` covers an already-signed-in
// load; the watch re-runs it on a later login. Gated by the `resumeSync` feature
// (default: on for the media server, off for the hub) — the continue-watching
// endpoint is a media-server surface, so firing it on the hub only 404s.
const resumeSyncEnabled = config?.features?.resumeSync ?? (config?.app !== 'hub');
const { syncResume } = useResumeSync();
watch(
    () => auth.isLoggedIn,
    (loggedIn) => { if (loggedIn && resumeSyncEnabled) void syncResume(); },
    { immediate: true },
);

// Write path: report THIS device's playback position back to the server (throttled,
// best-effort) so resume syncs cross-device. Mounted once here — it watches the
// shared player store, covering both the full player and the mini-player. Provided
// to descendants (the Player) so end-of-playback can call `finish()` on the SAME
// instance — reusing its live session id instead of spawning a second reporter.
provide('resumeReporter', useResumeReporter());

const branding = computed<BrandingConfig>(() => config?.branding ?? {});
const wordmark = computed(() => branding.value.wordmark ?? 'Phlix');

// Shared library cache — read by the nav (dynamic `libraryLinks` and the
// `requiresLibraryType` filter below) and the Browse page. Instantiated ahead of
// the `menu` computed so the filter can consult it.
const libraries = useLibrariesStore();

/** A `requiresLibraryType` menu item is shown only once the library list has
 *  RESOLVED (fail-closed: hidden while still loading / on load failure, so it
 *  never flashes then hides) and contains at least one library whose `type`
 *  matches the required type — a single value, or ANY of an array. */
function hasMatchingLibrary(required: NonNullable<MenuItem['requiresLibraryType']>): boolean {
    if (!libraries.loaded) return false;
    const wanted = Array.isArray(required) ? required : [required];
    return libraries.items.some((lib) => wanted.includes(lib.type));
}

// `requiresAdmin` items (e.g. the "Admin" entry) show only for an authenticated
// admin; `requiresLibraryType` items (Books/Audiobooks/Photos/Music) show only
// when a library of that kind exists. Best-effort progressive disclosure — the
// server API still authorizes.
const menu = computed<MenuItem[]>(() =>
    (config?.menu ?? []).filter(
        (item) =>
            (!item.requiresAdmin || auth.isAdmin) &&
            (!item.requiresLibraryType || hasMatchingLibrary(item.requiresLibraryType)),
    ),
);
const homePath = computed(() => config?.home ?? config?.routerBase ?? '/app');

// Load the library list once authenticated whenever the nav needs it — to expand
// a `libraryLinks` item into per-library links, OR to evaluate a
// `requiresLibraryType` filter (the raw config menu is consulted, not the filtered
// `menu`, so a `requiresLibraryType` entry — hidden until the list loads — still
// triggers the load that reveals it, avoiding a chicken-and-egg deadlock). The
// store dedupes/caches, so this shares the Browse page's fetch and never
// double-loads. The hub sets neither, so it never hits the server-only
// `/api/v1/libraries` (which 404s there).
const needsLibraries = computed(() =>
    (config?.menu ?? []).some((item) => item.libraryLinks || item.requiresLibraryType),
);
watch(
    () => auth.isLoggedIn && needsLibraries.value,
    (ready) => {
        if (ready) void libraries.load(config?.apiBase ?? '');
    },
    { immediate: true },
);

/** Drop script-y URL schemes from config-supplied external menu links. Allows
 *  http(s)/mailto/tel/relative/hash; blocks javascript:/data:/vbscript:. */
function safeHref(href: string): string | undefined {
    return /^\s*(javascript|data|vbscript):/i.test(href) ? undefined : href;
}
</script>

<style scoped>
.brand {
    display: inline-flex;
    align-items: baseline;
    gap: var(--space-2);
    text-decoration: none;
}
.brand-logo {
    height: 1.5rem;
    width: auto;
    align-self: center;
}
.brand-wordmark {
    font-family: var(--font-display);
    font-size: var(--text-xl);
    font-weight: var(--fw-bold, 700);
    letter-spacing: var(--tracking-tight);
    color: var(--text);
}
.brand-dot {
    color: var(--accent-text);
}
.brand-tagline {
    font-size: var(--text-xs);
    color: var(--text-muted);
}

.nav-link {
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    padding: var(--space-2) var(--space-3);
    border-radius: var(--radius-md);
    color: var(--text-muted);
    font-size: var(--text-sm);
    font-weight: var(--fw-medium, 500);
    text-decoration: none;
    transition: color var(--dur-fast) var(--ease-out), background var(--dur-fast) var(--ease-out);
}
.nav-link-icon {
    font-size: var(--text-md);
}
/* Library links expanded under a `libraryLinks` nav item. In the vertical drawer
   they read as an indented sub-list; on the horizontal bar they sit as smaller,
   muted peers after their parent. */
.nav-link--sub {
    font-size: var(--text-xs);
    color: var(--text-subtle);
}
.shell__drawer .nav-link--sub {
    padding-left: var(--space-6);
}
.nav-link:hover {
    color: var(--text);
    background: var(--surface-2);
}
.nav-link.router-link-active {
    color: var(--text);
}
/* amber "now-showing" active underline */
.nav-link.router-link-active::after {
    content: '';
    position: absolute;
    left: var(--space-3);
    right: var(--space-3);
    bottom: 2px;
    height: 2px;
    border-radius: var(--radius-full);
    background: var(--accent);
}
.nav-link:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px var(--accent-ring);
}
@media (prefers-reduced-motion: reduce) {
    .nav-link {
        transition: none;
    }
}
</style>
