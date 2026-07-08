<!--
 * @copyright 2026 Joe Huss <detain@interserver.net>
-->

<script setup lang="ts">
/**
 * Admin LiveTvPage (RA.11) — Live TV / DVR administration, ported 1:1 from the
 * deleted React `LiveTvPage` (the largest admin surface) onto the `@phlix/ui`
 * primitives. Four collapsible sections:
 *   1. Tuners — discovered / configured TV tuners (scan, enable/disable, remove)
 *   2. Guide / EPG — programme guide with a Today/+1/+2 day picker + refresh
 *   3. Recordings — DVR recordings with All / Upcoming / By Series tabs + manual schedule
 *   4. Series Rules — auto-DVR rules
 *
 * Each section lazy-loads on first expand (matching the React source); every
 * mutation refetches / patches local state. Errors surface as toasts. The page
 * has a clean a/b seam — sections 1+2 (Channels/Guide) and 3+4 (DVR/Recordings)
 * are independent — but is kept as one file per the RA.11 spec.
 */
import { ref, reactive, computed, watch, onMounted, inject, type ComputedRef } from 'vue';
import { ApiClient } from '../../api/client';
import { LocalStorageTokenStore } from '../../api/tokenStore';
import {
  AdminLiveTvApi,
  type Tuner,
  type Channel,
  type Program,
  type Recording,
  type SeriesRule,
} from '../../api/admin/liveTv';
import { useToastStore } from '../../stores/useToastStore';
import { errMessage } from '../../api/errors';
import Badge from '../../components/ui/Badge.vue';
import PageHint from '../../components/ui/PageHint.vue';
import Button from '../../components/ui/Button.vue';
import Modal from '../../components/ui/Modal.vue';
import Select from '../../components/ui/Select.vue';
import Switch from '../../components/ui/Switch.vue';
import Skeleton from '../../components/ui/Skeleton.vue';
import EmptyState from '../../components/ui/EmptyState.vue';
import Icon from '../../components/Icon.vue';
import { nextEnabledIndex, type SelectOptionInput } from '../../components/ui/listbox';

type RecordingTab = 'all' | 'upcoming' | 'by-series';

const props = defineProps<{
  /** Inject a pre-built API client for tests; otherwise one is built from `apiBase`. */
  client?: ApiClient;
}>();

const injectedApiBase = inject<string | ComputedRef<string> | undefined>('apiBase', '');
const apiBase = computed(() =>
  typeof injectedApiBase === 'string' ? injectedApiBase : injectedApiBase?.value ?? '',
);
const api = new AdminLiveTvApi(
  props.client ?? new ApiClient({ baseUrl: apiBase.value, tokenStore: new LocalStorageTokenStore() }),
);
const toasts = useToastStore();

