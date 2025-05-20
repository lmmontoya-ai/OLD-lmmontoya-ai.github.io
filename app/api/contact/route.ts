import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const data = await request.json();
  // Spam protection: ignore honeypot
  if (data.honeypot) {
    return NextResponse.json({ ok: true });
  }

  try {
    // TODO: Replace with real email/send logic or integration with third-party service
    console.log("Contact form submission:", data);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { ok: false, error: "Submission failed" },
      { status: 500 }
    );
  }
}
