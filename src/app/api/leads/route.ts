import { NextRequest, NextResponse } from "next/server";
import { getLeadStorage } from "@/services/leads/lead-storage";
import { sendLeadAlertEmail } from "@/services/leads/lead-email";
import { LeadCreateSchema } from "@/services/leads/lead-validation";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 16 * 1024; // 16KB — generous for a lead form, hostile to abuse.
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 5; // 5 submits / minute / IP

const ipHits = new Map<string, { count: number; resetAt: number }>();

function clientIp(req: NextRequest): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0]!.trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = ipHits.get(ip);
  if (!entry || entry.resetAt < now) {
    ipHits.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > RATE_LIMIT_MAX;
}

function pickUtm(req: NextRequest, key: string): string | null {
  const v = req.nextUrl.searchParams.get(key);
  return v && v.trim() ? v.trim() : null;
}

export async function POST(req: NextRequest) {
  const contentLength = Number(req.headers.get("content-length") ?? 0);
  if (contentLength > MAX_BODY_BYTES) {
    return NextResponse.json({ error: "Request body too large." }, { status: 413 });
  }

  if (rateLimited(clientIp(req))) {
    return NextResponse.json(
      { error: "Too many submissions. Please call us instead." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = LeadCreateSchema.safeParse(body);
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

  // Capture UTM + source page from the URL of the request itself if not in body.
  const input = {
    ...parsed.data,
    leadSourcePage: parsed.data.leadSourcePage ?? req.headers.get("referer"),
    utmSource: parsed.data.utmSource ?? pickUtm(req, "utm_source"),
    utmMedium: parsed.data.utmMedium ?? pickUtm(req, "utm_medium"),
    utmCampaign: parsed.data.utmCampaign ?? pickUtm(req, "utm_campaign"),
  };

  try {
    const lead = await getLeadStorage().create(input);

    // Fire-and-forget email — never blocks the response, never surfaces errors.
    sendLeadAlertEmail(lead).catch((err) => {
      console.error("[/api/leads] email send error:", err);
    });

    return NextResponse.json({ success: true, id: lead.id }, { status: 201 });
  } catch (err) {
    console.error("[/api/leads] storage error:", err);
    return NextResponse.json(
      { error: "Failed to record lead. Please call us instead." },
      { status: 500 }
    );
  }
}
