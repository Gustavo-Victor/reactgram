import { api, requestConfig } from "../utils/config"; 


export async function readProfile(data, token) {
    const config = requestConfig("GET", data, token, null); 

    try {
        const response = await fetch(`${api}/users/profile`, config)
            .then(res => res.json())
            .catch(err => err); 
        return response; 
    } catch(e) {
        console.log(e.message);
    }
}

export async function readProfileDetails(id) {
    const config = requestConfig("GET"); 
    
    try {
        const response = await fetch(`${api}/users/${id}`, config)
            .then(res => res.json()) 
            .catch(err => err); 
        return response; 
    } catch(e) {
        console.log(e.message);
    }
}

export async function updateProfile(data, token) {
    const config = requestConfig("PUT", data, token, true); 

    try {
        const response = await fetch(`${api}/users/`, config)
            .then(res => res.json())
            .catch(err => err); 
        return response; 
    } catch(e) {
        console.log(e.message);
    }
}

export async function deleteProfile() {

}


const userService = {
    readProfile, 
    readProfileDetails,
    updateProfile, 
    deleteProfile
}; 

export default userService; 