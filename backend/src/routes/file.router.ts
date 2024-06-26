import express from "express";
import fileController from "../controllers/files.controller";
import multer from "multer";
const upload = multer();

const router = express.Router();
router
  .get("/:id", fileController.getById)
  .post("/" ,upload.any(), fileController.create);

router.post("/byOwner", fileController.getFilesByOwner)

export default router;