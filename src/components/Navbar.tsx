import { Link } from "react-router-dom";
import "../css/Navbar.css"

function Navbar() {
    return(
        <nav className="nav-wrapper">
            <div className="nav-bar">
            <div className="nav-brand">
                <Link to="/">Movie app</Link>
            </div>
            <div className="nav-links">
                <Link to="/">Home</Link>
                <Link to="/favorites">Favorites</Link>
            </div>
            </div>
            </nav>
    )
}

export default Navbar