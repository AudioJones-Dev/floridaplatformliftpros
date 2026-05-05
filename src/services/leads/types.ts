// Shared lead types used across storage, API, email, and admin layers.

export type LeadStatus =
  | "new"
  | "contacted"
  | "qualified"
  | "quoted"
  | "won"
  | "lost"
  | "spam";

export type LeadPriority = "low" | "normal" | "high" | "urgent";

export const LEAD_STATUS_VALUES: readonly LeadStatus[] = [
  "new",
  "contacted",
  "qualified",
  "quoted",
  "won",
  "lost",
  "spam",
] as const;

export const LEAD_PRIORITY_VALUES: readonly LeadPriority[] = [
  "low",
  "normal",
  "high",
  "urgent",
] as const;

export interface LeadInput {
  name?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  phone?: string | null;
  serviceNeeded?: string | null;
  propertyType?: string | null;
  timeline?: string | null;
  message?: string | null;
  county?: string | null;
  city?: string | null;
  leadSourcePage?: string | null;
  utmSource?: string | null;
  utmMedium?: string | null;
  utmCampaign?: string | null;
}

export interface LeadRecord extends LeadInput {
  id: string;
  createdAt: string;
  updatedAt: string;
  status: LeadStatus;
  priority: LeadPriority;
  assignedTo?: string | null;
  notes?: string | null;
}

export interface LeadUpdate {
  status?: LeadStatus;
  priority?: LeadPriority;
  assignedTo?: string | null;
  notes?: string | null;
}

export interface LeadStorage {
  create(input: LeadInput): Promise<LeadRecord>;
  list(opts?: { limit?: number; status?: LeadStatus }): Promise<LeadRecord[]>;
  get(id: string): Promise<LeadRecord | null>;
  update(id: string, patch: LeadUpdate): Promise<LeadRecord | null>;
}
