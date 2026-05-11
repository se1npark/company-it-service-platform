import { useEffect, useMemo, useState } from "react";
import {
  Activity,
  AlertTriangle,
  Bot,
  CheckCircle2,
  Clock3,
  Laptop,
  RefreshCcw,
  Search,
  ShieldCheck,
  TicketCheck,
  UserPlus,
  UsersRound
} from "lucide-react";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { Asset, CopilotAnalysis, Ticket, TicketCategory, TicketPriority, TicketStatus, User } from "@company-it/shared";
import { ticketCategories, ticketStatuses } from "@company-it/shared";
import { analyseSupportIssue, type DashboardData, loadDashboardData } from "./api";
import { fallbackCopilotAnalysis, mockAssets, mockTickets, mockUsers } from "./mockData";

const statusLabels: Record<TicketStatus, string> = {
  open: "Open",
  in_progress: "In Progress",
  waiting_for_user: "Waiting",
  resolved: "Resolved",
  closed: "Closed"
};

const categoryLabels: Record<TicketCategory, string> = {
  account: "Account",
  microsoft_365: "Microsoft 365",
  vpn: "VPN",
  network: "Network",
  hardware: "Hardware",
  software: "Software",
  email: "Email",
  teams: "Teams",
  onboarding: "Onboarding"
};

const priorityLabels: Record<TicketPriority, string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
  critical: "Critical"
};

const initialData: DashboardData = {
  tickets: mockTickets,
  users: mockUsers,
  assets: mockAssets
};

