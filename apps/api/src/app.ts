import cors from "cors";
import express from "express";
import { assetsRouter } from "./routes/assets.js";
import { copilotRouter } from "./routes/copilot.js";
import { ticketsRouter } from "./routes/tickets.js";
import { usersRouter } from "./routes/users.js";

export function createApp() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.get("/api/health", (_req, res) => {
    res.json({
      ok: true,
      service: "company-it-service-api",
      timestamp: new Date().toISOString()
    });
  });

  app.use("/api/assets", assetsRouter);
  app.use("/api/copilot", copilotRouter);
  app.use("/api/tickets", ticketsRouter);
  app.use("/api/users", usersRouter);

  app.use((_req, res) => {
    res.status(404).json({ error: "Route not found" });
  });

  return app;
}

