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

// ── Arr sync ─────────────────────────────────────────────────────────────────

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

// ── Auth providers ───────────────────────────────────────────────────────────

/** A registered auth provider as returned by `GET /api/v1/admin/auth-providers`. */
export interface AuthProvider {
  name: string;
  supports_authentication: boolean;
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
export class AdminIntegrationsApi {
  constructor(private readonly client: ApiClient) {}

  // ── Arr sync (TRaSH-Guides) ─────────────────────────────────────────────────

  /** `GET /api/v1/admin/sync/status` → `{ enabled, last_sync_at, last_sync_timestamp }`. */
  async getSyncStatus(): Promise<ArrSyncStatus> {
    return this.client.get<ArrSyncStatus>('/api/v1/admin/sync/status');
  }

  /** `POST /api/v1/admin/sync/trash-guides` → `{ success, message, data }` | 500. */
  async triggerSync(): Promise<ArrSyncTriggerResult> {
    return this.client.post<ArrSyncTriggerResult>('/api/v1/admin/sync/trash-guides');
  }

  /** `PUT /api/v1/admin/sync/enable` — body `{ enabled }` → `{ message }`. */
  async setSyncEnabled(enabled: boolean): Promise<ArrSyncEnableResult> {
    return this.client.put<ArrSyncEnableResult>('/api/v1/admin/sync/enable', { enabled });
  }

  // ── Auth providers ──────────────────────────────────────────────────────────

  /** `GET /api/v1/admin/auth-providers` → unwraps `{ providers }`. */
  async listProviders(): Promise<AuthProvider[]> {
    const { providers } = await this.client.get<{ providers: AuthProvider[] }>(
      '/api/v1/admin/auth-providers',
    );
    return Array.isArray(providers) ? providers : [];
  }

  /** `POST /api/v1/admin/auth-providers/{name}/enable` → `{ name, enabled: true, message }`. */
  async enableProvider(name: string): Promise<EnableProviderResult> {
    return this.client.post<EnableProviderResult>(
      `/api/v1/admin/auth-providers/${encodeURIComponent(name)}/enable`,
    );
  }

  /** `POST /api/v1/admin/auth-providers/{name}/disable` → `{ name, enabled: false, message }`. */
  async disableProvider(name: string): Promise<DisableProviderResult> {
    return this.client.post<DisableProviderResult>(
      `/api/v1/admin/auth-providers/${encodeURIComponent(name)}/disable`,
    );
  }

  // ── OIDC ──────────────────────────────────────────────────────────────────

  /** `GET /api/v1/admin/auth-providers/oidc/config` → OidcSettings. */
  async getOidcSettings(): Promise<OidcSettings> {
    return this.client.get<OidcSettings>('/api/v1/admin/auth-providers/oidc/config');
  }

  /** `POST /api/v1/admin/auth-providers/oidc/config` → 200 | 400. */
  async saveOidcSettings(input: SaveOidcInput): Promise<{ message: string }> {
    return this.client.post<{ message: string }>(
      '/api/v1/admin/auth-providers/oidc/config',
      input,
    );
  }

  /** `GET /api/v1/admin/auth-providers/oidc/schema` → `{ schema }`. */
  async getOidcSchema(): Promise<{ schema: Record<string, unknown> }> {
    return this.client.get<{ schema: Record<string, unknown> }>(
      '/api/v1/admin/auth-providers/oidc/schema',
    );
  }

  // ── LDAP ──────────────────────────────────────────────────────────────────

  /** `GET /api/v1/admin/auth-providers/ldap/config` → LdapSettings. */
  async getLdapSettings(): Promise<LdapSettings> {
    return this.client.get<LdapSettings>('/api/v1/admin/auth-providers/ldap/config');
  }

  /** `POST /api/v1/admin/auth-providers/ldap/config` → 200 | 400. */
  async saveLdapSettings(input: SaveLdapInput): Promise<{ message: string }> {
    return this.client.post<{ message: string }>(
      '/api/v1/admin/auth-providers/ldap/config',
      input,
    );
  }

  /** `POST /api/v1/admin/auth-providers/ldap/test` → `{ success, message }` | 400. */
  async testLdapConnection(input: SaveLdapInput): Promise<LdapTestResult> {
    return this.client.post<LdapTestResult>(
      '/api/v1/admin/auth-providers/ldap/test',
      input,
    );
  }

  /** `GET /api/v1/admin/auth-providers/ldap/schema` → `{ schema }`. */
  async getLdapSchema(): Promise<{ schema: Record<string, unknown> }> {
    return this.client.get<{ schema: Record<string, unknown> }>(
      '/api/v1/admin/auth-providers/ldap/schema',
    );
  }
}
