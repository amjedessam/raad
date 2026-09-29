import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { contactSchema, quoteSchema } from "@/lib/inquiry";

export async function POST(request: NextRequest) {
  const raw = await request.json();
  const parsed =
    raw?.kind === "quote" ? quoteSchema.safeParse(raw) : contactSchema.safeParse(raw);

  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  const data = parsed.data;
  const to = process.env.CONTACT_TO_EMAIL || "amjedelieli@gmail.com";
  const key = process.env.RESEND_API_KEY;

  const subject =
    data.kind === "quote"
      ? `طلب عرض سعر — ${data.name}`
      : `رسالة تواصل — ${data.name}`;

  const html = `<pre style="font-family:sans-serif;white-space:pre-wrap">${JSON.stringify(data, null, 2)}</pre>`;

  if (!key || key.includes("xxxx")) {
    console.info("[mail:dev]", subject, data);
    return NextResponse.json({
      ok: true,
      delivered: false,
      reason: "RESEND_API_KEY missing — logged on server",
    });
  }

  const resend = new Resend(key);
  const result = await resend.emails.send({
    from: "المهندس رعد العمري <noreply@raad-alomari.com>",
    to,
    subject,
    html,
    replyTo: data.email,
  });

  if (result.error) {
    return NextResponse.json({ ok: false, error: result.error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, delivered: true, id: result.data?.id });
}
