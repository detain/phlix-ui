<!--
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
-->

<script setup lang="ts">
/**
 * SettingsPage (R4.2) — hosts the per-user preferences under the shared Tabs
 * primitive: Appearance + Playback (live `usePreferencesStore` controls via
 * AppearanceSettings) and Security (WebAuthn/passkeys).
 *
 * NOTE: the former "Server" tab (`SettingsForm.vue`) was removed. It rendered a
 * hand-maintained subset of the SERVER settings schema against the PER-USER
 * endpoint `GET/PUT /api/v1/users/me/settings`, which returns
 * `{ settings: { max_streams, max_bitrate, preferred_*_language,
 * subtitle_mode } }` — none of the keys it rendered — so every field showed a
 * coerced default and every save wrote server-setting keys into the user
 * settings row. Server configuration lives on the admin-gated
 * `pages/admin/SettingsPage.vue`, which is driven entirely by the server's
 * schema `meta`.
 */
import { ref } from 'vue';
import Tabs, { type TabItem } from '../components/ui/Tabs.vue';
import AppearanceSettings from '../components/AppearanceSettings.vue';
import SecuritySettingsPage from './SecuritySettingsPage.vue';
import { useMessages } from '../composables/useMessages';

const { t } = useMessages();

// The Security tab hosts SecuritySettingsPage (WebAuthn/passkeys). That page
// resolves its API base via `useMediaApiBase()`, so it targets the media
// server's `/api/v1/me/webauthn/*` endpoints directly on the server app and via
// the relay proxy to the selected server on the hub app (where those endpoints
// actually live) — so the tab is safe in both consumers of this shared page.
const TABS: TabItem[] = [
  { value: 'appearance', label: t('settings.tabAppearance'), icon: 'sun' },
  { value: 'playback', label: t('settings.tabPlayback'), icon: 'play' },
  { value: 'security', label: t('settings.tabSecurity'), icon: 'key' },
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
      <template #security>
        <SecuritySettingsPage />
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
