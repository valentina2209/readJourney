import axios from "axios";
import type { Book } from "./types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@/app/store/store";

export const instance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
});

interface FetchRecommendedParams {
    page?: number;
    limit?: number;
    title?: string;
    author?: string;
}

interface FetchRecommendedResponse {
    results: Book[];
    totalPages: number;
    page: number;
    perPage: number;
}

export const setAuthHeader = (token: string) => {
    instance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearAuthHeader = () => {
    instance.defaults.headers.common.Authorization = '';
};

// instance.interceptors.request.use((config) => {
//     const token = localStorage.getItem('token')

//     if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//     }

//     return config;
// })


export const fetchRecommendedBooks = createAsyncThunk<
    FetchRecommendedResponse,
    FetchRecommendedParams,
    { rejectValue: string; state: RootState }
>('books/fetchRecommend', async (params, { getState, rejectWithValue }) => {
    try {
        const state = getState();
        const token = state.auth.token;

        const config = {
            params,
            headers: token ? { Authorization: `Bearer ${token}` } : {},
        };

        const { data } = await instance.get<FetchRecommendedResponse>(
            '/books/recommend',
            config
        );
        return data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return rejectWithValue(
                error.response?.data?.message || 'Failed to fetch books'
            );
        }
        return rejectWithValue('An unexpected error occurred')
    }
});

export const addToLibrary = createAsyncThunk <
    Book,
    string,
    { rejectValue: string, state: RootState }
    >('books/addToLibrary', async (bookId, { getState, rejectWithValue }) => {
        try {
            const state = getState();
            const token = state.auth.token;

            const config = {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
        };
            const { data } = await instance.post<Book>(`/books/add/${bookId}`, {}, config);
            return data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(
                    error.response?.data?.message || 'Failed to add book'
                );
            }
            return rejectWithValue('An unexpected error occurred');
        }  
})