<!--
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
-->

<script setup lang="ts">
/**
 * Admin WebhooksPage (RA.4) — webhook subscription administration, ported 1:1
 * from the deleted React `WebhooksPage` onto the `@phlix/ui` primitives. Lists
 * webhooks (name, URL, event count, actions) in a tokenized table; creates /
 * edits them through a `Modal` form with per-category event checkboxes and a
 * show/hide secret field; deletes through a confirm `Modal`; and fires a test
 * delivery, surfacing the dispatch result in a result `Modal`. Each mutation
 * refetches the list afterward (matching the React source). Errors surface as
 * toasts.
 */
import { ref, computed, onMounted, inject, type ComputedRef } from 'vue';
import { ApiClient } from '../../api/client';
import { LocalStorageTokenStore } from '../../api/tokenStore';
import {
  AdminWebhooksApi,
  WEBHOOK_EVENT_CATEGORIES,
  type UpdateWebhookInput,
  type Webhook,
} from '../../api/admin/webhooks';
import { useToastStore } from '../../stores/useToastStore';
import { errMessage } from '../../api/errors';
import Badge from '../../components/ui/Badge.vue';
import PageHint from '../../components/ui/PageHint.vue';
import Button from '../../components/ui/Button.vue';
import Modal from '../../components/ui/Modal.vue';
import Skeleton from '../../components/ui/Skeleton.vue';
import EmptyState from '../../components/ui/EmptyState.vue';
import Icon from '../../components/Icon.vue';

const props = defineProps<{
  /** Inject a pre-built API client for tests; otherwise one is built from `apiBase`. */
  client?: ApiClient;
}>();

const injectedApiBase = inject<string | ComputedRef<string> | undefined>('apiBase', '');
const apiBase = computed(() =>
  typeof injectedApiBase === 'string' ? injectedApiBase : injectedApiBase?.value ?? '',
);
const api = new AdminWebhooksApi(
  props.client ?? new ApiClient({ baseUrl: apiBase.value, tokenStore: new LocalStorageTokenStore() }),
);
const toasts = useToastStore();

