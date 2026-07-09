<!--
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
-->

<script setup lang="ts">
/**
 * SettingsForm (R4.2) — the schema-driven server/user settings form, rebuilt on
 * the Nocturne tokens + a11y primitives (Switch / token inputs). Keeps the
 * existing `GET/PUT /api/v1/users/me/settings` round-trip and the grouped schema,
 * and adds **per-section dirty + save** state: each group has its own Save button
 * (enabled only when that group has unsaved edits) that PUTs just that group's
 * keys; success/failure surface via the toast store. Loading + error states use
 * the shared Skeleton / EmptyState primitives.
 */
import { ref, onMounted, computed } from 'vue';
import { useAuthStore } from '../stores/useAuthStore';
import { useToastStore } from '../stores/useToastStore';
import { useMessages } from '../composables/useMessages';
import { normalizeBool } from '../api/client';
import { safeClone } from '../utils/safeClone';
import Switch from './ui/Switch.vue';
import Button from './ui/Button.vue';
import Skeleton from './ui/Skeleton.vue';
import EmptyState from './ui/EmptyState.vue';
import type { ServerSettings, SettingGroup } from '../types/server-settings';

const props = defineProps<{ groups?: SettingGroup[] }>();
const emit = defineEmits<{ saved: [settings: ServerSettings] }>();

const auth = useAuthStore();
const toasts = useToastStore();
const { t } = useMessages();

const settings = ref<Record<string, unknown>>({});
const baseline = ref<Record<string, unknown>>({});
const loading = ref(true);
const error = ref<string | null>(null);
const savingGroup = ref<SettingGroup | null>(null);

const allGroups: SettingGroup[] = [
  'transcoding', 'metadata', 'markers', 'subtitles',
  'discovery', 'trickplay', 'newsletter', 'port-forward', 'scrobblers',
];
const displayGroups = computed(() =>
  props.groups ? allGroups.filter((g) => props.groups!.includes(g)) : allGroups,
);

const groupLabels: Record<SettingGroup, string> = {
  transcoding: 'Transcoding',
  metadata: 'Metadata',
  markers: 'Marker Detection',
  subtitles: 'Subtitles',
  discovery: 'Discovery',
  trickplay: 'Trickplay',
  newsletter: 'Newsletter',
  'port-forward': 'Port Forwarding',
  scrobblers: 'Scrobblers',
};

// Each key carries its owning `group` explicitly — the schema key prefixes
// (hwaccel.*, tmdb.*, marker_detection.*, trakt.*) do NOT match their group names
// (transcoding/metadata/markers/scrobblers), so a `startsWith(group)` filter would
// leave those four groups empty AND unsaveable. Mapping is authoritative.
const settingMeta: Record<string, { label: string; type: 'bool' | 'number' | 'string'; group: SettingGroup }> = {
  'hwaccel.enabled': { label: 'Hardware acceleration', type: 'bool', group: 'transcoding' },
  'hwaccel.prefer_hardware': { label: 'Prefer hardware encoding', type: 'bool', group: 'transcoding' },
  'hwaccel.probe_timeout': { label: 'HW probe timeout (s)', type: 'number', group: 'transcoding' },
  'tmdb.api_key': { label: 'TMDB API Key', type: 'string', group: 'metadata' },
  'marker_detection.similarity_threshold': { label: 'Intro similarity threshold', type: 'number', group: 'markers' },
  'marker_detection.intro_max_duration': { label: 'Max intro duration (s)', type: 'number', group: 'markers' },
  'subtitles.enabled': { label: 'Enable subtitles', type: 'bool', group: 'subtitles' },
  'subtitles.default_language': { label: 'Default subtitle language', type: 'string', group: 'subtitles' },
  'subtitles.burn_in_by_default': { label: 'Burn in subtitles by default', type: 'bool', group: 'subtitles' },
  'discovery.discovery_port': { label: 'Discovery port', type: 'number', group: 'discovery' },
  'trickplay.enabled': { label: 'Enable trickplay', type: 'bool', group: 'trickplay' },
  'trickplay.interval_seconds': { label: 'Trickplay interval (s)', type: 'number', group: 'trickplay' },
  'newsletter.enabled': { label: 'Enable newsletter', type: 'bool', group: 'newsletter' },
  'newsletter.send_hour': { label: 'Newsletter send hour', type: 'number', group: 'newsletter' },
  'port-forward.port_forwarding.upnp_enabled': { label: 'Enable UPnP', type: 'bool', group: 'port-forward' },
  'trakt.client_id': { label: 'Trakt client ID', type: 'string', group: 'scrobblers' },
  'trakt.client_secret': { label: 'Trakt client secret', type: 'string', group: 'scrobblers' },
  'trakt.redirect_uri': { label: 'Trakt redirect URI', type: 'string', group: 'scrobblers' },
};

/** Keys belonging to a group (authoritative — not a key-prefix guess). */
function keysOf(group: SettingGroup): string[] {
  return Object.keys(settingMeta).filter((k) => settingMeta[k].group === group);
}

/** Number-field input guarded against NaN: '' clears to 0, a partial value
 *  ('-', '1.', '1e') is ignored (keeps the last valid value) rather than persisting NaN. */
function onNumberInput(key: string, e: Event): void {
  const raw = (e.target as HTMLInputElement).value;
  if (raw === '') return setSetting(key, 0);
  const n = Number(raw);
  if (Number.isFinite(n)) setSetting(key, n);
}

function coerce(value: unknown, type: 'bool' | 'number' | 'string'): unknown {
  if (type === 'bool') return normalizeBool(value);
  if (type === 'number') return value == null || value === '' ? 0 : Number(value);
  return value == null ? '' : String(value);
}

