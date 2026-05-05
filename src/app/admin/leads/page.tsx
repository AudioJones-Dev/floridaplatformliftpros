import { headers } from "next/headers";
import type { Metadata } from "next";
import { getLeadStorage } from "@/services/leads/lead-storage";
import { checkAdminAuth } from "@/services/leads/admin-auth";
import type { LeadRecord } from "@/services/leads/types";

export const metadata: Metadata = {
  title: "Lead Admin",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminLeadsPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const sp = await searchParams;
  const headerList = await headers();
  const provided = sp.token ?? headerList.get("x-admin-token") ?? null;
  const auth = checkAdminAuth(provided);

  if (!auth.ok) {
    return (
      <main className="min-h-screen flex items-center justify-center px-6 bg-gray-50">
        <div className="max-w-md text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Access denied</h1>
          <p className="text-gray-600 text-sm">
            {auth.reason === "missing"
              ? "Admin token required."
              : "Invalid admin token."}
          </p>
        </div>
      </main>
    );
  }

  let leads: LeadRecord[] = [];
  let loadError: string | null = null;
  try {
    leads = await getLeadStorage().list({ limit: 200 });
  } catch (err) {
    loadError = (err as Error).message;
  }

  const totalCount = leads.length;
  const newCount = leads.filter((l) => l.status === "new").length;
  const urgentCount = leads.filter((l) => l.priority === "urgent").length;

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-6 flex items-baseline justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Lead Admin</h1>
          {auth.mode === "dev-warn" && (
            <span className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded px-2 py-1">
              Dev mode — ADMIN_ACCESS_TOKEN not set
            </span>
          )}
        </header>

        {loadError ? (
          <div className="bg-red-50 border border-red-200 rounded p-4 text-red-800 text-sm">
            Failed to load leads: {loadError}
          </div>
        ) : (
          <>
            <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <Stat label="Total leads" value={totalCount} />
              <Stat label="New" value={newCount} />
              <Stat label="Urgent" value={urgentCount} highlight={urgentCount > 0} />
            </section>

            <section className="bg-white border border-gray-200 rounded-lg overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-100 text-gray-700">
                  <tr>
                    <Th>Name</Th>
                    <Th>Phone</Th>
                    <Th>Email</Th>
                    <Th>Service</Th>
                    <Th>County</Th>
                    <Th>Status</Th>
                    <Th>Priority</Th>
                    <Th>Created</Th>
                  </tr>
                </thead>
                <tbody>
                  {leads.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="px-4 py-6 text-center text-gray-500">
                        No leads yet.
                      </td>
                    </tr>
                  ) : (
                    leads.map((l) => (
                      <tr key={l.id} className="border-t border-gray-100">
                        <Td>{displayName(l)}</Td>
                        <Td>{l.phone ?? "—"}</Td>
                        <Td>{l.email ?? "—"}</Td>
                        <Td>{l.serviceNeeded ?? "—"}</Td>
                        <Td>{l.county ?? l.city ?? "—"}</Td>
                        <Td>
                          <Badge value={l.status} />
                        </Td>
                        <Td>
                          <Badge value={l.priority} highlight={l.priority === "urgent"} />
                        </Td>
                        <Td>{formatDate(l.createdAt)}</Td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </section>

            <p className="text-xs text-gray-500 mt-4">
              Showing {leads.length} most recent. Update via{" "}
              <code className="bg-gray-100 px-1 rounded">PATCH /api/leads/&lt;id&gt;</code> with{" "}
              <code className="bg-gray-100 px-1 rounded">x-admin-token</code> header.
            </p>
          </>
        )}
      </div>
    </main>
  );
}

function Stat({ label, value, highlight }: { label: string; value: number; highlight?: boolean }) {
  return (
    <div
      className={`bg-white border rounded-lg p-4 ${
        highlight ? "border-amber-400" : "border-gray-200"
      }`}
    >
      <div className="text-xs uppercase tracking-wide text-gray-500">{label}</div>
      <div className={`text-3xl font-bold ${highlight ? "text-amber-700" : "text-gray-900"}`}>
        {value}
      </div>
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th className="px-4 py-3 text-left font-semibold text-xs uppercase tracking-wide">{children}</th>
  );
}
function Td({ children }: { children: React.ReactNode }) {
  return <td className="px-4 py-3 text-gray-800">{children}</td>;
}

function Badge({ value, highlight }: { value: string; highlight?: boolean }) {
  return (
    <span
      className={`inline-block text-xs font-medium rounded px-2 py-0.5 border ${
        highlight
          ? "bg-amber-50 text-amber-800 border-amber-300"
          : "bg-gray-50 text-gray-700 border-gray-200"
      }`}
    >
      {value}
    </span>
  );
}

function displayName(l: LeadRecord): string {
  if (l.name) return l.name;
  const combined = [l.firstName, l.lastName].filter(Boolean).join(" ");
  return combined || "—";
}

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}
