import { randomUUID } from "node:crypto";
import type { Asset, Ticket, TicketStatus, User } from "@company-it/shared";
import { assets, knowledgeArticles, tickets, users } from "../data/seed.js";

export function listUsers(): User[] {
  return users;
}

export function listAssets(): Asset[] {
  return assets;
}

export function listTickets(): Ticket[] {
  return tickets;
}

export function getTicketById(id: string): Ticket | undefined {
  return tickets.find((ticket) => ticket.id === id);
}

export function createTicket(input: Pick<Ticket, "title" | "description" | "category" | "priority" | "requesterId" | "assetId">): Ticket {
  const now = new Date();
  const slaHours = input.priority === "critical" ? 4 : input.priority === "high" ? 8 : 24;
  const ticket: Ticket = {
    id: `ticket-${randomUUID().slice(0, 8)}`,
    title: input.title,
    description: input.description,
    category: input.category,
    priority: input.priority,
    status: "open",
    requesterId: input.requesterId,
    assetId: input.assetId,
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
    slaDueAt: new Date(now.getTime() + slaHours * 60 * 60 * 1000).toISOString(),
    comments: []
  };

  tickets.unshift(ticket);
  return ticket;
}

export function updateTicketStatus(id: string, status: TicketStatus): Ticket | undefined {
  const ticket = getTicketById(id);

  if (!ticket) {
    return undefined;
  }

  ticket.status = status;
  ticket.updatedAt = new Date().toISOString();

  return ticket;
}

export function listKnowledgeArticles() {
  return knowledgeArticles;
}

