import { NextResponse } from "next/server";
import { formatLeadMessage, sendTelegram } from "@/app/lib/notifications";

export async function POST(request: Request) {
  try {
    const { name, phone, message } = await request.json();

    if (!phone) {
      return NextResponse.json(
        { ok: false, error: "Телефон обязателен" },
        { status: 400 }
      );
    }

    const text = formatLeadMessage({ name, phone, message });

    await sendTelegram(text);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Lead notification error:", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
