import { RegisterForm } from '@/features/auth/ui/RegisterForm/RegisterForm';
import { AuthLayout } from '@/widgets/AuthLayout/AuthLayout';
import styles from '../../login/ui/LoginPage.module.css';

export const RegisterPage = () => {
  return (
    <div className="container">
      <AuthLayout
        title={
          <>
            Expand your mind, reading <span className={styles.titleHighlight}>a book</span>
          </>
        }
      >
        <RegisterForm />
      </AuthLayout>
    </div>
  );
};