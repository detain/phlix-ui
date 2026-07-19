/**
 * Audiobook-related TypeScript types for phlix-ui.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */
/**
 * Audiobook chapter for navigation.
 */
export interface AudiobookChapter {
    index: number;
    title: string;
    start_ms: number;
    end_ms: number;
    duration_ms: number;
}
/**
 * Audiobook metadata extracted from media_items.metadata_json.
 */
export interface AudiobookMetadata {
    cover_path?: string;
    author?: string;
    narrator?: string;
    series?: string;
    series_position?: number;
    language?: string;
    duration_ms?: number;
    description?: string;
    chapters?: AudiobookChapter[];
    [key: string]: unknown;
}
/**
 * Audiobook list item (from GET /api/v1/audiobooks).
 */
export interface AudiobookListItem {
    id: string;
    name: string;
    type: 'audiobook';
    path?: string;
    metadata: AudiobookMetadata;
    cover_url?: string | null;
    stream_url?: string | null;
    read_url?: string | null;
}
/**
 * Full audiobook detail (from GET /api/v1/audiobooks/{id} or /api/v1/audiobooks/{id}/read).
 */
export interface AudiobookDetail extends AudiobookListItem {
    chapters?: AudiobookChapter[];
    progress?: AudiobookProgress | null;
    message?: string;
}
/**
 * Audiobook reading progress tracking.
 */
export interface AudiobookProgress {
    audiobook_id: string;
    user_id: string;
    position_ms: number;
    current_chapter_index: number;
    completed_chapters: number[];
    percent_complete: number;
    last_read_at: number | null;
}
/**
 * Response envelope for audiobook list endpoint.
 */
export interface AudiobooksResponse {
    audiobooks: AudiobookListItem[];
    limit: number;
    offset: number;
}
/**
 * Response envelope for single audiobook detail.
 */
export interface AudiobookResponse {
    audiobook: AudiobookDetail;
}
/**
 * Response envelope for audiobook reader endpoint.
 */
export interface AudiobookReaderResponse extends AudiobookResponse {
    metadata: AudiobookMetadata;
    progress: AudiobookProgress | null;
    message: string;
}
/**
 * Response envelope for audiobook progress endpoint.
 */
export interface AudiobookProgressResponse {
    progress: AudiobookProgress;
}
/**
 * Request body for saving audiobook progress.
 */
export interface SaveAudiobookProgressInput {
    position_ms: number;
    current_chapter_index: number;
    completed_chapters: number[];
    percent_complete: number;
}
