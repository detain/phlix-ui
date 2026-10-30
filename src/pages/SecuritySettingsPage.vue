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
import ConfirmDialog from '../components/ui/ConfirmDialog.vue';
import Icon, { type IconName } from '../components/Icon.vue';
import { useToastStore } from '../stores/useToastStore';
import { useAuthStore } from '../stores/useAuthStore';

interface Credential {
    credential_id: string;
    registered_at: number;
    /** The server persists this as NULL today (WebAuthnManager hardcodes
     *  deviceType: null on registration) — the union keeps the honest shape
     *  for whichever day it starts populating it. */
    device_type: 'platform' | 'cross-platform' | null;
    counter?: number;
}

/** Registration-time choices the server does not store for us. */
type AttachmentChoice = 'auto' | 'platform' | 'cross-platform';

const attachmentOptions: Array<{ value: AttachmentChoice; label: string }> = [
    { value: 'auto', label: 'Let device decide' },
    { value: 'platform', label: 'Device passkey' },
    { value: 'cross-platform', label: 'Security key' },
];

interface PasskeyMeta {
    nickname?: string;
    attachment?: Exclude<AttachmentChoice, 'auto'>;
}

const injectedClient = useMediaApiBase();
const toasts = useToastStore();
const auth = useAuthStore();

function getClient(): ApiClient {
    return new ApiClient({ baseUrl: injectedClient.value });
}

const credentials = ref<Credential[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);
const registering = ref(false);
const deletingId = ref<string | null>(null);
const nickname = ref('');
const attachment = ref<AttachmentChoice>('auto');
const statusLine = ref<string | null>(null);

/**
 * Nicknames and the chosen authenticator kind live in this browser's
 * localStorage (keyed per account) because the server's credential record
 * has no label column and stores device_type as NULL. They are a LOCAL
 * convenience for recognizing your own passkeys in this list — not part of
 * the credential itself.
 */
const metaMap = ref<Record<string, PasskeyMeta>>({});

function metaStorageKey(): string {
    const uid = auth.user?.id;
    return uid ? `phlix.passkey-meta.${uid}` : 'phlix.passkey-meta';
}

function loadMeta(): void {
    try {
        const raw = localStorage.getItem(metaStorageKey());
        const parsed: unknown = raw ? JSON.parse(raw) : {};
        metaMap.value = parsed && typeof parsed === 'object' ? parsed as Record<string, PasskeyMeta> : {};
    } catch {
        metaMap.value = {};
    }
}

function storeMeta(credentialId: string, meta: PasskeyMeta): void {
    metaMap.value = { ...metaMap.value, [credentialId]: meta };
    try {
        localStorage.setItem(metaStorageKey(), JSON.stringify(metaMap.value));
    } catch {
        /* storage unavailable (private mode) — labels simply stay default */
    }
}

function forgetMeta(credentialId: string): void {
    if (!(credentialId in metaMap.value)) return;
    const next = { ...metaMap.value };
    delete next[credentialId];
    metaMap.value = next;
    try {
        localStorage.setItem(metaStorageKey(), JSON.stringify(next));
    } catch {
        /* ignore */
    }
}

function metaFor(credentialId: string): PasskeyMeta | undefined {
    return metaMap.value[credentialId];
}

function titleFor(cred: Credential): string {
    const nick = metaFor(cred.credential_id)?.nickname;
    if (nick) return nick;
    return `${cred.credential_id.substring(0, 20)}…`;
}

function attachmentKind(cred: Credential): 'platform' | 'cross-platform' | null {
    if (cred.device_type === 'platform' || cred.device_type === 'cross-platform') return cred.device_type;
    const stored = metaFor(cred.credential_id)?.attachment;
    return stored === 'platform' || stored === 'cross-platform' ? stored : null;
}

function formatDate(timestamp: number): string {
    return new Date(timestamp * 1000).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
}

function deviceIcon(kind: 'platform' | 'cross-platform' | null): IconName {
    return kind === 'platform' ? 'monitor' : 'key';
}

