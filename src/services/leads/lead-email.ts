// Resend transactional email — fail-open: storage always wins, email is best-effort.
// Uses fetch directly (no SDK dep). Never throws; logs and returns false on failure.

import type { LeadRecord } from "./types";

const RESEND_ENDPOINT = "https://api.resend.com/emails";

function escapeHtml(s: string | null | undefined): string {
  if (s == null) return "";
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildBody(lead: LeadRecord): { subject: string; html: string; text: string } {
  const subject = `New Lead — ${lead.serviceNeeded ?? "service unspecified"}`;

  const fields: Array<[string, string | null | undefined]> = [
    ["Name", lead.name ?? ([lead.firstName, lead.lastName].filter(Boolean).join(" ") || null)],
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
    ["Lead ID", lead.id],
  ];

  const filled = fields.filter(([, v]) => v != null && v !== "");

  const html = [
    `<h2>New Lead</h2>`,
    `<table cellspacing="0" cellpadding="6" border="1" style="border-collapse:collapse;font-family:system-ui,sans-serif;">`,
    ...filled.map(
      ([k, v]) =>
        `<tr><td><strong>${escapeHtml(k)}</strong></td><td>${escapeHtml(v ?? "")}</td></tr>`
    ),
    lead.message
      ? `<tr><td><strong>Message</strong></td><td><pre style="white-space:pre-wrap;margin:0;font-family:inherit;">${escapeHtml(lead.message)}</pre></td></tr>`
      : "",
    `</table>`,
  ].join("\n");

  const text = [
    `New Lead`,
    `--------`,
    ...filled.map(([k, v]) => `${k}: ${v ?? ""}`),
    lead.message ? `\nMessage:\n${lead.message}` : "",
  ].join("\n");

  return { subject, html, text };
}

export async function sendLeadAlertEmail(lead: LeadRecord): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.INTERNAL_ALERT_EMAIL;
  const from = process.env.DEFAULT_FROM_EMAIL ?? "leads@floridaplatformliftpros.com";

  if (!apiKey || !to) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        "[lead-email] RESEND_API_KEY or INTERNAL_ALERT_EMAIL missing — skipping alert (dev)."
      );
    }
    return false;
  }

  const { subject, html, text } = buildBody(lead);

  try {
    const res = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ from, to, subject, html, text }),
    });
    if (!res.ok) {
      console.error(
        `[lead-email] Resend responded ${res.status} ${res.statusText} for lead ${lead.id}`
      );
      return false;
    }
    return true;
  } catch (err) {
    console.error("[lead-email] Resend send failed:", err);
    return false;
  }
}
