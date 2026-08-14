import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../shared/model/hooks';
import styles from './RecommendedPage.module.css';
import { Filters, type FiltersFormData } from '../../../features/filters';
import { fetchRecommendedBooks } from '../../../entities/book';
import { Dashboard } from '../../../widgets/Dashboard/Dashboard';
import { RecommendedGuide } from '../../../widgets/RecommendedGuide/ui/RecommendedGuide';
import { QuoteBlock } from '../../../shared/ui/QuoteBlock/QuoteBlock';
import { RecommendedBooks } from '../../../widgets/RecommendedBooks';

export const RecommendedPage = () => {
  const dispatch = useAppDispatch();
  const { books, totalPages } = useAppSelector((state) => state.books.recommended);

  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<FiltersFormData>({ title: '', author: '' });

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

  const handleApplyFilters = (data: FiltersFormData) => {
    setFilters(data);
    setPage(1);
  }

  return (
    <div className='container'>
      <div className={styles.wrapper}>
         <Dashboard>
          <div className={styles.dashboard}>
            <Filters onApplyFilters={handleApplyFilters} />
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