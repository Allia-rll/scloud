import { useStore } from "../store/store";
import LogOut from "./components/LogOut";
import Upload from "./upload/Upload";
import FilesSections from "./filesSection/FilesSections";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FileSchema } from "../types/models/files";

export default function Dashboard() {
  const cia = useStore((state) => state.session.cia);
  if (!cia) return <Navigate to="/login" />;

  const [files, setFiles] = useState<FileSchema[]>([]);

  useEffect(() => {
    fetch(`http://localhost:5050/api/v1/files/byOwner`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ idOwner: cia.codcia }),
    })
      .then((res) => res.json())
      .then((data) => {
        setFiles(data.data);
      })
      .catch((err) => console.error(err));
  }, [cia.codcia]);

  return (
    <div className="flex min-h-screen flex-col space-y-6 py-2 px-4 bg-gray-900">
      <main className="flex w-full flex-1 flex-col overflow-hidden">
        <div className="w-screen h-16 flex mt-4 text-white">
          <div className="w-1/4 h-max text-lg pl-6">
            <h3 className="font-bold">{cia?.descia}</h3>
          </div>
          <div className="flex-grow flex justify-center ">
            <h2 className="bg-gray-800 h-max py-2 px-6 rounded-lg font-bold text-xl">
              My Files
            </h2>
          </div>
          <div className="flex w-1/4 right-24 justify-end">
            <Upload />
            <LogOut />
          </div>
        </div>
        <FilesSections files={files} />
      </main>
    </div>
  );
}
