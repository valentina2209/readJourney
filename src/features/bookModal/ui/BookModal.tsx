import type { Book } from "@/entities/book/model/types";
import { addToLibrary, fetchOwnBooks } from "@/entities/book";
import { useAppDispatch } from "@/shared/model/hooks";
import { Modal } from "@/shared/ui/Modal/Modal";
import toast from "react-hot-toast";

import styles from './BookModal.module.css';
interface BookModalProps {
    book: Book | null;
    isOpen: boolean;
    onClose: () => void;
}

export const BookModal = ({ book, isOpen, onClose }: BookModalProps) => {
    const dispatch = useAppDispatch();

    if (!book) return null;

    const handleAdd = async () => {
        try {
            const result = await dispatch(addToLibrary(book._id));

            if (addToLibrary.fulfilled.match(result)) {
                await dispatch(fetchOwnBooks(''));
                toast.success('Book added to your library!');
                onClose();
            } else {
                toast.error('Failed to add book');
            }
        } catch {
            toast.error('Something went wrong');
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className={styles.modalContent}>
                <img
                    src={book.imageUrl || "/images/default-cover.jpg"}
                    alt={book.title}
                    className={styles.cover}
                />
                
                <h2 className={styles.title}>{book.title}</h2>
                <p className={styles.author}>{book.author}</p>
                <p className={styles.pages}>{book.totalPages}</p>

                <button onClick={handleAdd} className={styles.addBtn} type="button">
                    Add to library
                </button>  
            </div>
        </Modal>
    )
}