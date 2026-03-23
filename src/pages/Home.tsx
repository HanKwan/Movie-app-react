import { useEffect, useState } from "react"
import MovieCard from "../components/MovieCard"
import { getPopularMovies } from "../services/api"
import type { Movie } from "../types/Movie"

function Home() {
    
    const [movies, setMovies] = useState<Movie[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState("")

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

    return(
        <div className="home-page">
            {movies.map((movie) => (
                <MovieCard movie={movie} key={movie.id}/>
            ))}
        </div>
    )
}

export default Home