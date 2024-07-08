import { Request, Response } from "express";
import FCiaService from "../services/foldercia.service";
import CredsService from "../services/credentials.service";

const creds = new CredsService();
const fciaserv = new FCiaService();

const createFolderCia = async (req: Request, res: Response) => {
  try {
    if (req.body === undefined) {
      throw new Error("No body detected");
    }

    if (req.body.codcia === undefined || req.body.codcred === undefined) {
      throw new Error("Missing required fields");
    }

    const { codcia, codcred } = req.body;
    const [credes] = await creds.getPrivCredsById(codcred);

    const result = await fciaserv.createFolderCia(codcia, codcred, credes);
    res.json({ success: true, data: result });
  } catch (error: any) {
    if (error instanceof Error) {
      console.error(error.message);
    }
    res.status(400).send({
      success: false,
      message: "Error creando folder de la CIA",
    });
  }
};

const getByCredentials = async (req: Request, res: Response) => {
  try {
    if (req.body.codcred === undefined) {
      throw new Error("Missing required fields");
    }

    const { codcred } = req.body;
    const result = await fciaserv.getByCredentials(codcred);
    res.json({ success: true, data: result });
  } catch (error: any) {
    if (error instanceof Error) {
      console.error(error.message);
    }
    res.status(400).send({
      success: false,
      message: "Error obteniendo folders de la credencial",
    });
  }
};

const validateFCiaId = async (req: Request, res: Response) => {
  try {
    if (req.body.codfcia === undefined) {
      throw new Error("Missing required fields");
    }

    const { codfcia, codcred } = req.body;
    const validation1 = await creds.validateCredId(codcred);
    if (!validation1) res.json({ success: true, data: validation1 });

    const result = await fciaserv.validateFCiaId(codfcia);
    res.json({ success: true, data: result });

  } catch (error: any) {
    if (error instanceof Error) {
      console.error(error.message);
    }
    res.status(400).send({
      success: false,
      message: "Ruta no valida",
    });
  }
};



export default { createFolderCia, getByCredentials, validateFCiaId };
