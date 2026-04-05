import { Truck, BadgePercent, HandHelping, UserCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Advantage {
  icon: LucideIcon;
  title: string;
  text: string;
}

const advantages: Advantage[] = [
  {
    icon: Truck,
    title: "Фургон больше газели",
    text: "Iveco Daily до 20 м³ и 4 тонн. Обычная газель — 9 м³ и 1,5 тонны. Часто хватает одной поездки вместо двух.",
  },
  {
    icon: BadgePercent,
    title: "Дешевле Яндекс Go",
    text: "Без комиссии агрегатора. Цена известна до начала работы, без счётчика. Работаем напрямую.",
  },
  {
    icon: HandHelping,
    title: "Грузчик включён",
    text: "Водитель и грузчик в одном лице. Не нужно искать и оплачивать отдельно.",
  },
  {
    icon: UserCheck,
    title: "Не посредник",
    text: "Реальный человек, не колл-центр. Можно обсудить детали до заказа и задать любые вопросы.",
  },
];

export default function Advantages() {
  return (
    <section className="bg-gray-bg py-12 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <h2 className="mb-10 text-center text-2xl font-bold text-text-primary lg:text-4xl">
          Почему <span className="text-yellow">выбирают нас</span>
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {advantages.map((item) => (
            <div key={item.title} className="rounded-2xl bg-white p-6 shadow-md">
              <item.icon className="mb-4 h-10 w-10 text-yellow" />
              <h3 className="mb-2 text-lg font-semibold text-text-primary">{item.title}</h3>
              <p className="text-sm leading-relaxed text-text-secondary">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