// ── Utility helpers ───────────────────────────────────────────────────────────
function formatDuration(startSecs: number, endSecs: number): string {
  const mins = Math.round((endSecs - startSecs) / 60);
  if (mins < 60) return `${mins}m`;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
}
function formatDate(ts: number): string {
  return new Date(ts * 1000).toLocaleDateString();
}
function formatTime(ts: number): string {
  return new Date(ts * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}
function formatSize(bytes: number): string {
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}
function episodeCode(season?: number, episode?: number): string {
  return `S${String(season ?? 0).padStart(2, '0')}E${String(episode ?? 0).padStart(2, '0')}`;
}

// ── Section expand / collapse ─────────────────────────────────────────────────
const expanded = reactive<Record<'tuners' | 'guide' | 'recordings' | 'seriesRules', boolean>>({
  tuners: true,
  guide: false,
  recordings: false,
  seriesRules: false,
});

function toggleSection(section: keyof typeof expanded): void {
  expanded[section] = !expanded[section];
}

// ── Channels (shared across sections) ─────────────────────────────────────────
const channels = ref<Channel[]>([]);

async function loadChannels(): Promise<void> {
  try {
    channels.value = await api.listChannels();
  } catch {
    // channels are optional for some views; silently ignore
  }
}

const channelOptions = computed<SelectOptionInput[]>(() =>
  channels.value.map((c) => ({ value: c.id, label: `${c.name} (${c.number})` })),
);

function channelLabel(rule: SeriesRule): string {
  const channel = channels.value.find((c) => c.id === rule.channel_id);
  return channel ? `${channel.name} (${channel.number})` : rule.channel_id ?? 'Any channel';
}

// ── Tuners section ─────────────────────────────────────────────────────────────
const tuners = ref<Tuner[]>([]);
const tunersLoading = ref(false);
const tunersLoaded = ref(false);
const scanning = ref(false);
const tunerBusy = reactive<Record<string, boolean>>({});

const tunersError = ref<string | null>(null);

async function loadTuners(): Promise<void> {
  tunersLoading.value = true;
  tunersError.value = null;
  try {
    tuners.value = await api.listTuners();
    tunersLoaded.value = true;
  } catch (e) {
    tunersError.value = errMessage(e, 'Failed to load tuners.');
    toasts.error(tunersError.value);
  } finally {
    tunersLoading.value = false;
  }
}

async function handleScanTuners(): Promise<void> {
  if (scanning.value) return;
  scanning.value = true;
  try {
    const discovered = await api.scanTuners();
    tuners.value = discovered;
    tunersLoaded.value = true;
    toasts.success(`Scan complete. Found ${discovered.length} tuner(s).`);
  } catch (e) {
    toasts.error(errMessage(e, 'Tuner scan failed.'));
  } finally {
    scanning.value = false;
  }
}

async function handleToggleTuner(tuner: Tuner): Promise<void> {
  if (tunerBusy[tuner.tuner_id]) return;
  tunerBusy[tuner.tuner_id] = true;
  try {
    const updated = await api.updateTuner(tuner.tuner_id, { enabled: !tuner.enabled });
    tuners.value = tuners.value.map((t) => (t.tuner_id === tuner.tuner_id ? { ...t, ...updated } : t));
  } catch (e) {
    toasts.error(errMessage(e, 'Failed to update tuner.'));
  } finally {
    tunerBusy[tuner.tuner_id] = false;
  }
}

const deletingTuner = ref<Tuner | null>(null);

async function confirmDeleteTuner(): Promise<void> {
  const target = deletingTuner.value;
  if (!target) return;
  try {
    await api.deleteTuner(target.tuner_id);
    tuners.value = tuners.value.filter((t) => t.tuner_id !== target.tuner_id);
    toasts.success('Tuner removed.');
    deletingTuner.value = null;
  } catch (e) {
    toasts.error(errMessage(e, 'Failed to delete tuner.'));
    deletingTuner.value = null;
  }
}

const tunerSummary = computed(() => {
  if (tunersLoading.value) return 'Loading…';
  if (tuners.value.length === 0) return 'No tuners found';
  return `${tuners.value.length} tuner${tuners.value.length !== 1 ? 's' : ''} configured`;
});

// ── Guide section ───────────────────────────────────────────────────────────────
const programs = ref<Program[]>([]);
const programsLoading = ref(false);
const programsLoaded = ref(false);
const guideOffset = ref(0);
const selectedProgramId = ref<string | null>(null);
const refreshing = ref(false);

const GUIDE_DAYS = ['Today', '+1 Day', '+2 Days'];

const programsError = ref<string | null>(null);

async function loadGuide(offset: number): Promise<void> {
  programsLoading.value = true;
  programsError.value = null;
  try {
    const now = Math.floor(Date.now() / 1000);
    const from = now + offset * 86400;
    const to = from + 86400;
    programs.value = await api.listGuide({ from, to });
    programsLoaded.value = true;
  } catch (e) {
    programsError.value = errMessage(e, 'Failed to load guide.');
    toasts.error(programsError.value);
  } finally {
    programsLoading.value = false;
  }
}

function selectGuideDay(offset: number): void {
  guideOffset.value = offset;
  void loadGuide(offset);
}

function toggleProgram(prog: Program): void {
  selectedProgramId.value = selectedProgramId.value === prog.id ? null : prog.id;
}

async function handleRefreshGuide(): Promise<void> {
  if (refreshing.value) return;
  refreshing.value = true;
  try {
    const count = await api.refreshGuide();
    toasts.success(`Guide refreshed. ${count} programmes imported.`);
    await loadGuide(guideOffset.value);
  } catch (e) {
    toasts.error(errMessage(e, 'Guide refresh failed.'));
  } finally {
    refreshing.value = false;
  }
}

const guideSummary = computed(() => {
  if (programsLoading.value) return 'Loading…';
  return programs.value.length > 0 ? `${programs.value.length} programmes` : 'No programmes';
});

// ── Recordings section ─────────────────────────────────────────────────────────
const recordings = ref<Recording[]>([]);
const recordingsLoading = ref(false);
const recordingsLoaded = ref(false);
const recordingTab = ref<RecordingTab>('all');

const RECORDING_TABS: ReadonlyArray<{ value: RecordingTab; label: string }> = [
  { value: 'all', label: 'All Recordings' },
  { value: 'upcoming', label: 'Upcoming' },
  { value: 'by-series', label: 'By Series' },
];

const recTablistEl = ref<HTMLElement | null>(null);

/** Roving-tabindex keyboard nav for the Recordings filter tablist (matches `ui/Tabs`). */
function focusRecTabAt(index: number): void {
  recTablistEl.value?.querySelectorAll<HTMLButtonElement>('[role="tab"]')[index]?.focus();
}

function onRecTabKeydown(e: KeyboardEvent): void {
  const opts = RECORDING_TABS.map((t) => ({ value: t.value, label: t.label }));
  const current = RECORDING_TABS.findIndex((t) => t.value === recordingTab.value);
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
    recordingTab.value = RECORDING_TABS[to].value;
    focusRecTabAt(to);
  }
}

const recordingsError = ref<string | null>(null);

async function loadRecordings(): Promise<void> {
  recordingsLoading.value = true;
  recordingsError.value = null;
  try {
    recordings.value = await api.listRecordings();
    recordingsLoaded.value = true;
  } catch (e) {
    recordingsError.value = errMessage(e, 'Failed to load recordings.');
    toasts.error(recordingsError.value);
  } finally {
    recordingsLoading.value = false;
  }
}

const deletingRecording = ref<Recording | null>(null);

async function confirmDeleteRecording(): Promise<void> {
  const target = deletingRecording.value;
  if (!target) return;
  try {
    await api.deleteRecording(target.id);
    recordings.value = recordings.value.filter((r) => r.id !== target.id);
    toasts.success('Recording deleted.');
    deletingRecording.value = null;
  } catch (e) {
    toasts.error(errMessage(e, 'Failed to delete recording.'));
    deletingRecording.value = null;
  }
}

