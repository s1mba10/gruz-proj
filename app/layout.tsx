import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://gruzim-krasnodar.ru"),
  title: {
    default: "Грузоперевозки в Краснодаре — фургон + грузчик",
    template: "%s | Грузоперевозки Краснодар",
  },
  description:
    "Частные грузоперевозки в Краснодаре. Фургон Iveco Daily до 4 тонн и 20 м³ — больше газели. Водитель и грузчик в одном лице. Дешевле Яндекс Go.",
  openGraph: {
    locale: "ru_RU",
    type: "website",
    siteName: "Грузоперевозки в Краснодаре",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${inter.variable} antialiased`}>
      <body className="min-h-screen flex flex-col font-sans">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
