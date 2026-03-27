import React, { createContext, useContext, useEffect, useState } from "react";
import type { Movie } from "../types/Movie";

interface FavContextType {
    favorites: Movie[];
    addFavorite: (movie: Movie) => void;
    removeFavorite: (moiveId: number) => void;
    isFavorite: (movieId: number) => boolean;
}

const FavoriteContext = createContext<FavContextType | null>(null)

export const useFavorite = () => useContext(FavoriteContext)

export const FavoriteProvider = ({children}: {children: React.ReactNode}) => {
    const [favorites, setFavorites] = useState<Movie[]>([])

    useEffect(() => {
        const storedFav = localStorage.getItem("favorites")
        if (storedFav) {
            setFavorites(JSON.parse(storedFav))
        }
    }, [])

    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites))
    }, [favorites])

    const addFavorite = (movie: Movie) => {
        setFavorites((prev) => [...prev, movie])
    }

    const removeFavorite = (movieId: number) => {
        setFavorites((prev) => prev.filter((m) => m.id !== movieId))
    }

    const isFavorite = (movieId: number) => {
        return favorites.some((movie) => movie.id === movieId )
    }

    return (
        <FavoriteContext.Provider value={{favorites, addFavorite, removeFavorite, isFavorite}}>
            {children}
        </FavoriteContext.Provider>
    )
}
