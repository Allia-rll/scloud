import { useState } from "react";
import UploadZone from "./components/UploadZone";
import UploadButton from "./components/UploadButton";
import { FileInput } from "../../types/formsInterfaces/fileInput";
import UploadForm from "./components/UploadForm";
import { useFiles, useStore } from "../../store/store";
import { Navigate } from "react-router-dom";
import { useRoutes } from "../../hooks/useRoutes";

export default function Upload() {
  const cia = useStore((state) => state.session.cia);
  if (!cia) return <Navigate to="/" />;
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const updtFile = useFiles((state) => state.updateFiles);
  const { params } = useRoutes();

  const onFileUploaded = async (data: FileInput) => {
    const formData = new FormData();
    formData.append("file", file as File);
    formData.append("filename", data.filename);
    formData.append("codfpyto", params.proyecto?.cod.toString() || "");
    formData.append("description", data.description || "");
    formData.append("codfcia", params.cia?.cod.toString() || "");
    //INSERCION DE COD CRED rgb(255, 255, 255)
    formData.append("codcred", params.credential?.cod.toString() || "");

    const res = await fetch("http://localhost:5050/api/v1/files", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .catch((err) => console.error(err));

    
    if(!res.success) {
      setError(res.message);
      return;
    };
    console.log("NEW FILE");
    console.log(res);
    setOpen(false);
    updtFile(res.data);
    setFile(null);
  };

  const onFileAdded = (file: File) => {
    setFile(file);
  };

  return (
    <div className="flex flex-col mr-10  flex-shrink-0 items-end">
      <UploadButton
        open={open}
        onClick={() => {
          setOpen(!open);
          setFile(null);
        }}
      />
      {open && (
        <div className="relative z-50 w-96 h-max mt-3">
          {error && (
            <div className="bg-red-500 text-white p-2 rounded-lg mb-2">
              {error}
            </div>
          )}
          {file === null ? (
            <UploadZone onFileAdded={onFileAdded} />
          ) : (
            <UploadForm onFileUploaded={onFileUploaded} file={file} />
          )}
        </div>
      )}
    </div>
  );
}
