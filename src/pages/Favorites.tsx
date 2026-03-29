import MovieCard from "../components/MovieCard"
import { useFavorite } from "../contexts/FavoritesContext"
import "../css/FavoriteMovie.css"

function Favorites() {
    const {favorites} = useFavorite()
    
    if (favorites.length > 0) {    // if(fav)=[] empty array return true
        return (
            <div className="fav-page">
                <h2>Your Favorite Movies</h2>
                <div className="movie-container">
                    {favorites.map((favMovie) => (
                        <MovieCard movie={favMovie} key={favMovie.id}/>
                    ))}
                </div>
            </div>
        )
    }

    return(
       <div className="fav-page">
            <div className="empty-fav">
                <h2>No Favorite Movies Yet</h2>
                <p>Start adding some movies to your favorites ❤️</p>
            </div>
        </div>
    )
}

export default Favorites