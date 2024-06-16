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

export const deleteUserPhoto = createAsyncThunk("photo/delete", async(id, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token; 
    const data = await photoService.deletePhoto(id, token); 

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
    }
}); 

export const { resetMessage } = photoSlice.actions; 
export default photoSlice.reducer; 
