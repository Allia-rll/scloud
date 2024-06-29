import express from "express";
import ciaController from "../controllers/cia.controller";

const router = express.Router();
router
  .get("/", ciaController.getAll)
  .get("/:id", ciaController.getById)
  .post("/withoutfolder", ciaController.getWithoutFolder);

router.post("/byfolder", ciaController.getByFolder);

export default router;