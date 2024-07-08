import { Request, Response } from "express";
import FileService from "../services/file.service";
import CredsService from "../services/credentials.service";

const service = new FileService();
const credService = new CredsService();

const create = async (req: Request, res: Response) => {
  try {
    const { body, files } = req;
    if (files === undefined) {
      throw new Error("No file uploaded");
    }

    if (Array.isArray(files)) {
      const result = await service.createFile(body, files[0]);
      res.json({ success: true, data: result });
    } else {
      throw new Error("One file per upload");
    }
  } catch (error: any) {
    if(error instanceof Error) {
      console.error(error.message);
    }
    res.status(400).send({ success: false, message: "Error creando el archivo" });
  }
};

const getByFPyto = async (req: Request, res: Response) => {
  try {
    const { codfpyto, codcred } = req.body;
    const [ creds ] = await credService.getAuthCredsById(codcred);
    const response = await service.getByFPyto(codfpyto, creds);
    res.json({ success: true, data: response });
  } catch (error) {
    if(error instanceof Error) {
      console.error(error.message);
    }
    res.status(400).send({ success: false, message: "Error obteniendo los proyectos" });
  }
};

export default { create, getByFPyto };
