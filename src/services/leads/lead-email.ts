// Resend transactional email. Storage always wins; email is best-effort.
// Uses fetch directly so we do not need a Resend SDK dependency.

import type { LeadRecord } from "./types";

const RESEND_ENDPOINT = "https://api.resend.com/emails";

interface EmailPayload {
  subject: string;
  html: string;
  text: string;
}

function escapeHtml(s: string | null | undefined): string {
  if (s == null) return "";
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function leadName(lead: LeadRecord): string | null {
  return lead.name ?? ([lead.firstName, lead.lastName].filter(Boolean).join(" ") || null);
}

function renderTable(fields: Array<[string, string | null | undefined]>): string[] {
  return fields
    .filter(([, value]) => value != null && value !== "")
    .map(
      ([key, value]) =>
        `<tr><td><strong>${escapeHtml(key)}</strong></td><td>${escapeHtml(value ?? "")}</td></tr>`
    );
}

function buildLeadAlertBody(lead: LeadRecord): EmailPayload {
  const subject = `New Lead - ${lead.serviceNeeded ?? "service unspecified"}`;
  const fields: Array<[string, string | null | undefined]> = [
    ["Name", leadName(lead)],
    ["Phone", lead.phone],
    ["Email", lead.email],
    ["Service Needed", lead.serviceNeeded],
    ["Property Type", lead.propertyType],
    ["Timeline", lead.timeline],
    ["County", lead.county],
    ["City", lead.city],
    ["Source Page", lead.leadSourcePage],
    ["UTM Source", lead.utmSource],
    ["UTM Medium", lead.utmMedium],
    ["UTM Campaign", lead.utmCampaign],
    ["AI Qualification Status", lead.status],
    ["Suggested Handoff Partner", lead.partnerName ?? "Florida Ramp and Lift"],
    ["Lead ID", lead.id],
  ];

  const html = [
    `<h2>New Lead</h2>`,
    `<table cellspacing="0" cellpadding="6" border="1" style="border-collapse:collapse;font-family:system-ui,sans-serif;">`,
    ...renderTable(fields),
    lead.message
      ? `<tr><td><strong>Message</strong></td><td><pre style="white-space:pre-wrap;margin:0;font-family:inherit;">${escapeHtml(lead.message)}</pre></td></tr>`
      : "",
    `</table>`,
  ].join("\n");

  const text = [
    `New Lead`,
    `--------`,
    ...fields.filter(([, value]) => value).map(([key, value]) => `${key}: ${value ?? ""}`),
    lead.message ? `\nMessage:\n${lead.message}` : "",
  ].join("\n");

  return { subject, html, text };
}

function buildPartnerHandoffBody(lead: LeadRecord): EmailPayload {
  const subject = `Qualified Accessibility Lead - ${lead.serviceNeeded ?? "service unspecified"}`;
  const fields: Array<[string, string | null | undefined]> = [
    ["Name", leadName(lead)],
    ["Phone", lead.phone],
    ["Email", lead.email],
    ["Service Needed", lead.serviceNeeded],
    ["Property Type", lead.propertyType],
    ["Timeline", lead.timeline],
    ["County", lead.county],
    ["City", lead.city],
    ["Qualification Fit", lead.qualificationFit],
    ["AI Call Summary", lead.aiCallSummary],
    ["Handoff Notes", lead.partnerHandoffNotes],
    ["Lead ID", lead.id],
  ];

  const html = [
    `<h2>Qualified Accessibility Lead</h2>`,
    `<p>This lead has been prequalified and is ready for fulfillment follow-up.</p>`,
    `<table cellspacing="0" cellpadding="6" border="1" style="border-collapse:collapse;font-family:system-ui,sans-serif;">`,
    ...renderTable(fields),
    lead.message
      ? `<tr><td><strong>Original Message</strong></td><td><pre style="white-space:pre-wrap;margin:0;font-family:inherit;">${escapeHtml(lead.message)}</pre></td></tr>`
      : "",
    `</table>`,
  ].join("\n");

  const text = [
    `Qualified Accessibility Lead`,
    `----------------------------`,
    ...fields.filter(([, value]) => value).map(([key, value]) => `${key}: ${value ?? ""}`),
    lead.message ? `\nOriginal Message:\n${lead.message}` : "",
  ].join("\n");

  return { subject, html, text };
}

async function sendEmail({
  to,
  payload,
  logPrefix,
}: {
  to: string | undefined;
  payload: EmailPayload;
  logPrefix: string;
}): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.DEFAULT_FROM_EMAIL ?? "leads@floridaplatformliftpros.com";

  if (!apiKey || !to) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(`[lead-email] RESEND_API_KEY or recipient missing - skipping ${logPrefix}.`);
    }
    return false;
  }

  try {
    const res = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ from, to, ...payload }),
    });
    if (!res.ok) {
      console.error(`[lead-email] Resend responded ${res.status} ${res.statusText} for ${logPrefix}`);
      return false;
    }
    return true;
  } catch (err) {
    console.error(`[lead-email] Resend send failed for ${logPrefix}:`, err);
    return false;
  }
}

export async function sendLeadAlertEmail(lead: LeadRecord): Promise<boolean> {
  return sendEmail({
    to: process.env.INTERNAL_ALERT_EMAIL,
    payload: buildLeadAlertBody(lead),
    logPrefix: `new lead ${lead.id}`,
  });
}

export async function sendPartnerHandoffEmail(lead: LeadRecord): Promise<boolean> {
  return sendEmail({
    to: process.env.PARTNER_HANDOFF_EMAIL,
    payload: buildPartnerHandoffBody(lead),
    logPrefix: `partner handoff ${lead.id}`,
  });
}
