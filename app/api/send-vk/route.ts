import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { name, phone, message } = await request.json();

    if (!phone) {
      return NextResponse.json(
        { ok: false, error: "Телефон обязателен" },
        { status: 400 }
      );
    }

    const text = [
      "🚛 Новая заявка с сайта gruzim-krasnodar.ru",
      `📞 Телефон: ${phone}`,
      `👤 Имя: ${name || "не указано"}`,
      `📝 Комментарий: ${message || "не указан"}`,
    ].join("\n");

    const params = new URLSearchParams({
      user_id: process.env.VK_USER_ID!,
      message: text,
      random_id: Date.now().toString(),
      access_token: process.env.VK_TOKEN!,
      v: "5.131",
    });

    const res = await fetch(
      `https://api.vk.com/method/messages.send?${params}`
    );
    const data = await res.json();

    if (data.error) {
      console.error("VK API error:", data.error);
      return NextResponse.json({ ok: false }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
