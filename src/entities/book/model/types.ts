export interface Book {
    _id: string;
    title: string;
    author: string;
    imageUrl: string;
    totalPages: number;
    recommend?: boolean;
    status?: string;
    owner?: string;
    progress?: ProgressEntry[];
}

export type BookStatus = 'unread' | 'in-progress' | 'done';

export const BOOK_STATUS_OPTIONS = [
    { value: 'all', label: 'All book' },
    { value: 'unread', label: 'Unread' },
    { value: 'in-progress', label: 'In progress' },
    { value: 'done', label: 'Done' },
] as const;

export interface ProgressEntry {
    _id: string;
    startPage: number;
    startReading: string;
    finishPage?: number;
    finishReading?: string;
    speed?: number;
    status: "active" | "inactive";
}

export interface ReadingBook extends Book {
    progress: ProgressEntry[];
    timeLeftToRead?: {
        hours: number;
        minutes: number;
        seconds: number;
    };
}

export interface StartReadingPayload {
    id: string;
    page: number;
}

export interface FinishReadingPayload {
    id: string;
    page: number;
}

export interface DeleteReadingPayload {
    bookId: string;
    readingId: number;
}