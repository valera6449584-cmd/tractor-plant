"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { models } from "@/data/models";
import { ModelCard } from "@/components/ModelCard";
import VideoHero from "@/components/VideoHero";
import Reveal from "@/components/Reveal";
import StaggerGrid from "@/components/StaggerGrid";

const hpBuckets = [
  { label: "Все", value: "all" },
  { label: "до 120", value: "lte120" },
  { label: "121-170", value: "121_170" },
  { label: "171+", value: "gte171" },
] as const;

const seriesOptions = [
  { label: "Все", value: "all" },
  { label: "Field", value: "Field" },
  { label: "Heavy", value: "Heavy" },
  { label: "Pro", value: "Pro" },
] as const;

export default function Home() {
  const reduceMotion = useReducedMotion() ?? false;
  const [hp, setHp] = useState<(typeof hpBuckets)[number]["value"]>("all");
  const [series, setSeries] = useState<(typeof seriesOptions)[number]["value"]>("all");

  const filtered = useMemo(() => {
    return models.filter((m) => {
      const okSeries = series === "all" ? true : m.series === series;
      const okHp =
        hp === "all"
          ? true
          : hp === "lte120"
            ? m.hp <= 120
            : hp === "121_170"
              ? m.hp >= 121 && m.hp <= 170
              : hp === "gte171"
                ? m.hp >= 171
                : true;

      return okSeries && okHp;
    });
  }, [hp, series]);

  const featured = useMemo(() => {
    const order = ["tp-210-heavy", "tp-180-pro"];
    return order
      .map((s) => models.find((m) => m.slug === s))
      .filter(Boolean) as typeof models;
  }, []);

  const mapPoints: ReadonlyArray<{ id: string; x: number; y: number; pulse?: boolean }> = [
    { id: "nw1", x: 23, y: 30, pulse: true },
    { id: "nw2", x: 27, y: 36 },
    { id: "center1", x: 30, y: 42 },
    { id: "center2", x: 36, y: 44, pulse: true },
    { id: "volga1", x: 41, y: 46 },
    { id: "ural1", x: 50, y: 44, pulse: true },
    { id: "siberia1", x: 60, y: 46 },
    { id: "siberia2", x: 70, y: 44 },
    { id: "east1", x: 80, y: 46 },
    { id: "far_east", x: 86, y: 50, pulse: true },
  ];

  return (
    <main className="-mt-24 min-h-screen bg-transparent text-white">
      <VideoHero>
        <div className="mt-10 grid gap-8 sm:mt-12 sm:gap-10 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-7 lg:mt-16 lg:flex lg:h-full lg:flex-col">
            <div className="fade-in-up logo-glow">
              <Link href="/technology" className="inline-block">
                <Image
                  src="/brand/tractor-plant-logo.png"
                  alt="Tractor Plant"
                  width={720}
                  height={180}
                  priority
                  className="h-auto w-[260px] cursor-pointer drop-shadow-[0_10px_40px_rgba(0,0,0,0.45)] sm:w-[360px] md:w-[520px]"
                />
              </Link>
              <h1 className="sr-only">Tractor Plant</h1>
            </div>

            <p className="mt-4 max-w-2xl text-sm text-white/70 sm:text-base md:text-lg">
              Премиальные тракторы для сельского хозяйства и строительства. Созданы для тяжелой
              работы и рассчитаны на долгий срок службы.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/catalog"
                className="inline-flex min-h-11 items-center justify-center rounded-full bg-white px-6 py-3 text-center text-sm font-semibold text-black hover:bg-white/90 active:bg-white/80"
              >
                Смотреть модели
              </Link>
              <Link
                href="/configurator"
                className="inline-flex min-h-11 items-center justify-center rounded-full bg-white/10 px-6 py-3 text-center text-sm font-semibold text-white ring-1 ring-white/15 hover:bg-white/15 active:bg-white/20"
              >
                Подобрать комплектацию
              </Link>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
              <Stat value="70+" label="Лет инженерии" />
              <Stat value="6" label="Моделей" />
              <Stat value="24 мес." label="Гарантия" />
              <Stat value="120+" label="Сервисов" />
            </div>
          </div>

          <div className="mt-3 flex flex-col md:mt-4 lg:col-span-5 lg:mt-0 lg:h-full">
            <div className="relative h-[220px] flex-1 overflow-hidden rounded-3xl bg-black/20 ring-1 ring-white/10 sm:h-[260px] lg:h-full lg:min-h-[420px]">
              <video
                src="/videos/zastavka.mp4"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className="absolute inset-0 h-full w-full object-cover object-center"
              />
              <div className="pointer-events-none absolute inset-0 bg-black/25" />
            </div>

            <div className="mt-4 rounded-3xl bg-white/5 p-6 ring-1 ring-white/10 backdrop-blur-[2px]">
              <div className="text-sm font-semibold">Быстрый подбор</div>
              <div className="mt-1 text-sm text-white/60">
                Отфильтруйте по серии и мощности и откройте карточку подходящей модели.
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {seriesOptions.map((o) => (
                  <button
                    key={o.value}
                    onClick={() => setSeries(o.value)}
                    className={`inline-flex min-h-11 items-center rounded-full px-4 py-2 text-sm ring-1 ring-white/15 transition ${
                      series === o.value
                        ? "bg-white text-black"
                        : "bg-white/10 text-white hover:bg-white/15 active:bg-white/20"
                    }`}
                  >
                    {o.label}
                  </button>
                ))}
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                {hpBuckets.map((o) => (
                  <button
                    key={o.value}
                    onClick={() => setHp(o.value)}
                    className={`inline-flex min-h-11 items-center rounded-full px-4 py-2 text-sm ring-1 ring-white/15 transition ${
                      hp === o.value
                        ? "bg-white text-black"
                        : "bg-white/10 text-white hover:bg-white/15 active:bg-white/20"
                    }`}
                  >
                    {o.label}
                  </button>
                ))}
              </div>

              <div className="mt-5 text-xs text-white/60">
                Найдено: <span className="text-white/80">{filtered.length}</span>
              </div>
            </div>
          </div>
        </div>
      </VideoHero>

      <Reveal className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <StaggerGrid className="grid gap-4 md:grid-cols-3" stagger={0.08}>
          <Feature
            title="Тяга и стабильность"
            text="Под нагрузкой трактор сохраняет тяговые характеристики и снижает простои."
          />
          <Feature
            title="Комфорт оператора"
            text="Продуманная кабина, шумоизоляция и климат-контроль для длительных смен."
          />
          <Feature
            title="Сервисная сеть"
            text="Запчасти и поддержка доступны рядом, чтобы техника работала без пауз."
          />
        </StaggerGrid>
      </Reveal>

      <section className="mx-auto mt-14 max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <motion.div
            className="group relative overflow-hidden rounded-xl ring-1 ring-white/20 transition-all duration-500 hover:shadow-[0_24px_60px_rgba(2,6,23,0.45)] hover:ring-white/35"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={reduceMotion ? undefined : { y: -6, scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative w-full aspect-[2/3]">
              <SlideShow
                images={[
                  "/images/delivery-image.png",
                  "/images/delivery-image2.png",
                  "/images/delivery-image3.png",
                ]}
                alt="Как доставляется"
                reduceMotion={reduceMotion}
              />
              <div className="pointer-events-none absolute inset-y-0 -left-1/2 z-20 w-1/2 rotate-12 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition-[transform,opacity] duration-700 ease-out group-hover:translate-x-[260%] group-hover:opacity-100 group-active:translate-x-[260%] group-active:opacity-100" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 z-10 px-6 py-8 text-center text-white transition-all duration-300">
                <h2 className="text-xl font-semibold transition-transform group-hover:scale-105 group-active:scale-105">
                  Доставка без сюрпризов
                </h2>
                <p className="mt-3 text-sm">
                  От завода до вашей площадки — логистика, подготовка и передача техники.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="group relative overflow-hidden rounded-xl ring-1 ring-white/20 transition-all duration-500 hover:shadow-[0_24px_60px_rgba(2,6,23,0.45)] hover:ring-white/35"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={reduceMotion ? undefined : { y: -6, scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative w-full aspect-[2/3]">
              <SlideShow
                images={[
                  "/images/collage-image.png",
                  "/images/collage-image2.png",
                  "/images/collage-image3.png",
                ]}
                alt="Где используется"
                reduceMotion={reduceMotion}
              />
              <div className="pointer-events-none absolute inset-y-0 -left-1/2 z-20 w-1/2 rotate-12 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition-[transform,opacity] duration-700 ease-out group-hover:translate-x-[260%] group-hover:opacity-100 group-active:translate-x-[260%] group-active:opacity-100" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 z-10 px-6 py-8 text-center text-white transition-all duration-300">
                <h2 className="text-xl font-semibold transition-transform group-hover:scale-105 group-active:scale-105">
                  Работает там, где нужно
                </h2>
                <p className="mt-3 text-sm">Сельское хозяйство, строительство и коммунальные задачи.</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="group relative overflow-hidden rounded-xl ring-1 ring-white/20 transition-all duration-500 hover:shadow-[0_24px_60px_rgba(2,6,23,0.45)] hover:ring-white/35"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={reduceMotion ? undefined : { y: -6, scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative w-full aspect-[2/3]">
              <SlideShow
                images={[
                  "/images/testing-image.png",
                  "/images/testing-image2.png",
                  "/images/testing-image3.png",
                ]}
                alt="Испытания"
                reduceMotion={reduceMotion}
              />
              <div className="pointer-events-none absolute inset-y-0 -left-1/2 z-20 w-1/2 rotate-12 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition-[transform,opacity] duration-700 ease-out group-hover:translate-x-[260%] group-hover:opacity-100 group-active:translate-x-[260%] group-active:opacity-100" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 z-10 px-6 py-8 text-center text-white transition-all duration-300">
                <h2 className="text-xl font-semibold transition-transform group-hover:scale-105 group-active:scale-105">
                  Проверено нагрузкой
                </h2>
                <p className="mt-3 text-sm">Испытания и контроль качества перед передачей клиенту.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Reveal className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-xl font-semibold sm:text-2xl">Линейки</h2>
          <Link href="/catalog" className="text-sm text-white/70 hover:text-white">
            Открыть каталог →
          </Link>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <SeriesCard
            title="Field Series"
            text="Универсальные тракторы для ежедневных задач и небольших хозяйств."
            meta="80-140 hp"
            imageSrc="/images/field-series.png"
          />
          <SeriesCard
            title="Heavy Duty"
            text="Тяговый класс для тяжелых работ и навесного оборудования."
            meta="150-240 hp"
            imageSrc="/images/heavy-duty.png" // Keep single extension: heavy-duty.png
          />
          <SeriesCard
            title="Pro Cabin"
            text="Комфорт и контроль: шумоизоляция, климат, обзор."
            meta="Premium"
            imageSrc="/images/pro-cabin.png"
          />
        </div>
      </Reveal>

      <Reveal className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold sm:text-2xl">Рекомендуемые модели</h2>
            <p className="mt-2 text-sm text-white/60">
              Два флагманских трактора для самых востребованных задач.
            </p>
          </div>
          <Link
            href="/catalog"
            className="inline-flex min-h-11 items-center rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white ring-1 ring-white/15 hover:bg-white/15 active:bg-white/20"
          >
            Все модели
          </Link>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {featured.map((m) => (
            <ModelCard key={m.slug} model={m} />
          ))}
        </div>
      </Reveal>

      <Reveal className="mx-auto max-w-6xl px-4 pb-14 sm:px-6">
        <div className="rounded-3xl bg-white/5 p-8 text-center ring-1 ring-white/10 md:p-10">
          <h3 className="text-lg font-semibold sm:text-xl">Нужна помощь с выбором?</h3>
          <p className="mt-2 text-sm text-white/70">
            Соберите комплектацию в конфигураторе и запросите КП. Цена — по запросу.
          </p>

          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/configurator"
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-black hover:bg-white/90 active:bg-white/80"
            >
              Открыть конфигуратор
            </Link>
            <Link
              href="/catalog"
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-white/10 px-6 py-3 text-sm font-semibold text-white ring-1 ring-white/15 hover:bg-white/15 active:bg-white/20"
            >
              В каталог
            </Link>
          </div>
        </div>
      </Reveal>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="overflow-hidden rounded-3xl bg-white/5 ring-1 ring-white/10 backdrop-blur">
          <div className="grid gap-0 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div className="relative h-[420px] w-full overflow-hidden rounded-3xl bg-white/5 p-6 ring-1 ring-white/10 md:h-[460px]">
                <div className="relative h-full w-full overflow-hidden rounded-2xl bg-black/20 ring-1 ring-white/10">
                  <img
                    src="/images/map.png"
                    alt=""
                    className="pointer-events-none absolute inset-0 h-full w-full object-contain scale-115 opacity-90 brightness-110 contrast-125 [filter:drop-shadow(0_8px_30px_rgba(0,0,0,0.45))]"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_45%_45%,rgba(255,255,255,0.10),transparent_60%)]" />
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_45%,rgba(0,0,0,0.55)_100%)]" />

                  <div className="absolute inset-0 z-10">
                    {mapPoints.map((p) => (
                      <div
                        key={p.id}
                        style={{ left: `${p.x}%`, top: `${p.y}%` }}
                        className="absolute -translate-x-1/2 -translate-y-1/2"
                      >
                        <span className="absolute h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(255,0,0,0.8)]" />
                        {p.pulse && (
                          <span className="absolute h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-500/30 animate-ping" />
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="absolute left-4 top-4 z-20 rounded-full bg-black/40 px-3 py-1 text-xs text-white/90 ring-1 ring-white/10">
                    120+ сервисных точек
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="h-full p-6 md:p-8">
                <h3 className="text-xl font-semibold sm:text-2xl">География и сервисная сеть</h3>
                <p className="mt-3 text-sm text-white/70 sm:text-base">
                  Дилеры, сервис и запчасти — рядом с вашей техникой.
                </p>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl bg-white/5 p-5 ring-1 ring-white/10 transition-transform duration-300 hover:-translate-y-1">
                    <div className="text-2xl font-semibold">120+</div>
                    <div className="mt-2 text-sm text-white/65">Сервисных точек</div>
                  </div>
                  <div className="rounded-2xl bg-white/5 p-5 ring-1 ring-white/10 transition-transform duration-300 hover:-translate-y-1">
                    <div className="text-2xl font-semibold">48 ч</div>
                    <div className="mt-2 text-sm text-white/65">Средняя логистика</div>
                  </div>
                  <div className="rounded-2xl bg-white/5 p-5 ring-1 ring-white/10 transition-transform duration-300 hover:-translate-y-1">
                    <div className="text-2xl font-semibold">24/7</div>
                    <div className="mt-2 text-sm text-white/65">Поддержка и консультации</div>
                  </div>
                  <div className="rounded-2xl bg-white/5 p-5 ring-1 ring-white/10 transition-transform duration-300 hover:-translate-y-1">
                    <div className="text-2xl font-semibold">12</div>
                    <div className="mt-2 text-sm text-white/65">Региональных хабов</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-transparent">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-10 text-sm text-white/60 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>{"\u00A9"} {new Date().getFullYear()} Tractor Plant</div>
          <div className="flex gap-4">
            <Link href="/catalog" className="hover:text-white">
              Каталог
            </Link>
            <Link href="/configurator" className="hover:text-white">
              Конфигуратор
            </Link>
            <Link href="/contacts" className="hover:text-white">
              Контакты
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl bg-white/5 p-5 ring-1 ring-white/10">
      <div className="text-xl font-semibold">{value}</div>
      <div className="mt-2 text-sm text-white/60">{label}</div>
    </div>
  );
}

function Feature({ title, text }: { title: string; text: string }) {
  const reduceMotion = useReducedMotion() ?? false;

  return (
    <motion.div
      whileHover={reduceMotion ? undefined : { y: -3 }}
      whileTap={{ scale: 0.99 }}
      transition={{ duration: 0.25, ease: [0.21, 0.98, 0.23, 0.99] }}
      className="
        group relative overflow-hidden rounded-3xl bg-white/[0.03] p-6
        ring-1 ring-white/10 backdrop-blur-[2px]
      "
    >
      <div
        className="
          pointer-events-none absolute -inset-24 opacity-0 transition-opacity duration-300
          bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.12),transparent_55%)]
          group-hover:opacity-100
        "
      />

      <div className="text-sm font-semibold">{title}</div>
      <p className="mt-3 text-sm text-white/70">{text}</p>
    </motion.div>
  );
}

function SeriesCard({
  title,
  text,
  meta,
  imageSrc,
}: {
  title: string;
  text: string;
  meta: string;
  imageSrc: string;
}) {
  const reduceMotion = useReducedMotion() ?? false;

  return (
    <motion.div
      whileHover={reduceMotion ? undefined : { y: -3 }}
      whileTap={{ scale: 0.99 }}
      transition={{ duration: 0.25, ease: [0.21, 0.98, 0.23, 0.99] }}
      className="
        group relative overflow-hidden rounded-2xl bg-white/5 p-6
        ring-1 ring-white/10
      "
    >
      <div className="pointer-events-none absolute inset-0 z-0">
        <Image
          src={imageSrc}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover opacity-0 scale-100 transition-all duration-700 ease-out group-hover:opacity-100 group-hover:scale-105"
        />
      </div>

      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-black/70 via-black/40 to-transparent opacity-0 transition-all duration-700 ease-out group-hover:opacity-100" />

      <div
        className="
          pointer-events-none absolute -inset-24 z-10 opacity-0 transition-opacity duration-300
          bg-[radial-gradient(circle_at_25%_15%,rgba(255,255,255,0.10),transparent_55%)]
          group-hover:opacity-100
        "
      />

      <div className="relative z-20">
        <div className="text-lg font-semibold">{title}</div>
        <p className="mt-3 text-sm text-white/70">{text}</p>
        <div className="mt-3 text-xs text-white/60">{meta}</div>
      </div>
    </motion.div>
  );
}

function SlideShow({
  images,
  alt,
  reduceMotion = false,
}: {
  images: string[];
  alt: string;
  reduceMotion?: boolean;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1 || reduceMotion) return;

    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [images.length, reduceMotion]);

  return (
    <div className="relative h-full w-full">
      {images.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className={`object-cover transition-[opacity,transform] duration-700 ${
            i === index
              ? "translate-y-0 opacity-80"
              : reduceMotion
                ? "translate-y-0 opacity-0"
                : "translate-y-[6px] opacity-0"
          }`}
          style={
            i === index && !reduceMotion ? { animation: "tpKenBurns 7s linear forwards" } : undefined
          }
          loading="lazy"
        />
      ))}

      {!reduceMotion && (
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-20 h-[2px] bg-white/15">
          <div
            key={index}
            className="h-full bg-white/50"
            style={{ animation: "tpSlideProgress 3000ms linear forwards" }}
          />
        </div>
      )}

      <style jsx>{`
        @keyframes tpKenBurns {
          from {
            transform: scale(1);
          }
          to {
            transform: scale(1.06);
          }
        }

        @keyframes tpSlideProgress {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}














