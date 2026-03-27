import React, { createContext, useContext, useEffect, useState } from "react";
import type { Movie } from "../types/Movie";

interface FavContextType {
    favorites: Movie[];
    addFavorite: (movie: Movie) => void;
    removeFavorite: (moiveId: number) => void;
    isFavorite: (movieId: number) => boolean;
}

const FavoriteContext = createContext<FavContextType | null>(null)

export const useFavorite = () => {
    const context = useContext(FavoriteContext)

    // preventing ts from thinking useFavrorite will return null
    if (!context) throw new Error("useFavorite must be inside FavoriteProvider")
    return context 
}

export const FavoriteProvider = ({children}: {children: React.ReactNode}) => {
    const [favorites, setFavorites] = useState<Movie[]>([])

    // getting fav movies from localstorage if have
    useEffect(() => {
        const storedFav = localStorage.getItem("favorites")
        if (storedFav) {
            setFavorites(JSON.parse(storedFav))
        }
    }, [])

    // adding fav to localStorage
    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites))
    }, [favorites])

    const addFavorite = (movie: Movie) => {
        setFavorites((prev) => [...prev, movie])
    }

    const removeFavorite = (movieId: number) => {
        setFavorites((prev) => prev.filter((m) => m.id !== movieId))
    }

    // if the array in the favorites is equal to the same id, return true
    const isFavorite = (movieId: number) => {
        return favorites.some((movie) => movie.id === movieId )
    }

    return (
        <FavoriteContext.Provider value={{favorites, addFavorite, removeFavorite, isFavorite}}>
            {children}
        </FavoriteContext.Provider>
    )
}
