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
    id: number;
    title: string;
    durationSecs: number;
    trackNumber: number | null;
}
