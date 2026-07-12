/**
 * Music library API — artists, albums, and tracks.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */
import type { MusicArtist, MusicAlbum, MusicTrack } from '../types/music';
/**
 * Fetch all music artists from the library.
 * Calls `GET /api/v1/music/artists`.
 */
export declare function fetchArtists(apiBase: string, signal?: AbortSignal): Promise<MusicArtist[]>;
/**
 * Fetch all albums for a given artist.
 * Calls `GET /api/v1/music/artists/{artistId}/albums`.
 */
export declare function fetchAlbumsByArtist(apiBase: string, artistId: string, signal?: AbortSignal): Promise<MusicAlbum[]>;
/**
 * Fetch all tracks for a given album.
 * Calls `GET /api/v1/music/albums/{albumId}/tracks`.
 */
export declare function fetchTracksByAlbum(apiBase: string, albumId: string, signal?: AbortSignal): Promise<MusicTrack[]>;
