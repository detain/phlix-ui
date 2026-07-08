<!--
 * @copyright 2026 Joe Huss <detain@interserver.net>
-->

<script setup lang="ts">
/**
 * ProfileImageSettings (Step 12.7) — user avatar management.
 *
 * Allows uploading a new avatar image (PNG/JPEG/WEBP, max 5MB) with a live
 * preview before committing, removing the current avatar, and displays the
 * user's initials as a fallback when no avatar is set.
 */
import { ref, computed, onBeforeUnmount } from 'vue';
import Button from './ui/Button.vue';
import { useAuthStore } from '../stores/useAuthStore';
import { useToastStore } from '../stores/useToastStore';

const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB
const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/webp'];

const auth = useAuthStore();
const toasts = useToastStore();

// --- File input state ---
const fileInput = ref<HTMLInputElement | null>(null);
const selectedFile = ref<File | null>(null);
const previewUrl = ref<string | null>(null);
const uploadLoading = ref(false);
const deleteLoading = ref(false);

/** Revoke a temporary object URL to avoid memory leaks. */
function revokePreview(): void {
  if (previewUrl.value) {
    URL.revokeObjectURL(previewUrl.value);
    previewUrl.value = null;
  }
}

onBeforeUnmount(revokePreview);

/** Open the hidden file picker. */
function openFilePicker(): void {
  fileInput.value?.click();
}

/** Handle a newly selected file: validate type/size and show live preview. */
function onFileChange(event: Event): void {
  const input = event.currentTarget as HTMLInputElement;
  const file = input.files?.[0] ?? null;

  if (!file) return;

  // Validate type
  if (!ALLOWED_TYPES.includes(file.type)) {
    toasts.error('Please select a PNG, JPEG, or WEBP image.');
    resetFileInput();
    return;
  }

  // Validate size
  if (file.size > MAX_FILE_SIZE_BYTES) {
    toasts.error(`File is too large. Maximum size is 5 MB.`);
    resetFileInput();
    return;
  }

  // Revoke any previous preview
  revokePreview();

  selectedFile.value = file;
  previewUrl.value = URL.createObjectURL(file);
}

/** Reset the hidden file input so the same file can be re-selected after removal. */
function resetFileInput(): void {
  if (fileInput.value) fileInput.value.value = '';
  selectedFile.value = null;
}

/** Clear the pending selection and revoke its object URL. */
function clearSelection(): void {
  revokePreview();
  selectedFile.value = null;
  resetFileInput();
}

/** The URL to display as the current avatar (preview takes priority). */
const displayAvatarUrl = computed<string | null>(() => {
  if (previewUrl.value) return previewUrl.value;
  if (auth.user?.avatar_url) return auth.user.avatar_url;
  return null;
});

/** User's initials for the fallback avatar. */
const initials = computed<string>(() => {
  const name = auth.user?.name ?? auth.user?.username ?? '';
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
});

/** Whether a persisted avatar exists (separate from pending preview). */
const hasPersistedAvatar = computed(() => auth.user?.avatar_url != null);

/** Upload the selected file as the new avatar. */
async function uploadAvatar(): Promise<void> {
  if (!selectedFile.value || uploadLoading.value) return;

  uploadLoading.value = true;
  try {
    await auth.uploadAvatar(selectedFile.value);
    toasts.success('Avatar updated successfully.');
    // Keep the preview URL; it matches what the server will now serve.
    selectedFile.value = null;
  } catch (e) {
    toasts.error(e instanceof Error ? e.message : 'Avatar upload failed.');
  } finally {
    uploadLoading.value = false;
  }
}

/** Remove the current avatar. */
async function removeAvatar(): Promise<void> {
  if (deleteLoading.value) return;

  deleteLoading.value = true;
  try {
    await auth.deleteAvatar();
    toasts.success('Avatar removed.');
    clearSelection();
  } catch (e) {
    toasts.error(e instanceof Error ? e.message : 'Avatar removal failed.');
  } finally {
    deleteLoading.value = false;
  }
}

