<!--
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
-->

<script setup lang="ts">
/**
 * WhoIsWatching (S82) — the post-login profile picker.
 *
 * Rendered by `PhlixApp` as a full-bleed overlay while `useProfileStore.gateOpen`
 * holds: the account is signed in, its profile list has LOADED, and more than one
 * profile exists — a single-profile account never sees this screen (the server
 * already activated its only profile at signup), and an account whose list is
 * still loading or failed to load never sees a gate it cannot pass: the loading
 * and error states render INSIDE the panel, so the shell stays put and Retry
 * re-runs the same `GET /api/v1/profiles` read.
 *
 * Choosing a tile calls `useProfileStore.switchTo` — the REAL switch endpoint
 * (`POST /api/v1/profiles/{id}/switch`), which re-mints the session's tokens for
 * the new profile (S81). A tile whose switch is in flight is busy/disabled; a
 * failed switch keeps the screen open with the error surfaced, never silently
 * closing on a lie. The picker only ever closes on a switch the server accepted
 * (or an explicit "stay on the active profile" — the current session's row is
 * marked active so choosing it is the honest no-op the store documents).
 */
import { computed, onMounted } from 'vue';
import { useProfileStore } from '../stores/useProfileStore';
import { useMessages } from '../composables/useMessages';
import { useImageSrc } from '../composables/useImageSrc';

const profiles = useProfileStore();
const { t } = useMessages();
// S241 seam: `avatar_url` arrives as a ROOT-RELATIVE server path and must be
// resolved against the media base (the hub renders it through the relay proxy).
const { imgSrc } = useImageSrc();

onMounted(() => {
  // The store dedupes (loaded flag + in-flight guard), so a late-mounted screen
  // on a session that skipped the shell's boot load still fills itself in.
  void profiles.load();
});

const isBusy = computed(() => profiles.loading && !profiles.loaded);
const showError = computed(() => profiles.loaded === false && profiles.error !== null);

function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

async function choose(id: string): Promise<void> {
  if (profiles.switchingId !== null) return;
  // Success flips `choiceMade` → the gate (`profiles.gateOpen`) closes itself.
  // A failed switch leaves the screen open with the error surfaced.
  await profiles.switchTo(id);
}
</script>

<template>
  <div class="whos" role="dialog" aria-modal="true" :aria-label="t('profiles.whoIsWatching')">
    <div class="whos__inner">
      <h1 class="whos__title">{{ t('profiles.whoIsWatching') }}</h1>

      <div v-if="isBusy" class="whos__states" data-testid="whos-loading" aria-live="polite">
        <span class="whos__spinner" aria-hidden="true" />
        <p class="whos__state-text">{{ t('profiles.loading') }}</p>
      </div>

      <div v-else-if="showError" class="whos__states" data-testid="whos-error" role="alert">
        <p class="whos__state-text">{{ profiles.error }}</p>
        <button type="button" class="whos__retry" @click="profiles.retry()">
          {{ t('common.retry') }}
        </button>
      </div>

      <ul v-else class="whos__grid">
        <li v-for="p in profiles.profiles" :key="p.id" class="whos__cell">
          <button
            type="button"
            class="whos__tile"
            :class="{ 'whos__tile--active': p.is_active, 'whos__tile--busy': profiles.switchingId === p.id }"
            :disabled="profiles.switchingId !== null"
            :data-testid="`whos-tile-${p.id}`"
            @click="choose(p.id)"
          >
            <span class="whos__avatar" aria-hidden="true">
              <img v-if="p.avatar_url" :src="imgSrc(p.avatar_url)" :alt="''" class="whos__avatar-img" />
              <span v-else class="whos__avatar-initials">{{ initials(p.name) }}</span>
            </span>
            <span class="whos__name">{{ p.name }}</span>
            <span v-if="p.is_active" class="whos__active-badge">{{ t('profiles.active') }}</span>
          </button>
        </li>
      </ul>

      <p v-if="profiles.error && profiles.loaded" class="whos__inline-error" role="alert">
        {{ profiles.error }}
      </p>
    </div>
  </div>
