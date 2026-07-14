

// src/pages/login/ui/LoginPage.tsx
import { useAppDispatch, useAppSelector } from '../../../shared/model/hooks';
import { toggleTheme } from '../../../features/theme/model/themeSlice';

export const LoginPage = () => {
  const dispatch = useAppDispatch();
  // Беремо поточну тему зі стору
  const currentTheme = useAppSelector((state) => state.theme.theme);

  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h1>Login Page (Заглушка)</h1>
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
  );
};