import type { Metadata } from "next";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "Вход в панель оператора · Грузим Краснодар",
  robots: { index: false, follow: false },
};

export default function OperatorLoginPage(props: {
  searchParams: Promise<{ expired?: string; from?: string }>;
}) {
  return <LoginForm searchParamsPromise={props.searchParams} />;
}
