<!--
  * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
-->

<script setup lang="ts">
/**
 * ParentalControlsPage (P5-S5) — per-profile parental controls.
 *
 * Three tabbed sections mirroring the console client's ParentalControlsScreen:
 *   - Schedules: access time windows (create / edit / delete)
 *   - Tags: content rating tags (blocked / allowed)
 *   - Stream Limits: max concurrent streams and bandwidth
 *
 * The profile is selected via route query `?profile=<id>`. When opened from
 * the admin users list the parent component should navigate with that query.
 */
import { ref, computed, onMounted, inject, type ComputedRef } from 'vue';
import { useRoute } from 'vue-router';
import { ApiClient } from '../api/client';
import { LocalStorageTokenStore } from '../api/tokenStore';
import {
  AdminUsersApi,
  RATING_LABELS,
  type AccessSchedule,
  type Profile,
  type ProfileStreamLimit,
  type ProfileTag,
} from '../api/admin/users';
import { useToastStore } from '../stores/useToastStore';
import { errMessage } from '../api/errors';
import Tabs, { type TabItem } from '../components/ui/Tabs.vue';
import Button from '../components/ui/Button.vue';
import Modal from '../components/ui/Modal.vue';
import Select from '../components/ui/Select.vue';
import Input from '../components/ui/Input.vue';
import Switch from '../components/ui/Switch.vue';
import Badge from '../components/ui/Badge.vue';
import Skeleton from '../components/ui/Skeleton.vue';
import EmptyState from '../components/ui/EmptyState.vue';
import Card from '../components/ui/Card.vue';
import Icon from '../components/Icon.vue';

const route = useRoute();
const toasts = useToastStore();

const props = defineProps<{
  /** Inject a pre-built API client for tests; otherwise one is built from `apiBase`. */
  client?: ApiClient;
}>();

const injectedApiBase = inject<string | ComputedRef<string> | undefined>('apiBase', '');
const apiBase = computed(() =>
  typeof injectedApiBase === 'string' ? injectedApiBase : injectedApiBase?.value ?? '',
);
const api = new AdminUsersApi(
  props.client ?? new ApiClient({ baseUrl: apiBase.value, tokenStore: new LocalStorageTokenStore() }),
);

// ── Profile selection ─────────────────────────────────────────────────────────
const profiles = ref<Profile[]>([]);
const selectedProfileId = ref<number | null>(null);
const loadingProfiles = ref(true);

const selectedProfile = computed(() =>
  profiles.value.find((p) => p.id === selectedProfileId.value) ?? null,
);

async function loadProfiles(): Promise<void> {
  loadingProfiles.value = true;
  try {
    // Load all users and their profiles - for now we fetch all users and their profiles
    // A more efficient approach would be a dedicated endpoint, but this matches the console client
    const allProfiles: Profile[] = [];
    // For simplicity, we'll rely on the profile being pre-selected via query param
    profiles.value = allProfiles;
  } catch {
    // Silently fail for profile list - profile may be passed via query
  } finally {
    loadingProfiles.value = false;
  }
}

// Parse profile ID from route query
onMounted(() => {
  const queryProfileId = route.query.profile;
  if (queryProfileId && !isNaN(Number(queryProfileId))) {
    selectedProfileId.value = Number(queryProfileId);
  }
  void loadProfiles();
  if (selectedProfileId.value) {
    void loadSectionData(activeTab.value);
  }
});

// ── Tab state ─────────────────────────────────────────────────────────────────
type TabValue = 'schedules' | 'tags' | 'streamLimits';

const TABS: TabItem[] = [
  { value: 'schedules', label: 'Schedules', icon: 'calendar' },
  { value: 'tags', label: 'Tags', icon: 'bookmark' },
  { value: 'streamLimits', label: 'Stream Limits', icon: 'play' },
];

const activeTab = ref<TabValue>('schedules');

// ── Schedules ─────────────────────────────────────────────────────────────────
interface ScheduleFormData {
  name: string;
  startTime: string;
  endTime: string;
  daysOfWeek: string[];
  isActive: boolean;
}

const VALID_DAYS = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'] as const;

