import FolderSection from "../components/FolderSection";
import { useFCia, useRouter } from "../store/store";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Folder } from "../components/FolderCard";
import { FCia } from "../types/models/fcia";
import LoginModal from "./components/LoginModal";

export default function CiaSection() {
  const { params } = useRouter((state) => state);
  const navigate = useNavigate();
  const {fcias, setFCias} = useFCia((state) => state);
  const [open, setOpen] = useState(false);
  const [ciaSelected, setCiaSelected] = useState<Folder | null>(null);

  const handleOpenModal = (folder: Folder) => {
    setCiaSelected(folder);
    setOpen(true);
  };

  useEffect(() => {
    if (!params.credential) {
      navigate("/");
    }

    fetch(`http://localhost:5050/api/v1/credentials/validate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ codcred: params.credential?.cod }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.data === false) {
          navigate("/");
        } else {
          fetch(`http://localhost:5050/api/v1/foldercia`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ codcred: params.credential?.cod }),
          })
            .then((res) => res.json())
            .then((data) => {
              const result = data.data as FCia[];
              const formarted = result.map((f) => {
                return {
                  cod: f.codfcia,
                  name: f.namefcia,
                } as Folder;
              }) as Folder[];
              setFCias(formarted);
            });
        }
      });
  }, [params.credential]);

  return (
    <>
      <FolderSection folders={fcias} onClick={handleOpenModal} icon="/icons/default-cia-icon.png" />
      <LoginModal
        isOpen={open}
        onClose={() => setOpen(false)}
        cia={ciaSelected}
      />
    </>
  );
}
