import { createBrowserRouter, Navigate, Outlet, RouterProvider } from "react-router-dom"
import { ROUTES } from "@/shared/routing/routes"
import { RegisterPage } from "@/pages/register/ui/RegisterPage";
import { LoginPage } from "@/pages/login/ui/LoginPage";
import { RecommendedPage } from "@/pages/recommended/ui/RecommendedPage";
import { LibraryPage } from "@/pages/library/ui/LibraryPage";
import { ReadingPage } from "@/pages/reading/ui/ReadingPage";
import { NotFoundPage } from "@/pages/not-found";
import { Header } from "@/widgets/header";

const MainLayout = () => {
  return (
    <div className="container">
      <Header />
      <main>
          <Outlet />
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
        index: true,
        element: <Navigate to={ROUTES.RECOMMENDED} replace />,
      },
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

  {
    path: '*',
    element: <NotFoundPage />,
  },
]);

export const AppRouterProvider = () => {
  return <RouterProvider router={router} />;
};