import type { Metadata } from "next";
import Hero from "./components/sections/Hero";
import Services from "./components/sections/Services";
import Advantages from "./components/sections/Advantages";
import HowItWorks from "./components/sections/HowItWorks";
import FAQ from "./components/sections/FAQ";
import CallToAction from "./components/sections/CallToAction";

export const metadata: Metadata = {
  title: "Грузоперевозки в Краснодаре — фургон + грузчик",
  description:
    "Частные грузоперевозки в Краснодаре. Фургон Iveco Daily до 4 тонн и 20 м³ — больше газели. Водитель и грузчик в одном лице. Дешевле Яндекс Go.",
  keywords: [
    "грузоперевозки краснодар",
    "грузовое такси краснодар",
    "перевозка грузов краснодар",
    "фургон краснодар",
  ],
  alternates: {
    canonical: "https://gruzim-krasnodar.ru/",
  },
};

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Advantages />
      <HowItWorks />
      <FAQ />
      <CallToAction />
    </>
  );
}
