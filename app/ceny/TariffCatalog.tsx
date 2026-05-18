"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type Category = "city" | "moving" | "trash" | "intercity";

interface Tariff {
  id: string;
  title: string;
  category: Category;
  price: number;
  priceLabel: string;
  volume: number; // m³, ориентировочно
  volumeLabel: string;
  duration: string;
  includes: string[];
  badge?: string;
}

const CATEGORIES: { value: Category | "all"; label: string }[] = [
  { value: "all", label: "Все" },
  { value: "city", label: "По городу" },
  { value: "moving", label: "Переезды" },
  { value: "trash", label: "Вывоз мусора" },
  { value: "intercity", label: "Межгород" },
];

const PRICE_RANGES = [
  { id: "all", label: "Любая", min: 0, max: Infinity },
  { id: "lt3000", label: "до 3 000 ₽", min: 0, max: 3000 },
  { id: "3to5", label: "3 000 – 5 000 ₽", min: 3000, max: 5000 },
  { id: "5to10", label: "5 000 – 10 000 ₽", min: 5000, max: 10000 },
  { id: "gt10", label: "от 10 000 ₽", min: 10000, max: Infinity },
];

const VOLUME_RANGES = [
  { id: "all", label: "Любой", min: 0, max: Infinity },
  { id: "lt5", label: "до 5 м³", min: 0, max: 5 },
  { id: "5to10", label: "5 – 10 м³", min: 5, max: 10 },
  { id: "10to20", label: "10 – 20 м³", min: 10, max: 20 },
];

const TARIFFS: Tariff[] = [
  {
    id: "city-min",
    title: "Минимальный заказ по городу",
    category: "city",
    price: 2500,
    priceLabel: "от 2 500 ₽",
    volume: 5,
    volumeLabel: "до 5 м³",
    duration: "до 2 часов",
    includes: ["Фургон до 20 м³", "Водитель-грузчик", "Подача бесплатно"],
  },
  {
    id: "city-hour",
    title: "Почасовая работа",
    category: "city",
    price: 1200,
    priceLabel: "от 1 200 ₽/час",
    volume: 20,
    volumeLabel: "до 20 м³",
    duration: "по часам",
    includes: ["Фургон + грузчик", "Без скрытых платежей", "Подача бесплатно"],
    badge: "Гибко",
  },
  {
    id: "move-1k",
    title: "Переезд 1-комнатной",
    category: "moving",
    price: 3500,
    priceLabel: "от 3 500 ₽",
    volume: 8,
    volumeLabel: "≈ 8 м³",
    duration: "3-4 часа",
    includes: ["Фургон + грузчик", "Упаковка плёнкой", "До 5-го этажа"],
  },
  {
    id: "move-2k",
    title: "Переезд 2-комнатной",
    category: "moving",
    price: 5000,
    priceLabel: "от 5 000 ₽",
    volume: 12,
    volumeLabel: "≈ 12 м³",
    duration: "4-5 часов",
    includes: ["Фургон + грузчик", "Упаковка плёнкой", "Разборка кровати"],
    badge: "Популярно",
  },
  {
    id: "move-3k",
    title: "Переезд 3-комнатной",
    category: "moving",
    price: 7000,
    priceLabel: "от 7 000 ₽",
    volume: 18,
    volumeLabel: "≈ 18 м³",
    duration: "5-6 часов",
    includes: ["Фургон + грузчик", "Упаковка плёнкой", "Помощь со сборкой"],
  },
  {
    id: "office",
    title: "Офисный переезд",
    category: "moving",
    price: 5000,
    priceLabel: "от 5 000 ₽",
    volume: 15,
    volumeLabel: "до 15 м³",
    duration: "по объёму",
    includes: ["Фургон + грузчик", "Аккуратная погрузка техники", "Чек после оплаты"],
  },
  {
    id: "trash-min",
    title: "Вывоз мусора (минимум)",
    category: "trash",
    price: 2500,
    priceLabel: "от 2 500 ₽",
    volume: 5,
    volumeLabel: "до 5 м³",
    duration: "1-2 часа",
    includes: ["Погрузка включена", "Свалка/полигон", "Чисто после нас"],
  },
  {
    id: "trash-full",
    title: "Полный фургон мусора",
    category: "trash",
    price: 5000,
    priceLabel: "от 5 000 ₽",
    volume: 20,
    volumeLabel: "20 м³",
    duration: "2-3 часа",
    includes: ["Строительный мусор", "Старая мебель", "Утилизация"],
    badge: "Выгодно",
  },
  {
    id: "inter-novoross",
    title: "Краснодар → Новороссийск",
    category: "intercity",
    price: 7000,
    priceLabel: "от 7 000 ₽",
    volume: 20,
    volumeLabel: "до 20 м³",
    duration: "~150 км",
    includes: ["Топливо включено", "Страховка груза", "Возможна сборная"],
  },
  {
    id: "inter-anapa",
    title: "Краснодар → Анапа",
    category: "intercity",
    price: 8000,
    priceLabel: "от 8 000 ₽",
    volume: 20,
    volumeLabel: "до 20 м³",
    duration: "~170 км",
    includes: ["Топливо включено", "Страховка груза"],
  },
  {
    id: "inter-sochi",
    title: "Краснодар → Сочи",
    category: "intercity",
    price: 12000,
    priceLabel: "от 12 000 ₽",
    volume: 20,
    volumeLabel: "до 20 м³",
    duration: "~300 км",
    includes: ["Топливо включено", "Страховка груза", "Грузчик на разгрузку"],
  },
];

