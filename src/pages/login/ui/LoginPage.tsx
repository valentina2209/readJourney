import { LoginForm } from '@/features/auth/ui/LoginForm/LoginForm';
import { AuthLayout } from '@/widgets/AuthLayout/AuthLayout';
import styles from "./LoginPage.module.css"


export const LoginPage = () => {
  return (
    <div className="container">
      <AuthLayout
        title={
          <>
            Expand your mind, reading <span className={styles.titleHighlight}>a book</span>
          </>
        }
      >
        <LoginForm />
      </AuthLayout>
    </div>
  );
};