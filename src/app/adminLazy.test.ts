/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

/**
 * S528 — admin-graph decoupling (W113 UI lane).
 *
 * Locks the seam the S517 tizen receipt identified: the shell must reach admin
 * labels ONLY through `./admin-registry`, never via a static `./admin` import —
 * the static edge pinned every lazily-imported admin page chunk into consumer
 * bundles even when the admin section was never built. Behavior is asserted in
 * mount order (unset → mount → set), which doubles as the proof that merely
 * importing the modules installs nothing.
 */

import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { RouteLocationNormalized } from 'vue-router';
import { adminLabelFor, setAdminLabelResolver } from './admin-registry';
import { buildAdminRoutes, buildHubAdminRoutes, adminPageLabel } from './admin';
import { resolveRouteTitle } from './createPhlixApp';
import { createTranslator } from '../i18n/messages';

/** W113/S528 provenance token — exactly one code home (this constant). */
export const S528_PROVENANCE = 'S528ADMINLAZYX9P9';

const t = createTranslator();
function route(name: string): RouteLocationNormalized {
  return { name, meta: {} } as unknown as RouteLocationNormalized;
}

describe('S528 admin-label seam', () => {
  it('carries the W113/S528 provenance token', () => {
    expect(S528_PROVENANCE).toBe('S528ADMINLAZYX9P9');
  });

  it('resolves nothing before an admin section is mounted (import ≠ registration)', () => {
    // The barrel above is imported at module top — importing it must NOT wire
    // the shell. Only buildAdminRoutes() (below) registers.
    expect(adminLabelFor('admin-users')).toBeNull();
    expect(resolveRouteTitle(route('admin-users'), t)).toBeNull();
    expect(adminLabelFor('')).toBeNull();
    expect(adminLabelFor(null)).toBeNull();
    expect(adminLabelFor(undefined)).toBeNull();
  });

  it('titles admin routes once the REAL mount path builds the routes', () => {
    expect(buildAdminRoutes().length).toBe(1);
    expect(adminLabelFor('admin-users')).toBe('Users');
    expect(resolveRouteTitle(route('admin-users'), t)).toBe('Admin · Users');
    expect(resolveRouteTitle(route('admin-hub-dashboard'), t)).toBe('Admin · Dashboard');
    // Unknown admin-ish names still fall through.
    expect(adminLabelFor('admin-nope')).toBeNull();
    expect(resolveRouteTitle(route('admin-nope'), t)).toBeNull();
    expect(resolveRouteTitle(route('browse'), t)).toBeNull();
  });

  it('hub builder registers through the same seam (delegation covered)', () => {
    setAdminLabelResolver(null);
    expect(resolveRouteTitle(route('admin-users'), t)).toBeNull();
    expect(buildHubAdminRoutes().length).toBe(1);
    expect(resolveRouteTitle(route('admin-users'), t)).toBe('Admin · Users');
    expect(resolveRouteTitle(route('admin-audit-logs'), t)).toBe('Admin · Audit Logs');
  });

  it('adminPageLabel stays lazy-safe and self-consistent for direct consumers', () => {
    expect(adminPageLabel('admin-settings')).toBe('Settings');
    expect(adminPageLabel(null)).toBeNull();
  });
});

describe('S528 static-import source lock', () => {
  const HERE = path.resolve(fileURLToPath(import.meta.url), '..');
  const shell = readFileSync(path.join(HERE, 'createPhlixApp.ts'), 'utf8');

  it('the shell imports the registry seam, never the admin barrel', () => {
    expect(shell).toContain("from './admin-registry'");
    expect(shell).not.toMatch(/from ['"]\.\/admin['"]/);
  });
});
