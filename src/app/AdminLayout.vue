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
 * CSS is imported as a side-effect so Rollup emits it as a separate `admin.css`
 * chunk that is lazy-loaded with this component (only when admin pages render).
 */
import { computed } from 'vue';
import { RouterView, RouterLink } from 'vue-router';
import Icon from '../components/Icon.vue';
import type { AdminPage } from './admin';
// Side-effect import — Rollup emits admin.css as a separate chunk that loads
// when AdminLayout (lazy) is fetched, keeping login/browse CSS minimal.
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

