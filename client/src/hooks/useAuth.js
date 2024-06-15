import { useState, useEffect } from "react";
import { useSelector } from "react-redux";


export function useAuth() {
    // const [user] = useState(useSelector(state => state.auth.user)); 
    const { user } = useSelector(state => state.auth); 
    const [authenticated, setAuthenticated] = useState(false); 
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        if(user) {
            setAuthenticated(true); 
        } else {
            setAuthenticated(false); 
        }
        setLoading(false)
    }, [user]); 

    return { authenticated, loading }; 
}