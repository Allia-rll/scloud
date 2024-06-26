import { Proyecto } from "../../../types/models/proyecto";

interface DropdownOptionsProps {
  onClick: (value: string) => void;
  projects: Proyecto[];
}

export default function DropdownOptions({
  onClick,
  projects,
}: DropdownOptionsProps) {
  return (
    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
      {projects?.map((project) => (
        <li
          key={project.codpyto}
          onClick={() => onClick(project.nombpyto)}
        >
          <p className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
            {project.nombpyto}
          </p>
        </li>
      ))}
    </ul>
  );
}
