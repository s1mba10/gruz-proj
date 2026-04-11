import { Phone } from "lucide-react";
import ContactForm from "../ui/ContactForm";
import { PHONE, PHONE_HREF } from "../../lib/contacts";

const stats = [
  { value: "500+", label: "выполненных заказов" },
  { value: "5 лет", label: "опыта работы" },
  { value: "20 м³", label: "объём фургона" },
  { value: "4 т", label: "грузоподъёмность" },
];

export default function Hero() {
  return (
    <section className="bg-dark">
      <div className="relative">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark/95 to-dark/80" />

        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-8 lg:py-24">
        {/* Left — text */}
        <div>
          <h1 className="mb-6 text-3xl font-bold leading-tight text-white lg:text-5xl">
            Грузоперевозки в{" "}
            <span className="text-yellow">Краснодаре</span>
          </h1>
          <p className="mb-8 max-w-lg text-lg leading-relaxed text-white/70">
            Фургон Iveco Daily до 20&nbsp;м³ — больше газели. Водитель и грузчик в
            одном лице. Дешевле Яндекс&nbsp;Go, без посредников.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row">
            <a
              href="#hero-form"
              className="inline-flex h-12 items-center justify-center rounded-full bg-yellow px-8 text-sm font-semibold text-dark transition-colors hover:bg-yellow-dark"
            >
              Оставить заявку
            </a>
            <a
              href={PHONE_HREF}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/20 px-8 text-sm font-semibold text-white transition-colors hover:border-white/40"
            >
              <Phone className="h-4 w-4" />
              {PHONE}
            </a>
          </div>
        </div>

        {/* Right — form */}
        <div className="lg:justify-self-end lg:w-full lg:max-w-md">
          <ContactForm />
        </div>
      </div>
      </div>

      {/* Stats bar */}
      <div className="border-t border-white/10 bg-dark">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-8 lg:grid-cols-4 lg:px-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl font-bold text-yellow lg:text-3xl">{stat.value}</p>
              <p className="mt-1 text-sm text-white/80">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
