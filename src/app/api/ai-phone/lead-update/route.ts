import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getLeadStorage } from "@/services/leads/lead-storage";
import { sendPartnerHandoffEmail } from "@/services/leads/lead-email";
import { isValidUuid } from "@/services/leads/lead-validation";
import type { LeadStatus, LeadUpdate } from "@/services/leads/types";

export const runtime = "nodejs";

const AiPhoneLeadUpdateSchema = z
  .object({
    leadId: z.string().optional(),
    lead_id: z.string().optional(),
    id: z.string().optional(),
    aiCallSummary: z.string().trim().optional(),
    ai_call_summary: z.string().trim().optional(),
    qualificationFit: z.string().trim().optional(),
    qualification_fit: z.string().trim().optional(),
    handoffReady: z.boolean().optional(),
    handoff_ready: z.boolean().optional(),
    partnerName: z.string().trim().optional(),
    partner_name: z.string().trim().optional(),
    partnerHandoffNotes: z.string().trim().optional(),
    partner_handoff_notes: z.string().trim().optional(),
    priority: z.enum(["low", "normal", "high", "urgent"]).optional(),
    status: z
      .enum(["contacted", "ai_prequalified", "qualified", "handed_off", "lost", "spam"])
      .optional(),
  })
  .passthrough()
  .transform((raw) => {
    const id = raw.leadId ?? raw.lead_id ?? raw.id;
    const handoffReady = raw.handoffReady ?? raw.handoff_ready ?? false;
    const status: LeadStatus =
      raw.status ?? (handoffReady ? "handed_off" : "ai_prequalified");

    return {
      id,
      patch: {
        status,
        priority: raw.priority,
        aiCallSummary: emptyToUndefined(raw.aiCallSummary ?? raw.ai_call_summary),
        qualificationFit: emptyToUndefined(raw.qualificationFit ?? raw.qualification_fit),
        partnerName: emptyToUndefined(raw.partnerName ?? raw.partner_name) ?? "Florida Ramp and Lift",
        partnerHandoffAt: status === "handed_off" ? new Date().toISOString() : undefined,
        partnerHandoffNotes: emptyToUndefined(raw.partnerHandoffNotes ?? raw.partner_handoff_notes),
      } satisfies LeadUpdate,
    };
  });

export async function POST(req: NextRequest) {
  const auth = checkAiPhoneWebhookAuth(req);
  if (!auth.ok) {
    return NextResponse.json({ error: auth.reason }, { status: auth.status });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = AiPhoneLeadUpdateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Validation failed.",
        issues: parsed.error.issues.map((issue) => ({
          path: issue.path.join("."),
          message: issue.message,
        })),
      },
      { status: 400 }
    );
  }

  const { id, patch } = parsed.data;
  if (!id || !isValidUuid(id)) {
    return NextResponse.json({ error: "Valid leadId is required." }, { status: 400 });
  }

  try {
    const updated = await getLeadStorage().update(id, patch);
    if (!updated) {
      return NextResponse.json({ error: "Lead not found." }, { status: 404 });
    }
    if (patch.status === "handed_off") {
      sendPartnerHandoffEmail(updated).catch((err) => {
        console.error("[/api/ai-phone/lead-update] partner handoff email error:", err);
      });
    }
    return NextResponse.json({ success: true, lead: updated }, { status: 200 });
  } catch (err) {
    console.error("[/api/ai-phone/lead-update] update error:", err);
    return NextResponse.json({ error: "Failed to update lead." }, { status: 500 });
  }
}

function checkAiPhoneWebhookAuth(req: NextRequest):
  | { ok: true }
  | { ok: false; status: 401 | 500; reason: string } {
  const expected = process.env.AI_PHONE_SERVICE_WEBHOOK_SECRET;
  if (!expected) {
    return { ok: false, status: 500, reason: "AI phone webhook secret is not configured." };
  }

  const bearer = req.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  const provided = req.headers.get("x-ai-phone-secret") ?? bearer;
  if (!provided || provided !== expected) {
    return { ok: false, status: 401, reason: "Unauthorized." };
  }

  return { ok: true };
}

function emptyToUndefined(value: string | undefined): string | undefined {
  if (!value) return undefined;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}
