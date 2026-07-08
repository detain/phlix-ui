/**
 * quality.ts — pure, DOM-free helpers that turn hls.js {@link HlsLevel}s into the
 * QualityMenu's option list and back.
 *
 * hls.js `levels` are the SOURCE OF TRUTH for what is actually switchable right
 * now — {@link import('../../composables/useHlsTranscode').HlsTranscodeController.setLevel}
 * pins a level by its hls.js index, not a rendition id. So the menu is built from
 * live levels, but each rung is *labelled* by a stable, resolution-derived id
 * (`'720p'`, `'1080p'`, …, `'2160p'`) that matches `@phlix/contracts`'
 * `RenditionId` vocabulary. That stable id — not the volatile level index — is
 * what gets persisted to `prefs.defaultQuality`, so a pinned choice survives a
 * reload and a fresh stream whose level indices differ. The `'auto'` sentinel
 * (also from the contracts vocabulary) means "let ABR decide".
 */
import type { HlsLevel } from './hls-playback';
import type { SelectOption } from '../ui/listbox';
/** "Let ABR decide" sentinel — mirrors `@phlix/contracts`' `AUTO_QUALITY`. */
export declare const AUTO_QUALITY = "auto";
/**
 * Map an encoded height (px) to a stable rung id, aligned with the fixed
 * `RenditionId` rungs. Uses inclusive lower bounds, so a height is FLOORED to
 * the standard rung at or below it — NOT snapped to the nearest rung. E.g. 1088
 * → '1080p' (a hair above the boundary), but a 700px or 576px (PAL) source both
 * floor to '480p' rather than "rounding up" toward 720p. This is intentional: it
 * never over-states a source's resolution, and both {@link levelIndexForQuality}
 * (persist) and {@link qualityForLevel} (read back) apply the same floor, so a
 * choice round-trips consistently even for off-standard encode heights.
 */
export declare function qualityId(height: number): string;
/** Human label for a rung — "4K" for the 2160p rung, else the rung id itself. */
export declare function qualityLabel(height: number): string;
/**
 * The discrete, switchable rungs for the menu — highest resolution first, one
 * entry per distinct rung id (levels that snap to the same rung are collapsed).
 * The returned `value` is the stable rung id (persist-safe); the `label` is the
 * human resolution. Empty when no levels are known (native-HLS / pre-manifest).
 */
export declare function qualityRungs(levels: readonly HlsLevel[]): SelectOption[];
/**
 * The hls.js level index to pin for a given rung id — the HIGHEST-bitrate level
 * that snaps to that rung (best encode of that resolution). Returns `-1` for the
 * `'auto'` sentinel or when no level matches (an unknown/stale pref → fall back
 * to Auto).
 */
export declare function levelIndexForQuality(levels: readonly HlsLevel[], id: string): number;
/**
 * The rung id currently selected for the Select's model, derived from the pinned
 * hls.js level index. `'auto'` when nothing is pinned (`currentLevel < 0`) or the
 * pinned index is no longer in the ladder.
 */
export declare function qualityForLevel(levels: readonly HlsLevel[], currentLevel: number): string;
