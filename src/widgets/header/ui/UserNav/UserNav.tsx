import { NavLink } from 'react-router-dom';
import styles from './UserNav.module.css'
import { ROUTES } from '../../../../shared/routing/routes';

interface UserNavProps {
    onItemClick?: () => void;
}

export const UserNav = ({ onItemClick }: UserNavProps) => {
    return (
        <nav className={styles.nav}>
            <NavLink
                to={ROUTES.RECOMMENDED}
                onClick={onItemClick}
                className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}
            >
                Home
            </NavLink>
            <NavLink
                to={ROUTES.LIBRARY}
                onClick={onItemClick}
                className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}
            >
                My Library
            </NavLink>
        </nav>
    )
}