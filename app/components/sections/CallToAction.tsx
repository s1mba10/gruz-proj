import { Phone } from "lucide-react";
import { PHONE, PHONE_HREF } from "../../lib/contacts";

export default function CallToAction() {
  return (
    <section id="contacts" className="bg-dark py-12 lg:py-20">
      <div className="mx-auto max-w-3xl px-4 text-center lg:px-8">
        <h2 className="mb-4 text-2xl font-bold text-white lg:text-4xl">
          Нужна помощь с <span className="text-yellow">переездом?</span>
        </h2>
        <p className="mb-8 text-base text-white/70">
          Позвоните или оставьте заявку — ответим в течение 15 минут
        </p>

        <a
          href={PHONE_HREF}
          className="mb-6 inline-flex items-center gap-3 text-3xl font-bold text-white transition-colors hover:text-yellow lg:text-4xl"
        >
          <Phone className="h-8 w-8 text-yellow" />
          {PHONE}
        </a>

        <div className="mt-6">
          <a
            href="#hero-form"
            className="inline-flex h-12 items-center justify-center rounded-full bg-yellow px-10 text-sm font-semibold text-dark transition-colors hover:bg-yellow-dark"
          >
            Оставить заявку
          </a>
        </div>
      </div>
    </section>
  );
}
