import { createBrowserRouter } from "react-router-dom";
import { LazyDashboard, LazyClients, LazyDepartments, LazyVisit, LazyVisitRooms, LazyServices, LazyReferal, LazyRooms, LazyUsers } from "./lazy";
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
                 
                    {
                        path: "clients",
                        element: (
                            <Suspense>
                                <LazyClients />
                            </Suspense>
                        ),
                    },
                    {
                        path: "departments",
                        element: (
                            <Suspense>
                                <LazyDepartments />
                            </Suspense>
                        ),
                    },
                    {
                        path: "visit",
                        element: (
                            <Suspense>
                                <LazyVisit />
                            </Suspense>
                        ),
                    },
                    {
                        path: "visit-rooms",
                        element: (
                            <Suspense>
                                <LazyVisitRooms />
                            </Suspense>
                        ),
                    },
                    {
                        path: "services",
                        element: (
                            <Suspense>
                                <LazyServices />
                            </Suspense>
                        ),
                    },
                    {
                        path: "referal",
                        element: (
                            <Suspense>
                                <LazyReferal />
                            </Suspense>
                        ),
                    },
                    {
                        path: "rooms",
                        element: (
                            <Suspense>
                                <LazyRooms />
                            </Suspense>
                        ),
                    },
                    {
                        path: "users",
                        element: (
                            <Suspense>
                                <LazyUsers />
                            </Suspense>
                        ),
                    },
                ],
            },
        ],
    },
]);