const isLoading = computed(() => uploadLoading.value || deleteLoading.value);
</script>

<template>
  <div class="pis">
    <section class="pis__group">
      <h3 class="pis__title">Profile Image</h3>

      <!-- Current avatar display -->
      <div class="pis__avatar-wrap">
        <div class="pis__avatar">
          <img
            v-if="displayAvatarUrl"
            :src="displayAvatarUrl"
            alt="Your profile image"
            class="pis__avatar-img"
          />
          <span v-else class="pis__avatar-initials" aria-hidden="true">{{ initials }}</span>
        </div>

        <!-- Pending file info -->
        <div v-if="selectedFile" class="pis__pending">
          <p class="pis__pending-name">{{ selectedFile.name }}</p>
          <p class="pis__pending-size">{{ (selectedFile.size / 1024).toFixed(1) }} KB</p>
        </div>
      </div>

      <!-- Hidden file input -->
      <input
        ref="fileInput"
        type="file"
        accept="image/png,image/jpeg,image/webp"
        class="pis__file-input"
        @change="onFileChange"
      />

      <!-- Actions -->
      <div class="pis__actions">
        <!-- Primary action: open file picker when no file; upload when file selected -->
        <Button
          variant="solid"
          :left-icon="selectedFile ? 'arrow-up' : 'image'"
          :loading="uploadLoading"
          :disabled="isLoading"
          @click="selectedFile ? uploadAvatar() : openFilePicker()"
        >
          {{ selectedFile ? 'Upload' : 'Choose Image' }}
        </Button>

        <!-- Secondary action: cancel pending selection; remove persisted avatar -->
        <Button
          variant="ghost"
          :left-icon="selectedFile ? 'x' : 'x'"
          :loading="deleteLoading"
          :disabled="isLoading || (!selectedFile && !hasPersistedAvatar)"
          @click="selectedFile ? clearSelection() : removeAvatar()"
        >
          {{ selectedFile ? 'Cancel' : 'Remove' }}
        </Button>
      </div>

      <p class="pis__hint">PNG, JPEG, or WEBP — max 5 MB.</p>
    </section>
  </div>
</template>

<style scoped>
.pis {
  display: grid;
  gap: var(--space-8);
}

.pis__group {
  display: grid;
  gap: var(--space-4);
}

.pis__title {
  font-family: var(--font-display);
  font-weight: var(--fw-semibold, 600);
  font-size: var(--text-base);
  letter-spacing: var(--tracking-tight);
  color: var(--text);
  padding-bottom: var(--space-2);
  border-bottom: 1px solid var(--border-subtle);
}

/* Avatar display */
.pis__avatar-wrap {
  display: flex;
  align-items: center;
  gap: var(--space-5);
}

.pis__avatar {
  flex-shrink: 0;
  width: 80px;
  height: 80px;
  border-radius: var(--radius-full);
  overflow: hidden;
  background: var(--surface-3);
  border: 2px solid var(--border);
  display: grid;
  place-items: center;
}

.pis__avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.pis__avatar-initials {
  font-family: var(--font-display);
  font-size: var(--text-xl);
  font-weight: var(--fw-semibold, 600);
  color: var(--text-muted);
  user-select: none;
  letter-spacing: var(--tracking-tight);
}

/* Pending file info */
.pis__pending {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.pis__pending-name {
  font-size: var(--text-sm);
  font-weight: var(--font-medium, 500);
  color: var(--text);
  word-break: break-all;
}

.pis__pending-size {
  font-size: var(--text-xs);
  color: var(--text-muted);
  font-family: var(--font-mono);
}

/* Hidden file input */
.pis__file-input {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  border: 0;
  overflow: hidden;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  white-space: nowrap;
}

/* Actions row */
.pis__actions {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}

/* Hint text */
.pis__hint {
  margin: 0;
  font-size: var(--text-xs);
  color: var(--text-muted);
}
</style>