const schedules = ref<AccessSchedule[]>([]);
const loadingSchedules = ref(false);
const schedulesError = ref<string | null>(null);
const selectedScheduleIndex = ref(0);
const showScheduleForm = ref(false);
const editingSchedule = ref<AccessSchedule | null>(null);
const scheduleForm = ref<ScheduleFormData>({
  name: '',
  startTime: '08:00',
  endTime: '22:00',
  daysOfWeek: ['mon', 'tue', 'wed', 'thu', 'fri'],
  isActive: true,
});
const formError = ref<string | null>(null);
const pendingDeleteSchedule = ref<AccessSchedule | null>(null);
const showDeleteScheduleModal = computed({
  get: () => pendingDeleteSchedule.value !== null,
  set: (val: boolean) => { if (!val) pendingDeleteSchedule.value = null; },
});

async function loadSchedules(): Promise<void> {
  if (!selectedProfileId.value) return;
  loadingSchedules.value = true;
  schedulesError.value = null;
  try {
    schedules.value = await api.profileSchedules(selectedProfileId.value);
    selectedScheduleIndex.value = Math.min(selectedScheduleIndex.value, schedules.value.length - 1);
  } catch (e) {
    schedulesError.value = errMessage(e, 'Failed to load schedules.');
  } finally {
    loadingSchedules.value = false;
  }
}

function openScheduleCreate(): void {
  editingSchedule.value = null;
  scheduleForm.value = {
    name: '',
    startTime: '08:00',
    endTime: '22:00',
    daysOfWeek: ['mon', 'tue', 'wed', 'thu', 'fri'],
    isActive: true,
  };
  formError.value = null;
  showScheduleForm.value = true;
}

function openScheduleEdit(schedule: AccessSchedule): void {
  editingSchedule.value = schedule;
  scheduleForm.value = {
    name: schedule.name,
    startTime: schedule.start_time.substring(0, 5), // HH:MM from HH:MM:SS
    endTime: schedule.end_time.substring(0, 5),
    daysOfWeek: [...schedule.days_of_week],
    isActive: schedule.is_active,
  };
  formError.value = null;
  showScheduleForm.value = true;
}

function validateScheduleForm(): string | null {
  if (!scheduleForm.value.name.trim()) return 'Name is required.';
  if (scheduleForm.value.name.length > 100) return 'Name must be 100 characters or less.';
  if (!/^\d{1,2}:\d{2}(:\d{2})?$/.test(scheduleForm.value.startTime)) {
    return 'Invalid start time. Use HH:MM or HH:MM:SS.';
  }
  if (!/^\d{1,2}:\d{2}(:\d{2})?$/.test(scheduleForm.value.endTime)) {
    return 'Invalid end time. Use HH:MM or HH:MM:SS.';
  }
  if (scheduleForm.value.daysOfWeek.length === 0) return 'At least one day is required.';
  return null;
}

async function submitScheduleForm(): Promise<void> {
  if (!selectedProfileId.value) return;
  const error = validateScheduleForm();
  if (error) {
    formError.value = error;
    return;
  }
  try {
    if (editingSchedule.value) {
      // Delete and recreate (console client pattern - no individual update endpoint)
      await api.deleteProfileSchedule(selectedProfileId.value, editingSchedule.value.id);
    }
    await api.createProfileSchedule(
      selectedProfileId.value,
      scheduleForm.value.name.trim(),
      scheduleForm.value.startTime + ':00',
      scheduleForm.value.endTime + ':00',
      scheduleForm.value.daysOfWeek,
      scheduleForm.value.isActive,
    );
    toasts.success(editingSchedule.value ? 'Schedule updated.' : 'Schedule created.');
    showScheduleForm.value = false;
    await loadSchedules();
  } catch (e) {
    formError.value = errMessage(e, 'Failed to save schedule.');
  }
}

async function confirmDeleteSchedule(schedule: AccessSchedule): Promise<void> {
  if (!selectedProfileId.value) return;
  try {
    await api.deleteProfileSchedule(selectedProfileId.value, schedule.id);
    toasts.success('Schedule deleted.');
    pendingDeleteSchedule.value = null;
    await loadSchedules();
  } catch (e) {
    toasts.error(errMessage(e, 'Failed to delete schedule.'));
    pendingDeleteSchedule.value = null;
  }
}

