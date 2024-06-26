import { FileSchema } from "../../types/models/files";
import FileCard from "./components/FileCard";


interface FilesSectionsProps {
  files: FileSchema[];
}

export default function FilesSections({ files } : FilesSectionsProps) {

  return (
    <div className="grid items-start gap-4 grid-cols-auto-fill-minmax-200px-1fr p-5">
      {files.map((file) => (
        <FileCard key={file.codfile} file={file} />
      ))}
    </div>
  );
}
