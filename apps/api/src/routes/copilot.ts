import { Router } from "express";
import { z } from "zod";
import { analyseIssue } from "../services/copilot.js";

export const copilotRouter = Router();

const analyseSchema = z.object({
  issue: z.string().min(8)
});

function handleAnalyse(req: Parameters<Parameters<typeof copilotRouter.post>[1]>[0], res: Parameters<Parameters<typeof copilotRouter.post>[1]>[1]) {
  const parsed = analyseSchema.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({ error: "Issue text is required", details: parsed.error.flatten() });
    return;
  }

  res.json({ data: analyseIssue(parsed.data.issue) });
}

copilotRouter.post("/analyse", handleAnalyse);
copilotRouter.post("/analyze", handleAnalyse);

