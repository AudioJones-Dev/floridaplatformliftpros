import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import type { Metadata } from "next";
import { getLeadStorage } from "@/services/leads/lead-storage";
import { checkAdminAuth } from "@/services/leads/admin-auth";
import { sendPartnerHandoffEmail } from "@/services/leads/lead-email";
import {
  LEAD_PRIORITY_VALUES,
  LEAD_STATUS_VALUES,
  type LeadPriority,
  type LeadRecord,
  type LeadStatus,
  type LeadUpdate,
} from "@/services/leads/types";

export const metadata: Metadata = {
  title: "Lead Admin",
  description: "Private lead and commission tracking dashboard.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "Lead Admin",
    description: "Private lead and commission tracking dashboard.",
    url: "/admin/leads",
  },
  alternates: { canonical: "/admin/leads" },
};

export const dynamic = "force-dynamic";

async function updateLeadAction(formData: FormData) {
  "use server";

  const token = valueFromForm(formData, "token");
  const auth = checkAdminAuth(token);
  if (!auth.ok) return;

  const id = valueFromForm(formData, "id");
  if (!id) return;

  const patch: LeadUpdate = {
    status: valueFromForm(formData, "status") as LeadStatus | undefined,
    priority: valueFromForm(formData, "priority") as LeadPriority | undefined,
    assignedTo: valueFromForm(formData, "assignedTo"),
    notes: valueFromForm(formData, "notes"),
    aiCallSummary: valueFromForm(formData, "aiCallSummary"),
    qualificationFit: valueFromForm(formData, "qualificationFit"),
    partnerName: valueFromForm(formData, "partnerName"),
    partnerHandoffAt: valueFromForm(formData, "partnerHandoffAt"),
    partnerHandoffNotes: valueFromForm(formData, "partnerHandoffNotes"),
    dealSpecs: valueFromForm(formData, "dealSpecs"),
    estimatedDealValue: valueFromForm(formData, "estimatedDealValue"),
    commissionStatus: valueFromForm(formData, "commissionStatus"),
    commissionAmount: valueFromForm(formData, "commissionAmount"),
    closedAt: valueFromForm(formData, "closedAt"),
  };

  const updated = await getLeadStorage().update(id, patch);
  if (updated && patch.status === "handed_off") {
    sendPartnerHandoffEmail(updated).catch((err) => {
      console.error("[admin/leads] partner handoff email error:", err);
    });
  }
  revalidatePath("/admin/leads");
}

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
            {auth.reason === "missing" ? "Admin token required." : "Invalid admin token."}
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
  const handoffCount = leads.filter((l) => l.status === "handed_off").length;
  const wonCount = leads.filter((l) => l.status === "won").length;
  const urgentCount = leads.filter((l) => l.priority === "urgent").length;

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-baseline sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Lead Pipeline</h1>
            <p className="text-sm text-gray-600">
              Track AI prequalification, Florida Ramp and Lift handoff, close status, and commission evidence.
            </p>
          </div>
          {auth.mode === "dev-warn" && (
            <span className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded px-2 py-1">
              Dev mode - ADMIN_ACCESS_TOKEN not set
            </span>
          )}
        </header>

        {loadError ? (
          <div className="bg-red-50 border border-red-200 rounded p-4 text-red-800 text-sm">
            Failed to load leads: {loadError}
          </div>
        ) : (
          <>
            <section className="grid grid-cols-1 sm:grid-cols-5 gap-4 mb-6">
              <Stat label="Total leads" value={totalCount} />
              <Stat label="New" value={newCount} />
              <Stat label="Handed off" value={handoffCount} />
              <Stat label="Won" value={wonCount} />
              <Stat label="Urgent" value={urgentCount} highlight={urgentCount > 0} />
            </section>

            <section className="space-y-4">
              {leads.length === 0 ? (
                <div className="bg-white border border-gray-200 rounded-lg p-8 text-center text-gray-500">
                  No leads yet.
                </div>
              ) : (
                leads.map((lead) => (
                  <LeadCard key={lead.id} lead={lead} token={provided ?? ""} />
                ))
              )}
            </section>

            <p className="text-xs text-gray-500 mt-4">
              API updates are also available through{" "}
              <code className="bg-gray-100 px-1 rounded">PATCH /api/leads/&lt;id&gt;</code> with{" "}
              <code className="bg-gray-100 px-1 rounded">x-admin-token</code>.
            </p>
          </>
        )}
      </div>
    </main>
  );
}

