import type { Book } from '../../model/types';
import styles from './BookCard.module.css';

interface BookCardProps {
  book: Book;
  onClick: () => void;
}

export const BookCard = ({ book, onClick }: BookCardProps) => {
  return (
    <div className={styles.card}>
      <div 
        className={styles.imageWrapper} 
        onClick={onClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && onClick()}
        aria-label={`Open details for ${book.title}`}
      >
        <img 
          src={book.imageUrl} 
          alt={book.title} 
          className={styles.cover} 
          loading="lazy"
        />
      </div>

      <div className={styles.details}>
        <h3 className={styles.title} title={book.title}>
          {book.title}
        </h3>
        <p className={styles.author} title={book.author}>
          {book.author}
        </p>
      </div>
    </div>
  );
};