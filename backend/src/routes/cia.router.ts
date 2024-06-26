import express from "express";
import ciaController from "../controllers/cia.controller";

const router = express.Router();
router
  .get("/", ciaController.getAll)
  .get("/:id", ciaController.getById)

export default router;