
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

  const handleNewView = () => {
    window.open(file.url.webViewLink, "_blank");
  };

  return (
    <div
      className="max-w-sm bg-gray-800 border border-gray-700 rounded-lg shadow"
      {...(file.type.includes("image") ? {} : { onClick: handleNewView })}
    >
      <div className="rounded-t-lg my-2 h-6 flex items-center">
        <h5 className="flex-grow mx-4 overflow-hidden text-ellipsis whitespace-nowrap text-base font-bold tracking-tight text-white">
          {file.filename}
        </h5>
        <DropDownCard key={file.codfile} id={file.codfile} />
      </div>
      <div
        className="max-w-sm h-24 mx-4 cursor-pointer"
        onClick={handleOpenModal}
      >
        <img
          className="rounded-lg object-cover w-full h-full"
          src={
            file.type.includes("image")
              ? file.url.thumbnailLink
              : "/icons/default-file-icon.png"
          }
          alt={file.filename}
        />
      </div>
      <div className="py-2 px-4">
        <p className="mb-3 font-normal text-sm text-gray-400">
          Creado el: {file.created_at}
        </p>
      </div>
      {file.type.includes("image") && (
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          content={file.url.thumbnailLink}
          type={file.type}
        />
      )}
    </div>
  );
}
