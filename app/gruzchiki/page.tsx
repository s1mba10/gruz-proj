import type { Metadata } from "next";
import PageHero from "../components/sections/PageHero";
import FAQ from "../components/sections/FAQ";
import CallToAction from "../components/sections/CallToAction";

export const metadata: Metadata = {
  title: "Грузчики в Краснодаре — от 1 200 руб/час с машиной",
  description:
    "Грузчик с машиной в Краснодаре. Погрузка, разгрузка, перестановка мебели. Фургон Iveco Daily в комплекте — не нужно искать машину отдельно.",
  keywords: [
    "грузчики краснодар",
    "грузчики краснодар недорого",
    "услуги грузчиков краснодар",
    "грузчик с машиной краснодар",
  ],
  alternates: { canonical: "https://gruzim-krasnodar.ru/gruzchiki" },
};

const faqItems = [
  {
    question: "Сколько стоят услуги грузчика?",
    answer:
      "Час работы грузчика с машиной — от 1 200 ₽. Минимальный заказ — 2 часа. Точную цену назовём после обсуждения деталей.",
  },
  {
    question: "Грузчик приедет с машиной?",
    answer:
      "Да. Водитель и грузчик — один человек. Приезжает на фургоне Iveco Daily. Не нужно искать транспорт отдельно.",
  },
  {
    question: "Что можете поднять на этаж?",
    answer:
      "Мебель, бытовую технику, стройматериалы, коробки. Диваны, холодильники, стиральные машины — без проблем.",
  },
  {
    question: "Работаете без лифта?",
    answer:
      "Да, поднимаем и спускаем вручную. Доплата за этаж без лифта — от 200 ₽ за этаж.",
  },
  {
    question: "Можно заказать на определённое время?",
    answer:
      "Да, приезжаем в назначенное время. Согласовываем час подачи машины заранее.",
  },
];

export default function GruzchikiPage() {
  return (
    <>
      <PageHero
        title="Грузчики в"
        highlight="Краснодаре"
        description="Грузчик с машиной в Краснодаре. Погрузка, разгрузка, подъём на этаж. Фургон Iveco Daily в комплекте — не нужно искать транспорт отдельно."
      />

      <section className="bg-white py-12 lg:py-20">
        <div className="mx-auto max-w-4xl px-4 lg:px-8">
          <h2 className="mb-6 text-2xl font-bold text-text-primary lg:text-3xl">
            Услуги грузчиков в Краснодаре недорого
          </h2>
          <p className="mb-4 text-base leading-relaxed text-text-secondary">
            Ищете грузчиков в Краснодаре? Мы предлагаем услуги грузчика с машиной — это удобнее и дешевле, чем заказывать транспорт и рабочих по отдельности. Наш водитель-грузчик приезжает на фургоне Iveco Daily, который вмещает до 20 кубометров и перевозит до 4 тонн. Это в два раза больше, чем стандартная газель.
          </p>
          <p className="mb-4 text-base leading-relaxed text-text-secondary">
            Мы работаем по всему Краснодару и пригородам. Заказать грузчика в Краснодаре можно по телефону или через форму на сайте. Ответим в течение 15 минут, обсудим детали и назовём точную цену. Без скрытых доплат и посредников — вы общаетесь напрямую с человеком, который приедет на заказ.
          </p>

          <h2 className="mb-6 mt-10 text-2xl font-bold text-text-primary lg:text-3xl">
            Что входит в услугу
          </h2>
          <ul className="mb-6 space-y-3 text-base text-text-secondary">
            <li className="flex items-start gap-3">
              <span className="mt-1 text-yellow">●</span>
              Погрузка и разгрузка мебели, бытовой техники, коробок
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 text-yellow">●</span>
              Подъём и спуск по этажам — с лифтом или без
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 text-yellow">●</span>
              Перестановка тяжёлой мебели внутри помещения
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 text-yellow">●</span>
              Транспортировка на фургоне Iveco Daily (до 20 м³)
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 text-yellow">●</span>
              Аккуратное обращение с вещами — без повреждений
            </li>
          </ul>

          <h2 className="mb-6 mt-10 text-2xl font-bold text-text-primary lg:text-3xl">
            Грузовое такси с грузчиками в Краснодаре
          </h2>
          <p className="mb-4 text-base leading-relaxed text-text-secondary">
            Грузовое такси с грузчиком — это оптимальный вариант, когда нужно быстро перевезти вещи по городу. Не нужно тратить время на поиск машины и отдельно грузчиков. Один звонок — и мы приедем в назначенное время с фургоном, готовым к работе.
          </p>
          <p className="mb-4 text-base leading-relaxed text-text-secondary">
            В отличие от крупных агрегаторов, таких как Грузовичкоф или Яндекс Go, мы работаем без комиссий и посредников. Цена грузчиков в Краснодаре у нас фиксируется до начала работы и не меняется в процессе. Вы знаете итоговую сумму заранее.
          </p>
          <p className="mb-4 text-base leading-relaxed text-text-secondary">
            Работаем ежедневно по Краснодару и ближайшим пригородам: Яблоновский, Новая Адыгея, Энем, Северская, Афипский. Если нужны грузчики в Краснодаре недорого — звоните, обсудим вашу задачу и предложим лучшую цену.
          </p>

          <h2 className="mb-6 mt-10 text-2xl font-bold text-text-primary lg:text-3xl">
            Цены на услуги грузчиков
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
                  <td className="py-3 pr-4">Грузчик с машиной (час)</td>
                  <td className="py-3">от 1 200 ₽</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 pr-4">Минимальный заказ</td>
                  <td className="py-3">от 2 500 ₽</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 pr-4">Подъём на этаж (без лифта)</td>
                  <td className="py-3">от 200 ₽/этаж</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 pr-4">Перестановка мебели</td>
                  <td className="py-3">от 1 500 ₽</td>
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