function recordingTone(status?: string): 'success' | 'warning' | 'neutral' {
  if (status === 'completed') return 'success';
  if (status === 'failed') return 'warning';
  return 'neutral';
}

const recordingsSummary = computed(() => {
  if (recordingsLoading.value) return 'Loading…';
  return `${recordings.value.length} recording${recordings.value.length !== 1 ? 's' : ''}`;
});

const recordingsEmptyText = computed(() => {
  if (recordingTab.value === 'upcoming') return 'No upcoming recordings.';
  if (recordingTab.value === 'by-series') return 'No series recordings.';
  return 'No recordings yet.';
});

// ── Schedule Recording modal ───────────────────────────────────────────────────
const scheduleOpen = ref(false);
const schedChannelId = ref<string>('');
const schedTitle = ref('');
const schedStartDate = ref('');
const schedStartTime = ref('');
const schedEndDate = ref('');
const schedEndTime = ref('');
const schedSubmitting = ref(false);

async function openScheduleModal(): Promise<void> {
  await loadChannels();
  schedChannelId.value = channels.value[0]?.id ?? '';
  schedTitle.value = '';
  schedStartDate.value = '';
  schedStartTime.value = '';
  schedEndDate.value = '';
  schedEndTime.value = '';
  scheduleOpen.value = true;
}

function closeScheduleModal(): void {
  scheduleOpen.value = false;
}

async function submitSchedule(): Promise<void> {
  if (!schedChannelId.value) {
    toasts.error('Channel is required.');
    return;
  }
  if (!schedTitle.value.trim()) {
    toasts.error('Title is required.');
    return;
  }
  if (!schedStartDate.value || !schedStartTime.value || !schedEndDate.value || !schedEndTime.value) {
    toasts.error('Start and end date/time are required.');
    return;
  }
  const start = Math.floor(new Date(`${schedStartDate.value}T${schedStartTime.value}`).getTime() / 1000);
  const end = Math.floor(new Date(`${schedEndDate.value}T${schedEndTime.value}`).getTime() / 1000);
  if (end <= start) {
    toasts.error('End must be after start.');
    return;
  }
  schedSubmitting.value = true;
  try {
    const recording = await api.createRecording({
      channel_id: schedChannelId.value,
      start_time: start,
      end_time: end,
      title: schedTitle.value.trim(),
    });
    recordings.value = [...recordings.value, recording];
    toasts.success('Recording scheduled.');
    closeScheduleModal();
  } catch (e) {
    toasts.error(errMessage(e, 'Failed to schedule recording.'));
  } finally {
    schedSubmitting.value = false;
  }
}

// ── Series Rules section ───────────────────────────────────────────────────────
const rules = ref<SeriesRule[]>([]);
const rulesLoading = ref(false);
const rulesLoaded = ref(false);

const rulesError = ref<string | null>(null);

async function loadRules(): Promise<void> {
  rulesLoading.value = true;
  rulesError.value = null;
  try {
    rules.value = await api.listSeriesRules();
    rulesLoaded.value = true;
  } catch (e) {
    rulesError.value = errMessage(e, 'Failed to load series rules.');
    toasts.error(rulesError.value);
  } finally {
    rulesLoading.value = false;
  }
}

const deletingRule = ref<SeriesRule | null>(null);

async function confirmDeleteRule(): Promise<void> {
  const target = deletingRule.value;
  if (!target) return;
  try {
    await api.deleteSeriesRule(target.id);
    rules.value = rules.value.filter((r) => r.id !== target.id);
    toasts.success('Series rule deleted.');
    deletingRule.value = null;
  } catch (e) {
    toasts.error(errMessage(e, 'Failed to delete rule.'));
    deletingRule.value = null;
  }
}

const rulesSummary = computed(() => {
  if (rulesLoading.value) return 'Loading…';
  return `${rules.value.length} rule${rules.value.length !== 1 ? 's' : ''}`;
});

// ── Add Rule modal ──────────────────────────────────────────────────────────────
const ruleOpen = ref(false);
const ruleTitlePattern = ref('');
const ruleChannelId = ref<string>('');
const ruleKeepUntil = ref<string>('space');
const rulePriority = ref(3);
const ruleSubmitting = ref(false);

const KEEP_OPTIONS: SelectOptionInput[] = [
  { value: 'space', label: 'Until space needed' },
  { value: 'forever', label: 'Forever' },
];

async function openRuleModal(): Promise<void> {
  await loadChannels();
  ruleTitlePattern.value = '';
  ruleChannelId.value = channels.value[0]?.id ?? '';
  ruleKeepUntil.value = 'space';
  rulePriority.value = 3;
  ruleOpen.value = true;
}

function closeRuleModal(): void {
  ruleOpen.value = false;
}

async function submitRule(): Promise<void> {
  if (!ruleTitlePattern.value.trim()) {
    toasts.error('Title pattern is required.');
    return;
  }
  if (!ruleChannelId.value) {
    toasts.error('Channel is required.');
    return;
  }
  ruleSubmitting.value = true;
  try {
    const rule = await api.createSeriesRule({
      series_id: `local-${Date.now()}`,
      channel_id: ruleChannelId.value,
      title: ruleTitlePattern.value.trim(),
      priority: rulePriority.value,
      keep_until: ruleKeepUntil.value,
    });
    rules.value = [...rules.value, rule];
    toasts.success('Series rule created.');
    closeRuleModal();
  } catch (e) {
    toasts.error(errMessage(e, 'Failed to create rule.'));
  } finally {
    ruleSubmitting.value = false;
  }
}

