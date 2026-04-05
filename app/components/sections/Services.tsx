import ServiceCard from "../ui/ServiceCard";

const services = [
  {
    icon: "🚛",
    title: "Грузоперевозки",
    description:
      "Перевозка грузов по Краснодару и краю. Фургон Iveco Daily до 20 м³ — часто хватает одной поездки.",
    href: "/",
  },
  {
    icon: "💪",
    title: "Грузчики",
    description:
      "Погрузка, разгрузка, подъём на этаж. Грузчик с машиной — не нужно искать отдельно.",
    href: "/gruzchiki",
  },
  {
    icon: "🏠",
    title: "Квартирный переезд",
    description:
      "Аккуратный переезд квартиры или офиса в Краснодаре. Большой фургон — часто хватает одной ходки.",
    href: "/pereezd",
  },
  {
    icon: "🗑️",
    title: "Вывоз мусора",
    description:
      "Вывоз строительного мусора, старой мебели и хлама после ремонта. Быстро и недорого.",
    href: "/vyvoz-musora",
  },
  {
    icon: "🛋️",
    title: "Перевозка мебели",
    description:
      "Диваны, шкафы, холодильники — аккуратно упакуем и перевезём с грузчиком.",
    href: "/perevozka-mebeli",
  },
  {
    icon: "🛣️",
    title: "Межгород",
    description:
      "Грузоперевозки из Краснодара в Сочи, Анапу, Новороссийск, Геленджик и другие города края.",
    href: "/mezhgorod",
  },
];

export default function Services() {
  return (
    <section id="services" className="bg-gray-bg py-12 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <h2 className="mb-10 text-center text-2xl font-bold text-text-primary lg:text-4xl">
          Наши <span className="text-yellow">услуги</span>
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
}
