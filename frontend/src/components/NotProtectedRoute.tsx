import { Navigate, Outlet } from "react-router-dom";
import { useStore } from "../store/store";

export default function NotProtectedRoute() {
  const cia = useStore((state) => state.session.cia);

  if (!cia) {
    return <Outlet />;
  }

  return <Navigate to="/dashboard" />;
}
