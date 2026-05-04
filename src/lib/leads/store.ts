import { promises as fs } from "node:fs";
import path from "node:path";

export interface Lead {
  id?: string;
  name: string;
  phone: string;
  email?: string;
  service?: string;
  message?: string;
  createdAt?: string;
}

export interface LeadStore {
  save(lead: Lead): Promise<{ success: boolean; id?: string }>;
}

class MockLeadStore implements LeadStore {
  async save(lead: Lead): Promise<{ success: boolean; id?: string }> {
    const id = `mock-${Date.now()}`;
    if (process.env.NODE_ENV === "development") {
      console.log("[MockLeadStore] Lead received (dev only):", { ...lead, id });
    }
    return { success: true, id };
  }
}

// Local-dev persistence only — serverless filesystems are read-only at runtime.
// File path is gitignored (see /data/ in .gitignore).
class JsonFileLeadStore implements LeadStore {
  private filePath = path.resolve(process.cwd(), "data", "leads.json");

  async save(lead: Lead): Promise<{ success: boolean; id?: string }> {
    const id = `json-${Date.now()}`;
    const record = { ...lead, id };
    try {
      await fs.mkdir(path.dirname(this.filePath), { recursive: true });
      let existing: Lead[] = [];
      try {
        const raw = await fs.readFile(this.filePath, "utf8");
        existing = JSON.parse(raw) as Lead[];
      } catch {
        // file doesn't exist yet or is malformed — start fresh
      }
      existing.push(record);
      await fs.writeFile(this.filePath, JSON.stringify(existing, null, 2), "utf8");
      return { success: true, id };
    } catch (err) {
      console.error("[JsonFileLeadStore] write failed, falling back without persistence:", err);
      return { success: true, id };
    }
  }
}

let _store: LeadStore | null = null;

export function getLeadStore(): LeadStore {
  if (_store) return _store;
  const provider = (process.env.LEAD_STORAGE_PROVIDER ?? "mock").toLowerCase();
  switch (provider) {
    case "mock":
      _store = new MockLeadStore();
      break;
    case "json":
      _store = new JsonFileLeadStore();
      break;
    default:
      console.warn(
        `[leads] Unknown LEAD_STORAGE_PROVIDER="${provider}" — falling back to mock. Valid: mock | json.`
      );
      _store = new MockLeadStore();
  }
  return _store;
}
