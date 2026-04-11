import { Phone } from "lucide-react";
import { PHONE, PHONE_HREF } from "../../lib/contacts";

interface PageHeroProps {
  title: string;
  highlight?: string;
  description: string;
}

export default function PageHero({ title, highlight, description }: PageHeroProps) {
  return (
    <section className="bg-dark py-12 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <h1 className="mb-4 text-3xl font-bold text-white lg:text-5xl">
          {title}{" "}
          {highlight && <span className="text-yellow">{highlight}</span>}
        </h1>
        <p className="mb-8 max-w-2xl text-lg leading-relaxed text-white/70">
          {description}
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
    </section>
  );
}
