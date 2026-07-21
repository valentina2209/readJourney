import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient } from "../../../shared/api/apiClient";
import type { AuthResponse } from "./types";
import toast from "react-hot-toast";
import axios from "axios";


export interface RegisterPayload {
    name: string;
    email: string;
    password?: string;
}

export const registerThunk = createAsyncThunk <
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
    
})