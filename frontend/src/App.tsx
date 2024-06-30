import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import InstanceSection from "./InstanceSection/InstanceSection";
import CiaSection from "./CiasSection/CiaSection";
import ProjectSection from "./ProjectSection/ProjectSection";
import FilesSections from "./FilesSections/FilesSection";
import { useEffect } from "react";
import { useRoutes } from "./hooks/useRoutes";
import { useNavigate } from "react-router-dom";

function App() {
  const { credential, cia, proyecto } = useRoutes().params;
  const navigate = useNavigate();

  useEffect(() => {
    let route_0 = `/${
      credential
        ? `credential${cia ? `/cia${proyecto ? "/proyecto" : ""}` : ""} `
        : ""
    }`;
    navigate(route_0);
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
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
