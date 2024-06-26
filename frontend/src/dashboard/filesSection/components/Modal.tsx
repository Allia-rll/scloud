"use client";

import { useEffect, useRef } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: string;
  type: string;
}

const Modal = ({ isOpen, onClose, content, type }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  console.log(content);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.body.style.overflow = "unset";
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div ref={modalRef} className="bg-white rounded-lg shadow-lg max-w-2xl w-full p-4 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-black font-bold"
        >
          &times;
        </button>
        {type.includes("image") ? (
          <img
            src={content}
            alt="Preview"
            className="w-full h-auto object-contain"
          />
        ) : (
          <iframe
            src={content}
            title="PDF Preview"
            className="w-full h-[75vh]"
          ></iframe>
        )}
      </div>
    </div>
  );
};

export default Modal;
