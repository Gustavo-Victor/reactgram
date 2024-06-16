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

async function readPhotoById() {

}

async function updatePhoto() {

}

async function deletePhoto() {

}

async function likePhoto() {

}

async function dislikePhoto() {

}

async function createPhotoComment() {

}

async function deletePhtoComment() {

}

const photoService = {
    createPhoto,
    readUserPhotos, 
}

export default photoService; 

