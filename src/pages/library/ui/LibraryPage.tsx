import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/shared/model/hooks';
import { Book,  fetchOwnBooks,  selectIsLibraryLoading,  selectOwnBooks,  selectRecommendedBooks } from '@/entities/book';
import { AddBookForm } from '@/features/addBook';
import { DashboardRecommended } from '@/widgets/DashboardRecommended';
import { MyLibraryBooks } from '@/widgets/my-library-books/ui/MyLibraryBooks';
import { Modal } from '@/shared/ui/Modal/Modal';

import styles from './LibraryPage.module.css';

// interface LibraryPageProps {
//   ownBooks: Book[];
//   isLoading: boolean;
//   // handleFilterChange: (filter: string) => void;
// }

export const LibraryPage = () => {
  const dispatch = useAppDispatch();
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const ownBooks = useAppSelector(selectOwnBooks); // або (state) => state.books.library.books
  const isLoading = useAppSelector(selectIsLibraryLoading); // або (state) => state.books.library.isLoading
  const recommendedBooks = useAppSelector(selectRecommendedBooks);
 
  useEffect(() => {
    dispatch(fetchOwnBooks());
  }, [dispatch])
  
  const handleFilterChange = (filter: string) => {
    dispatch(fetchOwnBooks(filter === 'all' ? undefined : filter));
  };

  return (
    <div className="container">
      <div className={styles.pageWrapper}>
        <h1 className={styles.visuallyHidden}>Library Page</h1>

        <aside className={styles.sidebar}>
          <AddBookForm onSuccess={() => setIsSuccessModalOpen(true)} />
          
          <div className={styles.recommendedBox}>
            <DashboardRecommended books={recommendedBooks} />
          </div>
        </aside>

        <main className={styles.mainContent}>
          {isLoading ? (
            // Add to spinner
          <p>Loading your library...</p>
        ) : (
            <MyLibraryBooks
              books={ownBooks || []}
              onFilterChange={handleFilterChange}
              onBookClick={(book) => setSelectedBook(book)}
            />
        )}
        </main>

        <Modal 
          isOpen={isSuccessModalOpen}
          onClose={() => setIsSuccessModalOpen(false)}
        >
          <div className={styles.successModalContent}>
            <picture>
              <source srcSet='/images/hug@1x.webp 1x, /images/hug@2x.webp 2x' />
              <img
                src='/images/hangup.png'
                alt='Good job'
                className={styles.successImage}
                width="68"
                height="68"
                loading="lazy"
              />
            </picture>

            <h3 className={styles.modalTitle}>Good job</h3>
            <p className={styles.modalText}>
              Your book is now in <span className={styles.highlightText}>the library!</span> The joy knows no bounds and now you can start your training.
            </p>
          </div>
        </Modal>

        <Modal 
          isOpen={Boolean(selectedBook)} 
          onClose={() => setSelectedBook(null)}
        >
          {selectedBook && (
            <div className={styles.bookModalContent}>
              <div className={styles.coverWrapper}>
                <picture>
                  <source 
                    srcSet={
                      selectedBook.imageUrl 
                        ? `${selectedBook.imageUrl} 1x` 
                        : '/images/default-cover.png 1x, /images/default-cover@2x.png 2x'
                    } 
                  />
                  <img
                    src={selectedBook.imageUrl || '/images/default-cover.png'}
                    alt={selectedBook.title}
                    className={styles.bookCover}
                    loading="lazy"
                  />
                </picture>
              </div>

              <h3 className={styles.bookTitle}>{selectedBook.title}</h3>
              <p className={styles.bookAuthor}>{selectedBook.author}</p>
              <p className={styles.bookPages}>{selectedBook.totalPages} pages</p>

              <button 
                type="button" 
                className={styles.startReadingBtn}
                onClick={() => setSelectedBook(null)}
              >
                Start reading
              </button>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};