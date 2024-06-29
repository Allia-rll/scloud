import { useParams, useNavigate } from "react-router-dom";
import { Folder } from "../components/FolderCard";
import { useEffect, useState } from "react";
import { set } from "react-hook-form";
import { Credentials } from "../types/models/credentials";
import { useFCia, useFCreds } from "../store/store";
import { useRouter } from "../store/store";

export const useRoutes = () => {
  const navigate = useNavigate();
  const { params, setpCred, setpCia, setpProyecto, clean } = useRouter(
    (state) => state
  );

  const onChangeCredentials = (selected: Folder) => {
    setpCred(selected);
    navigate("credential");
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

  const changeProyecto = (selected: Folder) => {
    setpProyecto(selected);
    navigate("proyecto");
  };

  const onHome = () => {
    clean();
    navigate("/");
  };

  return {
    params,
    onChangeCredentials,
    changeProyecto,
    changeCia,
    onHome,
  };
};
