
import { lazy } from "react";

export const LazyDashboard = lazy(() => import("../pages/dashboard/dashboard.tsx"));
export const LazyClients = lazy(() => import("../pages/clients/clients.tsx"));
export const LazyDepartments = lazy(() => import("../pages/departament/departament.tsx"));
export const LazyVisit = lazy(() => import("../pages/visit/visit.tsx"));
export const LazyVisitRooms = lazy(() => import("../pages/visit-room/visit-room.tsx"));
export const LazyServices = lazy(() => import("../pages/service/service.tsx"));
export const LazyReferal = lazy(() => import("../pages/referal/referal.tsx"));
export const LazyRooms = lazy(() => import("../pages/rooms/rooms.tsx"));
export const LazyUsers = lazy(() => import("../pages/users/users.tsx"));
