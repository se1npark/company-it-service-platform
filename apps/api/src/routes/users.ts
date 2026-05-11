import { Router } from "express";
import { listUsers } from "../services/repository.js";

export const usersRouter = Router();

usersRouter.get("/", (_req, res) => {
  res.json({ data: listUsers() });
});

