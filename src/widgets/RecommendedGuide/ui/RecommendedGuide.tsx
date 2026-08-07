import { Link } from 'react-router-dom'
import styles from './RecommendedGuide.module.css'

export const RecommendedGuide = () => {
    return (
        <div className={styles.container}>
            <h3 className={styles.title}>Start your workout</h3>
            <ol className={styles.list}>
                <li>
                    <span className={styles.step}>1</span>
                    <p>Create a personal library: add the books you intend to read to it.</p>
                </li>
                <li>
                    <span className={styles.step}>2</span>
                    <p>Create your first workout: define a goal, choose a period, start training.</p>
                </li>
            </ol>
            
            <Link to="/library" className={styles.link}>
                My library
                <svg className={styles.icon}>
                    <use href="/icons.svg#icon-arrow" />
                </svg>
            </Link>
        </div>
    )
}