<!--
  * @copyright 2026 Joe Huss <detain@interserver.net>
  * @license MIT
-->

<script setup lang="ts">
/**
 * SecuritySettingsPage — WebAuthn/passkey management for the user account.
 * Route: /app/settings/security
 * API: /api/v1/me/webauthn/credentials (list/delete)
 *      /api/v1/auth/webauthn/register/options (start registration)
 *      /api/v1/auth/webauthn/register/verify (finish registration)
 */
import { onMounted, ref } from 'vue';
import { useMediaApiBase } from '../composables/useApiBase';
import { ApiClient } from '../api/client';
import EmptyState from '../components/ui/EmptyState.vue';
import Spinner from '../components/ui/Spinner.vue';
import Button from '../components/ui/Button.vue';
import Icon, { type IconName } from '../components/Icon.vue';
import { useToastStore } from '../stores/useToastStore';

interface Credential {
    credential_id: string;
    registered_at: number;
    device_type: 'platform' | 'cross-platform';
    counter?: number;
}

const injectedClient = useMediaApiBase();
const toasts = useToastStore();

function getClient(): ApiClient {
    return new ApiClient({ baseUrl: injectedClient.value });
}

const credentials = ref<Credential[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);
const registering = ref(false);
const deletingId = ref<string | null>(null);

function formatDate(timestamp: number): string {
    return new Date(timestamp * 1000).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
}

function deviceIcon(deviceType: string): IconName {
    return deviceType === 'platform' ? 'monitor' : 'key';
}

function deviceLabel(deviceType: string): string {
    return deviceType === 'platform' ? 'Platform authenticator' : 'Security key';
}

async function loadCredentials(): Promise<void> {
    loading.value = true;
    error.value = null;
    try {
        const client = getClient();
        const data = await client.get<{ credentials: Credential[] }>('/api/v1/me/webauthn/credentials');
        credentials.value = data.credentials ?? [];
    } catch (e) {
        error.value = e instanceof Error ? e.message : 'Failed to load credentials';
    } finally {
        loading.value = false;
    }
}

async function handleDelete(credentialId: string): Promise<void> {
    if (!confirm('Are you sure you want to delete this passkey? This action cannot be undone.')) {
        return;
    }

    deletingId.value = credentialId;
    try {
        const client = getClient();
        await client.delete(`/api/v1/me/webauthn/credentials/${encodeURIComponent(credentialId)}`);
        toasts.success('Passkey deleted successfully');
        await loadCredentials();
    } catch (e) {
        toasts.error(e instanceof Error ? e.message : 'Failed to delete passkey');
    } finally {
        deletingId.value = null;
    }
}

async function handleRegister(): Promise<void> {
    registering.value = true;
    try {
        const client = getClient();

        // Step 1: Get registration options
        const options = await client.post<{
            challenge: string;
            user: { id: string };
            excludeCredentials?: Array<{ id: string }>;
        }>('/api/v1/auth/webauthn/register/options', {});

        // Step 2: Decode base64 challenge and user.id to Uint8Array
        const publicKeyOptions: PublicKeyCredentialCreationOptions = {
            challenge: Uint8Array.from(atob(options.challenge), c => c.charCodeAt(0)),
            rp: {
                name: 'PHLIX',
            },
            pubKeyCredParams: [
                { type: 'public-key', alg: -7 },   // ES256
                { type: 'public-key', alg: -257 }, // RS256
            ] as PublicKeyCredentialParameters[],
            user: {
                id: Uint8Array.from(atob(options.user.id), c => c.charCodeAt(0)),
                name: 'phlix user',
                displayName: 'PHLIX User',
            },
            excludeCredentials: options.excludeCredentials?.map(cred => ({
                id: Uint8Array.from(atob(cred.id), c => c.charCodeAt(0)),
                type: 'public-key',
            })),
            timeout: 60000,
            attestation: 'none',
            authenticatorSelection: {
                authenticatorAttachment: 'cross-platform',
                residentKey: 'preferred',
                userVerification: 'preferred',
            },
        };

        // Step 3: Create credential using WebAuthn API
        const credential = await navigator.credentials.create({
            publicKey: publicKeyOptions,
        }) as PublicKeyCredential | null;

        if (!credential) {
            throw new Error('No credential created');
        }

        // Step 4: Encode credential for transfer
        const attestationResponse = credential.response as AuthenticatorAttestationResponse;
        const enc = (buf: ArrayBuffer | ArrayBufferView): string => {
            const arr = buf instanceof ArrayBuffer ? new Uint8Array(buf) : new Uint8Array(buf.buffer, buf.byteOffset, buf.byteLength);
            return btoa(String.fromCharCode(...arr));
        };
        const credentialData = {
            attestationObject: enc(attestationResponse.attestationObject),
            clientDataJSON: enc(attestationResponse.clientDataJSON),
            transports: attestationResponse.getTransports ? attestationResponse.getTransports() : [],
        };

        // Step 5: Verify registration with server
        await client.post('/api/v1/auth/webauthn/register/verify', {
            credential: credentialData,
            challenge: options.challenge,
        });

        toasts.success('Passkey registered successfully');
        await loadCredentials();
    } catch (e) {
        if (e instanceof Error && e.name !== 'NotAllowedError') {
            toasts.error(e.message);
        }
    } finally {
        registering.value = false;
    }
}

