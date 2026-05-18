import type { Metadata } from "next";
import PageHero from "../components/sections/PageHero";
import CallToAction from "../components/sections/CallToAction";
import Calculator from "./Calculator";

export const metadata: Metadata = {
  title: "Калькулятор стоимости грузоперевозок — Краснодар",
  description:
    "Рассчитайте стоимость грузоперевозки в Краснодаре онлайн: выберите услугу, объём, этаж и дополнительные опции. Цена обновляется в реальном времени.",
  alternates: { canonical: "https://gruzim-krasnodar.ru/calculator" },
};

export default function CalculatorPage() {
  return (
    <>
      <PageHero
        title="Калькулятор"
        highlight="стоимости"
        description="Подвиньте ползунки, отметьте нужные опции — получите предварительную цену. Без звонка и регистрации."
      />

      <section className="bg-gray-bg py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <Calculator />
        </div>
      </section>

      <CallToAction />
    </>
  );
}
