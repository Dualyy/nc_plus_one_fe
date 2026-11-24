import { NavLink } from "react-router";
import './NavBar.css'



export default function NavBar() {
    return (
        <header className="navbar" aria-label="Main navigation">
            <div className="navbar__inner">
                <NavLink className="navbar__logo" to="/" aria-label="+one Home">+one</NavLink>
                <nav className="navbar__nav">
                    <ul className="navbar__links">
                        <li>
                            <NavLink className="navbar__link" to="/events" aria-label="Browse events">Browse</NavLink>
                        </li>
                        <li>
                            <NavLink className="navbar__link" to="/user/me/events" aria-label="my events">My events</NavLink>
                        </li>
                        <li>
                            <NavLink className="navbar__link" to="/organiser" aria-label="my events">Organiser Dashboard</NavLink>
                        </li>
                    </ul>
                </nav>
                <div className="navbar__actions">
                    <NavLink className="navbar__button" id="create-event" to="/events/create" aria-label="create events">Create Event</NavLink>
                    <a>Welcome back, User 1</a>
                </div>
            </div>
        </header >
    )
}