import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import FolderMenu from "./FolderMenu";
import { Credentials } from "../types/models/credentials";
import { useFCreds, useFPyto } from "../store/store";
import { Folder } from "./FolderCard";
import { useRoutes } from "../hooks/useRoutes";
import { Home } from "./Home";
import ButtonsGroup from "./ButtonsGroup";
import TextMenu from "./TextMenu";
import LogOutModal from "../CiasSection/components/LogOutModal";

const Layout = () => {
  const location = useLocation();
  const { credential, cia, proyecto } = useRoutes().params;
  const { changeCia } = useRoutes();
  const { credentials, setCredentials } = useFCreds((state) => state);
  const fproyectos = useFPyto((state) => state.proyectos);
  const { onChangeCredentials, changeProyecto, onHome } = useRoutes();

  const [isLogOut, setIsLogOut] = useState(false);
  const [to, setTo] = useState<Folder | null>();

  //TODO HOME PAGE
  //TODO fetch de los proyectos por folder cia y credenciasles
  useEffect(() => {
    fetch("http://localhost:5050/api/v1/credentials")
      .then((res) => res.json())
      .then((data) => {
        const resul = data.data as Credentials[];
        const options = resul.map((cred) => {
          return {
            cod: cred.codcred,
            name: cred.namecreds,
          } as Folder;
        });
        setCredentials(options);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleChangeCredential = (to: Folder) => {
    setTo(to);
    setIsLogOut(true);
  };

  const handleGoHome = () => {
    setTo(null);
    setIsLogOut(true);
  };

  return (
    <div className="flex min-h-screen flex-col space-y-6 py-2 px-4 bg-gray-900">
      <main className="flex w-full flex-1 flex-col overflow-hidden">
        <div className="w-screen h-16 flex mt-4 text-white">
          <nav className="flex justify-between" aria-label="Breadcrumb">
            <ol className="inline-flex items-center mb-3 sm:mb-0">
              <Home
                onClick={
                  location.pathname.startsWith("/credential/cia")
                    ? handleGoHome
                    : onHome
                }
              />
              <span className="mx-2 text-gray-400">/</span>
              {location.pathname.startsWith("/credential") && credential && (
                <>
                  <FolderMenu
                    selected={credential.name}
                    onClick={location.pathname.startsWith("/credential/cia")
                      ? handleChangeCredential
                      : onChangeCredentials}
                    options={credentials}
                  />
                  <LogOutModal
                    isOpen={isLogOut}
                    onClose={() => setIsLogOut(false)}
                    cia={cia}
                    credential={credential}
                    onLogOut={
                      to
                        ? () => {
                            onChangeCredentials(to as Folder);
                          }
                        : onHome
                    }
                  />
                </>
              )}
              {location.pathname.startsWith("/credential/cia") && cia && (
                <>
                  <TextMenu element={cia} onClick={changeCia} />
                  <span className="mx-2 text-gray-400">/</span>
                </>
              )}
              {location.pathname.startsWith("/credential/cia/proyecto") &&
                proyecto && (
                  <FolderMenu
                    selected={proyecto.name}
                    onClick={changeProyecto}
                    options={fproyectos}
                  />
                )}
            </ol>
          </nav>
          <ButtonsGroup />
        </div>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
