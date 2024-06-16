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
    }
}); 

export const { resetMessage } = photoSlice.actions; 
export default photoSlice.reducer; 