export function App() {
  const [dashboardData, setDashboardData] = useState(initialData);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<TicketStatus | "all">("all");
  const [categoryFilter, setCategoryFilter] = useState<TicketCategory | "all">("all");
  const [selectedTicketId, setSelectedTicketId] = useState(initialData.tickets[0]?.id ?? "");
  const [copilotIssue, setCopilotIssue] = useState("I cannot sign in to Outlook after password reset and MFA keeps looping.");
  const [copilotAnalysis, setCopilotAnalysis] = useState<CopilotAnalysis>(fallbackCopilotAnalysis);
  const [isAnalysing, setIsAnalysing] = useState(false);

  useEffect(() => {
    void loadDashboardData().then((data) => {
      setDashboardData(data);
      setSelectedTicketId((current) => current || data.tickets[0]?.id || "");
    });
  }, []);

  const { tickets, users, assets } = dashboardData;

  const filteredTickets = useMemo(() => {
    const query = search.trim().toLowerCase();

    return tickets.filter((ticket) => {
      const matchesText =
        !query ||
        `${ticket.title} ${ticket.description} ${ticket.category} ${ticket.priority} ${ticket.status}`.toLowerCase().includes(query);
      const matchesStatus = statusFilter === "all" || ticket.status === statusFilter;
      const matchesCategory = categoryFilter === "all" || ticket.category === categoryFilter;

      return matchesText && matchesStatus && matchesCategory;
    });
  }, [categoryFilter, search, statusFilter, tickets]);

  const selectedTicket = tickets.find((ticket) => ticket.id === selectedTicketId) ?? filteredTickets[0] ?? tickets[0];
  const selectedUser = selectedTicket ? users.find((user) => user.id === selectedTicket.requesterId) : undefined;
  const selectedAsset = selectedTicket ? assets.find((asset) => asset.id === selectedTicket.assetId) : undefined;

  const stats = useMemo(() => {
    const activeTickets = tickets.filter((ticket) => !["resolved", "closed"].includes(ticket.status));
    const criticalTickets = tickets.filter((ticket) => ticket.priority === "critical" || ticket.priority === "high");
    const pendingOnboarding = users.filter((user) => user.onboardingStatus !== "completed");
    const repairAssets = assets.filter((asset) => asset.status === "repair");

    return [
      {
        label: "Active tickets",
        value: activeTickets.length,
        detail: `${criticalTickets.length} high impact`,
        icon: TicketCheck,
        tone: "blue"
      },
      {
        label: "Avg resolution",
        value: "6.4h",
        detail: "last 7 days",
        icon: Clock3,
        tone: "green"
      },
      {
        label: "Onboarding",
        value: pendingOnboarding.length,
        detail: "waiting checks",
        icon: UserPlus,
        tone: "amber"
      },
      {
        label: "Asset alerts",
        value: repairAssets.length,
        detail: "repair queue",
        icon: AlertTriangle,
        tone: "red"
      }
    ];
  }, [assets, tickets, users]);

  const chartData = useMemo(() => {
    return ticketCategories
      .map((category) => ({
        category: categoryLabels[category],
        tickets: tickets.filter((ticket) => ticket.category === category).length
      }))
      .filter((item) => item.tickets > 0);
  }, [tickets]);

  async function handleCopilotAnalyse() {
    const issue = copilotIssue.trim();

    if (!issue) {
      return;
    }

    setIsAnalysing(true);

    try {
      setCopilotAnalysis(await analyseSupportIssue(issue));
    } finally {
      setIsAnalysing(false);
    }
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <ShieldCheck size={24} aria-hidden="true" />
          <div>
            <strong>Northstar IT</strong>
            <span>Service Platform</span>
          </div>
        </div>

        <nav className="nav-list" aria-label="Main navigation">
          <button className="nav-item active" type="button">
            <Activity size={18} aria-hidden="true" />
            Operations
          </button>
          <button className="nav-item" type="button">
            <TicketCheck size={18} aria-hidden="true" />
            Tickets
          </button>
          <button className="nav-item" type="button">
            <Laptop size={18} aria-hidden="true" />
            Assets
          </button>
          <button className="nav-item" type="button">
            <UsersRound size={18} aria-hidden="true" />
            Users
          </button>
          <button className="nav-item" type="button">
            <Bot size={18} aria-hidden="true" />
            Copilot
          </button>
        </nav>

        <div className="sidebar-footer">
          <span>Support role</span>
          <strong>IT Support Agent</strong>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <div>
            <p className="eyebrow">Internal operations</p>
            <h1>IT Service Desk</h1>
          </div>
          <button className="icon-button" type="button" onClick={() => void loadDashboardData().then(setDashboardData)} aria-label="Refresh dashboard">
            <RefreshCcw size={18} aria-hidden="true" />
          </button>
        </header>

        <section className="stats-grid" aria-label="Operational metrics">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <article className={`metric-card ${stat.tone}`} key={stat.label}>
                <div className="metric-icon">
                  <Icon size={18} aria-hidden="true" />
                </div>
                <span>{stat.label}</span>
                <strong>{stat.value}</strong>
                <small>{stat.detail}</small>
              </article>
            );
          })}
        </section>

        <section className="dashboard-grid">
          <div className="panel tickets-panel">
            <div className="panel-header">
              <div>
                <h2>Ticket Queue</h2>
                <span>{filteredTickets.length} visible</span>
              </div>
              <div className="search-box">
                <Search size={16} aria-hidden="true" />
                <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search tickets" />
              </div>
            </div>

            <div className="filters">
              <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value as TicketStatus | "all")} aria-label="Filter by status">
                <option value="all">All statuses</option>
                {ticketStatuses.map((status) => (
                  <option value={status} key={status}>
                    {statusLabels[status]}
                  </option>
                ))}
              </select>

              <select value={categoryFilter} onChange={(event) => setCategoryFilter(event.target.value as TicketCategory | "all")} aria-label="Filter by category">
                <option value="all">All categories</option>
                {ticketCategories.map((category) => (
                  <option value={category} key={category}>
                    {categoryLabels[category]}
                  </option>
                ))}
              </select>
            </div>

            <div className="ticket-list">
              {filteredTickets.map((ticket) => (
                <button
                  className={`ticket-row ${selectedTicket?.id === ticket.id ? "selected" : ""}`}
                  key={ticket.id}
                  type="button"
                  onClick={() => setSelectedTicketId(ticket.id)}
                >
                  <div>
                    <strong>{ticket.title}</strong>
                    <span>{getUserName(users, ticket.requesterId)} · {categoryLabels[ticket.category]}</span>
                  </div>
                  <div className="row-meta">
                    <span className={`badge priority ${ticket.priority}`}>{priorityLabels[ticket.priority]}</span>
                    <span className={`badge status ${ticket.status}`}>{statusLabels[ticket.status]}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="panel detail-panel">
            {selectedTicket ? (
              <>
                <div className="panel-header">
                  <div>
                    <h2>{selectedTicket.title}</h2>
                    <span>{selectedTicket.id} · SLA due {formatDateTime(selectedTicket.slaDueAt)}</span>
                  </div>
                  <span className={`badge priority ${selectedTicket.priority}`}>{priorityLabels[selectedTicket.priority]}</span>
                </div>

                <p className="description">{selectedTicket.description}</p>

                <div className="detail-grid">
                  <InfoBlock label="Requester" value={selectedUser?.fullName ?? "Unknown"} subValue={selectedUser?.department ?? "No department"} />
                  <InfoBlock label="Location" value={selectedUser?.location ?? "Unknown"} subValue={selectedUser?.email ?? "No email"} />
                  <InfoBlock label="Device" value={selectedAsset?.assetTag ?? "No asset linked"} subValue={selectedAsset?.model ?? "Unassigned"} />
                  <InfoBlock label="Status" value={statusLabels[selectedTicket.status]} subValue={`Updated ${formatDateTime(selectedTicket.updatedAt)}`} />
                </div>

                <div className="comments">
                  <h3>Activity</h3>
                  {selectedTicket.comments.length > 0 ? (
                    selectedTicket.comments.map((comment) => (
                      <div className="comment" key={comment.id}>
                        <strong>{comment.authorName}</strong>
                        <span>{formatDateTime(comment.createdAt)}</span>
                        <p>{comment.body}</p>
                      </div>
                    ))
                  ) : (
                    <p className="empty-state">No comments yet.</p>
                  )}
                </div>
              </>
            ) : (
              <p className="empty-state">Select a ticket to view details.</p>
            )}
          </div>

          <div className="panel copilot-panel">
            <div className="panel-header">
              <div>
                <h2>Support Copilot</h2>
                <span>RAG-style triage with citations</span>
              </div>
              <Bot size={20} aria-hidden="true" />
            </div>

            <textarea value={copilotIssue} onChange={(event) => setCopilotIssue(event.target.value)} rows={5} aria-label="Support issue for copilot analysis" />
            <button className="primary-action" type="button" onClick={handleCopilotAnalyse} disabled={isAnalysing}>
              <Bot size={17} aria-hidden="true" />
              {isAnalysing ? "Analysing" : "Analyse issue"}
            </button>

            <div className="analysis-card">
              <div className="analysis-header">
                <span className={`badge priority ${copilotAnalysis.priority}`}>{priorityLabels[copilotAnalysis.priority]}</span>
                <strong>{Math.round(copilotAnalysis.confidence * 100)}% confidence</strong>
              </div>
              <p>{copilotAnalysis.summary}</p>
              <ol>
                {copilotAnalysis.suggestedSteps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
              <div className="citations">
                {copilotAnalysis.citations.map((citation) => (
                  <span key={citation.articleId}>
                    {citation.title} · {Math.round(citation.relevance * 100)}%
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="panel chart-panel">
            <div className="panel-header">
              <div>
                <h2>Tickets by Category</h2>
                <span>Current queue distribution</span>
              </div>
            </div>
            <div className="chart-wrap">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 8, left: -18, bottom: 0 }}>
                  <XAxis dataKey="category" tickLine={false} axisLine={false} tick={{ fontSize: 11 }} />
                  <YAxis allowDecimals={false} tickLine={false} axisLine={false} tick={{ fontSize: 11 }} />
                  <Tooltip cursor={{ fill: "rgba(47, 111, 173, 0.08)" }} />
                  <Bar dataKey="tickets" fill="#2f6fad" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="panel asset-panel">
            <div className="panel-header">
              <div>
                <h2>Assets</h2>
                <span>Assigned devices and warranty signals</span>
              </div>
              <Laptop size={20} aria-hidden="true" />
            </div>

            <div className="asset-list">
              {assets.map((asset) => (
                <div className="asset-row" key={asset.id}>
                  <div>
                    <strong>{asset.assetTag}</strong>
                    <span>{asset.model}</span>
                  </div>
                  <span className={`badge asset ${asset.status}`}>{asset.status}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="panel onboarding-panel">
            <div className="panel-header">
              <div>
                <h2>Onboarding</h2>
                <span>New starter readiness</span>
              </div>
              <CheckCircle2 size={20} aria-hidden="true" />
            </div>

            <div className="checklist">
              {users
                .filter((user) => user.onboardingStatus !== "completed")
                .map((user) => (
                  <div className="check-row" key={user.id}>
                    <span>{user.fullName}</span>
                    <strong>{user.department}</strong>
                    <small>{user.onboardingStatus.replace("_", " ")}</small>
                  </div>
                ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function InfoBlock({ label, value, subValue }: { label: string; value: string; subValue: string }) {
  return (
    <div className="info-block">
      <span>{label}</span>
      <strong>{value}</strong>
      <small>{subValue}</small>
    </div>
  );
}

function getUserName(users: User[], userId: string) {
  return users.find((user) => user.id === userId)?.fullName ?? "Unknown user";
}

function formatDateTime(value: string) {
  return new Intl.DateTimeFormat("en-AU", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(value));
}
