/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "../services/userService";


const initialState = {
    user: {},
    error: false,
    loading: false,
    success: false,
    message: null
};

export const readUserProfile = createAsyncThunk("user/profile", async (user, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    const data = await userService.readProfile(user, token);

    // if(data.errors) {
    //     return thunkAPI.rejectWithValue(data.errors[0]);
    // }
    return data;
});

export const readUserDetails = createAsyncThunk("user/get", async(id, thunkAPI) => {
    const data = await userService.readProfileDetails(id); 
    // if(data.errors) {
    //     return thunkAPI.rejectWithValue(data.errors[0]);
    // }
    return data;  
});

export const updateUserProfile = createAsyncThunk("user/update", async(user, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token; 
    const data = await userService.updateProfile(user, token);  

    if(data.errors) {
        return thunkAPI.rejectWithValue(data.errors[0]); 
    }

    return data; 
});

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        resetMessage(state) {
            state.message = null;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(readUserProfile.pending, (state) => {
                state.error = false;
                state.loading = true;
            })
            .addCase(readUserProfile.fulfilled, (state, action) => {
                state.user = action.payload;
                state.error = null;
                state.loading = false;
                state.success = true;
            })
            .addCase(updateUserProfile.pending, (state) => {
                state.error = false;
                state.loading = true;
            })
            .addCase(updateUserProfile.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
                state.success = false;
                state.user = {};                
            })
            .addCase(updateUserProfile.fulfilled, (state, action) => {
                state.user = action.payload;
                state.error = null;
                state.loading = false;
                state.success = true;
                state.message = "User successfully updated"
            })
            .addCase(readUserDetails.pending, (state) => {
                state.error = false;
                state.loading = true;
                state.user = {}; 
                state.success = false; 
            })
            .addCase(readUserDetails.fulfilled, (state, action) => {
                state.user = action.payload;
                state.error = null;
                state.loading = false;
                state.success = true;
            })
    }
});


export const { resetMessage } = userSlice.actions;
export default userSlice.reducer; 