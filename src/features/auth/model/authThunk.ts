import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
import { apiClient } from "@/shared/api/apiClient";
import { User, type AuthResponse } from "./types";

export interface RegisterPayload {
    name: string;
    email: string;
    password?: string;
}

export interface LoginPayload {
    email: string;
    password?: string;
}

export const registerThunk = createAsyncThunk<
    AuthResponse,
    RegisterPayload,
    { rejectValue: string }
>('auth/register', async (credentials, { rejectWithValue }) => {
    try {
        const { data } = await apiClient.post<AuthResponse>('/users/signup', credentials);
        
        if (data.token) {
            localStorage.setItem('token', data.token);
        }
        
        toast.success('Реєстрація успішна!');
        return data;
    } catch (error: unknown) {
        let errorMessage = 'Помилка реєстрації. Спробуйте ще раз!';

        if (axios.isAxiosError(error)) {
            errorMessage = error.response?.data?.message || errorMessage;
        } else if (error instanceof Error) {
            errorMessage = error.message
        }
            
        toast.error(errorMessage);
        return rejectWithValue(errorMessage);
    }
    
});

export const loginThunk = createAsyncThunk<
    AuthResponse,
    LoginPayload,
    { rejectValue: string }
>('auth/login', async (credential, { rejectWithValue }) => {
    try {
        const { data } = await apiClient.post<AuthResponse>('/users/signin', credential);
        
        if (data.token) {
            localStorage.setItem('token', data.token);
        }
        
        toast.success('Авторизація успішна!');
        return data;
    } catch (error: unknown) {
        let errorMessage = 'Помилка входу. Перевірте вказані дані!';
        if (axios.isAxiosError(error)) {
            errorMessage = error.response?.data?.message || errorMessage;
        } else if (error instanceof Error) {
            errorMessage = error.message;
        }

        toast.error(errorMessage);
        return rejectWithValue(errorMessage);
    }
});

export const logoutThunk = createAsyncThunk<void, void, { rejectValue: string }>(
    'auth/logout',
    async (_, { rejectWithValue }) => {
        try {
            await apiClient.post('/users/signout');

            localStorage.removeItem('token');

            toast.success('Ви успішно вийшли з акаунту');
        } catch (error: unknown) {
            localStorage.removeItem('token');

            let errorMessage = 'Помилка під час виходу з сесії';
            if (axios.isAxiosError(error)) {
                errorMessage = error.response?.data?.message || errorMessage;
            } else if (error instanceof Error) {
                errorMessage = error.message;
            }
            toast.error(errorMessage);
            return rejectWithValue(errorMessage);
        }
    }
);

export const refreshUserThunk = createAsyncThunk <
    User,
    void,
    { rejectValue: string }
    >('auth/refresh', async (_, { rejectWithValue }) => {
        try {
            const { data } = await apiClient.get<User>('/users/current');
            return data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(error.response?.data?.message || 'Unauthorized'); 
            }
            return rejectWithValue('Failed to refresh user');
        }
})