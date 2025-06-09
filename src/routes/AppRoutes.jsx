import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { ProtectedRoutes } from "./ProtectedRoutes";
import {Loading} from "../components/Loading";

const HomePage = lazy(() => import("../pages/dashboard/NoteDashboard"));
const LoginPage = lazy(() => import("../pages/auth/LoginPage"));
const ErrorPage = lazy(() => import("../pages/ErrorPage"));

const AppRoutes = () => {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <Suspense fallback={Loading}>
                        <LoginPage />
                    </Suspense>
                }
            />
            <Route
                path="/dashboard"
                element={
                    <ProtectedRoutes>
                        <Suspense fallback={Loading}>
                            <HomePage />
                        </Suspense>
                    </ProtectedRoutes>
                }
            />
            <Route
                path="*"
                element={
                    <Suspense fallback={Loading}>
                        <ErrorPage />
                    </Suspense>
                }
            />
        </Routes>
    );
};

export default AppRoutes;