// ── Lazy-load on first expand (matches the React useEffect gating) ─────────────
watch(
  () => expanded.tuners,
  (open) => {
    if (open && !tunersLoaded.value) void loadTuners();
  },
  { immediate: true },
);
watch(
  () => expanded.guide,
  (open) => {
    if (open && !programsLoaded.value) void loadGuide(guideOffset.value);
  },
);
watch(
  () => expanded.recordings,
  (open) => {
    if (open && !recordingsLoaded.value) void loadRecordings();
  },
);
watch(
  () => expanded.seriesRules,
  (open) => {
    if (open && !rulesLoaded.value) {
      void loadRules();
      void loadChannels();
    }
  },
);

onMounted(() => {
  // Tuners are expanded by default; the immediate watch above triggers its load.
});
</script>

<template>
  <section class="admin-livetv" aria-labelledby="livetv-heading">
    <header class="admin-livetv__head">
      <h1 id="livetv-heading" class="admin-livetv__title">Live TV / DVR</h1>
    </header>

    <PageHint>
      Set up over-the-air or IPTV channels and record them. In <strong>Tuners</strong>,
      <strong>Scan for Tuners</strong> finds devices on your network, which you can then enable or
      remove. The <strong>Guide</strong> shows what's on — pick a day and
      <strong>Refresh Guide</strong> to update listings. <strong>Recordings</strong> lists what's
      scheduled or captured (<strong>Schedule Recording</strong> adds one manually), and
      <strong>Series Rules</strong> auto-records a show every time it airs.
    </PageHint>

    <!-- ── Section 1: Tuners ────────────────────────────────────────────── -->
    <section class="admin-livetv__section" aria-labelledby="livetv-tuners-heading">
      <button
        type="button"
        class="admin-livetv__section-header"
        :aria-expanded="expanded.tuners"
        aria-controls="livetv-tuners-body"
        @click="toggleSection('tuners')"
      >
        <span class="admin-livetv__section-title-row">
          <Icon name="tv" class="admin-livetv__section-icon" />
          <h2 id="livetv-tuners-heading" class="admin-livetv__section-title">Tuners</h2>
          <Icon
            :name="expanded.tuners ? 'chevron-up' : 'chevron-down'"
            class="admin-livetv__chevron"
          />
        </span>
        <span class="admin-livetv__section-summary">{{ tunerSummary }}</span>
      </button>

      <div v-if="expanded.tuners" id="livetv-tuners-body" class="admin-livetv__section-body">
        <div class="admin-livetv__toolbar">
          <Button
            variant="solid"
            size="sm"
            left-icon="monitor"
            :loading="scanning"
            @click="handleScanTuners"
          >
            Scan for Tuners
          </Button>
        </div>

        <div v-if="tunersLoading" class="admin-livetv__skel"><Skeleton variant="text" :lines="3" /></div>
        <EmptyState
          v-else-if="tunersError"
          icon="alert"
          title="Couldn't load tuners"
          :description="tunersError"
        >
          <template #actions>
            <Button variant="solid" size="sm" left-icon="rewind" @click="loadTuners">Retry</Button>
          </template>
        </EmptyState>
        <EmptyState
          v-else-if="tuners.length === 0"
          icon="tv"
          title="No tuners found"
          description="Scan for Tuners to discover HDHomeRun devices on your network."
        />
        <div v-else class="admin-livetv__card-grid">
          <article v-for="tuner in tuners" :key="tuner.tuner_id" class="admin-livetv__card">
            <div class="admin-livetv__card-head">
              <span class="admin-livetv__card-title-row">
                <Badge :tone="tuner.type === 'HDHomeRun' ? 'accent' : 'info'">{{ tuner.type }}</Badge>
                <span class="admin-livetv__card-name">{{ tuner.name }}</span>
              </span>
              <Badge :tone="tuner.enabled ? 'success' : 'neutral'">
                {{ tuner.enabled ? 'Enabled' : 'Disabled' }}
              </Badge>
            </div>
            <dl class="admin-livetv__dl">
              <dt>Host</dt>
              <dd>{{ tuner.host }}:{{ tuner.port }}</dd>
              <template v-if="tuner.device_id">
                <dt>Device ID</dt>
                <dd>{{ tuner.device_id }}</dd>
              </template>
              <template v-if="tuner.last_seen">
                <dt>Last Seen</dt>
                <dd>{{ new Date(tuner.last_seen).toLocaleString() }}</dd>
              </template>
              <template v-if="tuner.status">
                <dt>Status</dt>
                <dd>{{ tuner.status }}</dd>
              </template>
            </dl>
            <div class="admin-livetv__card-actions">
              <Switch
                :model-value="Boolean(tuner.enabled)"
                :disabled="tunerBusy[tuner.tuner_id]"
                :label="tuner.enabled ? 'Enabled' : 'Disabled'"
                @update:model-value="handleToggleTuner(tuner)"
              />
              <Button
                variant="ghost"
                size="sm"
                :aria-label="`Remove tuner ${tuner.name}`"
                @click="deletingTuner = tuner"
              >
                Remove
              </Button>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- ── Section 2: Guide / EPG ───────────────────────────────────────── -->
    <section class="admin-livetv__section" aria-labelledby="livetv-guide-heading">
      <button
        type="button"
        class="admin-livetv__section-header"
        :aria-expanded="expanded.guide"
        aria-controls="livetv-guide-body"
        @click="toggleSection('guide')"
      >
        <span class="admin-livetv__section-title-row">
          <Icon name="calendar" class="admin-livetv__section-icon" />
          <h2 id="livetv-guide-heading" class="admin-livetv__section-title">Guide / EPG</h2>
          <Icon
            :name="expanded.guide ? 'chevron-up' : 'chevron-down'"
            class="admin-livetv__chevron"
          />
        </span>
        <span class="admin-livetv__section-summary">{{ guideSummary }}</span>
      </button>

      <div v-if="expanded.guide" id="livetv-guide-body" class="admin-livetv__section-body">
        <div class="admin-livetv__toolbar">
          <div class="admin-livetv__segmented" role="group" aria-label="Guide date">
            <button
              v-for="(label, i) in GUIDE_DAYS"
              :key="label"
              type="button"
              class="admin-livetv__seg-btn"
              :class="{ 'is-active': guideOffset === i }"
              :aria-pressed="guideOffset === i"
              @click="selectGuideDay(i)"
            >
              {{ label }}
            </button>
          </div>
          <Button variant="outline" size="sm" left-icon="rewind" :loading="refreshing" @click="handleRefreshGuide">
            Refresh Guide
          </Button>
        </div>

        <div v-if="programsLoading" class="admin-livetv__skel"><Skeleton variant="text" :lines="4" /></div>
        <EmptyState
          v-else-if="programsError"
          icon="alert"
          title="Couldn't load guide"
          :description="programsError"
        >
          <template #actions>
            <Button variant="solid" size="sm" left-icon="rewind" @click="loadGuide(guideOffset)">Retry</Button>
          </template>
        </EmptyState>
        <EmptyState
          v-else-if="programs.length === 0"
          icon="calendar"
          title="No programmes"
          description="No programmes listed for this date. Try a different day or refresh the guide."
        />
        <div v-else class="admin-livetv__guide-grid">
          <div
            v-for="prog in programs"
            :key="prog.id"
            class="admin-livetv__program"
            :class="{ 'is-selected': selectedProgramId === prog.id }"
            role="button"
            tabindex="0"
            :aria-pressed="selectedProgramId === prog.id"
            :aria-label="`${prog.title}, ${formatTime(prog.start_time)} to ${formatTime(prog.end_time)}`"
            @click="toggleProgram(prog)"
            @keydown.enter.prevent="toggleProgram(prog)"
            @keydown.space.prevent="toggleProgram(prog)"
          >
            <div class="admin-livetv__program-time">
              {{ formatTime(prog.start_time) }} – {{ formatTime(prog.end_time) }}
            </div>
            <div class="admin-livetv__program-title">{{ prog.title }}</div>
            <p v-if="prog.description && selectedProgramId !== prog.id" class="admin-livetv__program-desc">
              {{ prog.description.slice(0, 100) }}{{ prog.description.length > 100 ? '…' : '' }}
            </p>
            <div v-if="selectedProgramId === prog.id" class="admin-livetv__program-expanded">
              <p v-if="prog.description" class="admin-livetv__program-full-desc">{{ prog.description }}</p>
              <div class="admin-livetv__program-meta">
                <Badge v-if="prog.rating" tone="neutral">Rating: {{ prog.rating }}</Badge>
                <Badge v-if="prog.season" tone="info">
                  {{ episodeCode(prog.season, prog.episode) }}
                </Badge>
                <Badge v-if="prog.year" tone="neutral">{{ prog.year }}</Badge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Section 3: Recordings ────────────────────────────────────────── -->
    <section class="admin-livetv__section" aria-labelledby="livetv-recordings-heading">
      <button
        type="button"
        class="admin-livetv__section-header"
        :aria-expanded="expanded.recordings"
        aria-controls="livetv-recordings-body"
        @click="toggleSection('recordings')"
      >
        <span class="admin-livetv__section-title-row">
          <Icon name="film" class="admin-livetv__section-icon" />
          <h2 id="livetv-recordings-heading" class="admin-livetv__section-title">Recordings</h2>
          <Icon
            :name="expanded.recordings ? 'chevron-up' : 'chevron-down'"
            class="admin-livetv__chevron"
          />
        </span>
        <span class="admin-livetv__section-summary">{{ recordingsSummary }}</span>
      </button>

      <div v-if="expanded.recordings" id="livetv-recordings-body" class="admin-livetv__section-body">
        <div class="admin-livetv__toolbar">
          <div
            ref="recTablistEl"
            class="admin-livetv__segmented"
            role="tablist"
            aria-label="Recording filter"
            @keydown="onRecTabKeydown"
          >
            <button
              v-for="tab in RECORDING_TABS"
              :id="`rec-tab-${tab.value}`"
              :key="tab.value"
              type="button"
              role="tab"
              class="admin-livetv__seg-btn"
              :class="{ 'is-active': recordingTab === tab.value }"
              :aria-selected="recordingTab === tab.value"
              :aria-controls="`rec-panel-${tab.value}`"
              :tabindex="recordingTab === tab.value ? 0 : -1"
              @click="recordingTab = tab.value"
            >
              {{ tab.label }}
            </button>
          </div>
          <Button variant="solid" size="sm" left-icon="plus" @click="openScheduleModal">
            Schedule Recording
          </Button>
        </div>

        <!-- Filtered recordings — the tabpanel controlled by the RECORDING_TABS tablist -->
        <div
          :id="`rec-panel-${recordingTab}`"
          role="tabpanel"
          :aria-labelledby="`rec-tab-${recordingTab}`"
        >
        <div v-if="recordingsLoading" class="admin-livetv__skel"><Skeleton variant="text" :lines="3" /></div>
        <EmptyState
          v-else-if="recordingsError"
          icon="alert"
          title="Couldn't load recordings"
          :description="recordingsError"
        >
          <template #actions>
            <Button variant="solid" size="sm" left-icon="rewind" @click="loadRecordings">Retry</Button>
          </template>
        </EmptyState>
        <EmptyState
          v-else-if="recordings.length === 0"
          icon="film"
          title="No recordings"
          :description="recordingsEmptyText"
        />
        <div v-else class="admin-livetv__rec-list">
          <article v-for="rec in recordings" :key="rec.id" class="admin-livetv__card">
            <div class="admin-livetv__card-head">
              <span class="admin-livetv__card-name">{{ rec.program_title ?? 'Untitled' }}</span>
              <Badge v-if="rec.status" :tone="recordingTone(rec.status)">{{ rec.status }}</Badge>
            </div>
            <div class="admin-livetv__rec-meta">
              <span>{{ rec.channel_name ?? rec.channel_id }}</span>
              <span>
                {{ formatDate(rec.start_time) }} ·
                {{ formatTime(rec.start_time) }} – {{ formatTime(rec.end_time) }}
              </span>
              <span>{{ formatDuration(rec.start_time, rec.end_time) }}</span>
              <span v-if="rec.size">{{ formatSize(rec.size) }}</span>
            </div>
            <div class="admin-livetv__card-actions">
              <Button
                variant="ghost"
                size="sm"
                :aria-label="`Delete recording ${rec.program_title ?? rec.id}`"
                @click="deletingRecording = rec"
              >
                Delete
              </Button>
            </div>
          </article>
        </div>
        </div>
      </div>
    </section>

    <!-- ── Section 4: Series Rules ──────────────────────────────────────── -->
    <section class="admin-livetv__section" aria-labelledby="livetv-rules-heading">
      <button
        type="button"
        class="admin-livetv__section-header"
        :aria-expanded="expanded.seriesRules"
        aria-controls="livetv-rules-body"
        @click="toggleSection('seriesRules')"
      >
        <span class="admin-livetv__section-title-row">
          <Icon name="list" class="admin-livetv__section-icon" />
          <h2 id="livetv-rules-heading" class="admin-livetv__section-title">Series Rules</h2>
          <Icon
            :name="expanded.seriesRules ? 'chevron-up' : 'chevron-down'"
            class="admin-livetv__chevron"
          />
        </span>
        <span class="admin-livetv__section-summary">{{ rulesSummary }}</span>
      </button>

      <div v-if="expanded.seriesRules" id="livetv-rules-body" class="admin-livetv__section-body">
        <div class="admin-livetv__toolbar">
          <Button variant="solid" size="sm" left-icon="plus" @click="openRuleModal">Add Rule</Button>
        </div>

        <div v-if="rulesLoading" class="admin-livetv__skel"><Skeleton variant="text" :lines="3" /></div>
        <EmptyState
          v-else-if="rulesError"
          icon="alert"
          title="Couldn't load series rules"
          :description="rulesError"
        >
          <template #actions>
            <Button variant="solid" size="sm" left-icon="rewind" @click="loadRules">Retry</Button>
          </template>
        </EmptyState>
        <EmptyState
          v-else-if="rules.length === 0"
          icon="list"
          title="No series rules"
          description="Add a rule to automatically record programmes by title pattern."
        />
        <div v-else class="admin-livetv__rule-list">
          <article v-for="rule in rules" :key="rule.id" class="admin-livetv__rule">
            <div class="admin-livetv__rule-info">
              <span class="admin-livetv__rule-title">{{ rule.title_pattern }}</span>
              <div class="admin-livetv__rule-meta">
                <span>{{ channelLabel(rule) }}</span>
                <Badge v-if="rule.priority" tone="info">Priority {{ rule.priority }}</Badge>
                <Badge v-if="rule.keep_until" tone="neutral">Keep: {{ rule.keep_until }}</Badge>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              :aria-label="`Delete series rule ${rule.title_pattern}`"
              @click="deletingRule = rule"
            >
              Delete
            </Button>
          </article>
        </div>
      </div>
    </section>

    <!-- ── Schedule Recording modal ─────────────────────────────────────── -->
    <Modal v-model="scheduleOpen" title="Schedule Recording" @close="closeScheduleModal">
      <form class="admin-livetv__form" @submit.prevent="submitSchedule">
        <label class="admin-livetv__field">
          <span class="admin-livetv__label">Title</span>
          <input v-model="schedTitle" type="text" class="admin-livetv__input" placeholder="e.g. News at Six" />
        </label>
        <label class="admin-livetv__field">
          <span class="admin-livetv__label">Channel</span>
          <Select v-model="schedChannelId" :options="channelOptions" label="Channel" placeholder="Select a channel" />
        </label>
        <div class="admin-livetv__field-row">
          <label class="admin-livetv__field">
            <span class="admin-livetv__label">Start Date</span>
            <input v-model="schedStartDate" type="date" class="admin-livetv__input" />
          </label>
          <label class="admin-livetv__field">
            <span class="admin-livetv__label">Start Time</span>
            <input v-model="schedStartTime" type="time" class="admin-livetv__input" />
          </label>
        </div>
        <div class="admin-livetv__field-row">
          <label class="admin-livetv__field">
            <span class="admin-livetv__label">End Date</span>
            <input v-model="schedEndDate" type="date" class="admin-livetv__input" />
          </label>
          <label class="admin-livetv__field">
            <span class="admin-livetv__label">End Time</span>
            <input v-model="schedEndTime" type="time" class="admin-livetv__input" />
          </label>
        </div>
      </form>
      <template #footer>
        <Button variant="ghost" size="sm" @click="closeScheduleModal">Cancel</Button>
        <Button variant="solid" size="sm" :loading="schedSubmitting" @click="submitSchedule">
          Schedule Recording
        </Button>
      </template>
    </Modal>

    <!-- ── Add Rule modal ───────────────────────────────────────────────── -->
    <Modal v-model="ruleOpen" title="Add Series Rule" @close="closeRuleModal">
      <form class="admin-livetv__form" @submit.prevent="submitRule">
        <label class="admin-livetv__field">
          <span class="admin-livetv__label">Title Pattern</span>
          <input
            v-model="ruleTitlePattern"
            type="text"
            class="admin-livetv__input"
            placeholder="e.g. News% or The Simpsons"
          />
          <span class="admin-livetv__hint">
            Use % as a wildcard, e.g. "News%" matches all programmes starting with News.
          </span>
        </label>
        <label class="admin-livetv__field">
          <span class="admin-livetv__label">Channel</span>
          <Select v-model="ruleChannelId" :options="channelOptions" label="Channel" placeholder="Select a channel" />
        </label>
        <label class="admin-livetv__field">
          <span class="admin-livetv__label">Priority (1–5)</span>
          <input
            :value="rulePriority"
            type="number"
            class="admin-livetv__input"
            min="1"
            max="5"
            @input="rulePriority = Number(($event.target as HTMLInputElement).value)"
          />
          <span class="admin-livetv__hint">Higher priority recordings are scheduled first.</span>
        </label>
        <label class="admin-livetv__field">
          <span class="admin-livetv__label">Keep Until</span>
          <Select v-model="ruleKeepUntil" :options="KEEP_OPTIONS" label="Keep until" />
        </label>
      </form>
      <template #footer>
        <Button variant="ghost" size="sm" @click="closeRuleModal">Cancel</Button>
        <Button variant="solid" size="sm" :loading="ruleSubmitting" @click="submitRule">Add Rule</Button>
      </template>
    </Modal>

    <!-- ── Delete confirm modals ────────────────────────────────────────── -->
    <Modal
      :model-value="deletingTuner !== null"
      title="Remove tuner"
      size="sm"
      @update:model-value="deletingTuner = null"
    >
      <p>Remove tuner <strong>{{ deletingTuner?.name }}</strong>? This cannot be undone.</p>
      <template #footer>
        <Button variant="ghost" size="sm" @click="deletingTuner = null">Cancel</Button>
        <Button variant="solid" size="sm" @click="confirmDeleteTuner">Remove</Button>
      </template>
    </Modal>

    <Modal
      :model-value="deletingRecording !== null"
      title="Delete recording"
      size="sm"
      @update:model-value="deletingRecording = null"
    >
      <p>
        Delete recording <strong>{{ deletingRecording?.program_title ?? deletingRecording?.id }}</strong>?
      </p>
      <template #footer>
        <Button variant="ghost" size="sm" @click="deletingRecording = null">Cancel</Button>
        <Button variant="solid" size="sm" @click="confirmDeleteRecording">Delete</Button>
      </template>
    </Modal>

    <Modal
      :model-value="deletingRule !== null"
      title="Delete series rule"
      size="sm"
      @update:model-value="deletingRule = null"
    >
      <p>Delete series rule <strong>{{ deletingRule?.title_pattern }}</strong>?</p>
      <template #footer>
        <Button variant="ghost" size="sm" @click="deletingRule = null">Cancel</Button>
        <Button variant="solid" size="sm" @click="confirmDeleteRule">Delete</Button>
      </template>
    </Modal>
  </section>
