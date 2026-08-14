import { Link } from 'react-router-dom'
import styles from './RecommendedGuide.module.css'
import { ROUTES } from '@/shared/routing/routes'

export const RecommendedGuide = () => {
    return (
       
            <div className={styles.card}>
                <h3 className={styles.title}>Start your workout</h3> 
                <ol className={styles.list}>
                    <li className={styles.listItem}>
                        <div className={styles.numberBadge}>1</div>
                        <p className={styles.text}>
                            <span className={styles.textHighlight}>
                                Create a personal library:
                            </span>
                             add the books you intend to read to it.
                        </p>
                    </li>
                
                    <li className={styles.listItem}>
                        <div className={styles.numberBadge}>2</div>
                        <p className={styles.text}>
                            <span className={styles.textHighlight}>
                               Create your first workout: 
                            </span>
                             define a goal, choose a period, start training.
                        </p>
                    </li>
                </ol>
            
                <div className={styles.linkWrapper}>
                   <Link to={ROUTES.LIBRARY || '/library'} className={styles.link}>
                        <span className={styles.libraryText}>My library</span>
                        <svg className={styles.icon}>
                            <use href="/icons.svg#icon-arrow" />
                        </svg>
                    </Link> 
                </div>
            
            </div>
            
           
      
    )
}