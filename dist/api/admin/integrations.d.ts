/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */
import type { ApiClient } from '../client';
/**
 * AdminIntegrationsApi (RA.6) — typed wrapper over the admin Integrations
 * endpoints, consolidating the deleted React `ArrSyncApi` + `AuthProvidersApi` +
 * `OidcApi` + `LdapApi` into one class. Covers two surfaces:
 *
 *   1. Arr sync (TRaSH-Guides) — status, manual trigger, enable/disable
 *      (`/api/v1/admin/sync/*`).
 *   2. Auth providers (OIDC + LDAP) — list + per-provider enable/disable and
 *      OIDC/LDAP settings CRUD + LDAP connection test
 *      (`/api/v1/admin/auth-providers/*`).
 *
 * Every endpoint path, verb and request body is ported 1:1 from the React
 * source; list unwraps add an `Array.isArray` guard so a malformed payload
 * degrades to `[]` rather than throwing.
 */
/** Response shape from `GET /api/v1/admin/sync/status`. */
export interface ArrSyncStatus {
    enabled: boolean;
    last_sync_at: string | null;
    last_sync_timestamp: number | null;
}
/** Response shape from `POST /api/v1/admin/sync/trash-guides`. */
export interface ArrSyncTriggerResult {
    success: boolean;
    message: string;
    data?: Record<string, unknown>;
}
/** Response shape from `PUT /api/v1/admin/sync/enable`. */
export interface ArrSyncEnableResult {
    message: string;
}
/**
 * A registered auth provider as returned by `GET /api/v1/admin/auth-providers`.
 *
 * `enabled` and `live` are the two *distinct* states the admin UI must tell
 * apart, and neither is "has settings saved":
 *
 *   - `enabled` — the persisted `auth.<name>.enabled` flag (server-side:
 *     `AuthProviderBootstrapper::isEnabled()`). An operator intent, nothing more.
 *   - `live` — the provider is actually registered and will authenticate people
 *     (server-side: `AuthProviderRegistry::hasProvider()`). This requires
 *     enabled **and** configured, so it is the only honest source for the
 *     "Enabled"/"Disabled" badge.
 *
 * Both are OPTIONAL because a server that predates S44-b omits them. An absent
 * field must be read as *not* live — see `providerEnabled()` in
 * `IntegrationsPage.vue`, which fails closed. Never substitute the `configured`
 * flag from the per-provider settings payload: `configured` means only "settings
 * have been saved", and both `saveSettings` handlers return it unconditionally,
 * so keying the badge off it reports "Enabled" for a provider that will not
 * authenticate anyone.
 */
export interface AuthProvider {
    name: string;
    supports_authentication: boolean;
    /** Persisted enable flag. Absent on pre-S44-b servers → treat as false. */
    enabled?: boolean;
    /** Registered and serving logins right now. Absent → treat as false. */
    live?: boolean;
}
/** Result of enabling a provider. */
export interface EnableProviderResult {
    name: string;
    enabled: true;
    message: string;
}
/** Result of disabling a provider. */
export interface DisableProviderResult {
    name: string;
    enabled: false;
    message: string;
}
/** OIDC settings shape from `GET /api/v1/admin/auth-providers/oidc/config`. */
export interface OidcSettings {
    provider_url: string;
    client_id: string;
    scopes: string;
    configured: boolean;
}
/** Input for saving OIDC settings. */
export interface SaveOidcInput {
    provider_url: string;
    client_id: string;
    /** Optional — omit to keep existing secret server-side. */
    client_secret?: string;
    scopes: string;
}
/** LDAP settings shape from `GET /api/v1/admin/auth-providers/ldap/config`. */
export interface LdapSettings {
    host: string;
    port: number;
    ssl: boolean;
    base_dn: string;
    bind_dn: string;
    user_filter: string;
    admin_group: string;
    configured: boolean;
}
/** Input for saving LDAP settings. */
export interface SaveLdapInput {
    host: string;
    port: number;
    ssl: boolean;
    base_dn: string;
    bind_dn: string;
    /** Optional — omit to keep existing password server-side. */
    bind_pw?: string;
    user_filter: string;
    admin_group: string;
}
/** Result of testing an LDAP connection. */
export interface LdapTestResult {
    success: boolean;
    message: string;
}
/**
 * AdminIntegrationsApi — Arr sync + OIDC/LDAP auth-provider admin endpoints.
 */
export declare class AdminIntegrationsApi {
    private readonly client;
    constructor(client: ApiClient);
    /** `GET /api/v1/admin/sync/status` → `{ enabled, last_sync_at, last_sync_timestamp }`. */
    getSyncStatus(): Promise<ArrSyncStatus>;
    /** `POST /api/v1/admin/sync/trash-guides` → `{ success, message, data }` | 500. */
    triggerSync(): Promise<ArrSyncTriggerResult>;
    /** `PUT /api/v1/admin/sync/enable` — body `{ enabled }` → `{ message }`. */
    setSyncEnabled(enabled: boolean): Promise<ArrSyncEnableResult>;
    /** `GET /api/v1/admin/auth-providers` → unwraps `{ providers }`. */
    listProviders(): Promise<AuthProvider[]>;
    /** `POST /api/v1/admin/auth-providers/{name}/enable` → `{ name, enabled: true, message }`. */
    enableProvider(name: string): Promise<EnableProviderResult>;
    /** `POST /api/v1/admin/auth-providers/{name}/disable` → `{ name, enabled: false, message }`. */
    disableProvider(name: string): Promise<DisableProviderResult>;
    /** `GET /api/v1/admin/auth-providers/oidc/config` → OidcSettings. */
    getOidcSettings(): Promise<OidcSettings>;
    /** `POST /api/v1/admin/auth-providers/oidc/config` → 200 | 400. */
    saveOidcSettings(input: SaveOidcInput): Promise<{
        message: string;
    }>;
    /** `GET /api/v1/admin/auth-providers/oidc/schema` → `{ schema }`. */
    getOidcSchema(): Promise<{
        schema: Record<string, unknown>;
    }>;
    /** `GET /api/v1/admin/auth-providers/ldap/config` → LdapSettings. */
    getLdapSettings(): Promise<LdapSettings>;
    /** `POST /api/v1/admin/auth-providers/ldap/config` → 200 | 400. */
    saveLdapSettings(input: SaveLdapInput): Promise<{
        message: string;
    }>;
    /** `POST /api/v1/admin/auth-providers/ldap/test` → `{ success, message }` | 400. */
    testLdapConnection(input: SaveLdapInput): Promise<LdapTestResult>;
    /** `GET /api/v1/admin/auth-providers/ldap/schema` → `{ schema }`. */
    getLdapSchema(): Promise<{
        schema: Record<string, unknown>;
    }>;
}
