"use client";
import React from "react";
import { useState } from "react";

export default function DropDownCard({ id }: { id: number }) {
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => {
        setIsOpen(!isOpen);
    };

  return (
    <div className="flex-shrink-0 mx-2 relative">
      <button
        id={`dropdownButton-${id}`}
        className="inline-block text-gray-400 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-700 rounded-lg text-sm p-1.5"
        type="button"
        onClick={handleClick}
      >
        <span className="sr-only">Open dropdown</span>
        <svg
          className="w-5 h-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 16 3"
        >
          <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
        </svg>
      </button>
      <div
        id={`dropdown-${id}`}
        className={`z-10 fixed ${!isOpen && "hidden"} text-base list-none bg-gray-700 divide-y divide-gray-100 rounded-lg shadow w-44`}
      >
        <ul className="py-2" aria-labelledby={`dropdownButton-${id}`}>
          <li>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-600 hover:text-white"
            >
              Edit
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-600 hover:text-white"
            >
              Export Data
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-600 hover:text-white"
            >
              Delete
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
