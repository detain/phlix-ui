/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect } from 'vitest';
import type { HlsLevel } from './hls-playback';
import { AUTO_QUALITY, ORIGINAL_QUALITY, qualityId, qualityLabel, qualityRungs, levelIndexForQuality, levelIndexForVariant, qualityForLevel, topLevelIndex, originalVariantAvailable } from './quality';

function level(index: number, height: number, bitrate: number): HlsLevel {
  return { index, height, width: Math.round((height * 16) / 9), bitrate, name: `${height}p` };
}

describe('quality helpers', () => {
  describe('qualityId', () => {
    it('snaps standard encode heights to their rung id', () => {
      expect(qualityId(2160)).toBe('2160p');
      expect(qualityId(1440)).toBe('1440p');
      expect(qualityId(1080)).toBe('1080p');
      expect(qualityId(720)).toBe('720p');
      expect(qualityId(480)).toBe('480p');
      expect(qualityId(360)).toBe('360p');
      expect(qualityId(240)).toBe('240p');
    });

    it('snaps a slightly-off height up to the nearest rung and floors tiny heights', () => {
      expect(qualityId(1088)).toBe('1080p');
      expect(qualityId(140)).toBe('240p');
    });
  });

  describe('qualityLabel', () => {
    it('labels 2160p as "4K" and everything else as its rung id', () => {
      expect(qualityLabel(2160)).toBe('4K');
      expect(qualityLabel(1080)).toBe('1080p');
      expect(qualityLabel(720)).toBe('720p');
    });
  });

  describe('qualityRungs', () => {
    it('is empty for no levels', () => {
      expect(qualityRungs([])).toEqual([]);
    });

    it('lists one rung per distinct resolution, highest-first, regardless of input order', () => {
      const levels = [level(2, 480, 1_400_000), level(0, 1080, 5_000_000), level(1, 720, 2_800_000)];
      expect(qualityRungs(levels)).toEqual([
        { value: '1080p', label: '1080p' },
        { value: '720p', label: '720p' },
        { value: '480p', label: '480p' },
      ]);
    });

    it('collapses two levels that snap to the same rung', () => {
      const levels = [level(0, 1080, 6_000_000), level(1, 1080, 4_000_000), level(2, 720, 2_800_000)];
      expect(qualityRungs(levels).map((r) => r.value)).toEqual(['1080p', '720p']);
    });
  });

  describe('levelIndexForQuality', () => {
    const levels = [level(0, 1080, 5_000_000), level(1, 720, 2_800_000), level(2, 480, 1_400_000)];

    it('returns the matching level index for a rung id', () => {
      expect(levelIndexForQuality(levels, '720p')).toBe(1);
    });

    it('returns -1 for the auto sentinel', () => {
      expect(levelIndexForQuality(levels, AUTO_QUALITY)).toBe(-1);
    });

    it('returns -1 for an unknown/stale rung not in the ladder', () => {
      expect(levelIndexForQuality(levels, '2160p')).toBe(-1);
    });

    it('picks the highest-bitrate level when two snap to the same rung', () => {
      const dupes = [level(0, 1080, 4_000_000), level(1, 1080, 6_000_000)];
      expect(levelIndexForQuality(dupes, '1080p')).toBe(1);
    });
  });

  describe('levelIndexForVariant', () => {
    const levels = [level(0, 1080, 8_000_000), level(1, 1080, 5_000_000), level(2, 720, 2_800_000)];

    it('exports the "original" sentinel used for prefs persistence', () => {
      expect(ORIGINAL_QUALITY).toBe('original');
    });

    it('matches the level with the variant exact height and closest bitrate', () => {
      expect(levelIndexForVariant(levels, { height: 1080, bitrate: 8_100_000 })).toBe(0);
      expect(levelIndexForVariant(levels, { height: 1080, bitrate: 4_900_000 })).toBe(1);
    });

    it('falls back to the closest level whose height is >= the source (never downgrades below it)', () => {
      // 700px source → no exact-height match; the closest level still ≥ 700 is the
      // 720p level (index 2), NOT a floored-down lower rung. Keeps "Original" from
      // selecting a quality below the source encode.
      expect(levelIndexForVariant(levels, { height: 700, bitrate: 2_500_000 })).toBe(2);
    });

    it('returns -1 when no level matches the variant rung at all', () => {
      expect(levelIndexForVariant(levels, { height: 2160, bitrate: 20_000_000 })).toBe(-1);
    });

    it('returns -1 for an absent or junk variant', () => {
      expect(levelIndexForVariant(levels, null)).toBe(-1);
      expect(levelIndexForVariant(levels, undefined)).toBe(-1);
      expect(levelIndexForVariant(levels, { height: 0, bitrate: 1 })).toBe(-1);
    });
  });

  describe('qualityForLevel', () => {
    const levels = [level(0, 1080, 5_000_000), level(1, 720, 2_800_000)];

    it('is auto when nothing is pinned', () => {
      expect(qualityForLevel(levels, -1)).toBe(AUTO_QUALITY);
    });

    it('maps a pinned index back to its rung id', () => {
      expect(qualityForLevel(levels, 1)).toBe('720p');
    });

    it('is auto when the pinned index is no longer in the ladder', () => {
      expect(qualityForLevel(levels, 9)).toBe(AUTO_QUALITY);
    });
  });

  describe('topLevelIndex', () => {
    it('returns the index of the highest-resolution rung', () => {
      const levels = [level(0, 720, 2_800_000), level(1, 1080, 5_000_000), level(2, 480, 1_400_000)];
      expect(topLevelIndex(levels)).toBe(1);
    });

    it('tie-breaks equal heights by the highest bitrate', () => {
      const levels = [level(0, 1080, 4_000_000), level(1, 1080, 6_000_000)];
      expect(topLevelIndex(levels)).toBe(1);
    });

    it('returns -1 for an empty ladder', () => {
      expect(topLevelIndex([])).toBe(-1);
    });
  });

  describe('originalVariantAvailable', () => {
    const levels = [level(0, 1080, 5_000_000), level(1, 720, 2_800_000)];

    it('is true when an id:"original" variant resolves to a live level', () => {
      const variants = [{ id: ORIGINAL_QUALITY, height: 1080, bitrate: 5_000_000 }];
      expect(originalVariantAvailable(levels, variants)).toBe(true);
    });

    it('is false when the ladder folded original (no id:"original" advertised)', () => {
      const variants = [
        { id: 'v0', height: 1080, bitrate: 5_000_000 },
        { id: 'v1', height: 720, bitrate: 2_800_000 },
      ];
      expect(originalVariantAvailable(levels, variants)).toBe(false);
    });

    it('is false when variants are null/empty or the variant resolves to no level', () => {
      expect(originalVariantAvailable(levels, null)).toBe(false);
      expect(originalVariantAvailable(levels, [])).toBe(false);
      // An advertised original taller than every level resolves to no rung.
      expect(originalVariantAvailable(levels, [{ id: ORIGINAL_QUALITY, height: 2160, bitrate: 9_000_000 }])).toBe(false);
    });
  });
});
