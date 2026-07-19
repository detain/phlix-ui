/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

/**
 * Photo domain types. Field names are the server payload verbatim (snake_case)
 * from PhotoController — do NOT camelCase these.
 *
 * Image display: `thumbnail_url` / `full_url` (and slideshow `url`) are SIGNED
 * URLs (token embedded). Use them directly in an <img> src — no Bearer header,
 * no hand-built URLs. These URLs can expire, so handle token expiration gracefully
 * by re-fetching the parent album/photo data to get fresh URLs.
 */

/**
 * Parsed EXIF for a photo (snake_case, server-verbatim). Numeric/string fields
 * may be absent or null on photos lacking metadata.
 */
export interface PhotoExif {
    camera_make: string | null;
    camera_model: string | null;
    lens: string | null;
    aperture: string | null;
    iso: number | null;
    shutter_speed: string | null;
    focal_length: string | null;
    width: number | null;
    height: number | null;
    orientation: number | null;
    orientation_name: string;
    date_taken_unix: number | null;
    date_taken_formatted: string;
    date_taken_year: string;
    date_taken_month: string;
    gps_lat: number | null;
    gps_lng: number | null;
    gps_alt: number | null;
    gps_display: string;
}

/**
 * A photo as returned inside album/list payloads (raw media-item row + parsed
 * `metadata` EXIF + SIGNED `thumbnail_url`/`full_url`).
 */
export interface Photo {
    id: string;
    name: string;
    path: string;
    type?: string;
    library_id?: string;
    metadata?: Partial<PhotoExif> & Record<string, unknown>;
    thumbnail_url: string;
    full_url: string;
}

/**
 * Full single-photo detail (`GET /photo/photos/{id}`). `metadata` === `exif`.
 */
export interface PhotoDetail {
    id: string;
    name: string;
    path: string;
    metadata: PhotoExif;
    exif: PhotoExif;
    thumbnail_url: string;
    full_url: string;
}

/**
 * A date-bucketed album. `id` is md5(date); `date` is "YYYY-MM-DD" or "Unknown".
 * `cover_photo` is present on the albums LIST but omitted by `getAlbum`.
 */
export interface PhotoAlbum {
    id: string;
    date: string;
    photo_count: number;
    cover_photo?: Photo;
    photos: Photo[];
}

/** One slideshow frame (`GET /photo/slideshow`). `url` is the SIGNED full image. */
export interface SlideshowItem {
    id: string;
    url: string;
    thumbnail_url: string;
    caption: string;
    interval: number;
}

/** Whole envelope returned by `GET /photo/slideshow`. */
export interface SlideshowResponse {
    slideshow: SlideshowItem[];
    interval: number;
}

/**
 * Human-readable album title: the raw "Unknown" date bucket becomes "Undated",
 * otherwise the date string is returned verbatim.
 */
export const albumTitle = (album: PhotoAlbum): string =>
    album.date === 'Unknown' || album.date.trim() === ''
        ? 'Undated'
        : album.date;

/**
 * Build an array of human-readable EXIF summary lines from a (partial) EXIF
 * object, skipping null/empty values. Lines (in order): camera "make model",
 * lens, dimensions "W×H", aperture, ISO, shutter speed, focal length, date,
 * GPS display. Pure; never throws on missing fields.
 */
export function formatExifSummary(exif: Partial<PhotoExif>): string[] {
    const lines: string[] = [];

    const camera = [exif.camera_make, exif.camera_model]
        .filter((v): v is string => typeof v === 'string' && v.trim() !== '')
        .join(' ')
        .trim();
    if (camera !== '') {
        lines.push(camera);
    }

    if (typeof exif.lens === 'string' && exif.lens.trim() !== '') {
        lines.push(exif.lens);
    }

    if (
        typeof exif.width === 'number' &&
        typeof exif.height === 'number' &&
        exif.width > 0 &&
        exif.height > 0
    ) {
        lines.push(`${exif.width}×${exif.height}`);
    }

    if (typeof exif.aperture === 'string' && exif.aperture.trim() !== '') {
        lines.push(exif.aperture);
    }

    if (typeof exif.iso === 'number' && Number.isFinite(exif.iso)) {
        lines.push(`ISO ${exif.iso}`);
    }

    if (
        typeof exif.shutter_speed === 'string' &&
        exif.shutter_speed.trim() !== ''
    ) {
        lines.push(exif.shutter_speed);
    }

    if (
        typeof exif.focal_length === 'string' &&
        exif.focal_length.trim() !== ''
    ) {
        lines.push(exif.focal_length);
    }

    if (
        typeof exif.date_taken_formatted === 'string' &&
        exif.date_taken_formatted.trim() !== ''
    ) {
        lines.push(exif.date_taken_formatted);
    }

    if (typeof exif.gps_display === 'string' && exif.gps_display.trim() !== '') {
        lines.push(exif.gps_display);
    }

    return lines;
}