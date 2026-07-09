<!--
  * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
-->

<script setup lang="ts">
/**
 * Admin TranscodingSettingsPage (P6-S3) — hardware accelerator selection and HDR
 * tone-mapping controls. Reads the detected accelerators + tone-mapping state from
 * `GET /api/v1/admin/transcoding/accelerators` and `GET /api/v1/admin/transcoding/tone-mapping`,
 * renders a radio group for the preferred accelerator, a toggle for `prefer_hdr_output`,
 * a dropdown for tone-map mode (`none` / `zscale` / `libplacebo`), and saves changes
 * through the respective `PUT` endpoints.
 */
import { ref, computed, onMounted, inject, type ComputedRef } from 'vue';
import { ApiClient, ApiError } from '../../api/client';
import { errMessage } from '../../api/errors';
import { LocalStorageTokenStore } from '../../api/tokenStore';
import {
  AdminTranscodingApi,
  type HardwareAccelerator,
  type ToneMappingSettings,
} from '../../api/admin/transcoding';
import { useToastStore } from '../../stores/useToastStore';
import { useMessages } from '../../composables/useMessages';
import Badge from '../../components/ui/Badge.vue';
import PageHint from '../../components/ui/PageHint.vue';
import Button from '../../components/ui/Button.vue';
import Select from '../../components/ui/Select.vue';
import Switch from '../../components/ui/Switch.vue';
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
const apiClient =
  props.client ?? new ApiClient({ baseUrl: apiBase.value, tokenStore: new LocalStorageTokenStore() });
const api = new AdminTranscodingApi(apiClient);
const toasts = useToastStore();
const { t } = useMessages();

// ── Tone-map mode options ───────────────────────────────────────────────────────
const TONE_MAP_OPTIONS: ReadonlyArray<SelectOptionInput> = [
  { value: 'none', label: 'None — passthrough, no tone mapping' },
  { value: 'zscale', label: 'Zscale — lightweight filmic tone mapping' },
  { value: 'libplacebo', label: 'Libplacebo — high-quality HDR → SDR mapping' },
];

// ── State ───────────────────────────────────────────────────────────────────────
const accelerators = ref<HardwareAccelerator[]>([]);
const ffmpegVersion = ref<string>('');
const preferredAccelerator = ref<string | null>(null);
const preferHdrOutput = ref(false);
const toneMapMode = ref<ToneMappingSettings['tone_map_mode']>('none');

const loading = ref(true);
const submitting = ref(false);
const error = ref<string | null>(null);

// ── Dirty tracking ──────────────────────────────────────────────────────────────
const originalPreferred = ref<string | null>(null);
const originalPreferHdr = ref(false);
const originalToneMapMode = ref<ToneMappingSettings['tone_map_mode']>('none');

const isAcceleratorDirty = computed(
  () => preferredAccelerator.value !== originalPreferred.value,
);
const isHdrDirty = computed(() => preferHdrOutput.value !== originalPreferHdr.value);
const isToneMapDirty = computed(() => toneMapMode.value !== originalToneMapMode.value);
const hasAnyChanges = computed(
  () => isAcceleratorDirty.value || isHdrDirty.value || isToneMapDirty.value,
);

function syncOriginals(
  accel: string | null,
  hdr: boolean,
  toneMap: ToneMappingSettings['tone_map_mode'],
): void {
  originalPreferred.value = accel;
  originalPreferHdr.value = hdr;
  originalToneMapMode.value = toneMap;
}

// ── Load ───────────────────────────────────────────────────────────────────────
async function loadData(): Promise<void> {
  loading.value = true;
  error.value = null;
  try {
    const [accelData, toneData] = await Promise.all([
      api.getAccelerators(),
      api.getToneMapping(),
    ]);
    accelerators.value = accelData.accelerators;
    ffmpegVersion.value = accelData.ffmpegVersion;
    preferredAccelerator.value = accelData.preferredAccelerator;
    preferHdrOutput.value = toneData.prefer_hdr_output;
    toneMapMode.value = toneData.tone_map_mode;
    syncOriginals(
      accelData.preferredAccelerator,
      toneData.prefer_hdr_output,
      toneData.tone_map_mode,
    );
  } catch (e) {
    error.value = errMessage(e, 'Failed to load transcoding settings.');
    toasts.error(error.value);
  } finally {
    loading.value = false;
  }
}

