export interface LeadPayload {
  name?: string;
  phone: string;
  message?: string;
}

export function formatLeadMessage(lead: LeadPayload): string {
  return [
    "🚛 Новая заявка с сайта gruzim-krasnodar.ru",
    `📞 Телефон: ${lead.phone}`,
    `👤 Имя: ${lead.name || "не указано"}`,
    `📝 Комментарий: ${lead.message || "не указан"}`,
  ].join("\n");
}

export async function sendTelegram(text: string): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    throw new Error("TELEGRAM_BOT_TOKEN или TELEGRAM_CHAT_ID не заданы");
  }

  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
    }),
  });

  const data = await res.json();

  if (!data.ok) {
    throw new Error(`Telegram API error: ${data.description || "unknown"}`);
  }
}
