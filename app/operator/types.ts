export type OrderStatus = "new" | "in_progress" | "done" | "cancelled";

export const STATUS_LABELS: Record<OrderStatus, string> = {
  new: "Новая",
  in_progress: "В работе",
  done: "Выполнена",
  cancelled: "Отменена",
};

export const STATUS_COLORS: Record<OrderStatus, string> = {
  new: "bg-blue-100 text-blue-800 border-blue-300",
  in_progress: "bg-yellow-100 text-yellow-800 border-yellow-300",
  done: "bg-green-100 text-green-800 border-green-300",
  cancelled: "bg-red-100 text-red-800 border-red-300",
};

export interface HistoryEntry {
  at: string;
  action: string;
  details?: string;
}

export interface Order {
  id: string;
  createdAt: string;
  name: string;
  phone: string;
  service: string;
  address: string;
  price: number;
  message: string;
  status: OrderStatus;
  history: HistoryEntry[];
}

export const SERVICES = [
  "Квартирный переезд",
  "Офисный переезд",
  "Грузчики",
  "Вывоз мусора",
  "Перевозка мебели",
  "Межгород",
];
