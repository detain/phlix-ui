<script setup lang="ts">
/**
 * AppLayout (R5.1) — the redesigned cross-app shell ("The Marquee bar").
 *
 * A glass sticky top bar over the Nocturne atmosphere (`AppBackdrop`, mounted once
 * here for every in-shell page and gated on `prefs.atmosphere`): a brand `#logo`
 * slot, a primary `#nav` slot, and an `#actions` cluster (the consumer wires ⌘K /
 * theme toggle / user menu). Below the breakpoint the nav collapses behind a
 * hamburger into the focus-trapped `Sheet` drawer (the SAME `#nav` slot). Purely
 * presentational + config-agnostic — all brand/nav/actions content is injected.
 */
import { ref } from 'vue';
import AppBackdrop from '../components/AppBackdrop.vue';
import Sheet from '../components/ui/Sheet.vue';
import IconButton from '../components/ui/IconButton.vue';
import { usePreferencesStore } from '../stores/usePreferencesStore';

const prefs = usePreferencesStore();
const drawer = ref(false);
</script>

<template>
  <div class="shell">
    <a class="shell__skip" href="#main">Skip to content</a>
    <AppBackdrop :enabled="prefs.atmosphere" />

    <header class="shell__bar">
      <div class="shell__inner">
        <div class="shell__brand">
          <slot name="logo"><span class="shell__wordmark">Phlix<span class="shell__dot">.</span></span></slot>
        </div>

        <nav class="shell__nav" aria-label="Primary"><slot name="nav" /></nav>

        <span class="shell__spacer" />

        <div class="shell__actions"><slot name="actions" /></div>

        <IconButton
          v-if="$slots.nav"
          class="shell__hamburger"
          name="menu"
          label="Open navigation menu"
          variant="ghost"
          @click="drawer = true"
        />
      </div>
    </header>

    <main id="main" tabindex="-1" class="shell__main"><slot /></main>

    <footer v-if="$slots.footer" class="shell__footer"><slot name="footer" /></footer>

    <Sheet v-model="drawer" side="left" title="Menu">
      <!-- No aria-label here: the Sheet is a labelled role=dialog ("Menu"), so a
           second "Primary" nav landmark would be redundant. -->
      <nav class="shell__drawer" @click="drawer = false"><slot name="nav" /></nav>
    </Sheet>
  </div>
</template>

<style scoped>
.shell {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* Skip-to-content link — off-screen until focused, then slides in above the
   sticky bar. Stays in the DOM (focusable + AT-reachable) at all times. */
.shell__skip {
  position: fixed;
  top: var(--space-3);
  left: var(--space-3);
  z-index: 100;
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-md);
  background: var(--accent);
  color: var(--text-on-accent);
  font-weight: var(--font-bold);
  font-size: var(--text-sm);
  box-shadow: var(--shadow-3);
  transform: translateY(-150%);
  transition: transform var(--dur-base) var(--ease-out);
}
/* `:focus` (not `:focus-visible`) is the skip-link convention: it must reveal
   whenever focused — including programmatic focus, which some browsers don't flag
   as `:focus-visible`. A mouse click elsewhere never focuses it, so there's no flash. */
.shell__skip:focus {
  transform: translateY(0);
  outline: none;
  box-shadow: var(--shadow-3), 0 0 0 3px var(--accent-ring);
}
/* `#main` is a tabindex=-1 scroll/focus target, not an interactive control —
   suppress the focus ring it would otherwise paint when the skip link jumps to it. */
.shell__main:focus {
  outline: none;
}

/* Glass marquee bar — sticky, blurred, faint amber top edge. */
.shell__bar {
  position: sticky;
  top: 0;
  z-index: 50;
  background: var(--surface-glass-strong);
  -webkit-backdrop-filter: blur(18px) saturate(1.2);
  backdrop-filter: blur(18px) saturate(1.2);
  border-bottom: 1px solid var(--border-subtle);
  box-shadow: var(--shadow-2);
}
.shell__bar::before {
  content: '';
  position: absolute;
  inset: 0 0 auto 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--accent-soft) 30%, var(--accent-soft) 70%, transparent);
  pointer-events: none;
}
.shell__inner {
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: var(--space-5);
  padding: var(--space-3) var(--space-5);
}
.shell__brand {
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
}
.shell__wordmark {
  font-family: var(--font-display);
  font-weight: var(--fw-bold, 700);
  font-size: var(--text-xl);
  letter-spacing: var(--tracking-tight);
  color: var(--text);
}
.shell__dot {
  color: var(--accent);
}
.shell__nav {
  display: flex;
  align-items: center;
  gap: var(--space-1);
}
.shell__spacer {
  flex: 1;
}
.shell__actions {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}
.shell__hamburger {
  display: none;
}

.shell__main {
  position: relative;
  z-index: 1;
  flex: 1;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: var(--space-6) var(--space-5);
}
.shell__footer {
  position: relative;
  z-index: 1;
  padding: var(--space-5);
  text-align: center;
  color: var(--text-subtle);
  font-size: var(--text-sm);
  border-top: 1px solid var(--border-subtle);
}
.shell__drawer {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

/* Responsive — nav collapses into the drawer below the bar breakpoint. */
@media (max-width: 720px) {
  .shell__nav {
    display: none;
  }
  .shell__hamburger {
    display: inline-grid;
  }
  .shell__inner {
    gap: var(--space-3);
  }
}
</style>
