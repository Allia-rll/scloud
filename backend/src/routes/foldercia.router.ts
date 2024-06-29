import express from "express";
import fciaController from "../controllers/foldercia.controller";

const router = express.Router();
router.post("/create", fciaController.createFolderCia);

router.post("/", fciaController.getByCredentials);
router.post("/validate", fciaController.validateFCiaId);

export default router;
