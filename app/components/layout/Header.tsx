"use client";

import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import Link from "next/link";
import { PHONE, PHONE_HREF } from "../../lib/contacts";

const navLinks = [
  { href: "/#services", label: "Услуги" },
  { href: "/ceny", label: "Цены" },
  { href: "/calculator", label: "Калькулятор" },
  { href: "/#how-it-works", label: "Как работаем" },
  { href: "/operator", label: "Оператор" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-dark">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8">
        {/* Logo */}
        <Link href="/" className="text-lg font-bold text-white lg:text-xl">
          Грузоперевозки в Краснодаре
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-white/80 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Phone + CTA (desktop) */}
        <div className="hidden items-center gap-4 md:flex">
          <a
            href={PHONE_HREF}
            className="flex items-center gap-2 text-lg font-semibold text-white"
          >
            <Phone className="h-5 w-5 text-yellow" />
            {PHONE}
          </a>
          <a
            href="#hero-form"
            className="rounded-full bg-yellow px-5 py-2.5 text-sm font-semibold text-dark transition-colors hover:bg-yellow-dark"
          >
            Заказать звонок
          </a>
        </div>

        {/* Mobile: phone + burger */}
        <div className="flex items-center gap-3 md:hidden">
          <a href={PHONE_HREF} aria-label="Позвонить">
            <Phone className="h-6 w-6 text-yellow" />
          </a>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Меню"
            className="text-white"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <nav className="border-t border-white/10 bg-dark px-4 pb-6 pt-4 md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block py-3 text-base text-white/80 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
          <a
            href={PHONE_HREF}
            className="mt-4 block text-center text-lg font-semibold text-white"
          >
            {PHONE}
          </a>
          <a
            href="#hero-form"
            onClick={() => setMobileOpen(false)}
            className="mt-3 block rounded-full bg-yellow py-3 text-center text-sm font-semibold text-dark transition-colors hover:bg-yellow-dark"
          >
            Заказать звонок
          </a>
        </nav>
      )}
    </header>
  );
}
