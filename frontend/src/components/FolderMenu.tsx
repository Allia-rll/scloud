import { useEffect, useRef, useState } from "react";
import { Folder } from "./FolderCard";
import { v4 as uuidv4 } from "uuid";

interface FolderMenuProps {
  selected: string;
  onClick: (selected: Folder) => void;
  options: Folder[];
}

export default function FolderMenu({
  selected,
  onClick,
  options,
}: FolderMenuProps) {
  const [openI, setOpenI] = useState(false);
  const imenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        imenuRef.current &&
        !imenuRef.current.contains(event.target as Node)
      ) {
        setOpenI(false);
      }
    };

    if (openI) {
      document.body.style.overflow = "hidden";
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.body.style.overflow = "unset";
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openI]);

  return (
    <>
      <li>
        <div className="flex-shrink-0 items-center">
          <button
            id="dropdownProject"
            data-dropdown-toggle="dropdown-project"
            className="inline-flex items-center px-3 py-2 text-sm font-normal text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-900 dark:hover:bg-gray-800 dark:text-white dark:focus:ring-gray-700"
            onClick={() => {
              setOpenI(!openI);
            }}
          >
            <svg
              className="w-3 h-3 me-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 16 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm9-10v.4A3.6 3.6 0 0 1 8.4 9H6.61A3.6 3.6 0 0 0 3 12.605M14.458 3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"
              />
            </svg>
            {selected}
            <svg
              className="w-2.5 h-2.5 ms-2.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>
          <div
            id="dropdown-project"
            className={`z-10 ${
              openI ? "absolute" : "hidden"
            } bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}
            ref={imenuRef}
          >
            <ul
              className="py-2 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdownDefault"
            >
              {options.length <= 0 ? (
                <li className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                  There's no more options
                </li>
              ) : (
                options.map((option) => (
                  <li
                    onClick={() => {
                      onClick(option);
                      setOpenI(false);
                    }}
                    key={uuidv4()}
                  >
                    <a className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                      {option.name}
                    </a>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      </li>
      <span className="mx-2 text-gray-400">/</span>
    </>
  );
}