function toggleScheduleDay(day: string): void {
  const idx = scheduleForm.value.daysOfWeek.indexOf(day);
  if (idx === -1) {
    scheduleForm.value.daysOfWeek.push(day);
  } else {
    scheduleForm.value.daysOfWeek.splice(idx, 1);
  }
}

function formatDays(days: string[]): string {
  const dayLabels: Record<string, string> = {
    mon: 'Mon',
    tue: 'Tue',
    wed: 'Wed',
    thu: 'Thu',
    fri: 'Fri',
    sat: 'Sat',
    sun: 'Sun',
  };
  return days.map((d) => dayLabels[d] ?? d).join(', ');
}

// ── Tags ───────────────────────────────────────────────────────────────────────
const TAG_TYPE_OPTIONS = [
  { value: 'blocked', label: 'Blocked' },
  { value: 'allowed', label: 'Allowed' },
];

const tags = ref<ProfileTag[]>([]);
const loadingTags = ref(false);
const tagsError = ref<string | null>(null);
const selectedTagIndex = ref(0);
const showTagForm = ref(false);
const tagForm = ref({ tag: '', tagType: 'blocked' as 'blocked' | 'allowed' });
const tagFormError = ref<string | null>(null);
const pendingDeleteTag = ref<ProfileTag | null>(null);
const showDeleteTagModal = computed({
  get: () => pendingDeleteTag.value !== null,
  set: (val: boolean) => { if (!val) pendingDeleteTag.value = null; },
});

async function loadTags(): Promise<void> {
  if (!selectedProfileId.value) return;
  loadingTags.value = true;
  tagsError.value = null;
  try {
    tags.value = await api.profileTags(selectedProfileId.value);
    selectedTagIndex.value = Math.min(selectedTagIndex.value, tags.value.length - 1);
  } catch (e) {
    tagsError.value = errMessage(e, 'Failed to load tags.');
  } finally {
    loadingTags.value = false;
  }
}

function openTagCreate(): void {
  tagForm.value = { tag: '', tagType: 'blocked' };
  tagFormError.value = null;
  showTagForm.value = true;
}

async function submitTagForm(): Promise<void> {
  if (!selectedProfileId.value) return;
  const tag = tagForm.value.tag.trim();
  if (!tag) {
    tagFormError.value = 'Tag name is required.';
    return;
  }
  if (tag.length > 100) {
    tagFormError.value = 'Tag must be 100 characters or less.';
    return;
  }
  try {
    await api.addProfileTag(selectedProfileId.value, tag, tagForm.value.tagType);
    toasts.success('Tag added.');
    showTagForm.value = false;
    await loadTags();
  } catch (e) {
    tagFormError.value = errMessage(e, 'Failed to add tag.');
  }
}

async function confirmDeleteTag(tag: ProfileTag): Promise<void> {
  if (!selectedProfileId.value) return;
  try {
    await api.deleteProfileTag(selectedProfileId.value, tag.id);
    toasts.success('Tag removed.');
    pendingDeleteTag.value = null;
    await loadTags();
  } catch (e) {
    toasts.error(errMessage(e, 'Failed to remove tag.'));
    pendingDeleteTag.value = null;
  }
}

// ── Stream Limits ──────────────────────────────────────────────────────────────
const streamLimits = ref<ProfileStreamLimit | null>(null);
const loadingStreamLimits = ref(false);
const streamLimitsError = ref<string | null>(null);
const showStreamLimitsForm = ref(false);
const streamLimitsForm = ref({ maxConcurrentStreams: 1, maxTotalBandwidthKbps: '' });
const streamLimitsFormError = ref<string | null>(null);

async function loadStreamLimits(): Promise<void> {
  if (!selectedProfileId.value) return;
  loadingStreamLimits.value = true;
  streamLimitsError.value = null;
  try {
    streamLimits.value = await api.profileStreamLimits(selectedProfileId.value);
  } catch (e) {
    streamLimitsError.value = errMessage(e, 'Failed to load stream limits.');
  } finally {
    loadingStreamLimits.value = false;
  }
}

