<!--
 * @copyright 2026 Joe Huss <detain@interserver.net>
-->

<script setup lang="ts">
/**
 * Admin DuplicatesPage (Feature 1.7) — the duplicate-merge console for a media
 * server. It lets an admin pick a library, lists the duplicate groups the
 * server's `DuplicateFinder` found for it (series/movies that collide on a
 * `CanonicalKey`), and merges each group's duplicates into its primary via the
 * `AdminMergeController` apply endpoint.
 *
 * Per group: the `primary` row is pre-selected and clearly locked as the keep
 * target, and every `duplicate` is an individually checkable merge source. Each
 * row shows its title + `descendant_count` (the child count — episodes/seasons)
 * so the admin can tell "100 eps" from "1 ep" before merging. "Merge selected"
 * calls `mergeDuplicates(primaryId, checkedDuplicateIds)`, surfaces the resulting
 * `{ moved, deleted }` via the toast store, and refreshes the group list so a
 * cleaned group disappears.
 *
 * Resident-safe: no timers, no module-level mutable state — all reactive state is
 * component-scoped refs. Server-provided strings are rendered via text
 * interpolation only (never `v-html`).
 */
import { ref, computed, onMounted, inject, type ComputedRef } from 'vue';
import { ApiClient } from '../../api/client';
import { LocalStorageTokenStore } from '../../api/tokenStore';
import { AdminLibrariesApi, type Library } from '../../api/admin/libraries';
import {
  AdminDuplicatesApi,
  type DuplicateGroup,
  type DuplicateMember,
} from '../../api/admin/duplicates';
import { useToastStore } from '../../stores/useToastStore';
import { errMessage } from '../../api/errors';
import Badge from '../../components/ui/Badge.vue';
import PageHint from '../../components/ui/PageHint.vue';
import Button from '../../components/ui/Button.vue';
import Select from '../../components/ui/Select.vue';
import Skeleton from '../../components/ui/Skeleton.vue';
import EmptyState from '../../components/ui/EmptyState.vue';
import type { SelectOptionInput } from '../../components/ui/listbox';

const props = defineProps<{
  /** Inject a pre-built API client for tests; otherwise one is built from `apiBase`. */
  client?: ApiClient;
}>();

const injectedApiBase = inject<string | ComputedRef<string> | undefined>('apiBase', '');
const apiBase = computed(() =>
  typeof injectedApiBase === 'string' ? injectedApiBase : injectedApiBase?.value ?? '',
);
const client =
  props.client ?? new ApiClient({ baseUrl: apiBase.value, tokenStore: new LocalStorageTokenStore() });
const librariesApi = new AdminLibrariesApi(client);
const duplicatesApi = new AdminDuplicatesApi(client);
const toasts = useToastStore();

// ── Library picker ──────────────────────────────────────────────────────────
const libraries = ref<Library[]>([]);
const librariesLoading = ref(true);
const librariesError = ref<string | null>(null);
const selectedLibraryId = ref<string>('');

const libraryOptions = computed<SelectOptionInput[]>(() =>
  libraries.value.map((lib) => ({ value: lib.id, label: lib.name })),
);

async function loadLibraries(): Promise<void> {
  librariesLoading.value = true;
  librariesError.value = null;
  try {
    libraries.value = await librariesApi.list();
    // Auto-select the first library so the page is useful immediately.
    if (!selectedLibraryId.value && libraries.value.length > 0) {
      selectedLibraryId.value = libraries.value[0].id;
      await loadGroups();
    }
  } catch (e) {
    librariesError.value = errMessage(e, 'Failed to load libraries.');
    toasts.error(librariesError.value);
  } finally {
    librariesLoading.value = false;
  }
}

function onLibraryChange(value: unknown): void {
  selectedLibraryId.value = String(value);
  void loadGroups();
}

// ── Duplicate groups ──────────────────────────────────────────────────────────
const groups = ref<DuplicateGroup[]>([]);
const groupsLoading = ref(false);
const groupsError = ref<string | null>(null);
/** Per-group set of checked duplicate ids, keyed by canonical_key. */
const checked = ref<Record<string, Set<string>>>({});
/** canonical_key currently being merged (drives the per-group button spinner). */
const merging = ref<string | null>(null);

