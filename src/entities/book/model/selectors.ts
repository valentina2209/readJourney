import { RootState } from '@/app/store/store'; // Перевір шлях до RootState

// 1. Селектори для Recommended (Рекомендованих книг)
export const selectRecommendedBooks = (state: RootState) =>
  state.books.recommended.books;

export const selectRecommendedPage = (state: RootState) =>
  state.books.recommended.page;

export const selectRecommendedTotalPages = (state: RootState) =>
  state.books.recommended.totalPages;

export const selectIsRecommendedLoading = (state: RootState) =>
  state.books.recommended.isLoading;

export const selectRecommendedError = (state: RootState) =>
  state.books.recommended.error;


// 2. Селектори для Library (Власних книг)
export const selectOwnBooks = (state: RootState) => 
  state.books.library.books;

export const selectIsLibraryLoading = (state: RootState) =>
  state.books.library.isLoading;

export const selectLibraryError = (state: RootState) =>
  state.books.library.error;