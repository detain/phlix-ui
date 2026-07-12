<!--
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
-->

<script setup lang="ts">
/**
 * AdminLayout (F1; H0 — composable page groups) — the admin section shell.
 *
 * A glass left sidebar listing the admin pages beside a `<RouterView>` content
 * area. Rendered as the parent route of `buildAdminRoutes()`/`buildHubAdminRoutes()`,
 * so every `/app/admin/*` page gets consistent navigation chrome without the host
 * shell having to render a nested menu. Presentational + config-agnostic — the
 * link list is built directly from the {@link AdminPage} list it is handed (the
 * exact set the consumer mounted), so the server and hub render their own page
 * groups with no shared-code branching. Admin strings stay English, matching the
 * admin pages and the R6.5c i18n cut-line.
 *
 * Admin styles live in `../admin/admin.css` and are pulled in via a side-effect
 * import. With CSS code-splitting disabled (the lib-mode default — see
 * vite.config.ts), this CSS aggregates into the single published `style.css`
 * rather than a separate chunk: async-chunk CSS is NOT auto-injected in Vite
 * library mode, and the consumers (phlix-server / phlix-hub web-ui) bundle the
 * prebuilt `dist/phlix-ui.js` + import only `@phlix/ui/style.css`, so a separate
 * admin.css would never reach the browser (the reverted UI-3.3 regression).
 */
import { computed } from 'vue';
import { RouterView, RouterLink } from 'vue-router';
import Icon from '../components/Icon.vue';
import type { AdminPage } from './admin';
// Side-effect import — aggregated into the single style.css the consumers load
// (cssCodeSplit is off in lib mode; async-chunk CSS isn't injected at runtime).
import '../admin/admin.css';

// `buildAdminRoutes`/`buildHubAdminRoutes` always pass `pages` via the parent
// route's `props`; the empty default only guards a bare mount with no page set.
const props = withDefaults(defineProps<{ base?: string; pages?: AdminPage[] }>(), {
  base: '/app',
  pages: () => [],
});

interface SidebarLink {
  id: string;
  label: string;
  icon: AdminPage['icon'];
  to: string;
}

/** Sidebar links, built straight from the mounted page list. */
const items = computed<SidebarLink[]>(() =>
  props.pages.map((page) => ({
    id: page.name,
    label: page.label,
    icon: page.icon,
    to: `${props.base}/admin/${page.path}`,
  })),
);
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

