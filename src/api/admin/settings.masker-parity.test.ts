/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect } from 'vitest';
import { SETTINGS_SECRET_MASK } from './settings';
import { PLUGIN_SECRET_MASK } from './plugins';

/**
 * The server has exactly ONE mask sentinel — `SettingsMasker::MASK` — and both
 * the admin-settings path (`AdminSettingsController::maskSecrets()`) and the
 * plugin-settings path use it, for masking on read AND for the "unchanged, skip
 * it" guard on write.
 *
 * The UI mirrors it in two places for import hygiene, which is a drift hazard:
 * if they ever diverged, one of the two surfaces would stop recognising the
 * sentinel and would start posting it back as a literal value — silently
 * overwriting a stored credential with the string `***`. This test pins them
 * together, and pins both to the server's literal.
 */
describe('secret mask sentinel parity', () => {
  it('is the same string on the settings and plugin paths', () => {
    expect(SETTINGS_SECRET_MASK).toBe(PLUGIN_SECRET_MASK);
  });

  it("matches the server's SettingsMasker::MASK literal", () => {
    expect(SETTINGS_SECRET_MASK).toBe('***');
  });
});
