import { Request, Response } from "express";
import ProyectoService from "../services/proyecto.service";

const service = new ProyectoService();

const getProyectsbyCia = async (req: Request, res: Response) => {
  try {
    const response = await service.getProyectsbyCia(Number(req.params.codcia));
    res.json({ success: true, data: response });
  } catch (error) {
    res.status(400).send({ message: "Error getting Proyecto Information" });
  }
};

const getWithoutFolder = async (req: Request, res: Response) => {
  try {
    const { codfcia, codcia } = req.body;
    if (codfcia === undefined || codcia === undefined) {
      throw new Error("Missing required fields");
    }

    const response = await service.getProyectWithOutFolder(codfcia, codcia);
    res.json({ success: true, data: response });
  } catch (error) {
    res.status(400).send({ message: "Error getting Proyecto Information" });
  }
};


export default { getProyectsbyCia, getWithoutFolder };