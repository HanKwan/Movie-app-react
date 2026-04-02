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

    const loadPopularMovies = async() => {
        setIsLoading(true)
            try {
                const popularMovies = await getPopularMovies(page)
                setMovies(popularMovies.results)
                setTotalPage(popularMovies.total_pages)
                setError(null)
                
            } catch (err) {
                console.log(err)
                setError(err instanceof Error ? err.message : "Could not fetch movies")
            } finally {
                setIsLoading(false)
            }
    }

    useEffect(() => {
        loadPopularMovies()
    }, [])

    const handleSearch = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()

        if(!searchQuery.trim()) {
            loadPopularMovies()
            return      // preventing to continue load search 
        }
        
        setIsLoading(true)
        try {
            const searchedMovies = await getSearchedMovies(searchQuery, page)
            setMovies(searchedMovies)
            setError(null)
        } catch (err) {
            console.log(err)
            setError("Searched movie was not found...")
        } finally {
            setIsLoading(false)
        }
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