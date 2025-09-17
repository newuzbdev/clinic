import { createBrowserRouter } from "react-router-dom";
import { LazyDashboard } from "./lazy";
import { Suspense } from "../shared/suspense";
import { MainLayout } from "../shared/layout";
import Login from "../pages/login/login";
import { ProtectedRoute } from "./ProtectedRoute";

export const routes = createBrowserRouter([
    {
        path: "/login",
        element: (
            <Suspense>
                <Login />
            </Suspense>
        ),
    },

    {
        element: <ProtectedRoute allowedRole="admin" />, // all below are protected
        children: [
            {
                path: "/",
                element: <MainLayout children={undefined} />,
                children: [
                    {
                        index: true,
                        element: (
                            <Suspense>
                                <LazyDashboard />
                            </Suspense>
                        ),
                    },
                ],
            },
        ],
    },
]);
