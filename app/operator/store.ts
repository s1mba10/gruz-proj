"use client";

import type { Order, OrderStatus, HistoryEntry } from "./types";

const STORAGE_KEY = "operator_orders_v1";

function nowIso(): string {
  return new Date().toISOString();
}

function randomId(): string {
  return "ORD-" + Math.random().toString(36).slice(2, 8).toUpperCase();
}

function seed(): Order[] {
  const base = new Date();
  const day = 24 * 60 * 60 * 1000;
  return [
    {
      id: "ORD-A1B2C3",
      createdAt: new Date(base.getTime() - 2 * day).toISOString(),
      name: "Иван Петров",
      phone: "+7 (918) 123-45-67",
      service: "Квартирный переезд",
      address: "ул. Красная, 12 → ул. Северная, 45",
      price: 4500,
      message: "2-комн квартира, 4 этаж без лифта",
      status: "done",
      history: [
        { at: new Date(base.getTime() - 2 * day).toISOString(), action: "Создана" },
        { at: new Date(base.getTime() - 2 * day + 3600000).toISOString(), action: "Статус: В работе" },
        { at: new Date(base.getTime() - 2 * day + 7200000).toISOString(), action: "Статус: Выполнена" },
      ],
    },
    {
      id: "ORD-D4E5F6",
      createdAt: new Date(base.getTime() - 1 * day).toISOString(),
      name: "Мария Сидорова",
      phone: "+7 (905) 765-43-21",
      service: "Вывоз мусора",
      address: "ул. Ставропольская, 87",
      price: 3000,
      message: "Строительный мусор после ремонта, ~2 м³",
      status: "in_progress",
      history: [
        { at: new Date(base.getTime() - 1 * day).toISOString(), action: "Создана" },
        { at: new Date(base.getTime() - 1 * day + 1800000).toISOString(), action: "Статус: В работе" },
      ],
    },
    {
      id: "ORD-G7H8I9",
      createdAt: nowIso(),
      name: "Алексей Кузнецов",
      phone: "+7 (962) 555-00-11",
      service: "Грузчики",
      address: "ул. Селезнёва, 4",
      price: 2500,
      message: "Нужны 2 грузчика на 3 часа",
      status: "new",
      history: [{ at: nowIso(), action: "Создана" }],
    },
    {
      id: "ORD-J0K1L2",
      createdAt: nowIso(),
      name: "Ольга Никитина",
      phone: "+7 (988) 222-33-44",
      service: "Межгород",
      address: "Краснодар → Сочи",
      price: 12000,
      message: "Перевозка вещей, ~10 м³",
      status: "new",
      history: [{ at: nowIso(), action: "Создана" }],
    },
  ];
}

export function loadOrders(): Order[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const seeded = seed();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded));
      return seeded;
    }
    return JSON.parse(raw) as Order[];
  } catch {
    return seed();
  }
}

export function saveOrders(orders: Order[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
}

export function resetOrders(): Order[] {
  const seeded = seed();
  saveOrders(seeded);
  return seeded;
}

export function appendHistory(order: Order, entry: Omit<HistoryEntry, "at">): Order {
  return {
    ...order,
    history: [...order.history, { at: nowIso(), ...entry }],
  };
}

export function createOrder(input: {
  name: string;
  phone: string;
  service: string;
  address: string;
  price: number;
  message: string;
}): Order {
  return {
    id: randomId(),
    createdAt: nowIso(),
    status: "new",
    history: [{ at: nowIso(), action: "Создана" }],
    ...input,
  };
}

export function changeStatus(order: Order, status: OrderStatus): Order {
  return appendHistory({ ...order, status }, { action: `Статус: ${status}` });
}
