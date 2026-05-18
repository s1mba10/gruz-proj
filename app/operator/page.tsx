"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  STATUS_LABELS,
  STATUS_COLORS,
  SERVICES,
  type Order,
  type OrderStatus,
} from "./types";
import {
  appendHistory,
  changeStatus,
  createOrder,
  loadOrders,
  resetOrders,
  saveOrders,
} from "./store";

type StatusFilter = OrderStatus | "all";

const STATUS_ORDER: OrderStatus[] = ["new", "in_progress", "done", "cancelled"];

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function OperatorPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loaded, setLoaded] = useState(false);

  // 1.8 — Фильтрация и поиск
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [serviceFilter, setServiceFilter] = useState<string>("all");

  // 1.7 — Редактирование
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editDraft, setEditDraft] = useState<Order | null>(null);

  // 1.9 — История
  const [historyId, setHistoryId] = useState<string | null>(null);

  // Новая заявка
  const [showNew, setShowNew] = useState(false);
  const [newDraft, setNewDraft] = useState({
    name: "",
    phone: "",
    service: SERVICES[0],
    address: "",
    price: 0,
    message: "",
  });

  useEffect(() => {
    setOrders(loadOrders());
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) saveOrders(orders);
  }, [orders, loaded]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return orders
      .filter((o) => (statusFilter === "all" ? true : o.status === statusFilter))
      .filter((o) => (serviceFilter === "all" ? true : o.service === serviceFilter))
      .filter((o) => {
        if (!q) return true;
        return (
          o.id.toLowerCase().includes(q) ||
          o.name.toLowerCase().includes(q) ||
          o.phone.toLowerCase().includes(q) ||
          o.address.toLowerCase().includes(q) ||
          o.message.toLowerCase().includes(q)
        );
      })
      .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
  }, [orders, search, statusFilter, serviceFilter]);

  const counts = useMemo(() => {
    const acc: Record<OrderStatus, number> = {
      new: 0,
      in_progress: 0,
      done: 0,
      cancelled: 0,
    };
    orders.forEach((o) => (acc[o.status] += 1));
    return acc;
  }, [orders]);

  function handleStatusChange(id: string, status: OrderStatus) {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? changeStatus(o, status) : o))
    );
  }

  function startEdit(order: Order) {
    setEditingId(order.id);
    setEditDraft({ ...order });
  }

  function saveEdit() {
    if (!editDraft) return;
    setOrders((prev) =>
      prev.map((o) =>
        o.id === editDraft.id
          ? appendHistory(editDraft, { action: "Отредактирована" })
          : o
      )
    );
    setEditingId(null);
    setEditDraft(null);
  }

  function cancelEdit() {
    setEditingId(null);
    setEditDraft(null);
  }

  function addNewOrder() {
    if (!newDraft.name || !newDraft.phone) return;
    const order = createOrder(newDraft);
    setOrders((prev) => [order, ...prev]);
    setNewDraft({
      name: "",
      phone: "",
      service: SERVICES[0],
      address: "",
      price: 0,
      message: "",
    });
    setShowNew(false);
  }

  function deleteOrder(id: string) {
    if (!confirm("Удалить заявку?")) return;
    setOrders((prev) => prev.filter((o) => o.id !== id));
  }

  function handleReset() {
    if (!confirm("Сбросить все данные и загрузить демо-заявки?")) return;
    setOrders(resetOrders());
  }

  const router = useRouter();
  async function handleLogout() {
    try {
      await fetch("/api/operator/logout", { method: "POST" });
    } catch {
      // даже если запрос упал — всё равно идём на логин
    }
    router.replace("/operator/login");
    router.refresh();
  }

  const historyOrder = orders.find((o) => o.id === historyId);

  return (
    <div className="min-h-screen bg-gray-bg pb-16">
      {/* 1.5 — Панель оператора: шапка */}
      <div className="bg-dark text-white">
        <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h1 className="text-2xl font-bold lg:text-3xl">
                Панель оператора
              </h1>
              <p className="mt-2 text-sm text-white/70">
                Управление заявками: статусы, редактирование, поиск и история
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-white/60">Оператор</span>
              <button
                onClick={handleLogout}
                className="rounded-full border border-white/20 px-4 py-1.5 text-sm text-white transition hover:border-white/40 hover:bg-white/5"
              >
                Выйти
              </button>
            </div>
          </div>

          {/* Сводка */}
          <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
            {STATUS_ORDER.map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`rounded-xl border px-4 py-3 text-left transition ${
                  statusFilter === s
                    ? "border-yellow bg-yellow/10"
                    : "border-white/10 bg-white/5 hover:bg-white/10"
                }`}
              >
                <div className="text-xs text-white/60">{STATUS_LABELS[s]}</div>
                <div className="text-2xl font-bold">{counts[s]}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 pt-6 lg:px-8">
        {/* 1.8 — Поиск и фильтрация */}
        <div className="rounded-2xl bg-white p-4 shadow-sm">
          <div className="grid gap-3 md:grid-cols-12">
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Поиск по ID, имени, телефону, адресу…"
              className="md:col-span-5 rounded-full border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-yellow"
            />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
              className="md:col-span-3 rounded-full border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-yellow"
            >
              <option value="all">Все статусы</option>
              {STATUS_ORDER.map((s) => (
                <option key={s} value={s}>
                  {STATUS_LABELS[s]}
                </option>
              ))}
            </select>
            <select
              value={serviceFilter}
              onChange={(e) => setServiceFilter(e.target.value)}
              className="md:col-span-2 rounded-full border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-yellow"
            >
              <option value="all">Все услуги</option>
              {SERVICES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <button
              onClick={() => {
                setSearch("");
                setStatusFilter("all");
                setServiceFilter("all");
              }}
              className="md:col-span-2 rounded-full border border-gray-200 px-4 py-2.5 text-sm font-medium text-text-secondary transition hover:bg-gray-100"
            >
              Сбросить фильтры
            </button>
          </div>

          <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-sm text-text-secondary">
            <span>
              Найдено: <b className="text-dark">{filtered.length}</b> из{" "}
              {orders.length}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => setShowNew((v) => !v)}
                className="rounded-full bg-yellow px-4 py-1.5 text-sm font-semibold text-dark hover:bg-yellow-dark"
              >
                {showNew ? "× Закрыть форму" : "+ Новая заявка"}
              </button>
              <button
                onClick={handleReset}
                className="rounded-full border border-gray-200 px-4 py-1.5 text-sm hover:bg-gray-100"
                title="Сбросить демо-данные"
              >
                ⟲ Демо-данные
              </button>
            </div>
          </div>

          {showNew && (
            <div className="mt-4 grid gap-2 rounded-xl bg-gray-bg p-4 md:grid-cols-3">
              <input
                placeholder="Имя клиента"
                value={newDraft.name}
                onChange={(e) =>
                  setNewDraft({ ...newDraft, name: e.target.value })
                }
                className="rounded-lg border border-gray-200 px-3 py-2 text-sm"
              />
              <input
                placeholder="Телефон"
                value={newDraft.phone}
                onChange={(e) =>
                  setNewDraft({ ...newDraft, phone: e.target.value })
                }
                className="rounded-lg border border-gray-200 px-3 py-2 text-sm"
              />
              <select
                value={newDraft.service}
                onChange={(e) =>
                  setNewDraft({ ...newDraft, service: e.target.value })
                }
                className="rounded-lg border border-gray-200 px-3 py-2 text-sm"
              >
                {SERVICES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              <input
                placeholder="Адрес / маршрут"
                value={newDraft.address}
                onChange={(e) =>
                  setNewDraft({ ...newDraft, address: e.target.value })
                }
                className="rounded-lg border border-gray-200 px-3 py-2 text-sm md:col-span-2"
              />
              <input
                type="number"
                placeholder="Цена, ₽"
                value={newDraft.price || ""}
                onChange={(e) =>
                  setNewDraft({ ...newDraft, price: Number(e.target.value) })
                }
                className="rounded-lg border border-gray-200 px-3 py-2 text-sm"
              />
              <textarea
                placeholder="Комментарий"
                value={newDraft.message}
                onChange={(e) =>
                  setNewDraft({ ...newDraft, message: e.target.value })
                }
                rows={2}
                className="rounded-lg border border-gray-200 px-3 py-2 text-sm md:col-span-3"
              />
              <button
                onClick={addNewOrder}
                disabled={!newDraft.name || !newDraft.phone}
                className="rounded-full bg-dark px-4 py-2 text-sm font-semibold text-white hover:bg-dark/90 disabled:opacity-50 md:col-span-3"
              >
                Создать заявку
              </button>
            </div>
          )}
        </div>

        {/* 1.5 — Список заявок */}
        <div className="mt-6 space-y-3">
          {filtered.length === 0 && (
            <div className="rounded-2xl bg-white p-8 text-center text-text-secondary">
              Заявок не найдено. Измените фильтры или создайте новую.
            </div>
          )}

          {filtered.map((order) => {
            const isEditing = editingId === order.id;
            const draft = isEditing ? editDraft! : order;
            return (
              <div
                key={order.id}
                className="rounded-2xl bg-white p-4 shadow-sm lg:p-5"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-xs text-text-secondary">
                        {order.id}
                      </span>
                      <span
                        className={`inline-block rounded-full border px-2.5 py-0.5 text-xs font-medium ${STATUS_COLORS[order.status]}`}
                      >
                        {STATUS_LABELS[order.status]}
                      </span>
                      <span className="text-xs text-text-secondary">
                        {formatDate(order.createdAt)}
                      </span>
                    </div>
                  </div>

                  {/* 1.6 — Управление статусами */}
                  <div className="flex flex-wrap gap-1">
                    {STATUS_ORDER.map((s) => (
                      <button
                        key={s}
                        onClick={() => handleStatusChange(order.id, s)}
                        disabled={order.status === s}
                        className={`rounded-full border px-3 py-1 text-xs transition ${
                          order.status === s
                            ? `${STATUS_COLORS[s]} cursor-default`
                            : "border-gray-200 text-text-secondary hover:bg-gray-100"
                        }`}
                      >
                        {STATUS_LABELS[s]}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 1.7 — Редактирование/просмотр */}
                {isEditing ? (
                  <div className="mt-4 grid gap-2 md:grid-cols-3">
                    <input
                      value={draft.name}
                      onChange={(e) =>
                        setEditDraft({ ...draft, name: e.target.value })
                      }
                      placeholder="Имя"
                      className="rounded-lg border border-gray-200 px-3 py-2 text-sm"
                    />
                    <input
                      value={draft.phone}
                      onChange={(e) =>
                        setEditDraft({ ...draft, phone: e.target.value })
                      }
                      placeholder="Телефон"
                      className="rounded-lg border border-gray-200 px-3 py-2 text-sm"
                    />
                    <select
                      value={draft.service}
                      onChange={(e) =>
                        setEditDraft({ ...draft, service: e.target.value })
                      }
                      className="rounded-lg border border-gray-200 px-3 py-2 text-sm"
                    >
                      {SERVICES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                    <input
                      value={draft.address}
                      onChange={(e) =>
                        setEditDraft({ ...draft, address: e.target.value })
                      }
                      placeholder="Адрес"
                      className="rounded-lg border border-gray-200 px-3 py-2 text-sm md:col-span-2"
                    />
                    <input
                      type="number"
                      value={draft.price || ""}
                      onChange={(e) =>
                        setEditDraft({
                          ...draft,
                          price: Number(e.target.value),
                        })
                      }
                      placeholder="Цена"
                      className="rounded-lg border border-gray-200 px-3 py-2 text-sm"
                    />
                    <textarea
                      value={draft.message}
                      onChange={(e) =>
                        setEditDraft({ ...draft, message: e.target.value })
                      }
                      placeholder="Комментарий"
                      rows={2}
                      className="rounded-lg border border-gray-200 px-3 py-2 text-sm md:col-span-3"
                    />
                    <div className="flex gap-2 md:col-span-3">
                      <button
                        onClick={saveEdit}
                        className="rounded-full bg-dark px-4 py-2 text-sm font-semibold text-white hover:bg-dark/90"
                      >
                        Сохранить
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="rounded-full border border-gray-200 px-4 py-2 text-sm hover:bg-gray-100"
                      >
                        Отмена
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="mt-3 grid gap-1 text-sm md:grid-cols-2">
                    <div>
                      <b>{order.name}</b> · {order.phone}
                    </div>
                    <div className="text-text-secondary">
                      {order.service} · <b className="text-dark">{order.price.toLocaleString("ru-RU")} ₽</b>
                    </div>
                    <div className="md:col-span-2 text-text-secondary">
                      📍 {order.address || "—"}
                    </div>
                    {order.message && (
                      <div className="md:col-span-2 rounded-lg bg-gray-bg px-3 py-2 text-text-secondary">
                        {order.message}
                      </div>
                    )}
                  </div>
                )}

                <div className="mt-3 flex flex-wrap gap-2 border-t border-gray-100 pt-3">
                  {!isEditing && (
                    <button
                      onClick={() => startEdit(order)}
                      className="rounded-full border border-gray-200 px-3 py-1 text-xs hover:bg-gray-100"
                    >
                      ✎ Редактировать
                    </button>
                  )}
                  <button
                    onClick={() =>
                      setHistoryId(historyId === order.id ? null : order.id)
                    }
                    className="rounded-full border border-gray-200 px-3 py-1 text-xs hover:bg-gray-100"
                  >
                    🕘 История ({order.history.length})
                  </button>
                  <button
                    onClick={() => deleteOrder(order.id)}
                    className="rounded-full border border-red-200 px-3 py-1 text-xs text-red-700 hover:bg-red-50"
                  >
                    Удалить
                  </button>
                </div>

                {/* 1.9 — История заявки */}
                {historyId === order.id && (
                  <div className="mt-3 rounded-xl bg-gray-bg p-3">
                    <div className="mb-2 text-xs font-semibold text-text-secondary">
                      История изменений
                    </div>
                    <ol className="space-y-1.5 text-sm">
                      {order.history.map((h, i) => (
                        <li key={i} className="flex gap-3">
                          <span className="font-mono text-xs text-text-secondary">
                            {formatDate(h.at)}
                          </span>
                          <span>{h.action}</span>
                          {h.details && (
                            <span className="text-text-secondary">
                              — {h.details}
                            </span>
                          )}
                        </li>
                      ))}
                    </ol>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Модальная история (по кнопке выше показывается inline; модалка не нужна) */}
      {historyOrder ? null : null}
    </div>
  );
}
