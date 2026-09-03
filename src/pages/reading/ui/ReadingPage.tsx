import { useAppDispatch, useAppSelector } from '@/shared/model/hooks';
import styles from './ReadingPage.module.css';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Dashboard } from '@/widgets/Dashboard/Dashboard';
import { AddReadingForm } from '@/features/add-reading/ui/AddReadingForm';
import { Diary, Statistics } from '@/widgets/reading-details';
import { Modal } from '@/shared/ui/Modal/Modal';
import { deleteReadingProgress, finishReading, startReading } from '@/entities/book';

export const ReadingPage = () => {
  const dispatch = useAppDispatch();
  const { currentBook, isLoading } = useAppSelector((state) => state.books)
  const [activeTab, setActiveTab] = useState<"diary" | "status">('diary');
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  if (!currentBook) {
    return <div >Loading book details...</div>
  }

  const activeSection = currentBook.progress?.find(
    (item) => item.status === "active"
  );

  const isReadingActive = Boolean(activeSection);

  const handleStart = async (page: number) => {
    try {
      await dispatch(
        startReading({ id: currentBook._id, page })
      ).unwrap();
      toast.success("Reading session started!");
    } catch (error) {
      const errorMessage = error instanceof Error
        ? error.message
        : typeof error === 'string'
          ? error
          : "Failed to start reading"
      
      toast.error(errorMessage);
    }
  }

  const handleStop = async (page: number) => {
    try {
      const updatedBook = await dispatch(
        finishReading({ id: currentBook._id, page })
      ).unwrap();

      toast.success("Reading session saved!");

      if (page >= updatedBook.totalPages) {
        setIsSuccessModalOpen(true);
      }
    } catch (error) {
      const errorMessage = error instanceof Error
        ? error.message
        : typeof error === 'string'
          ? error
          : "Failed to stop reading"
      
      toast.error(errorMessage);
    }
  };

  const handleDeleteEntry = async (readingId: string) => {
    try {
      await dispatch(
        deleteReadingProgress({ bookId: currentBook._id, readingId })
      ).unwrap();
      toast.success("Entry removed");
    } catch (error) {
      const errorMessage = error instanceof Error
        ? error.message
        : typeof error === 'string'
          ? error
          : "Failed to delete entry"
      
      toast.error(errorMessage);
    }
  };
 
  return (
    <div className={styles.pageContainer}>
      <Dashboard>
        <AddReadingForm
          isReadingActive={isReadingActive}
          totalPages={currentBook.totalPages}
          onStart={handleStart}
          onStop={handleStop}
          isLoading={isLoading}
        />

        <div className={styles.detailsBlock}>
          <div className={styles.tabHeader}>
            <h3>Details</h3>
            <div className={styles.tabs}>
              <button
                className={activeTab === "diary" ? styles.activeTab : ""}
                onClick={() => setActiveTab("diary")}
              >
                Diary
              </button>
              <button
                className={activeTab === "status" ? styles.activeTab : ""}
                onClick={() => setActiveTab("status")}
              >
                Statistics
              </button>
            </div>
          </div>

          {activeTab === "diary" ? (
            <Diary
              progress={currentBook.progress || []}
              totalPages={currentBook.totalPages}
              onDeleteEntry={handleDeleteEntry}
            />
          ) : (
            <Statistics
              currentProgressPage={
                currentBook.progress?.[currentBook.progress.length - 1]
                  ?.finishPage || 0
              }
              totalPages={currentBook.totalPages}
            />
          )}
        </div>
      </Dashboard>

      <section className={styles.myBookSection}>
        <h2 className={styles.sectionTitle}>My book</h2>
        <div className={styles.cardWrapper}>
          <img
            src={currentBook.imageUrl}
            alt={currentBook.title}
            className={styles.cover}
          />
          <h3 className={styles.bookTitle}>{currentBook.title}</h3>
          <p className={styles.bookAuthor}>{currentBook.author}</p>
          <div className={styles.statusIndicator}>
            <span
              className={
                isReadingActive ? styles.indicatorActive : styles.indicatorIdle
              }
            />
          </div>
        </div>
      </section>

       <Modal
          isOpen={isSuccessModalOpen}
          onClose={() => setIsSuccessModalOpen(false)}
        >
          <div className={styles.successModalContent}>
            <picture>
              <source srcSet='/images/books@1x.webp 1x, /images/books@2x.webp 2x' />
              <img
                src='/images/books.png'
                alt='Books'
                className={styles.successImage}
                width="68"
                height="68"
                loading="lazy"
              />
            </picture>

            <h3 className={styles.modalTitle}>The book is read</h3>
          <p className={styles.modalText}>
            It was an <span className={styles.highlightText}>exciting journey</span>, where each page revealed new horizons, and the characters became inseparable friends.
            </p>
          </div>
        </Modal>
    </div>
  );
};
