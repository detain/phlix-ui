/**
 * media-poster (R6.2b) — pure helpers for responsive poster `srcset`/`sizes`.
 *
 * The backend (or a consumer) can optionally supply multiple sized poster URLs;
 * `MediaCard` renders them as a responsive `srcset` so the browser fetches the
 * resolution that fits the device instead of always pulling one fixed poster.
 * With no sized URLs supplied the card degrades to the single `poster_url` and
 * the markup is byte-identical to the pre-R6.2b card (no `srcset`/`sizes`).
 *
 * DOM-free + side-effect-free so it can be unit-tested directly (mirrors
 * `virtual-grid.ts`). The optional image-proxy server hook that would emit sized
 * URLs (`phlix_ui_redo.md` §Optional#6) is NOT built yet — this is the opt-in
 * client seam that lights up the moment a consumer provides sized URLs.
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */
import type { PosterSrcsetInput, PosterSource } from '../types/media-item';

/**
 * Default `sizes` hint used when a width-descriptor `srcset` is resolved but the
 * consumer did not pass an explicit `posterSizes`. Mirrors the poster's real
 * rendered width in this UI (grid `minmax(180px, 1fr)` / row `minmax(160px,
 * 180px)` → ~160–200px on desktop, roughly two columns ≈ 45vw on a phone). It is
 * a CSS-pixel hint — the browser multiplies by device pixel ratio itself — and
 * is fully overridable per card via the `posterSizes` prop.
 */
export const DEFAULT_POSTER_SIZES = '(max-width: 600px) 45vw, 200px';

/** True when a `srcset` string carries at least one width (`w`) descriptor. */
export function srcsetHasWidthDescriptor(srcset: string): boolean {
  // A width descriptor is a candidate ending in `<int>w` (e.g. `poster.jpg 400w`).
  return /(?:^|,)\s*\S+\s+\d+w(?=\s*(?:,|$))/.test(srcset);
}

/** Trim a numeric descriptor to at most 3 decimals without trailing zeros. */
function formatDensity(n: number): string {
  return Number(n.toFixed(3)).toString();
}

/** Normalize one source entry to a single `srcset` candidate, or `undefined`. */
function normalizeSource(entry: PosterSource | null | undefined): string | undefined {
  if (entry == null) return undefined;
  if (typeof entry === 'string') {
    const url = entry.trim();
    return url.length ? url : undefined;
  }
  const url = typeof entry.url === 'string' ? entry.url.trim() : '';
  if (!url) return undefined;
  if (typeof entry.width === 'number' && Number.isFinite(entry.width) && entry.width > 0) {
    return `${url} ${Math.round(entry.width)}w`;
  }
  if (typeof entry.density === 'number' && Number.isFinite(entry.density) && entry.density > 0) {
    return `${url} ${formatDensity(entry.density)}x`;
  }
  return url;
}

/**
 * Build a `srcset` attribute string from either a ready-made `srcset` string
 * (passed through, trimmed) or an array of sized candidates. Returns `undefined`
 * when nothing usable is supplied — so binding it omits the attribute entirely
 * (Vue drops `undefined` attrs), keeping the single-`src` markup byte-identical.
 */
export function buildSrcset(input: PosterSrcsetInput): string | undefined {
  if (input == null) return undefined;
  if (typeof input === 'string') {
    const s = input.trim();
    return s.length ? s : undefined;
  }
  if (!Array.isArray(input)) return undefined;
  const parts: string[] = [];
  const seen = new Set<string>();
  for (const entry of input) {
    const candidate = normalizeSource(entry);
    if (candidate && !seen.has(candidate)) {
      seen.add(candidate);
      parts.push(candidate);
    }
  }
  return parts.length ? parts.join(', ') : undefined;
}

/** Resolved responsive-image attributes for a poster `<img>`. */
export interface PosterImageSources {
  /** The `srcset` attribute value, or `undefined` to omit it. */
  srcset?: string;
  /** The `sizes` attribute value, or `undefined` to omit it. */
  sizes?: string;
}

/**
 * Resolve the `srcset` + `sizes` attributes for a poster `<img>`.
 *
 * - No usable sources → `{}` (omit both — single-`src` markup is unchanged).
 * - A width-descriptor `srcset` → emit `sizes` (explicit `posterSizes`, else the
 *   safe-by-default {@link DEFAULT_POSTER_SIZES}) so the browser can pick the
 *   right candidate instead of assuming `100vw` and always fetching the largest.
 * - A density (`x`) `srcset` → emit `sizes` only if explicitly provided
 *   (`sizes` is ignored for density descriptors, so we don't manufacture one).
 */
export function resolvePosterSources(
  input: PosterSrcsetInput,
  explicitSizes?: string | null,
): PosterImageSources {
  const srcset = buildSrcset(input);
  if (!srcset) return {};
  const explicit = typeof explicitSizes === 'string' ? explicitSizes.trim() : '';
  if (explicit) return { srcset, sizes: explicit };
  if (srcsetHasWidthDescriptor(srcset)) return { srcset, sizes: DEFAULT_POSTER_SIZES };
  return { srcset };
}
