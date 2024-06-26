
import { useState } from "react";
import { FileSchema } from "../../../types/models/files";
import DropDownCard from "./DropDownCard";
import Modal from "./Modal";

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
    console.log("webViewLink", file.url.webViewLink)
  };
  
  const downloadFile = () => {
    window.open(file.url.webContentLink, "_blank");
    console.log("webContentLink", file.url.webContentLink)
  }

  const deleteFile = () => {
    console.log("delete file")
  }

  return (
    <div
      className="max-w-sm bg-gray-800 border border-gray-700 rounded-lg shadow" 
    >
      <div className="rounded-t-lg my-2 h-6 flex items-center">
        <h5 className="flex-grow mx-4 overflow-hidden text-ellipsis whitespace-nowrap text-base font-bold tracking-tight text-white">
          {file.filename}
        </h5>
        <DropDownCard key={file.codfile} id={file.codfile} openInNewTab={openFileInNewTab} download={downloadFile} />
      </div>
      <div
        className="max-w-sm h-24 mx-4 cursor-pointer"
        onClick={openFileInNewTab}
      >
        <img
          className="rounded-lg object-cover w-full h-full"
          src={file.url.thumbnailLink}
          alt={file.filename}
        />
      </div>
      <div className="py-2 px-4">
        <p className="mb-3 font-normal text-sm text-gray-400">
          Creado el: {file.created_at}
        </p>
      </div>
      <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          content={file.url.webContentLink}
          type={file.type}
        />
    </div>
  );
}
