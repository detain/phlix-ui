<!--
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 -->

<script setup lang="ts">
/**
 * SharedWithMePage (WS-D D-HUB-3) — libraries shared WITH the current user.
 *
 * Data flow:
 *   - GET /api/v1/me/shares → { outgoing, incoming }
 *   - Only `incoming` is displayed (libraries shared WITH the current user)
 *
 * This is a READ-ONLY view — the recipient cannot revoke shares; only the owner can.
 *
 * `client` is an injectable test seam; it defaults to the shared `api` singleton.
 */
import { ref, onMounted } from 'vue';
import { api, ApiClient } from '../api/client';
import { errMessage } from '../api/errors';
import Badge from '../components/ui/Badge.vue';
import Button from '../components/ui/Button.vue';
import Skeleton from '../components/ui/Skeleton.vue';
import EmptyState from '../components/ui/EmptyState.vue';

/** Incoming share shape from `GET /api/v1/me/shares` (snake_case, ISO dates). */
interface HubIncomingShare {
    id: string;
    library_id: string;
    library_name: string;
    server_id: string;
    server_name: string;
    owner_user_id: string;
    owner_email: string;
    permission: 'read' | 'readwrite';
    status: 'active' | 'revoked';
    created_at: string;
    updated_at: string;
}

interface SharesResponse {
    outgoing?: HubIncomingShare[];
    incoming?: HubIncomingShare[];
}

const props = defineProps<{
    /** Inject an API client for tests; defaults to the shared `api` singleton. */
    client?: ApiClient;
}>();

const http: Pick<ApiClient, 'get'> = props.client ?? api;

const shares = ref<HubIncomingShare[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);

/**
 * Load incoming shares. `initial` shows the full-page skeleton on mount/retry;
 * subsequent reloads (not needed here, but kept for symmetry) update in place.
 */
