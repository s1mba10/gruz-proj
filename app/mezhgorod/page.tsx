import type { Metadata } from "next";
import PageHero from "../components/sections/PageHero";
import FAQ from "../components/sections/FAQ";
import CallToAction from "../components/sections/CallToAction";

export const metadata: Metadata = {
  title: "Грузоперевозки по Краснодарскому краю — Сочи, Анапа, Новороссийск",
  description:
    "Перевозки из Краснодара по Краснодарскому краю. Сочи, Анапа, Новороссийск, Геленджик, Армавир. Фургон Iveco Daily до 4 тонн.",
  keywords: [
    "межгород краснодар",
    "грузоперевозки сочи",
    "грузоперевозки новороссийск",
    "грузоперевозки анапа",
    "грузоперевозки геленджик",
    "переезд из краснодара в сочи",
  ],
  alternates: { canonical: "https://gruzim-krasnodar.ru/mezhgorod" },
};

const directions = [
  { city: "Сочи", distance: "~300 км", price: "от 12 000 ₽" },
  { city: "Анапа", distance: "~170 км", price: "от 8 000 ₽" },
  { city: "Новороссийск", distance: "~150 км", price: "от 7 000 ₽" },
  { city: "Геленджик", distance: "~190 км", price: "от 9 000 ₽" },
  { city: "Армавир", distance: "~200 км", price: "от 9 000 ₽" },
  { city: "Туапсе", distance: "~180 км", price: "от 8 500 ₽" },
  { city: "Ейск", distance: "~250 км", price: "от 10 000 ₽" },
  { city: "Тимашёвск", distance: "~70 км", price: "от 5 000 ₽" },
];

const faqItems = [
  {
    question: "Как рассчитывается цена на межгород?",
    answer:
      "Цена зависит от расстояния, объёма груза и необходимости погрузки-разгрузки. Ориентировочно от 35 ₽/км, минимум от 5 000 ₽. Точную цену назовём по телефону.",
  },
  {
    question: "Можно ли перевезти вещи из Сочи в Краснодар?",
    answer:
      "Да, работаем в обоих направлениях. Перевозим грузы как из Краснодара, так и в Краснодар из других городов края.",
  },
  {
    question: "Грузчик поможет на месте?",
    answer:
      "Да, водитель-грузчик выполнит погрузку и разгрузку на обоих адресах. Дополнительно платить за это не нужно.",
  },
  {
    question: "Как быстро можете выехать?",
    answer:
      "Обычно можем выехать в тот же или на следующий день. Для дальних направлений лучше согласовать за 1-2 дня.",
  },
  {
    question: "Перевозите ли на дальние расстояния за пределы края?",
    answer:
      "Основное направление — Краснодарский край. Для перевозок за его пределы — обсудим индивидуально по телефону.",
  },
];

export default function MezhgorodPage() {
  return (
    <>
      <PageHero
        title="Межгородские грузоперевозки из"
        highlight="Краснодара"
        description="Грузоперевозки по Краснодарскому краю. Сочи, Анапа, Новороссийск, Геленджик, Армавир и другие города. Фургон Iveco Daily до 4 тонн."
      />

      <section className="bg-white py-12 lg:py-20">
        <div className="mx-auto max-w-4xl px-4 lg:px-8">
          <h2 className="mb-6 text-2xl font-bold text-text-primary lg:text-3xl">
            Грузоперевозки по Краснодарскому краю
          </h2>
          <p className="mb-4 text-base leading-relaxed text-text-secondary">
            Нужно перевезти вещи из Краснодара в Сочи, Анапу или Новороссийск? Мы выполняем межгородские грузоперевозки по всему Краснодарскому краю на фургоне Iveco Daily. Объём кузова до 20 м³ и грузоподъёмность до 4 тонн — достаточно для переезда целой квартиры или офиса.
          </p>
          <p className="mb-4 text-base leading-relaxed text-text-secondary">
            Работаем без посредников и агрегаторов. Вы общаетесь напрямую с водителем, который повезёт ваш груз. Цена фиксируется при заказе и не меняется в пути. Погрузка и разгрузка входят в стоимость — грузчик уже включён.
          </p>

          <h2 className="mb-6 mt-10 text-2xl font-bold text-text-primary lg:text-3xl">
            Направления и цены
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="py-3 pr-4 font-semibold text-text-primary">Направление</th>
                  <th className="py-3 pr-4 font-semibold text-text-primary">Расстояние</th>
                  <th className="py-3 font-semibold text-text-primary">Цена</th>
                </tr>
              </thead>
              <tbody className="text-text-secondary">
                {directions.map((d) => (
                  <tr key={d.city} className="border-b border-gray-100">
                    <td className="py-3 pr-4">Краснодар → {d.city}</td>
                    <td className="py-3 pr-4">{d.distance}</td>
                    <td className="py-3">{d.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="mb-6 mt-10 text-2xl font-bold text-text-primary lg:text-3xl">
            Переезд из Краснодара в Сочи
          </h2>
          <p className="mb-4 text-base leading-relaxed text-text-secondary">
            Сочи — самое популярное направление межгородских перевозок из Краснодара. Расстояние около 300 км, время в пути — 4-5 часов. Перевозим мебель, бытовую технику, личные вещи. Фургон Iveco Daily проедет по горному серпантину без проблем. Грузоперевозки в Сочи выполняем регулярно и знаем все особенности маршрута.
          </p>

          <h2 className="mb-6 mt-10 text-2xl font-bold text-text-primary lg:text-3xl">
            Грузоперевозки в Анапу и Новороссийск
          </h2>
          <p className="mb-4 text-base leading-relaxed text-text-secondary">
            Анапа (170 км) и Новороссийск (150 км) — ближние направления из Краснодара. Время в пути 2-3 часа. Грузоперевозки в Анапу и Новороссийск выполняем практически ежедневно. Часто есть возможность обратной загрузки, что позволяет предложить лучшую цену.
          </p>

          <h2 className="mb-6 mt-10 text-2xl font-bold text-text-primary lg:text-3xl">
            Грузоперевозки в Геленджик и Армавир
          </h2>
          <p className="mb-4 text-base leading-relaxed text-text-secondary">
            Геленджик (190 км) — курортный город на побережье, грузоперевозки выполняем круглый год. Армавир (200 км) — крупный город на востоке края, также одно из наших регулярных направлений. Для обоих городов цена от 9 000 ₽, точная стоимость зависит от объёма и адресов погрузки-разгрузки.
          </p>
        </div>
      </section>

      <FAQ items={faqItems} />
      <CallToAction />
    </>
  );
}
