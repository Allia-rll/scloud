import { useNavigate } from "react-router-dom";
import { Folder } from "../components/FolderCard";
import { useRouter } from "../store/store";

export const useRoutes = () => {
  const navigate = useNavigate();
  const { params, setpCred, setpCia, setpProyecto, clean, cleanCia } =
    useRouter((state) => state);

  //Logout and move to a different credential
  const onChangeCredentials = (selected: Folder) => {
    setpCred(selected);
    navigate("/credential");
  };
    
  const changeCia = (selected: Folder) => {
    setpCia(selected);
    if (params.cia) {
      //Retroceder
      navigate("/credential/cia");
    } else {
      navigate("cia");
    }
  };

  const onCleanCia = () => {
    cleanCia();
    navigate("/credential");
  };

  const changeProyecto = (selected: Folder) => {
    setpProyecto(selected);
    navigate("/credential/cia/proyecto");
  };

  const onHome = () => {
    clean();
    navigate("/");
  };

  return {
    params,
    onCleanCia,
    onChangeCredentials,
    changeProyecto,
    changeCia,
    onHome,
  };
};
