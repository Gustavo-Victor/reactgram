import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { reset, registerUser } from "../../../../slices/authSlice";
import { useSelector, useDispatch } from "react-redux";
import "../Auth.css"; 


export default function Register() {
    const initialState = {
        name: "",
        email: "",
        password: "",
        password_confirmation: ""
    }
    const [user, setUser] = useState(initialState || {}); 

    const dispatch = useDispatch(); 
    const { loading, error, user: authUser, success } = useSelector(state => state.auth); 


    const handleChangeUser = (e) => {
        setUser(prevUser => {
            return {...prevUser, [e.target.name]: e.target.value}
        }); 
    }

    const handleSubmit = (e) => {
        e.preventDefault(); 
        console.log(user); 
        dispatch(registerUser(user)); 
        //setUser(initialState); 
    }

    useEffect(() => {
        dispatch(reset()); 
    }, [dispatch]); 

    return (
        <div id="register">
            <h2>ReactGram</h2>
            <p className="subtitle">Register to show your friends{"'"} photos</p>
            <form id="register-form" onSubmit={handleSubmit}>
                <input type="text" name="name" id="name" value={user.name || ""} onChange={handleChangeUser} placeholder="Enter your name..." />
                <input type="email" name="email" id="email" value={user.email || ""} onChange={handleChangeUser} placeholder="Enter your email..." />
                <input type="password" name="password" id="password" value={user.password || ""} onChange={handleChangeUser} placeholder="Enter your password..." />
                <input type="password" name="password_confirmation" value={user.password_confirmation || ""} onChange={handleChangeUser} id="password_confirmation" placeholder="Confirm your password..." />
                <button type="submit" id="register-form-btn">Register</button>
            </form>
            <p>Already have an account? <Link to="/login">Click here</Link></p>
        </div>
    )
}