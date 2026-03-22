import MovieCard from "../components/MovieCard"

function Home() {
    
    const movies = [
        {id: 1, title: "Ghost Rider", release_date: "1998"},
        {id: 2, title: "Harry Potter", release_date: "1980"}
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