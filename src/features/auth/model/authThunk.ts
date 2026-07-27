import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
import { apiClient } from "../../../shared/api/apiClient";
import type { AuthResponse } from "./types";

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