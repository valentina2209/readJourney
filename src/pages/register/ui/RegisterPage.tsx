import { Link } from 'react-router-dom';
import { RegisterForm } from '../../../features/auth/ui/RegisterForm/RegisterForm';
import styles from './RegisterPage.module.css';

export const RegisterPage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Expand your mind, reading <span className={styles.defColor}>a book</span></h1>
      <RegisterForm />
      <p className={styles.loginText}>
        Already have an account?
        <Link to="/login" className={styles.link}>
          Log in
        </Link>
      </p>
    </div>
  );
};