async function load(): Promise<void> {
  loading.value = true;
  error.value = null;
  try {
    const data = await auth.client.get<Record<string, unknown>>('/api/v1/users/me/settings');
    // Preserve the full payload, but coerce the editable meta keys to a stable type
    // so per-section dirty comparison is clean (no 1 !== true false positives).
    const next: Record<string, unknown> = { ...data };
    for (const [key, meta] of Object.entries(settingMeta)) next[key] = coerce(data[key], meta.type);
    settings.value = next;
    // safeClone (not structuredClone directly): older Tizen webviews lack
    // structuredClone (Chrome <98) — fall back to a JSON round-trip there.
    baseline.value = safeClone(next);
  } catch (e) {
    error.value = e instanceof Error ? e.message : t('settings.loadFailed');
  } finally {
    loading.value = false;
  }
}

function isDirty(group: SettingGroup): boolean {
  return keysOf(group).some((k) => settings.value[k] !== baseline.value[k]);
}

async function saveGroup(group: SettingGroup): Promise<void> {
  savingGroup.value = group;
  try {
    const patch: Record<string, unknown> = {};
    for (const k of keysOf(group)) patch[k] = settings.value[k];
    await auth.client.put('/api/v1/users/me/settings', patch);
    for (const k of keysOf(group)) baseline.value[k] = settings.value[k];
    toasts.success(t('settings.groupSaved', { name: groupLabels[group] }));
    emit('saved', settings.value as unknown as ServerSettings);
  } catch (e) {
    toasts.error(e instanceof Error ? e.message : t('settings.groupSaveError', { name: groupLabels[group] }));
  } finally {
    savingGroup.value = null;
  }
}

function setSetting(key: string, value: unknown): void {
  settings.value[key] = value;
}

onMounted(load);
</script>

<template>
  <div class="setform">
    <div v-if="loading" class="setform__loading">
      <Skeleton v-for="n in 3" :key="n" height="6.5rem" radius="var(--radius-lg)" />
    </div>

    <EmptyState v-else-if="error" icon="alert" :title="t('settings.loadErrorTitle')" :description="error">
      <template #actions>
        <Button left-icon="rewind" @click="load">{{ t('common.retry') }}</Button>
      </template>
    </EmptyState>

    <template v-else>
      <section v-for="group in displayGroups" :key="group" class="setform__group">
        <header class="setform__head">
          <h3 class="setform__title">{{ groupLabels[group] }}</h3>
          <span v-if="isDirty(group)" class="setform__dirty">{{ t('settings.unsaved') }}</span>
        </header>

        <div
          v-for="key in keysOf(group)"
          :key="key"
          class="setform__row"
          :class="{ 'setform__row--switch': settingMeta[key].type === 'bool' }"
        >
          <template v-if="settingMeta[key].type === 'bool'">
            <Switch
              :model-value="!!settings[key]"
              :label="settingMeta[key].label"
              @update:model-value="(v) => setSetting(key, v)"
            />
          </template>
          <template v-else>
            <label :for="`set-${key}`" class="setform__label">{{ settingMeta[key].label }}</label>
            <input
              :id="`set-${key}`"
              class="setform__input"
              :type="settingMeta[key].type === 'number' ? 'number' : 'text'"
              :value="settings[key] ?? ''"
              @input="settingMeta[key].type === 'number' ? onNumberInput(key, $event) : setSetting(key, ($event.target as HTMLInputElement).value)"
            />
          </template>
        </div>

        <div class="setform__actions">
          <Button
            variant="solid"
            size="sm"
            :disabled="!isDirty(group)"
            :loading="savingGroup === group"
            @click="saveGroup(group)"
          >
            {{ t('settings.saveGroup', { name: groupLabels[group] }) }}
          </Button>
        </div>
      </section>
    </template>
  </div>
</template>

<style scoped>
.setform {
  display: grid;
  gap: var(--space-6);
}
.setform__loading {
  display: grid;
  gap: var(--space-6);
}
.setform__group {
  padding: var(--space-6);
  border-radius: var(--radius-lg);
  background: var(--surface);
  border: 1px solid var(--border);
}
.setform__head {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  margin-bottom: var(--space-4);
}
.setform__title {
  font-family: var(--font-display);
  font-weight: var(--fw-semibold, 600);
  font-size: var(--text-base);
  letter-spacing: var(--tracking-tight);
  color: var(--text);
}
.setform__dirty {
  font-size: var(--text-2xs);
  font-weight: var(--fw-semibold, 600);
  letter-spacing: var(--tracking-caps);
  text-transform: uppercase;
  color: var(--warning);
  background: var(--warning-bg);
  padding: 2px var(--space-2);
  border-radius: var(--radius-full);
}
.setform__row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  padding: var(--space-3) 0;
  border-bottom: 1px solid var(--border-subtle);
}
.setform__row:last-of-type {
  border-bottom: none;
}
.setform__row--switch :deep(.phlix-switch) {
  width: 100%;
  flex-direction: row-reverse;
  justify-content: space-between;
}
.setform__label {
  font-size: var(--text-sm);
  color: var(--text);
  flex: 1;
}
.setform__input {
  width: 13rem;
  height: var(--control-h);
  padding: 0 var(--space-3);
  border-radius: var(--radius-md);
  border: 1px solid var(--border);
  background: var(--surface-2);
  color: var(--text);
  font: inherit;
  font-size: var(--text-sm);
  transition: border-color var(--dur-fast) var(--ease-out), box-shadow var(--dur-base) var(--ease-out);
}
.setform__input:focus {
  outline: none;
  border-color: var(--accent-ring);
  box-shadow: 0 0 0 3px var(--accent-soft);
}
.setform__actions {
  display: flex;
  justify-content: flex-end;
  margin-top: var(--space-4);
}
</style>
