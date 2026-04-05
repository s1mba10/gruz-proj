import type { Metadata } from "next";
import PageHero from "../components/sections/PageHero";
import FAQ from "../components/sections/FAQ";
import CallToAction from "../components/sections/CallToAction";

export const metadata: Metadata = {
  title: "Вывоз строительного мусора в Краснодаре — от 2 500 руб",
  description:
    "Вывоз строительного мусора и старой мебели в Краснодаре. Фургон Iveco Daily до 20 м³. Быстро, без лишних вопросов.",
  keywords: [
    "вывоз мусора краснодар",
    "вывоз строительного мусора краснодар",
    "вывоз мусора краснодар недорого",
    "вывоз мусора краснодар цена",
  ],
  alternates: { canonical: "https://gruzim-krasnodar.ru/vyvoz-musora" },
};

const faqItems = [
  {
    question: "Какой мусор вывозите?",
    answer:
      "Строительный мусор после ремонта, старую мебель, хлам из гаража, бытовую технику. Не берём пищевые отходы и опасные грузы.",
  },
  {
    question: "Сколько стоит вывоз мусора?",
    answer:
      "Минимальный заказ — от 2 500 ₽. Цена зависит от объёма и адреса. Полная загрузка фургона (20 м³) — от 5 000 ₽.",
  },
  {
    question: "Нужно ли самому выносить мусор?",
    answer:
      "Нет. Грузчик поможет вынести мешки и крупный мусор из квартиры, дома или гаража.",
  },
  {
    question: "Куда вывозите мусор?",
    answer:
      "На лицензированные полигоны и площадки приёма отходов в Краснодаре.",
  },
  {
    question: "Можно ли вызвать в день обращения?",
    answer:
      "Да, если есть свободное время — приедем в тот же день. Обычно свободные окна есть.",
  },
];

export default function VyvozMusoraPage() {
  return (
    <>
      <PageHero
        title="Вывоз строительного мусора в"
        highlight="Краснодаре"
        description="Вывезем строительный мусор, старую мебель и хлам после ремонта. Фургон Iveco Daily до 20 м³. Быстро и недорого."
      />

      <section className="bg-white py-12 lg:py-20">
        <div className="mx-auto max-w-4xl px-4 lg:px-8">
          <h2 className="mb-6 text-2xl font-bold text-text-primary lg:text-3xl">
            Заказать вывоз мусора в Краснодаре недорого
          </h2>
          <p className="mb-4 text-base leading-relaxed text-text-secondary">
            После ремонта или переезда остаётся много мусора: обломки стен, старая плитка, куски линолеума, сломанная мебель, бытовая техника. Всё это нужно куда-то деть, а обычный мусоровоз строительный мусор не заберёт. Мы предлагаем быстрый и недорогой вывоз мусора в Краснодаре на фургоне Iveco Daily.
          </p>
          <p className="mb-4 text-base leading-relaxed text-text-secondary">
            Наш фургон вмещает до 20 кубометров — этого достаточно для мусора из квартиры после капитального ремонта. Грузчик поможет вынести мешки и крупные предметы, вам не нужно делать это самостоятельно. Вывозим на лицензированные полигоны Краснодара.
          </p>

          <h2 className="mb-6 mt-10 text-2xl font-bold text-text-primary lg:text-3xl">
            Что вывозим
          </h2>
          <ul className="mb-6 space-y-3 text-base text-text-secondary">
            <li className="flex items-start gap-3">
              <span className="mt-1 text-yellow">●</span>
              Строительный мусор после ремонта: кирпич, бетон, штукатурка, плитка
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 text-yellow">●</span>
              Старая мебель: диваны, шкафы, кровати, матрасы
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 text-yellow">●</span>
              Бытовая техника: холодильники, стиральные машины, плиты
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 text-yellow">●</span>
              Хлам из гаража, подвала, чердака
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 text-yellow">●</span>
              Ветки, доски, старые окна и двери
            </li>
          </ul>

          <h2 className="mb-6 mt-10 text-2xl font-bold text-text-primary lg:text-3xl">
            Грузчики для вывоза мусора в Краснодаре
          </h2>
          <p className="mb-4 text-base leading-relaxed text-text-secondary">
            Главное преимущество нашего сервиса — грузчик включён в стоимость. Вам не нужно самостоятельно таскать мешки с мусором к машине. Водитель-грузчик приедет, поможет вынести всё из помещения, загрузит в фургон и вывезет. Один звонок решает проблему.
          </p>
          <p className="mb-4 text-base leading-relaxed text-text-secondary">
            Мы работаем без посредников — дешевле, чем через агрегаторы. Цена фиксируется при заказе и не меняется. Работаем по всему Краснодару и пригородам: Яблоновский, Энем, Северская, Афипский и другие населённые пункты.
          </p>

          <h2 className="mb-6 mt-10 text-2xl font-bold text-text-primary lg:text-3xl">
            Цены на вывоз мусора
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
                  <td className="py-3 pr-4">Вывоз мусора (минимум)</td>
                  <td className="py-3">от 2 500 ₽</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 pr-4">Полная загрузка фургона (20 м³)</td>
                  <td className="py-3">от 5 000 ₽</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 pr-4">Вынос мусора из помещения</td>
                  <td className="py-3">входит в стоимость</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 pr-4">Вывоз крупной мебели (1 предмет)</td>
                  <td className="py-3">от 1 000 ₽</td>
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
