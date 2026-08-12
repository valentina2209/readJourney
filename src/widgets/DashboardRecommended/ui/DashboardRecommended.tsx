import { Book } from "@/entities/book";
import { Link } from "react-router-dom";
import styles from "./DashboardRecommended.module.css"

interface DashboardRecommendedProps {
    books: Book[];
}

export const DashboardRecommended = ({ books = [] }: DashboardRecommendedProps) => {
    const previewBooks = books.slice(0, 3);
    
    return (
        <div className={styles.container}>
            <h3 className={styles.title}>Recommended books</h3>

            <ul className={styles.booksList}>
                {previewBooks.map((book) => (
                    <li key={book._id} className={styles.bookItem}>
                        <img
                            src={book.imageUrl || '/images/default-cover.png'}
                            alt={book.title}
                            className={styles.cover}
                            loading="lazy"
                        />
                        <p className={styles.bookTitle}>{book.title}</p>
                        <p className={styles.bookAuthor}>{book.author}</p>
                    </li>
                ))}
            </ul>

            <div className={styles.footer}>
                <Link to="/recommended" className={styles.link}>
                    Home
                </Link>
                <Link to="/recommended" className={styles.arrowLink} aria-label="Go to recommended page">
                    <svg width="24" height="24" className={styles.arrowIcon}>
                        <use href="/icons.svg#icon-arrow" />
                    </svg>
                </Link>
            </div>
        </div>
    )
}