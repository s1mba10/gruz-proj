"use client";

import { useMemo, useState, type FormEvent } from "react";

type ServiceType = "city_hour" | "apartment" | "trash" | "intercity";

const SERVICE_OPTIONS: { value: ServiceType; label: string }[] = [
  { value: "city_hour", label: "По городу (почасово)" },
  { value: "apartment", label: "Квартирный переезд" },
  { value: "trash", label: "Вывоз мусора" },
  { value: "intercity", label: "Межгород" },
];

const APARTMENT_BASE: Record<number, number> = {
  1: 3500,
  2: 5000,
  3: 7000,
};

interface Addon {
  id: string;
  label: string;
  price: number;
  hint?: string;
}

const ADDONS: Addon[] = [
  { id: "loader", label: "Дополнительный грузчик", price: 500, hint: "к водителю-грузчику" },
  { id: "disassembly", label: "Разборка/сборка мебели", price: 800 },
  { id: "packing", label: "Упаковка вещей плёнкой и коробками", price: 300 },
  { id: "heavy", label: "Тяжёлые предметы (сейф, пианино)", price: 1500 },
  { id: "express", label: "Срочный выезд (в течение часа)", price: 700 },
  { id: "night", label: "Ночное время (22:00–07:00)", price: 1000 },
];

interface Calc {
  base: number;
  baseLabel: string;
  details: { label: string; value: number }[];
  total: number;
}

function calc({
  service,
  hours,
  rooms,
  volume,
  distance,
  floor,
  hasLift,
  addons,
}: {
  service: ServiceType;
  hours: number;
  rooms: 1 | 2 | 3;
  volume: number;
  distance: number;
  floor: number;
  hasLift: boolean;
  addons: Set<string>;
}): Calc {
  let base = 0;
  let baseLabel = "";
  const details: { label: string; value: number }[] = [];

  if (service === "city_hour") {
    const HOUR_RATE = 1200;
    base = Math.max(2500, hours * HOUR_RATE);
    baseLabel = `${hours} ч × 1 200 ₽ (мин. 2 500 ₽)`;
    details.push({ label: `Час работы × ${hours}`, value: base });
  } else if (service === "apartment") {
    base = APARTMENT_BASE[rooms];
    baseLabel = `${rooms}-комнатная квартира`;
    details.push({ label: baseLabel, value: base });
  } else if (service === "trash") {
    const VOL_RATE = 250;
    base = Math.max(2500, volume * VOL_RATE);
    baseLabel = `${volume} м³ × 250 ₽ (мин. 2 500 ₽)`;
    details.push({ label: `Вывоз мусора, ${volume} м³`, value: base });
  } else if (service === "intercity") {
    const KM_RATE = 35;
    base = Math.max(5000, distance * KM_RATE);
    baseLabel = `${distance} км × 35 ₽ (мин. 5 000 ₽)`;
    details.push({ label: `Межгород, ${distance} км`, value: base });
  }

  if (service !== "intercity" && floor > 1 && !hasLift) {
    const lift = (floor - 1) * 200;
    details.push({ label: `Подъём на ${floor - 1} этаж без лифта`, value: lift });
  }

  ADDONS.forEach((a) => {
    if (addons.has(a.id)) details.push({ label: a.label, value: a.price });
  });

  const total = details.reduce((s, d) => s + d.value, 0);
  return { base, baseLabel, details, total };
}

function fmt(n: number): string {
  return n.toLocaleString("ru-RU") + " ₽";
}

