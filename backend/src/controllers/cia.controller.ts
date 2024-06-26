import { Request, Response } from "express";
import UserService from "../services/cia.service";

const service = new UserService();

const getAll = async (req: Request, res: Response) => {
  try {
    const response = await service.getAllCias();
    console.log(response);
    res.json({ success: true, data: response });
  } catch (error) {
    res.status(400).send({ message: "err" });
  }
};

const getById = async (req: Request, res: Response) => {
  try {
    const response = await service.getCiaById(Number(req.params.id));
    res.json({ success: true, data: response });
  } catch (error) {
    res.status(400).send({ message: "Error getting Cia Information" });
  }
};

export default { getAll, getById };
