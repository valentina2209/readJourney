import { useAppDispatch, useAppSelector } from '../../../shared/model/hooks';
import { toggleTheme } from '../../../features/theme/model/themeSlice';
import styles from "./LoginPage.module.css"
import { LoginForm } from '../../../features/auth/ui/LoginForm/LoginForm';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../shared/routing/routes';

export const LoginPage = () => {
  const dispatch = useAppDispatch();
  // Беремо поточну тему зі стору
  const currentTheme = useAppSelector((state) => state.theme.theme);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Expand your mind, reading a book</h1>
      <LoginForm />
      <p className={styles.registerText}>
        Don’t have an account?
        <Link to={ROUTES.REGISTER} className={styles.link}>
          Register
        </Link>
      </p>
      <div style={{ padding: '40px', textAlign: 'center' }}>
      
      <p>Поточна тема у Redux: <strong>{currentTheme}</strong></p>
      
      <button 
        onClick={() => dispatch(toggleTheme())}
        style={{
          padding: '10px 20px',
          backgroundColor: 'var(--text-main)',
          color: 'var(--background-color)',
          borderRadius: '5px',
          marginTop: '20px'
        }}
      >
        Змінити тему
      </button>
    </div>

    </div>
    
  );
};