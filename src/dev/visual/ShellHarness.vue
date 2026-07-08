<!--
 * @copyright 2026 Joe Huss <detain@interserver.net>
-->

<script setup lang="ts">
/**
 * App-shell surface visual harness (R6.4b). Mounts the real `AppLayout` ("the
 * Marquee bar") with the production slot wiring: a brand lockup, primary nav
 * (RouterLink so the active "now-showing" underline shows for Browse), and the
 * actions cluster (⌘K launcher + `ThemeToggle` + `UserMenu`). The shell is shown
 * SIGNED IN (the bootstrap-seeded `access_token` makes `UserMenu` render the
 * avatar). Page content is a representative `MediaRow` rail.
 *
 * The `.brand`/`.nav-link` rules mirror `PhlixApp.vue`'s scoped styles (which owns
 * the real bar's brand + nav styling); AppLayout itself is style-agnostic for its
 * slots. Acceptance target: `src/dev/mockups/app-shell.html`. (AppBackdrop grain/
 * vignette is off here — atmosphere disabled + Playwright reduced-motion.)
 *
 * Static fixture: clicking `ThemeToggle` updates the store but does NOT re-theme
 * <html> (the harness omits `useTheme()` on purpose — see `harness.ts`). The theme
 * is fixed via `?theme=`.
 */
import { RouterLink } from 'vue-router';
import AppLayout from '../../app/AppLayout.vue';
import ThemeToggle from '../../app/ThemeToggle.vue';
import UserMenu from '../../app/UserMenu.vue';
import IconButton from '../../components/ui/IconButton.vue';
import MediaRow from '../../components/MediaRow.vue';
import { CONTINUE } from './mock-data';
</script>

<template>
  <AppLayout>
    <template #logo>
      <RouterLink to="/" class="brand">
        <span class="brand-wordmark">Phlix<span class="brand-dot">.</span></span>
      </RouterLink>
    </template>

    <template #nav>
      <RouterLink to="/" class="nav-link">Browse</RouterLink>
      <RouterLink to="/library" class="nav-link">Library</RouterLink>
      <RouterLink to="/settings" class="nav-link">Settings</RouterLink>
    </template>

    <template #actions>
      <IconButton name="search" label="Open command palette" variant="ghost" />
      <ThemeToggle />
      <UserMenu />
    </template>

    <div class="vh-page">
      <h1 class="vh-page__title">Browse</h1>
      <MediaRow title="Continue Watching" :items="CONTINUE" />
    </div>
  </AppLayout>
</template>

<style scoped>
.vh-page__title {
  font-family: var(--font-display);
  font-weight: var(--fw-bold, 700);
  font-size: var(--text-2xl);
  letter-spacing: var(--tracking-tight);
  color: var(--text);
  margin-bottom: var(--space-6);
}

/* Mirrors PhlixApp.vue's scoped brand + nav-link styling (AppLayout is
   style-agnostic for its #logo/#nav slots; PhlixApp owns these in production). */
.brand {
  display: inline-flex;
  align-items: baseline;
  gap: var(--space-2);
  text-decoration: none;
}
.brand-wordmark {
  font-family: var(--font-display);
  font-size: var(--text-xl);
  font-weight: var(--fw-bold, 700);
  letter-spacing: var(--tracking-tight);
  color: var(--text);
}
.brand-dot {
  color: var(--accent);
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
}
.nav-link.router-link-active {
  color: var(--text);
}
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
/* Mirror PhlixApp.vue's canonical nav-link focus ring (PhlixApp.vue:184) so this
   harness faithfully represents the shipped shell for the a11y/keyboard walkthrough. */
.nav-link:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px var(--accent-ring);
}
</style>
