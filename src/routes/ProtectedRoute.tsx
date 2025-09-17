import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { showNotification } from "@mantine/notifications";

// Dummy hook for user role, replace with real auth logic
function useUser() {
  // Example: get user from localStorage or context
  const user = JSON.parse(localStorage.getItem("user") || "null");
  return user;
}

export function ProtectedRoute({ allowedRole }: { allowedRole: string }) {
  const user = useUser();
  const location = useLocation();

  useEffect(() => {
    if (!user || user.role !== allowedRole) {
      showNotification({
        message: "Access denied. Only admin can access this page.",
        color: "green",
        position: "bottom-right",
      });
    }
  }, [user, allowedRole]);

  if (!user || user.role !== allowedRole) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return <Outlet />;
}
