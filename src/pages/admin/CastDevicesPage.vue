<!--
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
-->

<script setup lang="ts">
/**
 * Admin CastDevicesPage (RA.8) — Chromecast + AirPlay device management, a 1:1
 * port of the deleted React `CastDevicesPage` onto the `@phlix/ui` primitives.
 * A tabbed surface (Chromecast / AirPlay) lists discovered devices; selecting a
 * device loads its playback state and exposes transport controls appropriate to
 * the transport:
 *   - Chromecast: play, pause, seek, stop
 *   - AirPlay:    play (resume), pause, stop  (no seek)
 *
 * Device lists load on mount; selecting a device fetches its status; every
 * transport action optimistically updates the panel. Errors surface as toasts;
 * loading uses Skeleton, empty uses EmptyState. The React Roku/DLNA tabs are out
 * of scope for this step (DLNA is RA.9); only the Chromecast + AirPlay
 * transports backed by `AdminCastApi` are ported here.
 */
import { ref, computed, onMounted, inject, type ComputedRef } from 'vue';
import { ApiClient } from '../../api/client';
import { LocalStorageTokenStore } from '../../api/tokenStore';
import {
  AdminCastApi,
  type AirPlayDevice,
  type CastDevice,
} from '../../api/admin/cast';
import { useToastStore } from '../../stores/useToastStore';
import { errMessage } from '../../api/errors';
import { nextEnabledIndex } from '../../components/ui/listbox';
import Badge from '../../components/ui/Badge.vue';
import PageHint from '../../components/ui/PageHint.vue';
import { adminPageHelp } from './helpLinks';
import Button from '../../components/ui/Button.vue';
import Slider from '../../components/ui/Slider.vue';
import Skeleton from '../../components/ui/Skeleton.vue';
import EmptyState from '../../components/ui/EmptyState.vue';
import Icon, { type IconName } from '../../components/Icon.vue';

type TabId = 'chromecast' | 'airplay';

interface TabDef {
  id: TabId;
  label: string;
  icon: IconName;
}

interface TransportState {
  isPlaying: boolean;
  position: number | null;
  duration: number | null;
  mediaTitle: string;
  deviceId: string;
}

const TABS: readonly TabDef[] = [
  { id: 'chromecast', label: 'Chromecast', icon: 'cast' },
  { id: 'airplay', label: 'AirPlay', icon: 'tv' },
];

const props = defineProps<{
  /** Inject a pre-built API client for tests; otherwise one is built from `apiBase`. */
  client?: ApiClient;
}>();

const injectedApiBase = inject<string | ComputedRef<string> | undefined>('apiBase', '');
const apiBase = computed(() =>
  typeof injectedApiBase === 'string' ? injectedApiBase : injectedApiBase?.value ?? '',
);
const api = new AdminCastApi(
  props.client ?? new ApiClient({ baseUrl: apiBase.value, tokenStore: new LocalStorageTokenStore() }),
);
const toasts = useToastStore();

// ── Helpers ───────────────────────────────────────────────────────────────────

