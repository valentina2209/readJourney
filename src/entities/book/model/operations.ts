import axios from "axios";
import type { Book } from "./types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient } from "@/shared/api/apiClient";
// import { RootState } from "@/app/store/store";

// export const instance = axios.create({
//     baseURL: import.meta.env.VITE_API_BASE_URL,
// });

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

export interface AddBookPayload {
    title: string;
    author: string;
    totalPages: number;
}

// export const setAuthHeader = (token: string) => {
//     instance.defaults.headers.common.Authorization = `Bearer ${token}`;
// };

// export const clearAuthHeader = () => {
//     instance.defaults.headers.common.Authorization = '';
// };

// 1. Отримання рекомендованих книг
export const fetchRecommendedBooks = createAsyncThunk<
    FetchRecommendedResponse,
    FetchRecommendedParams,
    { rejectValue: string }
>('books/fetchRecommend', async (params, { rejectWithValue }) => {
    try {
        const { data } = await apiClient.get<FetchRecommendedResponse>('/books/recommend', {params});
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

// 2. Додавання книги до своєї бібліотеки
export const addToLibrary = createAsyncThunk <
    Book,
    string,
    { rejectValue: string }
    >('books/addToLibrary', async (bookId, { rejectWithValue }) => {
        try {
            const { data } = await apiClient.post<Book>(`/books/add/${bookId}`);
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

// 3. Отримання власних книг
export const fetchOwnBooks = createAsyncThunk<
    Book[],
    string | undefined,
    { rejectValue: string }
    >('books/fetchOwn', async (status, { rejectWithValue }) => {
    try {
        const { data } = await apiClient.get<Book[]>('/books/own', {
            params: status ? { status } : {},
        });
        return data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch own books');
        }
        return rejectWithValue('An unexpected error occurred');
    }
});

// 4. Створення власної книги
export const createBook = createAsyncThunk<
    Book,
    AddBookPayload,
    { rejectValue: string }
    >('books/createBook', async (bookData, { rejectWithValue }) => {
    try {
        const { data } = await apiClient.post<Book>('/books/add', bookData);
        return data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch own books');
        }
        return rejectWithValue('An unexpected error occurred');
    }
});

// 5. Видалення книги
export const deleteBook = createAsyncThunk<
    string,
    string,
    { rejectValue: string }
>('books/deleteBook', async (bookId, { rejectWithValue }) => {
    try {
        await apiClient.delete(`/books/remove/${bookId}`);
        return bookId;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch own books');
        }
        return rejectWithValue('An unexpected error occurred');
    }
});
