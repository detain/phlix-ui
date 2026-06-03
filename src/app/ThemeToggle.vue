<script setup lang="ts">
/**
 * ThemeToggle (R5.1) — a shell quick-toggle that cycles the active theme
 * (nocturne -> daylight -> midnight) on the preferences store. `useTheme` (mounted
 * at the app root) reflects the change onto <html> live. Icon-only, keyboard
 * reachable; the aria-label names the current + next theme.
 */
import { computed } from 'vue';
import IconButton from '../components/ui/IconButton.vue';
import { usePreferencesStore, type ThemeName } from '../stores/usePreferencesStore';
import type { IconName } from '../components/Icon.vue';
import { useMessages } from '../composables/useMessages';

const prefs = usePreferencesStore();
const { t } = useMessages();

const ORDER: ThemeName[] = ['nocturne', 'daylight', 'midnight'];
const ICONS: Record<ThemeName, IconName> = { nocturne: 'moon', daylight: 'sun', midnight: 'monitor' };
const LABELS: Record<ThemeName, string> = { nocturne: 'Nocturne', daylight: 'Daylight', midnight: 'Midnight' };

const next = computed<ThemeName>(() => {
  const i = ORDER.indexOf(prefs.theme);
  return ORDER[(i + 1) % ORDER.length];
});
const icon = computed<IconName>(() => ICONS[prefs.theme] ?? 'moon');
const label = computed(() =>
  t('shell.themeToggleLabel', { current: LABELS[prefs.theme] ?? prefs.theme, next: LABELS[next.value] }),
);

function cycle(): void {
  prefs.theme = next.value;
}
</script>

<template>
  <IconButton :name="icon" :label="label" variant="ghost" @click="cycle" />
</template>