// ── Save ───────────────────────────────────────────────────────────────────────
async function handleSubmit(): Promise<void> {
  submitting.value = true;
  try {
    if (isAcceleratorDirty.value && preferredAccelerator.value !== null) {
      await api.setPreferredAccelerator(preferredAccelerator.value);
    }
    if (isHdrDirty.value || isToneMapDirty.value) {
      await api.setToneMapping({
        prefer_hdr_output: preferHdrOutput.value,
        tone_map_mode: toneMapMode.value,
      });
    }
    toasts.success('Transcoding settings saved.');
    // Refresh originals to clear dirty state
    syncOriginals(preferredAccelerator.value, preferHdrOutput.value, toneMapMode.value);
  } catch (e) {
    toasts.error(e instanceof ApiError ? e.message : 'Failed to save transcoding settings.');
  } finally {
    submitting.value = false;
  }
}

onMounted(loadData);
</script>

<template>
  <section class="transcoding-settings" aria-labelledby="transcoding-heading">
    <header class="transcoding-settings__head">
      <h1 id="transcoding-heading" class="transcoding-settings__title">
        {{ t('admin.transcoding.title') }}
      </h1>
    </header>

    <PageHint>
      Configure hardware-accelerated encoding and HDR tone-mapping for transcoding.
      The server detects available accelerators from FFmpeg on startup.
    </PageHint>

    <div v-if="loading" class="transcoding-settings__skel">
      <Skeleton variant="text" :lines="8" />
    </div>

    <EmptyState
      v-else-if="error"
      icon="alert"
      title="Couldn't load transcoding settings"
      :description="error"
    >
      <template #actions>
        <Button variant="solid" size="sm" left-icon="rewind" @click="loadData">
          {{ t('common.retry') }}
        </Button>
      </template>
    </EmptyState>

    <template v-else>
      <!-- FFmpeg version badge -->
      <div class="transcoding-settings__meta">
        <Badge tone="neutral">FFmpeg {{ ffmpegVersion || 'unknown' }}</Badge>
      </div>

      <form class="transcoding-settings__form" @submit.prevent="handleSubmit">
        <!-- Hardware accelerators -->
        <fieldset class="transcoding-settings__fieldset">
          <legend class="transcoding-settings__legend">
            {{ t('admin.transcoding.preferredAccelerator') }}
          </legend>
          <p class="transcoding-settings__help">
            Choose which accelerator to prefer when hardware encoding is available.
            Software (CPU) encoding is always available as a fallback.
          </p>

          <div v-if="accelerators.length === 0" class="transcoding-settings__empty-accel">
            No accelerators detected.
          </div>

          <div v-else class="transcoding-settings__accelerators">
            <label
              v-for="accel in accelerators"
              :key="accel.name"
              class="transcoding-settings__accel"
              :class="{ 'transcoding-settings__accel--selected': preferredAccelerator === accel.name }"
            >
              <input
                type="radio"
                name="accelerator"
                :value="accel.name"
                :checked="preferredAccelerator === accel.name"
                class="transcoding-settings__radio"
                @change="preferredAccelerator = accel.name"
              />
              <span class="transcoding-settings__accel-name">
                {{ accel.name }}
                <Badge v-if="!accel.isHardware" tone="neutral">software</Badge>
                <Badge v-else tone="accent">hardware</Badge>
              </span>
              <span class="transcoding-settings__accel-encoders">
                {{ accel.encoders.join(', ') }}
              </span>
            </label>
          </div>
        </fieldset>

        <!-- HDR tone mapping -->
        <fieldset class="transcoding-settings__fieldset">
          <legend class="transcoding-settings__legend">
            {{ t('admin.transcoding.hdrOutput') }}
          </legend>
          <p class="transcoding-settings__help">
            Control HDR-to-SDR tone mapping for displays that cannot handle native HDR.
          </p>

          <div class="transcoding-settings__row">
            <Switch
              :model-value="preferHdrOutput"
              :label="t('admin.transcoding.hdrOutput')"
              @update:model-value="(v) => { preferHdrOutput = v; }"
            />
            <span class="transcoding-settings__toggle-label">Prefer HDR output</span>
          </div>

          <div class="transcoding-settings__field">
            <label class="transcoding-settings__label" for="tone-map-mode">
              {{ t('admin.transcoding.toneMapMode') }}
            </label>
            <Select
              id="tone-map-mode"
              :model-value="toneMapMode"
              :options="TONE_MAP_OPTIONS"
              :label="t('admin.transcoding.toneMapMode')"
              @update:model-value="(v) => { toneMapMode = v as ToneMappingSettings['tone_map_mode']; }"
            />
          </div>
        </fieldset>

        <div class="transcoding-settings__actions">
          <Button
            type="submit"
            variant="solid"
            size="sm"
            :disabled="!hasAnyChanges"
            :loading="submitting"
          >
            Save transcoding settings
          </Button>
        </div>
      </form>
    </template>
  </section>
