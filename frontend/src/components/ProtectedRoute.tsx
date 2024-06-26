import { Outlet, Navigate } from "react-router-dom";
import { useStore } from "../store/store";

const ProtectedRoute = () => {
  const { cia } = useStore((state) => state.session);

  if (!cia) return <Navigate to="login" />;

  return <Outlet />;
};

export default ProtectedRoute;
