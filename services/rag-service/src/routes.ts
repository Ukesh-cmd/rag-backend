import { Router } from "express";
import multer from "multer";
import { uploadDocument } from "./controllers/dbController";
import { authenticate } from "./middleware/authMiddleware";

const upload = multer({ dest: "uploads/" });

const router = Router();

router.post(
  "/documents",
  authenticate,
  upload.single("file"),
  uploadDocument
);

export default router;
