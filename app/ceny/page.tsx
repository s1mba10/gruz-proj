import type { Metadata } from "next";
import PageHero from "../components/sections/PageHero";
import FAQ from "../components/sections/FAQ";
import CallToAction from "../components/sections/CallToAction";
import TariffCatalog from "./TariffCatalog";

export const metadata: Metadata = {
  title: "Цены на грузоперевозки в Краснодаре — тарифы и расчёт стоимости",
  description:
    "Тарифы на грузоперевозки в Краснодаре. Почасовая оплата и фиксированные цены. Без скрытых платежей.",
  keywords: [
    "грузоперевозки краснодар недорого",
    "грузовое такси краснодар недорого",
    "стоимость грузоперевозок краснодар",
    "грузоперевозки краснодар цена",
    "сколько стоит вывоз мусора в краснодаре",
  ],
  alternates: { canonical: "https://gruzim-krasnodar.ru/ceny" },
};

const faqItems = [
  {
    question: "Есть ли скрытые платежи?",
    answer:
      "Нет. Цена, которую мы называем при заказе — окончательная. Не добавляем комиссии, топливные сборы или другие доплаты.",
  },
  {
    question: "Можно ли узнать точную цену до заказа?",
    answer:
      "Да. Позвоните или оставьте заявку — опишите что нужно перевезти, откуда и куда. Назовём точную цену до начала работы.",
  },
  {
    question: "Почему дешевле агрегаторов?",
    answer:
      "Мы работаем напрямую, без комиссии посредника. В цену Яндекс Go и подобных сервисов заложена комиссия 20-30%. У нас её нет.",
  },
  {
    question: "Как оплачивать?",
    answer:
      "Наличными или переводом на карту после выполнения работы. Предоплата не требуется.",
  },
];

