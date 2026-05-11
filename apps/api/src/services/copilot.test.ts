import { describe, expect, it } from "vitest";
import { analyseIssue, classifyCategory, retrieveArticles } from "./copilot.js";
import { knowledgeArticles } from "../data/seed.js";

describe("support copilot", () => {
  it("classifies Microsoft 365 sign-in issues", () => {
    expect(classifyCategory("Outlook keeps asking me to login after password reset and MFA approval")).toBe("microsoft_365");
  });

  it("retrieves relevant citations for VPN issues", () => {
    const citations = retrieveArticles("VPN connects but internal CRM and file share time out", knowledgeArticles);

    expect(citations[0]?.slug).toBe("vpn-troubleshooting");
  });

  it("returns cited action steps for MFA loops", () => {
    const analysis = analyseIssue("I cannot sign in to Outlook after password reset because MFA keeps looping");

    expect(analysis.priority).toBe("high");
    expect(analysis.citations.length).toBeGreaterThan(0);
    expect(analysis.suggestedSteps.some((step) => step.toLowerCase().includes("mfa"))).toBe(true);
  });
});

