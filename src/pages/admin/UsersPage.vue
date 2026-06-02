<script setup lang="ts">
/**
 * Admin UsersPage (RA.3) — server user + profile administration, ported from
 * the deleted React `UsersPage` onto the `@phlix/ui` primitives. Lists users in
 * a tokenized table; creates / edits / deletes users via a `Modal` form;
 * toggles admin, resets passwords (showing the generated plaintext once), and
 * opens a per-user Profiles modal that lists / creates / edits / deletes
 * profiles, sets a 4-or-6-digit PIN and clears it. Each mutation refetches the
 * affected list (matching the React source). Errors surface as toasts.
 */
import { ref, computed, onMounted, inject, type ComputedRef } from 'vue';
import { ApiClient } from '../../api/client';
import { LocalStorageTokenStore } from '../../api/tokenStore';
import {
  AdminUsersApi,
  RATING_LABELS,
  RATING_OPTIONS,
  type CreateProfileInput,
  type CreateUserInput,
  type Profile,
  type UpdateProfileInput,
  type UpdateUserInput,
  type User,
} from '../../api/admin/users';
import { useToastStore } from '../../stores/useToastStore';
import Badge from '../../components/ui/Badge.vue';
import Button from '../../components/ui/Button.vue';
import Modal from '../../components/ui/Modal.vue';
import Select from '../../components/ui/Select.vue';
import Switch from '../../components/ui/Switch.vue';
import Skeleton from '../../components/ui/Skeleton.vue';
import EmptyState from '../../components/ui/EmptyState.vue';
import type { SelectOptionInput } from '../../components/ui/listbox';

const MAX_PROFILES = 5;

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
const toasts = useToastStore();

function errMessage(e: unknown, fallback: string): string {
  return e instanceof Error && e.message ? e.message : fallback;
}

const ratingOptions = computed<SelectOptionInput[]>(() =>
  RATING_OPTIONS.map((o) => ({ value: o.value, label: o.label })),
);

// ── User list state ─────────────────────────────────────────────────────────
const users = ref<User[]>([]);
const loading = ref(true);

async function loadUsers(): Promise<void> {
  loading.value = true;
  try {
    users.value = await api.list();
  } catch (e) {
    toasts.error(errMessage(e, 'Failed to load users.'));
  } finally {
    loading.value = false;
  }
}

// ── Add / edit user form ─────────────────────────────────────────────────────
const userFormOpen = ref(false);
const editingUser = ref<User | null>(null);
const username = ref('');
const email = ref('');
const password = ref('');
const isAdmin = ref(false);
const userSubmitting = ref(false);

const userFormTitle = computed(() =>
  editingUser.value ? `Edit user — ${editingUser.value.username}` : 'Add user',
);

function openAddUser(): void {
  editingUser.value = null;
  username.value = '';
  email.value = '';
  password.value = '';
  isAdmin.value = false;
  userFormOpen.value = true;
}

function openEditUser(user: User): void {
  editingUser.value = user;
  username.value = user.username;
  email.value = user.email;
  password.value = '';
  isAdmin.value = user.is_admin === 1;
  userFormOpen.value = true;
}

function closeUserForm(): void {
  userFormOpen.value = false;
  editingUser.value = null;
}

async function submitUserForm(): Promise<void> {
  if (!username.value.trim() || !email.value.trim()) {
    toasts.error('Username and email are required.');
    return;
  }
  const existing = editingUser.value;
  if (!existing && !password.value) {
    toasts.error('Password is required for new users.');
    return;
  }
  if (!existing && password.value.length < 8) {
    toasts.error('Password must be at least 8 characters.');
    return;
  }
  userSubmitting.value = true;
  try {
    if (existing) {
      const input: UpdateUserInput = { username: username.value, email: email.value };
      if (password.value) input.password = password.value;
      await api.update(existing.id, input);
      const targetAdmin: 0 | 1 = isAdmin.value ? 1 : 0;
      if (existing.is_admin !== targetAdmin) {
        await api.setAdmin(existing.id, isAdmin.value);
      }
      toasts.success('User updated.');
    } else {
      const input: CreateUserInput = {
        username: username.value,
        email: email.value,
        password: password.value,
        is_admin: isAdmin.value,
      };
      await api.create(input);
      toasts.success('User created.');
    }
    closeUserForm();
    await loadUsers();
  } catch (e) {
    toasts.error(errMessage(e, 'Failed to save user.'));
  } finally {
    userSubmitting.value = false;
  }
}

