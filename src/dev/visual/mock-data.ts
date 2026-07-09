/**
 * Deterministic, OFFLINE mock data for the R6.4b per-surface visual harnesses.
 *
 * Posters are inline SVG data-URIs (NOT network images) so the visual baselines
 * are byte-stable and reproducible with no DNS/CDN dependency. The URI is
 * percent-encoded AND has its parentheses stripped to `%28`/`%29`, because
 * `encodeURIComponent` leaves `(`/`)` intact and MediaDetail binds the poster
 * into an UNQUOTED CSS `url(...)` (`media-detail__ambient`) where a raw paren
 * would break the declaration. The result is therefore safe in BOTH an
 * `<img src>` and an unquoted CSS `url()`.
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */
import type { MediaItem } from '../../types/media-item';

/** Cinematic gradient pairs (top → bottom) for the placeholder posters. */
const POSTER_GRADIENTS: readonly [string, string][] = [
  ['#5a3a12', '#0c0a07'],
  ['#1b2f3a', '#090c10'],
  ['#3a1b2a', '#0d090c'],
  ['#2a341b', '#0b0d09'],
  ['#3a2f12', '#0c0a07'],
  ['#22304a', '#090b10'],
];

/** Build a deterministic SVG poster data-URI (2:3, gradient + title + index). */
function posterFor(title: string, i: number): string {
  const [a, b] = POSTER_GRADIENTS[i % POSTER_GRADIENTS.length];
  const safeTitle = title.replace(/[<>&]/g, '').slice(0, 22);
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="300" viewBox="0 0 200 300">` +
    `<defs><linearGradient id="g" x1="0" y1="0" x2="0.4" y2="1">` +
    `<stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs>` +
    `<rect width="200" height="300" fill="url(#g)"/>` +
    `<text x="16" y="262" font-family="Georgia,serif" font-size="17" font-weight="700" fill="#f3ede1">${safeTitle}</text>` +
    `<rect x="16" y="276" width="44" height="4" rx="2" fill="#f5a524" opacity="0.8"/>` +
    `</svg>`;
  return 'data:image/svg+xml,' + encodeURIComponent(svg).replace(/\(/g, '%28').replace(/\)/g, '%29');
}

/** Build a deterministic, offline SVG studio-logo data-URI (wordmark on a bar). */
function studioLogo(label: string): string {
  const safe = label.replace(/[<>&]/g, '').slice(0, 20);
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="34" viewBox="0 0 120 34">` +
    `<rect width="120" height="34" rx="4" fill="#12100b"/>` +
    `<text x="60" y="22" text-anchor="middle" font-family="Georgia,serif" font-size="13" ` +
    `font-weight="700" fill="#f5a524">${safe}</text>` +
    `</svg>`;
  return 'data:image/svg+xml,' + encodeURIComponent(svg).replace(/\(/g, '%28').replace(/\)/g, '%29');
}

const GENRES = ['Drama', 'Sci-Fi', 'Thriller', 'Action', 'Mystery', 'Romance', 'Noir'];
const RATINGS: MediaItem['rating'][] = ['PG', 'PG-13', 'R', 'PG-13', 'R', 'G', 'NC-17'];
const TITLES = [
  'Neon Harbour',
  'The Long Exposure',
  'Afterglow',
  'Static Bloom',
  'Midnight Reel',
  'Cinder & Smoke',
  'The Quiet Tide',
  'Paper Lanterns',
  'Velvet Static',
  'Northern Lights',
  'The Last Marquee',
  'Glass Cathedral',
  'Amber Frequencies',
  'Saltwater Hymn',
  'Phantom Reel',
  'Low Orbit',
];

/** A deterministic library of 16 movies with offline SVG posters. */
export const LIBRARY: MediaItem[] = TITLES.map((name, i) => ({
  id: `m-${i + 1}`,
  name,
  type: 'movie',
  poster_url: posterFor(name, i),
  genres: [GENRES[i % GENRES.length], GENRES[(i + 2) % GENRES.length]],
  year: 1998 + ((i * 3) % 27),
  rating: RATINGS[i % RATINGS.length],
  runtime: 96 + ((i * 7) % 64),
  overview: null,
  actors: [],
  director: null,
  created_at: null,
  updated_at: null,
}));

/** Rich hero item for the MediaDetail surface (overview + cast + director). */
export const HERO: MediaItem = {
  id: 'hero-1',
  name: 'Neon Harbour',
  type: 'movie',
  poster_url: posterFor('Neon Harbour', 0),
  genres: ['Sci-Fi', 'Drama', 'Noir'],
  year: 2024,
  rating: 'R',
  runtime: 148,
  overview:
    'A dock-worker in a flooded coastal city takes a job ferrying data through the ' +
    'drowned districts, and discovers the cargo is a memory that someone is willing ' +
    'to sink the harbour to erase.',
  actors: ['Ava Mercer', 'Idris Calloway', 'Lena Park', 'Marcus Vane', 'Sofia Reyes'],
  director: 'Denis Okonkwo',
  external_ids: { tmdb: '693134', imdb: 'tt1160419', tvdb: '' },
  // Exercises MediaDetail's "Studios" section so the a11y harness scans the
  // company chips (one WITH a logo image, one without — the logoless entry keeps
  // the axe scan covering the text-only chip path too).
  production_companies: [
    { name: 'Harbour Light Pictures', logo_url: studioLogo('Harbour Light'), origin_country: 'US' },
    { name: 'Drowned City Films', logo_url: null, origin_country: 'GB' },
  ],
  created_at: null,
  updated_at: null,
};

/** "Continue Watching" rail (a slice of the library). */
export const CONTINUE: MediaItem[] = LIBRARY.slice(0, 8);

/** "More like this" rail for the detail surface. */
export const SIMILAR: MediaItem[] = LIBRARY.slice(2, 10);

/**
 * Resume positions (seconds) to seed `usePlayerStore.resumeMap` so a couple of
 * Continue-Watching cards show a deterministic progress bar (ratio = seconds ÷
 * runtime-minutes×60). Keyed by item id.
 */
export const RESUME_SEED: Record<string, number> = {
  // runtimes: m-1 = 96m, m-2 = 103m, m-3 = 110m (LIBRARY formula 96 + (i*7)%64).
  'm-1': Math.round(96 * 60 * 0.35), // ~35%
  'm-2': Math.round(103 * 60 * 0.6), // ~60%
  'm-3': Math.round(110 * 60 * 0.12), // ~12%
};
