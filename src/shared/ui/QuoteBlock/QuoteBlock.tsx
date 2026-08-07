import styles from './QuoteBlock.module.css'

export const QuoteBlock = () => {
    return (
        <div className={styles.quoteCard}>
            <div className={styles.avatar}>📚</div>
            <p className={styles.text}>
                "Books are the quietest and most constant of friends; they are the most accessible and wisest of counselors, and the most patient of teachers."
            </p>

            <span className={styles.author}>- Benjamin Franklin</span>
        </div>
    )
}