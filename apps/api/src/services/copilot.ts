import type { CopilotAnalysis, CopilotCitation, KnowledgeArticle, TicketCategory, TicketPriority } from "@company-it/shared";
import { knowledgeArticles } from "../data/seed.js";

const categorySignals: Record<TicketCategory, string[]> = {
  account: ["password", "mfa", "account", "locked", "reset", "sign in", "login"],
  microsoft_365: ["outlook", "office", "microsoft 365", "onedrive", "sharepoint", "licence", "license", "login", "sign in", "mfa"],
  vpn: ["vpn", "remote", "internal", "crm", "file share", "split tunnel"],
  network: ["wifi", "wi-fi", "lan", "dns", "network", "internet", "ethernet"],
  hardware: ["laptop", "monitor", "printer", "keyboard", "mouse", "headset", "device"],
  software: ["install", "application", "software", "update", "patch"],
  email: ["email", "mailbox", "exchange", "outlook"],
  teams: ["teams", "meeting", "microphone", "camera", "speaker", "audio"],
  onboarding: ["new starter", "onboarding", "starter", "joiner", "entra", "group", "access"]
};

const prioritySignals: Array<{ priority: TicketPriority; terms: string[] }> = [
  { priority: "critical", terms: ["security incident", "data loss", "all users", "outage", "cannot work"] },
  { priority: "high", terms: ["locked out", "mfa loop", "finance", "executive", "urgent", "password reset"] },
  { priority: "medium", terms: ["vpn", "crm", "new starter", "internal", "access"] },
  { priority: "low", terms: ["question", "how do i", "minor", "headset", "printer"] }
];

export function analyseIssue(issue: string, articles: KnowledgeArticle[] = knowledgeArticles): CopilotAnalysis {
  const category = classifyCategory(issue);
  const priority = recommendPriority(issue);
  const citations = retrieveArticles(issue, articles);
  const suggestedSteps = buildSuggestedSteps(issue, category, citations);
  const confidence = calculateConfidence(citations, category);

  return {
    category,
    priority,
    confidence,
    summary: `Likely ${readableCategory(category)} issue requiring ${priority} priority triage.`,
    suggestedSteps,
    escalationHint: buildEscalationHint(category, priority, confidence),
    citations
  };
}

export function classifyCategory(issue: string): TicketCategory {
  const normalised = normalise(issue);

  if (["teams", "microphone", "camera", "meeting"].some((term) => normalised.includes(term))) {
    return "teams";
  }

  if (["outlook", "office", "microsoft 365", "onedrive", "sharepoint"].some((term) => normalised.includes(term))) {
    return "microsoft_365";
  }

  let bestCategory: TicketCategory = "software";
  let bestScore = 0;

  for (const [category, terms] of Object.entries(categorySignals) as Array<[TicketCategory, string[]]>) {
    const score = terms.reduce((total, term) => total + (normalised.includes(term) ? termWeight(term) : 0), 0);

    if (score > bestScore) {
      bestScore = score;
      bestCategory = category;
    }
  }

  return bestCategory;
}

export function recommendPriority(issue: string): TicketPriority {
  const normalised = normalise(issue);

  for (const signal of prioritySignals) {
    if (signal.terms.some((term) => normalised.includes(term))) {
      return signal.priority;
    }
  }

  return "medium";
}

export function retrieveArticles(issue: string, articles: KnowledgeArticle[]): CopilotCitation[] {
  const normalisedIssue = normalise(issue);
  const issueTerms = tokenise(normalisedIssue);

  return articles
    .map((article) => {
      const searchable = normalise(`${article.title} ${article.summary} ${article.tags.join(" ")} ${article.content}`);
      const matchedTerms = Array.from(
        new Set(
          [...issueTerms, ...article.tags.filter((tag) => normalisedIssue.includes(normalise(tag)))]
            .filter((term) => term.length > 2)
            .filter((term) => searchable.includes(term))
        )
      );
      const categoryBoost = article.category === classifyCategory(issue) ? 2 : 0;
      const relevance = Math.min(1, (matchedTerms.length + categoryBoost) / 10);

      return {
        articleId: article.id,
        title: article.title,
        slug: article.slug,
        matchedTerms: matchedTerms.slice(0, 8),
        relevance: Number(relevance.toFixed(2))
      };
    })
    .filter((citation) => citation.relevance > 0)
    .sort((a, b) => b.relevance - a.relevance)
    .slice(0, 3);
}