// ── Delete user ──────────────────────────────────────────────────────────────
const deletingUser = ref<User | null>(null);

async function confirmDeleteUser(): Promise<void> {
  const target = deletingUser.value;
  if (!target) return;
  try {
    await api.remove(target.id);
    toasts.success('User deleted.');
    deletingUser.value = null;
    await loadUsers();
  } catch (e) {
    toasts.error(errMessage(e, 'Failed to delete user.'));
    deletingUser.value = null;
  }
}

// ── Set admin ────────────────────────────────────────────────────────────────
async function handleSetAdmin(user: User, makeAdmin: boolean): Promise<void> {
  try {
    await api.setAdmin(user.id, makeAdmin);
    toasts.success(makeAdmin ? 'User promoted to admin.' : 'Admin status removed.');
    await loadUsers();
  } catch (e) {
    toasts.error(errMessage(e, 'Failed to update admin status.'));
  }
}

// ── Reset password ───────────────────────────────────────────────────────────
const resettingPassword = ref<User | null>(null);
const resetResult = ref<{ message: string; new_password: string } | null>(null);

async function handleResetPassword(user: User): Promise<void> {
  resettingPassword.value = user;
  resetResult.value = null;
  try {
    resetResult.value = await api.resetPassword(user.id);
  } catch (e) {
    toasts.error(errMessage(e, 'Failed to reset password.'));
    resettingPassword.value = null;
  }
}

function closeResetModal(): void {
  resettingPassword.value = null;
  resetResult.value = null;
}

async function copyPassword(): Promise<void> {
  const result = resetResult.value;
  if (!result) return;
  try {
    await navigator.clipboard.writeText(result.new_password);
    toasts.success('Password copied to clipboard.');
  } catch {
    toasts.error('Could not copy to clipboard.');
  }
}

// ── Profiles modal ───────────────────────────────────────────────────────────
const profilesUser = ref<User | null>(null);
const profiles = ref<Profile[]>([]);
const profilesLoading = ref(false);

const profilesTitle = computed(() =>
  profilesUser.value ? `Profiles — ${profilesUser.value.username}` : 'Profiles',
);
const profilesModalOpen = computed({
  get: () => profilesUser.value !== null,
  set: (v: boolean) => {
    if (!v) closeProfilesModal();
  },
});
const atProfileLimit = computed(() => profiles.value.length >= MAX_PROFILES);

async function loadProfiles(userId: number): Promise<void> {
  profilesLoading.value = true;
  try {
    profiles.value = await api.listProfiles(userId);
  } catch (e) {
    toasts.error(errMessage(e, 'Failed to load profiles.'));
  } finally {
    profilesLoading.value = false;
  }
}

async function openProfilesModal(user: User): Promise<void> {
  profilesUser.value = user;
  await loadProfiles(user.id);
}

function closeProfilesModal(): void {
  profilesUser.value = null;
  profiles.value = [];
  closeProfileForm();
  deletingProfile.value = null;
  closePinForm();
}

// ── Profile form ─────────────────────────────────────────────────────────────
const profileFormOpen = ref(false);
const editingProfile = ref<Profile | null>(null);
const profileName = ref('');
const profileRating = ref(0);
const profileSubmitting = ref(false);

function openAddProfile(): void {
  editingProfile.value = null;
  profileName.value = '';
  profileRating.value = 0;
  profileFormOpen.value = true;
}

