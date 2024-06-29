import { Proyecto } from "../../types/models/proyecto";

interface DropdownOptionsProps {
  onClick: (value: string) => void;
  data: Proyecto[];
}

export default function DropdownOptions({
  onClick,
  data,
}: DropdownOptionsProps) {
  return (
    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
      {data?.map((dato) => (
        <li key={dato.codpyto} onClick={() => onClick(dato.nombpyto)}>
          <p className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
            {dato.nombpyto}
          </p>
        </li>
      ))}
    </ul>
  );
}
