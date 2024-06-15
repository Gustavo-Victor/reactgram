import { api, requestConfig } from "../utils/config";


async function register(data) {
    const config = requestConfig("POST", data, null, null);

    try {
        const response = await fetch(`${api}/users/register`, config)
            .then(res => res.json())
            .catch(err => err);
        // const data = await response.json();
        // console.log(data);

        if(response && "token" in response || "_id" in response) {
            localStorage.setItem("user", JSON.stringify(response));
        }

        return response; 
    } catch (e) {
        console.log(e.message);
    }
}

async function login(data) {
    const config = requestConfig("POST", data, null, null); 

    try {
        const response = await fetch(`${api}/users/login`, config)
            .then(res => res.json())
            .catch(err => err);
        if(response && "token" in response) {
            localStorage.setItem("user", JSON.stringify(response)); 
        } 
        return response; 
    } catch(e) {
        console.log(e.message);
    }
}

async function logout() {
    localStorage.removeItem("user"); 
}

const authService = {
    register,
    login,
    logout,
}


export default authService; 