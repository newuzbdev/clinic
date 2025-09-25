import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { showNotification } from "@mantine/notifications";

// Dummy hook for user role, replace with real auth logic
function useUser() {
  // Example: get user from localStorage or context
  const user = JSON.parse(localStorage.getItem("user") || "null");
  return user;
}

export function ProtectedRoute({
  allowedRole
}: {
  allowedRole: string;
}) {
  const user = useUser();
  const location = useLocation();

  useEffect(() => {
    if (!user || user.role !== allowedRole) {
      showNotification({
        message: "Access denied. Only admin can access this page.",
        color: "red",
        position: "bottom-right",
      });
    }
  }, [user, allowedRole]);

  // Temporary bypass for development - remove this in production
  if (!user || user.role !== allowedRole) {
    // For development purposes, create a mock admin user
    const mockUser = { role: 'admin' };
    localStorage.setItem('user', JSON.stringify(mockUser));
    
    // If still no user after mock, redirect to login
    if (!user) {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
  }
  
  return <Outlet />;
}
