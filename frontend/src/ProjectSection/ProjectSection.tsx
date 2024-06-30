import { useEffect } from "react";
import { useFPyto, useRouter } from "../store/store";
import { useNavigate } from "react-router-dom";
import { FProyecto } from "../types/models/fproyecto";
import { Folder } from "../components/FolderCard";
import FolderSection from "../components/FolderSection";
import { useRoutes } from "../hooks/useRoutes";

export default function ProjectSection() {
  const { params } = useRouter((state) => state);
  const { changeProyecto } = useRoutes();
  const navigate = useNavigate();
  const { proyectos, setProyectos} = useFPyto((state) => state);

  useEffect(() => {
    if (!params.credential || !params.cia) {
      navigate("/");
    }

    fetch(`http://localhost:5050/api/v1/foldercia/validate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        codcred: params.credential?.cod,
        codfcia: params.cia?.cod,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.data === false) {
          navigate("/");
        } else {
          fetch(`http://localhost:5050/api/v1/folderpyto`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ codfcia: params.cia?.cod }),
          })
            .then((res) => res.json())
            .then((data) => {
              const result = data.data as FProyecto[];
              console.log(result);
              const formarted = result.map((f) => {
                return {
                  cod: f.codfproyecto,
                  name: f.namefproyecto,
                } as Folder;
              }) as Folder[];
              setProyectos(formarted);
            });
        }
      });
  }, [params.cia]);

  return (
    <FolderSection folders={proyectos} icon="/icons/default-pyto-icon.png" onClick={changeProyecto} />
  );
}
