import { NextRequest, NextResponse } from "next/server";
import { getLeadStorage } from "@/services/leads/lead-storage";
import { checkAdminAuth } from "@/services/leads/admin-auth";
import { LeadUpdateSchema, isValidUuid } from "@/services/leads/lead-validation";

export const runtime = "nodejs";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const auth = checkAdminAuth(
    req.headers.get("x-admin-token") ?? req.nextUrl.searchParams.get("token")
  );
  if (!auth.ok) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  if (!isValidUuid(id)) {
    return NextResponse.json({ error: "Invalid lead id." }, { status: 400 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = LeadUpdateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Validation failed.",
        issues: parsed.error.issues.map((i) => ({
          path: i.path.join("."),
          message: i.message,
        })),
      },
      { status: 400 }
    );
  }

  try {
    const updated = await getLeadStorage().update(id, parsed.data);
    if (!updated) {
      return NextResponse.json({ error: "Lead not found." }, { status: 404 });
    }
    return NextResponse.json({ success: true, lead: updated }, { status: 200 });
  } catch (err) {
    console.error("[/api/leads/:id] update error:", err);
    return NextResponse.json({ error: "Failed to update lead." }, { status: 500 });
  }
}
