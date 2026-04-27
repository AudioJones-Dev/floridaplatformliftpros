/**
 * Lead storage abstraction.
 *
 * The active provider is selected via the LEAD_STORAGE_PROVIDER env variable:
 *   mock  (default) — appends to /data/leads.json on the local filesystem.
 *                     Suitable for local development only; not viable on
 *                     read-only runtimes (e.g. Vercel edge functions).
 *
 * To swap in a real database (Neon + Prisma, etc.):
 *   1. Set LEAD_STORAGE_PROVIDER=neon (or whatever name you choose).
 *   2. Add a new case below that calls your Prisma client / ORM.
 *   3. The route handler in src/app/api/lead/route.ts needs no further changes.
 */

import { writeFile, readFile, mkdir } from "fs/promises";
import path from "path";

export interface LeadSubmission {
  id: string;
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
  submittedAt: string;
  ip?: string;
}

export interface LeadStore {
  /** Persist a validated lead and return the saved record. */
  save(lead: LeadSubmission): Promise<LeadSubmission>;
}

// ---------------------------------------------------------------------------
// Mock / JSON-file store (local development only)
// ---------------------------------------------------------------------------

const DATA_DIR = path.join(process.cwd(), "data");
const LEADS_FILE = path.join(DATA_DIR, "leads.json");

interface LeadRecord {
  leads: LeadSubmission[];
}

async function readLeadsFile(): Promise<LeadRecord> {
  try {
    const raw = await readFile(LEADS_FILE, "utf-8");
    return JSON.parse(raw) as LeadRecord;
  } catch {
    return { leads: [] };
  }
}

async function writeLeadsFile(record: LeadRecord): Promise<void> {
  await mkdir(DATA_DIR, { recursive: true });
  await writeFile(LEADS_FILE, JSON.stringify(record, null, 2), "utf-8");
}

const mockStore: LeadStore = {
  async save(lead) {
    const record = await readLeadsFile();
    record.leads.push(lead);
    await writeLeadsFile(record);
    return lead;
  },
};

// ---------------------------------------------------------------------------
// Provider selection
// ---------------------------------------------------------------------------

/**
 * Returns the active LeadStore implementation based on LEAD_STORAGE_PROVIDER.
 * Add additional cases here as new storage back-ends are introduced.
 */
export function getLeadStore(): LeadStore {
  const provider = process.env.LEAD_STORAGE_PROVIDER ?? "mock";

  switch (provider) {
    case "mock":
      return mockStore;

    // case "neon":
    //   return neonStore; // import and wire up Prisma client here

    default:
      console.warn(
        `[leads/store] Unknown LEAD_STORAGE_PROVIDER "${provider}", falling back to mock.`
      );
      return mockStore;
  }
}
