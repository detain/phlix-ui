<script setup lang="ts">
/**
 * AdminLayout (F1) — the admin section shell.
 *
 * A glass left sidebar listing the admin pages (derived from {@link adminMenu})
 * beside a `<RouterView>` content area. Rendered as the parent route of
 * `buildAdminRoutes()`, so every `/app/admin/*` page gets consistent navigation
 * chrome without the host shell having to render a nested menu. Presentational +
 * config-agnostic — the link list comes from `adminMenu(base)`, and the host shell
 * (top bar + atmosphere) still wraps it. Admin strings stay English, matching the
 * admin pages and the R6.5c i18n cut-line.
 */
import { computed } from 'vue';
import { RouterView, RouterLink } from 'vue-router';
import Icon from '../components/Icon.vue';
import { adminMenu } from './admin';
import type { MenuItem } from './types';

const props = withDefaults(defineProps<{ base?: string }>(), { base: '/app' });

/** The admin links, flattened out of the single `adminMenu` group. */
const items = computed<MenuItem[]>(() => adminMenu(props.base)[0]?.children ?? []);
</script>

<template>
  <div class="admin">
    <aside class="admin__sidebar">
      <p id="admin-nav-heading" class="admin__heading">Admin</p>
      <nav class="admin__nav" aria-labelledby="admin-nav-heading">
        <RouterLink
          v-for="item in items"
          :key="item.id"
          :to="item.to ?? ''"
          class="admin__link"
        >
          <Icon v-if="item.icon" :name="item.icon" class="admin__icon" aria-hidden="true" />
          <span class="admin__label">{{ item.label }}</span>
        </RouterLink>
      </nav>
    </aside>

    <div class="admin__content"><RouterView /></div>
  </div>
</template>

<style scoped>
.admin {
  display: flex;
  align-items: flex-start;
  gap: var(--space-5);
}

/* Glass rail — sticky on desktop so it stays beside long admin pages. */
.admin__sidebar {
  flex: 0 0 auto;
  width: 220px;
  position: sticky;
  top: var(--space-5);
  align-self: flex-start;
  padding: var(--space-3);
  border-radius: var(--radius-lg);
  background: var(--surface-glass);
  -webkit-backdrop-filter: blur(12px);
  backdrop-filter: blur(12px);
  border: 1px solid var(--border-subtle);
  box-shadow: var(--shadow-1);
}
.admin__heading {
  margin: 0 0 var(--space-2);
  padding: 0 var(--space-2);
  font-family: var(--font-display);
  font-size: var(--text-xs);
  text-transform: uppercase;
  letter-spacing: var(--tracking-wide);
  color: var(--text-subtle);
}
.admin__nav {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.admin__link {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-md);
  border-left: 2px solid transparent;
  color: var(--text-muted);
  font-size: var(--text-sm);
  font-weight: var(--fw-medium, 500);
  text-decoration: none;
  transition: color var(--dur-fast) var(--ease-out), background var(--dur-fast) var(--ease-out);
}
.admin__link:hover {
  color: var(--text);
  background: var(--surface-2);
}
/* RouterLink sets `aria-current="page"` on the *exact*-active link (`router-link-exact-active`).
   `.router-link-active` (prefix match) also fires on the open page, so styling hooks here. */
.admin__link.router-link-active {
  color: var(--text);
  background: var(--surface-2);
  border-left-color: var(--accent);
}
.admin__link:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px var(--accent-ring);
}
.admin__icon {
  flex-shrink: 0;
  font-size: var(--text-md);
}
.admin__label {
  min-width: 0;
}

.admin__content {
  flex: 1 1 auto;
  min-width: 0;
}

@media (prefers-reduced-motion: reduce) {
  .admin__link {
    transition: none;
  }
}

/* Narrow screens — the rail becomes a horizontal scroller above the content. */
@media (max-width: 860px) {
  .admin {
    flex-direction: column;
  }
  .admin__sidebar {
    position: static;
    width: 100%;
  }
  .admin__heading {
    display: none;
  }
  .admin__nav {
    flex-direction: row;
    gap: var(--space-1);
    overflow-x: auto;
  }
  .admin__link {
    border-left: none;
    border-bottom: 2px solid transparent;
    white-space: nowrap;
  }
  .admin__link.router-link-active {
    border-left: none;
    border-bottom-color: var(--accent);
  }
}
</style>
