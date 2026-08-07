import { createSlice } from "@reduxjs/toolkit";
import type { Book } from "./types"
import { addToLibrary, fetchRecommendedBooks } from "./operations";

interface BooksState {
    recommended: {
        books: Book[];
        page: number;
        totalPages: number;
        totalResults: number;
        isLoading: boolean;
        error: string | null;
    };
    library: Book[];
}

const initialState: BooksState = {
    recommended: {
        books: [],
        page: 1,
        totalPages: 1,
        totalResults: 0,
        isLoading: false,
        error: null,
    },
    library: [],
};

export const booksSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchRecommendedBooks.pending, (state) => {
                state.recommended.isLoading = true;
                state.recommended.error = null;
            })
            .addCase(fetchRecommendedBooks.fulfilled, (state, action) => {
                state.recommended.isLoading = false;
                state.recommended.books = action.payload.results;
                state.recommended.totalPages = action.payload.totalPages;
                state.recommended.page = action.payload.page;
            })
            .addCase(fetchRecommendedBooks.rejected, (state, action) => {
                state.recommended.isLoading = false;
                state.recommended.error = action.payload as string;
            })
            .addCase(addToLibrary.fulfilled, (state, action) => {
                state.library.push(action.payload)
            });
    },
});

export const booksReducer = booksSlice.reducer;