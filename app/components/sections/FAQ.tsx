"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export interface FAQItem {
  question: string;
  answer: string;
}

const defaultItems: FAQItem[] = [
  {
    question: "Сколько стоит перевозка?",
    answer:
      "Минимальный заказ от 2 500 ₽. Час работы по городу от 1 200 ₽. Квартирный переезд от 3 500 ₽. Точную цену назовём после обсуждения деталей — звоните.",
  },
  {
    question: "Чем фургон отличается от газели?",
    answer:
      "Наш Iveco Daily вмещает до 20 м³ и везёт до 4 тонн. Обычная газель — 9 м³ и 1,5 тонны. Часто хватает одной поездки вместо двух, что выгоднее.",
  },
  {
    question: "Грузчик входит в стоимость?",
    answer:
      "Да. Водитель и грузчик — один человек. Не нужно искать и оплачивать отдельно.",
  },
  {
    question: "Работаете по Краснодарскому краю?",
    answer:
      "Да. Возим в Сочи, Анапу, Новороссийск, Геленджик, Армавир. Межгород от 35 ₽/км, минимум от 5 000 ₽.",
  },
  {
    question: "Берёте строительный мусор?",
    answer:
      "Да. Вывозим строительный мусор после ремонта, старую мебель, хлам из гаража. Пищевые отходы не берём.",
  },
  {
    question: "Как рассчитывается цена?",
    answer:
      "Зависит от объёма, адресов, этажей и времени работы. Цену называем до начала, не меняем в процессе. Без скрытых доплат.",
  },
];

interface FAQProps {
  items?: FAQItem[];
}

export default function FAQ({ items = defaultItems }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  function toggle(i: number) {
    setOpenIndex(openIndex === i ? null : i);
  }

  return (
    <section className="bg-gray-bg py-12 lg:py-20">
      <div className="mx-auto max-w-3xl px-4 lg:px-8">
        <h2 className="mb-10 text-center text-2xl font-bold text-text-primary lg:text-4xl">
          Часто задаваемые <span className="text-yellow">вопросы</span>
        </h2>

        <div className="space-y-3">
          {items.map((item, i) => (
            <div key={i} className="rounded-2xl bg-white shadow-md">
              <button
                onClick={() => toggle(i)}
                className="flex w-full items-center justify-between px-6 py-5 text-left"
              >
                <span className="text-base font-semibold text-text-primary pr-4">
                  {item.question}
                </span>
                <ChevronDown
                  className={`h-5 w-5 shrink-0 text-yellow transition-transform ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === i && (
                <div className="px-6 pb-5 text-sm leading-relaxed text-text-secondary">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
