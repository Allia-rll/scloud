import { Request, Response } from "express";
import FileService from "../services/file.service";

const service = new FileService();

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
    res.status(400).send({ message: error.message });
  }
};

const getById = async (req: Request, res: Response) => {
  try {
    const response = await service.getFileByOwner(req.params.id);
    res.json({ success: true, data: response });
  } catch (error) {
    res.status(400).send({ message: "error.message" });
  }
};

const getFilesByOwner = async (req: Request, res: Response) => {
  try {
    const { idOwner } = req.body;
    const response = await service.getFileByOwner(idOwner);
    res.json({ success: true, data: response });
  } catch (error) {
    res.status(400).send({ message: "error.message" });
  }
};

export default { create, getById, getFilesByOwner };