function LeadCard({ lead, token }: { lead: LeadRecord; token: string }) {
  return (
    <article className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      <div className="grid gap-4 p-4 lg:grid-cols-[1.2fr_2fr]">
        <section>
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <h2 className="text-lg font-semibold text-gray-950">{displayName(lead)}</h2>
            <Badge value={lead.status} />
            <Badge value={lead.priority} highlight={lead.priority === "urgent"} />
          </div>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <Field label="Phone" value={lead.phone} />
            <Field label="Email" value={lead.email} />
            <Field label="Service" value={lead.serviceNeeded} />
            <Field label="Location" value={lead.county ?? lead.city} />
            <Field label="Source" value={lead.leadSourcePage} />
            <Field label="Created" value={formatDate(lead.createdAt)} />
          </dl>
          {lead.message && (
            <div className="mt-4 rounded border border-gray-100 bg-gray-50 p-3">
              <div className="text-xs font-semibold uppercase tracking-wide text-gray-500">Lead message</div>
              <p className="mt-1 text-sm text-gray-800 whitespace-pre-wrap">{lead.message}</p>
            </div>
          )}
        </section>

        <form action={updateLeadAction} className="grid gap-3">
          <input type="hidden" name="id" value={lead.id} />
          <input type="hidden" name="token" value={token} />

          <div className="grid gap-3 md:grid-cols-4">
            <SelectField label="Status" name="status" value={lead.status} options={LEAD_STATUS_VALUES} />
            <SelectField label="Priority" name="priority" value={lead.priority} options={LEAD_PRIORITY_VALUES} />
            <InputField label="Assigned to" name="assignedTo" value={lead.assignedTo} />
            <InputField label="Partner" name="partnerName" value={lead.partnerName ?? "Florida Ramp and Lift"} />
          </div>

          <div className="grid gap-3 md:grid-cols-3">
            <InputField label="Qualification fit" name="qualificationFit" value={lead.qualificationFit} />
            <InputField label="Handoff date" name="partnerHandoffAt" value={formatDateInput(lead.partnerHandoffAt)} />
            <InputField label="Closed date" name="closedAt" value={formatDateInput(lead.closedAt)} />
          </div>

          <div className="grid gap-3 md:grid-cols-3">
            <InputField label="Estimated deal value" name="estimatedDealValue" value={lead.estimatedDealValue} />
            <InputField label="Commission status" name="commissionStatus" value={lead.commissionStatus} />
            <InputField label="Commission amount" name="commissionAmount" value={lead.commissionAmount} />
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <TextAreaField label="AI call summary" name="aiCallSummary" value={lead.aiCallSummary} />
            <TextAreaField label="Partner handoff notes" name="partnerHandoffNotes" value={lead.partnerHandoffNotes} />
          </div>
          <TextAreaField label="Deal specs / close evidence" name="dealSpecs" value={lead.dealSpecs} />
          <TextAreaField label="Internal notes" name="notes" value={lead.notes} />

          <div className="flex justify-end">
            <button
              type="submit"
              className="rounded bg-blue-900 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800"
            >
              Save lead progress
            </button>
          </div>
        </form>
      </div>
    </article>
  );
}

function Stat({ label, value, highlight }: { label: string; value: number; highlight?: boolean }) {
  return (
    <div className={`bg-white border rounded-lg p-4 ${highlight ? "border-amber-400" : "border-gray-200"}`}>
      <div className="text-xs uppercase tracking-wide text-gray-500">{label}</div>
      <div className={`text-3xl font-bold ${highlight ? "text-amber-700" : "text-gray-900"}`}>{value}</div>
    </div>
  );
}

function Field({ label, value }: { label: string; value?: string | null }) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">{label}</dt>
      <dd className="mt-0.5 break-words text-gray-800">{value || "-"}</dd>
    </div>
  );
}

function SelectField({
  label,
  name,
  value,
  options,
}: {
  label: string;
  name: string;
  value: string;
  options: readonly string[];
}) {
  return (
    <label className="text-sm font-medium text-gray-700">
      {label}
      <select name={name} defaultValue={value} className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-gray-900">
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function InputField({ label, name, value }: { label: string; name: string; value?: string | null }) {
  return (
    <label className="text-sm font-medium text-gray-700">
      {label}
      <input
        name={name}
        defaultValue={value ?? ""}
        className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-gray-900"
      />
    </label>
  );
}

function TextAreaField({ label, name, value }: { label: string; name: string; value?: string | null }) {
  return (
    <label className="text-sm font-medium text-gray-700">
      {label}
      <textarea
        name={name}
        defaultValue={value ?? ""}
        rows={3}
        className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-gray-900"
      />
    </label>
  );
}

function Badge({ value, highlight }: { value: string; highlight?: boolean }) {
  return (
    <span
      className={`inline-block text-xs font-medium rounded px-2 py-0.5 border ${
        highlight ? "bg-amber-50 text-amber-800 border-amber-300" : "bg-gray-50 text-gray-700 border-gray-200"
      }`}
    >
      {value}
    </span>
  );
}

function displayName(l: LeadRecord): string {
  if (l.name) return l.name;
  const combined = [l.firstName, l.lastName].filter(Boolean).join(" ");
  return combined || "-";
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

function formatDateInput(iso?: string | null): string {
  if (!iso) return "";
  try {
    return new Date(iso).toISOString();
  } catch {
    return iso;
  }
}

function valueFromForm(formData: FormData, key: string): string | undefined {
  const value = formData.get(key);
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}
