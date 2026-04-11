import Link from "next/link";
import { PHONE, PHONE_HREF, EMAIL, EMAIL_HREF } from "../../lib/contacts";

const serviceLinks = [
  { href: "/gruzchiki", label: "Грузчики" },
  { href: "/pereezd", label: "Переезды" },
  { href: "/vyvoz-musora", label: "Вывоз мусора" },
  { href: "/perevozka-mebeli", label: "Перевозка мебели" },
  { href: "/mezhgorod", label: "Межгород" },
  { href: "/ceny", label: "Цены" },
];

export default function Footer() {
  return (
    <footer className="bg-dark">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {/* About */}
          <div>
            <p className="mb-3 text-lg font-bold text-white">
              Грузоперевозки в Краснодаре
            </p>
            <p className="mb-4 text-sm leading-relaxed text-white/60">
              Частные грузоперевозки по Краснодару и Краснодарскому краю.
              Фургон Iveco Daily, водитель и грузчик в одном лице.
            </p>
            <a
              href={PHONE_HREF}
              className="text-base font-semibold text-white transition-colors hover:text-yellow"
            >
              {PHONE}
            </a>
          </div>

          {/* Services */}
          <div>
            <p className="mb-3 text-lg font-bold text-white">Услуги</p>
            <ul className="space-y-2">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <p className="mb-3 text-lg font-bold text-white">Контакты</p>
            <ul className="space-y-2 text-sm text-white/60">
              <li>
                <a href={PHONE_HREF} className="transition-colors hover:text-white">
                  {PHONE}
                </a>
              </li>
              <li>
                <a
                  href={EMAIL_HREF}
                  className="transition-colors hover:text-white"
                >
                  {EMAIL}
                </a>
              </li>
              <li>Краснодар и Краснодарский край</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-5 lg:px-8">
          <p className="text-center text-xs text-white/40">
            © 2024 Грузоперевозки в Краснодаре
          </p>
        </div>
      </div>
    </footer>
  );
}
