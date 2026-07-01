<script setup lang="ts">
/**
 * Admin CollectionsPage (RA.12) — manage media collections, ported from the
 * deleted React `CollectionsPage` onto the `@phlix/ui` primitives.
 *
 * Lists collections in a tokenized table with their item counts; creates /
 * edits / deletes a collection via a `Modal` form; and opens a per-collection
 * "items" modal that lists the membership, removes an item, refreshes a smart
 * collection, and bulk-adds items by query. Each mutation refetches the affected
 * list (matching the React source). Errors surface as toasts.
 *
 * NOTE: the React page also embedded the separate smart-playlist CRUD (its own
 * `smartPlaylists` API + `RuleBuilder` component). That module has no Vue port
 * yet, so this page is scoped to the collections API only; the smart-playlist
 * half is left to a future RA step (see report).
 */
import { ref, computed, onMounted, inject, type ComputedRef } from 'vue';
import { ApiClient } from '../../api/client';
import { LocalStorageTokenStore } from '../../api/tokenStore';
import {
  AdminCollectionsApi,
  type Collection,
  type CreateCollectionInput,
  type MediaItem,
  type UpdateCollectionInput,
} from '../../api/admin/collections';
import { useToastStore } from '../../stores/useToastStore';
import { errMessage } from '../../api/errors';
import Badge from '../../components/ui/Badge.vue';
import PageHint from '../../components/ui/PageHint.vue';
import Button from '../../components/ui/Button.vue';
import Modal from '../../components/ui/Modal.vue';
import Skeleton from '../../components/ui/Skeleton.vue';
import EmptyState from '../../components/ui/EmptyState.vue';

const props = defineProps<{
  /** Inject a pre-built API client for tests; otherwise one is built from `apiBase`. */
  client?: ApiClient;
}>();

const injectedApiBase = inject<string | ComputedRef<string> | undefined>('apiBase', '');
const apiBase = computed(() =>
  typeof injectedApiBase === 'string' ? injectedApiBase : injectedApiBase?.value ?? '',
);
const api = new AdminCollectionsApi(
  props.client ?? new ApiClient({ baseUrl: apiBase.value, tokenStore: new LocalStorageTokenStore() }),
);
const toasts = useToastStore();

// ── Collection list state ────────────────────────────────────────────────────
const collections = ref<Collection[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);

async function loadCollections(): Promise<void> {
  loading.value = true;
  error.value = null;
  try {
    collections.value = await api.list();
  } catch (e) {
    error.value = errMessage(e, 'Failed to load collections.');
    toasts.error(error.value);
  } finally {
    loading.value = false;
  }
}

// ── Add / edit collection form ───────────────────────────────────────────────
const formOpen = ref(false);
const editingCollection = ref<Collection | null>(null);
const collectionName = ref('');
const collectionLibraryId = ref('');
const submitting = ref(false);

const formTitle = computed(() =>
  editingCollection.value ? `Edit collection — ${editingCollection.value.name}` : 'New collection',
);

function openAddCollection(): void {
  editingCollection.value = null;
  collectionName.value = '';
  collectionLibraryId.value = collections.value[0]?.library_id ?? '';
  formOpen.value = true;
}

function openEditCollection(col: Collection): void {
  editingCollection.value = col;
  collectionName.value = col.name;
  collectionLibraryId.value = col.library_id;
  formOpen.value = true;
}

function closeForm(): void {
  formOpen.value = false;
  editingCollection.value = null;
}

async function submitForm(): Promise<void> {
  if (!collectionName.value.trim()) {
    toasts.error('Name is required.');
    return;
  }
  const existing = editingCollection.value;
  if (!existing && !collectionLibraryId.value.trim()) {
    toasts.error('Library is required.');
    return;
  }
  submitting.value = true;
  try {
    if (existing) {
      const input: UpdateCollectionInput = { name: collectionName.value };
      await api.update(existing.id, input);
      toasts.success('Collection updated.');
    } else {
      const input: CreateCollectionInput = {
        name: collectionName.value,
        library_id: collectionLibraryId.value,
      };
      await api.create(input);
      toasts.success('Collection created.');
    }
    closeForm();
    await loadCollections();
  } catch (e) {
    toasts.error(errMessage(e, 'Failed to save collection.'));
  } finally {
    submitting.value = false;
  }
}

// ── Delete collection ─────────────────────────────────────────────────────────
const deletingCollection = ref<Collection | null>(null);

async function confirmDelete(): Promise<void> {
  const target = deletingCollection.value;
  if (!target) return;
  try {
    await api.remove(target.id);
    toasts.success('Collection deleted.');
    deletingCollection.value = null;
    await loadCollections();
  } catch (e) {
    toasts.error(errMessage(e, 'Failed to delete collection.'));
    deletingCollection.value = null;
  }
}

// ── Items modal ────────────────────────────────────────────────────────────────
const itemsCollection = ref<Collection | null>(null);
const items = ref<MediaItem[]>([]);
const itemsLoading = ref(false);
const bulkQuery = ref('');
const bulkSubmitting = ref(false);

