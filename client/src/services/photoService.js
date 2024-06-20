import { api, requestConfig } from "../utils/config";

async function createPhoto(data, token) {
    const config = requestConfig("POST", data, token, true); 

    try {
        const response = await fetch(`${api}/photos/`, config)
            .then(res => res.json())
            .catch(err => err); 
        return response; 
    } catch(e) {
        console.log(e.message);
    }
}

async function readAllPhotos(token) {
    const config = requestConfig("GET", null, token); 

    try {
        const response = await fetch(`${api}/photos`, config)
            .then(res => res.json())
            .catch(err => err);  
        return response;
    } catch(e) {   
        console.log(e.message);
    }
}

async function readUserPhotos(id, token) {
    const config = requestConfig("GET", null, token, null); 

    try {
        const response = await fetch(`${api}/photos/user/${id}`, config)
            .then(res => res.json())
            .catch(err => err); 
        return response; 
    } catch(e) {
        console.log(e.message); 
    }
}

async function readPhoto(id, token) {
    const config = requestConfig("GET", null, token, null); 

    try {
        const response = await fetch(`${api}/photos/${id}`, config)
            .then(res => res.json())
            .catch(err => err); 
        return response; 
    } catch(e) {
        console.log(e.message);
    }
}

async function updatePhoto(id, data, token) {
    const config = requestConfig("PUT", data, token, null);
    
    try {
        const response = await fetch(`${api}/photos/${id}`, config)
            .then(res => res.json()) 
            .catch(err => err)
        return response; 
    } catch(e) {
        console.log(e.message);
    }

}

async function deletePhoto(id, token) {
    const config = requestConfig("DELETE", null, token, null); 
    
    try {
        const response = await fetch(`${api}/photos/${id}`, config)
            .then(res => res.json())
            .catch(err => err);  
        return response;
    } catch(e) { 
        console.log(e.message);
    }
}

async function photoLike(id, token) {
    const config = requestConfig("PUT", null, token, null); 

    try {
        const response = await fetch(`${api}/photos/like/${id}`, config)
            .then(res => res.json()) 
            .catch(err => err)
        return response; 
    } catch(e) {
        console.log(e.message);
    }
}


async function createPhotoComment(id, data, token) {
    const config = requestConfig("PUT", data, token, null); 

    try {
        const response = await fetch(`${api}/photos/comment/${id}`, config)
            .then(res => res.json())
            .catch(err => err);
        return response; 
    } catch(e) {
        console.log(e);
    }
}

async function deletePhotoComment(photoId, commentId, token) {
    const config = requestConfig("DELETE", null, token, null);
    
    try {
        const response = await fetch(`${api}/photos/comment/${photoId}/${commentId}`, config)
            .then(res => res.json()) 
            .catch(err => err); 
        return response; 
    } catch(e) {
        console.log(e.message);
    }
}

async function searchPhotos(query, token) {
    const config = requestConfig("GET", null, token, null); 

    try {
        const response = await fetch(`${api}/photos/search?q=${query}`, config)
            .then(res => res.json())
            .catch(err => err); 
        return response;  
    } catch (e) {
        console.log(e.message);
    }
}

const photoService = {
    createPhoto,
    readAllPhotos,
    readUserPhotos,
    readPhoto, 
    deletePhoto,
    updatePhoto,
    photoLike,
    createPhotoComment,
    deletePhotoComment,
    searchPhotos,
}

export default photoService; 

