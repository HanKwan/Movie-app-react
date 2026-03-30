import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getMovieDetails } from "../services/api"
import type { Movie } from "../types/Movie"

function MovieDetails() {
    const { id }= useParams()
    
    const [movie, setMovie] = useState<Movie>()
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!id) return
        
        const loadMovieDetails = async() => {
            
            setLoading(true)
            try {
                const clickedMovie = await getMovieDetails(id)
                setMovie(clickedMovie)
            } catch (err) {
                setError(err instanceof Error ? err.message : "Something went wrong")
            } finally {
                setLoading(false)
            }
        }

        loadMovieDetails()
    }, [id])

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    if (!movie) return <p>No movie found</p>;

    return (
        <p>hi</p>
    )
}

export default MovieDetails