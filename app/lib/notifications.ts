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

export async function sendVk(text: string): Promise<void> {
  const token = process.env.VK_USER_TOKEN;
  const peerId = process.env.VK_CHAT_PEER_ID;

  if (!token || !peerId) {
    throw new Error("VK_USER_TOKEN или VK_CHAT_PEER_ID не заданы");
  }

  const params = new URLSearchParams({
    peer_id: peerId,
    random_id: String(Date.now() + Math.floor(Math.random() * 1_000_000)),
    message: text,
    access_token: token,
    v: "5.199",
  });

  const res = await fetch("https://api.vk.com/method/messages.send", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params.toString(),
  });

  const data = await res.json();

  if (data.error) {
    throw new Error(
      `VK API error ${data.error.error_code}: ${data.error.error_msg}`
    );
  }
}

export async function sendLead(lead: LeadPayload): Promise<void> {
  const text = formatLeadMessage(lead);

  const results = await Promise.allSettled([
    sendTelegram(text),
    sendVk(text),
  ]);

  const channels = ["Telegram", "VK"] as const;
  const failures: string[] = [];

  results.forEach((result, i) => {
    if (result.status === "rejected") {
      console.error(`[lead] ${channels[i]} failed:`, result.reason);
      failures.push(channels[i]);
    }
  });

  // Провал только если ВСЕ каналы упали. Хотя бы один доставил — считаем успехом.
  if (failures.length === results.length) {
    throw new Error(`All notification channels failed: ${failures.join(", ")}`);
  }
}
