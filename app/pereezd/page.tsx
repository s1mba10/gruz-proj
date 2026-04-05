import type { Metadata } from "next";
import PageHero from "../components/sections/PageHero";
import FAQ from "../components/sections/FAQ";
import CallToAction from "../components/sections/CallToAction";

export const metadata: Metadata = {
  title: "Квартирный переезд в Краснодаре — фургон + грузчик",
  description:
    "Квартирный и офисный переезд в Краснодаре. Большой фургон Iveco Daily — часто хватает одной ходки. Аккуратно упакуем и перевезём мебель.",
  keywords: [
    "переезд в краснодар",
    "квартирный переезд краснодар",
    "переезд краснодар машина",
    "офисный переезд краснодар",
  ],
  alternates: { canonical: "https://gruzim-krasnodar.ru/pereezd" },
};

const faqItems = [
  {
    question: "Сколько стоит квартирный переезд?",
    answer:
      "Переезд однокомнатной квартиры — от 3 500 ₽, двухкомнатной — от 5 000 ₽. Точная цена зависит от объёма вещей, этажей и расстояния.",
  },
  {
    question: "Хватит ли одной ходки?",
    answer:
      "Наш фургон Iveco Daily вмещает до 20 м³ — это вдвое больше газели. Для большинства квартир до двух комнат хватает одной поездки.",
  },
  {
    question: "Можно перевезти пианино или сейф?",
    answer:
      "Да, перевозим тяжёлую мебель и технику. Для крупногабаритных предметов, таких как пианино, может потребоваться дополнительный грузчик — обсудим при заказе.",
  },
  {
    question: "Упаковываете ли вещи?",
    answer:
      "Мебель оборачиваем защитной плёнкой, хрупкие предметы фиксируем. Коробки для мелочей лучше подготовить заранее.",
  },
  {
    question: "Переезжаете в выходные?",
    answer:
      "Да, работаем ежедневно, включая выходные и праздники. Цена не меняется.",
  },
];

export default function PereezdPage() {
  return (
    <>
      <PageHero
        title="Квартирный переезд в"
        highlight="Краснодаре"
        description="Аккуратный переезд квартиры или офиса с грузчиком. Большой фургон Iveco Daily до 20 м³ — часто хватает одной ходки вместо двух."
      />

      <section className="bg-white py-12 lg:py-20">
        <div className="mx-auto max-w-4xl px-4 lg:px-8">
          <h2 className="mb-6 text-2xl font-bold text-text-primary lg:text-3xl">
            Переезд квартиры в Краснодаре с машиной и грузчиком
          </h2>
          <p className="mb-4 text-base leading-relaxed text-text-secondary">
            Планируете переезд в Краснодаре? Мы поможем быстро и аккуратно перевезти все вещи из одной квартиры в другую. Наш фургон Iveco Daily вмещает до 20 кубометров — это вдвое больше стандартной газели. Для большинства квартир до двух комнат достаточно одной поездки, что экономит ваше время и деньги.
          </p>
          <p className="mb-4 text-base leading-relaxed text-text-secondary">
            Водитель и грузчик — один человек. Не нужно отдельно искать машину и рабочих. Один звонок — и всё организовано. Мы работаем без посредников, напрямую, поэтому цена ниже, чем у крупных агрегаторов типа Яндекс Go или Грузовичкоф.
          </p>

          <h2 className="mb-6 mt-10 text-2xl font-bold text-text-primary lg:text-3xl">
            Как проходит переезд
          </h2>
          <ul className="mb-6 space-y-3 text-base text-text-secondary">
            <li className="flex items-start gap-3">
              <span className="mt-1 text-yellow">●</span>
              Приезжаем в назначенное время с фургоном
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 text-yellow">●</span>
              Аккуратно спускаем мебель и вещи, грузим в фургон
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 text-yellow">●</span>
              Перевозим по Краснодару до нового адреса
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 text-yellow">●</span>
              Поднимаем на нужный этаж и расставляем по комнатам
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 text-yellow">●</span>
              Оплата после завершения работы
            </li>
          </ul>

          <h2 className="mb-6 mt-10 text-2xl font-bold text-text-primary lg:text-3xl">
            Офисный переезд в Краснодаре
          </h2>
          <p className="mb-4 text-base leading-relaxed text-text-secondary">
            Кроме квартирных переездов, мы выполняем переезд офисов и коммерческих помещений. Перевозим мебель, оргтехнику, документы и оборудование. Работаем быстро и аккуратно, чтобы минимизировать простой бизнеса. Можем выполнить переезд в вечернее время или выходные.
          </p>
          <p className="mb-4 text-base leading-relaxed text-text-secondary">
            Переезд из Краснодара в другие города Краснодарского края тоже возможен — Сочи, Анапа, Новороссийск и другие направления. Перевозим на межгороде по фиксированной цене, которую обсуждаем заранее.
          </p>

          <h2 className="mb-6 mt-10 text-2xl font-bold text-text-primary lg:text-3xl">
            Цены на переезд
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
                  <td className="py-3 pr-4">Переезд 1-комнатной квартиры</td>
                  <td className="py-3">от 3 500 ₽</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 pr-4">Переезд 2-комнатной квартиры</td>
                  <td className="py-3">от 5 000 ₽</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 pr-4">Переезд 3-комнатной квартиры</td>
                  <td className="py-3">от 7 000 ₽</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 pr-4">Офисный переезд</td>
                  <td className="py-3">от 5 000 ₽</td>
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
