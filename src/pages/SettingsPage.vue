<script setup lang="ts">
/**
 * SettingsPage (R4.2) — hosts the user/appearance + server settings under the
 * shared Tabs primitive: Appearance + Playback (live `usePreferencesStore`
 * controls via AppearanceSettings) and Server (the schema-driven SettingsForm).
 */
import { ref } from 'vue';
import Tabs, { type TabItem } from '../components/ui/Tabs.vue';
import AppearanceSettings from '../components/AppearanceSettings.vue';
import SettingsForm from '../components/SettingsForm.vue';
import { useMessages } from '../composables/useMessages';

const { t } = useMessages();

const TABS: TabItem[] = [
  { value: 'appearance', label: t('settings.tabAppearance'), icon: 'sun' },
  { value: 'playback', label: t('settings.tabPlayback'), icon: 'play' },
  { value: 'server', label: t('settings.tabServer'), icon: 'settings' },
];

const tab = ref('appearance');
</script>

<template>
  <div class="settings-page">
    <header class="settings-page__head">
      <p class="settings-page__eyebrow">{{ t('settings.preferences') }}</p>
      <h1 class="settings-page__title">{{ t('settings.title') }}</h1>
    </header>

    <Tabs v-model="tab" :tabs="TABS" :label="t('settings.sectionsLabel')">
      <template #appearance>
        <AppearanceSettings panel="appearance" />
      </template>
      <template #playback>
        <AppearanceSettings panel="playback" />
      </template>
      <template #server>
        <SettingsForm />
      </template>
    </Tabs>
  </div>
</template>

<style scoped>
.settings-page {
  max-width: 720px;
  margin: 0 auto;
  padding: var(--space-8) var(--space-4) var(--space-16);
}
.settings-page__head {
  margin-bottom: var(--space-6);
}
.settings-page__eyebrow {
  font-size: var(--text-2xs);
  font-weight: var(--fw-semibold, 600);
  letter-spacing: var(--tracking-caps);
  text-transform: uppercase;
  color: var(--text-subtle);
}
.settings-page__title {
  margin-top: var(--space-1);
  font-family: var(--font-display);
  font-weight: var(--fw-semibold, 600);
  font-size: var(--text-2xl);
  letter-spacing: var(--tracking-tight);
  color: var(--text);
}
</style>
