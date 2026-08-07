import { configureStore } from "@reduxjs/toolkit";
import { themeReducer } from "@/features/theme/model/themeSlice";
import { authReducer } from "@/features/auth/model/authSlice";
import { booksReducer } from "@/entities/book";

export const store = configureStore({
    reducer: {
        theme: themeReducer,
        auth: authReducer,
        books: booksReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;