</template>

<style scoped>
.transcoding-settings {
  max-width: 900px;
  margin: 0 auto;
  padding: var(--space-6);
}
.transcoding-settings__head {
  margin-bottom: var(--space-6);
}
.transcoding-settings__title {
  font-family: var(--font-display);
  font-weight: var(--font-semibold);
  font-size: var(--text-xl);
  letter-spacing: var(--tracking-tight);
  color: var(--text);
}
.transcoding-settings__skel {
  padding-block: var(--space-2);
}
.transcoding-settings__meta {
  margin-bottom: var(--space-6);
}
.transcoding-settings__form {
  display: flex;
  flex-direction: column;
  gap: var(--space-8);
}
.transcoding-settings__fieldset {
  border: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}
.transcoding-settings__legend {
  font-size: var(--text-xs);
  font-weight: var(--font-semibold);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  color: var(--text-subtle);
  margin-bottom: var(--space-1);
}
.transcoding-settings__help {
  font-size: var(--text-xs);
  color: var(--text-subtle);
  line-height: var(--leading-normal, 1.5);
  max-width: 40rem;
  margin: 0;
}
.transcoding-settings__empty-accel {
  font-size: var(--text-sm);
  color: var(--text-muted);
}
.transcoding-settings__accelerators {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}
.transcoding-settings__accel {
  display: flex;
  align-items: flex-start;
  gap: var(--space-3);
  padding: var(--space-3) var(--space-4);
  border-radius: var(--radius-md);
  border: 1px solid var(--border);
  background: var(--surface);
  cursor: pointer;
  transition: border-color var(--dur-fast) var(--ease-out),
    background var(--dur-fast) var(--ease-out);
}
.transcoding-settings__accel:hover {
  border-color: var(--accent);
  background: var(--surface-2);
}
.transcoding-settings__accel--selected {
  border-color: var(--accent);
  background: var(--accent-soft);
}
.transcoding-settings__radio {
  margin-top: 0.2rem;
  accent-color: var(--accent);
}
.transcoding-settings__accel-name {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  color: var(--text);
}
.transcoding-settings__accel-encoders {
  font-size: var(--text-xs);
  color: var(--text-subtle);
  margin-top: 0.15rem;
}
.transcoding-settings__row {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}
.transcoding-settings__toggle-label {
  font-size: var(--text-sm);
  color: var(--text);
}
.transcoding-settings__field {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  max-width: 28rem;
}
.transcoding-settings__label {
  font-size: var(--text-xs);
  font-weight: var(--font-semibold);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  color: var(--text-subtle);
}
.transcoding-settings__actions {
  display: flex;
  justify-content: flex-start;
  padding-top: var(--space-2);
  border-top: 1px solid var(--border-subtle);
}
@media (prefers-reduced-motion: reduce) {
  .transcoding-settings__accel {
    transition: none;
  }
}
</style>
