import { NextRequest, NextResponse } from "next/server";
import { writeFile, readFile, mkdir } from "fs/promises";
import path from "path";

interface LeadSubmission {
  id: string;
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
  submittedAt: string;
  ip?: string;
}

interface LeadRecord {
  leads: LeadSubmission[];
}

const DATA_DIR = path.join(process.cwd(), "data");
const LEADS_FILE = path.join(DATA_DIR, "leads.json");

async function readLeads(): Promise<LeadRecord> {
  try {
    const raw = await readFile(LEADS_FILE, "utf-8");
    return JSON.parse(raw) as LeadRecord;
  } catch {
    return { leads: [] };
  }
}

async function writeLeads(record: LeadRecord): Promise<void> {
  await mkdir(DATA_DIR, { recursive: true });
  await writeFile(LEADS_FILE, JSON.stringify(record, null, 2), "utf-8");
}

function validateLead(body: Record<string, unknown>): string | null {
  if (!body.name || typeof body.name !== "string" || body.name.trim().length < 2) {
    return "Name must be at least 2 characters.";
  }
  if (!body.phone || typeof body.phone !== "string" || body.phone.trim().length < 7) {
    return "A valid phone number is required.";
  }
  if (
    !body.email ||
    typeof body.email !== "string" ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)
  ) {
    return "A valid email address is required.";
  }
  if (!body.service || typeof body.service !== "string" || body.service.trim().length === 0) {
    return "Please select a service.";
  }
  return null;
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Record<string, unknown>;

    const validationError = validateLead(body);
    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    const record = await readLeads();

    const lead: LeadSubmission = {
      id: crypto.randomUUID(),
      name: String(body.name).trim(),
      phone: String(body.phone).trim(),
      email: String(body.email).trim().toLowerCase(),
      service: String(body.service).trim(),
      message: typeof body.message === "string" ? body.message.trim() : "",
      submittedAt: new Date().toISOString(),
      ip: req.headers.get("x-forwarded-for") ?? undefined,
    };

    record.leads.push(lead);
    await writeLeads(record);

    return NextResponse.json(
      { success: true, message: "Your request has been received. We'll be in touch shortly." },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { error: "Method not allowed." },
    { status: 405 }
  );
}