/** Display label for a member row (prefer `title`, fall back to `name`/id). */
function memberLabel(member: DuplicateMember): string {
  return member.title || member.name || member.id;
}

/** Whether a duplicate row is currently checked within its group. */
function isChecked(group: DuplicateGroup, member: DuplicateMember): boolean {
  return checked.value[group.canonical_key]?.has(member.id) ?? false;
}

function toggle(group: DuplicateGroup, member: DuplicateMember, on: boolean): void {
  const set = new Set(checked.value[group.canonical_key] ?? []);
  if (on) set.add(member.id);
  else set.delete(member.id);
  checked.value = { ...checked.value, [group.canonical_key]: set };
}

/** Count of checked duplicates in a group (drives the Merge button enabled state). */
function checkedCount(group: DuplicateGroup): number {
  return checked.value[group.canonical_key]?.size ?? 0;
}

/** Seed each group with ALL its duplicates checked by default (the common case). */
function seedChecked(list: DuplicateGroup[]): void {
  const next: Record<string, Set<string>> = {};
  for (const group of list) {
    next[group.canonical_key] = new Set(group.duplicates.map((d) => d.id));
  }
  checked.value = next;
}

async function loadGroups(): Promise<void> {
  if (!selectedLibraryId.value) {
    groups.value = [];
    return;
  }
  groupsLoading.value = true;
  groupsError.value = null;
  try {
    const list = await duplicatesApi.listDuplicates(selectedLibraryId.value);
    groups.value = list;
    seedChecked(list);
  } catch (e) {
    groupsError.value = errMessage(e, 'Failed to load duplicates.');
    toasts.error(groupsError.value);
  } finally {
    groupsLoading.value = false;
  }
}

async function mergeGroup(group: DuplicateGroup): Promise<void> {
  const ids = Array.from(checked.value[group.canonical_key] ?? []);
  if (ids.length === 0) {
    toasts.error('Select at least one duplicate to merge.');
    return;
  }
  merging.value = group.canonical_key;
  try {
    const { moved, deleted } = await duplicatesApi.mergeDuplicates(group.primary.id, ids);
    toasts.success(`Merged: ${moved} moved, ${deleted} removed.`);
    // Refresh so a cleaned group disappears from the list.
    await loadGroups();
  } catch (e) {
    toasts.error(errMessage(e, 'Failed to merge duplicates.'));
  } finally {
    merging.value = null;
  }
}

onMounted(loadLibraries);
</script>

