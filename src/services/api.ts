const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3"

export const getPopularMovies = async(page: number) => {
    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`)
    const data = await response.json()

    return {
        results: data.results ?? [],            // returing like this instead of "return data"
        total_pages: data.total_pages ?? 0,     // help prevent if it's return undefined
        page: data.page ?? 1                    // give consistent behavior
    }
}

export const getSearchedMovies = async(searchQuery: string, page: number) => {
    const res = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${searchQuery}&page=${page}`)
    const data = await res.json()

    return {
        results: data.results ?? [],
        total_pages: data.total_pages ?? 0,
        page: data.page ?? 1
    }
}

export const getMovieDetails = async(id: string) => {
    const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`)
    const data = await res.json()

    return data     
}