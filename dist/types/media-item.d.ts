export type MediaType = 'movie' | 'series' | 'episode' | 'audio' | 'image';
export interface MediaItem {
    id: string;
    name: string;
    type: MediaType;
    path?: string;
    poster_url: string | null;
    genres: string[];
    year: number | null;
    rating: 'G' | 'PG' | 'PG-13' | 'R' | 'NC-17' | 'X' | 'UNRATED' | null;
    runtime: number | null;
    overview: string | null;
    actors: string[];
    director: string | null;
    created_at: string | null;
    updated_at: string | null;
}
