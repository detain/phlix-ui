<!--
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
-->

<script setup lang="ts">
/**
 * UserMenu (R5.1) — the shell account affordance. An avatar button opens a
 * focus-trapped popover: when signed in, the user's name + a Settings link +
 * Sign out (`useAuthStore.logout` then route to login); when signed out, a
 * Sign in link. Links are `routerBase`-aware (config). Esc / click-outside close.
 */
import { computed, inject, onBeforeUnmount, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import Icon from '../components/Icon.vue';
import { useFocusTrap } from '../components/ui/useFocusTrap';
import { useAuthStore } from '../stores/useAuthStore';
import { useMessages } from '../composables/useMessages';
import type { PhlixAppConfig } from './types';

const auth = useAuthStore();
const router = useRouter();
const config = inject<PhlixAppConfig | null>('phlixConfig', null);
const homePath = computed(() => config?.routerBase ?? '/app');
const { t } = useMessages();

const open = ref(false);
const rootEl = ref<HTMLElement | null>(null);
const panelEl = ref<HTMLElement | null>(null);

const displayName = computed(
  () => auth.user?.username || auth.user?.name || auth.user?.email || t('shell.account'),
);
const avatarError = ref(false);

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

// Reset error flag when avatar_url changes so the new URL is tried
watch(
  () => auth.user?.avatar_url,
  () => { avatarError.value = false; },
);

function close(): void {
  open.value = false;
}
function go(path: string): void {
  close();
  void router.push(path);
}
function signOut(): void {
  close();
  auth.logout();
  void router.push(`${homePath.value}/login`);
}

useFocusTrap(panelEl, open, {
  lockScroll: false,
  onEscape: () => {
    close();
    return true;
  },
});

function onDocPointer(e: PointerEvent): void {
  if (rootEl.value && !rootEl.value.contains(e.target as Node)) close();
}
watch(open, (v) => {
  if (typeof document === 'undefined') return;
  if (v) document.addEventListener('pointerdown', onDocPointer, true);
  else document.removeEventListener('pointerdown', onDocPointer, true);
});
onBeforeUnmount(() => {
  if (typeof document !== 'undefined') document.removeEventListener('pointerdown', onDocPointer, true);
});
</script>

<template>
  <div ref="rootEl" class="usermenu">
    <button
      type="button"
      class="usermenu__trigger"
      :aria-label="auth.isLoggedIn ? t('shell.accountNamed', { name: displayName }) : t('shell.account')"
      aria-haspopup="menu"
      :aria-expanded="open"
      @click="open = !open"
    >
      <span v-if="auth.isLoggedIn" class="usermenu__avatar">
        <img
          v-if="auth.user?.avatar_url && !avatarError"
          :src="auth.user.avatar_url"
          :alt="displayName"
          class="usermenu__avatar-img"
          @error="avatarError = true"
        />
        <span v-else class="usermenu__avatar-initials">{{ getInitials(displayName) }}</span>
      </span>
      <Icon v-else name="user" />
    </button>

    <div
      v-if="open"
      ref="panelEl"
      class="usermenu__panel"
      role="menu"
      :aria-label="t('shell.account')"
      tabindex="-1"
    >
      <template v-if="auth.isLoggedIn">
        <div class="usermenu__head">
          <span class="usermenu__avatar usermenu__avatar--lg">
            <img
              v-if="auth.user?.avatar_url && !avatarError"
              :src="auth.user.avatar_url"
              :alt="displayName"
              class="usermenu__avatar-img"
              @error="avatarError = true"
            />
            <span v-else class="usermenu__avatar-initials">{{ getInitials(displayName) }}</span>
          </span>
          <span class="usermenu__name">{{ displayName }}</span>
        </div>
        <button type="button" class="usermenu__item" role="menuitem" @click="go(`${homePath}/history`)">
          <Icon name="film" /> {{ t('shell.watchHistory') }}
        </button>
        <button type="button" class="usermenu__item" role="menuitem" @click="go(`${homePath}/settings`)">
          <Icon name="settings" /> {{ t('shell.settings') }}
        </button>
        <button type="button" class="usermenu__item" role="menuitem" @click="signOut">
          <Icon name="log-out" /> {{ t('shell.signOut') }}
        </button>
      </template>
      <template v-else>
        <button type="button" class="usermenu__item" role="menuitem" @click="go(`${homePath}/login`)">
          <Icon name="user" /> {{ t('shell.signIn') }}
        </button>
      </template>
    </div>
  </div>
</template>

<style scoped>
.usermenu {
  position: relative;
  display: inline-flex;
}
.usermenu__trigger {
  width: 38px;
  height: 38px;
  display: grid;
  place-items: center;
  border-radius: var(--radius-full);
  color: var(--text-muted);
  font-size: 1.2em;
  transition: color var(--dur-fast) var(--ease-out), background var(--dur-fast) var(--ease-out);
}
.usermenu__trigger:hover {
  color: var(--text);
  background: var(--surface-2);
}
.usermenu__trigger:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px var(--accent-ring);
}
.usermenu__avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: var(--accent-soft);
  color: var(--accent-text);
  border: 1px solid var(--accent-ring);
  font-family: var(--font-sans);
  font-weight: var(--fw-semibold, 600);
  font-size: var(--text-sm);
}
.usermenu__avatar--lg {
  width: 38px;
  height: 38px;
  font-size: var(--text-base);
}
.usermenu__avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: inherit;
}
.usermenu__avatar-initials {
  line-height: 1;
}
.usermenu__panel {
  position: absolute;
  z-index: 60;
  right: 0;
  top: calc(100% + 8px);
  min-width: 12rem;
  /* Grow to fit all items with no scrollbar; only scroll if the panel would run
     past the bottom of the viewport (accounts for the ~8px top offset + a small
     gutter). dvh so a mobile browser's collapsing chrome doesn't clip it. */
  max-height: calc(100dvh - var(--space-4));
  overflow-y: auto;
  padding: var(--space-2);
  border-radius: var(--radius-lg);
  background: var(--surface-2);
  border: 1px solid var(--border-strong);
  box-shadow: var(--shadow-4);
  outline: none;
}
.usermenu__panel:focus-visible {
  box-shadow: var(--shadow-4), 0 0 0 3px var(--accent-ring);
}
.usermenu__head {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-2) var(--space-3) var(--space-3);
  margin-bottom: var(--space-1);
  border-bottom: 1px solid var(--border-subtle);
}
.usermenu__name {
  font-weight: var(--fw-semibold, 600);
  font-size: var(--text-sm);
  color: var(--text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.usermenu__item {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  width: 100%;
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-sm);
  font-size: var(--text-sm);
  color: var(--text-muted);
  text-align: left;
  transition: background var(--dur-fast) var(--ease-out), color var(--dur-fast) var(--ease-out);
}
.usermenu__item:hover {
  background: var(--surface-3);
  color: var(--text);
}
.usermenu__item:focus-visible {
  outline: none;
  color: var(--text);
  box-shadow: 0 0 0 2px var(--accent-ring);
}
@media (prefers-reduced-motion: reduce) {
  .usermenu__trigger,
  .usermenu__item {
    transition: none;
  }
}
</style>
