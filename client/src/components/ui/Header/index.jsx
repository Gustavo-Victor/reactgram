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
    BsFillCameraFill
}
    from "react-icons/bs";
import "./style.css";


export default function Header() {
    const { authenticated } = useAuth();
    const { user } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate(); 

    const handleLogout = () => {
        dispatch(logOutUser()); 
        dispatch(reset()); 
        navigate("/login"); 
    }


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
                    {authenticated ? (
                        <>
                            <li>
                                <NavLink to="/">
                                    <BsHouseDoorFill />
                                </NavLink>
                            </li>
                            {user && 
                                <li>
                                    <NavLink to={`/users/${user._id}`}>
                                        <BsFillCameraFill />
                                    </NavLink>
                                </li>
                            }
                            <li>
                                <NavLink to="/profile">
                                    <BsFillPersonFill />
                                </NavLink>
                            </li>
                            <li>
                                <span onClick={handleLogout}>Log Out</span>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <NavLink to="/login">Login</NavLink>
                            </li>
                            <li>
                                <NavLink to="/register">Register</NavLink>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
        </header>
    )
}