function retry(): void {
    void loadCredentials();
}

onMounted(() => {
    void loadCredentials();
});
</script>

<template>
    <div class="security-settings-page">
        <header class="security-settings-page__head">
            <p class="security-settings-page__eyebrow">Account Security</p>
            <h1 class="security-settings-page__title">Passkey Settings</h1>
            <p class="security-settings-page__desc">
                Manage your passkeys (WebAuthn/FIDO2 credentials) for passwordless login.
            </p>
        </header>

        <section class="security-settings-page__card">
            <header class="security-settings-page__card-header">
                <h2 class="security-settings-page__card-title">Registered Passkeys</h2>
            </header>

            <div class="security-settings-page__card-body">
                <Spinner v-if="loading" label="Loading credentials..." />

                <EmptyState
                    v-else-if="error"
                    icon="alert"
                    title="Couldn't load passkeys"
                    :description="error"
                >
                    <template #actions>
                        <Button variant="solid" size="sm" left-icon="refresh" @click="retry">
                            Retry
                        </Button>
                    </template>
                </EmptyState>

                <EmptyState
                    v-else-if="credentials.length === 0"
                    icon="key"
                    title="No passkeys registered"
                    description="Add a passkey to enable passwordless login on your devices."
                />

                <ul v-else class="credentials-list">
                    <li
                        v-for="cred in credentials"
                        :key="cred.credential_id"
                        class="credential-item"
                    >
                        <div class="credential-item__icon">
                            <Icon :name="deviceIcon(cred.device_type)" />
                        </div>
                        <div class="credential-item__info">
                            <span class="credential-item__id">
                                {{ cred.credential_id.substring(0, 20) }}...
                            </span>
                            <span class="credential-item__meta">
                                {{ deviceLabel(cred.device_type) }} ·
                                Registered {{ formatDate(cred.registered_at) }}
                            </span>
                        </div>
                        <Button
                            variant="ghost"
                            size="sm"
                            class="credential-item__delete"
                            :disabled="deletingId === cred.credential_id"
                            @click="handleDelete(cred.credential_id)"
                        >
                            <template v-if="deletingId === cred.credential_id">
                                <Spinner size="xs" />
                            </template>
                            <template v-else>
                                <Icon name="trash" />
                            </template>
                        </Button>
                    </li>
                </ul>
            </div>

            <footer class="security-settings-page__card-footer">
                <Button
                    variant="solid"
                    :disabled="registering"
                    @click="handleRegister"
                >
                    <template v-if="registering">
                        <Spinner size="xs" class="mr-2" />
                        Starting...
                    </template>
                    <template v-else>
                        <Icon name="plus" class="mr-2" />
                        Add Passkey
                    </template>
                </Button>
            </footer>
        </section>

        <section class="security-settings-page__info">
            <h3 class="security-settings-page__info-title">What is a passkey?</h3>
            <p>
                A passkey is a FIDO2/WebAuthn credential that allows you to log in securely
                without a password. It uses public-key cryptography to protect your account
                from phishing and credential theft attacks.
            </p>
        </section>

        <section class="security-settings-page__notes">
            <h3 class="security-settings-page__notes-title">Security Notes</h3>
            <ul class="security-settings-page__notes-list">
                <li>Passkeys are unique to each device and cannot be reused if lost.</li>
                <li>Keep backup codes or alternative login methods in a safe place.</li>
                <li>Deleting a passkey is permanent and cannot be undone.</li>
                <li>Platform authenticators (like Touch ID or Windows Hello) require the specific device.</li>
            </ul>
        </section>
    </div>
