import FolderCard, { Folder } from "./FolderCard";
import { v4 as uuidv4 } from 'uuid';

interface FolderSectionProps {
  folders: Folder[];
  onClick: (cod: Folder) => void;
  icon: string;
}

export default function FolderSection({
  folders,
  onClick,
  icon,
}: FolderSectionProps) {
  return (
    <div className="grid items-start gap-4 grid-cols-auto-fill-minmax-200px-1fr p-5">
      {folders.map((folder) => (
        <FolderCard
          key={uuidv4()}
          folder={folder}
          onClick={onClick}
          icon={icon}
        />
      ))}
    </div>
  );
}
