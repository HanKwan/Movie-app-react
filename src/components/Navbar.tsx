import { Link } from "react-router-dom";
import "../css/Navbar.css"

type Props = {
    onHomeClick: () => void
}

function Navbar({ onHomeClick } : Props) {
    return(
        <nav className="nav-wrapper">
            <div className="nav-bar">
                <div className="nav-brand">
                    <Link to="/" onClick={onHomeClick}>Movie app</Link>
                </div>
                <div className="nav-links">
                    <Link to="/" onClick={onHomeClick}>Home</Link>
                    <Link to="/favorites">Favorites</Link>
                </div>
            </div>
        </nav>
    )
}

export default Navbar