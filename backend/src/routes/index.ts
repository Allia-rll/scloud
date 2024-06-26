import express from "express";
import ciaRouter from "./cia.router";
import fileRouter from "./file.router";
import proyectoRouter from "./proyecto.router";

function setupRoutes(app: any) {
  const router = express.Router();
  app.use("/api/v1", router);
  router.use("/cias", ciaRouter);
  router.use("/files", fileRouter)
  router.use("/proyectos", proyectoRouter);
}

export default setupRoutes;
