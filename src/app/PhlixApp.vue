<template>
    <AppLayout>
        <template #logo>
            <RouterLink :to="homePath" class="brand">
                <img v-if="branding.logoSrc" :src="branding.logoSrc" :alt="branding.logoAlt ?? wordmark" class="brand-logo" />
                <span class="brand-wordmark">{{ wordmark }}</span>
                <span v-if="branding.tagline" class="brand-tagline">{{ branding.tagline }}</span>
            </RouterLink>
        </template>

        <template #nav>
            <nav class="main-nav">
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
                    <RouterLink :to="homePath" class="nav-link">Browse</RouterLink>
                    <RouterLink :to="`${homePath}/settings`" class="nav-link">Settings</RouterLink>
                </template>
                <IconButton
                    name="search"
                    label="Open command palette (⌘K)"
                    size="sm"
                    class="nav-cmdk"
                    @click="commands.openPalette()"
                />
            </nav>
        </template>

        <RouterView />
        <CommandPalette />
    </AppLayout>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue';
import { RouterLink, RouterView } from 'vue-router';
import AppLayout from './AppLayout.vue';
import Icon from '../components/Icon.vue';
import IconButton from '../components/ui/IconButton.vue';
import CommandPalette from '../components/CommandPalette.vue';
import { useTheme } from '../composables/useTheme';
import { useCommandStore } from '../stores/useCommandStore';
import type { PhlixAppConfig, MenuItem, BrandingConfig } from './types';

// Reflect the preferences store onto <html> (theme / accent / density / motion).
useTheme();
const commands = useCommandStore();

// Branding, menu and home path all come from config — never `if (app === 'hub')`.
const config = inject<PhlixAppConfig | null>('phlixConfig', null);
const branding = computed<BrandingConfig>(() => config?.branding ?? {});
const wordmark = computed(() => branding.value.wordmark ?? 'Phlix');
const menu = computed<MenuItem[]>(() => config?.menu ?? []);
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
    gap: var(--space-2, 0.5rem);
    text-decoration: none;
}
.brand-logo {
    height: 1.5rem;
    width: auto;
    align-self: center;
}
.brand-wordmark {
    font-family: var(--font-display);
    font-size: var(--text-xl, 1.25rem);
    font-weight: var(--font-bold, 700);
    letter-spacing: var(--tracking-tight);
    color: var(--accent, var(--color-primary, #6366f1));
}
.brand-tagline {
    font-size: var(--text-xs, 0.75rem);
    color: var(--text-muted, #a1a1aa);
}

.main-nav {
    display: flex;
    align-items: center;
    gap: var(--space-4, 1rem);
}

.nav-link {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2, 0.5rem);
    color: var(--text-muted, #a1a1aa);
    font-size: var(--text-sm, 0.875rem);
    font-weight: var(--font-medium, 500);
    transition: color 0.15s ease;
}

.nav-link-icon {
    font-size: var(--text-md, 1rem);
}

.nav-link:hover,
.nav-link.router-link-active {
    color: var(--text, #e4e4e7);
}

.nav-cmdk {
    margin-left: var(--space-1, 0.25rem);
}
</style>
