import express from "express";
import credsController from "../controllers/credentials.controller";

const router = express.Router();
router
  .get("/", credsController.getAllPubCreds)
  .post("/validate", credsController.validateCredID)
  .post("/create", credsController.create)

export default router;