const itemsTitle = computed(() =>
  itemsCollection.value ? `Items — ${itemsCollection.value.name}` : 'Collection items',
);
const itemsModalOpen = computed({
  get: () => itemsCollection.value !== null,
  set: (v: boolean) => {
    if (!v) closeItemsModal();
  },
});

async function loadItems(collectionId: string): Promise<void> {
  itemsLoading.value = true;
  try {
    const result = await api.get(collectionId);
    items.value = result.items;
  } catch (e) {
    toasts.error(errMessage(e, 'Failed to load items.'));
  } finally {
    itemsLoading.value = false;
  }
}

async function openItemsModal(col: Collection): Promise<void> {
  itemsCollection.value = col;
  items.value = [];
  bulkQuery.value = '';
  await loadItems(col.id);
}

function closeItemsModal(): void {
  itemsCollection.value = null;
  items.value = [];
  bulkQuery.value = '';
}

async function handleRemoveItem(item: MediaItem): Promise<void> {
  const owner = itemsCollection.value;
  if (!owner) return;
  try {
    await api.removeItem(owner.id, item.id);
    toasts.success('Item removed.');
    await loadItems(owner.id);
  } catch (e) {
    toasts.error(errMessage(e, 'Failed to remove item.'));
  }
}

async function submitBulkAdd(): Promise<void> {
  const owner = itemsCollection.value;
  if (!owner) return;
  if (!bulkQuery.value.trim()) {
    toasts.error('A query is required to bulk-add items.');
    return;
  }
  bulkSubmitting.value = true;
  try {
    await api.bulkAdd(owner.id, bulkQuery.value);
    toasts.success('Items added.');
    bulkQuery.value = '';
    await loadItems(owner.id);
  } catch (e) {
    toasts.error(errMessage(e, 'Failed to bulk-add items.'));
  } finally {
    bulkSubmitting.value = false;
  }
}

// ── Refresh (smart collection) ───────────────────────────────────────────────
async function handleRefresh(col: Collection): Promise<void> {
  try {
    await api.refresh(col.id);
    toasts.success('Collection refreshed.');
    await loadCollections();
  } catch (e) {
    toasts.error(errMessage(e, 'Failed to refresh collection.'));
  }
}

// ── Helpers ──────────────────────────────────────────────────────────────────
function itemLabel(item: MediaItem): string {
  return typeof item.title === 'string' && item.title ? item.title : item.id;
}

onMounted(loadCollections);
</script>

