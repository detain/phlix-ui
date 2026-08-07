<!--
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 -->

<script setup lang="ts">
/**
 * McpTokensPage (S243) — the hub user's MCP personal-access-token manager.
 *
 * S62 shipped the API (`phlix-hub` PR #215) and named an "admin list/revoke UI"
 * that was never built in either repo. This is that surface.
 *
 * API (all three inside the hub's auth-gated group, so the ordinary hub session
 * JWT authenticates them — an MCP token is useless here and is never sent):
 *
 *   GET    /api/v1/me/mcp-tokens       → { tokens, available_scopes }
 *   POST   /api/v1/me/mcp-tokens       → 201 { id, token, name, scopes, expires_at }
 *   DELETE /api/v1/me/mcp-tokens/{id}  → { revoked, id }   (404 = unknown/not yours)
 *
 * ## Why the reveal dialog is built the way it is
 *
 * The plaintext is **show-once**: `POST` is the only response that has ever
 * carried a `token` field, because `McpTokenService::mint()` persists only its
 * SHA-256 hash and `listForUser()` has no column that could return it. A user
 * who dismisses the reveal without copying has lost the credential for good —
 * the only recovery is revoke-and-remint.
 *
 * So the reveal is deliberately hostile to accidental dismissal:
 *
 *  - `:dismissible="false"` — Esc and a backdrop click do nothing;
 *  - `hide-close` — there is no ✕;
 *  - the Done button is gated on an explicit "I have saved this token" checkbox,
 *    and {@link closeReveal} re-checks that flag itself, so the gate holds even
 *    if something dispatches a click straight at the disabled button (a
 *    disabled-attribute-only guard is not a guard — VTU's `trigger()` cannot
 *    even reach one, which is how such guards get deleted unnoticed).
 *
 * ## Why the scope list is not hardcoded
 *
 * The checkboxes are built from `available_scopes` in the list response, which
 * the hub fills from `McpScopes::all()`. A value the server does not recognise
 * is dropped by `McpScopes::fromArray()`, and a request whose scopes all drop
 * is a 400 (`mcp_token.no_valid_scopes`) — so offering a guessed scope is a
 * broken form. {@link submittableScopes} additionally intersects the user's
 * selection with the server's list before the POST, and {@link createToken}
 * refuses to fire on an empty result rather than sending a request that can
 * only 400.
 */
import { computed, onMounted, ref } from 'vue';
import { api, ApiClient } from '../api/client';
import {
    McpTokensApi,
    MCP_SCOPES,
    MCP_TOKEN_PREFIX,
    scopeLabel,
    scopeDescription,
    type McpTokenSummary,
    type McpTokenMinted,
} from '../api/mcp-tokens';
import { useToastStore } from '../stores/useToastStore';
import { errMessage } from '../api/errors';
import Badge from '../components/ui/Badge.vue';
import Button from '../components/ui/Button.vue';
import Input from '../components/ui/Input.vue';
import Modal from '../components/ui/Modal.vue';
import Skeleton from '../components/ui/Skeleton.vue';
import EmptyState from '../components/ui/EmptyState.vue';
import PageHint from '../components/ui/PageHint.vue';
import { hubPageHelp } from './hubHelpLinks';

const props = defineProps<{
    /** Inject an API client for tests; defaults to the shared `api` singleton. */
    client?: ApiClient;
}>();

const http = props.client ?? api;
const tokensApi = new McpTokensApi(http);
const toasts = useToastStore();

// ─── List state ──────────────────────────────────────────────────────────────

const tokens = ref<McpTokenSummary[]>([]);
/** The hub's own scope vocabulary; falls back to this build's constant. */
const availableScopes = ref<string[]>([...MCP_SCOPES]);
const loading = ref(true);
const error = ref<string | null>(null);

// ─── Create-form state ───────────────────────────────────────────────────────

const showCreateModal = ref(false);
const creating = ref(false);
const formName = ref('');
/**
 * The user's scope selection. Seeded from the hub's vocabulary on the FIRST
 * successful load and then STICKY across modal opens — a user who always wants
 * a read-only token should not re-uncheck the same boxes every time.
 *
 * ⚠ That stickiness is exactly why {@link submittableScopes} exists rather than
 * being redundant: the vocabulary is re-read on every refresh, so a hub that
 * drops a scope leaves a selection naming a value the server would reject.
 */
