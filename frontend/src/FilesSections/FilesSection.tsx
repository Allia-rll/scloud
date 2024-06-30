import { useEffect } from "react";
import { FileSchema } from "../types/models/files";
import FileCard from "./components/FileCard";
import { useFiles, useRouter } from "../store/store";
import { useNavigate } from "react-router-dom";

export default function FilesSections() {
  const { files, setFiles } = useFiles((state) => state);
  const { params } = useRouter((state) => state);
  const navigate = useNavigate();

  useEffect(() => {
    if (!params.credential || !params.cia || !params.proyecto) {
      navigate("/");
    }

    fetch(`http://localhost:5050/api/v1/folderpyto/validate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        codcred: params.credential?.cod,
        codfcia: params.cia?.cod,
        codfpyto: params.proyecto?.cod,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.data === false) {
          navigate("/");
        } else {
          fetch(`http://localhost:5050/api/v1/files/byfpyto`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              codcred: params.credential?.cod,
              codfcia: params.cia?.cod,
              codfpyto: params.proyecto?.cod,
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              const result = data.data as FileSchema[];
              setFiles(result);
            });
        }
      });
  }, []);

  return (
    <div className="grid items-start gap-4 grid-cols-auto-fill-minmax-200px-1fr p-5">
      {files.map((file) => (
        <FileCard key={file.codfile} file={file} />
      ))}
    </div>
  );
}
