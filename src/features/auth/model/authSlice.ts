import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AuthState, AuthResponse } from "./types";
import { registerThunk } from "./authThunk";

const initialState: AuthState = {
    user: null,
    token: localStorage.getItem('token'),
    isLoggedIn: !!localStorage.getItem('token'),
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<AuthResponse>) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isLoggedIn = true;
            localStorage.setItem('token', action.payload.token);
        },
        clearCredentials: (state) => {
            state.user = null;
            state.token = null;
            state.isLoggedIn = false;
            localStorage.removeItem('token');
        },
    },
    extraReducers: (builder) => {
        builder.addCase(registerThunk.fulfilled, (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isLoggedIn = true;
            localStorage.setItem('token', action.payload.token);
        });
    },
});

export const { setCredentials, clearCredentials } = authSlice.actions;
export const authReducer = authSlice.reducer;
