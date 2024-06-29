import { Cia } from "../../types/models/cia";

interface DropdownOptionsProps {
  onClick: (value: string) => void;
  data: Cia[];
}

export default function DropdownOptions({
  onClick,
  data,
}: DropdownOptionsProps) {
  return (
    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
      {data?.map((dato) => (
        <li key={dato.codcia} onClick={() => onClick(dato.descia)}>
          <p className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
            {dato.descia}
          </p>
        </li>
      ))}
    </ul>
  );
}
