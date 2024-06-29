import express from "express";
import folderpytoController from "../controllers/folderpyto.controller";

const router = express.Router();
router.post("/create", folderpytoController.createFolderPyto);

router.post("/", folderpytoController.getByFCia);
router.post("/validate", folderpytoController.validateFPytoId);

export default router;