function openEditProfile(profile: Profile): void {
  editingProfile.value = profile;
  profileName.value = profile.name;
  profileRating.value = profile.rating;
  profileFormOpen.value = true;
}

function closeProfileForm(): void {
  profileFormOpen.value = false;
  editingProfile.value = null;
  profileName.value = '';
  profileRating.value = 0;
}

async function submitProfileForm(): Promise<void> {
  const owner = profilesUser.value;
  if (!owner) return;
  if (!profileName.value.trim()) {
    toasts.error('Profile name is required.');
    return;
  }
  profileSubmitting.value = true;
  try {
    if (editingProfile.value) {
      const input: UpdateProfileInput = { name: profileName.value, rating: profileRating.value };
      await api.updateProfile(editingProfile.value.id, input);
      toasts.success('Profile updated.');
    } else {
      if (atProfileLimit.value) {
        toasts.error('Maximum 5 profiles allowed.');
        return;
      }
      const input: CreateProfileInput = { name: profileName.value, rating: profileRating.value };
      await api.createProfile(owner.id, input);
      toasts.success('Profile created.');
    }
    closeProfileForm();
    await loadProfiles(owner.id);
  } catch (e) {
    toasts.error(errMessage(e, 'Failed to save profile.'));
  } finally {
    profileSubmitting.value = false;
  }
}

// ── Delete profile ───────────────────────────────────────────────────────────
const deletingProfile = ref<Profile | null>(null);

async function confirmDeleteProfile(): Promise<void> {
  const owner = profilesUser.value;
  const target = deletingProfile.value;
  if (!owner || !target) return;
  try {
    await api.removeProfile(target.id);
    toasts.success('Profile deleted.');
    deletingProfile.value = null;
    await loadProfiles(owner.id);
  } catch (e) {
    toasts.error(errMessage(e, 'Failed to delete profile.'));
    deletingProfile.value = null;
  }
}

// ── PIN management ───────────────────────────────────────────────────────────
const settingPin = ref<Profile | null>(null);
const pinValue = ref('');
const pinSubmitting = ref(false);

function openSetPin(profile: Profile): void {
  settingPin.value = profile;
  pinValue.value = '';
}

function closePinForm(): void {
  settingPin.value = null;
  pinValue.value = '';
}

async function submitSetPin(): Promise<void> {
  const owner = profilesUser.value;
  const target = settingPin.value;
  if (!owner || !target) return;
  if (!/^\d{4}$/.test(pinValue.value) && !/^\d{6}$/.test(pinValue.value)) {
    toasts.error('PIN must be 4 or 6 digits.');
    return;
  }
  pinSubmitting.value = true;
  try {
    await api.setPin(target.id, pinValue.value);
    toasts.success('PIN set.');
    closePinForm();
    await loadProfiles(owner.id);
  } catch (e) {
    toasts.error(errMessage(e, 'Failed to set PIN.'));
  } finally {
    pinSubmitting.value = false;
  }
}

async function handleClearPin(profile: Profile): Promise<void> {
  const owner = profilesUser.value;
  if (!owner) return;
  try {
    await api.clearPin(profile.id);
    toasts.success('PIN cleared.');
    await loadProfiles(owner.id);
  } catch (e) {
    toasts.error(errMessage(e, 'Failed to clear PIN.'));
  }
}

// ── Helpers ──────────────────────────────────────────────────────────────────
function ratingLabel(rating: number): string {
  return RATING_LABELS[rating] ?? RATING_LABELS[6];
}

onMounted(loadUsers);
</script>

