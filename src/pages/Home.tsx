import React, { useEffect, useState } from "react"
import MovieCard from "../components/MovieCard"
import { getPopularMovies } from "../services/api"
import type { Movie } from "../types/Movie"

function Home() {
    
    const [movies, setMovies] = useState<Movie[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState("")
    const [searchQuery, setSearchQuery] = useState("")

    useEffect(() => {
        const loadPopularMovies = async() => {
            try {
                const popularMovies = await getPopularMovies()
                setMovies(popularMovies)
                
            } catch (err) {
                console.log(err)
                setError("Could not fetch movies")
            } finally {
                setIsLoading(false)
            }
        }

        loadPopularMovies()
    }, [])

    const handleSearch = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()
        
        alert(searchQuery)
    }

    return(
        <div className="home-page">
            <form onSubmit={handleSearch} className="search">
                <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="search-box" placeholder="Search movies...."/>
                <button type="submit">Search</button>
            </form>

            {error ? <p>{error}</p>: ""}

            {isLoading ? (
                <p>Page is loading...</p>
            ) : (
                movies.map((movie) => (<MovieCard movie={movie} key={movie.id}/>))
            )}
            
        </div>
    )
}

export default Home