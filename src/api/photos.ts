/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { ApiClient } from './client';
import type {
    Photo,
    PhotoAlbum,
    PhotoDetail,
    SlideshowResponse,
} from '../types/photo';

/**
 * Photo API surface. Hits `GET /api/v1/photo/*` endpoints.
 * `library_id` is a REQUIRED query param on albums/photos/slideshow endpoints.
 *
 * Note: `thumbnail_url` / `full_url` (and slideshow `url`) are SIGNED URLs
 * with embedded tokens. These URLs can expire. Handle expiration gracefully
 * by re-fetching the parent album/photo data to get fresh URLs.
 */

/** Whole envelope returned by `GET /api/v1/photo/photos`. `count` = returned count. */
export interface PhotosResponse {
    photos: Photo[];
    pagination: { limit: number; offset: number; count: number };
}

class PhotoApi {
    private client(apiBase: string): ApiClient {
        return new ApiClient({ baseUrl: apiBase });
    }

    /**
     * GET /api/v1/photo/albums?library_id= → { albums: PhotoAlbum[] }
     * Lists all photo albums (date-grouped) for a library.
     */
    async getAlbums(apiBase: string, libraryId: string): Promise<PhotoAlbum[]> {
        const res = await this.client(apiBase).get<{ albums: PhotoAlbum[] }>('/api/v1/photo/albums', {
            library_id: libraryId,
        });
        return res.albums;
    }

    /**
     * GET /api/v1/photo/albums/{id}?library_id= → { album: PhotoAlbum }
     * Gets a specific album with its photos. The album `id` is md5 of the date.
     */
    async getAlbum(apiBase: string, albumId: string, libraryId: string): Promise<PhotoAlbum> {
        const res = await this.client(apiBase).get<{ album: PhotoAlbum }>(`/api/v1/photo/albums/${albumId}`, {
            library_id: libraryId,
        });
        return res.album;
    }

    /**
     * GET /api/v1/photo/photos?library_id=&limit=&offset= → { photos, pagination }
     * Lists all photos in a library with pagination.
     */
    async getPhotos(
        apiBase: string,
        libraryId: string,
        opts: { limit?: number; offset?: number } = {},
    ): Promise<PhotosResponse> {
        const params: Record<string, string> = { library_id: libraryId };
        if (opts.limit !== undefined) {
            params.limit = String(opts.limit);
        }
        if (opts.offset !== undefined) {
            params.offset = String(opts.offset);
        }
        return this.client(apiBase).get<PhotosResponse>('/api/v1/photo/photos', params);
    }

    /**
     * GET /api/v1/photo/photos/{id} → { photo: PhotoDetail }
     * Gets a single photo with full EXIF metadata.
     */
    async getPhoto(apiBase: string, id: string): Promise<PhotoDetail> {
        const res = await this.client(apiBase).get<{ photo: PhotoDetail }>(`/api/v1/photo/photos/${id}`);
        return res.photo;
    }

    /**
     * GET /api/v1/photo/slideshow?library_id=&album_id=&interval= → { slideshow, interval }
     * Gets slideshow data for a library, optionally scoped to an album.
     */
    async getSlideshow(
        apiBase: string,
        libraryId: string,
        opts: { albumId?: string; interval?: number } = {},
    ): Promise<SlideshowResponse> {
        const params: Record<string, string> = { library_id: libraryId };
        if (opts.albumId !== undefined) {
            params.album_id = opts.albumId;
        }
        if (opts.interval !== undefined) {
            params.interval = String(opts.interval);
        }
        return this.client(apiBase).get<SlideshowResponse>('/api/v1/photo/slideshow', params);
    }
}

export const photoApi = new PhotoApi();
export default photoApi;