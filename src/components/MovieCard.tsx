interface Movie {
    id: number;
    title: string;
}

interface MovieCardProps {
    movie: Movie;
}

function MovieCard({ movie }: MovieCardProps) {
    

    return(
        <div className="movie-card">
            <div>{movie.title}</div>
        </div>
    )
}

export default MovieCard