</template>

<style scoped>
/* Full-bleed takeover above the shell chrome (the shell itself stays mounted;
   this paints over `main`). Nocturne atmosphere per the design system: the
   backdrop comes from AppBackdrop elsewhere — here the scrim + vignette keep
   the overlay self-contained without a second provider. */
.whos {
  position: fixed;
  inset: 0;
  z-index: 80;
  display: grid;
  place-items: center;
  padding: var(--space-6);
  background:
    radial-gradient(70% 55% at 50% 38%, rgba(245, 165, 36, 0.08), transparent 65%),
    rgba(6, 8, 12, 0.94);
  backdrop-filter: blur(6px);
  animation: whos-in 320ms var(--ease-out) both;
}
@keyframes whos-in {
  from { opacity: 0; transform: scale(0.985); }
  to { opacity: 1; transform: none; }
}
@media (prefers-reduced-motion: reduce) {
  .whos { animation: none; }
}
.whos__inner {
  width: min(720px, 100%);
  text-align: center;
}
.whos__title {
  margin: 0 0 var(--space-8);
  font-family: var(--font-display);
  font-size: var(--text-2xl);
  font-weight: var(--fw-bold, 700);
  letter-spacing: var(--tracking-tight);
  color: var(--text);
}
.whos__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: var(--space-5);
  margin: 0 auto;
  padding: 0;
  list-style: none;
  max-width: 640px;
}
.whos__cell {
  display: flex;
  justify-content: center;
}
.whos__tile {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-4) var(--space-3);
  border-radius: var(--radius-lg);
  background: transparent;
  border: 2px solid transparent;
  color: var(--text-muted);
  transition: transform var(--dur-fast) var(--ease-out), border-color var(--dur-fast) var(--ease-out),
    color var(--dur-fast) var(--ease-out);
}
.whos__tile:hover:not(:disabled),
.whos__tile:focus-visible {
  color: var(--text);
  border-color: var(--accent);
  transform: translateY(-2px);
  outline: none;
}
.whos__tile:disabled {
  opacity: 0.55;
}
.whos__tile--active {
  border-color: var(--accent-ring);
  color: var(--text);
}
.whos__avatar {
  display: grid;
  place-items: center;
  width: 88px;
  height: 88px;
  border-radius: var(--radius-lg);
  overflow: hidden;
  background: var(--accent-soft);
  color: var(--accent-text);
  border: 1px solid var(--accent-ring);
  font-family: var(--font-display);
  font-size: var(--text-xl);
  font-weight: var(--fw-bold, 700);
}
.whos__avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.whos__name {
  font-size: var(--text-sm);
  font-weight: var(--fw-medium, 500);
  max-width: 12ch;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.whos__active-badge {
  font-size: var(--text-xs);
  color: var(--accent-text);
}
.whos__states {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-4);
  padding: var(--space-8) 0;
}
.whos__state-text {
  margin: 0;
  color: var(--text-muted);
  font-size: var(--text-sm);
}
.whos__spinner {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  border: 3px solid var(--border-strong);
  border-top-color: var(--accent);
  animation: whos-spin 800ms linear infinite;
}
@keyframes whos-spin {
  to { transform: rotate(360deg); }
}
@media (prefers-reduced-motion: reduce) {
  .whos__spinner { animation-duration: 2.4s; }
}
.whos__retry {
  padding: var(--space-2) var(--space-5);
  border-radius: var(--radius-full);
  border: 1px solid var(--accent);
  background: var(--accent-soft);
  color: var(--accent-text);
  font-weight: var(--fw-semibold, 600);
  font-size: var(--text-sm);
}
.whos__inline-error {
  margin: var(--space-6) 0 0;
  color: var(--danger, #e5484d);
  font-size: var(--text-sm);
}
</style>
