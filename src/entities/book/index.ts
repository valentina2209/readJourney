export { booksReducer } from './model/slice';
export { fetchRecommendedBooks, addToLibrary } from './model/operations';
export type { Book } from './model/types';
export { BookCard } from './ui/BookCard';

export * from './model/slice';
export * from './model/operations';
export * from './model/selectors'; // <-- Реекспортуємо селектори
export * from './model/types';