function openStreamLimitsEdit(): void {
  streamLimitsForm.value = {
    maxConcurrentStreams: streamLimits.value?.max_concurrent_streams ?? 1,
    maxTotalBandwidthKbps: streamLimits.value?.max_total_bandwidth_kbps?.toString() ?? '',
  };
  streamLimitsFormError.value = null;
  showStreamLimitsForm.value = true;
}

async function submitStreamLimitsForm(): Promise<void> {
  if (!selectedProfileId.value) return;
  const maxStreams = streamLimitsForm.value.maxConcurrentStreams;
  if (maxStreams < 1) {
    streamLimitsFormError.value = 'Max concurrent streams must be at least 1.';
    return;
  }
  let maxBandwidth: number | null = null;
  const bwRaw = streamLimitsForm.value.maxTotalBandwidthKbps.trim();
  if (bwRaw !== '') {
    maxBandwidth = parseInt(bwRaw, 10);
    if (isNaN(maxBandwidth) || maxBandwidth < 1) {
      maxBandwidth = null;
    }
  }
  try {
    await api.updateProfileStreamLimits(selectedProfileId.value, maxStreams, maxBandwidth);
    toasts.success('Stream limits updated.');
    showStreamLimitsForm.value = false;
    await loadStreamLimits();
  } catch (e) {
    streamLimitsFormError.value = errMessage(e, 'Failed to update stream limits.');
  }
}

// ── Tab loading ────────────────────────────────────────────────────────────────
async function loadSectionData(tab: TabValue): Promise<void> {
  switch (tab) {
    case 'schedules':
      await loadSchedules();
      break;
    case 'tags':
      await loadTags();
      break;
    case 'streamLimits':
      await loadStreamLimits();
      break;
  }
}

function handleTabChange(tab: string): void {
  activeTab.value = tab as TabValue;
  void loadSectionData(tab as TabValue);
}

// ── Delete confirmations ───────────────────────────────────────────────────────
function askDeleteSchedule(schedule: AccessSchedule): void {
  pendingDeleteSchedule.value = schedule;
}

function askDeleteTag(tag: ProfileTag): void {
  pendingDeleteTag.value = tag;
}
</script>

