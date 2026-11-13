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
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Tabs, { type TabItem } from '../components/ui/Tabs.vue';
import AppearanceSettings from '../components/AppearanceSettings.vue';
import SecuritySettingsPage from './SecuritySettingsPage.vue';
import DeviceSessionsPage from './DeviceSessionsPage.vue';
import { useMessages } from '../composables/useMessages';

const { t } = useMessages();

// The Security tab hosts SecuritySettingsPage (WebAuthn/passkeys). That page
// resolves its API base via `useMediaApiBase()`, so it targets the media
// server's `/api/v1/me/webauthn/*` endpoints directly on the server app and via
// the relay proxy to the selected server on the hub app (where those endpoints
// actually live) — so the tab is safe in both consumers of this shared page.
// The Sessions tab follows the OPPOSITE base law on purpose: DeviceSessionsPage
// uses `useApiBase()` because `/api/v1/auth/sessions` is the HOST's own login
// surface (the server serves it; the hub serves its twin) — proxying a session
// list to a paired server would manage the wrong account's logins.
const TABS: TabItem[] = [
  { value: 'appearance', label: t('settings.tabAppearance'), icon: 'sun' },
  { value: 'playback', label: t('settings.tabPlayback'), icon: 'play' },
  { value: 'security', label: t('settings.tabSecurity'), icon: 'key' },
  { value: 'sessions', label: t('settings.tabSessions'), icon: 'monitor' },
];

// The active tab is deep-linkable via `?tab=<value>`. The router is optional so the
// page still renders (falling back to the first tab) when mounted without one.
const route = useRoute() as ReturnType<typeof useRoute> | undefined;
const router = useRouter() as ReturnType<typeof useRouter> | undefined;
const VALID_TABS = TABS.map((x) => x.value);
function queryTab(): string {
  const raw = route?.query?.tab;
  const q = Array.isArray(raw) ? raw[0] : raw;
  return typeof q === 'string' && VALID_TABS.includes(q) ? q : VALID_TABS[0]!;
}
const tab = ref<string>(queryTab());
// URL -> tab (deep links, back/forward); tab -> URL (replace, no history spam).
watch(() => route?.query?.tab, () => { tab.value = queryTab(); });
watch(tab, (value) => {
  if (!router || !route || route.query.tab === value) return;
  void router.replace({ query: { ...route.query, tab: value } });
});
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
      <template #sessions>
        <DeviceSessionsPage />
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
