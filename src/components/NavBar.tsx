import { Link, NavLink } from "react-router";
import './NavBar.css'
import useUser from "../hooks/useUser";



export default function NavBar() {

    const { userState } = useUser();

    

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
                            <NavLink className="navbar__link" to="/user/me/events" aria-label="my RSVPs">my RSVPs</NavLink>
                        </li>
                        <li>
                            <NavLink className="navbar__link" to={userState.status==="success" ? `/organisers/${userState.user.id}/stats` : "/login"} aria-label="my stats">my stats</NavLink>
                        </li>
                    </ul>
                </nav>
                <div className="navbar__actions">
                    {userState.status === "success" ?
                        <NavLink className="navbar__button" id="create-event" to="/events/create" aria-label="create events">Create Event</NavLink> :
                        <NavLink className="navbar__button" id="create-event" to="/register" aria-label="create events">Create Event</NavLink>}
                    {userState.status === "success" ? <p>Welcome back, <span><Link to="/login">{userState.user.name}</Link></span></p> : <>
                     <Link to="/register">Sign up</Link>
                     <Link to="/login">Log in</Link>
                     </>
                     }
                </div>
            </div>
        </header >
    )
}