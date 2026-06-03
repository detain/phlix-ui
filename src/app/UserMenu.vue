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
import type { PhlixAppConfig } from './types';

const auth = useAuthStore();
const router = useRouter();
const config = inject<PhlixAppConfig | null>('phlixConfig', null);
const homePath = computed(() => config?.routerBase ?? '/app');

const open = ref(false);
const rootEl = ref<HTMLElement | null>(null);
const panelEl = ref<HTMLElement | null>(null);

const displayName = computed(
  () => auth.user?.username || auth.user?.name || auth.user?.email || 'Account',
);
const initial = computed(() => displayName.value.charAt(0).toUpperCase() || 'A');

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
      :aria-label="auth.isLoggedIn ? `Account: ${displayName}` : 'Account'"
      aria-haspopup="menu"
      :aria-expanded="open"
      @click="open = !open"
    >
      <span v-if="auth.isLoggedIn" class="usermenu__avatar">{{ initial }}</span>
      <Icon v-else name="user" />
    </button>

    <div
      v-if="open"
      ref="panelEl"
      class="usermenu__panel"
      role="menu"
      aria-label="Account"
      tabindex="-1"
    >
      <template v-if="auth.isLoggedIn">
        <div class="usermenu__head">
          <span class="usermenu__avatar usermenu__avatar--lg">{{ initial }}</span>
          <span class="usermenu__name">{{ displayName }}</span>
        </div>
        <button type="button" class="usermenu__item" role="menuitem" @click="go(`${homePath}/settings`)">
          <Icon name="settings" /> Settings
        </button>
        <button type="button" class="usermenu__item" role="menuitem" @click="signOut">
          <Icon name="log-out" /> Sign out
        </button>
      </template>
      <template v-else>
        <button type="button" class="usermenu__item" role="menuitem" @click="go(`${homePath}/login`)">
          <Icon name="user" /> Sign in
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
  display: grid;
  place-items: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: var(--accent-soft);
  color: var(--accent);
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
.usermenu__panel {
  position: absolute;
  z-index: 60;
  right: 0;
  top: calc(100% + 8px);
  min-width: 12rem;
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
