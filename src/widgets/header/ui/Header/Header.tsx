import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAppDispatch } from '@/shared/model/hooks';
import { logoutThunk } from '@/features/auth/model/authThunk';
import { ROUTES } from '@/shared/routing/routes';
import { UserNav } from '../UserNav/UserNav';
import { UserBar } from '../UserBar/UserBar';
import { Button } from '@/shared/ui/button/Button';
import { ThemeToggle } from '@/shared/ui/ThemeToggle';
import styles from './Header.module.css';

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
      {/* Використовуємо глобальний container + внутрішній блок headerContent */}
      <div className="container">
        <div className={styles.headerContent}>
          {/* Logo */}
          <Link to={ROUTES.RECOMMENDED} className={styles.logoLink}>
            <svg className={styles.logoMobile}>
              <use href="/logo.svg" />
            </svg>
            <svg className={styles.logoDesktop}>
              <use href="/logo-full.svg" />
            </svg>
          </Link>

          {/* Навігація для Tablet/Desktop */}
          <div className={styles.desktopNav}>
            <UserNav />
          </div>

           {/* ThemeToggle для Tablet/Desktop */}
          <div className={styles.desktopThemeToggle}>
              <ThemeToggle />
          </div>
          
          {/* Права частина: UserBar + Logout + Бургер (Mobile) */}
          <div className={styles.userSection}>
            <UserBar />

           

            {/* Кнопка Log out для Tablet/Desktop */}
            <Button
              variant="outline"
              onClick={handleLogout}
              className={styles.desktopLogoutBtn}
            >
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
      </div>

      {/* Мобільне висувне меню (Overlay Drawer) */}
      {isMenuOpen && (
        <div className={styles.mobileOverlay}>
          <div className={styles.mobileMenu}>
            {/* Кнопка закриття меню */}
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

            {/* Нижня частина меню: ThemeToggle + Log out */}
            <div className={styles.mobileMenuFooter}>
              <div className={styles.mobileThemeToggle}>
                <ThemeToggle />
              </div>
              <Button
                variant="outline"
                onClick={handleLogout}
                className={styles.mobileLogoutBtn}
              >
                Log out
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};