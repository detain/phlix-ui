export interface LibraryQuery {
    search?: string;
    genres?: string[];
    yearFrom?: number;
    yearTo?: number;
    ratings?: ('G' | 'PG' | 'PG-13' | 'R' | 'NC-17' | 'X' | 'UNRATED')[];
    actors?: string[];
    sort?: 'name' | 'year' | 'rating' | 'date_added' | 'runtime';
    order?: 'asc' | 'desc';
    limit?: number;
    offset?: number;
}

export interface LibraryQueryParams extends Omit<LibraryQuery, 'ratings' | 'sort' | 'order'> {
    search?: string;
    genres?: string[];
    yearFrom?: number;
    yearTo?: number;
    ratings?: string[];
    actors?: string[];
    sort?: string;
    order?: string;
    limit?: number;
    offset?: number;
}
