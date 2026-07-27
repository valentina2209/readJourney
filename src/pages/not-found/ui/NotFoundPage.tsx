import { Link } from "react-router-dom"
import styles from "./NotFoundPage.module.css"
import { Button } from "../../../shared/ui/button/Button"

export const NotFoundPage = () => {
    return (
        <div className={styles.container}>
            <span className={styles.code}>404</span>
            <h1 className={styles.title}>Page not found</h1>
            <p className={styles.description}>
                Sorry, the page you are looking for doesn't exist or has been moved.
            </p>
            <Link to="/" className={styles.homeBtn}>
                <Button variant="primary">Go to Home</Button>
            </Link>
        </div>
    )
}