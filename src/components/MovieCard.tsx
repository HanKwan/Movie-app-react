import { useFavorite } from "../contexts/FavoritesContext";
import "../css/MovieCard.css"
import type { Movie } from "../types/Movie";

interface MovieCardProps {
    movie: Movie;
}

function MovieCard({ movie }: MovieCardProps) {
    const {addFavorite, removeFavorite, isFavorite} = useFavorite()

    const handleFavorite = () => {
        if (isFavorite(movie.id)) {
            removeFavorite(movie.id)
        } else {
            addFavorite(movie)
        }
    }

    return(
        <div className="movie-card">
            <div className="movie-poster">
                <img
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    alt={movie.title}
                    className="movie-img"
                />
                <button className="fav-btn" onClick={handleFavorite}>
                    {isFavorite(movie.id) ? "❤️" : "🤍"}
                </button>
            </div>

            <div className="movie-info">
                <p className="movie-title">{movie.title}</p>
                <p className="release-date">{movie.release_date}</p>
            </div>
        </div>
    )
}

export default MovieCard