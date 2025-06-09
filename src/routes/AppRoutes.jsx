import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

const HomePage = lazy(() => import("../pages/dashboard/NoteDashboard"));
const LoginPage = lazy(() => import("../pages/auth/LoginPage"));
const ErrorPage = lazy(() => import("../pages/ErrorPage"));

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <LoginPage />
          </Suspense>
        }
      />
      <Route
        path="/dashboard"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <HomePage />
          </Suspense>
        }
      />
      <Route
        path="*"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <ErrorPage />
          </Suspense>
        }
      />
    </Routes>
  );
};

export default AppRoutes;