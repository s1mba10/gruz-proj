"use client";

import { use, useState, type FormEvent } from "react";

interface Props {
  searchParamsPromise: Promise<{ expired?: string; from?: string }>;
}

export default function LoginForm({ searchParamsPromise }: Props) {
  const params = use(searchParamsPromise);

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/operator/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ login, password }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
      };
      if (!res.ok || !data.ok) {
        setError(data.error || "Не удалось войти");
        return;
      }
      const safeFrom =
        params.from &&
        params.from.startsWith("/operator") &&
        params.from !== "/operator/login"
          ? params.from
          : "/operator";
      // Жёсткая навигация: полный запрос на сервер, чтобы middleware
      // увидел свежевыставленную cookie и пропустил на панель.
      window.location.assign(safeFrom);
    } catch {
      setError("Ошибка сети. Попробуйте ещё раз.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-bg px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="rounded-2xl bg-white p-8 shadow-lg">
          <h1 className="mb-1 text-2xl font-bold text-text-primary">
            Вход в панель
          </h1>
          <p className="mb-6 text-sm text-text-secondary">
            Только для оператора
          </p>

          {params.expired === "1" && (
            <div className="mb-4 rounded-xl border border-yellow bg-yellow/10 px-4 py-3 text-sm text-text-primary">
              Сессия истекла, войдите снова.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label
                htmlFor="login"
                className="mb-1 block text-xs font-semibold text-text-secondary"
              >
                Логин
              </label>
              <input
                id="login"
                type="text"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                required
                autoFocus
                autoComplete="username"
                className="w-full rounded-full border border-gray-200 bg-white px-4 py-2.5 text-sm text-text-primary outline-none focus:border-yellow"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="mb-1 block text-xs font-semibold text-text-secondary"
              >
                Пароль
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="w-full rounded-full border border-gray-200 bg-white px-4 py-2.5 text-sm text-text-primary outline-none focus:border-yellow"
              />
            </div>

            {error && (
              <p className="text-sm text-red-700">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-yellow py-3 text-sm font-bold text-dark transition hover:bg-yellow-dark disabled:opacity-60"
            >
              {loading ? "Входим…" : "Войти"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
