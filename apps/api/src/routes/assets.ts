import { Router } from "express";
import { listAssets } from "../services/repository.js";

export const assetsRouter = Router();

assetsRouter.get("/", (_req, res) => {
  res.json({ data: listAssets() });
});

