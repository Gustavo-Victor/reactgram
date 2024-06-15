import { NavLink, Link } from "react-router-dom";
import {
    BsSearch,
    BsHouseDoorFill,
    BsFillPersonFill,
    BsFillCameraFill
}
    from "react-icons/bs";
import "./style.css";


export default function Header() {
    return (
        <header id="main-header">
            <nav id="nav">
                <Link to="/">ReactGram</Link>
                <form action="#" id="search-form">
                    <BsSearch />
                    <input
                        type="search"
                        name="search"
                        id="search"
                        maxLength={50}
                        placeholder="Type something..." />
                </form>
                <ul id="nav-list">
                    <li>
                        <NavLink to="/"><BsHouseDoorFill /></NavLink>
                    </li>
                    <li>
                        <NavLink to="/login">Login</NavLink>
                    </li>
                    <li>
                        <NavLink to="/register">Register</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    )
}