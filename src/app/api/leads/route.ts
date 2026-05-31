import { NextResponse } from "next/server";
import { getServiceClient } from "@/lib/supabase";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const company =
    typeof body.company === "string" ? body.company.trim() : null;
  const message =
    typeof body.message === "string" ? body.message.trim() : null;

  if (!name || !email) {
    return NextResponse.json(
      { error: "Name and email are required." },
      { status: 400 }
    );
  }

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "Please provide a valid email address." },
      { status: 400 }
    );
  }

  const supabase = getServiceClient();
  if (!supabase) {
    // Supabase isn't configured yet — fail loudly server-side but don't 500
    // the user. This lets the site deploy before the DB is wired up.
    console.error("Supabase env vars missing; lead was not persisted.");
    return NextResponse.json(
      { error: "Lead capture is not configured yet. Please try again later." },
      { status: 503 }
    );
  }

  const { error } = await supabase.from("leads").insert({
    name,
    email,
    company,
    message,
    source: "website",
  });

  if (error) {
    console.error("Failed to insert lead:", error.message);
    return NextResponse.json(
      { error: "Something went wrong saving your details." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