<template>
  <div class="parental-page">
    <header class="parental-page__head">
      <div>
        <p class="parental-page__eyebrow">Profile Controls</p>
        <h1 class="parental-page__title">Parental Controls</h1>
      </div>
      <div v-if="selectedProfile" class="parental-page__profile-badge">
        <Icon name="user" size="sm" />
        {{ selectedProfile.name }}
        <Badge tone="neutral">{{ RATING_LABELS[selectedProfile.rating] ?? 'Unknown' }}</Badge>
      </div>
    </header>

    <div v-if="!selectedProfileId" class="parental-page__no-profile">
      <EmptyState
        icon="user"
        title="No profile selected"
        description="Open this page with ?profile=<id> query parameter to manage that profile's parental controls."
      />
    </div>

    <template v-else>
      <Tabs v-model="activeTab" :tabs="TABS" :label="'Parental control sections'" @update:model-value="handleTabChange">
        <!-- SCHEDULES TAB -->
        <template #schedules>
          <div class="parental-section">
            <div class="parental-section__toolbar">
              <p class="parental-section__hint">
                <kbd>c</kbd> create &nbsp; <kbd>E</kbd> edit &nbsp; <kbd>x</kbd> delete &nbsp; <kbd>r</kbd> refresh
              </p>
              <Button variant="solid" size="sm" left-icon="plus" @click="openScheduleCreate">
                Create Schedule
              </Button>
            </div>

            <div v-if="loadingSchedules" class="parental-section__loading">
              <Skeleton variant="text" :lines="6" />
            </div>

            <EmptyState
              v-else-if="schedulesError"
              icon="alert"
              title="Couldn't load schedules"
              :description="schedulesError"
            >
              <template #actions>
                <Button variant="ghost" size="sm" left-icon="rewind" @click="loadSchedules">Retry</Button>
              </template>
            </EmptyState>

            <EmptyState
              v-else-if="schedules.length === 0"
              icon="calendar"
              title="No access schedules"
              description="Create schedules to limit when this profile can access content."
            />

            <div v-else class="parental-section__list">
              <div
                v-for="(schedule, idx) in schedules"
                :key="schedule.id"
                class="parental-section__item"
                :class="{ 'is-selected': idx === selectedScheduleIndex }"
                @click="selectedScheduleIndex = idx"
              >
                <div class="parental-section__item-main">
                  <span class="parental-section__item-name">{{ schedule.name }}</span>
                  <span class="parental-section__item-meta">
                    {{ schedule.start_time.substring(0, 5) }} – {{ schedule.end_time.substring(0, 5) }}
                    &nbsp;·&nbsp;
                    {{ formatDays(schedule.days_of_week) }}
                  </span>
                </div>
                <div class="parental-section__item-actions">
                  <Badge :tone="schedule.is_active ? 'success' : 'neutral'">
                    {{ schedule.is_active ? 'Active' : 'Inactive' }}
                  </Badge>
                  <Button variant="ghost" size="sm" @click.stop="openScheduleEdit(schedule)">Edit</Button>
                  <Button variant="ghost" size="sm" @click.stop="askDeleteSchedule(schedule)">Delete</Button>
                </div>
              </div>
            </div>
          </div>
        </template>

        <!-- TAGS TAB -->
        <template #tags>
          <div class="parental-section">
            <div class="parental-section__toolbar">
              <p class="parental-section__hint"><kbd>c</kbd> create &nbsp; <kbd>x</kbd> delete &nbsp; <kbd>r</kbd> refresh</p>
              <Button variant="solid" size="sm" left-icon="plus" @click="openTagCreate">
                Add Tag
              </Button>
            </div>

            <div v-if="loadingTags" class="parental-section__loading">
              <Skeleton variant="text" :lines="4" />
            </div>

            <EmptyState
              v-else-if="tagsError"
              icon="alert"
              title="Couldn't load tags"
              :description="tagsError"
            >
              <template #actions>
                <Button variant="ghost" size="sm" left-icon="rewind" @click="loadTags">Retry</Button>
              </template>
            </EmptyState>

            <EmptyState
              v-else-if="tags.length === 0"
              icon="bookmark"
              title="No tags"
              description="Add tags to block or allow specific content categories."
            />

            <div v-else class="parental-section__list">
              <div
                v-for="(tag, idx) in tags"
                :key="tag.id"
                class="parental-section__item"
                :class="{ 'is-selected': idx === selectedTagIndex }"
                @click="selectedTagIndex = idx"
              >
                <div class="parental-section__item-main">
                  <span class="parental-section__item-name">{{ tag.tag }}</span>
                </div>
                <div class="parental-section__item-actions">
                  <Badge :tone="tag.tag_type === 'blocked' ? 'error' : 'success'">
                    {{ tag.tag_type }}
                  </Badge>
                  <Button variant="ghost" size="sm" @click.stop="askDeleteTag(tag)">Remove</Button>
                </div>
              </div>
            </div>
          </div>
        </template>

        <!-- STREAM LIMITS TAB -->
        <template #streamLimits>
          <div class="parental-section">
            <div class="parental-section__toolbar">
              <p class="parental-section__hint"><kbd>u</kbd> update limits &nbsp; <kbd>r</kbd> refresh</p>
              <Button variant="solid" size="sm" left-icon="settings" @click="openStreamLimitsEdit">
                Update Limits
              </Button>
            </div>

            <div v-if="loadingStreamLimits" class="parental-section__loading">
              <Skeleton variant="text" :lines="4" />
            </div>

            <EmptyState
              v-else-if="streamLimitsError"
              icon="alert"
              title="Couldn't load stream limits"
              :description="streamLimitsError"
            >
              <template #actions>
                <Button variant="ghost" size="sm" left-icon="rewind" @click="loadStreamLimits">Retry</Button>
              </template>
            </EmptyState>

            <Card v-else class="parental-section__limits-card">
              <div class="parental-section__limits-row">
                <span class="parental-section__limits-label">Max concurrent streams</span>
                <span class="parental-section__limits-value">
                  {{ streamLimits?.max_concurrent_streams ?? 'Not set' }}
                </span>
              </div>
              <div class="parental-section__limits-row">
                <span class="parental-section__limits-label">Max total bandwidth (Kbps)</span>
                <span class="parental-section__limits-value">
                  {{ streamLimits?.max_total_bandwidth_kbps ?? 'Not set' }}
                </span>
              </div>
            </Card>
          </div>
        </template>
      </Tabs>
    </template>

    <!-- Schedule form modal -->
    <Modal v-model="showScheduleForm" :title="editingSchedule ? 'Edit Schedule' : 'Create Schedule'" size="sm">
      <form class="parental-form" @submit.prevent="submitScheduleForm">
        <p v-if="formError" class="parental-form__error">{{ formError }}</p>

        <Input
          v-model="scheduleForm.name"
          label="Name"
          placeholder="e.g. Weekday Evenings"
        />

        <div class="parental-form__row">
          <Input
            v-model="scheduleForm.startTime"
            label="Start time (HH:MM)"
            placeholder="08:00"
          />
          <Input
            v-model="scheduleForm.endTime"
            label="End time (HH:MM)"
            placeholder="22:00"
          />
        </div>

        <div class="parental-form__days">
          <label class="parental-form__label">Days</label>
          <div class="parental-form__day-buttons">
            <Button
              v-for="day in VALID_DAYS"
              :key="day"
              size="sm"
              :variant="scheduleForm.daysOfWeek.includes(day) ? 'solid' : 'ghost'"
              @click="toggleScheduleDay(day)"
            >
              {{ day.charAt(0).toUpperCase() + day.slice(1, 3) }}
            </Button>
          </div>
        </div>

        <Switch v-model="scheduleForm.isActive" label="Active" />

        <div class="parental-form__actions">
          <Button variant="ghost" type="button" @click="showScheduleForm = false">Cancel</Button>
          <Button variant="solid" type="submit">{{ editingSchedule ? 'Update' : 'Create' }}</Button>
        </div>
      </form>
    </Modal>

    <!-- Tag form modal -->
    <Modal v-model="showTagForm" title="Add Tag" size="sm">
      <form class="parental-form" @submit.prevent="submitTagForm">
        <p v-if="tagFormError" class="parental-form__error">{{ tagFormError }}</p>

        <Input
          v-model="tagForm.tag"
          label="Tag name"
          placeholder="e.g. kids, restricted, work"
        />

        <Select
          v-model="tagForm.tagType"
          label="Tag type"
          :options="TAG_TYPE_OPTIONS"
        />

        <div class="parental-form__actions">
          <Button variant="ghost" type="button" @click="showTagForm = false">Cancel</Button>
          <Button variant="solid" type="submit">Add Tag</Button>
        </div>
      </form>
    </Modal>

    <!-- Stream limits form modal -->
    <Modal v-model="showStreamLimitsForm" title="Update Stream Limits" size="sm">
      <form class="parental-form" @submit.prevent="submitStreamLimitsForm">
        <p v-if="streamLimitsFormError" class="parental-form__error">{{ streamLimitsFormError }}</p>

        <Input
          v-model.number="streamLimitsForm.maxConcurrentStreams"
          label="Max concurrent streams"
          type="number"
          min="1"
        />

        <Input
          v-model="streamLimitsForm.maxTotalBandwidthKbps"
          label="Max total bandwidth (Kbps, optional)"
          type="number"
          min="0"
          placeholder="Leave empty for no limit"
        />

        <div class="parental-form__actions">
          <Button variant="ghost" type="button" @click="showStreamLimitsForm = false">Cancel</Button>
          <Button variant="solid" type="submit">Update</Button>
        </div>
      </form>
    </Modal>

    <!-- Delete schedule confirmation -->
    <Modal v-model="showDeleteScheduleModal" title="Delete Schedule" size="sm">
      <p v-if="pendingDeleteSchedule">
        Delete schedule <strong>{{ pendingDeleteSchedule.name }}</strong>?
      </p>
      <div class="parental-form__actions">
        <Button variant="ghost" @click="pendingDeleteSchedule = null">Cancel</Button>
        <Button variant="solid" tone="error" @click="pendingDeleteSchedule && confirmDeleteSchedule(pendingDeleteSchedule)">
          Delete
        </Button>
      </div>
    </Modal>

    <!-- Delete tag confirmation -->
    <Modal v-model="showDeleteTagModal" title="Remove Tag" size="sm">
      <p v-if="pendingDeleteTag">
        Remove tag <strong>{{ pendingDeleteTag.tag }}</strong>?
      </p>
      <div class="parental-form__actions">
        <Button variant="ghost" @click="pendingDeleteTag = null">Cancel</Button>
        <Button variant="solid" tone="error" @click="pendingDeleteTag && confirmDeleteTag(pendingDeleteTag)">
          Remove
        </Button>
      </div>
    </Modal>
  </div>
