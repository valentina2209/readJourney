import { useEffect } from "react";
import type { Book } from "../../../entities/book/model/types";
import { useAppDispatch } from "../../../shared/model/hooks";
import styles from './BookModal.module.css';
import { addToLibrary } from "../../../entities/book";

interface BookModalProps {
    book: Book;
    onClose: () => void;
}

export const BookModal = ({ book, onClose }: BookModalProps) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.code === 'Escape') onClose();
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    const handleAdd = () => {
        dispatch(addToLibrary(book._id));
        onClose();
    };

    return (
        <div className={styles.backdrop} onClick={onClose}>
            <div className={styles.modal} onClick={(event) => event.stopPropagation()}>
                <button className={styles.closeBtn} onClick={onClose} aria-label="Close modal">
                    <svg className={styles.closeIcon}>
                        <use href="/icons.svg#icon-close" />
                    </svg>
                </button>

                <img src={book.imageUrl} alt={book.title} className={styles.cover} />

                <h2 className={styles.title}>{book.title}</h2>
                <p className={styles.author}>{book.author}</p>
                <p className={styles.pages}>{book.totalPages}</p>

                <button onClick={handleAdd} className={styles.addBtn}>
                    Add to library
                </button>
            </div>
        </div>
    )
}