const selectedScopes = ref<string[]>([]);
/** Whether {@link selectedScopes} has been seeded from the hub's vocabulary. */
const scopesSeeded = ref(false);

// ─── Show-once reveal state ──────────────────────────────────────────────────

/** The just-minted token. Non-null ONLY while the reveal dialog is open. */
const minted = ref<McpTokenMinted | null>(null);
/** The explicit "I have saved this" acknowledgement gating the reveal's Done. */
const ackSaved = ref(false);
const copying = ref(false);

// ─── Revoke-confirm state ────────────────────────────────────────────────────

const revokeTarget = ref<McpTokenSummary | null>(null);
const revoking = ref(false);

// ─── Computed ────────────────────────────────────────────────────────────────

/**
 * The scopes actually sent to the server: the user's selection intersected with
 * the vocabulary the hub reported. A selection the server would drop never
 * leaves the browser, so the form cannot produce a 400 by offering a stale
 * scope after a list refresh.
 */
const submittableScopes = computed(() =>
    selectedScopes.value.filter((s) => availableScopes.value.includes(s)),
);

/** Whether the create form is in a state the server would accept. */
const canSubmit = computed(() => submittableScopes.value.length > 0);

// ─── Display helpers ─────────────────────────────────────────────────────────

function formatDate(unixSeconds: number | null): string {
    if (unixSeconds === null || unixSeconds === 0) return '—';
    return new Date(unixSeconds * 1000).toLocaleDateString();
}

function formatLastUsed(unixSeconds: number | null): string {
    if (unixSeconds === null || unixSeconds === 0) return 'Never used';
    return `Last used ${new Date(unixSeconds * 1000).toLocaleDateString()}`;
}

/** Revoked wins over expired: a revoked token is dead regardless of its clock. */
function statusLabel(token: McpTokenSummary): string {
    if (token.revoked) return 'Revoked';
    if (token.expired) return 'Expired';
    return 'Active';
}

function statusTone(token: McpTokenSummary): 'error' | 'warning' | 'success' {
    if (token.revoked) return 'error';
    if (token.expired) return 'warning';
    return 'success';
}

function displayName(token: McpTokenSummary): string {
    return token.name.trim() === '' ? 'Unnamed token' : token.name;
}

/** A revoked token has nothing left to revoke; the action is hidden, not disabled. */
function canRevoke(token: McpTokenSummary): boolean {
    return !token.revoked;
}

// ─── Load ────────────────────────────────────────────────────────────────────

async function loadTokens(initial = false): Promise<void> {
    if (initial) loading.value = true;
    error.value = null;
    try {
        const data = await tokensApi.list();
        tokens.value = data.tokens ?? [];
        // Only adopt a non-empty list: an older hub that omits the field must not
        // leave the create form with zero selectable scopes.
        if (Array.isArray(data.available_scopes) && data.available_scopes.length > 0) {
            availableScopes.value = data.available_scopes;
        }
        // Seed the selection once: the default grant is every scope the hub
        // offers, matching the API's own default when `scopes` is omitted.
        // Later refreshes must NOT re-seed, or a deliberate narrowing would be
        // silently undone under the user.
        if (!scopesSeeded.value) {
            selectedScopes.value = [...availableScopes.value];
            scopesSeeded.value = true;
        }
    } catch (e) {
        error.value = errMessage(e, 'Failed to load MCP tokens.');
        toasts.error(error.value);
    } finally {
        if (initial) loading.value = false;
    }
}

// ─── Create ──────────────────────────────────────────────────────────────────

function openCreateModal(): void {
    formName.value = '';
    // The scope selection is deliberately NOT reset — see `selectedScopes`.
    showCreateModal.value = true;
}

function closeCreateModal(): void {
    showCreateModal.value = false;
    formName.value = '';
}

function toggleScope(scope: string): void {
    const i = selectedScopes.value.indexOf(scope);
    if (i === -1) selectedScopes.value = [...selectedScopes.value, scope];
    else selectedScopes.value = selectedScopes.value.filter((s) => s !== scope);
}

function isScopeSelected(scope: string): boolean {
    return selectedScopes.value.includes(scope);
}

