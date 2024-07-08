import { Request, Response } from "express";
import UserService from "../services/cia.service";
import CredentialsService from "../services/credentials.service";

const service = new UserService();
const creds = new CredentialsService();

const getAll = async (req: Request, res: Response) => {
  try {
    const response = await service.getAllCias();
    console.log(response);
    res.json({ success: true, data: response });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
    res.status(400).send({
      success: false,
      message: "Error obteniendo la información de las Cia",
    });
  }
};

const getById = async (req: Request, res: Response) => {
  try {
    const response = await service.getCiaById(Number(req.params.id));
    res.json({ success: true, data: response });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
    res.status(400).send({
      success: false,
      message: "Error obteniendo la información de la Cia",
    });
  }
};

const getWithoutFolder = async (req: Request, res: Response) => {
  try {
    const { codcred } = req.body;
    if (codcred === undefined) {
      throw new Error("Missing required fields");
    }

    const isCodCredValid = await creds.validateCredId(codcred);
    if (!isCodCredValid) {
      res.json({ success: true, data: isCodCredValid });
    }
    const response = await service.getCiasWhitoutFolder(codcred);
    res.json({ success: true, data: response });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
    res.status(400).send({
      success: false,
      message: "Error obteniendo la información de la Cia",
    });
  }
};

const getByFolder = async (req: Request, res: Response) => {
  try {
    const { codfcia } = req.body;
    if (codfcia === undefined) {
      throw new Error("Missing required fields");
    }

    const response = await service.getByFolder(codfcia);
    res.json({ success: true, data: response });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
    res.status(400).send({
      success: false,
      message: "Error obteniendo la información de la Cia",
    });
  }
};
export default { getAll, getById, getWithoutFolder, getByFolder };