<template>
  <section class="admin-collections" aria-labelledby="collections-heading">
    <header class="admin-collections__head">
      <h1 id="collections-heading" class="admin-collections__title">Collections</h1>
      <Button variant="solid" size="sm" left-icon="plus" @click="openAddCollection">
        New collection
      </Button>
    </header>

    <PageHint>
      Group titles into curated sets (like "Marvel" or "Christmas movies") that appear on the
      browse screen. <strong>New collection</strong> creates one; on each row,
      <strong>Items</strong> opens its contents where you can add titles by query (e.g.
      <em>genre:action</em>) or <strong>Remove</strong> them, <strong>Refresh</strong>
      re-evaluates membership, <strong>Edit</strong> renames it, and <strong>Delete</strong>
      removes it.
    </PageHint>

    <div v-if="loading" class="admin-collections__skel"><Skeleton variant="text" :lines="6" /></div>
    <EmptyState
      v-else-if="error"
      icon="alert"
      title="Couldn't load collections"
      :description="error"
    >
      <template #actions>
        <Button variant="solid" size="sm" left-icon="rewind" @click="loadCollections">Retry</Button>
      </template>
    </EmptyState>
    <EmptyState v-else-if="collections.length === 0" icon="list" title="No collections yet">
      <template #actions>
        <Button variant="solid" size="sm" left-icon="plus" @click="openAddCollection">
          New collection
        </Button>
      </template>
    </EmptyState>
    <table v-else class="admin-collections__table" aria-label="Collections">
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Items</th>
          <th scope="col" class="admin-collections__actions-col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="col in collections" :key="col.id">
          <td>{{ col.name }}</td>
          <td><Badge tone="neutral" mono>{{ col.item_count ?? 0 }}</Badge></td>
          <td>
            <div class="admin-collections__actions">
              <Button
                variant="ghost"
                size="sm"
                left-icon="film"
                :aria-label="`View items in ${col.name}`"
                @click="openItemsModal(col)"
              >
                Items
              </Button>
              <Button
                variant="ghost"
                size="sm"
                left-icon="rewind"
                :aria-label="`Refresh ${col.name}`"
                @click="handleRefresh(col)"
              >
                Refresh
              </Button>
              <Button
                variant="ghost"
                size="sm"
                :aria-label="`Edit ${col.name}`"
                @click="openEditCollection(col)"
              >
                Edit
              </Button>
              <Button
                variant="ghost"
                size="sm"
                left-icon="x"
                :aria-label="`Delete ${col.name}`"
                @click="deletingCollection = col"
              >
                Delete
              </Button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Add / edit collection modal -->
    <Modal v-model="formOpen" :title="formTitle" @close="closeForm">
      <form class="admin-collections__form" @submit.prevent="submitForm">
        <label class="admin-collections__field">
          <span class="admin-collections__label">Name</span>
          <input v-model="collectionName" type="text" class="admin-collections__input" autocomplete="off" required />
        </label>
        <label v-if="!editingCollection" class="admin-collections__field">
          <span class="admin-collections__label">Library</span>
          <input v-model="collectionLibraryId" type="text" class="admin-collections__input" autocomplete="off" required />
        </label>
      </form>
      <template #footer>
        <Button variant="ghost" size="sm" @click="closeForm">Cancel</Button>
        <Button variant="solid" size="sm" :loading="submitting" @click="submitForm">
          {{ editingCollection ? 'Save' : 'Create' }}
        </Button>
      </template>
    </Modal>

    <!-- Delete collection confirm modal -->
    <Modal
      :model-value="deletingCollection !== null"
      title="Delete collection"
      size="sm"
      @update:model-value="deletingCollection = null"
    >
      <p>
        Delete collection <strong>{{ deletingCollection?.name }}</strong>? This cannot be undone.
      </p>
      <template #footer>
        <Button variant="ghost" size="sm" @click="deletingCollection = null">Cancel</Button>
        <Button variant="solid" size="sm" @click="confirmDelete">Delete</Button>
      </template>
    </Modal>

    <!-- Items modal -->
    <Modal v-model="itemsModalOpen" :title="itemsTitle" size="lg">
      <div v-if="itemsLoading" class="admin-collections__skel"><Skeleton variant="text" :lines="4" /></div>
      <template v-else>
        <form class="admin-collections__bulk" @submit.prevent="submitBulkAdd">
          <label class="admin-collections__field admin-collections__field--grow">
            <span class="admin-collections__label">Bulk add by query</span>
            <input
              v-model="bulkQuery"
              type="text"
              class="admin-collections__input"
              autocomplete="off"
              placeholder="e.g. genre:action"
            />
          </label>
          <Button variant="outline" size="sm" left-icon="plus" :loading="bulkSubmitting" @click="submitBulkAdd">
            Add
          </Button>
        </form>

        <EmptyState v-if="items.length === 0" icon="image" title="No items in this collection." />
        <table v-else class="admin-collections__table" aria-label="Collection items">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col" class="admin-collections__actions-col">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in items" :key="item.id">
              <td>{{ itemLabel(item) }}</td>
              <td>
                <Button
                  variant="ghost"
                  size="sm"
                  left-icon="x"
                  :aria-label="`Remove ${itemLabel(item)}`"
                  @click="handleRemoveItem(item)"
                >
                  Remove
                </Button>
              </td>
            </tr>
          </tbody>
        </table>
      </template>
      <template #footer>
        <Button variant="solid" size="sm" @click="closeItemsModal">Close</Button>
      </template>
    </Modal>
  </section>
</template>

<style scoped>
.admin-collections {
  max-width: 1100px;
  margin: 0 auto;
  padding: var(--space-6);
}
.admin-collections__head {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  margin-bottom: var(--space-6);
}
.admin-collections__title {
  font-family: var(--font-display);
  font-weight: var(--font-semibold);
  font-size: var(--text-xl);
  letter-spacing: var(--tracking-tight);
  color: var(--text);
}
.admin-collections__skel {
  padding-block: var(--space-2);
}
.admin-collections__table {
  width: 100%;
  border-collapse: collapse;
  font-size: var(--text-sm);
}
.admin-collections__table th {
  text-align: left;
  padding: var(--space-2) var(--space-3);
  font-size: var(--text-xs);
  font-weight: var(--font-semibold);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  color: var(--text-subtle);
  border-bottom: 1px solid var(--border-subtle);
}
.admin-collections__table td {
  padding: var(--space-2) var(--space-3);
  color: var(--text-muted);
  border-bottom: 1px solid var(--border-subtle);
  vertical-align: middle;
}
.admin-collections__actions-col {
  width: 1%;
}
.admin-collections__actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-1);
}

/* Forms */
.admin-collections__form {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}
.admin-collections__bulk {
  display: flex;
  align-items: flex-end;
  gap: var(--space-3);
  margin-bottom: var(--space-5);
}
.admin-collections__field {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}
.admin-collections__field--grow {
  flex: 1;
}
.admin-collections__label {
  font-size: var(--text-xs);
  font-weight: var(--font-semibold);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  color: var(--text-subtle);
}
.admin-collections__input {
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
.admin-collections__input:focus-visible {
  outline: none;
  border-color: var(--accent-ring);
  box-shadow: 0 0 0 3px var(--accent-soft);
}
.admin-collections__input::placeholder {
  color: var(--text-subtle);
}
@media (prefers-reduced-motion: reduce) {
  .admin-collections__input {
    transition: none;
  }
}
</style>
