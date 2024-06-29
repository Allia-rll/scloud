import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Upload from "../dashboard/upload/Upload";
import LogOut from "../dashboard/components/LogOut";
import { useParams, Navigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useState } from "react";
import FolderMenu from "./FolderMenu";
import { Credentials } from "../types/models/credentials";
import { useFCreds, useFPyto } from "../store/store";
import { Folder } from "./FolderCard";
import { useRoutes } from "../hooks/useRoutes";
import { Home } from "./Home";
import ButtonsGroup from "./ButtonsGroup";

const Layout = () => {
  const location = useLocation();
  const { credential, cia, proyecto } = useRoutes().params;
  const { changeCia } = useRoutes();
  const [openP, setOpenP] = useState(false);
  const navigate = useNavigate();
  const { credentials, setCredentials } = useFCreds((state) => state);
  const fproyectos = useFPyto((state) => state.proyectos);

  const { onChangeCredentials, changeProyecto, onHome } = useRoutes();

  //TODO HOME PAGE
  //TODO fetch de los proyectos por folder cia y credenciasles
  useEffect(() => {
    console.log(location);
    fetch("http://localhost:5050/api/v1/credentials")
      .then((res) => res.json())
      .then((data) => {
        const resul = data.data as Credentials[];
        console.log(resul);
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

  return (
    <div className="flex min-h-screen flex-col space-y-6 py-2 px-4 bg-gray-900">
      <main className="flex w-full flex-1 flex-col overflow-hidden">
        <div className="w-screen h-16 flex mt-4 text-white">
          {/* <div className="w-1/4 h-max text-lg pl-6">
            <h3 className="font-bold">Hola</h3>
          </div> */}
          <nav className="flex justify-between" aria-label="Breadcrumb">
            <ol className="inline-flex items-center mb-3 sm:mb-0">
              <Home onClick={onHome} />
              <span className="mx-2 text-gray-400">/</span>
              {location.pathname.startsWith("/credential") && credential && (
                <FolderMenu
                  selected={credential.name}
                  onClick={onChangeCredentials}
                  options={credentials}
                />
              )}

              {location.pathname.startsWith("/credential/cia") && cia && (
                <>
                  <li
                    aria-current="page"
                    onClick={() => {
                      changeCia(cia as Folder);
                    }}
                  >
                    <div className="flex items-center">
                      <h1
                        id="dropdownDatabase"
                        data-dropdown-toggle="dropdown-database"
                        className="inline-flex items-center px-3 py-2 text-sm font-normal text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-900 dark:hover:bg-gray-800 dark:text-white dark:focus:ring-gray-700"
                      >
                        <svg
                          className="w-3 h-3 me-2"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 16 20"
                        >
                          <path d="M8 5.625c4.418 0 8-1.063 8-2.375S12.418.875 8 .875 0 1.938 0 3.25s3.582 2.375 8 2.375Zm0 13.5c4.963 0 8-1.538 8-2.375v-4.019c-.052.029-.112.054-.165.082a8.08 8.08 0 0 1-.745.353c-.193.081-.394.158-.6.231l-.189.067c-2.04.628-4.165.936-6.3.911a20.601 20.601 0 0 1-6.3-.911l-.189-.067a10.719 10.719 0 0 1-.852-.34 8.08 8.08 0 0 1-.493-.244c-.053-.028-.113-.053-.165-.082v4.019C0 17.587 3.037 19.125 8 19.125Zm7.09-12.709c-.193.081-.394.158-.6.231l-.189.067a20.6 20.6 0 0 1-6.3.911 20.6 20.6 0 0 1-6.3-.911l-.189-.067a10.719 10.719 0 0 1-.852-.34 8.08 8.08 0 0 1-.493-.244C.112 6.035.052 6.01 0 5.981V10c0 .837 3.037 2.375 8 2.375s8-1.538 8-2.375V5.981c-.052.029-.112.054-.165.082a8.08 8.08 0 0 1-.745.353Z" />
                        </svg>
                        {cia.name}
                      </h1>
                    </div>
                  </li>
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
