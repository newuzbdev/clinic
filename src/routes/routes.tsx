import { createBrowserRouter } from "react-router-dom";
import { LazyDashboard } from "./lazy";
import { Suspense } from "../shared/suspense";
import { MainLayout } from "../shared/layout";

export const routes = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout children={undefined} />,
       children: [
            {
                index: true,
                element: <Suspense>
                    <LazyDashboard />
                </Suspense>,
            },
        ]
    },
])
