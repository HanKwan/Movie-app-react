const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3"

export const getPopularMovies = async(page: number) => {
    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`)
    const data = await response.json()

    return data
}

export const getSearchedMovies = async(searchQuery: string, page: number) => {
    const res = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${searchQuery}&page=${page}`)
    const data = await res.json()
    return data.results
}

export const getMovieDetails = async(id: string) => {
    const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`)
    const data = await res.json()
    return data     // data.results return list of movies, data return one movie
}