function buildSuggestedSteps(issue: string, category: TicketCategory, citations: CopilotCitation[]): string[] {
  const stepsByCategory: Record<TicketCategory, string[]> = {
    account: [
      "Verify the requester's identity and confirm the password reset or account change timestamp.",
      "Check MFA registration state and remove stale sessions if the user is stuck in a repeated prompt loop.",
      "Escalate to an admin if account lockout or suspicious sign-in activity appears."
    ],
    microsoft_365: [
      "Check Microsoft 365 service health and confirm whether web access works in Outlook on the web.",
      "Clear cached Office credentials and stale work account sessions on the affected Windows device.",
      "Re-authenticate Office apps and document whether MFA prompts complete successfully."
    ],
    vpn: [
      "Confirm VPN authentication succeeds and compare access from home Wi-Fi with a mobile hotspot.",
      "Test DNS resolution and route access for the affected internal application or file share.",
      "Renew VPN credentials or refresh the VPN client profile if internal resources remain unreachable."
    ],
    network: [
      "Check whether the issue affects one device, one location, or multiple users.",
      "Test DNS, gateway, Wi-Fi, and wired connectivity before escalating to network administration.",
      "Record screenshots or command output for repeatable failure evidence."
    ],
    hardware: [
      "Confirm the asset tag, warranty status, and whether the problem follows the device or the peripheral.",
      "Run basic hardware checks and compare with a known-good cable, dock, or headset.",
      "Move the asset to repair status if replacement or vendor support is required."
    ],
    software: [
      "Confirm whether the user has approval for the requested software or update.",
      "Check installation logs, device policy, and version compatibility.",
      "Escalate if admin rights, packaging, or licensing changes are required."
    ],
    email: [
      "Check mailbox access in the browser and desktop app separately.",
      "Review profile, cache, and credential state before rebuilding the Outlook profile.",
      "Escalate if mail flow, shared mailbox permissions, or Exchange service health is involved."
    ],
    teams: [
      "Check Teams device settings and Windows microphone or camera permissions.",
      "Test the headset in another app and run a Teams test call.",
      "Update or reinstall drivers only after device selection and permissions have been verified."
    ],
    onboarding: [
      "Confirm manager approval, department, start date, and required application access.",
      "Create or prepare the Entra ID account, Microsoft 365 licence, Teams access, VPN group, and device assignment.",
      "Send first-login instructions and track completion in the onboarding checklist."
    ]
  };

  const steps = stepsByCategory[category];
  const citationStep =
    citations.length > 0
      ? `Use cited guide ${citations[0]?.title ?? "the top knowledge article"} as the primary runbook and record the outcome in the ticket.`
      : "No strong knowledge-base match was found; record troubleshooting evidence and escalate if the issue blocks work.";

  if (normalise(issue).includes("mfa") && !steps.some((step) => step.toLowerCase().includes("mfa"))) {
    return [steps[0] ?? "Review the issue details.", "Check MFA method registration and recent sign-in activity.", ...steps.slice(1), citationStep];
  }

  return [...steps, citationStep];
}

function calculateConfidence(citations: CopilotCitation[], category: TicketCategory): number {
  const topRelevance = citations[0]?.relevance ?? 0.2;
  const categoryCitation = citations.some((citation) => citation.slug.includes(category.replace("_", "-")));
  const confidence = topRelevance + (categoryCitation ? 0.12 : 0);

  return Number(Math.min(0.94, Math.max(0.35, confidence)).toFixed(2));
}

function buildEscalationHint(category: TicketCategory, priority: TicketPriority, confidence: number): string {
  if (priority === "critical") {
    return "Escalate immediately to the IT admin or incident owner and keep the user informed.";
  }

  if (confidence < 0.5) {
    return "Low confidence result. Capture more details before applying changes.";
  }

  if (category === "account" || category === "microsoft_365") {
    return "Escalate if repeated MFA failures, account lockouts, or suspicious sign-in events appear.";
  }

  return "Proceed with first-line troubleshooting and escalate if the issue blocks business-critical work.";
}

function readableCategory(category: TicketCategory): string {
  const labels: Record<TicketCategory, string> = {
    account: "account",
    microsoft_365: "Microsoft 365",
    vpn: "VPN",
    network: "network",
    hardware: "hardware",
    software: "software",
    email: "email",
    teams: "Teams",
    onboarding: "onboarding"
  };

  return labels[category];
}

function normalise(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9\s-]/g, " ").replace(/\s+/g, " ").trim();
}

function tokenise(value: string): string[] {
  const stopWords = new Set(["the", "and", "for", "with", "after", "from", "this", "that", "into", "when", "then", "than", "but", "not", "sign"]);

  return value
    .split(/\s+/)
    .map((term) => term.trim())
    .filter((term) => term.length > 2)
    .filter((term) => !stopWords.has(term));
}

function termWeight(term: string): number {
  return term.includes(" ") ? 2 : 1;
}