/** Format seconds as "H:MM:SS" or "M:SS". */
function formatTime(seconds: number | null): string {
  if (seconds === null) return '--:--';
  const s = Math.floor(seconds);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  if (h > 0) {
    return `${h}:${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  }
  return `${m}:${String(sec).padStart(2, '0')}`;
}

// ── Tab + list state ───────────────────────────────────────────────────────────
const activeTab = ref<TabId>('chromecast');
const tablistEl = ref<HTMLElement | null>(null);

const castDevices = ref<CastDevice[]>([]);
const airplayDevices = ref<AirPlayDevice[]>([]);
const loadingCast = ref(true);
const loadingAirPlay = ref(true);
const castError = ref<string | null>(null);
const airplayError = ref<string | null>(null);

const selectedDeviceId = ref<string | null>(null);
const transportState = ref<TransportState | null>(null);
const loadingTransport = ref(false);
const acting = ref(false);

const currentDevices = computed<Array<CastDevice | AirPlayDevice>>(() =>
  activeTab.value === 'chromecast' ? castDevices.value : airplayDevices.value,
);
const currentLoading = computed(() =>
  activeTab.value === 'chromecast' ? loadingCast.value : loadingAirPlay.value,
);
const currentError = computed(() =>
  activeTab.value === 'chromecast' ? castError.value : airplayError.value,
);
const activeLabel = computed(() => TABS.find((t) => t.id === activeTab.value)?.label ?? '');
const activeIcon = computed<IconName>(() => TABS.find((t) => t.id === activeTab.value)?.icon ?? 'cast');
const hasSeek = computed(() => activeTab.value === 'chromecast');

const selectedDeviceName = computed(() => {
  const found = currentDevices.value.find((d) => d.device_id === selectedDeviceId.value);
  return found?.name ?? '';
});

// ── Fetch device lists ─────────────────────────────────────────────────────────

async function fetchCastDevices(): Promise<void> {
  loadingCast.value = true;
  castError.value = null;
  try {
    castDevices.value = await api.listCastDevices();
  } catch (e) {
    castError.value = errMessage(e, 'Failed to load Chromecast devices.');
    toasts.error(castError.value);
  } finally {
    loadingCast.value = false;
  }
}

async function fetchAirPlayDevices(): Promise<void> {
  loadingAirPlay.value = true;
  airplayError.value = null;
  try {
    airplayDevices.value = await api.listAirPlayDevices();
  } catch (e) {
    airplayError.value = errMessage(e, 'Failed to load AirPlay devices.');
    toasts.error(airplayError.value);
  } finally {
    loadingAirPlay.value = false;
  }
}

/** Re-fetch the active tab's device list (Retry from the in-body error state). */
function retryDevices(): void {
  if (activeTab.value === 'chromecast') {
    void fetchCastDevices();
  } else {
    void fetchAirPlayDevices();
  }
}

// ── Transport state ──────────────────────────────────────────────────────────

async function fetchTransportState(tabId: TabId, deviceId: string): Promise<void> {
  loadingTransport.value = true;
  transportState.value = null;
  try {
    if (tabId === 'chromecast') {
      const state = await api.getCastStatus(deviceId);
      transportState.value = {
        isPlaying: state.transport_state === 'PLAYING',
        position: state.position_seconds,
        duration: state.duration_seconds,
        mediaTitle: state.media_title,
        deviceId: state.device_id,
      };
    } else {
      const state = await api.getAirPlayStatus(deviceId);
      transportState.value = {
        isPlaying: state.transport_state === 'PLAYING',
        position: null,
        duration: null,
        mediaTitle: state.media_title,
        deviceId: state.device_id,
      };
    }
  } catch (e) {
    toasts.error(errMessage(e, 'Failed to load playback state.'));
  } finally {
    loadingTransport.value = false;
  }
}

function handleSelectDevice(deviceId: string): void {
  selectedDeviceId.value = deviceId;
  void fetchTransportState(activeTab.value, deviceId);
}

function handleTabChange(tabId: TabId): void {
  if (tabId === activeTab.value) return;
  activeTab.value = tabId;
  selectedDeviceId.value = null;
  transportState.value = null;
}

/** Roving-tabindex keyboard nav for the device-type tablist (matches `ui/Tabs`). */
function focusTabAt(index: number): void {
  tablistEl.value?.querySelectorAll<HTMLButtonElement>('[role="tab"]')[index]?.focus();
}

function onTabKeydown(e: KeyboardEvent): void {
  const opts = TABS.map((t) => ({ value: t.id, label: t.label }));
  const current = TABS.findIndex((t) => t.id === activeTab.value);
  let to = -1;
  switch (e.key) {
    case 'ArrowRight':
    case 'ArrowDown':
      to = nextEnabledIndex(opts, current, 1);
      break;
    case 'ArrowLeft':
    case 'ArrowUp':
      to = nextEnabledIndex(opts, current, -1);
      break;
    case 'Home':
      to = nextEnabledIndex(opts, -1, 1);
      break;
    case 'End':
      to = nextEnabledIndex(opts, 0, -1);
      break;
    default:
      return;
  }
  if (to >= 0) {
    e.preventDefault();
    handleTabChange(TABS[to].id);
    focusTabAt(to);
  }
}

// ── Transport actions ─────────────────────────────────────────────────────────

async function handlePlay(): Promise<void> {
  const id = selectedDeviceId.value;
  if (!id) return;
  acting.value = true;
  try {
    const result =
      activeTab.value === 'chromecast' ? await api.castPlay(id) : await api.airPlayPlay(id);
    if (!result.success) {
      toasts.error(result.message || 'Play failed.');
      return;
    }
    if (transportState.value) transportState.value = { ...transportState.value, isPlaying: true };
  } catch (e) {
    toasts.error(errMessage(e, 'Play failed.'));
  } finally {
    acting.value = false;
  }
}

async function handlePause(): Promise<void> {
  const id = selectedDeviceId.value;
  if (!id) return;
  acting.value = true;
  try {
    const result =
      activeTab.value === 'chromecast' ? await api.castPause(id) : await api.airPlayPause(id);
    if (!result.success) {
      toasts.error(result.message || 'Pause failed.');
      return;
    }
    if (transportState.value) transportState.value = { ...transportState.value, isPlaying: false };
  } catch (e) {
    toasts.error(errMessage(e, 'Pause failed.'));
  } finally {
    acting.value = false;
  }
}

async function handleStop(): Promise<void> {
  const id = selectedDeviceId.value;
  if (!id) return;
  acting.value = true;
  try {
    const result =
      activeTab.value === 'chromecast' ? await api.castStop(id) : await api.airPlayStop(id);
    if (!result.success) {
      toasts.error(result.message || 'Stop failed.');
      return;
    }
    if (transportState.value) {
      transportState.value = { ...transportState.value, isPlaying: false, position: null };
    }
  } catch (e) {
    toasts.error(errMessage(e, 'Stop failed.'));
  } finally {
    acting.value = false;
  }
}

async function handleSeek(position: number): Promise<void> {
  const id = selectedDeviceId.value;
  if (!id || activeTab.value !== 'chromecast') return;
  acting.value = true;
  try {
    const result = await api.castSeek(id, position);
    if (!result.success) {
      toasts.error(result.message || 'Seek failed.');
      return;
    }
    if (transportState.value) transportState.value = { ...transportState.value, position };
  } catch (e) {
    toasts.error(errMessage(e, 'Seek failed.'));
  } finally {
    acting.value = false;
  }
}

onMounted(() => {
  void fetchCastDevices();
  void fetchAirPlayDevices();
});
</script>

<template>
  <section class="admin-cast" aria-labelledby="cast-heading">
    <header class="admin-cast__head">
      <h1 id="cast-heading" class="admin-cast__title">Cast Devices</h1>
    </header>

    <PageHint :links="adminPageHelp.cast.links" :details="adminPageHelp.cast.details">
      See the <strong>Chromecast</strong> and <strong>AirPlay</strong> devices Phlix has found on
      your network and control what they're playing. Switch between the two with the tabs, click a
      device to select it, then use <strong>Play</strong>, <strong>Pause</strong>, and
      <strong>Stop</strong> to control it — for Chromecast you can also drag the position slider to
      seek.
    </PageHint>

    <div
      ref="tablistEl"
      class="admin-cast__tabs"
      role="tablist"
      aria-label="Device type"
      @keydown="onTabKeydown"
    >
      <button
        v-for="tab in TABS"
        :id="`cast-tab-${tab.id}`"
        :key="tab.id"
        type="button"
        role="tab"
        :aria-selected="activeTab === tab.id"
        :aria-controls="`panel-${tab.id}`"
        :tabindex="activeTab === tab.id ? 0 : -1"
        :class="['admin-cast__tab', { 'admin-cast__tab--active': activeTab === tab.id }]"
        @click="handleTabChange(tab.id)"
      >
        <Icon :name="tab.icon" class="admin-cast__tab-icon" />
        {{ tab.label }}
      </button>
    </div>

    <div
      :id="`panel-${activeTab}`"
      role="tabpanel"
      :aria-labelledby="`cast-tab-${activeTab}`"
      class="admin-cast__panel"
    >
      <h2 class="admin-cast__subtitle">{{ activeLabel }} Devices</h2>

      <div v-if="currentLoading" class="admin-cast__grid" aria-busy="true">
        <Skeleton variant="rect" height="64px" />
        <Skeleton variant="rect" height="64px" />
      </div>

      <EmptyState
        v-else-if="currentError"
        icon="alert"
        :title="`Couldn't load ${activeLabel} devices`"
        :description="currentError"
      >
        <template #actions>
          <Button variant="solid" size="sm" left-icon="rewind" @click="retryDevices">Retry</Button>
        </template>
      </EmptyState>

      <EmptyState
        v-else-if="currentDevices.length === 0"
        icon="cast"
        :title="`No ${activeLabel} devices discovered`"
        description="Devices appear here once they are discovered on your network."
      />

      <ul v-else class="admin-cast__grid" role="list">
        <li v-for="device in currentDevices" :key="device.device_id">
          <button
            type="button"
            :class="['device-card', { 'device-card--selected': selectedDeviceId === device.device_id }]"
            :aria-pressed="selectedDeviceId === device.device_id"
            :aria-label="`Select ${device.name}`"
            @click="handleSelectDevice(device.device_id)"
          >
            <span class="device-card__icon" aria-hidden="true"><Icon :name="activeIcon" /></span>
            <span class="device-card__info">
              <span class="device-card__name" :title="device.name">{{ device.name }}</span>
              <span class="device-card__model" :title="`${device.model} - ${device.host}`">
                {{ device.model }}
              </span>
            </span>
          </button>
        </li>
      </ul>

      <section v-if="selectedDeviceId" class="admin-cast__session" aria-labelledby="transport-heading">
        <h2 id="transport-heading" class="admin-cast__subtitle">Playback Controls</h2>

        <div v-if="loadingTransport" class="admin-cast__player" aria-live="polite">
          <p role="status" class="admin-cast__muted">Loading playback state.</p>
        </div>

        <div v-else-if="!transportState" class="admin-cast__player">
          <p class="admin-cast__muted">Select a device to view playback controls.</p>
        </div>

        <div v-else class="admin-cast__player">
          <div class="admin-cast__nowplaying">
            <p class="admin-cast__media">{{ transportState.mediaTitle || 'No media' }}</p>
            <p class="admin-cast__note">
              <Badge :tone="transportState.isPlaying ? 'success' : 'neutral'">
                {{ transportState.isPlaying ? 'Playing' : 'Paused' }}
              </Badge>
              <span class="admin-cast__muted">on {{ selectedDeviceName }}</span>
            </p>
          </div>

          <div
            v-if="hasSeek && transportState.duration !== null"
            class="admin-cast__seek"
            role="group"
            aria-label="Seek"
          >
            <span class="admin-cast__time">{{ formatTime(transportState.position) }}</span>
            <Slider
              :model-value="transportState.position ?? 0"
              :min="0"
              :max="transportState.duration ?? 100"
              :step="1"
              :disabled="acting"
              label="Seek position"
              :format-value="formatTime"
              class="admin-cast__slider"
              @change="handleSeek"
            />
            <span class="admin-cast__time">{{ formatTime(transportState.duration) }}</span>
          </div>

          <div class="admin-cast__buttons">
            <Button
              variant="solid"
              size="sm"
              left-icon="play"
              :disabled="transportState.isPlaying || acting"
              @click="handlePlay"
            >
              Play
            </Button>
            <Button
              variant="outline"
              size="sm"
              left-icon="pause"
              :disabled="!transportState.isPlaying || acting"
              @click="handlePause"
            >
              Pause
            </Button>
            <Button variant="outline" size="sm" left-icon="x" :disabled="acting" @click="handleStop">
              Stop
            </Button>
          </div>
        </div>
      </section>
    </div>
  </section>
</template>

<style scoped>
.admin-cast {
  max-width: 1100px;
  margin: 0 auto;
  padding: var(--space-6);
}
.admin-cast__title {
  font-family: var(--font-display);
  font-weight: var(--font-semibold);
  font-size: var(--text-xl);
  letter-spacing: var(--tracking-tight);
  color: var(--text);
  margin-bottom: var(--space-4);
}
.admin-cast__tabs {
  display: flex;
  gap: var(--space-2);
  border-bottom: 1px solid var(--border-subtle);
  margin-bottom: var(--space-5);
}
.admin-cast__tab {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-3);
  background: transparent;
  border: none;
  border-bottom: 2px solid transparent;
  font-size: var(--text-sm);
  font-weight: var(--font-semibold);
  color: var(--text-muted);
  cursor: pointer;
}
.admin-cast__tab--active {
  color: var(--text);
  border-bottom-color: var(--accent-text);
}
.admin-cast__tab:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px var(--accent-ring);
  border-radius: var(--radius-sm);
}
.admin-cast__tab-icon {
  font-size: 1.05em;
}
.admin-cast__subtitle {
  font-family: var(--font-display);
  font-weight: var(--font-semibold);
  font-size: var(--text-lg);
  color: var(--text);
  margin-bottom: var(--space-3);
}
.admin-cast__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: var(--space-3);
  list-style: none;
  padding: 0;
  margin: 0 0 var(--space-6);
}
.device-card {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  width: 100%;
  padding: var(--space-3);
  border-radius: var(--radius-lg);
  background: var(--surface-1, var(--surface));
  border: 1px solid var(--border-subtle);
  text-align: left;
  cursor: pointer;
  color: var(--text);
}
.device-card--selected {
  border-color: var(--accent-text);
  box-shadow: 0 0 0 1px var(--accent-text);
}
.device-card:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px var(--accent-ring);
}
/* Selected + focused: keep the selection outline AND show the focus ring. */
.device-card--selected:focus-visible {
  box-shadow: 0 0 0 1px var(--accent-text), 0 0 0 3px var(--accent-ring);
}
.device-card__icon {
  display: grid;
  place-items: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: var(--radius-md);
  background: var(--surface-2);
  color: var(--text-subtle);
  font-size: 1.2rem;
  flex-shrink: 0;
}
.device-card__info {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  min-width: 0;
}
.device-card__name {
  font-weight: var(--font-semibold);
  font-size: var(--text-sm);
  color: var(--text);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.device-card__model {
  font-size: var(--text-xs);
  color: var(--text-subtle);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.admin-cast__session {
  border-top: 1px solid var(--border-subtle);
  padding-top: var(--space-5);
}
.admin-cast__player {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  padding: var(--space-4);
  border-radius: var(--radius-lg);
  background: var(--surface-1, var(--surface));
  border: 1px solid var(--border-subtle);
}
.admin-cast__media {
  font-weight: var(--font-semibold);
  font-size: var(--text-md);
  color: var(--text);
}
.admin-cast__note {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--text-sm);
  margin-top: var(--space-1);
}
.admin-cast__muted {
  color: var(--text-muted);
  font-size: var(--text-sm);
}
.admin-cast__seek {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}
.admin-cast__slider {
  flex: 1;
}
.admin-cast__time {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--text-subtle);
  min-width: 3.5rem;
}
.admin-cast__buttons {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}
</style>
