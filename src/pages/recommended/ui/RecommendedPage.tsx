import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/shared/model/hooks';
import { fetchRecommendedBooks } from '@/entities/book';
import { Dashboard } from '@/widgets/Dashboard/Dashboard';
import { RecommendedGuide } from '@/widgets/RecommendedGuide/ui/RecommendedGuide';
import { QuoteBlock } from '@/shared/ui/QuoteBlock/QuoteBlock';
import { RecommendedBooks } from '@/widgets/RecommendedBooks';
import { BookForm, BookFormValues } from '@/features/bookForm';

import styles from './RecommendedPage.module.css'

export const RecommendedPage = () => {
  const dispatch = useAppDispatch();
  const { books, totalPages } = useAppSelector((state) => state.books.recommended);

  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<BookFormValues>({ title: '', author: '' });

  useEffect(() => {
    dispatch(
      fetchRecommendedBooks({
        page,
        limit: 10,
        title: filters.title,
        author: filters.author,
      })
    )
  }, [dispatch, page, filters])

  const handleApplyFilters = (data: BookFormValues) => {
    setFilters(data);
    setPage(1);
  }

  return (
    <div className='container'>
      <div className={styles.wrapper}>
         <Dashboard>
          <div className={styles.dashboard}>
            <BookForm mode='filter' onFilterSubmit={handleApplyFilters} />
            <RecommendedGuide />
            <QuoteBlock />
          </div>
        </Dashboard> 
      
        <div className={styles.recommendedSection}>
          <RecommendedBooks 
            books={books}
            page={page}
            totalPages={totalPages}
            onPageChange={(newPage) => setPage(newPage)}
          />
        </div>
      </div>
    </div>
  );
};