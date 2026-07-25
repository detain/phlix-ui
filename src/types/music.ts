/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

/**
 * A music artist from the library.
 */
export interface MusicArtist {
  id: string;
  name: string;
  imageUrl: string | null;
  /** TRUE album count for this artist (not the length of any embedded list). */
  albumCount?: number;
  /**
   * TRUE indexed track count for this artist, across ALL of its albums — from the
   * server's `track_count`. Never sum an album page to get this: an artist with
   * more albums than one page would report a different number per page.
   */
  trackCount?: number;
}

/**
 * A music album from the library.
 */
export interface MusicAlbum {
  id: string;
  title: string;
  /** Album artist name — available when album is fetched by name. */
  artist?: string | null;
  albumArtUrl: string | null;
  year: number | null;
  /** TRUE indexed track count — may exceed `tracks.length`, see `tracksTruncated`. */
  totalTracks: number;
  tracks?: MusicTrack[];
  /**
   * True when `tracks` is only a PREFIX of the album (the server caps the tracks
   * it embeds in a LIST row at 100 per album / 2,000 per page and flags the cap).
   * A consumer that wants the whole list must fetch the album detail route
   * (`ApiClient.getAlbum(title, artist)`), which is exempt from that cap.
   * Absent/false on the detail route itself.
   */
  tracksTruncated?: boolean;
}

/**
 * A music track within an album.
 */
export interface MusicTrack {
  /** Server track id — a media-item UUID string. */
  id: string;
  title: string;
  durationSecs: number;
  trackNumber: number | null;
  /**
   * Server-minted **signed** direct-play URL (relative `/media/:id/stream?exp&sig`
   * or absolute). Present on tracks from `GET /api/v1/music/tracks[/{id}]`
   * (`formatTrack`); absent on the raw items embedded in an album's `tracks` list.
   * `useMusicPlayer` consumes this for `<audio src>`, resolving it via `getTrack`
   * when null. See performance_worklog_ui.md (UI-3.6 / X8).
   */
  streamUrl: string | null;
}
