"use client";

import { useMemo, useState } from "react";
import {
  CheckCheck,
  ClipboardList,
  MapPin,
  Settings,
  Shield,
  Trash2,
  Wrench,
  BellOff,
} from "lucide-react";
import { notificationsMock, type NotificationItem, type NotificationType } from "@/data/notifications";

type FilterValue = "all" | NotificationType;

const filterOptions: { label: string; value: FilterValue }[] = [
  { label: "Все", value: "all" },
  { label: "Сервис", value: "service" },
  { label: "Дилеры", value: "dealers" },
  { label: "Заявки", value: "orders" },
  { label: "Система", value: "system" },
];

function typeLabel(type: NotificationType) {
  if (type === "service") return "Сервис";
  if (type === "dealers") return "Дилеры";
  if (type === "orders") return "Заявки";
  return "Система";
}

function TypeIcon({ type }: { type: NotificationType }) {
  if (type === "service") return <Wrench className="h-4 w-4" />;
  if (type === "dealers") return <MapPin className="h-4 w-4" />;
  if (type === "orders") return <ClipboardList className="h-4 w-4" />;
  return <Shield className="h-4 w-4" />;
}

export default function NotificationsPage() {
  const [items, setItems] = useState<NotificationItem[]>(notificationsMock);
  const [activeFilter, setActiveFilter] = useState<FilterValue>("all");
  const [onlyUnread, setOnlyUnread] = useState(false);

  const visibleItems = useMemo(() => {
    return items.filter((item) => {
      const byType = activeFilter === "all" ? true : item.type === activeFilter;
      const byUnread = onlyUnread ? item.unread : true;
      return byType && byUnread;
    });
  }, [items, activeFilter, onlyUnread]);

  return (
    <main className="min-h-screen bg-transparent text-white">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h1 className="text-2xl font-semibold sm:text-3xl">Уведомления</h1>
            <p className="mt-2 text-sm text-white/65 sm:text-base">
              События по сервису, дилерам и статусам заявок
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-end">
            <button
              type="button"
              onClick={() => setItems((prev) => prev.map((item) => ({ ...item, unread: false })))}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-white/10 px-5 py-2 text-sm font-semibold text-white ring-1 ring-white/15 hover:bg-white/15 active:bg-white/20"
            >
              <CheckCheck className="h-4 w-4" />
              Отметить всё прочитанным
            </button>
            <button
              type="button"
              onClick={() => setItems([])}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-white/10 px-5 py-2 text-sm font-semibold text-white ring-1 ring-white/15 hover:bg-white/15 active:bg-white/20"
            >
              <Trash2 className="h-4 w-4" />
              Очистить
            </button>
            <button
              type="button"
              onClick={() => setOnlyUnread((v) => !v)}
              aria-pressed={onlyUnread}
              className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 py-2 text-sm font-semibold ring-1 ring-white/15 transition ${
                onlyUnread
                  ? "bg-white text-black"
                  : "bg-white/10 text-white hover:bg-white/15 active:bg-white/20"
              }`}
            >
              <Settings className="h-4 w-4" />
              Только непрочитанные
            </button>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          {filterOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setActiveFilter(option.value)}
              className={`inline-flex min-h-11 items-center rounded-full px-4 text-sm ring-1 ring-white/15 transition ${
                activeFilter === option.value
                  ? "bg-white text-black"
                  : "bg-white/10 text-white hover:bg-white/15 active:bg-white/20"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>

        {visibleItems.length === 0 ? (
          <div className="mt-8 rounded-3xl bg-white/5 p-10 text-center ring-1 ring-white/10 backdrop-blur-[2px]">
            <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/15">
              <BellOff className="h-5 w-5 text-white/80" />
            </div>
            <p className="mt-4 text-base font-semibold">Пока тихо</p>
            <p className="mt-2 text-sm text-white/65">Здесь появятся события по сервису и дилерам.</p>
          </div>
        ) : (
          <div className="mt-8 space-y-3">
            {visibleItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() =>
                  setItems((prev) =>
                    prev.map((candidate) =>
                      candidate.id === item.id ? { ...candidate, unread: false } : candidate,
                    ),
                  )
                }
                className={`group flex w-full items-start gap-4 rounded-3xl p-5 text-left ring-1 backdrop-blur-[2px] transition ${
                  item.unread
                    ? "bg-white/[0.09] ring-white/20 hover:bg-white/[0.12]"
                    : "bg-white/[0.05] ring-white/10 hover:bg-white/[0.08]"
                } ${item.important ? "shadow-[0_0_0_1px_rgba(239,68,68,0.35),0_10px_35px_rgba(239,68,68,0.12)]" : ""}`}
              >
                <div className="mt-1 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/15">
                  <TypeIcon type={item.type} />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span className="text-xs text-white/60">{typeLabel(item.type)}</span>
                    <span className="text-xs text-white/45">{item.time}</span>
                    {item.unread && <span className="h-2 w-2 rounded-full bg-red-400" aria-hidden="true" />}
                  </div>
                  <div className="mt-1 text-base font-semibold text-white">{item.title}</div>
                  <p className="mt-2 text-sm text-white/70">{item.text}</p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
