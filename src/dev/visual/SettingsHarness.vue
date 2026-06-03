<script setup lang="ts">
/**
 * Settings surface visual harness (R6.4b). Mounts the real `AppearanceSettings`
 * (live, persisted prefs UI) — both the `appearance` panel (theme gallery with
 * live preview swatches, accent picker, density/grid/card-size, atmosphere,
 * motion) and the `playback` panel (autoplay, volume, quality, subtitles, caption
 * style) — inside a settings-page-style column. No locked mockup exists for
 * settings (designed in R4.2 within the locked tokens); pure regression baseline.
 */
import AppearanceSettings from '../../components/AppearanceSettings.vue';
</script>

<template>
  <div class="vh-settings">
    <h1 class="vh-settings__title">Settings</h1>
    <div class="vh-settings__panels">
      <section class="vh-settings__panel">
        <h2 class="vh-settings__heading">Appearance</h2>
        <AppearanceSettings panel="appearance" />
      </section>
      <section class="vh-settings__panel">
        <h2 class="vh-settings__heading">Playback</h2>
        <AppearanceSettings panel="playback" />
      </section>
    </div>
  </div>
</template>

<style scoped>
.vh-settings {
  max-width: 760px;
  margin: 0 auto;
  padding: var(--space-8) var(--space-6) var(--space-12);
}
.vh-settings__title {
  font-family: var(--font-display);
  font-weight: var(--fw-bold, 700);
  font-size: var(--text-2xl);
  letter-spacing: var(--tracking-tight);
  color: var(--text);
  margin-bottom: var(--space-7);
}
.vh-settings__panels {
  display: grid;
  gap: var(--space-10);
}
.vh-settings__heading {
  font-family: var(--font-display);
  font-weight: var(--fw-semibold, 600);
  font-size: var(--text-md);
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: var(--tracking-wide);
  margin-bottom: var(--space-5);
}
</style>
