<template>
    <AppLayout>
        <template #logo>
            <RouterLink :to="homePath" class="brand">
                <img v-if="branding.logoSrc" :src="branding.logoSrc" :alt="branding.logoAlt ?? wordmark" class="brand-logo" />
                <span class="brand-wordmark">{{ wordmark }}<span class="brand-dot">.</span></span>
                <span v-if="branding.tagline" class="brand-tagline">{{ branding.tagline }}</span>
            </RouterLink>
        </template>

        <template #nav>
            <template v-if="menu.length">
                <component
                    :is="item.href ? 'a' : RouterLink"
                    v-for="item in menu"
                    :key="item.id"
                    :to="item.href ? undefined : item.to"
                    :href="item.href ? safeHref(item.href) : undefined"
                    :target="item.href ? item.target : undefined"
                    :rel="item.href && item.target === '_blank' ? 'noopener noreferrer' : undefined"
                    class="nav-link"
                >
                    <Icon v-if="item.icon" :name="item.icon" class="nav-link-icon" />
                    {{ item.label }}
                </component>
            </template>
            <template v-else>
                <RouterLink :to="homePath" class="nav-link">{{ t('shell.browse') }}</RouterLink>
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
            <UserMenu />
        </template>

        <RouterView />
        <CommandPalette v-if="paletteActivated" />
        <MiniPlayer @expand="onExpandMini" />
    </AppLayout>
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent, inject, ref, watch } from 'vue';
import { RouterLink, RouterView, useRouter } from 'vue-router';
import AppLayout from './AppLayout.vue';
import ThemeToggle from './ThemeToggle.vue';
import UserMenu from './UserMenu.vue';
import Icon from '../components/Icon.vue';
import IconButton from '../components/ui/IconButton.vue';
import MiniPlayer from '../components/MiniPlayer.vue';
import { useTheme } from '../composables/useTheme';
import { useCommandStore } from '../stores/useCommandStore';
import { useAuthStore } from '../stores/useAuthStore';
import { useCommandPaletteHotkey } from '../composables/useCommandPaletteHotkey';
import { usePreconnect, resolveImageOrigin } from '../composables/usePreconnect';
import { useMessages } from '../composables/useMessages';
import type { PhlixAppConfig, MenuItem, BrandingConfig } from './types';

// Reflect the preferences store onto <html> (theme / accent / density / motion).
useTheme();
const commands = useCommandStore();
const router = useRouter();
const { t } = useMessages();

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
const branding = computed<BrandingConfig>(() => config?.branding ?? {});
const wordmark = computed(() => branding.value.wordmark ?? 'Phlix');
// `requiresAdmin` items (e.g. the "Admin" entry) show only for an authenticated
// admin. Best-effort progressive disclosure — the server API still authorizes.
const menu = computed<MenuItem[]>(() =>
    (config?.menu ?? []).filter((item) => !item.requiresAdmin || auth.isAdmin),
);
const homePath = computed(() => config?.routerBase ?? '/app');

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
