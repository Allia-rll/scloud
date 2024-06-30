
export interface Folder {
  name: string;
  cod: number;
}

export interface FolderCardProps {
  folder: Folder;
  onClick: (cod: Folder) => void;
  icon: string;
}

export default function FolderCard({ folder, onClick, icon }: FolderCardProps) {
  return (
    <div className="max-w-sm bg-gray-800 border border-gray-700 rounded-lg shadow">
      <div className="rounded-t-lg my-2 h-6 flex items-center">
        <h5 className="flex-grow mx-4 overflow-hidden text-ellipsis whitespace-nowrap text-base font-bold tracking-tight text-white">
          {folder.name}
        </h5>
      </div>
      <div
        className="max-w-sm h-24 mx-4 cursor-pointer"
        onClick={() => onClick(folder)}
      >
        <img
          className="rounded-lg object-contain pb-4 w-full h-full"
          src={icon}
          alt={folder.name}
        />
      </div>
    </div>
  );
}