</template>

<style scoped>
.admin-livetv {
  max-width: 1100px;
  margin: 0 auto;
  padding: var(--space-6);
}
.admin-livetv__head {
  margin-bottom: var(--space-6);
}
.admin-livetv__title {
  font-family: var(--font-display);
  font-weight: var(--font-semibold);
  font-size: var(--text-xl);
  letter-spacing: var(--tracking-tight);
  color: var(--text);
}

/* Sections */
.admin-livetv__section {
  margin-bottom: var(--space-4);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  background: var(--surface-1, var(--surface));
  overflow: hidden;
}
.admin-livetv__section-header {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  width: 100%;
  padding: var(--space-4);
  text-align: left;
  background: transparent;
  border: none;
  cursor: pointer;
  color: var(--text);
  transition: background var(--dur-fast) var(--ease-out);
}
.admin-livetv__section-header:hover {
  background: var(--surface-glass-strong);
}
.admin-livetv__section-header:focus-visible {
  outline: none;
  box-shadow: inset 0 0 0 3px var(--accent-ring);
}
.admin-livetv__section-title-row {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}
.admin-livetv__section-icon {
  color: var(--accent-text);
}
.admin-livetv__section-title {
  font-family: var(--font-display);
  font-weight: var(--font-semibold);
  font-size: var(--text-lg);
  letter-spacing: var(--tracking-tight);
  color: var(--text);
}
.admin-livetv__chevron {
  margin-left: auto;
  color: var(--text-subtle);
}
.admin-livetv__section-summary {
  font-size: var(--text-sm);
  color: var(--text-subtle);
}
.admin-livetv__section-body {
  padding: var(--space-4);
  border-top: 1px solid var(--border-subtle);
}

