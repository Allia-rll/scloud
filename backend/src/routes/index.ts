import express from "express";
import ciaRouter from "./cia.router";
import fileRouter from "./file.router";
import proyectoRouter from "./proyecto.router";
import credsRouter from "./credentials.router";
import fciaRouter from "./foldercia.router";
import fpytoRouter from "./folderpyto.router";

function setupRoutes(app: any) {
  const router = express.Router();
  app.use("/api/v1", router);
  router.use("/cias", ciaRouter);
  router.use("/files", fileRouter);
  router.use("/proyectos", proyectoRouter);
  router.use("/credentials", credsRouter);
  router.use("/foldercia", fciaRouter);
  router.use("/folderpyto", fpytoRouter);
}

export default setupRoutes;
