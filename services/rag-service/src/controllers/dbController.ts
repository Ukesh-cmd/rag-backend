import { Request, Response } from "express";
import { ingestDocument } from "../services/documentService";

export async function uploadDocument(req: Request, res: Response) {
  if (!req.file) {
    return res.status(400).json({ error: "File required" });
  }

  const doc = await ingestDocument({
    filePath: req.file.path,
    mimeType: req.file.mimetype,
    title: req.body.title || req.file.originalname,
    ownerId: req.user!.id
  });

  res.status(201).json(doc);
}
