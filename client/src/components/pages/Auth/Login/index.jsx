import { Link } from "react-router-dom"; 
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { reset, logInUser } from "../../../../slices/authSlice";
import Message from "../../../ui/Message"; 


export default function Login() {
    const initialUser = {
        email: "",
        password: "", 
    }
    const [user, setUser] = useState(initialUser || {}); 
    const dispatch = useDispatch(); 
    const { loading, error } = useSelector(state => state.auth);     

    const handleChangeUser = (e) => {
        setUser(prevState => {
            return {...prevState, [e.target.name]: e.target.value}
        }); 
    }

    const handleSubmit = (e) => {
        e.preventDefault(); 
        console.log(user); 
        dispatch(logInUser(user)); 
        //setUser(initialUser);
    }

    useEffect(() => {
        dispatch(reset());
    }, [dispatch]); 

    return (
        <div id="login">
            <h2>ReactGram</h2>
            <p className="subtitle">Log in to see what{"'"} new</p>
            <form id="login-form" onSubmit={handleSubmit}>
                <input 
                    type="email"
                    name="email"
                    id="email"
                    value={user.email || ""}
                    placeholder="Email"
                    onChange={handleChangeUser} />
                <input 
                    type="password" 
                    name="password" 
                    id="password" 
                    value={user.password || ""} 
                    placeholder="Password"
                    onChange={handleChangeUser} />
                <button 
                    disabled={loading}
                    type="submit"
                    id="login-form-btn"
                    >{loading ? "Loading..." : "Enter"}
                </button>
                {error && <Message text={error} type="error" />}
            </form>
            <p>Don{"'"}t have an account? <Link to="/register">Click here</Link></p>
        </div>
    )
}