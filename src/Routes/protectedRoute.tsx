// src/Routes/ProtectedRoute.tsx
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../app/store/store";

interface ProtectedRouteProps {
  allowedRoles: string[]; // e.g. ["admin"], ["user"], or ["admin", "user"]
  children: JSX.Element;
}

const ProtectedRoute = ({ allowedRoles, children }: ProtectedRouteProps) => {
  const { isLoggedIn, user } = useSelector((state: RootState) => state.auth);

  // Not logged in? Send to login
  if (!isLoggedIn || !user) {
    return <Navigate to="/login" replace />;
  }

  // Logged in but not authorized
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // ✅ Authorized
  return children;
};

export default ProtectedRoute;
