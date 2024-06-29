import { useState } from "react";
import UploadZone from "./components/UploadZone";
import UploadButton from "./components/UploadButton";
import { FileInput } from "../../types/formsInterfaces/fileInput";
import UploadForm from "./components/UploadForm";
import { useStore } from "../../store/store";
import { Navigate } from "react-router-dom";

export default function Upload() {
  const cia = useStore((state) => state.session.cia);
  if (!cia) return <Navigate to="/" />;

  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const onFileUploaded = async (data: FileInput) => {
    const formData = new FormData();
    formData.append("file", file as File);
    formData.append("filename", data.filename);
    formData.append("codfpyto", "1");
    formData.append("description", data.description || "");
    formData.append("codfcia", "1");
    //INSERCION DE COD CRED rgb(255, 255, 255)
    formData.append("codcred", "1");

    const res = await fetch("http://localhost:5050/api/v1/files", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .catch((err) => console.error(err));

    console.log(res);

    setOpen(false);
    setFile(null);

    return <Navigate to="dashboard" />;
  };

  const onFileAdded = (file: File) => {
    setFile(file);
  };

  return (
    <div className="flex flex-col mr-10 flex-shrink-0 items-end">
      <UploadButton
        open={open}
        onClick={() => {
          setOpen(!open);
          setFile(null);
        }}
      />
      {open && (
        <div className="relative z-50 w-96 h-max mt-3">
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
