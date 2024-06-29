interface ButtonProps {
  onClick: () => void;
  open: boolean;
  label: string;
}

export default function Button({ onClick, open, label }: ButtonProps) {
  return (
    <div
      className="flex items-center justify-center w-auto px-4 min-h-7 rounded-lg cursor-pointer bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-800 shadow-lg shadow-blue-800/80"
      onClick={onClick}
    >
      <div className="flex flex-col items-center justify-center">
        <p className="text-sm text-white">
          <span className="font-semibold">{open ? "Cancel" : label }</span>
        </p>
      </div>
    </div>
  );
}