/** Validate a URL string using the same logic the server uses. */
function isValidUrl(value: string): boolean {
  try {
    const parsed = new URL(value);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

// ── List state ────────────────────────────────────────────────────────────────
const webhooks = ref<Webhook[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);

async function loadWebhooks(): Promise<void> {
  loading.value = true;
  error.value = null;
  try {
    webhooks.value = await api.list();
  } catch (e) {
    error.value = errMessage(e, 'Failed to load webhooks.');
    toasts.error(error.value);
  } finally {
    loading.value = false;
  }
}

// ── Add / edit form ─────────────────────────────────────────────────────────
const formOpen = ref(false);
const editing = ref<Webhook | null>(null);
const name = ref('');
const url = ref('');
const secret = ref('');
const selectedEvents = ref<Set<string>>(new Set());
const showSecret = ref(false);
const submitting = ref(false);
const formError = ref('');

const formTitle = computed(() => (editing.value ? 'Edit webhook' : 'Add webhook'));

function openAdd(): void {
  editing.value = null;
  name.value = '';
  url.value = '';
  secret.value = '';
  selectedEvents.value = new Set();
  showSecret.value = false;
  formError.value = '';
  formOpen.value = true;
}

function openEdit(wh: Webhook): void {
  editing.value = wh;
  name.value = wh.name;
  url.value = wh.url;
  secret.value = ''; // write-only — never pre-filled
  selectedEvents.value = new Set(wh.events);
  showSecret.value = false;
  formError.value = '';
  formOpen.value = true;
}

function closeForm(): void {
  formOpen.value = false;
  editing.value = null;
}

function toggleEvent(eventId: string): void {
  const next = new Set(selectedEvents.value);
  if (next.has(eventId)) {
    next.delete(eventId);
  } else {
    next.add(eventId);
  }
  selectedEvents.value = next;
}

async function submitForm(): Promise<void> {
  formError.value = '';

  if (!name.value.trim()) {
    formError.value = 'Name is required.';
    return;
  }
  if (!url.value.trim()) {
    formError.value = 'URL is required.';
    return;
  }
  if (!isValidUrl(url.value)) {
    formError.value = 'URL must be a valid http:// or https:// URL.';
    return;
  }
  if (!editing.value && !secret.value.trim()) {
    formError.value = 'Secret is required when creating a webhook.';
    return;
  }
  if (selectedEvents.value.size === 0) {
    formError.value = 'Select at least one event.';
    return;
  }

  submitting.value = true;
  try {
    const existing = editing.value;
    if (existing) {
      const input: UpdateWebhookInput = {
        name: name.value.trim(),
        url: url.value.trim(),
        events: Array.from(selectedEvents.value),
      };
      if (secret.value.trim()) {
        input.secret = secret.value;
      }
      await api.update(existing.id, input);
      toasts.success('Webhook updated.');
    } else {
      await api.create({
        name: name.value.trim(),
        url: url.value.trim(),
        secret: secret.value,
        events: Array.from(selectedEvents.value),
      });
      toasts.success('Webhook created.');
    }
    closeForm();
    await loadWebhooks();
  } catch (e) {
    formError.value = errMessage(e, 'Failed to save webhook.');
  } finally {
    submitting.value = false;
  }
}

// ── Delete confirm ──────────────────────────────────────────────────────────
const deleting = ref<Webhook | null>(null);

async function confirmDelete(): Promise<void> {
  const target = deleting.value;
  if (!target) return;
  try {
    await api.remove(target.id);
    toasts.success('Webhook deleted.');
    deleting.value = null;
    await loadWebhooks();
  } catch (e) {
    toasts.error(errMessage(e, 'Failed to delete webhook.'));
    deleting.value = null;
  }
}

// ── Test delivery ─────────────────────────────────────────────────────────────
const testTarget = ref<Webhook | null>(null);
const testResult = ref<{ success: boolean; message: string } | null>(null);
const testing = ref(false);

const testTitle = computed(() =>
  testTarget.value ? `Test — ${testTarget.value.name}` : 'Test webhook',
);
const testModalOpen = computed({
  get: () => testTarget.value !== null,
  set: (v: boolean) => {
    if (!v) closeTestModal();
  },
});

async function triggerTest(wh: Webhook): Promise<void> {
  testTarget.value = wh;
  testResult.value = null;
  testing.value = true;
  try {
    const result = await api.test(wh.id);
    const total = result.success_count + result.failure_count;
    const message =
      result.failure_count === 0
        ? `Delivered successfully (${result.success_count}/${result.success_count} webhooks)`
        : `Delivery failed — ${result.failure_count} of ${total} webhook(s) failed`;
    testResult.value = { success: result.success, message };
  } catch (e) {
    testResult.value = { success: false, message: errMessage(e, 'Failed to test webhook.') };
  } finally {
    testing.value = false;
  }
}

function closeTestModal(): void {
  testTarget.value = null;
  testResult.value = null;
}

onMounted(loadWebhooks);
</script>

<template>
  <section class="admin-webhooks" aria-labelledby="webhooks-heading">
    <header class="admin-webhooks__head">
      <h1 id="webhooks-heading" class="admin-webhooks__title">Webhooks</h1>
      <Button variant="solid" size="sm" left-icon="plus" @click="openAdd">Add webhook</Button>
    </header>

    <PageHint>
      Send a POST to an external URL whenever chosen events happen on your server (for
      notifications or automations). <strong>Add webhook</strong> creates one — you give it a
      name, a URL, an optional signing secret, and tick the events to subscribe to.
      <strong>Test</strong> fires a sample payload so you can confirm it's wired up correctly,
      and <strong>Edit</strong> / <strong>Delete</strong> update or remove an endpoint.
    </PageHint>

    <div v-if="loading" class="admin-webhooks__skel"><Skeleton variant="text" :lines="6" /></div>
    <EmptyState
      v-else-if="error"
      icon="alert"
      title="Couldn't load webhooks"
      :description="error"
    >
      <template #actions>
        <Button variant="solid" size="sm" left-icon="rewind" @click="loadWebhooks">Retry</Button>
      </template>
    </EmptyState>
    <EmptyState
      v-else-if="webhooks.length === 0"
      icon="settings"
      title="No webhooks configured"
      description="Add one to get started."
    >
      <template #actions>
        <Button variant="solid" size="sm" left-icon="plus" @click="openAdd">Add webhook</Button>
      </template>
    </EmptyState>
    <table v-else class="admin-webhooks__table" aria-label="Webhooks">
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">URL</th>
          <th scope="col">Events</th>
          <th scope="col" class="admin-webhooks__actions-col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="wh in webhooks" :key="wh.id">
          <td>{{ wh.name }}</td>
          <td class="admin-webhooks__url">{{ wh.url }}</td>
          <td><Badge tone="info" mono>{{ wh.events.length }}</Badge></td>
          <td>
            <div class="admin-webhooks__actions">
              <Button
                variant="ghost"
                size="sm"
                :aria-label="`Edit ${wh.name}`"
                @click="openEdit(wh)"
              >
                Edit
              </Button>
              <Button
                variant="ghost"
                size="sm"
                :aria-label="`Test ${wh.name}`"
                @click="triggerTest(wh)"
              >
                Test
              </Button>
              <Button
                variant="ghost"
                size="sm"
                :aria-label="`Delete ${wh.name}`"
                @click="deleting = wh"
              >
                Delete
              </Button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Add / edit modal -->
    <Modal v-model="formOpen" :title="formTitle" size="lg" @close="closeForm">
      <form class="admin-webhooks__form" @submit.prevent="submitForm">
        <label class="admin-webhooks__field">
          <span class="admin-webhooks__label">Name</span>
          <input v-model="name" type="text" class="admin-webhooks__input" autocomplete="off" required />
        </label>
        <label class="admin-webhooks__field">
          <span class="admin-webhooks__label">URL</span>
          <input
            v-model="url"
            type="url"
            class="admin-webhooks__input"
            autocomplete="off"
            placeholder="https://example.com/webhook"
            required
          />
        </label>
        <div class="admin-webhooks__field">
          <span class="admin-webhooks__label">
            Secret<span v-if="!editing" aria-hidden="true"> *</span>
          </span>
          <p v-if="editing" class="admin-webhooks__hint">Leave blank to keep the current secret.</p>
          <div class="admin-webhooks__secret-row">
            <input
              v-model="secret"
              :type="showSecret ? 'text' : 'password'"
              class="admin-webhooks__input"
              autocomplete="new-password"
              :placeholder="editing ? '(unchanged)' : 'Shared secret for HMAC signing'"
            />
            <Button
              variant="outline"
              size="sm"
              :left-icon="showSecret ? 'eye-off' : 'eye'"
              :aria-label="showSecret ? 'Hide secret' : 'Show secret'"
              @click="showSecret = !showSecret"
            >
              {{ showSecret ? 'Hide' : 'Show' }}
            </Button>
          </div>
        </div>

        <fieldset class="admin-webhooks__events">
          <legend class="admin-webhooks__label">Events<span aria-hidden="true"> *</span></legend>
          <div
            v-for="category in WEBHOOK_EVENT_CATEGORIES"
            :key="category.label"
            class="admin-webhooks__events-category"
          >
            <span class="admin-webhooks__events-category-label">{{ category.label }}</span>
            <label
              v-for="event in category.events"
              :key="event.id"
              class="admin-webhooks__checkbox"
            >
              <input
                type="checkbox"
                :checked="selectedEvents.has(event.id)"
                @change="toggleEvent(event.id)"
              />
              <span class="admin-webhooks__checkbox-label">{{ event.label }}</span>
              <span class="admin-webhooks__event-id">{{ event.id }}</span>
            </label>
          </div>
        </fieldset>

        <p v-if="formError" class="admin-webhooks__error" role="alert">{{ formError }}</p>
      </form>
      <template #footer>
        <Button variant="ghost" size="sm" @click="closeForm">Cancel</Button>
        <Button variant="solid" size="sm" :loading="submitting" @click="submitForm">
          {{ editing ? 'Save' : 'Create' }}
        </Button>
      </template>
    </Modal>

    <!-- Delete confirm modal -->
    <Modal
      :model-value="deleting !== null"
      title="Delete webhook"
      size="sm"
      @update:model-value="deleting = null"
    >
      <p>
        Delete webhook <strong>{{ deleting?.name }}</strong>? This cannot be undone.
      </p>
      <template #footer>
        <Button variant="ghost" size="sm" @click="deleting = null">Cancel</Button>
        <Button variant="solid" size="sm" @click="confirmDelete">Delete</Button>
      </template>
    </Modal>

    <!-- Test result modal -->
    <Modal v-model="testModalOpen" :title="testTitle">
      <p v-if="testing" role="status" aria-live="polite">Sending test payload…</p>
      <div
        v-else-if="testResult"
        class="admin-webhooks__test-result"
        :class="testResult.success ? 'admin-webhooks__test-result--ok' : 'admin-webhooks__test-result--fail'"
      >
        <span class="admin-webhooks__test-icon" aria-hidden="true">
          <Icon :name="testResult.success ? 'success' : 'error'" />
        </span>
        <div>
          <p class="admin-webhooks__test-status">
            {{ testResult.success ? 'Delivery succeeded' : 'Delivery failed' }}
          </p>
          <p class="admin-webhooks__test-message">{{ testResult.message }}</p>
        </div>
      </div>
      <template #footer>
        <Button variant="solid" size="sm" :disabled="testing" @click="closeTestModal">Close</Button>
      </template>
    </Modal>
  </section>
</template>

<style scoped>
.admin-webhooks {
  max-width: 1100px;
  margin: 0 auto;
  padding: var(--space-6);
}
.admin-webhooks__head {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  margin-bottom: var(--space-6);
}
.admin-webhooks__title {
  font-family: var(--font-display);
  font-weight: var(--font-semibold);
  font-size: var(--text-xl);
  letter-spacing: var(--tracking-tight);
  color: var(--text);
}
.admin-webhooks__skel {
  padding-block: var(--space-2);
}
.admin-webhooks__table {
  width: 100%;
  border-collapse: collapse;
  font-size: var(--text-sm);
}
.admin-webhooks__table th {
  text-align: left;
  padding: var(--space-2) var(--space-3);
  font-size: var(--text-xs);
  font-weight: var(--font-semibold);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  color: var(--text-subtle);
  border-bottom: 1px solid var(--border-subtle);
}
.admin-webhooks__table td {
  padding: var(--space-2) var(--space-3);
  color: var(--text-muted);
  border-bottom: 1px solid var(--border-subtle);
  vertical-align: middle;
}
.admin-webhooks__url {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  word-break: break-all;
}
.admin-webhooks__actions-col {
  width: 1%;
}
.admin-webhooks__actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-1);
}

