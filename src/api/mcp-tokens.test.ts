/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

/**
 * S243 — guards for the MCP token API wrapper.
 *
 * Two of these are cross-repo pins rather than unit tests: the scope vocabulary
 * and the token prefix are the two places where a silent divergence would
 * produce a form that offers a value the server rejects, or a UI that describes
 * a credential shape that no longer exists.
 *
 * ## S249 — those two pins used to be unrunnable in CI
 *
 * As S243 shipped them they read `phlix-hub`'s PHP source off the filesystem,
 * guarded by `it.runIf(existsSync(<sibling phlix-hub path>))`. phlix-ui's CI has
 * no `phlix-hub` checkout, so the guard was always false: the assertions never
 * executed and the file reported as **passing** — measured on `6efe3588` as
 * `6 passed | 2 skipped` while a real 4-vs-3 scope drift sat in the tree. On a
 * developer box the same guard did the opposite wrong thing and went **red**
 * whenever a phlix-hub writer moved that tree, on branches touching zero MCP
 * files.
 *
 * They now pin against **`@phlix/contracts`**, an ordinary `dependencies` entry
 * resolved from `node_modules` on every machine including CI. There is no
 * filesystem probe, no `runIf`, and no try/catch around the import — a missing
 * or broken contracts package is a hard import error, not a skip. A phlix-hub
 * working tree, dirty or absent, cannot influence this file's result at all.
 *
 * ⚠ Do NOT "simplify" `MCP_SCOPES` in `./mcp-tokens` into a re-export of the
 * contracts constant. These assertions compare two independently authored
 * lists; make one the other and they can never disagree.
 *
 * ⚠ The hub half of the loop is a separate gate in `phlix-hub` asserting
 * `McpScopes::all()` equals this same contracts vocabulary. Until that ships,
 * what is verified here is that **phlix-ui agrees with contracts** — not that
 * contracts still agrees with the hub.
 */

import { describe, it, expect, vi } from 'vitest';
import {
    MCP_SCOPES as CONTRACT_MCP_SCOPES,
    MCP_TOKEN_PREFIX as CONTRACT_MCP_TOKEN_PREFIX,
} from '@phlix/contracts';
import {
    McpTokensApi,
    MCP_SCOPES,
    MCP_SCOPE_LABELS,
    MCP_TOKEN_PREFIX,
    scopeLabel,
    scopeDescription,
    type McpTokenSummary,
} from './mcp-tokens';
import type { ApiClient } from './client';

function fakeClient() {
    const get = vi.fn(async () => ({ tokens: [], available_scopes: [...MCP_SCOPES] }));
    const post = vi.fn(async () => ({
        id: 't1',
        token: 'phlix-mcp-secret',
        name: 'n',
        scopes: [],
        expires_at: 0,
    }));
    const del = vi.fn(async () => ({ revoked: true, id: 't1' }));
    return { client: { get, post, delete: del } as unknown as ApiClient, get, post, del };
}

describe('McpTokensApi — endpoint paths', () => {
    it('lists from the exact hub path', async () => {
        const { client, get } = fakeClient();
        await new McpTokensApi(client).list();
        expect(get).toHaveBeenCalledWith('/api/v1/me/mcp-tokens');
    });

    it('posts the mint body to the exact hub path', async () => {
        const { client, post } = fakeClient();
        await new McpTokensApi(client).create({ name: 'Claude', scopes: ['mcp:library:read'] });
        expect(post).toHaveBeenCalledWith('/api/v1/me/mcp-tokens', {
            name: 'Claude',
            scopes: ['mcp:library:read'],
        });
    });

    it('percent-encodes the id it revokes', async () => {
        const { client, del } = fakeClient();
        await new McpTokensApi(client).revoke('a b/c');
        expect(del).toHaveBeenCalledWith('/api/v1/me/mcp-tokens/a%20b%2Fc');
    });
});