/* Toolbars */
.admin-livetv__toolbar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-3);
  margin-bottom: var(--space-4);
}
.admin-livetv__skel {
  padding-block: var(--space-2);
}

/* Segmented control (date picker / recording tabs) */
.admin-livetv__segmented {
  display: inline-flex;
  gap: var(--space-1);
  padding: var(--space-1);
  border-radius: var(--radius-md);
  background: var(--surface-glass-strong);
}
.admin-livetv__seg-btn {
  padding: var(--space-1) var(--space-3);
  border: none;
  border-radius: var(--radius-sm);
  background: transparent;
  color: var(--text-muted);
  font: inherit;
  font-size: var(--text-sm);
  cursor: pointer;
  transition: background var(--dur-fast) var(--ease-out), color var(--dur-fast) var(--ease-out);
}
.admin-livetv__seg-btn:hover {
  color: var(--text);
}
.admin-livetv__seg-btn.is-active {
  background: var(--accent);
  color: var(--text-on-accent);
}
.admin-livetv__seg-btn:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px var(--accent-ring);
}

/* Cards */
.admin-livetv__card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--space-4);
}
.admin-livetv__card {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  padding: var(--space-4);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  background: var(--surface);
}
.admin-livetv__card-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-2);
}
.admin-livetv__card-title-row {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}
.admin-livetv__card-name {
  font-weight: var(--font-semibold);
  color: var(--text);
}
.admin-livetv__dl {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: var(--space-1) var(--space-3);
  margin: 0;
  font-size: var(--text-sm);
}
.admin-livetv__dl dt {
  color: var(--text-subtle);
  text-transform: uppercase;
  font-size: var(--text-xs);
  letter-spacing: var(--tracking-wide);
}
.admin-livetv__dl dd {
  margin: 0;
  color: var(--text-muted);
}
.admin-livetv__card-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-3);
}

