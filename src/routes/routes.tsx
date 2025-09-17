import { createBrowserRouter } from "react-router-dom";
import { LazyDashboard } from "./lazy";
import { Suspense } from "../shared/suspense";

export const routes = createBrowserRouter([
    {
        path: '/',
        element: <Suspense>
            <LazyDashboard />
        </Suspense>,
    },
])
