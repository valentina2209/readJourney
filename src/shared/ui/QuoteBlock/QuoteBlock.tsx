import styles from './QuoteBlock.module.css'

export const QuoteBlock = () => {
    return (
        <div className={styles.quoteCard}>
            <picture className={styles.picture}>
                <img
                    src="/images/books@1x.webp"
                    alt="Books"
                    className={styles.booksImage}
                />
            </picture>
            <p className={styles.text}>
                "Books are <span className={styles.highlight}>windows </span>
                 to the world, and reading is a journey into the unknown."
            </p> 
        </div>
    )
}