/* Guide grid */
.admin-livetv__guide-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: var(--space-3);
}
.admin-livetv__program {
  padding: var(--space-3);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  background: var(--surface);
  cursor: pointer;
  transition: border-color var(--dur-fast) var(--ease-out);
}
.admin-livetv__program:hover,
.admin-livetv__program.is-selected {
  border-color: var(--accent-ring);
}
.admin-livetv__program:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px var(--accent-ring);
}
.admin-livetv__program-time {
  font-size: var(--text-xs);
  color: var(--text-subtle);
  font-variant-numeric: tabular-nums;
}
.admin-livetv__program-title {
  font-weight: var(--font-semibold);
  color: var(--text);
  margin-top: var(--space-1);
}
.admin-livetv__program-desc,
.admin-livetv__program-full-desc {
  font-size: var(--text-sm);
  color: var(--text-muted);
  margin-top: var(--space-2);
}
.admin-livetv__program-expanded {
  margin-top: var(--space-2);
}
.admin-livetv__program-meta {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  margin-top: var(--space-2);
}

/* Recordings list */
.admin-livetv__rec-list,
.admin-livetv__rule-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}
.admin-livetv__rec-meta {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
  font-size: var(--text-sm);
  color: var(--text-muted);
}

/* Series rules */
.admin-livetv__rule {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-3);
  padding: var(--space-3) var(--space-4);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  background: var(--surface);
}
.admin-livetv__rule-info {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}
.admin-livetv__rule-title {
  font-weight: var(--font-semibold);
  color: var(--text);
}
.admin-livetv__rule-meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--text-sm);
  color: var(--text-muted);
}