<template>
  <section class="admin-duplicates" aria-labelledby="duplicates-heading">
    <header class="admin-duplicates__head">
      <h1 id="duplicates-heading" class="admin-duplicates__title">Duplicates</h1>
    </header>

    <PageHint>
      Finds titles that appear more than once (matched by a canonical key) so you can tidy them up.
      Pick a <strong>library</strong> to scope the search; each group keeps one entry marked
      <strong>Keep</strong> as the primary. Tick the duplicates you want to fold in, then
      <strong>Merge selected</strong> to combine them into that primary — the extras' data is
      merged in and their rows removed.
    </PageHint>

    <p class="admin-duplicates__hint">
      When the same series or movie was scanned more than once, its copies show up here grouped by a
      shared key. Pick the copy to <strong>keep</strong> (the primary, pre-selected) and check the
      duplicates to fold into it. <strong>Merge</strong> re-parents the duplicates' episodes/seasons
      onto the primary and removes the empty leftovers.
    </p>

    <div v-if="librariesLoading" class="admin-duplicates__skel"><Skeleton variant="text" :lines="3" /></div>
    <EmptyState
      v-else-if="librariesError"
      icon="alert"
      title="Couldn't load libraries"
      :description="librariesError"
    >
      <template #actions>
        <Button variant="solid" size="sm" left-icon="rewind" @click="loadLibraries">Retry</Button>
      </template>
    </EmptyState>
    <EmptyState
      v-else-if="libraries.length === 0"
      icon="film"
      title="No libraries yet"
      description="Add a library before scanning for duplicates."
    />
    <template v-else>
      <div class="admin-duplicates__picker">
        <Select
          :model-value="selectedLibraryId"
          :options="libraryOptions"
          label="Library"
          @update:model-value="onLibraryChange"
        />
      </div>

      <div v-if="groupsLoading" class="admin-duplicates__skel"><Skeleton variant="text" :lines="6" /></div>
      <EmptyState
        v-else-if="groupsError"
        icon="alert"
        title="Couldn't load duplicates"
        :description="groupsError"
      >
        <template #actions>
          <Button variant="solid" size="sm" left-icon="rewind" @click="loadGroups">Retry</Button>
        </template>
      </EmptyState>
      <EmptyState
        v-else-if="groups.length === 0"
        icon="check"
        title="No duplicates"
        description="This library has no duplicate groups."
      />
      <ul v-else class="admin-duplicates__groups">
        <li
          v-for="group in groups"
          :key="group.canonical_key"
          class="admin-duplicates__group"
          :data-testid="`group-${group.canonical_key}`"
        >
          <div class="admin-duplicates__group-head">
            <div class="admin-duplicates__group-key">
              <Badge tone="info">{{ group.type }}</Badge>
              <code class="admin-duplicates__canonical">{{ group.canonical_key }}</code>
            </div>
            <Button
              variant="solid"
              size="sm"
              :loading="merging === group.canonical_key"
              :disabled="checkedCount(group) === 0"
              :aria-label="`Merge duplicates of ${group.canonical_key}`"
              @click="mergeGroup(group)"
            >
              Merge selected
            </Button>
          </div>

          <ul class="admin-duplicates__members" aria-label="Group members">
            <li class="admin-duplicates__member admin-duplicates__member--primary">
              <span class="admin-duplicates__member-mark">
                <Badge tone="success">Keep</Badge>
              </span>
              <span class="admin-duplicates__member-name">{{ memberLabel(group.primary) }}</span>
              <span class="admin-duplicates__member-count">
                {{ group.primary.descendant_count }} children
              </span>
            </li>
            <li
              v-for="dup in group.duplicates"
              :key="dup.id"
              class="admin-duplicates__member"
            >
              <label class="admin-duplicates__member-check">
                <input
                  type="checkbox"
                  :checked="isChecked(group, dup)"
                  :aria-label="`Merge ${memberLabel(dup)} into ${memberLabel(group.primary)}`"
                  :data-testid="`dup-${group.canonical_key}-${dup.id}`"
                  @change="toggle(group, dup, ($event.target as HTMLInputElement).checked)"
                />
                <span class="admin-duplicates__member-name">{{ memberLabel(dup) }}</span>
              </label>
              <span class="admin-duplicates__member-count">{{ dup.descendant_count }} children</span>
            </li>
          </ul>
        </li>
      </ul>
    </template>
  </section>
</template>

<style scoped>
.admin-duplicates {
  max-width: 1100px;
  margin: 0 auto;
  padding: var(--space-6);
}
.admin-duplicates__head {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  margin-bottom: var(--space-3);
}
.admin-duplicates__title {
  font-family: var(--font-display);
  font-weight: var(--font-semibold);
  font-size: var(--text-xl);
  letter-spacing: var(--tracking-tight);
  color: var(--text);
}
.admin-duplicates__hint {
  margin-bottom: var(--space-5);
  font-size: var(--text-sm);
  color: var(--text-subtle);
}
.admin-duplicates__skel {
  padding-block: var(--space-2);
}
.admin-duplicates__picker {
  max-width: 360px;
  margin-bottom: var(--space-5);
}
.admin-duplicates__groups {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}
.admin-duplicates__group {
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  background: var(--surface);
  padding: var(--space-4);
}
.admin-duplicates__group-head {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-3);
  margin-bottom: var(--space-3);
}
.admin-duplicates__group-key {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
}
.admin-duplicates__canonical {
  font-family: var(--font-mono, monospace);
  font-size: var(--text-sm);
  color: var(--text-muted);
}
.admin-duplicates__members {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}
.admin-duplicates__member {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-3);
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-sm, 6px);
  font-size: var(--text-sm);
  color: var(--text-muted);
}
.admin-duplicates__member--primary {
  background: var(--surface-subtle, rgba(127, 127, 127, 0.08));
}
.admin-duplicates__member-mark {
  display: inline-flex;
  align-items: center;
}
.admin-duplicates__member-check {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  cursor: pointer;
}
.admin-duplicates__member-name {
  color: var(--text);
}
.admin-duplicates__member-count {
  font-size: var(--text-xs);
  color: var(--text-subtle);
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}
</style>
