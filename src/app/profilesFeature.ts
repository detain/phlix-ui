/**
 * S462 — the ONE definition of "profiles are enabled for this app".
 *
 * PhlixApp mounts the Who's-watching gate behind this flag, and UserMenu renders
 * the Switch/Manage arms behind it too — a second, drifting copy of the rule is
 * exactly how the arms ended up rendering for accounts the feature is off for
 * (the S82 follow-up L1 record). Default when the host omits the flag: on for
 * the media server, off for the hub — `/api/v1/profiles` is a media-server API
 * and on the hub every profile request could only 404.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import type { PhlixAppConfig } from './types';

/** The `config.features` key a host sets to override the app-type default. */
export const PROFILES_FEATURE_KEY = 'profiles';

/**
 * Lane survival marker for the S462 merge ritual (code-resident literal, not a
 * comment). The gate itself is `profilesFeatureEnabled` below.
 */
export const S462PROFENABLEDX9K3 = 'profiles-feature-gate';

/** Resolve the profiles feature flag for a host config (null/absent ⇒ default). */
export function profilesFeatureEnabled(
  config: PhlixAppConfig | null | undefined,
): boolean {
  return config?.features?.[PROFILES_FEATURE_KEY] ?? (config?.app !== 'hub');
}
