import { z } from "zod";
import type { LeadInput, LeadPriority, LeadStatus, LeadUpdate } from "./types";
import { LEAD_PRIORITY_VALUES, LEAD_STATUS_VALUES } from "./types";

// Accepts both camelCase and snake_case keys at the request boundary.
// Internally we normalize to camelCase and feed LeadInput to storage.

// Optional text helper:
//   1. truly optional (key may be absent)
//   2. null and undefined both pass through as undefined
//   3. strings are trimmed; empty-after-trim becomes undefined (so HTML form
//      empty inputs don't satisfy presence checks downstream)
const optionalText = z.preprocess((value) => {
  if (value === null || value === undefined) return undefined;
  if (typeof value !== "string") return value;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}, z.string().optional());

const optionalEnum = <V extends readonly [string, ...string[]]>(values: V) =>
  z.preprocess((value) => {
    if (value === null || value === undefined) return undefined;
    if (typeof value !== "string") return value;
    const trimmed = value.trim();
    return trimmed.length > 0 ? trimmed : undefined;
  }, z.enum(values).optional());

export const LeadCreateSchema = z
  .object({
    // identity (camel + snake)
    name: optionalText,
    firstName: optionalText,
    first_name: optionalText,
    lastName: optionalText,
    last_name: optionalText,
    email: optionalText,
    phone: optionalText,

    // intent
    serviceNeeded: optionalText,
    service_needed: optionalText,
    propertyType: optionalText,
    property_type: optionalText,
    timeline: optionalText,
    message: optionalText,

    // geography
    county: optionalText,
    city: optionalText,

    // attribution
    leadSourcePage: optionalText,
    lead_source_page: optionalText,
    utmSource: optionalText,
    utm_source: optionalText,
    utmMedium: optionalText,
    utm_medium: optionalText,
    utmCampaign: optionalText,
    utm_campaign: optionalText,

    // Honeypot — if filled, the request is from a bot. Validation rejects it.
    company: optionalText,
  })
  .passthrough()
  .superRefine((raw, ctx) => {
    // Honeypot trip — bot detected. Reject without revealing the rule.
    if (raw.company) {
      ctx.addIssue({
        code: "custom",
        message: "Validation failed.",
        path: ["company"],
      });
    }
    // After preprocess, all empty/whitespace strings are undefined,
    // so identity / contact / service rules can be checked by presence.
    const name = raw.name ?? raw.firstName ?? raw.first_name;
    if (!name) {
      ctx.addIssue({
        code: "custom",
        message: "Either name or firstName is required.",
        path: ["name"],
      });
    }
    const email = raw.email;
    const phone = raw.phone;
    if (!email && !phone) {
      ctx.addIssue({
        code: "custom",
        message: "Either email or phone is required.",
        path: ["email"],
      });
    }
    const serviceNeeded = raw.serviceNeeded ?? raw.service_needed;
    if (!serviceNeeded) {
      ctx.addIssue({
        code: "custom",
        message: "serviceNeeded is required.",
        path: ["serviceNeeded"],
      });
    }

    // Field-level length caps — keeps a 10MB JSON body from filling the DB.
    const lengthCaps: Array<[string, string | undefined, number]> = [
      ["name", raw.name, 200],
      ["firstName", raw.firstName ?? raw.first_name, 100],
      ["lastName", raw.lastName ?? raw.last_name, 100],
      ["email", raw.email, 320],
      ["phone", raw.phone, 40],
      ["serviceNeeded", serviceNeeded, 100],
      ["propertyType", raw.propertyType ?? raw.property_type, 100],
      ["timeline", raw.timeline, 100],
      ["county", raw.county, 100],
      ["city", raw.city, 100],
      ["leadSourcePage", raw.leadSourcePage ?? raw.lead_source_page, 500],
      ["utmSource", raw.utmSource ?? raw.utm_source, 100],
      ["utmMedium", raw.utmMedium ?? raw.utm_medium, 100],
      ["utmCampaign", raw.utmCampaign ?? raw.utm_campaign, 100],
      ["message", raw.message, 4000],
    ];
    for (const [field, value, max] of lengthCaps) {
      if (typeof value === "string" && value.length > max) {
        ctx.addIssue({
          code: "custom",
          message: `${field} exceeds ${max} characters.`,
          path: [field],
        });
      }
    }

    // Email shape check — only when an email was provided.
    if (typeof raw.email === "string" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(raw.email)) {
      ctx.addIssue({
        code: "custom",
        message: "email must be a valid address.",
        path: ["email"],
      });
    }
  })
  .transform((raw): LeadInput => ({
    name: raw.name ?? null,
    firstName: raw.firstName ?? raw.first_name ?? null,
    lastName: raw.lastName ?? raw.last_name ?? null,
    email: normalizeEmail(raw.email),
    phone: normalizePhone(raw.phone),
    serviceNeeded: raw.serviceNeeded ?? raw.service_needed ?? null,
    propertyType: raw.propertyType ?? raw.property_type ?? null,
    timeline: raw.timeline ?? null,
    message: raw.message ?? null,
    county: raw.county ?? null,
    city: raw.city ?? null,
    leadSourcePage: raw.leadSourcePage ?? raw.lead_source_page ?? null,
    utmSource: raw.utmSource ?? raw.utm_source ?? null,
    utmMedium: raw.utmMedium ?? raw.utm_medium ?? null,
    utmCampaign: raw.utmCampaign ?? raw.utm_campaign ?? null,
  }));

export const LeadUpdateSchema = z
  .object({
    status: optionalEnum(LEAD_STATUS_VALUES as readonly [LeadStatus, ...LeadStatus[]]),
    priority: optionalEnum(LEAD_PRIORITY_VALUES as readonly [LeadPriority, ...LeadPriority[]]),
    assignedTo: optionalText,
    assigned_to: optionalText,
    notes: optionalText,
  })
  .passthrough()
  .transform((raw): LeadUpdate => ({
    status: raw.status,
    priority: raw.priority,
    assignedTo: raw.assignedTo ?? raw.assigned_to,
    notes: raw.notes,
  }));

export function normalizeEmail(input: unknown): string | null {
  if (typeof input !== "string") return null;
  const trimmed = input.trim().toLowerCase();
  return trimmed || null;
}

// Normalize US phone to "(NXX) NXX-XXXX". Returns input as-is (trimmed) if not a clean
// 10-digit US number. Strips a leading "1" / "+1".
export function normalizePhone(input: unknown): string | null {
  if (typeof input !== "string") return null;
  const trimmed = input.trim();
  if (!trimmed) return null;
  const digits = trimmed.replace(/\D/g, "");
  let core = digits;
  if (core.length === 11 && core.startsWith("1")) core = core.slice(1);
  if (core.length !== 10) return trimmed;
  return `(${core.slice(0, 3)}) ${core.slice(3, 6)}-${core.slice(6)}`;
}

// UUID v4 (and v3/v5) shape — used by PATCH route.
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function isValidUuid(s: string): boolean {
  return UUID_RE.test(s);
}
