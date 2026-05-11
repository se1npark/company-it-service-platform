import type { Asset, CopilotAnalysis, Ticket, User } from "@company-it/shared";

export const mockUsers: User[] = [
  {
    id: "user-001",
    fullName: "Mia Chen",
    email: "mia.chen@northstar.example",
    department: "Finance",
    role: "employee",
    managerName: "Daniel Brooks",
    location: "Sydney",
    onboardingStatus: "completed"
  },
  {
    id: "user-002",
    fullName: "Noah Williams",
    email: "noah.williams@northstar.example",
    department: "Sales",
    role: "employee",
    managerName: "Ava Patel",
    location: "Melbourne",
    onboardingStatus: "completed"
  },
  {
    id: "user-003",
    fullName: "Sofia Martin",
    email: "sofia.martin@northstar.example",
    department: "People",
    role: "employee",
    managerName: "Grace Lee",
    location: "Brisbane",
    onboardingStatus: "ready"
  },
  {
    id: "agent-001",
    fullName: "Ethan Park",
    email: "ethan.park@northstar.example",
    department: "IT",
    role: "support_agent",
    location: "Sydney",
    onboardingStatus: "completed"
  }
];

export const mockAssets: Asset[] = [
  {
    id: "asset-001",
    assetTag: "NSW-LT-1042",
    type: "laptop",
    model: "Dell Latitude 7440",
    status: "assigned",
    assignedUserId: "user-001",
    warrantyExpiry: "2027-08-30",
    operatingSystem: "Windows 11 Enterprise"
  },
  {
    id: "asset-002",
    assetTag: "VIC-LT-0891",
    type: "laptop",
    model: "Lenovo ThinkPad T14",
    status: "assigned",
    assignedUserId: "user-002",
    warrantyExpiry: "2026-11-14",
    operatingSystem: "Windows 11 Pro"
  },
  {
    id: "asset-003",
    assetTag: "QLD-LT-1168",
    type: "laptop",
    model: "HP EliteBook 840",
    status: "available",
    warrantyExpiry: "2028-01-12",
    operatingSystem: "Windows 11 Enterprise"
  }
];

export const mockTickets: Ticket[] = [
  {
    id: "ticket-1001",
    title: "Outlook sign-in loop after password reset",
    description: "I reset my password this morning and now Outlook keeps asking me to sign in. MFA approves but the desktop app loops back to the login screen.",
    category: "microsoft_365",
    priority: "high",
    status: "in_progress",
    requesterId: "user-001",
    assignedAgentId: "agent-001",
    assetId: "asset-001",
    createdAt: "2026-05-10T23:15:00.000Z",
    updatedAt: "2026-05-11T01:05:00.000Z",
    slaDueAt: "2026-05-11T07:15:00.000Z",
    comments: [
      {
        id: "comment-001",
        authorName: "Ethan Park",
        body: "Confirmed password reset completed. Checking cached Office credentials and MFA registration state.",
        createdAt: "2026-05-11T00:04:00.000Z"
      }
    ]
  },
  {
    id: "ticket-1002",
    title: "VPN connects but internal CRM is unavailable",
    description: "VPN says connected from home Wi-Fi but the internal CRM and file share are timing out.",
    category: "vpn",
    priority: "medium",
    status: "open",
    requesterId: "user-002",
    assignedAgentId: "agent-001",
    assetId: "asset-002",
    createdAt: "2026-05-11T03:20:00.000Z",
    updatedAt: "2026-05-11T03:20:00.000Z",
    slaDueAt: "2026-05-12T03:20:00.000Z",
    comments: []
  },
  {
    id: "ticket-1003",
    title: "New starter onboarding checklist",
    description: "Sofia starts on Monday. Please prepare Microsoft 365 account, Teams access, VPN group, laptop assignment, and manager approval.",
    category: "onboarding",
    priority: "medium",
    status: "waiting_for_user",
    requesterId: "user-003",
    assignedAgentId: "agent-001",
    assetId: "asset-003",
    createdAt: "2026-05-09T05:10:00.000Z",
    updatedAt: "2026-05-10T00:45:00.000Z",
    slaDueAt: "2026-05-15T06:00:00.000Z",
    comments: []
  }
];

export const fallbackCopilotAnalysis: CopilotAnalysis = {
  category: "microsoft_365",
  priority: "high",
  confidence: 0.86,
  summary: "Likely Microsoft 365 issue requiring high priority triage.",
  suggestedSteps: [
    "Check Microsoft 365 service health and confirm whether web access works in Outlook on the web.",
    "Clear cached Office credentials and stale work account sessions on the affected Windows device.",
    "Check MFA registration state and remove stale sessions if the user is stuck in a repeated prompt loop.",
    "Use cited guide Microsoft 365 Login Issues as the primary runbook and record the outcome in the ticket."
  ],
  escalationHint: "Escalate if repeated MFA failures, account lockouts, or suspicious sign-in events appear.",
  citations: [
    {
      articleId: "kb-001",
      title: "Microsoft 365 Login Issues",
      slug: "microsoft-365-login-issues",
      matchedTerms: ["outlook", "login", "mfa", "password"],
      relevance: 0.86
    },
    {
      articleId: "kb-002",
      title: "Password Reset and MFA",
      slug: "password-reset-and-mfa",
      matchedTerms: ["password", "mfa", "reset"],
      relevance: 0.72
    }
  ]
};