/* Forms */
.admin-livetv__form {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}
.admin-livetv__field-row {
  display: flex;
  gap: var(--space-3);
}
.admin-livetv__field-row .admin-livetv__field {
  flex: 1;
}
.admin-livetv__field {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}
.admin-livetv__label {
  font-size: var(--text-xs);
  font-weight: var(--font-semibold);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  color: var(--text-subtle);
}
.admin-livetv__hint {
  font-size: var(--text-xs);
  color: var(--text-subtle);
}
.admin-livetv__input {
  width: 100%;
  height: var(--control-h);
  padding-inline: var(--control-pad-x);
  border-radius: var(--radius-md);
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--text);
  font: inherit;
  font-size: var(--text-sm);
  transition: border-color var(--dur-fast) var(--ease-out), box-shadow var(--dur-base) var(--ease-out);
}
.admin-livetv__input:focus-visible {
  outline: none;
  border-color: var(--accent-ring);
  box-shadow: 0 0 0 3px var(--accent-soft);
}
.admin-livetv__input::placeholder {
  color: var(--text-subtle);
}

@media (prefers-reduced-motion: reduce) {
  .admin-livetv__section-header,
  .admin-livetv__seg-btn,
  .admin-livetv__program,
  .admin-livetv__input {
    transition: none;
  }
}
</style>
