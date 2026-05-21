import React, { use, useEffect, useState } from "react"
import MovieCard from "../components/MovieCard"
import { getPopularMovies, getSearchedMovies } from "../services/api"
import type { Movie } from "../types/Movie"
import "../css/Home.css"

type Props = {
    searchQuery: string
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>
    page: number
    setPage: React.Dispatch<React.SetStateAction<number>>
}

function Home({ searchQuery, setSearchQuery, page, setPage } : Props) {
    const [movies, setMovies] = useState<Movie[]>([])
    const [inputSearch, setInputSearch] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [totalPages, setTotalPage] = useState(0)


    useEffect(() => {
        const fetchMovies = async() => {
            
            setIsLoading(true)
            try {
                let data;
    
                if((searchQuery).trim()) {
                    // get search is trimmed and has value, do search
                    data = await getSearchedMovies(searchQuery, page)
                
                } else {
                    // when !searchQuery.trim()
                    data = await getPopularMovies(page)
                    
                }

                console.log(data.results);
                console.log(data.total_pages);
                

                setMovies(data?.results ?? [])          // if data exists, get results, otherwise return undefined.
                setTotalPage(data?.total_pages ?? 0)    // ?? if null or underfined, []
                setError(null)
                
            } catch (err) {
                console.log(err);
                setError(err instanceof Error ? err.message : "Counld not fetch movies")
            } finally {
                setIsLoading(false)
            }

        }

        fetchMovies()
    }, [searchQuery, page])

    const handleSearch = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()
        setSearchQuery(inputSearch)
        setPage(1)  // reset page back to 1 when searched
    }

    return(
        <div className="home-page">
            <form onSubmit={handleSearch} className="search">
                <input type="text" value={inputSearch} onChange={(e) => setInputSearch(e.target.value)} className="search-box" placeholder="Search movies...."/>
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
            
            <div className="pagination">
                <button onClick={() => setPage(page - 1)} disabled={page === 1}>
                    Prev
                </button>
                <span>Page {page} of {totalPages}</span>
                <button onClick={() => setPage(page + 1)} disabled={page === totalPages}>
                    Next
                </button>
            </div>
        </div>
    )
}

export default Home