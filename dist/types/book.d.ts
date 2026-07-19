/**
 * Book-related TypeScript types for phlix-ui.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */
/**
 * Book reading progress tracking.
 */
export interface BookProgress {
    book_id: string;
    user_id: string;
    position_ms: number;
    current_page: number;
    total_pages: number;
    percent_complete: number;
    last_read_at: number | null;
}
/**
 * Chapter or spine item for book navigation.
 */
export interface BookChapter {
    index: number;
    title: string;
    start_ms: number;
    end_ms: number;
    href: string;
}
/**
 * Book metadata extracted from media_items.metadata_json.
 */
export interface BookMetadata {
    cover_path?: string;
    author?: string;
    publisher?: string;
    language?: string;
    pub_date?: string;
    page_count?: number;
    isbn?: string;
    description?: string;
    spine?: BookChapter[];
    chapters?: BookChapter[];
    pages?: number;
    [key: string]: unknown;
}
/**
 * Book list item (from GET /api/v1/books).
 */
export interface BookListItem {
    id: string;
    name: string;
    type: 'book';
    path?: string;
    metadata: BookMetadata;
    cover_url?: string | null;
    read_url?: string | null;
    download_url?: string | null;
}
/**
 * Full book detail (from GET /api/v1/books/{id} or /api/v1/books/{id}/read).
 */
export interface BookDetail extends BookListItem {
    current_page?: number;
    total_pages?: number;
    chapters?: BookChapter[];
    progress?: BookProgress | null;
    message?: string;
}
/**
 * Response envelope for book list endpoint.
 */
export interface BooksResponse {
    books: BookListItem[];
    limit: number;
    offset: number;
}
/**
 * Response envelope for single book detail.
 */
export interface BookResponse {
    book: BookDetail;
}
/**
 * Response envelope for book reader endpoint.
 */
export interface BookReaderResponse extends BookResponse {
    metadata: BookMetadata;
    current_page: number;
    total_pages: number;
    chapters: BookChapter[];
    progress: BookProgress | null;
    message: string;
}
/**
 * Response envelope for book progress endpoint.
 */
export interface BookProgressResponse {
    progress: BookProgress;
}
/**
 * Request body for saving book progress.
 */
export interface SaveBookProgressInput {
    position_ms: number;
    current_page: number;
    total_pages: number;
    percent_complete: number;
}