</template>

<style scoped>
.security-settings-page {
    max-width: 640px;
    margin: 0 auto;
    padding: var(--space-8) var(--space-4) var(--space-16);
}

.security-settings-page__head {
    margin-bottom: var(--space-6);
}

.security-settings-page__eyebrow {
    font-size: var(--text-2xs);
    font-weight: var(--fw-semibold, 600);
    letter-spacing: var(--tracking-caps);
    text-transform: uppercase;
    color: var(--text-subtle);
}

.security-settings-page__title {
    margin-top: var(--space-1);
    font-family: var(--font-display);
    font-weight: var(--fw-semibold, 600);
    font-size: var(--text-2xl);
    letter-spacing: var(--tracking-tight);
    color: var(--text);
}

.security-settings-page__desc {
    margin-top: var(--space-2);
    color: var(--text-muted);
    font-size: var(--text-sm);
}

.security-settings-page__card {
    background: var(--surface-1);
    border: 1px solid var(--border-subtle);
    border-radius: var(--radius-lg);
    overflow: hidden;
    margin-bottom: var(--space-6);
}

.security-settings-page__card-header {
    padding: var(--space-4) var(--space-4);
    border-bottom: 1px solid var(--border-subtle);
}

.security-settings-page__card-title {
    font-family: var(--font-display);
    font-size: var(--text-base);
    font-weight: 600;
    color: var(--text);
    margin: 0;
}

.security-settings-page__card-body {
    padding: var(--space-4);
    min-height: 80px;
}

.security-settings-page__card-footer {
    padding: var(--space-4);
    border-top: 1px solid var(--border-subtle);
    background: var(--surface-2);
}

.credentials-list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
}

.credential-item {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    padding: var(--space-3);
    border-radius: var(--radius-md);
    background: var(--surface-2);
}

.credential-item__icon {
    width: 36px;
    height: 36px;
    display: grid;
    place-items: center;
    border-radius: var(--radius-full);
    background: var(--surface-3);
    color: var(--text-muted);
}

.credential-item__info {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 2px;
}

.credential-item__id {
    font-family: var(--font-mono, monospace);
    font-size: var(--text-sm);
    color: var(--text);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.credential-item__meta {
    font-size: var(--text-xs);
    color: var(--text-subtle);
}

.credential-item__delete {
    color: var(--text-muted);
}

.credential-item__delete:hover {
    color: var(--error);
}

.security-settings-page__info {
    padding: var(--space-4);
    background: var(--accent-alpha);
    border: 1px solid var(--accent);
    border-radius: var(--radius-lg);
    margin-bottom: var(--space-6);
}

.security-settings-page__info-title {
    font-family: var(--font-display);
    font-size: var(--text-sm);
    font-weight: 600;
    color: var(--text);
    margin: 0 0 var(--space-2) 0;
}

.security-settings-page__info p {
    margin: 0;
    font-size: var(--text-sm);
    color: var(--text-muted);
    line-height: 1.5;
}

.security-settings-page__notes {
    padding: var(--space-4);
    background: var(--surface-1);
    border: 1px solid var(--border-subtle);
    border-radius: var(--radius-lg);
}

.security-settings-page__notes-title {
    font-family: var(--font-display);
    font-size: var(--text-sm);
    font-weight: 600;
    color: var(--text);
    margin: 0 0 var(--space-3) 0;
}

.security-settings-page__notes-list {
    margin: 0;
    padding-left: var(--space-4);
    font-size: var(--text-sm);
    color: var(--text-muted);
    line-height: 1.6;
}

.security-settings-page__notes-list li + li {
    margin-top: var(--space-1);
}

.mr-2 {
    margin-right: var(--space-2);
}
</style>
