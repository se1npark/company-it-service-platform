import { Router } from "express";
import { z } from "zod";
import { ticketCategories, ticketPriorities, ticketStatuses } from "@company-it/shared";
import { createTicket, getTicketById, listTickets, updateTicketStatus } from "../services/repository.js";

export const ticketsRouter = Router();

const createTicketSchema = z.object({
  title: z.string().min(4),
  description: z.string().min(8),
  category: z.enum(ticketCategories),
  priority: z.enum(ticketPriorities),
  requesterId: z.string().min(1),
  assetId: z.string().optional()
});

const statusSchema = z.object({
  status: z.enum(ticketStatuses)
});

ticketsRouter.get("/", (_req, res) => {
  res.json({ data: listTickets() });
});

ticketsRouter.get("/:id", (req, res) => {
  const ticket = getTicketById(req.params.id);

  if (!ticket) {
    res.status(404).json({ error: "Ticket not found" });
    return;
  }

  res.json({ data: ticket });
});

ticketsRouter.post("/", (req, res) => {
  const parsed = createTicketSchema.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({ error: "Invalid ticket payload", details: parsed.error.flatten() });
    return;
  }

  res.status(201).json({ data: createTicket(parsed.data) });
});

ticketsRouter.patch("/:id/status", (req, res) => {
  const parsed = statusSchema.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({ error: "Invalid status payload", details: parsed.error.flatten() });
    return;
  }

  const ticket = updateTicketStatus(req.params.id, parsed.data.status);

  if (!ticket) {
    res.status(404).json({ error: "Ticket not found" });
    return;
  }

  res.json({ data: ticket });
});

