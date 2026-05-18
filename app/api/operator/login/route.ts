import { NextResponse } from "next/server";
import {
  verifyCredentials,
  signSessionToken,
  SESSION_COOKIE_NAME,
  SESSION_COOKIE_OPTIONS,
} from "@/app/lib/auth";

/** POST /api/operator/login { login, password } → 200 { ok: true } + httpOnly cookie */
export async function POST(req: Request) {
  let body: { login?: string; password?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Невалидный JSON" },
      { status: 400 },
    );
  }

  const { login, password } = body;
  if (!login || !password) {
    return NextResponse.json(
      { ok: false, error: "Логин и пароль обязательны" },
      { status: 400 },
    );
  }

  const ok = await verifyCredentials(login, password);
  if (!ok) {
    // Не раскрываем, что именно неверно — логин или пароль.
    return NextResponse.json(
      { ok: false, error: "Неверный логин или пароль" },
      { status: 401 },
    );
  }

  const token = await signSessionToken(login);
  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE_NAME, token, SESSION_COOKIE_OPTIONS);
  return res;
}
