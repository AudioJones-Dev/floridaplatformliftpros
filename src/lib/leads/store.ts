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

let _store: LeadStore | null = null;

export function getLeadStore(): LeadStore {
  if (_store) return _store;
  const provider = process.env.LEAD_STORAGE_PROVIDER ?? "mock";
  if (provider === "mock") {
    _store = new MockLeadStore();
  } else {
    // Extend here for production providers (e.g. CRM, database)
    _store = new MockLeadStore();
  }
  return _store;
}
