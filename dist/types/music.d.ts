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
    albumCount?: number;
}
/**
 * A music album from the library.
 */
export interface MusicAlbum {
    id: string;
    title: string;
    albumArtUrl: string | null;
    year: number | null;
    totalTracks: number;
    tracks?: MusicTrack[];
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
}
