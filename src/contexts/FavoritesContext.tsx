import React, { Children, createContext, useContext, useEffect, useState } from "react";
import type { Movie } from "../types/Movie";

interface FavContextType {
    favorites: Movie[];
    addFavortie: (movieId: number) => void;
    removeFavorite: (moiveID: number) => void;
    isFavorite: (movieId: number) => boolean;
}

const FavoriteContext = createContext<FavContextType | null>(null)

export const UseFavorite = () => useContext(FavoriteContext)

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
}
