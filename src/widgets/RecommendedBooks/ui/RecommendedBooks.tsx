
import { useState } from 'react';
import { BookCard, type Book } from '../../../entities/book';
import { BookModal } from '../../../features/bookModal/ui/BookModal';
import styles from './RecommendedBooks.module.css';

interface RecommendedBooksProps {
  books: Book[];
  page: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}

export const RecommendedBooks = ({
  books,
  page,
  totalPages,
  onPageChange,
}: RecommendedBooksProps) => {
  // Стейт для збереження обраної книги, щоб відкрити модальне вікно
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const isFirstPage = page <= 1;
  const isLastPage = page >= totalPages;

  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Recommended</h2>

        {/* Блок пагінації */}
        <div className={styles.pagination}>
          <button
            type="button"
            className={styles.paginationBtn}
            onClick={() => onPageChange(page - 1)}
            disabled={isFirstPage}
            aria-label="Previous page"
          >
            <svg className={`${styles.arrowIcon} ${styles.rotate}`}>
              <use href="/icons.svg#icon-arrow-right" />
            </svg>
          </button>

          <button
            type="button"
            className={styles.paginationBtn}
            onClick={() => onPageChange(page + 1)}
            disabled={isLastPage}
            aria-label="Next page"
          >
            <svg className={styles.arrowIcon}>
              <use href="/icons.svg#icon-arrow-right" />
            </svg>
          </button>
        </div>
      </div>

      {/* Перелік рекомендованих книг */}
      {books.length > 0 ? (
        <ul className={styles.bookList}>
          {books.map((book) => (
            <li key={book._id} className={styles.bookItem}>
              <BookCard book={book} onClick={() => setSelectedBook(book)} />
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.emptyText}>No books found matching your criteria.</p>
      )}

      {/* Модальне вікно деталей книги */}
      {selectedBook && (
        <BookModal
          book={selectedBook}
          onClose={() => setSelectedBook(null)}
        />
      )}
    </section>
  );
};