async function createToken(): Promise<void> {
    // The real guard. The Create button is also `:disabled`, but a disabled
    // attribute is presentation — this is what stops a request the server can
    // only answer with 400 `mcp_token.no_valid_scopes`.
    if (!canSubmit.value) {
        toasts.error('Select at least one scope.');
        return;
    }
    if (creating.value) return;
    creating.value = true;
    try {
        const result = await tokensApi.create({
            name: formName.value.trim(),
            scopes: submittableScopes.value,
        });
        showCreateModal.value = false;
        // Open the show-once reveal BEFORE refreshing the list: the plaintext is
        // unrecoverable, so it must be on screen even if the refresh fails.
        ackSaved.value = false;
        minted.value = result;
        await loadTokens();
    } catch (e) {
        toasts.error(errMessage(e, 'Failed to create MCP token.'));
    } finally {
        creating.value = false;
    }
}

// ─── Show-once reveal ────────────────────────────────────────────────────────

async function copyMinted(): Promise<void> {
    const token = minted.value?.token;
    if (!token) return;
    copying.value = true;
    try {
        await navigator.clipboard.writeText(token);
        toasts.success('Token copied to clipboard.');
    } catch {
        toasts.error('Could not copy — select the token and copy it manually.');
    } finally {
        copying.value = false;
    }
}

/**
 * Dismiss the reveal. Refuses unless the user ticked the acknowledgement, so
 * the only way past this dialog is a deliberate one. Clearing `minted` drops
 * the plaintext from the component's state as well as the DOM.
 */
function closeReveal(): void {
    if (!ackSaved.value) return;
    minted.value = null;
    ackSaved.value = false;
}

// ─── Revoke ──────────────────────────────────────────────────────────────────

function askRevoke(token: McpTokenSummary): void {
    revokeTarget.value = token;
}

function cancelRevoke(): void {
    revokeTarget.value = null;
}

async function confirmRevoke(): Promise<void> {
    const target = revokeTarget.value;
    if (!target || revoking.value) return;
    revoking.value = true;
    try {
        await tokensApi.revoke(target.id);
        toasts.success(`Revoked “${displayName(target)}”.`);
        revokeTarget.value = null;
        await loadTokens();
    } catch (e) {
        toasts.error(errMessage(e, 'Failed to revoke token.'));
    } finally {
        revoking.value = false;
    }
}

onMounted(() => loadTokens(true));
</script>

