const { API_URI, UPLOADS_URI } = import.meta.env;

export const api = API_URI || "https://reactgram-4yia.onrender.com/api";
export const uploads = UPLOADS_URI || "https://reactgram-4yia.onrender.com/uploads";


export const requestConfig = (method, data, token = null, image = null) => {
    let config; 

    if(image) {
        config = {
            method,
            body: data, 
            headers: {}
        }
    } else if (method == "DELETE" || data == null) {
        config = {
            method,
            headers: {}
        }
    } else {
        config = {
            method, 
            body: JSON.stringify(data),
            headers: {
                'Content-Type': "application/json"
            }
        }
    }

    if(token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config; 
}