import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom"
import { ROUTES } from "../../shared/routing/routes"
import { RegisterPage } from "../../pages/register/ui/RegisterPage";
import { LoginPage } from "../../pages/login/ui/LoginPage";
import { RecommendedPage } from "../../pages/recommended/ui/RecommendedPage";
import { LibraryPage } from "../../pages/library/ui/LibraryPage";
import { ReadingPage } from "../../pages/reading/ui/ReadingPage";

const MainLayout = () => {
    return (
       <div>
      <header style={{ padding: '20px', borderBottom: '1px solid var(--text-muted)' }}>
        [Тимчасовий Скелет Header: Logo | Nav | UserBar | Logout]
      </header>
      <main style={{ padding: '20px' }}>
        <Navigate to={ROUTES.RECOMMENDED} replace /> {/* Тимчасовий редірект з "/" */}
        {/* Оутлет — це місце, куди рендеритимуться дочірні сторінки */}
        <p>Основний контент сторінки:</p>
      </main>
    </div> 
    )
}

const router = createBrowserRouter([
  // Публічні маршрути
  {
    path: ROUTES.REGISTER,
    element: <RegisterPage />,
  },
  {
    path: ROUTES.LOGIN,
    element: <LoginPage />,
  },
  // Приватні маршрути (під Layout)
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: ROUTES.RECOMMENDED,
        element: <RecommendedPage />,
      },
      {
        path: ROUTES.LIBRARY,
        element: <LibraryPage />,
      },
      {
        path: ROUTES.READING,
        element: <ReadingPage />,
      },
    ],
  },
  // Дефолтний редірект для неіснуючих сторінок
  {
    path: '*',
    element: <Navigate to={ROUTES.LOGIN} replace />,
  },
]);

export const AppRouterProvider = () => {
  return <RouterProvider router={router} />;
};