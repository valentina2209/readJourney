import { createSlice } from "@reduxjs/toolkit";
import type { Book } from "./types"
import {
    addToLibrary,
    createBook,
    deleteBook,
    fetchOwnBooks,
    fetchRecommendedBooks
} from "./operations";

interface BooksState {
    recommended: {
        books: Book[];
        page: number;
        totalPages: number;
        totalResults: number;
        isLoading: boolean;
        error: string | null;
    };
    library: {
        books: Book[];
        isLoading: boolean;
        error: string | null;
    }
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
    library: {
        books: [],
        isLoading: false,
        error: null,
    },
};

export const booksSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Recommended books
            .addCase(fetchRecommendedBooks.pending, (state) => {
                state.recommended.isLoading = true;
                state.recommended.error = null;
            })
            .addCase(fetchRecommendedBooks.fulfilled, (state, action) => {
                state.recommended.isLoading = false;
                state.recommended.books = action.payload.results || [];
                state.recommended.totalPages = action.payload.totalPages || 1;
                state.recommended.page = action.payload.page || 1;
                state.recommended.totalResults = action.payload.perPage || 0
            })
            .addCase(fetchRecommendedBooks.rejected, (state, action) => {
                state.recommended.isLoading = false;
                state.recommended.error = (action.payload as string) || 'Failed to fetch recommended books';
            })

            // Fetch own library books
            .addCase(fetchOwnBooks.pending, (state) => {
                state.library.isLoading = true;
                state.library.error = null;
            })
            .addCase(fetchOwnBooks.fulfilled, (state, action) => {
                state.library.isLoading = false;
                state.library.books = action.payload || [];
            })
            .addCase(fetchOwnBooks.rejected, (state, action) => {
                state.library.isLoading = false;
                state.library.error = (action.payload as string) || 'Failed to fetch own books';
            })

            // Create new book manually
            .addCase(createBook.pending, (state) => {
                state.library.isLoading = true;
                state.library.error = null;
            })
            .addCase(createBook.fulfilled, (state, action) => {
                state.library.isLoading = false;
                const newBook = action.payload;
                if (newBook && newBook._id) {
                    state.library.books.push(newBook);
                }
            })
            .addCase(createBook.rejected, (state, action) => {
                state.library.isLoading = false;
                state.library.error = (action.payload as string) || 'Failed to fetch create books'
            })

            // Add recommended book to library
            .addCase(addToLibrary.pending, (state) => {
                state.library.isLoading = true;
                state.library.error = null;
            })
            .addCase(addToLibrary.fulfilled, (state, action) => {
                state.library.isLoading = false;
                const addedBook = action.payload;
                // Перевіряємо, щоб не дублювати книгу в бібліотеці
                if (addedBook && addedBook._id) {
                    const exists = state.library.books.some(
                        (book) => book._id === addedBook._id
                    );
                    if (!exists) {
                        state.library.books.push(addedBook);
                    }
                }
            })
            .addCase(addToLibrary.rejected, (state, action) => {
                state.library.isLoading = false;
                state.library.error = (action.payload as string) || 'Failed to add book';
            })

            // Delete book
            .addCase(deleteBook.pending, (state) => {
                state.library.isLoading = true;
                state.library.error = null;
            })
            .addCase(deleteBook.fulfilled, (state, action) => {
                state.library.isLoading = false;
                state.library.books = state.library.books.filter(
                    (book) => book._id !== action.payload
                );
            })
            .addCase(deleteBook.rejected, (state, action) => {
                state.library.isLoading = false;
                state.library.error = (action.payload as string) || 'Failed to delete book';
            });
    },
});

export const booksReducer = booksSlice.reducer; 