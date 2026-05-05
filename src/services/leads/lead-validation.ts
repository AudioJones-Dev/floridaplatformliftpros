import { z } from "zod";
import type { LeadInput, LeadPriority, LeadStatus, LeadUpdate } from "./types";
import { LEAD_PRIORITY_VALUES, LEAD_STATUS_VALUES } from "./types";

// Accepts both camelCase and snake_case keys at the request boundary.
// Internally we normalize to camelCase and feed LeadInput to storage.

const optionalString = z
  .string()
  .nullish()
  .transform((v) => (typeof v === "string" ? v.trim() || null : null));

export const LeadCreateSchema = z
  .object({
    // identity (camel + snake)
    name: optionalString,
    firstName: optionalString,
    first_name: optionalString,
    lastName: optionalString,
    last_name: optionalString,
    email: optionalString,
    phone: optionalString,

    // intent
    serviceNeeded: optionalString,
    service_needed: optionalString,
    propertyType: optionalString,
    property_type: optionalString,
    timeline: optionalString,
    message: optionalString,

    // geography
    county: optionalString,
    city: optionalString,

    // attribution
    leadSourcePage: optionalString,
    lead_source_page: optionalString,
    utmSource: optionalString,
    utm_source: optionalString,
    utmMedium: optionalString,
    utm_medium: optionalString,
    utmCampaign: optionalString,
    utm_campaign: optionalString,
  })
  .passthrough()
  .transform((raw): LeadInput => {
    const merged: LeadInput = {
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
    };
    return merged;
  })
  .superRefine((data, ctx) => {
    // Require name OR firstName
    if (!data.name && !data.firstName) {
      ctx.addIssue({
        code: "custom",
        message: "Name (or firstName) is required.",
        path: ["name"],
      });
    }
    // Require email OR phone
    if (!data.email && !data.phone) {
      ctx.addIssue({
        code: "custom",
        message: "At least one of email or phone is required.",
        path: ["email"],
      });
    }
    // Require serviceNeeded
    if (!data.serviceNeeded) {
      ctx.addIssue({
        code: "custom",
        message: "serviceNeeded is required.",
        path: ["serviceNeeded"],
      });
    }
  });

export const LeadUpdateSchema = z
  .object({
    status: z
      .enum(LEAD_STATUS_VALUES as readonly [LeadStatus, ...LeadStatus[]])
      .nullish()
      .transform((v) => v ?? undefined),
    priority: z
      .enum(LEAD_PRIORITY_VALUES as readonly [LeadPriority, ...LeadPriority[]])
      .nullish()
      .transform((v) => v ?? undefined),
    assignedTo: z.string().nullish().transform((v) => v ?? undefined),
    assigned_to: z.string().nullish().transform((v) => v ?? undefined),
    notes: z.string().nullish().transform((v) => v ?? undefined),
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
