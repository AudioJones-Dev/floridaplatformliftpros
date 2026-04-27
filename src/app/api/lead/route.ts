import { NextRequest, NextResponse } from "next/server";
import { getLeadStore, type Lead } from "@/lib/leads/store";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Partial<Lead>;
    if (!body.name || !body.phone) {
      return NextResponse.json({ error: "Name and phone are required." }, { status: 400 });
    }
    const lead: Lead = {
      name: body.name,
      phone: body.phone,
      email: body.email,
      service: body.service,
      message: body.message,
      createdAt: new Date().toISOString(),
    };
    const result = await getLeadStore().save(lead);
    return NextResponse.json(result, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to process lead." }, { status: 500 });
  }
}
