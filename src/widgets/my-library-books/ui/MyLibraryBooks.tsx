import { Book } from "@/entities/book";
import { deleteBook } from "@/entities/book/model/operations";
import { BOOK_STATUS_OPTIONS } from "@/entities/book/model/types";
import { useAppDispatch } from "@/shared/model/hooks";
import React, { useState } from "react";
import styles from "./MyLibraryBooks.module.css"

interface MyLibraryBooksProps {
    books: Book[];
    onFilterChange: (status: string) => void;
    onBookClick: (book: Book) => void;
}

export const MyLibraryBooks: React.FC<MyLibraryBooksProps> = ({
    books,
    onFilterChange,
    onBookClick,
}) => {
    const dispatch = useAppDispatch();
    const [selectedStatus, setSelectedStatus] = useState<string>('all');
    
    const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setSelectedStatus(value);
        onFilterChange(value === 'all' ? '' : value);
    };

    const handleDelete = (event: React.MouseEvent, bookId: string) => {
        event.stopPropagation();
        dispatch(deleteBook(bookId));
    };

    return (
        <section className={styles.librarySection}>
            <header className={styles.header}>
                <h1 className={styles.title}>My library</h1>

                <div className={styles.selectWrapper}>
                    <select
                        value={selectedStatus}
                        onChange={handleStatusChange}
                        className={styles.select}
                    >
                        {BOOK_STATUS_OPTIONS.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>  
                </div>
                
            </header>

            {books.length === 0 ? (
                <div className={styles.emptyState}> 
                    <div className={styles.iconCircle}>
                        <picture>
                            <source srcSet='/images/books@1x.webp 1x, /images/books@2x.webp 2x' />
                            <img
                                src='/images/books.png'
                                alt='Books'
                                className={styles.booksImage}
                                width="70"
                                height="70"
                                loading="lazy"
                            />
                        </picture> 
                    </div>
                    <p className={styles.emptyText}>
                        To start training, add{' '}
                        <span className={styles.highlight}>some of your books</span> or from
                        the recommended ones
                    </p>
                </div>
            ) : (
                    <ul className={styles.booksGrid}>
                        {books.map((book) => (
                            <li
                                key={book._id}
                                className={styles.bookCard}
                                onClick={() => onBookClick(book)}
                            >
                                <img
                                    src={book.imageUrl}
                                    alt={book.title}
                                    className={styles.cover}
                                />
                                <div>
                                    <h3 className={styles.bookTitle}>{book.title}</h3>
                                    <p className={styles.bookAuthor}>{book.author}</p>
                                    <button
                                        type="button"
                                        aria-label="Delete book"
                                        onClick={(e) => handleDelete(e, book._id)}
                                    >
                                        🗑️
                                    </button> 
                                </div>
                            </li>
                        ))}
                    </ul>
            )}
        </section>
    )
}