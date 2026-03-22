import "../css/MovieCard.css"

interface Movie {
    id: number;
    title: string;
    url?: string;
    release_date: string;
}

interface MovieCardProps {
    movie: Movie;
}

function MovieCard({ movie }: MovieCardProps) {
    

    return(
        <div className="movie-card">
            <img src={movie.url} alt={movie.title} className="movie-img"/>
            <div className="movie-info">
                <p className="movie-title">Movie title: {movie.title}</p>
                <p className="release-date">Release date: {movie.release_date}</p>
            </div>
        </div>
    )
}

export default MovieCard