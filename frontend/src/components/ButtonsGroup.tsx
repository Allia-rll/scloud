import { useLocation } from "react-router-dom";
import Upload from "../FilesSections/upload/Upload";
import { useRoutes } from "../hooks/useRoutes";
import AddCredential from "../InstanceSection/components/AddCredential";
import AddFCia from "../CiasSection/components/AddFCia";
import AddFProyecto from "../ProjectSection/components/AddFProject";
import LogOut from "../CiasSection/components/LogOut";

export default function ButtonsGroup() {
  const location = useLocation();
  const { credential, cia, proyecto } = useRoutes().params;

  if (location.pathname.startsWith("/credential/cia/proyecto") && proyecto) {
    return (
      <div className="flex-grow flex right-24 justify-end">
        <Upload />
        <LogOut />
      </div>
    );
  }

  if (location.pathname.startsWith("/credential/cia") && cia) {
    return (
      <div className="flex-grow flex right-24 justify-end">
        <AddFProyecto />
        <LogOut />
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
    <></>
  );
}
