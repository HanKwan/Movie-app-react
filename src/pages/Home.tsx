import React, { useEffect, useState } from "react"
import MovieCard from "../components/MovieCard"
import { getPopularMovies, getSearchedMovies } from "../services/api"
import type { Movie } from "../types/Movie"
import "../css/Home.css"

function Home() {
    
    const [movies, setMovies] = useState<Movie[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [searchQuery, setSearchQuery] = useState("")
    const [page, setPage] = useState(1)
    const [totalPage, setTotalPage] = useState(0)

    useEffect(() => {
        const fetchMovies = async() => {
            
            setIsLoading(true)
            try {
                let data;
    
                if(searchQuery.trim()) {
                    // get search is trimmed and has value, do search
                    data = await getSearchedMovies(searchQuery, page)
                
                } else {
                    // when !searchQuery.trim()
                    data = await getPopularMovies(page)
                    
                }

                setMovies(data.results)
                setTotalPage(data.total_pages)
                setError(null)
                
            } catch (err) {
                console.log(err);
                setError(err instanceof Error ? err.message : "Counld not fetch movies")
            } finally {
                setIsLoading(false)
            }

        }

        fetchMovies()
    }, [])

    const handleSearch = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()

    }

    return(
        <div className="home-page">
            <form onSubmit={handleSearch} className="search">
                <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="search-box" placeholder="Search movies...."/>
                <button type="submit">Search</button>
            </form>

            {error ? <p>{error}</p>: ""}

            <div className="movie-container">
                {isLoading ? (
                    <p>Page is loading...</p>
                ) : (
                    movies.map((movie) => (<MovieCard movie={movie} key={movie.id}/>))
                )}
            </div>
            
        </div>
    )
}

export default Home