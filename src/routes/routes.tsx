import { createBrowserRouter } from "react-router-dom";
import { LazyDashboard } from "./lazy";
import { Suspense } from "../shared/suspense";
import { MainLayout } from "../shared/layout";
import Login from "../pages/login/login";

export const routes = createBrowserRouter([
    {
        path: '/login',
        element: (
            <Suspense>
                <Login />
            </Suspense>
        )
    },
    
    {
        path: '/',
        element: <MainLayout children={undefined} />,
        children: [
            {
                index: true,
                element:
                 <Suspense>
                      <LazyDashboard />
                </Suspense>,
            },
        ]
    },
])
