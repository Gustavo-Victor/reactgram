import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../services/authService";


const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
    user: user ? user : null,
    error: false,
    success: false,
    loading: false
};

export const registerUser = createAsyncThunk("auth/register", async (user, thunkAPI) => {
    const data = await authService.register(user);

    if (data.errors) {
        return thunkAPI.rejectWithValue(data.errors[0]);
    }
    return data;
});

export const logOutUser = createAsyncThunk("auth/logout", async () => {
    await authService.logout();
});

export const authSlice = createSlice({
    initialState,
    name: "auth",
    reducers: {
        reset(state) {
            state.loading = false;
            state.error = false;
            state.success = false;
            state.user = null;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.success = false;
                state.error = false;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.error = action.payload;
                state.user = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.error = null;
                state.user = action.payload;
            })
            .addCase(logOutUser.fulfilled, (state) => {
                state.loading = false; 
                state.success = false; 
                state.error = null;
                state.user = null;  
            })
    }
});


export const { reset } = authSlice.actions;
export default authSlice.reducer; 