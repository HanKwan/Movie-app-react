import MovieCard from "../components/MovieCard"

function Home() {
    
    const movies = [
        {id: 1, title: "Ghost Rider"},
        {id: 2, title: "Harry Potter"}
    ]

    return(
        <div className="home-page">
            {movies.map((movie) => (
                <MovieCard movie={movie} key={movie.id}/>
            ))}
        </div>
    )
}

export default Home