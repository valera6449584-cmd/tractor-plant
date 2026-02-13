export type TractorModel = {
  name: string;
  slug: string;
  series: "Field" | "Heavy" | "Pro";
  hp: number;
  purpose: "Field" | "Construction" | "Heavy";
  shortDescription: string;
  specs: {
    engine: string;
    transmission: string;
    torque: string;
    weight: string;
  };
  trims: Array<{ name: string; note: string }>;
  images: { hero: string };
  price: { from: number; currency: "RUB"; note?: string };
};

export const models: TractorModel[] = [
  {
    name: "TP-90 Field",
    slug: "tp-90-field",
    series: "Field",
    hp: 90,
    purpose: "Field",
    shortDescription: "Компактный универсал для ежедневных задач и малых хозяйств.",
    specs: {
      engine: "4.4L Turbo Diesel",
      transmission: "12x12 SyncShuttle",
      torque: "410 Nm",
      weight: "4 250 kg",
    },
    trims: [
      { name: "Base", note: "Стандартная кабина, базовая гидравлика" },
      { name: "Comfort", note: "Климат, улучшенная шумоизоляция" },
    ],
    images: { hero: "/tractors/tp-70-compact.png" },
    price: { from: 3890000, currency: "RUB", note: "от" },
  },
  {
    name: "TP-120 Field",
    slug: "tp-120-field",
    series: "Field",
    hp: 120,
    purpose: "Field",
    shortDescription: "Сбалансированная мощность для широкого спектра работ в поле.",
    specs: {
      engine: "4.8L Turbo Diesel",
      transmission: "16x16 Powershift",
      torque: "520 Nm",
      weight: "5 100 kg",
    },
    trims: [
      { name: "Base", note: "Оптимальная комплектация" },
      { name: "Pro", note: "Телематика, расширенная гидравлика" },
    ],
    images: { hero: "/tractors/tp-90-field.png" },
    price: { from: 4690000, currency: "RUB", note: "от" },
  },
  {
    name: "TP-155 Heavy",
    slug: "tp-155-heavy",
    series: "Heavy",
    hp: 155,
    purpose: "Heavy",
    shortDescription: "Тяговый класс для тяжёлых агрегатов и стабильной работы под нагрузкой.",
    specs: {
      engine: "6.7L Turbo Diesel",
      transmission: "24x24 Powershift",
      torque: "780 Nm",
      weight: "6 900 kg",
    },
    trims: [
      { name: "Work", note: "Усиленная рама, защита узлов" },
      { name: "Work+", note: "Улучшенная гидравлика и охлаждение" },
    ],
    images: { hero: "/tractors/tp-120-field.png" },
    price: { from: 8990000, currency: "RUB", note: "от" },
  },
  {
    name: "TP-210 Heavy",
    slug: "tp-210-heavy",
    series: "Heavy",
    hp: 210,
    purpose: "Heavy",
    shortDescription: "Максимальная тяга и запас прочности для самых жёстких условий.",
    specs: {
      engine: "7.2L Turbo Diesel",
      transmission: "CVT HeavyDuty",
      torque: "980 Nm",
      weight: "8 300 kg",
    },
    trims: [
      { name: "HD", note: "Тяжёлый пакет: мосты, охлаждение, защита" },
      { name: "HD Pro", note: "Телематика, премиум сиденье, LED" },
    ],
    images: { hero: "/tractors/tp-200-heavy-duty.png" },
    price: { from: 8990000, currency: "RUB", note: "от" },
  },
  {
    name: "TP-140 Pro",
    slug: "tp-140-pro",
    series: "Pro",
    hp: 140,
    purpose: "Construction",
    shortDescription: "Комфорт и контроль: идеален для коммунальных и строительных задач.",
    specs: {
      engine: "5.0L Turbo Diesel",
      transmission: "16x16 Powershift",
      torque: "600 Nm",
      weight: "5 800 kg",
    },
    trims: [
      { name: "Pro Cabin", note: "Климат, шумоизоляция, обзор" },
      { name: "Pro Cabin+", note: "Пакет ассистентов, камеры" },
    ],
    images: { hero: "/tractors/tp-110-utility.png" },
    price: { from: 5790000, currency: "RUB", note: "от" },
  },
  {
    name: "TP-180 Pro",
    slug: "tp-180-pro",
    series: "Pro",
    hp: 180,
    purpose: "Construction",
    shortDescription: "Премиум кабина и тяга для навесного оборудования в тяжёлых сменах.",
    specs: {
      engine: "6.2L Turbo Diesel",
      transmission: "24x24 Powershift",
      torque: "860 Nm",
      weight: "7 400 kg",
    },
    trims: [
      { name: "Pro", note: "Оптимум по комфорту и производительности" },
      { name: "Pro Max", note: "Макс. пакет: LED, телематика, камеры" },
    ],
    images: { hero: "/tractors/tp-150-pro-field.png" },
    price: { from: 7490000, currency: "RUB", note: "от" },
  },
];
