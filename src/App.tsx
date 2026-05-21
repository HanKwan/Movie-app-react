import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Favorites from "./pages/Favorites"
import Navbar from "./components/Navbar"
import { FavoriteProvider } from "./contexts/FavoritesContext"
import MovieDetails from "./pages/MovieDetails"
import "./css/App.css"
import { useState } from "react"

function App() {
  
  const [searchQuery, setSearchQuery] = useState("")
  const [inputSearch, setInputSearch] = useState("")
  const [page, setPage] = useState(1)

  const handleHome = () => {  // handleHome in app because want navbar
    setSearchQuery("")        // to clean search query and input
    setInputSearch("")
    setPage(1)
  }

  return (
    <FavoriteProvider>
      <main>
        <Navbar onHomeClick={handleHome}/>
        <Routes>
          <Route path="/" 
                element={<Home searchQuery={searchQuery}
                                setSearchQuery={setSearchQuery}
                                inputSearch={inputSearch}
                                setInputSearch={setInputSearch}
                                page={page}
                                setPage={setPage}/>}/>

          <Route path="/favorites" element={<Favorites />}/>
          <Route path="/movie/:id" element={<MovieDetails />}/>
        </Routes>
      </main>
    </FavoriteProvider>
  )
}

export default App