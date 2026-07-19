/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */
import type { Photo, PhotoAlbum, PhotoDetail, SlideshowResponse } from '../types/photo';
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
    pagination: {
        limit: number;
        offset: number;
        count: number;
    };
}
declare class PhotoApi {
    private client;
    /**
     * GET /api/v1/photo/albums?library_id= → { albums: PhotoAlbum[] }
     * Lists all photo albums (date-grouped) for a library.
     */
    getAlbums(apiBase: string, libraryId: string): Promise<PhotoAlbum[]>;
    /**
     * GET /api/v1/photo/albums/{id}?library_id= → { album: PhotoAlbum }
     * Gets a specific album with its photos. The album `id` is md5 of the date.
     */
    getAlbum(apiBase: string, albumId: string, libraryId: string): Promise<PhotoAlbum>;
    /**
     * GET /api/v1/photo/photos?library_id=&limit=&offset= → { photos, pagination }
     * Lists all photos in a library with pagination.
     */
    getPhotos(apiBase: string, libraryId: string, opts?: {
        limit?: number;
        offset?: number;
    }): Promise<PhotosResponse>;
    /**
     * GET /api/v1/photo/photos/{id} → { photo: PhotoDetail }
     * Gets a single photo with full EXIF metadata.
     */
    getPhoto(apiBase: string, id: string): Promise<PhotoDetail>;
    /**
     * GET /api/v1/photo/slideshow?library_id=&album_id=&interval= → { slideshow, interval }
     * Gets slideshow data for a library, optionally scoped to an album.
     */
    getSlideshow(apiBase: string, libraryId: string, opts?: {
        albumId?: string;
        interval?: number;
    }): Promise<SlideshowResponse>;
}
export declare const photoApi: PhotoApi;
export default photoApi;