export default function Calculator() {
  const [service, setService] = useState<ServiceType>("city_hour");
  const [hours, setHours] = useState(2);
  const [rooms, setRooms] = useState<1 | 2 | 3>(2);
  const [volume, setVolume] = useState(10);
  const [distance, setDistance] = useState(150);
  const [floor, setFloor] = useState(1);
  const [hasLift, setHasLift] = useState(true);
  const [addons, setAddons] = useState<Set<string>>(new Set());

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const result = useMemo(
    () =>
      calc({
        service,
        hours,
        rooms,
        volume,
        distance,
        floor,
        hasLift,
        addons,
      }),
    [service, hours, rooms, volume, distance, floor, hasLift, addons]
  );

  function toggleAddon(id: string) {
    setAddons((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    if (!/^[\d\s+\-()]{10,15}$/.test(phone)) {
      setError("Введите корректный номер телефона");
      return;
    }
    setLoading(true);
    try {
      const summary = [
        `Расчёт: ${result.baseLabel}`,
        ...result.details.map((d) => `• ${d.label}: ${fmt(d.value)}`),
        `Итого: ${fmt(result.total)}`,
      ].join("\n");

      const res = await fetch("/api/send-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          message: summary,
        }),
      });
      if (!res.ok) throw new Error();
      setSent(true);
    } catch {
      setError("Не удалось отправить. Позвоните нам!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-5">
      {/* Левая колонка — параметры */}
      <div className="lg:col-span-3 space-y-6 rounded-2xl bg-white p-6 shadow-sm lg:p-8">
        <div>
          <label className="mb-2 block text-sm font-semibold text-text-primary">
            Тип услуги
          </label>
          <div className="flex flex-wrap gap-2">
            {SERVICE_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setService(opt.value)}
                className={`rounded-full border px-4 py-2 text-sm transition ${
                  service === opt.value
                    ? "border-yellow bg-yellow text-dark font-semibold"
                    : "border-gray-200 text-text-secondary hover:bg-gray-100"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {service === "city_hour" && (
          <div>
            <label className="mb-2 block text-sm font-semibold text-text-primary">
              Сколько часов работы: <span className="text-yellow-dark">{hours} ч</span>
            </label>
            <input
              type="range"
              min={1}
              max={10}
              step={1}
              value={hours}
              onChange={(e) => setHours(Number(e.target.value))}
              className="w-full accent-yellow"
            />
            <div className="mt-1 flex justify-between text-xs text-text-secondary">
              <span>1 ч</span>
              <span>10 ч</span>
            </div>
          </div>
        )}

        {service === "apartment" && (
          <div>
            <label className="mb-2 block text-sm font-semibold text-text-primary">
              Сколько комнат
            </label>
            <div className="flex gap-2">
              {[1, 2, 3].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setRooms(n as 1 | 2 | 3)}
                  className={`flex-1 rounded-xl border py-3 text-sm font-semibold transition ${
                    rooms === n
                      ? "border-yellow bg-yellow text-dark"
                      : "border-gray-200 text-text-secondary hover:bg-gray-100"
                  }`}
                >
                  {n}-комн.
                </button>
              ))}
            </div>
          </div>
        )}

        {service === "trash" && (
          <div>
            <label className="mb-2 block text-sm font-semibold text-text-primary">
              Объём мусора: <span className="text-yellow-dark">{volume} м³</span>
            </label>
            <input
              type="range"
              min={1}
              max={20}
              step={1}
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="w-full accent-yellow"
            />
            <div className="mt-1 flex justify-between text-xs text-text-secondary">
              <span>1 м³</span>
              <span>20 м³ (полный фургон)</span>
            </div>
          </div>
        )}

        {service === "intercity" && (
          <div>
            <label className="mb-2 block text-sm font-semibold text-text-primary">
              Расстояние: <span className="text-yellow-dark">{distance} км</span>
            </label>
            <input
              type="range"
              min={30}
              max={500}
              step={10}
              value={distance}
              onChange={(e) => setDistance(Number(e.target.value))}
              className="w-full accent-yellow"
            />
            <div className="mt-1 flex justify-between text-xs text-text-secondary">
              <span>30 км</span>
              <span>500 км</span>
            </div>
          </div>
        )}

        {service !== "intercity" && (
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-text-primary">
                Этаж: <span className="text-yellow-dark">{floor}</span>
              </label>
              <input
                type="range"
                min={1}
                max={20}
                step={1}
                value={floor}
                onChange={(e) => setFloor(Number(e.target.value))}
                className="w-full accent-yellow"
              />
            </div>
            <div className="flex items-end">
              <label className="flex cursor-pointer items-center gap-2 text-sm text-text-primary">
                <input
                  type="checkbox"
                  checked={hasLift}
                  onChange={(e) => setHasLift(e.target.checked)}
                  className="h-4 w-4 accent-yellow"
                />
                Есть лифт
              </label>
            </div>
          </div>
        )}

        {/* Конструктор — доп. услуги */}
        <div>
          <label className="mb-3 block text-sm font-semibold text-text-primary">
            Дополнительные услуги
          </label>
          <div className="grid gap-2 sm:grid-cols-2">
            {ADDONS.map((a) => {
              const on = addons.has(a.id);
              return (
                <button
                  key={a.id}
                  type="button"
                  onClick={() => toggleAddon(a.id)}
                  className={`flex items-start justify-between rounded-xl border p-3 text-left transition ${
                    on
                      ? "border-yellow bg-yellow/10"
                      : "border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <span
                      className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 ${
                        on ? "border-yellow bg-yellow" : "border-gray-300"
                      }`}
                      aria-hidden
                    >
                      {on && (
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          fill="none"
                        >
                          <path
                            d="M2 6l3 3 5-6"
                            stroke="#1A1A1A"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </span>
                    <div>
                      <div className="text-sm font-medium text-text-primary">
                        {a.label}
                      </div>
                      {a.hint && (
                        <div className="text-xs text-text-secondary">
                          {a.hint}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="ml-2 shrink-0 text-sm font-semibold text-yellow-dark">
                    +{fmt(a.price)}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Правая колонка — итог + форма */}
      <div className="lg:col-span-2 space-y-4">
        <div className="sticky top-24 rounded-2xl bg-dark p-6 text-white shadow-lg">
          <div className="text-sm text-white/60">Предварительная стоимость</div>
          <div className="mt-1 text-4xl font-bold text-yellow">
            {fmt(result.total)}
          </div>
          <div className="mt-1 text-xs text-white/50">
            Точную цену уточнит оператор
          </div>

          <ol className="mt-5 space-y-2 border-t border-white/10 pt-4 text-sm">
            {result.details.map((d, i) => (
              <li key={i} className="flex justify-between gap-2">
                <span className="text-white/70">{d.label}</span>
                <span className="font-medium">{fmt(d.value)}</span>
              </li>
            ))}
            <li className="flex justify-between gap-2 border-t border-white/10 pt-2 text-base font-semibold">
              <span>Итого</span>
              <span className="text-yellow">{fmt(result.total)}</span>
            </li>
          </ol>

          {sent ? (
            <div className="mt-5 rounded-xl bg-yellow p-4 text-center text-sm font-semibold text-dark">
              Заявка отправлена! Перезвоним в течение часа.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-5 space-y-2">
              <input
                type="text"
                placeholder="Ваше имя"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-full bg-white/10 px-4 py-2.5 text-sm text-white outline-none placeholder:text-white/40 focus:bg-white/15"
              />
              <input
                type="tel"
                placeholder="Телефон *"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="w-full rounded-full bg-white/10 px-4 py-2.5 text-sm text-white outline-none placeholder:text-white/40 focus:bg-white/15"
              />
              {error && (
                <p className="text-xs text-red-300">{error}</p>
              )}
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-full bg-yellow py-3 text-sm font-bold text-dark transition hover:bg-yellow-dark disabled:opacity-60"
              >
                {loading ? "Отправляем…" : "Оставить заявку"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
