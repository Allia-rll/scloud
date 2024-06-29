import express from "express";
import fileController from "../controllers/files.controller";
import multer from "multer";
const upload = multer();

const router = express.Router();
router
  .post("/" ,upload.any(), fileController.create);

router.post("/byfpyto", fileController.getByFPyto)

export default router;