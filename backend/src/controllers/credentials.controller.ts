import { Request, Response } from "express";
import CredsService from "../services/credentials.service";

const creds = new CredsService();

const create = async (req: Request, res: Response) => {
  try {
    if (req.body === undefined) {
      throw new Error("No body detected");
    }

    if (
      req.body.type === undefined ||
      req.body.project_id === undefined ||
      req.body.private_key_id === undefined ||
      req.body.private_key === undefined ||
      req.body.client_email === undefined ||
      req.body.client_id === undefined ||
      req.body.universe_domain === undefined ||
      req.body.froot === undefined ||
      req.body.namecreds === undefined
    ) {
      throw new Error("Missing required credentials fields");
    }

    const result = await creds.createCreds(req.body);
    res.json({ success: true, data: result });
  } catch (error: any) {
    if(error instanceof Error) {
      console.error(error.message);
    }
    res.status(400).send({ success: false, message: "Error creando las credenciales" });
  }
};

const getAllPubCreds = async (req: Request, res: Response) => {
  try {
    const result = await creds.getAllPubCreds();
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(400).send({ message: "Error fetching credentials" });
  }
};

const validateCredID = async (req: Request, res: Response) => {
  try {
    if (req.body.codcred === undefined) {
      throw new Error("Missing required fields");
    }

    const { codcred } = req.body;
    const result = await creds.validateCredId(codcred);
    res.json({ success: true, data: result });
  } catch (error: any) {
    if (error instanceof Error) {
      return res.status(400).send({ message: error.message });
    }

    res.status(400).send({ message: "Error getting credentials" });
  }
};

export default { create, getAllPubCreds, validateCredID};