/* Form */
.admin-webhooks__form {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}
.admin-webhooks__field {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}
.admin-webhooks__label {
  font-size: var(--text-xs);
  font-weight: var(--font-semibold);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  color: var(--text-subtle);
}
.admin-webhooks__hint {
  font-size: var(--text-xs);
  color: var(--text-subtle);
}
.admin-webhooks__input {
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
.admin-webhooks__input:focus-visible {
  outline: none;
  border-color: var(--accent-ring);
  box-shadow: 0 0 0 3px var(--accent-soft);
}
.admin-webhooks__input::placeholder {
  color: var(--text-subtle);
}
.admin-webhooks__secret-row {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

/* Events fieldset */
.admin-webhooks__events {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  padding: var(--space-4);
  border-radius: var(--radius-md);
  border: 1px solid var(--border-subtle);
  background: var(--surface-1, var(--surface));
}
.admin-webhooks__events-category {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}
.admin-webhooks__events-category-label {
  font-size: var(--text-xs);
  font-weight: var(--font-semibold);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  color: var(--text-subtle);
}
.admin-webhooks__checkbox {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--text-sm);
  color: var(--text);
}
.admin-webhooks__checkbox-label {
  color: var(--text);
}
.admin-webhooks__event-id {
  font-family: var(--font-mono);
  font-size: var(--text-2xs);
  color: var(--text-subtle);
}
.admin-webhooks__error {
  font-size: var(--text-sm);
  color: var(--error);
}

/* Test result */
.admin-webhooks__test-result {
  display: flex;
  align-items: flex-start;
  gap: var(--space-3);
  padding: var(--space-3);
  border-radius: var(--radius-md);
  border: 1px solid var(--border-subtle);
  background: var(--surface-1, var(--surface));
}
.admin-webhooks__test-icon {
  font-size: 1.4rem;
  line-height: 1;
}
.admin-webhooks__test-result--ok .admin-webhooks__test-icon {
  color: var(--success);
}
.admin-webhooks__test-result--fail .admin-webhooks__test-icon {
  color: var(--error);
}
.admin-webhooks__test-status {
  font-weight: var(--font-semibold);
  color: var(--text);
}
.admin-webhooks__test-message {
  font-size: var(--text-sm);
  color: var(--text-muted);
}
@media (prefers-reduced-motion: reduce) {
  .admin-webhooks__input {
    transition: none;
  }
}
</style>
