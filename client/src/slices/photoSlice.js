import photoService from "../services/photoService";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    photos: [], 
    photo: {}, 
    error: false, 
    success: false, 
    loading: false, 
    message: null 
}; 

export const createUserPhoto = createAsyncThunk("photo/publish", async(user, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token; 
    const data = await photoService.createPhoto(user, token); 

    if(data.errors) {
        return thunkAPI.rejectWithValue(data.errors[0]); 
    }

    return data; 
});

export const readUserPhotos = createAsyncThunk("photo/userPhotos", async(id, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token; 
    const data = await photoService.readUserPhotos(id, token); 
    
    // if(data.errors) {
    //     return thunkAPI.rejectWithValue(data.errors[0]); 
    // }
    return data;
}); 

export const readPhotoById = createAsyncThunk("photo/getphoto", async(id, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token; 
    const data = await photoService.readPhoto(id, token); 
    return data;
}); 

export const updateUserPhoto = createAsyncThunk("photo/update", async(photo, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    const data = await photoService.updatePhoto(photo._id, { title: photo.title }, token); 

    if(data.errors) {
        return thunkAPI.rejectWithValue(data.errors[0]); 
    }

    return data;
});

export const deleteUserPhoto = createAsyncThunk("photo/delete", async(id, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token; 
    const data = await photoService.deletePhoto(id, token); 

    if(data.errors) {
        return thunkAPI.rejectWithValue(data.errors[0]);
    }
    
    return data;
}); 

export const togglePhotoLike = createAsyncThunk("photo/like", async(id, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token; 
    const data = await photoService.photoLike(id, token); 

    if(data.errors){
        return thunkAPI.rejectWithValue(data.errors[0]);
    }
    return data;
}); 

export const createPhotoComment = createAsyncThunk("photo/comment", async(photoData, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    const data = await photoService.createPhotoComment(photoData._id, { text: photoData.text }, token); 

    if(data.errors) {
        return thunkAPI.rejectWithValue(data.errors[0]);
    }
    return data; 
}); 

export const deletePhotoComment = createAsyncThunk("photo/uncomment", async(photoData, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    const data = await photoService.deletePhotoComment(photoData.photoId, photoData.commentId, token);
    
    if(data.errors) {
        return thunkAPI.rejectWithValue(data.errors[0]);
    }
    return data; 
}); 

const photoSlice = createSlice({
    name: "photo", 
    initialState, 
    reducers: {
        resetMessage(state) {
            state.message = null; 
        }
    },
    extraReducers(builder) {
        builder
            .addCase(createUserPhoto.pending, (state) => {
                state.loading = true;
                state.error = false;          
            })
            .addCase(createUserPhoto.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.success = true;
                state.photo = action.payload;    
                state.photos.unshift(state.photo);    
                state.message = "Photo successfully published";                         
            })
            .addCase(createUserPhoto.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.photo = {};            
            })
            .addCase(readUserPhotos.pending, (state) => {
                state.loading = true;
                state.error = false;          
            })
            .addCase(readUserPhotos.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.success = true;
                state.photos = action.payload;                     
            })
            .addCase(deleteUserPhoto.pending, (state) => {
                state.loading = true;
                state.error = false;          
            })
            .addCase(deleteUserPhoto.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.success = true;   
                state.message = action.payload.message;        
                state.photos = state.photos.filter(photo => {
                    return photo._id != action.payload._id; 
                });            
            })
            .addCase(deleteUserPhoto.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;   
                state.photo = {};         
            })
            .addCase(updateUserPhoto.pending, (state) => {
                state.loading = true;
                state.error = false;          
            })
            .addCase(updateUserPhoto.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.success = true;   
                state.message = action.payload.message;        
                state.photos = state.photos.map(photoObj => {
                    if(photoObj._id == action.payload.photo._id) {
                        return {
                            ...photoObj, 
                            title: action.payload.photo.title
                        }
                    }
                    return photoObj; 
                });      
            })
            .addCase(updateUserPhoto.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;   
                state.photo = {};         
            })
            .addCase(readPhotoById.pending, (state) => {
                state.loading = true; 
                state.error = false; 
            })
            .addCase(readPhotoById.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.success = true;     
                state.photo = action.payload;          
            })
            .addCase(togglePhotoLike.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.success = true;      
                state.message = action.payload.message;  
                
                if(state.photo.likes) {
                    if(!state.photo.likes.includes(action.payload.userId)) {
                        state.photo.likes.push(action.payload.userId); 
                    } else {
                        state.photo.likes = state.photo.likes.filter(id => id != action.payload.userId); 
                    }
                }

                state.photos = state.photos.map((photo) => {
                    if(photo._id == action.payload._id) {
                        if(!photo.likes.includes(action.payload.userId)) {
                            return {
                                ...photo, 
                                likes: [...photo.likes, action.payload.userId]
                            }                            
                        } else {
                            let index = photo.likes.indexOf(action.payload.userId); 
                            const likesCopy =  [...photo.likes];                             
                            if(index > -1) {
                                likesCopy.splice(index, 1); 
                            }           
                            return {
                                ...photo, 
                                likes: [...likesCopy]
                            }             
                        }
                    }
                    return photo; 
                });
            })
            .addCase(togglePhotoLike.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;           
            })
            .addCase(createPhotoComment.pending, (state) => {
                state.loading = true; 
                state.error = false; 
            })
            .addCase(createPhotoComment.fulfilled, (state, action) => {
                state.loading = false; 
                state.error = null;
                state.success = true; 
                state.message = action.payload.message; 
                state.photo.comments.push(action.payload.comment); 
            })
            .addCase(createPhotoComment.rejected, (state, action) => {
                state.loading = false; 
                state.error = action.payload; 
            }) 
            .addCase(deletePhotoComment.pending, (state) => {
                state.loading = true; 
                state.error = false; 
            })
            .addCase(deletePhotoComment.fulfilled, (state, action) => {
                state.loading = false; 
                state.error = null;
                state.success = true; 
                state.message = action.payload.message; 
                state.photo.comments = [...action.payload.updatedComments]; 
            })
            .addCase(deletePhotoComment.rejected, (state, action) => {
                state.loading = false; 
                state.error = action.payload; 
            });   
            
    }
}); 

export const { resetMessage } = photoSlice.actions; 
export default photoSlice.reducer; 