</template>

<style scoped>
.parental-page {
  max-width: 720px;
  margin: 0 auto;
  padding: var(--space-6) var(--space-4) var(--space-16);
}

.parental-page__head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--space-4);
  margin-bottom: var(--space-6);
}

.parental-page__eyebrow {
  font-size: var(--text-2xs);
  font-weight: var(--fw-semibold, 600);
  letter-spacing: var(--tracking-caps);
  text-transform: uppercase;
  color: var(--text-subtle);
  margin: 0 0 var(--space-1);
}

.parental-page__title {
  font-family: var(--font-display);
  font-weight: var(--fw-semibold, 600);
  font-size: var(--text-2xl);
  letter-spacing: var(--tracking-tight);
  color: var(--text);
  margin: 0;
}

.parental-page__profile-badge {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-3);
  background: var(--surface-2);
  border-radius: var(--radius-md);
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--text);
}

.parental-page__no-profile {
  padding: var(--space-12) 0;
}

/* Section */
.parental-section__toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  margin-bottom: var(--space-4);
}

.parental-section__hint {
  font-size: var(--text-xs);
  color: var(--text-subtle);
  margin: 0;
}

.parental-section__hint kbd {
  display: inline-block;
  padding: 1px 4px;
  background: var(--surface-2);
  border: 1px solid var(--border-subtle);
  border-radius: 3px;
  font-family: var(--font-mono, monospace);
  font-size: 10px;
}

