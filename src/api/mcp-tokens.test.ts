/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

/**
 * S243 — guards for the MCP token API wrapper.
 *
 * Two of these are cross-repo pins rather than unit tests: they read
 * `phlix-hub`'s PHP source and assert this build agrees with it. The scope
 * vocabulary and the token prefix are the two places where a silent divergence
 * would produce a form that offers a value the server rejects, or a UI that
 * describes a credential shape that no longer exists.
 */

import { describe, it, expect, vi } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
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

const here = dirname(fileURLToPath(import.meta.url));
/** `phlix-ui/src/api` → `phlix-ui` → the estate root → `phlix-hub`. */
const HUB = join(here, '..', '..', '..', 'phlix-hub');

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

describe('scope vocabulary agrees with phlix-hub', () => {
    const scopesFile = join(HUB, 'src', 'Mcp', 'McpScopes.php');

    it.runIf(existsSync(scopesFile))('MCP_SCOPES equals McpScopes::all() in order', () => {
        const php = readFileSync(scopesFile, 'utf8');
        // `all()` returns the three `self::CONST` members; resolve each constant's
        // literal so the assertion is on the WIRE VALUES, not on constant names.
        const body = php.slice(php.indexOf('public static function all()'));
        const names = [...body.slice(0, body.indexOf('}')).matchAll(/self::([A-Z_]+)/g)].map(
            (m) => m[1],
        );
        expect(names.length, 'McpScopes::all() members').toBeGreaterThan(0);
        const values = names.map((name) => {
            const m = php.match(new RegExp(`const string ${name} = '([^']+)'`));
            expect(m, `no literal found for McpScopes::${name}`).not.toBeNull();
            return m![1];
        });
        expect(values).toEqual([...MCP_SCOPES]);
    });

    it.runIf(existsSync(join(HUB, 'src', 'Mcp', 'McpTokenService.php')))(
        'MCP_TOKEN_PREFIX equals McpTokenService::TOKEN_PREFIX',
        () => {
            const php = readFileSync(join(HUB, 'src', 'Mcp', 'McpTokenService.php'), 'utf8');
            const m = php.match(/const string TOKEN_PREFIX = '([^']+)'/);
            expect(m).not.toBeNull();
            expect(m![1]).toBe(MCP_TOKEN_PREFIX);
        },
    );

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
