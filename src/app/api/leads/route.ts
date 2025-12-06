// src/app/api/leads/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, phone, location } = body ?? {};
    if (!name || !phone || !location) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // TODO: replace with DB/Prisma insertion if you have backend
    console.log("New lead:", body);
    const id = `lead_${Date.now()}`;

    // return immediately — background tasks (SMS/WhatsApp) should run async later
    return NextResponse.json({ success: true, id });
  } catch (err: any) {
    console.error("API error /api/leads:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
