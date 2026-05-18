// Auth-модуль для защиты панели оператора.
// Использует bcryptjs для проверки пароля и jose для подписи JWT.
// Edge-совместимо — работает в Next.js middleware.

import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";

const JWT_ALGORITHM = "HS256";
const TOKEN_TTL_SECONDS = 60 * 60 * 8; // 8 часов

export const SESSION_COOKIE_NAME = "gk_operator_session";

function getSecretKey(): Uint8Array {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET не задан в env");
  return new TextEncoder().encode(secret);
}

/** Проверяет логин и пароль против env-переменных. */
export async function verifyCredentials(
  login: string,
  password: string,
): Promise<boolean> {
  const expectedLogin = process.env.OPERATOR_LOGIN;
  const hash = process.env.OPERATOR_PASSWORD_HASH;
  if (!expectedLogin || !hash) return false;

  if (login !== expectedLogin) {
    // Защита от time-based attacks: всё равно вызываем bcrypt.compare,
    // чтобы время ответа не зависело от того, существует ли логин.
    await bcrypt.compare(password, hash);
    return false;
  }
  return bcrypt.compare(password, hash);
}

/** Подписывает JWT-токен сессии. */
export async function signSessionToken(login: string): Promise<string> {
  const iat = Math.floor(Date.now() / 1000);
  return new SignJWT({ sub: login })
    .setProtectedHeader({ alg: JWT_ALGORITHM, typ: "JWT" })
    .setIssuedAt(iat)
    .setExpirationTime(iat + TOKEN_TTL_SECONDS)
    .setIssuer("gruzim-krasnodar")
    .setAudience("operator-panel")
    .sign(getSecretKey());
}

/** Проверяет JWT-токен. Возвращает payload или null. */
export async function verifySessionToken(
  token: string,
): Promise<{ sub: string } | null> {
  try {
    const { payload } = await jwtVerify(token, getSecretKey(), {
      algorithms: [JWT_ALGORITHM],
      issuer: "gruzim-krasnodar",
      audience: "operator-panel",
    });
    return { sub: String(payload.sub) };
  } catch {
    return null;
  }
}

export const SESSION_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: TOKEN_TTL_SECONDS,
};