export default function CenyPage() {
  return (
    <>
      <PageHero
        title="Цены на грузоперевозки в"
        highlight="Краснодаре"
        description="Прозрачные тарифы без скрытых платежей. Цена фиксируется до начала работы и не меняется."
      />

      <section className="bg-gray-bg py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="mb-2 text-2xl font-bold text-text-primary lg:text-3xl">
            Каталог тарифов
          </h2>
          <p className="mb-6 text-sm text-text-secondary">
            Отфильтруйте по категории, цене и объёму — найдите подходящий вариант за секунду.
          </p>
          <TariffCatalog />
        </div>
      </section>

      <section className="bg-white py-12 lg:py-20">
        <div className="mx-auto max-w-4xl px-4 lg:px-8">
          <h2 className="mb-6 text-2xl font-bold text-text-primary lg:text-3xl">
            Тарифы на грузоперевозки по Краснодару
          </h2>
          <p className="mb-8 text-base leading-relaxed text-text-secondary">
            Стоимость грузоперевозок в Краснодаре зависит от объёма работы, расстояния и дополнительных услуг. Ниже указаны ориентировочные цены. Точную стоимость назовём после обсуждения деталей заказа. Цена фиксируется до начала работы и не меняется в процессе.
          </p>

          {/* По городу */}
          <h3 className="mb-4 text-xl font-semibold text-text-primary">
            По городу (почасовая оплата)
          </h3>
          <div className="mb-10 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="py-3 pr-4 font-semibold text-text-primary">Услуга</th>
                  <th className="py-3 font-semibold text-text-primary">Цена</th>
                </tr>
              </thead>
              <tbody className="text-text-secondary">
                <tr className="border-b border-gray-100">
                  <td className="py-3 pr-4">Час работы (фургон + грузчик)</td>
                  <td className="py-3">от 1 200 ₽</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 pr-4">Минимальный заказ</td>
                  <td className="py-3">от 2 500 ₽</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 pr-4">Подача машины по городу</td>
                  <td className="py-3">бесплатно</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Переезды */}
          <h3 className="mb-4 text-xl font-semibold text-text-primary">
            Переезды
          </h3>
          <div className="mb-10 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="py-3 pr-4 font-semibold text-text-primary">Тип переезда</th>
                  <th className="py-3 font-semibold text-text-primary">Цена</th>
                </tr>
              </thead>
              <tbody className="text-text-secondary">
                <tr className="border-b border-gray-100">
                  <td className="py-3 pr-4">1-комнатная квартира</td>
                  <td className="py-3">от 3 500 ₽</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 pr-4">2-комнатная квартира</td>
                  <td className="py-3">от 5 000 ₽</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 pr-4">3-комнатная квартира</td>
                  <td className="py-3">от 7 000 ₽</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 pr-4">Офисный переезд</td>
                  <td className="py-3">от 5 000 ₽</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Межгород */}
          <h3 className="mb-4 text-xl font-semibold text-text-primary">
            Межгород
          </h3>
          <div className="mb-10 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="py-3 pr-4 font-semibold text-text-primary">Направление</th>
                  <th className="py-3 font-semibold text-text-primary">Цена</th>
                </tr>
              </thead>
              <tbody className="text-text-secondary">
                <tr className="border-b border-gray-100">
                  <td className="py-3 pr-4">Краснодар → Новороссийск (~150 км)</td>
                  <td className="py-3">от 7 000 ₽</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 pr-4">Краснодар → Анапа (~170 км)</td>
                  <td className="py-3">от 8 000 ₽</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 pr-4">Краснодар → Геленджик (~190 км)</td>
                  <td className="py-3">от 9 000 ₽</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 pr-4">Краснодар → Сочи (~300 км)</td>
                  <td className="py-3">от 12 000 ₽</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 pr-4">Краснодар → Армавир (~200 км)</td>
                  <td className="py-3">от 9 000 ₽</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 pr-4">Другие направления</td>
                  <td className="py-3">от 35 ₽/км</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Вывоз мусора */}
          <h3 className="mb-4 text-xl font-semibold text-text-primary">
            Вывоз мусора
          </h3>
          <div className="mb-10 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="py-3 pr-4 font-semibold text-text-primary">Услуга</th>
                  <th className="py-3 font-semibold text-text-primary">Цена</th>
                </tr>
              </thead>
              <tbody className="text-text-secondary">
                <tr className="border-b border-gray-100">
                  <td className="py-3 pr-4">Вывоз мусора (минимум)</td>
                  <td className="py-3">от 2 500 ₽</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 pr-4">Полная загрузка фургона (20 м³)</td>
                  <td className="py-3">от 5 000 ₽</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 pr-4">Вывоз крупной мебели (1 предмет)</td>
                  <td className="py-3">от 1 000 ₽</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Доплаты */}
          <h3 className="mb-4 text-xl font-semibold text-text-primary">
            Дополнительные услуги
          </h3>
          <div className="mb-10 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="py-3 pr-4 font-semibold text-text-primary">Услуга</th>
                  <th className="py-3 font-semibold text-text-primary">Цена</th>
                </tr>
              </thead>
              <tbody className="text-text-secondary">
                <tr className="border-b border-gray-100">
                  <td className="py-3 pr-4">Подъём на этаж без лифта</td>
                  <td className="py-3">от 200 ₽/этаж</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 pr-4">Ожидание (свыше 15 минут)</td>
                  <td className="py-3">от 500 ₽/час</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 pr-4">Упаковка мебели плёнкой</td>
                  <td className="py-3">бесплатно</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="rounded-2xl bg-gray-bg p-6 text-center">
            <p className="text-base font-semibold text-text-primary">
              Цена фиксируется до начала работы и не меняется
            </p>
            <p className="mt-2 text-sm text-text-secondary">
              Без скрытых доплат, комиссий и счётчиков. Позвоните — назовём точную стоимость.
            </p>
          </div>
        </div>
      </section>

      <FAQ items={faqItems} />
      <CallToAction />
    </>
  );
}
