import { useStore } from "../../store/store";
import { Folder } from "../../components/FolderCard";
import { Navigate } from "react-router-dom";
import { useRoutes } from "../../hooks/useRoutes";
import Modal from "./Modal";

interface LogOutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cia: Folder | undefined;
  credential: Folder | undefined;
  onLogOut: () => void;
}

const LogOutModal = ({
  isOpen,
  onClose,
  cia,
  credential,
  onLogOut,
}: LogOutModalProps) => {
  if (!cia && isOpen) return <Navigate to="/credential" />;

  const setSession = useStore((state) => state.setSession);
  const { onCleanCia } = useRoutes();
  const signOut = () => {
    setSession({ cia: null });
    onCleanCia();
    onClose();
    onLogOut();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-2xl font-semibold text-center mb-4 text-white">
        Logout from <span className="font-bold">{cia?.name}</span> in{" "}
        <span className="font-bold">{credential?.name}</span>
      </h2>
      <h3 className="mb-2 text-white text-center">Are you sure?</h3>

      <button
        className="w-full bg-red-700 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        onClick={signOut}
      >
        Log out
      </button>
    </Modal>
  );
};

export default LogOutModal;
