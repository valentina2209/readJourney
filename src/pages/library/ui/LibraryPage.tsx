import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/shared/model/hooks';
import { Book,  fetchOwnBooks,  selectIsLibraryLoading,  selectOwnBooks,  selectRecommendedBooks, setCurrentBook } from '@/entities/book';
import { DashboardRecommended } from '@/widgets/DashboardRecommended';
import { MyLibraryBooks } from '@/widgets/my-library-books/ui/MyLibraryBooks';
import { Modal } from '@/shared/ui/Modal/Modal';
import { BookForm } from '@/features/bookForm';
import { Dashboard } from '@/widgets/Dashboard/Dashboard';

import styles from '../../recommended/ui/RecommendedPage.module.css'
import css from './LibraryPage.module.css';
import { useNavigate } from 'react-router-dom';

export const LibraryPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const ownBooks = useAppSelector(selectOwnBooks); 
  const isLoading = useAppSelector(selectIsLibraryLoading); 
  const recommendedBooks = useAppSelector(selectRecommendedBooks);
 
  useEffect(() => {
    dispatch(fetchOwnBooks());
  }, [dispatch])
  
  const handleFilterChange = (filter: string) => {
    dispatch(fetchOwnBooks(filter === 'all' ? undefined : filter));
  };

  const handleStartReading = () => {
    if (!selectedBook) return;

    dispatch(setCurrentBook(selectedBook));

    setSelectedBook(null);

    navigate('/reading')
  };

  return (
    <div className="container">
      <div className={styles.wrapper}>
        {/* <h1 className={styles.visuallyHidden}>Library Page</h1> */}
        <Dashboard>
          <div className={styles.dashboard}>
            <BookForm
              mode='add'
              onAddSuccess={() => setIsSuccessModalOpen(true)}
            />
            <DashboardRecommended books={recommendedBooks} /> 
          </div>
        </Dashboard>
       
        <div className={css.librarySection}>
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
        </div>

        {/* Модалка успішного додавання книги */}
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

        {/* Модалка детальної інформації про книгу */}
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
                        : '/images/default-cover.jpg'
                    } 
                  />
                  <img
                    src={selectedBook.imageUrl || '/images/default-cover.jpg'}
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
                onClick={handleStartReading}
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