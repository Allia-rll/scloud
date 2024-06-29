import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./auth/login/Login";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./dashboard/Dashboard";
import NotProtectedRoute from "./components/NotProtectedRoute";
import InstanceSection from "./InstanceSection/InstanceSection";
import CiaSection from "./CiasSection/CiaSection";
import ProjectSection from "./ProjectSection/ProjectSection";
import FilesSections from "./FilesSections/FilesSection";

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

          <Route path="/" element={<InstanceSection />} />
          <Route path="/credential" element={<CiaSection />} />
          <Route path="/credential/cia" element={<ProjectSection />} />
          <Route path="/credential/cia/proyecto" element={<FilesSections />} />

          <Route path="*" element={<Navigate to={"/"} />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