<template>
  <section class="mcp-tokens" aria-labelledby="mcp-tokens-heading">
    <header class="mcp-tokens__head">
      <div class="mcp-tokens__head-text">
        <h1 id="mcp-tokens-heading" class="mcp-tokens__title">MCP Tokens</h1>
        <p class="mcp-tokens__subtitle">
          Personal access tokens an MCP client (Claude Desktop, an agent runner, an editor
          plugin) presents to this hub.
        </p>
      </div>
      <Button variant="solid" size="md" left-icon="plus" @click="openCreateModal">
        New Token
      </Button>
    </header>

    <PageHint
      :links="hubPageHelp['mcp-tokens'].links"
      :details="hubPageHelp['mcp-tokens'].details"
    >
      An MCP token lets an assistant reach the servers <strong>you</strong> own, and nothing
      else. The token is shown <strong>once</strong> when you create it and is never
      recoverable afterwards. <strong>Revoke</strong> kills it immediately.
    </PageHint>

    <!-- Loading skeleton -->
    <div v-if="loading" class="mcp-tokens__skel">
      <Skeleton variant="rect" height="96px" />
      <Skeleton variant="rect" height="96px" />
    </div>

    <!-- Error state -->
    <EmptyState
      v-else-if="error"
      icon="alert"
      title="Couldn't load MCP tokens"
      :description="error"
    >
      <template #actions>
        <Button variant="solid" size="sm" left-icon="refresh" @click="loadTokens(true)">
          Retry
        </Button>
      </template>
    </EmptyState>

    <!-- Empty state -->
    <EmptyState
      v-else-if="tokens.length === 0"
      icon="key"
      title="No MCP tokens"
      description="Create a token to let an MCP client reach your servers on your behalf."
    />

    <!-- Token list -->
    <div v-else class="mcp-tokens__list">
      <article v-for="token in tokens" :key="token.id" class="mcp-token-card">
        <div class="mcp-token-card__main">
          <div class="mcp-token-card__names">
            <span class="mcp-token-card__name">{{ displayName(token) }}</span>
            <Badge :tone="statusTone(token)">{{ statusLabel(token) }}</Badge>
          </div>
          <div class="mcp-token-card__scopes">
            <Badge v-for="scope in token.scopes" :key="scope" tone="info" mono>{{ scope }}</Badge>
            <span v-if="token.scopes.length === 0" class="mcp-token-card__noscope">No scopes</span>
          </div>
          <div class="mcp-token-card__meta">
            <span>Created {{ formatDate(token.created_at) }}</span>
            <span class="mcp-token-card__divider">·</span>
            <span>Expires {{ formatDate(token.expires_at) }}</span>
            <span class="mcp-token-card__divider">·</span>
            <span>{{ formatLastUsed(token.last_used_at) }}</span>
          </div>
        </div>
        <div class="mcp-token-card__actions">
          <Button
            v-if="canRevoke(token)"
            variant="ghost"
            size="sm"
            @click="askRevoke(token)"
          >
            Revoke
          </Button>
        </div>
      </article>
    </div>

    <!-- Create modal -->
    <Modal
      :model-value="showCreateModal"
      title="New MCP Token"
      @update:model-value="closeCreateModal"
    >
      <div class="mcp-tokens__form">
        <Input v-model="formName" label="Name" placeholder="e.g. Claude Desktop" />

        <fieldset class="mcp-scopes">
          <legend class="mcp-scopes__legend">Scopes</legend>
          <p class="mcp-scopes__hint">
            A token can only ever be narrower than your account. Scopes never grant access to a
            server you do not own.
          </p>
          <label v-for="scope in availableScopes" :key="scope" class="mcp-scope">
            <input
              class="mcp-scope__box"
              type="checkbox"
              :value="scope"
              :checked="isScopeSelected(scope)"
              @change="toggleScope(scope)"
            />
            <span class="mcp-scope__text">
              <span class="mcp-scope__label">{{ scopeLabel(scope) }}</span>
              <span class="mcp-scope__code">{{ scope }}</span>
              <span v-if="scopeDescription(scope)" class="mcp-scope__desc">
                {{ scopeDescription(scope) }}
              </span>
            </span>
          </label>
          <p v-if="!canSubmit" class="mcp-scopes__warn">
            Select at least one scope — a token with none would authenticate but authorise
            nothing, so the hub refuses it.
          </p>
        </fieldset>
      </div>

      <template #footer>
        <Button variant="ghost" size="sm" @click="closeCreateModal">Cancel</Button>
        <Button
          variant="solid"
          size="sm"
          class="mcp-tokens__create"
          :disabled="!canSubmit"
          :loading="creating"
          @click="createToken"
        >
          Create token
        </Button>
      </template>
    </Modal>

    <!--
      Show-once reveal. Not dismissible by Esc or backdrop, and has no ✕ — the
      plaintext exists nowhere else, so an accidental dismissal is a permanent loss.
    -->
    <Modal
      :model-value="minted !== null"
      title="Copy your token now"
      :dismissible="false"
      hide-close
      size="lg"
      @update:model-value="closeReveal"
    >
      <div class="mcp-reveal">
        <p class="mcp-reveal__warn" role="alert">
          This is the only time this token will ever be shown. Phlix stores only a SHA-256 hash
          of it, so it cannot be looked up, re-sent or recovered. If you lose it you must revoke
          this token and create a new one.
        </p>

        <div class="mcp-reveal__value">
          <code class="mcp-reveal__token" data-testid="mcp-token-plaintext">{{ minted?.token }}</code>
          <Button
            variant="solid"
            size="sm"
            left-icon="bookmark"
            :loading="copying"
            class="mcp-reveal__copy"
            @click="copyMinted"
          >
            Copy
          </Button>
        </div>

        <p class="mcp-reveal__use">
          Give it to your MCP client as an <code>Authorization: Bearer</code> header against
          <code>POST /mcp</code>. Every token starts <code>{{ MCP_TOKEN_PREFIX }}</code>.
        </p>

        <ul class="mcp-reveal__facts">
          <li>Scopes: {{ minted?.scopes.join(', ') || 'none' }}</li>
          <li>Expires {{ formatDate(minted?.expires_at ?? null) }}</li>
        </ul>

        <label class="mcp-reveal__ack">
          <input
            v-model="ackSaved"
            class="mcp-reveal__ack-box"
            type="checkbox"
            data-testid="mcp-token-ack"
          />
          <span>I have saved this token somewhere safe.</span>
        </label>
      </div>

      <template #footer>
        <Button
          variant="solid"
          size="sm"
          class="mcp-reveal__done"
          :disabled="!ackSaved"
          @click="closeReveal"
        >
          Done
        </Button>
      </template>
    </Modal>

    <!-- Revoke confirm -->
    <Modal
      :model-value="revokeTarget !== null"
      title="Revoke this token?"
      @update:model-value="cancelRevoke"
    >
      <p>
        “{{ revokeTarget ? displayName(revokeTarget) : '' }}” stops working immediately and
        every MCP client using it loses access. This cannot be undone.
      </p>
      <template #footer>
        <Button variant="ghost" size="sm" @click="cancelRevoke">Cancel</Button>
        <Button
          variant="danger"
          size="sm"
          class="mcp-tokens__revoke-confirm"
          :loading="revoking"
          @click="confirmRevoke"
        >
          Revoke token
        </Button>
      </template>
    </Modal>
  </section>
