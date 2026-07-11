/**
 * Music library API — artists, albums, and tracks.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { ApiClient } from './client';
import { LocalStorageTokenStore } from './tokenStore';
import type { MusicArtist, MusicAlbum, MusicTrack } from '../types/music';

/** Response envelope for the artists list. */
interface ArtistsResponse {
  artists?: MusicArtist[];
}

/** Response envelope for the albums list. */
interface AlbumsResponse {
  albums?: MusicAlbum[];
}

/** Response envelope for the tracks list. */
interface TracksResponse {
  tracks?: MusicTrack[];
}

/**
 * Fetch all music artists from the library.
 * Calls `GET /api/v1/music/artists`.
 */
export async function fetchArtists(apiBase: string, signal?: AbortSignal): Promise<MusicArtist[]> {
  const client = new ApiClient({
    baseUrl: apiBase,
    tokenStore: typeof window !== 'undefined' ? new LocalStorageTokenStore() : undefined,
  });
  const res = await client.get<ArtistsResponse>('/api/v1/music/artists', undefined, signal);
  return Array.isArray(res.artists) ? res.artists : [];
}

/**
 * Fetch all albums for a given artist.
 * Calls `GET /api/v1/music/artists/{artistId}/albums`.
 */
export async function fetchAlbumsByArtist(
  apiBase: string,
  artistId: string,
  signal?: AbortSignal,
): Promise<MusicAlbum[]> {
  const client = new ApiClient({
    baseUrl: apiBase,
    tokenStore: typeof window !== 'undefined' ? new LocalStorageTokenStore() : undefined,
  });
  const res = await client.get<AlbumsResponse>(
    `/api/v1/music/artists/${encodeURIComponent(artistId)}/albums`,
    undefined,
    signal,
  );
  return Array.isArray(res.albums) ? res.albums : [];
}

/**
 * Fetch all tracks for a given album.
 * Calls `GET /api/v1/music/albums/{albumId}/tracks`.
 */
export async function fetchTracksByAlbum(
  apiBase: string,
  albumId: string,
  signal?: AbortSignal,
): Promise<MusicTrack[]> {
  const client = new ApiClient({
    baseUrl: apiBase,
    tokenStore: typeof window !== 'undefined' ? new LocalStorageTokenStore() : undefined,
  });
  const res = await client.get<TracksResponse>(
    `/api/v1/music/albums/${encodeURIComponent(albumId)}/tracks`,
    undefined,
    signal,
  );
  return Array.isArray(res.tracks) ? res.tracks : [];
}
