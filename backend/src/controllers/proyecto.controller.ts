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


export default { getProyectsbyCia };