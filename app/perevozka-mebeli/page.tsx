import type { Metadata } from "next";
import PageHero from "../components/sections/PageHero";
import FAQ from "../components/sections/FAQ";
import CallToAction from "../components/sections/CallToAction";

export const metadata: Metadata = {
  title: "Перевозка мебели в Краснодаре — аккуратно с грузчиком",
  description:
    "Перевозка мебели в Краснодаре с грузчиком. Диваны, шкафы, кровати, холодильники — аккуратно и быстро. Фургон с мягкими стенками.",
  keywords: [
    "перевозка мебели в краснодаре",
    "перевозка мебели с грузчиками недорого краснодар",
    "краснодар грузчики перевозка мебели",
  ],
  alternates: { canonical: "https://gruzim-krasnodar.ru/perevozka-mebeli" },
};

const faqItems = [
  {
    question: "Как защищаете мебель при перевозке?",
    answer:
      "Оборачиваем защитной плёнкой, фиксируем ремнями в кузове. Фургон имеет ровный пол и мягкие стенки — мебель не царапается.",
  },
  {
    question: "Можете перевезти один предмет?",
    answer:
      "Да, перевозим и отдельные предметы: диван, холодильник, стиральную машину. Минимальный заказ — от 2 500 ₽.",
  },
  {
    question: "Разбираете ли мебель перед перевозкой?",
    answer:
      "При необходимости можем помочь с разборкой и сборкой простой мебели. Для сложных конструкций рекомендуем пригласить сборщика.",
  },
  {
    question: "Перевозите мебель на верхние этажи?",
    answer:
      "Да, поднимаем мебель на любой этаж. С лифтом — без доплаты, без лифта — от 200 ₽ за этаж.",
  },
];

export default function PerevozkaMebeliPage() {
  return (
    <>
      <PageHero
        title="Перевозка мебели в"
        highlight="Краснодаре"
        description="Аккуратная перевозка мебели с грузчиком. Диваны, шкафы, холодильники — упакуем, перевезём и поднимем на этаж."
      />

      <section className="bg-white py-12 lg:py-20">
        <div className="mx-auto max-w-4xl px-4 lg:px-8">
          <h2 className="mb-6 text-2xl font-bold text-text-primary lg:text-3xl">
            Перевозка мебели с грузчиками недорого в Краснодаре
          </h2>
          <p className="mb-4 text-base leading-relaxed text-text-secondary">
            Купили новый диван, а старый нужно отвезти на дачу? Переезжаете и нужно перевезти всю мебель? Мы поможем. Перевозка мебели в Краснодаре — наша основная специализация. Работаем аккуратно, бережно относимся к вашим вещам.
          </p>
          <p className="mb-4 text-base leading-relaxed text-text-secondary">
            Фургон Iveco Daily оснащён ровным полом и мягкими стенками — мебель не царапается и не бьётся. Объём кузова до 20 м³ позволяет перевезти даже крупногабаритные предметы: угловые диваны, трёхдверные шкафы, двуспальные кровати. Грузоподъёмность до 4 тонн — холодильники и стиральные машины тоже не проблема.
          </p>

          <h2 className="mb-6 mt-10 text-2xl font-bold text-text-primary lg:text-3xl">
            Какую мебель перевозим
          </h2>
          <ul className="mb-6 space-y-3 text-base text-text-secondary">
            <li className="flex items-start gap-3">
              <span className="mt-1 text-yellow">●</span>
              Диваны, кресла, кровати — включая угловые и раскладные
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 text-yellow">●</span>
              Шкафы, комоды, стеллажи — при необходимости разберём
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 text-yellow">●</span>
              Холодильники, стиральные и посудомоечные машины
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 text-yellow">●</span>
              Столы, стулья, офисная мебель
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 text-yellow">●</span>
              Матрасы, зеркала, картины — всё хрупкое упакуем
            </li>
          </ul>

          <h2 className="mb-6 mt-10 text-2xl font-bold text-text-primary lg:text-3xl">
            Грузчики для перевозки мебели в Краснодаре
          </h2>
          <p className="mb-4 text-base leading-relaxed text-text-secondary">
            Главное удобство — грузчик уже включён в стоимость. Водитель-грузчик спустит мебель из квартиры, аккуратно загрузит в фургон, перевезёт по Краснодару и поднимет на нужный этаж в новом месте. Не нужно искать людей для погрузки отдельно.
          </p>
          <p className="mb-4 text-base leading-relaxed text-text-secondary">
            Перевозим мебель по всему Краснодару и пригородам. Также выполняем доставку мебели из магазинов — если вы купили диван или шкаф и нужна доставка с подъёмом на этаж, мы сделаем это быстрее и дешевле, чем служба доставки магазина.
          </p>

          <h2 className="mb-6 mt-10 text-2xl font-bold text-text-primary lg:text-3xl">
            Цены на перевозку мебели
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="py-3 pr-4 font-semibold text-text-primary">Услуга</th>
                  <th className="py-3 font-semibold text-text-primary">Цена</th>
                </tr>
              </thead>
              <tbody className="text-text-secondary">
                <tr className="border-b border-gray-100">
                  <td className="py-3 pr-4">Перевозка 1-2 предметов по городу</td>
                  <td className="py-3">от 2 500 ₽</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 pr-4">Перевозка мебели из комнаты</td>
                  <td className="py-3">от 3 500 ₽</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 pr-4">Доставка мебели из магазина</td>
                  <td className="py-3">от 2 000 ₽</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 pr-4">Подъём на этаж (без лифта)</td>
                  <td className="py-3">от 200 ₽/этаж</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <FAQ items={faqItems} />
      <CallToAction />
    </>
  );
}
