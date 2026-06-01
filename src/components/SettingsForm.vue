<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useAuthStore } from '../stores/useAuthStore';
import type { ServerSettings, SettingGroup } from '../types/server-settings';

const props = defineProps<{
    groups?: SettingGroup[];
}>();

const emit = defineEmits<{
    saved: [settings: ServerSettings];
}>();

const auth = useAuthStore();

const settings = ref<Record<string, unknown>>({});
const loading = ref(true);
const saving = ref(false);
const error = ref<string | null>(null);
const successMsg = ref<string | null>(null);

const allGroups: SettingGroup[] = [
    'transcoding', 'metadata', 'markers', 'subtitles',
    'discovery', 'trickplay', 'newsletter', 'port-forward', 'scrobblers',
];

const displayGroups = computed(() =>
    props.groups ? allGroups.filter(g => props.groups!.includes(g)) : allGroups
);

async function load() {
    loading.value = true;
    error.value = null;
    try {
        const data = await auth.client.get<Record<string, unknown>>('/api/v1/users/me/settings');
        settings.value = data;
    } catch (e) {
        error.value = e instanceof Error ? e.message : 'Failed to load settings';
    } finally {
        loading.value = false;
    }
}

async function save() {
    saving.value = true;
    error.value = null;
    successMsg.value = null;
    try {
        await auth.client.put('/api/v1/users/me/settings', settings.value);
        successMsg.value = 'Settings saved.';
        emit('saved', settings.value as unknown as ServerSettings);
        setTimeout(() => { successMsg.value = null; }, 3000);
    } catch (e) {
        error.value = e instanceof Error ? e.message : 'Failed to save settings';
    } finally {
        saving.value = false;
    }
}

function updateSetting(key: string, value: unknown) {
    settings.value[key] = value;
}

onMounted(load);

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

const settingMeta: Record<string, { label: string; type: 'bool' | 'number' | 'string' }> = {
    'hwaccel.enabled': { label: 'Hardware acceleration', type: 'bool' },
    'hwaccel.prefer_hardware': { label: 'Prefer hardware encoding', type: 'bool' },
    'hwaccel.probe_timeout': { label: 'HW probe timeout (s)', type: 'number' },
    'tmdb.api_key': { label: 'TMDB API Key', type: 'string' },
    'marker_detection.similarity_threshold': { label: 'Intro similarity threshold', type: 'number' },
    'marker_detection.intro_max_duration': { label: 'Max intro duration (s)', type: 'number' },
    'subtitles.enabled': { label: 'Enable subtitles', type: 'bool' },
    'subtitles.default_language': { label: 'Default subtitle language', type: 'string' },
    'subtitles.burn_in_by_default': { label: 'Burn in subtitles by default', type: 'bool' },
    'discovery.discovery_port': { label: 'Discovery port', type: 'number' },
    'trickplay.enabled': { label: 'Enable trickplay', type: 'bool' },
    'trickplay.interval_seconds': { label: 'Trickplay interval (s)', type: 'number' },
    'newsletter.enabled': { label: 'Enable newsletter', type: 'bool' },
    'newsletter.send_hour': { label: 'Newsletter send hour', type: 'number' },
    'port-forward.port_forwarding.upnp_enabled': { label: 'Enable UPnP', type: 'bool' },
    'trakt.client_id': { label: 'Trakt client ID', type: 'string' },
    'trakt.client_secret': { label: 'Trakt client secret', type: 'string' },
    'trakt.redirect_uri': { label: 'Trakt redirect URI', type: 'string' },
};
</script>

