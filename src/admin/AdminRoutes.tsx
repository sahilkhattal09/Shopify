// src/Routes/AdminRoute.tsx
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }: { children: JSX.Element }) => {
  const { isLoggedIn, user } = useSelector((state: any) => state.auth); // Access auth state

  if (!isLoggedIn || user?.role !== "admin") {
    return <Navigate to="/unauthorized" />; // Redirect if not logged in or not admin
  }

  return children; // Render the protected component if user is admin
};

export default AdminRoute;
