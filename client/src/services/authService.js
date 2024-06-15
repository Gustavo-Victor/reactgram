import { api, requestConfig } from "../utils/config";


async function register(data) {
    const config = requestConfig("POST", data, null, null);

    try {
        const response = await fetch(`${api}/users/register`, config)
            .then(res => res.json())
            .catch(err => err);
        // const data = await response.json();
        // console.log(data);

        if (response) {
            localStorage.setItem("user", JSON.stringify(response));
        }

        return response; 
    } catch (e) {
        console.log(e.message);
    }
}

async function login() {

}

const authService = {
    register,
    login,
}


export default authService; 