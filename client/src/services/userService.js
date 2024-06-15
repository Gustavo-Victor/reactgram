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

export async function editProfile() {

}

export async function deleteProfile() {

}


const userService = {
    readProfile, 
    editProfile, 
    deleteProfile
}; 

export default userService; 