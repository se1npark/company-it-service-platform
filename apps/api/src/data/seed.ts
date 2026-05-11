import type { Asset, KnowledgeArticle, Ticket, User } from "@company-it/shared";

export const users: User[] = [
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
  },
  {
    id: "admin-001",
    fullName: "Olivia Brown",
    email: "olivia.brown@northstar.example",
    department: "IT",
    role: "it_admin",
    location: "Sydney",
    onboardingStatus: "completed"
  }
];

export const assets: Asset[] = [
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
  },
  {
    id: "asset-004",
    assetTag: "NSW-MON-0310",
    type: "monitor",
    model: "Dell UltraSharp 27",
    status: "repair",
    warrantyExpiry: "2026-06-20"
  }
];

export const tickets: Ticket[] = [
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
    assignedAgentId: "admin-001",
    assetId: "asset-003",
    createdAt: "2026-05-09T05:10:00.000Z",
    updatedAt: "2026-05-10T00:45:00.000Z",
    slaDueAt: "2026-05-15T06:00:00.000Z",
    comments: [
      {
        id: "comment-002",
        authorName: "Olivia Brown",
        body: "Waiting on manager confirmation for Sales and Finance app access.",
        createdAt: "2026-05-10T00:45:00.000Z"
      }
    ]
  },
  {
    id: "ticket-1004",
    title: "Teams microphone is not detected",
    description: "Teams cannot detect my headset microphone after Windows updates. Browser version works sometimes.",
    category: "teams",
    priority: "low",
    status: "resolved",
    requesterId: "user-001",
    assignedAgentId: "agent-001",
    assetId: "asset-001",
    createdAt: "2026-05-08T22:30:00.000Z",
    updatedAt: "2026-05-09T01:10:00.000Z",
    slaDueAt: "2026-05-10T22:30:00.000Z",
    comments: [
      {
        id: "comment-003",
        authorName: "Ethan Park",
        body: "Updated device driver and reset Teams device permissions.",
        createdAt: "2026-05-09T01:10:00.000Z"
      }
    ]
  }
];

export const knowledgeArticles: KnowledgeArticle[] = [
  {
    id: "kb-001",
    slug: "microsoft-365-login-issues",
    title: "Microsoft 365 Login Issues",
    category: "microsoft_365",
    summary: "Troubleshooting steps for Outlook, Office, browser sign-in loops, cached credentials, and account lockouts.",
    tags: ["outlook", "office", "login", "mfa", "password", "credentials", "browser"],
    content: "Check service health, confirm password reset completion, clear cached Office credentials, verify MFA registration, try web Outlook, remove stale work account sessions, and escalate repeated lockouts."
  },
  {
    id: "kb-002",
    slug: "password-reset-and-mfa",
    title: "Password Reset and MFA",
    category: "account",
    summary: "Account recovery process covering password resets, temporary access pass, MFA prompts, and identity verification.",
    tags: ["password", "mfa", "account", "reset", "temporary access pass", "identity"],
    content: "Verify identity, confirm the password reset timestamp, revoke stale sessions when needed, re-register MFA methods, and document whether a temporary access pass was issued."
  },
  {
    id: "kb-003",
    slug: "vpn-troubleshooting",
    title: "VPN Troubleshooting",
    category: "vpn",
    summary: "Checks for VPN connection, DNS, split tunnel routes, expired credentials, and blocked internal resources.",
    tags: ["vpn", "dns", "network", "crm", "file share", "route", "remote"],
    content: "Confirm the user can authenticate, renew VPN credentials, check DNS resolution for internal hostnames, test access to file shares, refresh routes, and compare home network versus mobile hotspot."
  },
  {
    id: "kb-004",
    slug: "teams-audio-issues",
    title: "Teams Audio Issues",
    category: "teams",
    summary: "Fixes for microphone, speaker, headset, permissions, browser, and Windows audio device problems.",
    tags: ["teams", "microphone", "headset", "audio", "speaker", "permissions", "driver"],
    content: "Check Teams device settings, Windows input permissions, headset mute controls, browser permissions, driver updates, and test calls. Reinstall Teams only after device and permission checks."
  },
  {
    id: "kb-005",
    slug: "new-starter-account-setup",
    title: "New Starter Account Setup",
    category: "onboarding",
    summary: "Checklist for Microsoft 365, Teams, VPN, device assignment, manager approval, and first-day access.",
    tags: ["onboarding", "new starter", "entra", "microsoft 365", "teams", "vpn", "laptop"],
    content: "Create the account, assign department groups, add Microsoft 365 licence, enable Teams, assign VPN group, allocate a laptop, confirm manager approval, and send first-login instructions."
  }
];

