export type NotificationType = "service" | "dealers" | "orders" | "system";

export type NotificationItem = {
  id: string;
  type: NotificationType;
  title: string;
  text: string;
  time: string;
  unread: boolean;
  important: boolean;
};

export const notificationsMock: NotificationItem[] = [
  {
    id: "n1",
    type: "service",
    title: "Плановое ТО доступно",
    text: "Для TP-180 Pro открылось окно обслуживания на следующей неделе.",
    time: "2 часа назад",
    unread: true,
    important: false,
  },
  {
    id: "n2",
    type: "dealers",
    title: "Новый дилер в вашем регионе",
    text: "В Екатеринбурге подключен сертифицированный сервисный партнер.",
    time: "Сегодня, 10:24",
    unread: true,
    important: false,
  },
  {
    id: "n3",
    type: "orders",
    title: "Статус заявки обновлен",
    text: "Заявка #TP-2741 переведена в этап согласования комплектации.",
    time: "Вчера, 18:40",
    unread: false,
    important: false,
  },
  {
    id: "n4",
    type: "system",
    title: "Обновление конфигуратора",
    text: "Добавлены новые пакеты гидравлики для Heavy Series.",
    time: "Вчера, 12:05",
    unread: false,
    important: false,
  },
  {
    id: "n5",
    type: "orders",
    title: "Требуется подтверждение документов",
    text: "Проверьте и подтвердите пакет документов по заявке #TP-2688.",
    time: "4 дня назад",
    unread: true,
    important: true,
  },
  {
    id: "n6",
    type: "service",
    title: "Напоминание о диагностике",
    text: "Рекомендуем провести диагностику перед пиковым сезоном.",
    time: "6 дней назад",
    unread: false,
    important: false,
  },
];
