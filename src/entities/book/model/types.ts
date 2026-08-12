export interface Book {
    _id: string;
    title: string;
    author: string;
    imageUrl: string;
    totalPages: number;
    recommend?: boolean;
}

export type BookStatus = 'unread' | 'in-progress' | 'done';

export const BOOK_STATUS_OPTIONS = [
    { value: 'all', label: 'All book' },
    { value: 'unread', label: 'Unread' },
    { value: 'in-progress', label: 'In progress' },
    { value: 'done', label: 'Done' },
] as const;