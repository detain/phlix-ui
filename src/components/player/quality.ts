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
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */
import type { HlsLevel } from './hls-playback';
import type { SelectOption } from '../ui/listbox';

/** "Let ABR decide" sentinel — mirrors `@phlix/contracts`' `AUTO_QUALITY`. */
export const AUTO_QUALITY = 'auto';

/** The "play the untouched source rendition" rung id. The server's variants list
 *  carries a real playable variant with `id: 'original'` (the source's own
 *  height/bitrate); this sentinel is what the menu persists to
 *  `prefs.defaultQuality` when the user picks it. */
export const ORIGINAL_QUALITY = 'original';

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
export function qualityId(height: number): string {
  if (height >= 2160) return '2160p';
  if (height >= 1440) return '1440p';
  if (height >= 1080) return '1080p';
  if (height >= 720) return '720p';
  if (height >= 480) return '480p';
  if (height >= 360) return '360p';
  return '240p';
}

/** Human label for a rung — "4K" for the 2160p rung, else the rung id itself. */
export function qualityLabel(height: number): string {
  return height >= 2160 ? '4K' : qualityId(height);
}

/**
 * The discrete, switchable rungs for the menu — highest resolution first, one
 * entry per distinct rung id (levels that snap to the same rung are collapsed).
 * The returned `value` is the stable rung id (persist-safe); the `label` is the
 * human resolution. Empty when no levels are known (native-HLS / pre-manifest).
 */
export function qualityRungs(levels: readonly HlsLevel[]): SelectOption[] {
  const seen = new Set<string>();
  const rungs: SelectOption[] = [];
  for (const lvl of [...levels].sort((a, b) => b.height - a.height)) {
    const id = qualityId(lvl.height);
    if (seen.has(id)) continue;
    seen.add(id);
    rungs.push({ value: id, label: qualityLabel(lvl.height) });
  }
  return rungs;
}

/**
 * The hls.js level index to pin for a given rung id — the HIGHEST-bitrate level
 * that snaps to that rung (best encode of that resolution). Returns `-1` for the
 * `'auto'` sentinel or when no level matches (an unknown/stale pref → fall back
 * to Auto).
 */
export function levelIndexForQuality(levels: readonly HlsLevel[], id: string): number {
  if (id === AUTO_QUALITY) return -1;
  let best = -1;
  let bestBitrate = -1;
  for (const lvl of levels) {
    if (qualityId(lvl.height) === id && lvl.bitrate > bestBitrate) {
      best = lvl.index;
      bestBitrate = lvl.bitrate;
    }
  }
  return best;
}

/**
 * The hls.js level index that carries a given server variant (e.g. the
 * `id: 'original'` rendition) — matched by EXACT height first, tie-broken by the
 * bitrate closest to the variant's advertised one (the master playlist re-states
 * the source's own height/bitrate for the original rendition, so an exact-height
 * match normally exists). When no level has that exact height, falls back to the
 * CLOSEST level whose height is >= the variant's, so an off-by-rounding encode
 * height still resolves WITHOUT ever selecting a quality below the source. Returns
 * `-1` when the variant is absent/junk or no level is tall enough — callers must
 * treat that as "not applicable" (hide the option), NEVER as a silent 'auto'.
 */
export function levelIndexForVariant(
  levels: readonly HlsLevel[],
  variant: { height: number; bitrate: number } | null | undefined,
): number {
  if (!variant || !(variant.height > 0)) return -1;
  let best = -1;
  let bestDelta = Number.POSITIVE_INFINITY;
  for (const lvl of levels) {
    if (lvl.height !== variant.height) continue;
    const delta = Math.abs(lvl.bitrate - variant.bitrate);
    if (delta < bestDelta) {
      best = lvl.index;
      bestDelta = delta;
    }
  }
  if (best >= 0) return best;
  // Fallback: find the LOWEST hls.js level that is >= variant.height.
  // This ensures "Original" doesn't select a lower quality than the source.
  let closest = -1;
  let closestHeightDiff = Number.POSITIVE_INFINITY;
  for (const lvl of levels) {
    if (lvl.height >= variant.height) {
      const diff = lvl.height - variant.height;
      if (diff < closestHeightDiff) {
        closest = lvl.index;
        closestHeightDiff = diff;
      }
    }
  }
  return closest;
}

/**
 * The rung id currently selected for the Select's model, derived from the pinned
 * hls.js level index. `'auto'` when nothing is pinned (`currentLevel < 0`) or the
 * pinned index is no longer in the ladder.
 */
export function qualityForLevel(levels: readonly HlsLevel[], currentLevel: number): string {
  if (currentLevel < 0) return AUTO_QUALITY;
  const lvl = levels.find((l) => l.index === currentLevel);
  return lvl ? qualityId(lvl.height) : AUTO_QUALITY;
}
