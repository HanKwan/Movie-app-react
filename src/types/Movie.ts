export interface Movie {
    id: number;
    title: string;
    poster_path: string;
    release_date: string;
    backdrop_path: string;
    overview: string;
    vote_average: number;
    genres: Genre[];
    runtime: number;
}

export interface Genre {
    id: number;
    name: string;
}

export interface MoviesResponse {
    results: Movie[];
    total_pages: number;
    page: number;
}