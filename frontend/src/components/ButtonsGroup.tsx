import { useLocation } from "react-router-dom";
import LogOut from "../dashboard/components/LogOut";
import Upload from "../FilesSections/upload/Upload";
import { useRoutes } from "../hooks/useRoutes";
import ModalButton from "./ModalButton";
import AddCredential from "../InstanceSection/components/AddCredential";
import AddFCia from "../CiasSection/components/AddFCia";
import AddFProyecto from "../ProjectSection/components/AddFProject";

export default function ButtonsGroup() {
  const location = useLocation();
  const { credential, cia, proyecto } = useRoutes().params;

  if (location.pathname.startsWith("/credential/cia/proyecto") && proyecto) {
    return (
      <div className="flex-grow flex right-24 justify-end">
        <Upload />
      </div>
    );
  }

  if (location.pathname.startsWith("/credential/cia") && cia) {
    return (
      <div className="flex-grow flex right-24 justify-end">
        <AddFProyecto />
      </div>
    );
  }
  
  if (location.pathname.startsWith("/credential") && credential) {
    return (
      <div className="flex-grow flex right-24 justify-end">
        <AddFCia />
      </div>
    );
  }

  if (location.pathname === "/") {
    return (
      <div className="flex-grow flex right-24 justify-end">
        <AddCredential />
      </div>
    );
  }

  return (
    <div className="flex-grow flex right-24 justify-end">
      <Upload />
      <LogOut />
    </div>
  );
}
