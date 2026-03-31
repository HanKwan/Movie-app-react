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
        <div className="details-page">
            {/* Backdrop */}
            <div
                className="details-backdrop"
                style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`
                }}
            />

            <div className="details-content">
                {/* Poster */}
                <img
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    alt={movie.title}
                    className="details-poster"
                />

                {/* Info */}
                <div className="details-info">
                    <h1 className="details-title">{movie.title}</h1>

                    <div className="details-meta">
                        <span>⭐ {movie.vote_average}</span>
                        <span>{movie.release_date}</span>
                        <span>{movie.runtime} min</span>
                    </div>

                    {/* Genres */}
                    <div className="details-genres">
                        {movie.genres?.map((genre) => (
                        <span key={genre.id} className="genre">
                            {genre.name}
                        </span>
                        ))}
                    </div>

                    {/* Favorite button */}
                    <button className="fav-btn">
                        ❤️ Add to Favorites
                    </button>

                    {/* Overview */}
                    <p className="details-overview">
                        {movie.overview}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default MovieDetails