<template>
    <div class="settings-form">
        <div v-if="loading" class="settings-loading">Loading settings...</div>
        <div v-else-if="error" class="settings-error">{{ error }}</div>

        <template v-else>
            <div v-for="group in displayGroups" :key="group" class="settings-group">
                <h3 class="group-title">{{ groupLabels[group] }}</h3>

                <div
                    v-for="(meta, key) in settingMeta"
                    v-show="key.startsWith(group)"
                    :key="key"
                    class="setting-row"
                >
                    <label :for="key" class="setting-label">{{ meta.label }}</label>

                    <div class="setting-control">
                        <input
                            v-if="meta.type === 'bool'"
                            :id="key"
                            type="checkbox"
                            class="toggle"
                            :checked="!!settings[key]"
                            @change="updateSetting(key, (($event.target as HTMLInputElement).checked))"
                        />
                        <input
                            v-else-if="meta.type === 'number'"
                            :id="key"
                            type="number"
                            class="input number-input"
                            :value="settings[key]"
                            @change="updateSetting(key, Number(($event.target as HTMLInputElement).value))"
                        />
                        <input
                            v-else
                            :id="key"
                            type="text"
                            class="input"
                            :value="settings[key] ?? ''"
                            @change="updateSetting(key, ($event.target as HTMLInputElement).value)"
                        />
                    </div>
                </div>
            </div>

            <div class="settings-actions">
                <div v-if="successMsg" class="success-msg">{{ successMsg }}</div>
                <button class="save-btn" :disabled="saving" @click="save">
                    {{ saving ? 'Saving...' : 'Save settings' }}
                </button>
            </div>
        </template>
    </div>
</template>

<style scoped>
.settings-form {
    padding: 24px;
    max-width: 700px;
    margin: 0 auto;
}

.settings-loading,
.settings-error {
    padding: 40px;
    text-align: center;
    color: var(--color-text-muted, #a1a1aa);
}

.settings-error {
    color: var(--color-error, #ef4444);
}

.settings-group {
    margin-bottom: 32px;
    padding: 20px;
    background: var(--color-surface, #141420);
    border-radius: var(--radius-lg, 12px);
    border: 1px solid var(--color-border, #27272a);
}

.group-title {
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--color-text-muted, #a1a1aa);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 16px;
}

.setting-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 0;
    border-bottom: 1px solid var(--color-border-subtle, #1f1f23);
}

.setting-row:last-child {
    border-bottom: none;
}

.setting-label {
    font-size: 0.9rem;
    color: var(--color-text, #e4e4e7);
    flex: 1;
}

.setting-control {
    flex-shrink: 0;
}

.toggle {
    width: 44px;
    height: 24px;
    appearance: none;
    background: var(--color-border, #27272a);
    border-radius: 12px;
    position: relative;
    cursor: pointer;
    transition: background 0.2s ease;
}

.toggle::before {
    content: '';
    position: absolute;
    top: 3px;
    left: 3px;
    width: 18px;
    height: 18px;
    background: #fff;
    border-radius: 50%;
    transition: transform 0.2s ease;
}

.toggle:checked {
    background: var(--color-primary, #6366f1);
}

.toggle:checked::before {
    transform: translateX(20px);
}

.input {
    padding: 8px 12px;
    border-radius: var(--radius-md, 8px);
    border: 1px solid var(--color-border, #27272a);
    background: var(--color-bg, #0a0a0f);
    color: var(--color-text, #e4e4e7);
    font-size: 0.875rem;
    min-width: 200px;
}

.input:focus {
    outline: none;
    border-color: var(--color-primary, #6366f1);
}

.number-input {
    width: 100px;
}

.settings-actions {
    display: flex;
    align-items: center;
    gap: 16px;
    padding-top: 16px;
}

.save-btn {
    padding: 10px 24px;
    background: var(--color-primary, #6366f1);
    color: #fff;
    border: none;
    border-radius: var(--radius-md, 8px);
    font-size: 0.9rem;
    font-weight: 500;
    cursor: pointer;
    transition: background 0.15s ease;
}

.save-btn:hover:not(:disabled) {
    background: var(--color-primary-hover, #818cf8);
}

.save-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

.success-msg {
    font-size: 0.875rem;
    color: var(--color-success, #22c55e);
}
</style>
