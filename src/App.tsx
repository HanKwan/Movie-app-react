import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Favorites from "./pages/Favorites"
import Navbar from "./components/Navbar"
import { FavoriteProvider } from "./contexts/FavoritesContext"

function App() {



  return (
    <FavoriteProvider>
      <main>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/favorites" element={<Favorites />}/>
        </Routes>
      </main>
    </FavoriteProvider>
  )
}

export default App