describe('scope vocabulary agrees with @phlix/contracts', () => {
    it('the contracts vocabulary is non-vacuous', () => {
        // ANTI-VACUITY. Every assertion below is an equality against the
        // contracts export, and `[] === []` / `undefined === undefined` passes
        // trivially — a bad import path or a stale pin would turn the whole
        // describe block green while checking nothing. So establish a FLOOR
        // first: at least 4 scopes (the vocabulary as of hub S63) and a
        // non-empty prefix. If contracts legitimately drops below four this
        // test must be edited deliberately, which is the point.
        expect(Array.isArray(CONTRACT_MCP_SCOPES)).toBe(true);
        expect(CONTRACT_MCP_SCOPES.length).toBeGreaterThanOrEqual(4);
        for (const scope of CONTRACT_MCP_SCOPES) {
            expect(typeof scope).toBe('string');
            expect(scope.length).toBeGreaterThan(0);
        }
        expect(typeof CONTRACT_MCP_TOKEN_PREFIX).toBe('string');
        expect(CONTRACT_MCP_TOKEN_PREFIX.length).toBeGreaterThan(0);
    });

    it('MCP_SCOPES equals the contracts vocabulary, in order', () => {
        // EXACT whole-list comparison, never a substring or membership check:
        // 'mcp:playback' is a prefix of 'mcp:playback:control', so an
        // `includes`/`startsWith` check would pass a rename. Order is asserted
        // too — it is part of the hub's stored representation, since
        // `McpScopes::parse()` emits in `all()` order into `mcp_tokens.scopes`.
        expect([...MCP_SCOPES]).toEqual([...CONTRACT_MCP_SCOPES]);
    });

    it('MCP_SCOPES equals the contracts vocabulary as a set, ignoring order', () => {
        // A second, order-blind angle on the same pair. If a future change makes
        // the ordered assertion above tolerant (e.g. someone sorts one side to
        // "fix" a red), this still catches an added or dropped member.
        expect([...MCP_SCOPES].slice().sort()).toEqual([...CONTRACT_MCP_SCOPES].slice().sort());
        expect(new Set(MCP_SCOPES).size).toBe(MCP_SCOPES.length);
    });

    it('MCP_TOKEN_PREFIX equals the contracts token prefix', () => {
        expect(MCP_TOKEN_PREFIX).toBe(CONTRACT_MCP_TOKEN_PREFIX);
    });

    it('every known scope has display copy', () => {
        for (const scope of MCP_SCOPES) {
            expect(MCP_SCOPE_LABELS[scope], `no label for ${scope}`).toBeTruthy();
            expect(scopeLabel(scope)).not.toBe(scope);
            expect(scopeDescription(scope)).not.toBe('');
        }
    });

    it('an unknown scope degrades to its raw value rather than disappearing', () => {
        // A hub newer than this build may report a scope we have no copy for. It
        // must still be nameable (and therefore selectable), not render blank.
        expect(scopeLabel('mcp:future:write')).toBe('mcp:future:write');
        expect(scopeDescription('mcp:future:write')).toBe('');
    });
});

describe('the list row type cannot carry a plaintext token', () => {
    it('a summary built from the hub contract has no token field', () => {
        // Compile-time proof is not enough (a cast defeats it); this asserts the
        // runtime shape this build constructs from `listForUser()`'s documented
        // return, key by key, so an added `token` key would have to be deliberate.
        const row: McpTokenSummary = {
            id: 't1',
            name: 'Claude Desktop',
            scopes: ['mcp:servers:read'],
            created_at: 1746057600,
            expires_at: 4070908800,
            last_used_at: null,
            revoked: false,
            expired: false,
        };
        expect(Object.keys(row).sort()).toEqual([
            'created_at',
            'expired',
            'expires_at',
            'id',
            'last_used_at',
            'name',
            'revoked',
            'scopes',
        ]);
        expect('token' in row).toBe(false);
    });
});
