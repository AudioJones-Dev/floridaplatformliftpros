import { neon, type NeonQueryFunction } from "@neondatabase/serverless";
import type {
  LeadInput,
  LeadPriority,
  LeadRecord,
  LeadStatus,
  LeadStorage,
  LeadUpdate,
} from "./types";

// ─── Mock adapter ───────────────────────────────────────────────────────────
// In-memory; logs in dev. Used for local development only. Never returned
// from getLeadStorage() when NODE_ENV === "production" — see guard below.

class MockLeadStorage implements LeadStorage {
  private rows: LeadRecord[] = [];

  async create(input: LeadInput): Promise<LeadRecord> {
    const now = new Date().toISOString();
    const record: LeadRecord = {
      id: `mock-${crypto.randomUUID()}`,
      createdAt: now,
      updatedAt: now,
      status: "new",
      priority: "normal",
      ...input,
    };
    this.rows.unshift(record);
    if (process.env.NODE_ENV === "development") {
      console.log("[MockLeadStorage] lead received (dev only):", {
        id: record.id,
        email: record.email,
        phone: record.phone,
        serviceNeeded: record.serviceNeeded,
      });
    }
    return record;
  }

  async list(opts?: { limit?: number; status?: LeadStatus }): Promise<LeadRecord[]> {
    let out = this.rows;
    if (opts?.status) out = out.filter((r) => r.status === opts.status);
    if (opts?.limit) out = out.slice(0, opts.limit);
    return out;
  }

  async get(id: string): Promise<LeadRecord | null> {
    return this.rows.find((r) => r.id === id) ?? null;
  }

  async update(id: string, patch: LeadUpdate): Promise<LeadRecord | null> {
    const i = this.rows.findIndex((r) => r.id === id);
    if (i === -1) return null;
    this.rows[i] = {
      ...this.rows[i],
      ...patch,
      updatedAt: new Date().toISOString(),
    };
    return this.rows[i];
  }
}

// ─── Neon adapter ───────────────────────────────────────────────────────────
// Talks to Neon's serverless HTTP driver. Schema lives in sql/006-leads.sql.

interface NeonRow {
  id: string;
  created_at: string;
  updated_at: string;
  name: string | null;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  phone: string | null;
  service_needed: string | null;
  property_type: string | null;
  timeline: string | null;
  message: string | null;
  county: string | null;
  city: string | null;
  lead_source_page: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  status: LeadStatus;
  priority: LeadPriority;
  assigned_to: string | null;
  notes: string | null;
}

function rowToRecord(r: NeonRow): LeadRecord {
  return {
    id: r.id,
    createdAt: r.created_at,
    updatedAt: r.updated_at,
    name: r.name,
    firstName: r.first_name,
    lastName: r.last_name,
    email: r.email,
    phone: r.phone,
    serviceNeeded: r.service_needed,
    propertyType: r.property_type,
    timeline: r.timeline,
    message: r.message,
    county: r.county,
    city: r.city,
    leadSourcePage: r.lead_source_page,
    utmSource: r.utm_source,
    utmMedium: r.utm_medium,
    utmCampaign: r.utm_campaign,
    status: r.status,
    priority: r.priority,
    assignedTo: r.assigned_to,
    notes: r.notes,
  };
}

class NeonLeadStorage implements LeadStorage {
  private sql: NeonQueryFunction<false, false>;

  constructor(connectionString: string) {
    this.sql = neon(connectionString);
  }

  async create(input: LeadInput): Promise<LeadRecord> {
    const rows = (await this.sql`
      INSERT INTO leads (
        name, first_name, last_name, email, phone,
        service_needed, property_type, timeline, message,
        county, city,
        lead_source_page, utm_source, utm_medium, utm_campaign
      ) VALUES (
        ${input.name ?? null}, ${input.firstName ?? null}, ${input.lastName ?? null},
        ${input.email ?? null}, ${input.phone ?? null},
        ${input.serviceNeeded ?? null}, ${input.propertyType ?? null},
        ${input.timeline ?? null}, ${input.message ?? null},
        ${input.county ?? null}, ${input.city ?? null},
        ${input.leadSourcePage ?? null}, ${input.utmSource ?? null},
        ${input.utmMedium ?? null}, ${input.utmCampaign ?? null}
      )
      RETURNING *
    `) as NeonRow[];
    return rowToRecord(rows[0]);
  }

  async list(opts?: { limit?: number; status?: LeadStatus }): Promise<LeadRecord[]> {
    const limit = Math.min(Math.max(opts?.limit ?? 100, 1), 500);
    const rows = opts?.status
      ? ((await this.sql`SELECT * FROM leads WHERE status = ${opts.status} ORDER BY created_at DESC LIMIT ${limit}`) as NeonRow[])
      : ((await this.sql`SELECT * FROM leads ORDER BY created_at DESC LIMIT ${limit}`) as NeonRow[]);
    return rows.map(rowToRecord);
  }

  async get(id: string): Promise<LeadRecord | null> {
    const rows = (await this.sql`SELECT * FROM leads WHERE id = ${id} LIMIT 1`) as NeonRow[];
    return rows[0] ? rowToRecord(rows[0]) : null;
  }

  async update(id: string, patch: LeadUpdate): Promise<LeadRecord | null> {
    // Atomic single-statement update — only fields explicitly provided are written.
    const rows = (await this.sql`
      UPDATE leads SET
        status      = COALESCE(${patch.status ?? null}, status),
        priority    = COALESCE(${patch.priority ?? null}, priority),
        assigned_to = COALESCE(${patch.assignedTo ?? null}, assigned_to),
        notes       = COALESCE(${patch.notes ?? null}, notes)
      WHERE id = ${id}
      RETURNING *
    `) as NeonRow[];
    return rows[0] ? rowToRecord(rows[0]) : null;
  }
}

// ─── Provider resolver ──────────────────────────────────────────────────────
// Hard rule: NODE_ENV=production + provider=mock throws at first call.
// Unknown provider values warn and fall back to mock in dev (still throw in prod).

let _instance: LeadStorage | null = null;

export function getLeadStorage(): LeadStorage {
  if (_instance) return _instance;

  const provider = (process.env.LEAD_STORAGE_PROVIDER ?? "mock").toLowerCase();
  const isProd = process.env.NODE_ENV === "production";

  if (provider === "neon") {
    const url = process.env.DATABASE_URL;
    if (!url) {
      throw new Error(
        "[leads] LEAD_STORAGE_PROVIDER=neon but DATABASE_URL is not set."
      );
    }
    _instance = new NeonLeadStorage(url);
    return _instance;
  }

  if (provider === "mock") {
    if (isProd) {
      throw new Error(
        "[leads] LEAD_STORAGE_PROVIDER=mock is not allowed in production. " +
          "Set LEAD_STORAGE_PROVIDER=neon and provide DATABASE_URL."
      );
    }
    _instance = new MockLeadStorage();
    return _instance;
  }

  // Unknown provider value
  if (isProd) {
    throw new Error(
      `[leads] Unknown LEAD_STORAGE_PROVIDER="${provider}" in production. Valid: mock | neon.`
    );
  }
  console.warn(
    `[leads] Unknown LEAD_STORAGE_PROVIDER="${provider}" — falling back to mock. Valid: mock | neon.`
  );
  _instance = new MockLeadStorage();
  return _instance;
}

// Test-only escape hatch: reset memoized instance (used by tests if added later).
export function _resetLeadStorageForTests() {
  _instance = null;
}
