import { useAppSelector } from '@/shared/model/hooks';
import styles from './UserBar.module.css';

export const UserBar = () => {
    const user = useAppSelector((state) => state.auth.user);
    const userName = user?.name || 'User';
    const avatarLetter = userName.charAt(0).toUpperCase();

    return (
        <div className={styles.userBar}>
            <div className={styles.avatar}>{avatarLetter}</div>
            <span className={styles.name}>{userName}</span>
        </div>
    )
}