<template>
  <section class="admin-users" aria-labelledby="users-heading">
    <header class="admin-users__head">
      <h1 id="users-heading" class="admin-users__title">Users</h1>
      <Button variant="solid" size="sm" left-icon="plus" @click="openAddUser">Add user</Button>
    </header>

    <div v-if="loading" class="admin-users__skel"><Skeleton variant="text" :lines="6" /></div>
    <EmptyState v-else-if="users.length === 0" icon="user" title="No users yet">
      <template #actions>
        <Button variant="solid" size="sm" left-icon="plus" @click="openAddUser">Add user</Button>
      </template>
    </EmptyState>
    <table v-else class="admin-users__table" aria-label="Users">
      <thead>
        <tr>
          <th scope="col">Username</th>
          <th scope="col">Email</th>
          <th scope="col">Role</th>
          <th scope="col">Created</th>
          <th scope="col" class="admin-users__actions-col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.username }}</td>
          <td>{{ user.email }}</td>
          <td>
            <Badge :tone="user.is_admin ? 'accent' : 'neutral'">
              {{ user.is_admin ? 'Admin' : 'User' }}
            </Badge>
          </td>
          <td class="admin-users__date">{{ user.created_at.slice(0, 10) }}</td>
          <td>
            <div class="admin-users__actions">
              <Button
                variant="ghost"
                size="sm"
                :aria-label="`Edit ${user.username}`"
                @click="openEditUser(user)"
              >
                Edit
              </Button>
              <Button
                variant="ghost"
                size="sm"
                :aria-label="`${user.is_admin ? 'Demote' : 'Promote'} ${user.username}`"
                @click="handleSetAdmin(user, user.is_admin !== 1)"
              >
                {{ user.is_admin ? 'Demote' : 'Set Admin' }}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                :aria-label="`Reset password for ${user.username}`"
                @click="handleResetPassword(user)"
              >
                Reset Password
              </Button>
              <Button
                variant="ghost"
                size="sm"
                :aria-label="`Manage profiles for ${user.username}`"
                @click="openProfilesModal(user)"
              >
                Profiles
              </Button>
              <Button
                variant="ghost"
                size="sm"
                :aria-label="`Delete ${user.username}`"
                @click="deletingUser = user"
              >
                Delete
              </Button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Add / edit user modal -->
    <Modal v-model="userFormOpen" :title="userFormTitle" @close="closeUserForm">
      <form class="admin-users__form" @submit.prevent="submitUserForm">
        <label class="admin-users__field">
          <span class="admin-users__label">Username</span>
          <input v-model="username" type="text" class="admin-users__input" autocomplete="off" required />
        </label>
        <label class="admin-users__field">
          <span class="admin-users__label">Email</span>
          <input v-model="email" type="email" class="admin-users__input" autocomplete="off" required />
        </label>
        <label class="admin-users__field">
          <span class="admin-users__label">
            {{ editingUser ? 'Password (leave blank to keep current)' : 'Password' }}
          </span>
          <input
            v-model="password"
            type="password"
            class="admin-users__input"
            autocomplete="new-password"
            :placeholder="editingUser ? '(unchanged)' : undefined"
            :required="!editingUser"
          />
        </label>
        <Switch v-model="isAdmin" label="Admin" />
      </form>
      <template #footer>
        <Button variant="ghost" size="sm" @click="closeUserForm">Cancel</Button>
        <Button variant="solid" size="sm" :loading="userSubmitting" @click="submitUserForm">
          {{ editingUser ? 'Save' : 'Create' }}
        </Button>
      </template>
    </Modal>

    <!-- Delete user confirm modal -->
    <Modal
      :model-value="deletingUser !== null"
      title="Delete user"
      size="sm"
      @update:model-value="deletingUser = null"
    >
      <p>
        Delete user <strong>{{ deletingUser?.username }}</strong>? This cannot be undone.
      </p>
      <template #footer>
        <Button variant="ghost" size="sm" @click="deletingUser = null">Cancel</Button>
        <Button variant="solid" size="sm" @click="confirmDeleteUser">Delete</Button>
      </template>
    </Modal>

    <!-- Reset password modal -->
    <Modal
      :model-value="resettingPassword !== null"
      :title="resettingPassword ? `Reset password — ${resettingPassword.username}` : 'Reset password'"
      @update:model-value="closeResetModal"
    >
      <div v-if="resetResult">
        <p>{{ resetResult.message }}</p>
        <label class="admin-users__field">
          <span class="admin-users__label">New password</span>
          <div class="admin-users__password-row">
            <input
              :value="resetResult.new_password"
              type="text"
              class="admin-users__input"
              readonly
              aria-readonly="true"
            />
            <Button variant="outline" size="sm" @click="copyPassword">Copy</Button>
          </div>
        </label>
      </div>
      <p v-else role="status" aria-live="polite">
        Resetting password for <strong>{{ resettingPassword?.username }}</strong>…
      </p>
      <template #footer>
        <Button variant="solid" size="sm" @click="closeResetModal">Close</Button>
      </template>
    </Modal>

    <!-- Profiles modal -->
    <Modal v-model="profilesModalOpen" :title="profilesTitle" size="lg">
      <div v-if="profilesLoading" class="admin-users__skel"><Skeleton variant="text" :lines="4" /></div>
      <template v-else>
        <div class="admin-users__profiles-toolbar">
          <Button
            variant="outline"
            size="sm"
            left-icon="plus"
            :disabled="atProfileLimit"
            aria-label="Add profile"
            @click="openAddProfile"
          >
            Add profile{{ atProfileLimit ? ' (max 5)' : '' }}
          </Button>
        </div>

        <EmptyState v-if="profiles.length === 0" icon="user" title="No profiles yet" />
        <table v-else class="admin-users__table" aria-label="Profiles">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Rating</th>
              <th scope="col">PIN</th>
              <th scope="col" class="admin-users__actions-col">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="profile in profiles" :key="profile.id">
              <td>{{ profile.name }}</td>
              <td><Badge tone="info">{{ ratingLabel(profile.rating) }}</Badge></td>
              <td>
                <Badge :tone="profile.pin_hash !== null ? 'success' : 'neutral'">
                  {{ profile.pin_hash !== null ? 'Has PIN' : 'No PIN' }}
                </Badge>
              </td>
              <td>
                <div class="admin-users__actions">
                  <Button
                    variant="ghost"
                    size="sm"
                    :aria-label="`Edit profile ${profile.name}`"
                    @click="openEditProfile(profile)"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    :aria-label="`Set PIN for ${profile.name}`"
                    @click="openSetPin(profile)"
                  >
                    Set PIN
                  </Button>
                  <Button
                    v-if="profile.pin_hash !== null"
                    variant="ghost"
                    size="sm"
                    :aria-label="`Clear PIN for ${profile.name}`"
                    @click="handleClearPin(profile)"
                  >
                    Clear PIN
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    :aria-label="`Delete profile ${profile.name}`"
                    @click="deletingProfile = profile"
                  >
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Add / edit profile -->
        <div v-if="profileFormOpen" class="admin-users__subform">
          <h3 class="admin-users__subform-title">{{ editingProfile ? 'Edit profile' : 'Add profile' }}</h3>
          <form class="admin-users__form" @submit.prevent="submitProfileForm">
            <label class="admin-users__field">
              <span class="admin-users__label">Name</span>
              <input v-model="profileName" type="text" class="admin-users__input" autocomplete="off" required />
            </label>
            <label class="admin-users__field">
              <span class="admin-users__label">Rating</span>
              <Select
                :model-value="profileRating"
                :options="ratingOptions"
                label="Rating"
                @update:model-value="(v) => (profileRating = Number(v))"
              />
            </label>
            <div class="admin-users__subform-actions">
              <Button variant="ghost" size="sm" @click="closeProfileForm">Cancel</Button>
              <Button variant="solid" size="sm" :loading="profileSubmitting" @click="submitProfileForm">
                {{ editingProfile ? 'Save' : 'Create' }}
              </Button>
            </div>
          </form>
        </div>

        <!-- Delete profile confirm -->
        <div v-if="deletingProfile" class="admin-users__subform">
          <p>
            Delete profile <strong>{{ deletingProfile.name }}</strong>? This cannot be undone.
          </p>
          <div class="admin-users__subform-actions">
            <Button variant="ghost" size="sm" @click="deletingProfile = null">Cancel</Button>
            <Button variant="solid" size="sm" @click="confirmDeleteProfile">Delete</Button>
          </div>
        </div>

        <!-- Set PIN -->
        <div v-if="settingPin" class="admin-users__subform">
          <h3 class="admin-users__subform-title">Set PIN — {{ settingPin.name }}</h3>
          <form class="admin-users__form" @submit.prevent="submitSetPin">
            <label class="admin-users__field">
              <span class="admin-users__label">PIN (4 or 6 digits)</span>
              <input
                v-model="pinValue"
                type="password"
                class="admin-users__input"
                inputmode="numeric"
                autocomplete="off"
                placeholder="1234 or 123456"
                required
              />
            </label>
            <div class="admin-users__subform-actions">
              <Button variant="ghost" size="sm" @click="closePinForm">Cancel</Button>
              <Button variant="solid" size="sm" :loading="pinSubmitting" @click="submitSetPin">Set PIN</Button>
            </div>
          </form>
        </div>
      </template>
    </Modal>
  </section>
