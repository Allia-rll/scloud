import Button from "./Button";

interface ModalButtonProps {
  open: boolean;
  label: string;
  onClick: () => void;
  children?: React.ReactNode;
}

export default function ModalButton({
  open,
  onClick,
  label,
  children,
}: ModalButtonProps) {

  return (
    <div className="flex flex-col  flex-shrink-0 items-end mr-10">
      <Button
        open={open}
        onClick={onClick}
        label={label}
      />
      {open && <div className="relative z-50 w-96 h-max mt-3">{children}</div>}
    </div>
  );
}
