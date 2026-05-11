import type { Asset, CopilotAnalysis, Ticket, User } from "@company-it/shared";
import { fallbackCopilotAnalysis, mockAssets, mockTickets, mockUsers } from "./mockData";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:4000";

interface ApiResponse<T> {
  data: T;
}

export interface DashboardData {
  tickets: Ticket[];
  users: User[];
  assets: Asset[];
}

export async function loadDashboardData(): Promise<DashboardData> {
  const [tickets, users, assets] = await Promise.all([
    getOrFallback<Ticket[]>("/api/tickets", mockTickets),
    getOrFallback<User[]>("/api/users", mockUsers),
    getOrFallback<Asset[]>("/api/assets", mockAssets)
  ]);

  return { tickets, users, assets };
}

export async function analyseSupportIssue(issue: string): Promise<CopilotAnalysis> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/copilot/analyse`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ issue })
    });

    if (!response.ok) {
      return fallbackCopilotAnalysis;
    }

    const payload = (await response.json()) as ApiResponse<CopilotAnalysis>;
    return payload.data;
  } catch {
    return fallbackCopilotAnalysis;
  }
}

async function getOrFallback<T>(path: string, fallback: T): Promise<T> {
  try {
    const response = await fetch(`${API_BASE_URL}${path}`);

    if (!response.ok) {
      return fallback;
    }

    const payload = (await response.json()) as ApiResponse<T>;
    return payload.data;
  } catch {
    return fallback;
  }
}