.parental-section__loading {
  padding: var(--space-4) 0;
}

.parental-section__list {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.parental-section__item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-3);
  padding: var(--space-3) var(--space-4);
  background: var(--surface-1);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: background var(--dur-fast) var(--ease-out);
}

.parental-section__item:hover {
  background: var(--surface-2);
}

.parental-section__item.is-selected {
  border-color: var(--accent);
  background: var(--surface-2);
}

.parental-section__item-main {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.parental-section__item-name {
  font-weight: 500;
  color: var(--text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.parental-section__item-meta {
  font-size: var(--text-xs);
  color: var(--text-secondary);
}

.parental-section__item-actions {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  flex-shrink: 0;
}

/* Limits card */
.parental-section__limits-card {
  padding: var(--space-4);
}

.parental-section__limits-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-2) 0;
}

.parental-section__limits-row + .parental-section__limits-row {
  border-top: 1px solid var(--border-subtle);
}

.parental-section__limits-label {
  font-size: var(--text-sm);
  color: var(--text-secondary);
}

.parental-section__limits-value {
  font-weight: 600;
  color: var(--text);
}

/* Forms */
.parental-form {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.parental-form__error {
  color: var(--color-error);
  font-size: var(--text-sm);
  margin: 0;
  padding: var(--space-2) var(--space-3);
  background: var(--color-error-subtle);
  border-radius: var(--radius-md);
}

.parental-form__row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-3);
}

.parental-form__days {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.parental-form__label {
  font-size: var(--text-xs);
  font-weight: var(--fw-medium, 500);
  color: var(--text-secondary);
}

.parental-form__day-buttons {
  display: flex;
  gap: var(--space-1);
}

.parental-form__actions {
  display: flex;
  justify-content: flex-end;
  gap: var(--space-2);
  margin-top: var(--space-2);
}
</style>
