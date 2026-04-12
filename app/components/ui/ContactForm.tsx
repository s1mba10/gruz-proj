"use client";

import { useState, type FormEvent } from "react";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const phoneRegex = /^[\d\s+\-()]{10,15}$/;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    if (!phoneRegex.test(phone)) {
      setError("Введите корректный номер телефона");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/send-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, message }),
      });

      if (!res.ok) throw new Error();

      setSuccess(true);
      setName("");
      setPhone("");
      setMessage("");
    } catch {
      setError("Не удалось отправить заявку. Позвоните нам!");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="rounded-2xl bg-yellow p-8 shadow-lg" id="hero-form">
        <p className="text-center text-lg font-semibold text-dark">
          Спасибо! Перезвоним в течение часа.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl bg-yellow p-6 shadow-lg lg:p-8"
      id="hero-form"
    >
      <h3 className="mb-6 text-center text-xl font-bold text-dark">
        Бесплатная консультация
      </h3>

      <input
        type="text"
        placeholder="Ваше имя"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="mb-3 w-full rounded-full bg-white px-5 py-3 text-sm text-dark outline-none placeholder:text-text-secondary"
      />

      <input
        type="tel"
        placeholder="Телефон *"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
        className="mb-3 w-full rounded-full bg-white px-5 py-3 text-sm text-dark outline-none placeholder:text-text-secondary"
      />

      <textarea
        placeholder="Что нужно сделать?"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows={3}
        className="mb-4 w-full resize-none rounded-2xl bg-white px-5 py-3 text-sm text-dark outline-none placeholder:text-text-secondary"
      />

      {error && (
        <p className="mb-3 text-center text-sm font-medium text-red-700">{error}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-full bg-dark py-3.5 text-sm font-semibold text-white transition-colors hover:bg-dark/90 disabled:opacity-60"
      >
        {loading ? "Отправляем..." : "Отправить"}
      </button>
    </form>
  );
}
