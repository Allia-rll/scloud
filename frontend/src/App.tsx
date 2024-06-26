import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./auth/login/Login";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./dashboard/Dashboard";
import NotProtectedRoute from "./components/NotProtectedRoute";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route element={<NotProtectedRoute />}>
            <Route path="login" element={<Login />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path="dashboard" element={<Dashboard />} />
          </Route>

          <Route path="*" element={<Navigate to={"login"} />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
