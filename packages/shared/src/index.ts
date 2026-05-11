export const ticketStatuses = [
  "open",
  "in_progress",
  "waiting_for_user",
  "resolved",
  "closed"
] as const;

export const ticketPriorities = ["low", "medium", "high", "critical"] as const;

export const ticketCategories = [
  "account",
  "microsoft_365",
  "vpn",
  "network",
  "hardware",
  "software",
  "email",
  "teams",
  "onboarding"
] as const;

export const assetStatuses = ["available", "assigned", "repair", "retired"] as const;

export type TicketStatus = (typeof ticketStatuses)[number];
export type TicketPriority = (typeof ticketPriorities)[number];
export type TicketCategory = (typeof ticketCategories)[number];
export type AssetStatus = (typeof assetStatuses)[number];

export interface User {
  id: string;
  fullName: string;
  email: string;
  department: string;
  role: "employee" | "support_agent" | "it_admin";
  managerName?: string;
  location: string;
  onboardingStatus: "not_started" | "in_progress" | "ready" | "completed";
}

export interface Asset {
  id: string;
  assetTag: string;
  type: "laptop" | "desktop" | "monitor" | "phone" | "peripheral";
  model: string;
  status: AssetStatus;
  assignedUserId?: string;
  warrantyExpiry: string;
  operatingSystem?: string;
}

export interface TicketComment {
  id: string;
  authorName: string;
  body: string;
  createdAt: string;
}

export interface Ticket {
  id: string;
  title: string;
  description: string;
  category: TicketCategory;
  priority: TicketPriority;
  status: TicketStatus;
  requesterId: string;
  assignedAgentId?: string;
  assetId?: string;
  createdAt: string;
  updatedAt: string;
  slaDueAt: string;
  comments: TicketComment[];
}

export interface KnowledgeArticle {
  id: string;
  slug: string;
  title: string;
  category: TicketCategory;
  summary: string;
  content: string;
  tags: string[];
}

export interface CopilotCitation {
  articleId: string;
  title: string;
  slug: string;
  matchedTerms: string[];
  relevance: number;
}

export interface CopilotAnalysis {
  category: TicketCategory;
  priority: TicketPriority;
  confidence: number;
  summary: string;
  suggestedSteps: string[];
  escalationHint: string;
  citations: CopilotCitation[];
}