</template>

<style scoped>
.admin-users {
  max-width: 1100px;
  margin: 0 auto;
  padding: var(--space-6);
}
.admin-users__head {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  margin-bottom: var(--space-6);
}
.admin-users__title {
  font-family: var(--font-display);
  font-weight: var(--font-semibold);
  font-size: var(--text-xl);
  letter-spacing: var(--tracking-tight);
  color: var(--text);
}
.admin-users__skel {
  padding-block: var(--space-2);
}
.admin-users__table {
  width: 100%;
  border-collapse: collapse;
  font-size: var(--text-sm);
}
.admin-users__table th {
  text-align: left;
  padding: var(--space-2) var(--space-3);
  font-size: var(--text-xs);
  font-weight: var(--font-semibold);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  color: var(--text-subtle);
  border-bottom: 1px solid var(--border-subtle);
}
.admin-users__table td {
  padding: var(--space-2) var(--space-3);
  color: var(--text-muted);
  border-bottom: 1px solid var(--border-subtle);
  vertical-align: middle;
}
.admin-users__date {
  font-variant-numeric: tabular-nums;
  color: var(--text-subtle);
  white-space: nowrap;
}
.admin-users__actions-col {
  width: 1%;
}
.admin-users__actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-1);
}

/* Forms */
.admin-users__form {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}
.admin-users__field {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}
.admin-users__label {
  font-size: var(--text-xs);
  font-weight: var(--font-semibold);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  color: var(--text-subtle);
}
.admin-users__input {
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
.admin-users__input:focus-visible {
  outline: none;
  border-color: var(--accent-ring);
  box-shadow: 0 0 0 3px var(--accent-soft);
}
.admin-users__input::placeholder {
  color: var(--text-subtle);
}
.admin-users__password-row {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

/* Profiles */
.admin-users__profiles-toolbar {
  display: flex;
  justify-content: flex-end;
  margin-bottom: var(--space-4);
}
.admin-users__subform {
  margin-top: var(--space-5);
  padding: var(--space-4);
  border-radius: var(--radius-md);
  background: var(--surface-1, var(--surface));
  border: 1px solid var(--border-subtle);
}
.admin-users__subform-title {
  font-family: var(--font-display);
  font-weight: var(--font-semibold);
  font-size: var(--text-base);
  letter-spacing: var(--tracking-tight);
  color: var(--text);
  margin-bottom: var(--space-3);
}
.admin-users__subform-actions {
  display: flex;
  justify-content: flex-end;
  gap: var(--space-3);
}
@media (prefers-reduced-motion: reduce) {
  .admin-users__input {
    transition: none;
  }
}
</style>