function deviceLabel(kind: 'platform' | 'cross-platform' | null): string {
    if (kind === 'platform') return 'Platform authenticator';
    if (kind === 'cross-platform') return 'Security key';
    return 'Passkey';
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

/** R13-05: credential id pending deletion — non-null arms the shared ConfirmDialog. */
const pendingDeleteId = ref<string | null>(null);

function handleDelete(credentialId: string): void {
    pendingDeleteId.value = credentialId;
}

async function confirmDelete(): Promise<void> {
    const credentialId = pendingDeleteId.value;
    pendingDeleteId.value = null;
    if (!credentialId) return;

    deletingId.value = credentialId;
    try {
        const client = getClient();
        await client.delete(`/api/v1/me/webauthn/credentials/${encodeURIComponent(credentialId)}`);
        forgetMeta(credentialId);
        toasts.success('Passkey deleted successfully.');
        await loadCredentials();
    } catch (e) {
        toasts.error(e instanceof Error ? e.message : 'Failed to delete passkey');
    } finally {
        deletingId.value = null;
    }
}

async function handleRegister(): Promise<void> {
    registering.value = true;
    statusLine.value = null;
    try {
        const client = getClient();

        // Step 1: Get registration options. The server resolves the REAL
        // account identity into options.user.name/displayName (falling back
        // to the signed-in user in the auth store if a deployment omits it).
        const options = await client.post<{
            challenge: string;
            user: { id: string; name?: string; displayName?: string };
            excludeCredentials?: Array<{ id: string }>;
        }>('/api/v1/auth/webauthn/register/options', {});

        const identityName =
            options.user.name ?? auth.user?.username ?? auth.user?.email ?? 'phlix user';
        const identityDisplay =
            options.user.displayName ?? auth.user?.name ?? auth.user?.username ?? identityName;

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
                name: identityName,
                displayName: identityDisplay,
            },
            excludeCredentials: options.excludeCredentials?.map(cred => ({
                id: Uint8Array.from(atob(cred.id), c => c.charCodeAt(0)),
                type: 'public-key',
            })),
            timeout: 60000,
            attestation: 'none',
            // 'auto' deliberately OMITS authenticatorAttachment so the user's
            // platform can offer device passkeys AND security keys — the old
            // hard-coded 'cross-platform' made phone/laptop passkeys unenrollable.
            authenticatorSelection: {
                ...(attachment.value === 'auto'
                    ? {}
                    : { authenticatorAttachment: attachment.value }),
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

        // Step 5: Verify registration with server (returns the stored credential id)
        const verified = await client.post<{ credential_id?: string }>(
            '/api/v1/auth/webauthn/register/verify',
            {
                credential: credentialData,
                challenge: options.challenge,
            },
        );

        // Persist the local label against the credential id the server echoed.
        const trimmedNickname = nickname.value.trim();
        if (verified.credential_id && (trimmedNickname || attachment.value !== 'auto')) {
            storeMeta(verified.credential_id, {
                ...(trimmedNickname ? { nickname: trimmedNickname } : {}),
                ...(attachment.value === 'auto' ? {} : { attachment: attachment.value }),
            });
        }
        nickname.value = '';

        statusLine.value = 'Passkey registered successfully';
        toasts.success('Passkey registered successfully.');
        await loadCredentials();
    } catch (e) {
        if (e instanceof Error && e.name === 'NotAllowedError') {
            // User dismissed the prompt, or it timed out. Neutral, actionable
            // status — the previous code swallowed this in total silence.
            statusLine.value = 'Registration was cancelled or timed out — try again.';
        } else if (e instanceof Error) {
            statusLine.value = null;
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
    loadMeta();
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
                    title="Couldn’t load passkeys"
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
                            <Icon :name="deviceIcon(attachmentKind(cred))" />
                        </div>
                        <div class="credential-item__info">
                            <span class="credential-item__id">
                                {{ titleFor(cred) }}
                            </span>
                            <span class="credential-item__meta">
                                {{ deviceLabel(attachmentKind(cred)) }} ·
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
                <div class="register-form">
                    <label class="register-form__field">
                        <span class="register-form__label">Nickname (optional)</span>
                        <input
                            v-model="nickname"
                            type="text"
                            class="register-form__input"
                            placeholder="e.g. Work laptop"
                            maxlength="60"
                            autocomplete="off"
                        >
                    </label>
                    <fieldset class="register-form__choice">
                        <legend class="register-form__label">Authenticator type</legend>
                        <div class="register-form__segments">
                            <label
                                v-for="opt in attachmentOptions"
                                :key="opt.value"
                                class="register-form__segment"
                            >
                                <input
                                    v-model="attachment"
                                    type="radio"
                                    name="passkey-attachment"
                                    :value="opt.value"
                                >
                                <span>{{ opt.label }}</span>
                            </label>
                        </div>
                    </fieldset>
                </div>
                <p
                    v-if="statusLine"
                    class="security-settings-page__status"
                    role="status"
                >
                    {{ statusLine }}
                </p>
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

        <!-- R13-05: shared in-app confirm replacing window.confirm -->
        <ConfirmDialog
          :open="pendingDeleteId !== null"
          message="Deleting this passkey is permanent and cannot be undone — devices using it will fall back to your other sign-in methods."
          confirm-label="Delete passkey"
          danger
          @update:open="(v: boolean) => { if (!v) pendingDeleteId = null; }"
          @confirm="confirmDelete"
        />
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
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-3);
}

.register-form {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-4);
    align-items: flex-end;
    width: 100%;
}

.register-form__field {
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
    min-width: 200px;
    flex: 1;
}

.register-form__label {
    font-size: var(--text-xs);
    font-weight: 600;
    color: var(--text-muted);
}

.register-form__input {
    padding: var(--space-2) var(--space-3);
    border-radius: var(--radius-md);
    border: 1px solid var(--border);
    background: var(--surface-1);
    color: var(--text);
    font-size: var(--text-sm);
}

.register-form__input:focus-visible {
    outline: 2px solid var(--accent, var(--primary));
    outline-offset: 1px;
}

.register-form__choice {
    border: 0;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
}

.register-form__segments {
    display: inline-flex;
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    overflow: hidden;
}

.register-form__segment {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    padding: var(--space-2) var(--space-3);
    font-size: var(--text-sm);
    color: var(--text-muted);
    cursor: pointer;
    background: var(--surface-1);
}

.register-form__segment + .register-form__segment {
    border-left: 1px solid var(--border);
}

.register-form__segment:has(input:checked) {
    background: var(--surface-3);
    color: var(--text);
    font-weight: 600;
}

.register-form__segment input {
    accent-color: var(--primary);
}

.security-settings-page__status {
    margin: 0;
    font-size: var(--text-sm);
    color: var(--text-muted);
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
