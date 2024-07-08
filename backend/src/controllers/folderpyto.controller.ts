import { Request, Response } from "express";
import FPytoService from "../services/folderpyto.service";
import CredsService from "../services/credentials.service";
import FCiaService from "../services/foldercia.service";

const creds = new CredsService();
const fpytoserv = new FPytoService();
const fciaserv = new FCiaService();

const createFolderPyto = async (req: Request, res: Response) => {
  try {
    if (req.body === undefined) {
      throw new Error("No body detected");
    }

    if (
      req.body.codfcia === undefined ||
      req.body.codcred === undefined ||
      req.body.codpyto === undefined
    ) {
      throw new Error("Missing required fields");
    }

    const { codfcia, codcred, codpyto } = req.body;
    const [credes] = await creds.getAuthCredsById(codcred);

    const result = await fpytoserv.createFolderPyto(codfcia, codpyto, codcred, credes);
    res.json({ success: true, data: result});
  } catch (error: any) {
    if (error instanceof Error) {
      console.log(error.message)
      // return res.status(400).send({ message: error.message });
    }
    res.status(400).send({
      success: false,
      message: "Error creando el folder",
    });
  }
};

const getByFCia = async (req: Request, res: Response) => {
  try {
    if (req.body === undefined) {
      throw new Error("No body detected");
    }

    if (req.body.codfcia === undefined) {
      throw new Error("Missing required fields");
    }

    const { codfcia } = req.body;
    const result = await fpytoserv.getByFCia(codfcia);
    res.json({ success: true, data: result });
  } catch (error: any) {
    if (error instanceof Error) {
      console.log(error.message)
      // return res.status(400).send({ message: error.message });
    }
    res.status(400).send({
      success: false,
      message: "Error obteniendo el folder de los proyectos de la cia",
    });
  }
};

const validateFPytoId = async (req: Request, res: Response) => {
  try {
    if (req.body === undefined) {
      throw new Error("No body detected");
    }

    if (req.body.codfpyto === undefined) {
      throw new Error("Missing required fields");
    }

    const { codfpyto, codcred, codfcia } = req.body;
    const isCred = await creds.validateCredId(codcred);
    if (!isCred) res.json({ success: true, data: isCred });

    const isFCia = await fciaserv.validateFCiaId(codfcia);
    if (!isFCia) res.json({ success: true, data: isFCia });

    const result = await fpytoserv.validateFPytoId(codfpyto);
    res.json({ success: true, data: result });

  } catch (error: any) {
    if (error instanceof Error) {
      console.log(error.message)
      // return res.status(400).send({ message: error.message });
    }
    res.status(400).send({
      success: false,
      message: "Ruta no valida",
    });
  }
};

export default { createFolderPyto, getByFCia, validateFPytoId};
