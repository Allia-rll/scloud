import express from "express";
import proyectoController from "../controllers/proyecto.controller";

const router = express.Router();
router
  .get("/:codcia", proyectoController.getProyectsbyCia)

export default router;