</template>

<style scoped>
.mcp-tokens {
  max-width: 900px;
  margin: 0 auto;
  padding: var(--space-6) var(--space-4) var(--space-16);
}

.mcp-tokens__head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--space-4);
  flex-wrap: wrap;
  margin-bottom: var(--space-4);
}

.mcp-tokens__title {
  font-family: var(--font-display);
  font-size: var(--text-2xl);
  font-weight: var(--font-semibold);
  letter-spacing: var(--tracking-tight);
  color: var(--text);
}

.mcp-tokens__subtitle {
  margin-top: var(--space-1);
  font-size: var(--text-sm);
  color: var(--text-muted);
  max-width: 52ch;
}

.mcp-tokens__skel {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.mcp-tokens__list {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.mcp-token-card {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--space-4);
  padding: var(--space-4);
  background: var(--surface-1);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
}

.mcp-token-card__main {
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.mcp-token-card__names {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  flex-wrap: wrap;
}

.mcp-token-card__name {
  font-weight: var(--font-semibold);
  color: var(--text);
}

.mcp-token-card__scopes {
  display: flex;
  gap: var(--space-2);
  flex-wrap: wrap;
}

.mcp-token-card__noscope,
.mcp-token-card__meta {
  font-size: var(--text-xs);
  color: var(--text-subtle);
}

.mcp-token-card__meta {
  display: flex;
  gap: var(--space-2);
  flex-wrap: wrap;
}

.mcp-token-card__divider {
  opacity: 0.5;
}

.mcp-tokens__form {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.mcp-scopes {
  border: 0;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.mcp-scopes__legend {
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  color: var(--text);
  padding: 0;
}

.mcp-scopes__hint {
  font-size: var(--text-xs);
  color: var(--text-subtle);
}

.mcp-scopes__warn {
  font-size: var(--text-xs);
  color: var(--warning, var(--text));
}

.mcp-scope {
  display: flex;
  gap: var(--space-3);
  align-items: flex-start;
  padding: var(--space-2);
  border-radius: var(--radius-md);
  background: var(--surface-2);
  cursor: pointer;
}

.mcp-scope__text {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.mcp-scope__label {
  font-size: var(--text-sm);
  color: var(--text);
}

.mcp-scope__code {
  font-family: var(--font-mono, monospace);
  font-size: var(--text-2xs);
  color: var(--text-subtle);
}

.mcp-scope__desc {
  font-size: var(--text-xs);
  color: var(--text-muted);
}

.mcp-reveal {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.mcp-reveal__warn {
  padding: var(--space-3);
  border: 1px solid var(--warning, var(--border-strong));
  border-radius: var(--radius-md);
  font-size: var(--text-sm);
  color: var(--text);
  line-height: 1.5;
}

.mcp-reveal__value {
  display: flex;
  gap: var(--space-3);
  align-items: center;
  flex-wrap: wrap;
}

.mcp-reveal__token {
  flex: 1;
  min-width: 0;
  padding: var(--space-3);
  border-radius: var(--radius-md);
  background: var(--surface-3, var(--surface-2));
  font-family: var(--font-mono, monospace);
  font-size: var(--text-sm);
  color: var(--text);
  word-break: break-all;
  user-select: all;
}

.mcp-reveal__use,
.mcp-reveal__facts {
  font-size: var(--text-xs);
  color: var(--text-muted);
}

.mcp-reveal__facts {
  margin: 0;
  padding-left: var(--space-4);
}

.mcp-reveal__ack {
  display: flex;
  gap: var(--space-2);
  align-items: center;
  font-size: var(--text-sm);
  color: var(--text);
  cursor: pointer;
}
</style>
