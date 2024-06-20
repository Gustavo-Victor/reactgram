import { useAuth } from "../../../hooks/useAuth";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOutUser, reset } from "../../../slices/authSlice";
import { NavLink, Link } from "react-router-dom";
import {
    BsSearch,
    BsHouseDoorFill,
    BsFillPersonFill,
    BsFillCameraFill,
    BsList,
    BsXLg
}
    from "react-icons/bs";
import "./style.css";


export default function Header() {
    const { authenticated } = useAuth();
    const { user } = useSelector(state => state.auth);
    const [query, setQuery] = useState("");
    const [menuActive, setMenuActive] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logOutUser());
        dispatch(reset());
        navigate("/login");
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (query) {
            navigate(`/search?q=${query}`);
            setQuery("");
        }
    }

    const handleToggleMenu = () => {
        setMenuActive(prevState => !prevState);
    }

    const handleDisableMenu = () => {
        setMenuActive(false);
    }


    return (
        <header id="main-header">
            <nav id="nav">
                <Link to="/">ReactGram</Link>
                <form action="#" id="search-form" onSubmit={handleSubmit}>
                    <BsSearch />
                    <input
                        type="search"
                        name="search"
                        id="search"
                        maxLength={50}
                        placeholder="Type something..."
                        value={query || ""}
                        onChange={e => setQuery(e.target.value)} />
                </form>
                <ul id="nav-list" className={menuActive ? "active" : ""}>
                    {authenticated ? (
                        <>
                            <li onClick={handleDisableMenu}>
                                <NavLink to="/">
                                    <BsHouseDoorFill />
                                </NavLink>
                            </li>
                            {user &&
                                <li onClick={handleDisableMenu}>
                                    <NavLink to={`/users/${user._id}`}>
                                        <BsFillCameraFill />
                                    </NavLink>
                                </li>
                            }
                            <li onClick={handleDisableMenu}>
                                <NavLink to="/profile">
                                    <BsFillPersonFill />
                                </NavLink>
                            </li>
                            <li onClick={handleDisableMenu}>
                                <span onClick={handleLogout}>Log Out</span>
                            </li>
                        </>
                    ) : (
                        <>
                            <li onClick={handleDisableMenu}>
                                <NavLink to="/login">Login</NavLink>
                            </li>
                            <li onClick={handleDisableMenu}>
                                <NavLink to="/register">Register</NavLink>
                            </li>
                        </>
                    )}
                </ul>
                <span className="icon" onClick={handleToggleMenu}>
                    {menuActive ? <BsXLg /> : <BsList />}
                </span>
            </nav>
        </header>
    )
}