/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */
import type { SubtitleTrack } from '../components/player/transcode';
/**
 * S242 — resolve a WebVTT sidecar URL that arrived inside a playback JSON payload
 * against the SAME base the payload came from.
 *
 * ## The defect
 *
 * phlix-server mints a subtitle `<track>` URL as a ROOT-RELATIVE signed path:
 *
 *  - embedded text track → `/api/v1/media/{itemId}/subtitles/{ordinal}?exp=…&sig=…`
 *  - downloaded sidecar  → `/api/v1/media/{itemId}/subtitles/external/{streamId}?exp=…&sig=…`
 *
 * (both from `Media\Library\StreamTrackShaper::subtitleTracks()`, minted by
 * `Auth\SignedUrl::mint()`, which returns `$pathOnly . '?' . $query` — never an
 * absolute URL). Bound verbatim into `<track :src>` that resolves against the
 * DOCUMENT origin: correct on the media server, wrong on the hub, where the
 * playback-info JSON came over the relay proxy for the selected server. The hub
 * serves no `/api/v1/media/{id}/subtitles/…` route, so the sidecar 404s and the
 * viewer gets no captions.
 *
 * ## Why the relay base, and NOT `mediaDirectBase`
 *
 * `mediaDirectBase` is what the `<video>` byte stream PREFERS, so that the bytes
 * (and their bandwidth cost) do not traverse the hub. Since S247 the relay does
 * route `/media/{id}/stream` as well — as an anchored pattern, with `Range`/206
 * carried through — so that preference is about egress, not reachability. A
 * subtitle sidecar is the opposite case, on three independent counts:
 *
 *  1. **It is already in relay scope.** `/api/v1/media` is a GET prefix in the
 *     hub's `ServerProxyController::BROWSE_SCOPE_ALLOWLIST`, and the hub's own
 *     `SCOPE_DENY_PATTERNS` comment states that "the sibling reads `/subtitles`,
 *     `/subtitles/search` and `/subtitles/{index}` stay allowed (pinned by
 *     tests)" — only `POST …/subtitles/download` is denied. So NO hub allow-list
 *     change is required, and none may be added.
 *  2. **A cross-origin `<track>` needs CORS.** Per the HTML spec a text track
 *     whose URL is not same-origin is only fetched when the media element
 *     carries `crossorigin`. The `<video>` in `Player.vue` sets no `crossorigin`
 *     attribute, so a `mediaDirectBase`-prefixed sidecar (the paired server's own
 *     public origin) would be blocked by the browser before the server ever saw
 *     it. The relay base is same-origin with the hub document, so it is not.
 *  3. **It is not a byte stream.** A WebVTT sidecar is a few KB of text, so the
 *     egress argument for preferring `mediaDirectBase` does not apply to it at
 *     all. The transcode path already sends `/hls/{job}/sub-{n}.vtt` over this
 *     very base.
 *
 * ## The signed query, and the `stableKey()` de-dupe
 *
 * The server issues a FRESH `exp`/`sig` for the same sidecar on every
 * playback-info call, and `SignedUrlMiddleware` verifies the signature against
 * `$request->path` (query-less) — so the query must survive byte-for-byte and
 * must not be re-ordered. This module only ever PREPENDS, exactly like S241, so
 * it never touches a byte of the query. That is also what keeps
 * `Player.vue`'s `stableKey()` (`s.url.split('?')[0]`) working across a re-mint:
 * prefixing changes the path identically for every track in a list and adds no
 * `?`, so two spellings of the same sidecar still collapse to one key.
 */
/**
 * Resolve one subtitle sidecar URL against the media API base.
 *
 * @param base The media API base (`props.apiBase` — the same value the transcode
 *             composable resolves its own sidecars against); `''` on the media
 *             server, `{apiBase}/api/v1/servers/{id}/proxy` on the hub.
 * @param url  The `url` as it arrived in the JSON payload.
 * @return The prefixed URL for a root-relative path; otherwise `url` unchanged.
 */
export declare function resolveSubtitleUrl(base: string, url: string): string;
/**
 * Resolve every track's `url` in a list, returning a NEW list of new objects so
 * the caller's source array (a prop, or the on-demand download buffer) is never
 * mutated — those arrays are compared by identity elsewhere in `Player.vue`
 * (`onSubtitleAdded` de-dupes on the RAW url) and must stay as the server sent
 * them.
 *
 * Returns the input array itself when nothing needed prefixing, so an unchanged
 * list does not invalidate the `computed` that wraps it.
 *
 * @param base   The media API base, as for {@link resolveSubtitleUrl}.
 * @param tracks The tracks exactly as parsed from the wire.
 */
export declare function resolveSubtitleTracks(base: string, tracks: readonly SubtitleTrack[]): SubtitleTrack[];