async function loadShares(initial = false): Promise<void> {
    if (initial) loading.value = true;
    error.value = null;
    try {
        // The hub returns `{ outgoing, incoming }`; "Shared With Me" lists the
        // libraries OTHER users share WITH the current user.
        const data = await http.get<SharesResponse>('/api/v1/me/shares');
        // Sort by created_at descending (most recent first)
        shares.value = [...(data.incoming || [])].sort(
            (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
    } catch (e) {
        error.value = errMessage(e, 'Failed to load shared libraries.');
    } finally {
        if (initial) loading.value = false;
    }
}

/** Badge tone for permission level. */
function permissionTone(permission: string): 'info' | 'success' | 'neutral' {
    switch (permission) {
        case 'read':
            return 'info';
        case 'readwrite':
            return 'success';
        default:
            return 'neutral';
    }
}

/** Badge tone for share status. */
function statusTone(status: string): 'success' | 'warning' | 'neutral' {
    switch (status) {
        case 'active':
            return 'success';
        case 'revoked':
            return 'warning';
        default:
            return 'neutral';
    }
}

/** Format permission for display. */
function formatPermission(permission: string): string {
    return permission === 'readwrite' ? 'Read / Write' : 'Read only';
}

onMounted(() => loadShares(true));
</script>

<template>
    <section class="shared-with-me" aria-labelledby="shared-with-me-heading">
        <header class="shared-with-me__head">
            <h1 id="shared-with-me-heading" class="shared-with-me__title">Shared With Me</h1>
            <p class="shared-with-me__subtitle">
                Libraries shared with you by other users.
            </p>
        </header>

        <div v-if="loading" class="shared-with-me__skel">
            <Skeleton variant="text" :lines="6" />
        </div>

        <EmptyState
            v-else-if="error"
            icon="alert"
            title="Couldn't load shared libraries"
            :description="error"
        >
            <template #actions>
                <Button variant="solid" size="sm" left-icon="rewind" @click="loadShares(true)">
                    Retry
                </Button>
            </template>
        </EmptyState>

        <EmptyState
            v-else-if="shares.length === 0"
            icon="bookmark"
            title="No shared libraries"
            description="Libraries shared with you will appear here."
        />

        <div v-else class="shared-with-me__grid">
            <article
                v-for="share in shares"
                :key="share.id"
                class="share-card"
                :class="{ 'share-card--revoked': share.status === 'revoked' }"
            >
                <div class="share-card__header">
                    <h2 class="share-card__library">{{ share.library_name }}</h2>
                    <div class="share-card__badges">
                        <Badge :tone="permissionTone(share.permission)">
                            {{ formatPermission(share.permission) }}
                        </Badge>
                        <Badge :tone="statusTone(share.status)">
                            {{ share.status === 'active' ? 'Active' : 'Revoked' }}
                        </Badge>
                    </div>
                </div>

                <div class="share-card__body">
                    <dl class="share-card__details">
                        <div class="share-card__detail">
                            <dt>Server</dt>
                            <dd>{{ share.server_name }}</dd>
                        </div>
                        <div class="share-card__detail">
                            <dt>Shared by</dt>
                            <dd>{{ share.owner_email }}</dd>
                        </div>
                        <div class="share-card__detail">
                            <dt>Received</dt>
                            <dd>{{ new Date(share.created_at).toLocaleDateString() }}</dd>
                        </div>
                    </dl>
                </div>

                <div class="share-card__footer">
                    <Button
                        v-if="share.status === 'active'"
                        variant="solid"
                        size="sm"
                        left-icon="list"
                        :to="`/browse/${share.server_id}/${share.library_id}`"
                    >
                        Browse Library
                    </Button>
                    <span v-else class="share-card__revoked-label">
                        Access revoked by owner
                    </span>
                </div>
            </article>
        </div>
    </section>
</template>

<style scoped>
.shared-with-me {
    max-width: 1100px;
    margin: 0 auto;
    padding: var(--space-6);
}
.shared-with-me__head {
    margin-bottom: var(--space-6);
}
.shared-with-me__title {
    font-family: var(--font-display);
    font-weight: var(--font-semibold);
    font-size: var(--text-xl);
    letter-spacing: var(--tracking-tight);
    color: var(--text);
    margin: 0 0 var(--space-1);
}
.shared-with-me__subtitle {
    font-size: var(--text-sm);
    color: var(--text-subtle);
    margin: 0;
}
.shared-with-me__skel {
    padding-block: var(--space-2);
}
.shared-with-me__grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: var(--space-5);
}

/* Card */
.share-card {
    background: var(--surface-1);
    border: 1px solid var(--border-subtle);
    border-radius: var(--radius-lg);
    padding: var(--space-5);
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
    transition: box-shadow var(--dur-base) var(--ease-out),
                border-color var(--dur-fast) var(--ease-out),
                transform var(--dur-fast) var(--ease-spring);
}
.share-card:hover {
    box-shadow: var(--shadow-2), 0 0 0 1px var(--border-strong);
    border-color: var(--border-strong);
    transform: translateY(-2px);
}
.share-card--revoked {
    opacity: 0.65;
}
.share-card--revoked:hover {
    transform: none;
    box-shadow: none;
}

.share-card__header {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
}
.share-card__library {
    font-family: var(--font-display);
    font-weight: var(--font-bold);
    font-size: var(--text-lg);
    color: var(--text);
    margin: 0;
    line-height: 1.2;
}
.share-card__badges {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2);
}

.share-card__body {
    flex: 1;
}
.share-card__details {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
    margin: 0;
}
.share-card__detail {
    display: grid;
    grid-template-columns: 80px 1fr;
    gap: var(--space-2);
    font-size: var(--text-sm);
}
.share-card__detail dt {
    color: var(--text-subtle);
    font-weight: var(--font-medium);
}
.share-card__detail dd {
    color: var(--text-muted);
    margin: 0;
}

.share-card__footer {
    margin-top: auto;
    padding-top: var(--space-2);
}
.share-card__revoked-label {
    font-size: var(--text-xs);
    color: var(--text-subtle);
    font-style: italic;
}
</style>