type SortKey = "price_asc" | "price_desc" | "volume_desc";

export default function TariffCatalog() {
  const [category, setCategory] = useState<Category | "all">("all");
  const [priceRange, setPriceRange] = useState("all");
  const [volumeRange, setVolumeRange] = useState("all");
  const [sort, setSort] = useState<SortKey>("price_asc");

  const filtered = useMemo(() => {
    const pr = PRICE_RANGES.find((r) => r.id === priceRange)!;
    const vr = VOLUME_RANGES.find((r) => r.id === volumeRange)!;
    const list = TARIFFS.filter(
      (t) =>
        (category === "all" || t.category === category) &&
        t.price >= pr.min &&
        t.price < pr.max &&
        t.volume >= vr.min &&
        t.volume < vr.max
    );
    list.sort((a, b) => {
      if (sort === "price_asc") return a.price - b.price;
      if (sort === "price_desc") return b.price - a.price;
      return b.volume - a.volume;
    });
    return list;
  }, [category, priceRange, volumeRange, sort]);

  const resetAll = () => {
    setCategory("all");
    setPriceRange("all");
    setVolumeRange("all");
    setSort("price_asc");
  };

  return (
    <div>
      {/* Фильтры */}
      <div className="rounded-2xl bg-white p-5 shadow-sm">
        <div className="mb-4">
          <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-text-secondary">
            Категория
          </div>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <button
                key={c.value}
                onClick={() => setCategory(c.value)}
                className={`rounded-full border px-4 py-1.5 text-sm transition ${
                  category === c.value
                    ? "border-yellow bg-yellow text-dark font-semibold"
                    : "border-gray-200 text-text-secondary hover:bg-gray-100"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-text-secondary">
            Цена
          </div>
          <div className="flex flex-wrap gap-2">
            {PRICE_RANGES.map((r) => (
              <button
                key={r.id}
                onClick={() => setPriceRange(r.id)}
                className={`rounded-full border px-4 py-1.5 text-sm transition ${
                  priceRange === r.id
                    ? "border-dark bg-dark text-white"
                    : "border-gray-200 text-text-secondary hover:bg-gray-100"
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-text-secondary">
            Объём
          </div>
          <div className="flex flex-wrap gap-2">
            {VOLUME_RANGES.map((r) => (
              <button
                key={r.id}
                onClick={() => setVolumeRange(r.id)}
                className={`rounded-full border px-4 py-1.5 text-sm transition ${
                  volumeRange === r.id
                    ? "border-dark bg-dark text-white"
                    : "border-gray-200 text-text-secondary hover:bg-gray-100"
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 pt-4">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-text-secondary">Сортировка:</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="rounded-full border border-gray-200 px-3 py-1.5 text-sm outline-none focus:border-yellow"
            >
              <option value="price_asc">Цена ↑</option>
              <option value="price_desc">Цена ↓</option>
              <option value="volume_desc">Объём ↓</option>
            </select>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <span className="text-text-secondary">
              Найдено: <b className="text-dark">{filtered.length}</b>
            </span>
            <button
              onClick={resetAll}
              className="rounded-full border border-gray-200 px-3 py-1.5 hover:bg-gray-100"
            >
              Сбросить
            </button>
          </div>
        </div>
      </div>

      {/* Карточки */}
      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filtered.length === 0 && (
          <div className="md:col-span-2 lg:col-span-3 rounded-2xl bg-white p-8 text-center text-text-secondary">
            Ничего не найдено. Попробуйте сбросить фильтры.
          </div>
        )}

        {filtered.map((t) => (
          <div
            key={t.id}
            className="flex flex-col rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:shadow-md"
          >
            <div className="mb-3 flex items-start justify-between gap-2">
              <h4 className="text-base font-semibold text-text-primary">
                {t.title}
              </h4>
              {t.badge && (
                <span className="shrink-0 rounded-full bg-yellow px-2.5 py-0.5 text-xs font-semibold text-dark">
                  {t.badge}
                </span>
              )}
            </div>

            <div className="mb-3 text-2xl font-bold text-yellow-dark">
              {t.priceLabel}
            </div>

            <div className="mb-4 grid grid-cols-2 gap-2 text-xs text-text-secondary">
              <div className="rounded-lg bg-gray-bg px-2.5 py-1.5">
                📦 {t.volumeLabel}
              </div>
              <div className="rounded-lg bg-gray-bg px-2.5 py-1.5">
                ⏱ {t.duration}
              </div>
            </div>

            <ul className="mb-5 space-y-1.5 text-sm text-text-secondary">
              {t.includes.map((line, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-yellow-dark">✓</span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>

            <Link
              href="/calculator"
              className="mt-auto inline-flex items-center justify-center rounded-full bg-dark py-2.5 text-sm font-semibold text-white transition hover:bg-dark/90"
            >
              Рассчитать точно
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
