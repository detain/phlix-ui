/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

/**
 * S241 — resolve an image URL that arrived inside a JSON payload against the
 * SAME base the payload came from.
 *
 * ## The defect this exists to fix
 *
 * phlix-server emits image URLs as **root-relative** paths, not absolute ones:
 *
 *  - posters/artwork → `/api/v1/artwork/{itemId}?size={size}&exp=…&sig=…`
 *    (`ArtworkStorage::relativePath()`, minted by `SignedUrl::mint()`)
 *  - avatars         → `/api/v1/users/{userId}/avatar`
 *  - photos          → `/api/v1/photo/photos/{id}/thumbnail|full?exp=…&sig=…`
 *  - books           → `/api/v1/books/{id}/cover?exp=…&sig=…`
 *
 * On the media server that is correct: the SPA is served from the same origin
 * that serves those paths, so `<img src="/api/v1/artwork/…">` resolves. On the
 * **hub** it is wrong: the JSON came over the relay proxy
 * (`{apiBase}/api/v1/servers/{serverId}/proxy`), but a root-relative `src`
 * resolves against the *hub* document origin, which serves no such path — so
 * the browser asks the hub for an image only the paired server has, and every
 * poster and avatar is blank. Prefixing the same relay base the payload came
 * from puts the request back on the tunnel that (since S238) serves the bytes.
 *
 * ## Why the join is a plain string concatenation
 *
 * The signed query string must survive **byte-for-byte** — but for a NARROWER
 * reason than "the whole query is signed", which is what this comment used to
 * claim and which is false.
 *
 * What is actually signed is the **path only**. phlix-server's
 * `Auth\SignedUrl::canonicalResource()` strips everything from the first `?`
 * before hashing, deliberately, so that the minter and the verifier — which
 * only ever sees the query-less `Request::$path` — compute the HMAC over the
 * same string. Measured against the real signer: a token minted for
 * `/api/v1/artwork/item-1?size=w342` verifies TRUE against `?size=original`,
 * TRUE against the bare path, and FALSE against `item-2`. **The item is bound;
 * the `size` variant is not, and never was** — one signed poster URL is valid
 * for every size of that item, by design.
 *
 * So the byte-for-byte rule is not about `size` ordering or `size` encoding. It
 * is about the **`sig` value itself**: a URL round-trip (`new URL(...)`,
 * `URLSearchParams`) re-encodes it — `%2F`→`/`, `+`↔`%20`, case-folded escapes
 * — and a mangled `sig` fails `hash_equals` just as hard as a wrong one. The
 * failure is silent: the image 401s rather than erroring visibly. The hub
 * forwards `$request->queryString` verbatim, so this module must too: it only
 * ever **prepends** to the path and never rewrites a single byte of what
 * follows.
 *
 * ⚠ Do NOT "simplify" the concatenation on the strength of the correction
 * above. The conclusion is unchanged — only the reasoning behind it was wrong.
 *
 * ## What is deliberately NOT rewritten
 *
 *  - **Absolute URLs** (`https://image.tmdb.org/…`, `http://…`, `data:`,
 *    `blob:`). This is the control: un-cached items carry TMDB/fanart CDN links
 *    straight through, and mangling them would break the media server too,
 *    where every relative path already resolves correctly today.
 *  - **Protocol-relative URLs** (`//cdn.example/x.jpg`) — those are absolute
 *    (they inherit the page scheme), so they are left alone. A `/\` prefix is
 *    treated the same way, because the WHATWG URL parser folds `\` to `/` for
 *    special schemes and `/\host` is therefore protocol-relative too.
 *  - **An empty base** — on the media server `mediaApiBase` resolves to the
 *    app's own `apiBase`, which is normally `''` (same origin). With no base
 *    there is nothing to prepend and the value passes through untouched, so
 *    this helper is a strict no-op on the media server's default config.
 *
 * `null`/`undefined` are returned as-is rather than coerced to `''`, because a
 * template binds them as `:src="maybeNull"` and Vue drops the attribute for
 * `null`/`undefined` — coercing to `''` would make the browser re-request the
 * current document as an image.
 *
 * ⚠ This is NOT `PhlixAppConfig.imageOrigin` (`src/app/types.ts`). That is a
 * static `preconnect` hint for a CDN host; this seam is the reactive
 * per-selected-server relay base from `useMediaApiBase()`.
 */

/**
 * Whether `url` is a root-relative path this helper may prefix.
 *
 * True only for a value that starts with a single `/`. `//host` and `/\host`
 * are protocol-relative (absolute) and are excluded.
 */
export function isRewritableImagePath(url: string): boolean {
  return url.length > 1 && url[0] === '/' && url[1] !== '/' && url[1] !== '\\';
}

/**
 * Resolve one image URL against a media-API base.
 *
 * @param base The media API base (`useMediaApiBase().value`); `''` on the media
 *             server, `{apiBase}/api/v1/servers/{id}/proxy` on the hub with a
 *             server selected. Trailing slashes are trimmed.
 * @param url  The URL as it arrived in the JSON payload.
 * @return The prefixed URL for a root-relative path; otherwise `url` unchanged
 *         (same value, byte-identical — absolute URLs, `data:`/`blob:`, `''`,
 *         `null` and `undefined` all pass straight through).
 */
export function resolveImageSrc<T extends string | null | undefined>(
  base: string,
  url: T,
): T | string {
  if (typeof url !== 'string' || url === '') {
    return url;
  }
  if (!isRewritableImagePath(url)) {
    return url;
  }
  const trimmed = base.replace(/\/+$/, '');
  if (trimmed === '') {
    return url;
  }
  return trimmed + url;
}

/**
 * Resolve every candidate URL in a `srcset` against a media-API base.
 *
 * A `srcset` is a comma-separated list of `url [descriptor]` candidates, and
 * each candidate URL is fetched — and signature-verified — independently, so
 * every one of them needs the same treatment as a lone `src`. Only the URL
 * portion of each candidate is touched; the descriptor (`200w`, `2x`) is
 * carried across verbatim, and each URL is passed to {@link resolveImageSrc},
 * so absolute CDN candidates survive byte-for-byte.
 *
 * @param base   The media API base, as for {@link resolveImageSrc}.
 * @param srcset The `srcset` attribute value.
 * @return The rewritten `srcset`, or the input unchanged when it is not a
 *         non-empty string.
 */
export function resolveImageSrcset<T extends string | null | undefined>(
  base: string,
  srcset: T,
): T | string {
  if (typeof srcset !== 'string' || srcset.trim() === '') {
    return srcset;
  }
  const parts: string[] = [];
  for (const raw of srcset.split(',')) {
    const candidate = raw.trim();
    if (candidate === '') {
      continue;
    }
    const gap = candidate.search(/\s/);
    const url = gap === -1 ? candidate : candidate.slice(0, gap);
    const descriptor = gap === -1 ? '' : candidate.slice(gap);
    parts.push(String(resolveImageSrc(base, url)) + descriptor);
  }
  return parts.length > 0 ? parts.join(', ') : srcset;
}
