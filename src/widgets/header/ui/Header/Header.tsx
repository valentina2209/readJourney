import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAppDispatch } from '../../../../shared/model/hooks';
import { logoutThunk } from '../../../../features/auth/model/authThunk';
import { ROUTES } from '../../../../shared/routing/routes';
import { UserNav } from '../UserNav/UserNav';
import { UserBar } from '../UserBar/UserBar';
import { Button } from '../../../../shared/ui/button/Button';
import styles from './Header.module.css';
import { ThemeToggle } from '../../../../shared/ui/ThemeToggle';

export const Header = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    await dispatch(logoutThunk());
    navigate(ROUTES.LOGIN);
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Logo */}
        <Link to={ROUTES.RECOMMENDED} className={styles.logoLink}>
          <picture>
            <source media="(min-width: 768px)" srcSet="/public/images/logodes.png" />
            <img 
              src="/public/images/logomob.png" 
              alt="Read Journey Logo" 
              className={styles.logoImg}
            />
          </picture>
        </Link>

        <ThemeToggle />

        {/* Навігація для Tablet/Desktop */}
        <div className={styles.desktopNav}>
          <UserNav />
        </div>

        {/* Права частина: UserBar + Logout (для Tablet/Desktop) + Бургер (Mobile) */}
        <div className={styles.userSection}>
          <UserBar />

          {/* Кнопка Log out для Планшета й Десктопа */}
          <Button variant="outline" onClick={handleLogout} className={styles.desktopLogoutBtn}>
            Log out
          </Button>

          {/* Кнопка відкриття бургер-меню (Тільки Mobile) */}
          <button
            type="button"
            className={styles.burgerBtn}
            onClick={toggleMenu}
            aria-label="Open menu"
          >
            <svg className={styles.burgerIcon}>
              <use href="/icons.svg#icon-burger" />
            </svg>
          </button>
        </div>
      </div>

      {/* Мобільне висувне меню (Overlay Drawer) */}
      {isMenuOpen && (
        <div className={styles.mobileOverlay}>
          <div className={styles.mobileMenu}>
            {/* Кнопка закриття меню (Хрестик у правому верхньому кутку) */}
            <button
              type="button"
              className={styles.closeBtn}
              onClick={toggleMenu}
              aria-label="Close menu"
            >
              <svg className={styles.closeIcon}>
                <use href="/icons.svg#icon-close" />
              </svg>
            </button>

            {/* Навігація по центру */}
            <div className={styles.mobileNavWrapper}>
              <UserNav onItemClick={() => setIsMenuOpen(false)} />
            </div>

            {/* Кнопка Log out внизу */}
            <Button variant="outline" onClick={handleLogout} className={styles.mobileLogoutBtn}>
              Log out
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};