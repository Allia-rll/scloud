import { useState } from "react";
import { FileSchema } from "../../types/models/files";
import DropDownCard from "./DropDownCard";
import Modal from "../../CiasSection/components/Modal";

interface FileCardProps {
  file: FileSchema;
}

export default function FileCard({ file }: FileCardProps) {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const openFileInNewTab = () => {
    window.open(file.url.webViewLink, "_blank");
    console.log("webViewLink", file.url.webViewLink);
  };

  const downloadFile = () => {
    window.open(file.url.webContentLink, "_blank");
    console.log("webContentLink", file.url.webContentLink);
  };

  /*   const deleteFile = () => {
    console.log("delete file")
  }
 */
  return (
    <div className="max-w-sm bg-gray-800 border border-gray-700 rounded-lg shadow">
      <div className="rounded-t-lg my-2 h-6 flex items-center">
        <h5 className="flex-grow mx-4 overflow-hidden text-ellipsis whitespace-nowrap text-base font-bold tracking-tight text-white">
          {file.filename}
        </h5>
        <DropDownCard
          key={file.codfile}
          openDetails={handleOpenModal}
          id={file.codfile}
          openInNewTab={openFileInNewTab}
          download={downloadFile}
        />
      </div>
      <div
        className="max-w-sm h-24 mx-4 cursor-pointer"
        onClick={openFileInNewTab}
      >
        <img
          className="rounded-lg object-cover w-full h-full"
          src={file.url.thumbnailLink ? file.url.thumbnailLink : "/icons/default-file-icon.png"}
          alt={file.filename}
        />
      </div>
      <div className="py-2 px-4">
        <p className="mb-3 font-normal text-sm text-gray-400">
          Creado el: {file.created_at}
        </p>
      </div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <div className="relative">
          <button
            className="absolute text-lg top-0 right-0 text-white"
            onClick={() => {
              handleCloseModal();
            }}
          >
            &times;
          </button>
          <h3 className="text-2xl font-bold text-white border-b border-gray-400 mb-4 pb-2">
            Detalles del Archivo
          </h3>
          <h3 className="text-base text-white">{`>     `}Nombre del Archivo</h3>
          <h2 className="text-xl font-bold text-white mb-2">{file.filename}</h2>
          <h3 className="text-base text-white">{`>     `}Descripción</h3>
          <p className="text-xl font-bold text-white mb-2">
            {file.description}
          </p>
          <h3 className="text-base text-white">{`>     `}Creado el</h3>
          <p className="text-xl font-bold text-white mb-2">{file.created_at}</p>
        </div>
      </Modal>
    </div>
  );
}
