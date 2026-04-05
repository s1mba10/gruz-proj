const steps = [
  {
    number: "01",
    title: "Оставьте заявку",
    text: "Позвоните или заполните форму на сайте. Ответим в течение 15 минут.",
  },
  {
    number: "02",
    title: "Обсудим детали",
    text: "Уточним объём, адрес, время. Назовём точную цену без скрытых платежей.",
  },
  {
    number: "03",
    title: "Приедем вовремя",
    text: "Подадим машину в назначенное время. Без опозданий.",
  },
  {
    number: "04",
    title: "Выполним работу",
    text: "Аккуратно загрузим, довезём и разгрузим. Оплата после выполнения.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-white py-12 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <h2 className="mb-10 text-center text-2xl font-bold text-text-primary lg:text-4xl">
          Как мы <span className="text-yellow">работаем</span>
        </h2>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <div key={step.number} className="text-center lg:text-left">
              <p className="mb-3 text-5xl font-bold text-yellow">{step.number}</p>
              <h3 className="mb-2 text-lg font-semibold text-text-primary">{step.title}</h3>
              <p className="text-sm leading-relaxed text-text-secondary">{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
