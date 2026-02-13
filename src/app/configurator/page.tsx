"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { models } from "@/data/models";

type SeriesFilter = "all" | "Field" | "Heavy" | "Pro";

const seriesOptions: ReadonlyArray<{ value: SeriesFilter; label: string }> = [
  { value: "all", label: "Все" },
  { value: "Field", label: "Field Series" },
  { value: "Heavy", label: "Heavy Duty" },
  { value: "Pro", label: "Pro Cabin" },
];

const hpBounds = models.reduce(
  (acc, model) => ({
    min: Math.min(acc.min, model.hp),
    max: Math.max(acc.max, model.hp),
  }),
  { min: Number.POSITIVE_INFINITY, max: Number.NEGATIVE_INFINITY },
);

const minHp = Number.isFinite(hpBounds.min) ? hpBounds.min : 0;
const maxHp = Number.isFinite(hpBounds.max) ? hpBounds.max : 300;

export default function ConfiguratorPage() {
  const [series, setSeries] = useState<SeriesFilter>("all");
  const [hpLimit, setHpLimit] = useState<number>(maxHp);
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [selectedSlug, setSelectedSlug] = useState<string>(models[0]?.slug ?? "");
  const [animatedHp, setAnimatedHp] = useState<number>(models[0]?.hp ?? 0);
  const [imageMode, setImageMode] = useState<"primary" | "fallback" | "none">("primary");

  const hpRafRef = useRef<number | null>(null);
  const prevHpRef = useRef<number>(models[0]?.hp ?? 0);

  const filteredModels = useMemo(() => {
    return models.filter((m) => {
      const seriesMatch = series === "all" ? true : m.series === series;
      const hpMatch = m.hp <= hpLimit;
      return seriesMatch && hpMatch;
    });
  }, [series, hpLimit]);

  const selectedModel = useMemo(() => {
    return (
      models.find((m) => m.slug === selectedSlug) ??
      filteredModels[0] ??
      models[0]
    );
  }, [filteredModels, selectedSlug]);

  useEffect(() => {
    if (!selectedModel) return;
    const frame = requestAnimationFrame(() => {
      setImageMode("primary");
    });

    return () => cancelAnimationFrame(frame);
  }, [selectedModel]);

  useEffect(() => {
    if (!selectedModel) return;

    const target = selectedModel.hp;
    const start = prevHpRef.current;
    if (start === target) {
      prevHpRef.current = target;
      return;
    }

    const duration = 650;
    const startAt = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - startAt) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const nextValue = Math.round(start + (target - start) * eased);
      setAnimatedHp(nextValue);

      if (progress < 1) {
        hpRafRef.current = requestAnimationFrame(tick);
      } else {
        prevHpRef.current = target;
        hpRafRef.current = null;
      }
    };

    if (hpRafRef.current !== null) cancelAnimationFrame(hpRafRef.current);
    hpRafRef.current = requestAnimationFrame(tick);

    return () => {
      if (hpRafRef.current !== null) {
        cancelAnimationFrame(hpRafRef.current);
        hpRafRef.current = null;
      }
    };
  }, [selectedModel]);

  useEffect(() => {
    if (!selectedModel) return;
    const stillVisible = filteredModels.some((m) => m.slug === selectedModel.slug);
    if (!stillVisible && filteredModels.length > 0) {
      const frame = requestAnimationFrame(() => {
        setSelectedSlug(filteredModels[0].slug);
      });
      return () => cancelAnimationFrame(frame);
    }
  }, [filteredModels, selectedModel]);

  const previewPrimarySrc = selectedModel?.images?.hero || `/images/models/${selectedModel?.slug}.png`;
  const previewFallbackSrc = `/images/models/${selectedModel?.slug}.png`;
  const previewSrc = imageMode === "fallback" ? previewFallbackSrc : previewPrimarySrc;
  const showImage = imageMode !== "none";

  const handlePreviewError = () => {
    if (imageMode === "primary" && previewPrimarySrc !== previewFallbackSrc) {
      setImageMode("fallback");
      return;
    }
    setImageMode("none");
  };

  const resetFilters = () => {
    setSeries("all");
    setHpLimit(maxHp);
    setOnlyAvailable(false);
  };

  return (
    <main className="min-h-screen bg-transparent text-white">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
        <h1 className="text-2xl font-semibold sm:text-4xl">Конфигуратор трактора</h1>
        <p className="mt-3 max-w-3xl text-base text-white/70 sm:text-lg">
          Выберите серию и мощность, затем настройте подходящую модель.
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-12">
          <section className="lg:col-span-7">
            <div className="relative h-[440px] overflow-hidden rounded-3xl bg-white/5 ring-1 ring-white/10 sm:h-[500px]">
              {showImage ? (
                <Image
                  src={previewSrc}
                  alt={selectedModel?.name ?? "Трактор"}
                  fill
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="object-cover"
                  onError={handlePreviewError}
                  priority
                />
              ) : (
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_20%,rgba(34,211,238,0.18),transparent_55%),linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))]" />
              )}

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 z-20 p-6 sm:p-8">
                <div className="text-xs uppercase tracking-[0.2em] text-white/65">
                  {selectedModel?.series ?? "Серия"}
                </div>
                <h2 className="mt-2 text-2xl font-semibold sm:text-3xl">{selectedModel?.name ?? "Модель"}</h2>
                <p className="mt-2 max-w-2xl text-sm text-white/75 sm:text-base">
                  {selectedModel?.shortDescription ?? "Выберите модель из списка ниже."}
                </p>
                <div className="mt-4 text-4xl font-semibold leading-none sm:text-5xl">
                  {animatedHp}
                  <span className="ml-2 text-base font-medium text-white/70 sm:text-lg">л.с.</span>
                </div>
              </div>
            </div>
          </section>

          <aside className="lg:col-span-5">
            <div className="rounded-3xl bg-white/5 p-6 ring-1 ring-white/10 sm:p-7">
              <h3 className="text-lg font-semibold sm:text-xl">Настройки</h3>

              <div className="mt-5">
                <div className="text-sm text-white/70">Серия</div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {seriesOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setSeries(option.value)}
                      className={`inline-flex min-h-10 items-center rounded-full px-4 py-2 text-sm ring-1 transition ${
                        series === option.value
                          ? "bg-white text-black ring-white"
                          : "bg-white/10 text-white ring-white/15 hover:bg-white/15"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <div className="flex items-center justify-between text-sm text-white/70">
                  <span>Мощность</span>
                  <span>до {hpLimit} hp</span>
                </div>
                <input
                  type="range"
                  min={minHp}
                  max={maxHp}
                  step={5}
                  value={hpLimit}
                  onChange={(e) => setHpLimit(Number(e.target.value))}
                  className="hpRange mt-3 h-2 w-full cursor-pointer appearance-none rounded-full bg-white/15"
                />
                <div className="mt-2 flex justify-between text-xs text-white/45">
                  <span>{minHp} hp</span>
                  <span>{maxHp} hp</span>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between rounded-2xl bg-white/[0.04] px-4 py-3 ring-1 ring-white/10">
                <span className="text-sm text-white/80">Только доступные</span>
                <button
                  type="button"
                  onClick={() => setOnlyAvailable((v) => !v)}
                  aria-pressed={onlyAvailable}
                  className={`relative h-7 w-12 rounded-full transition ${
                    onlyAvailable ? "bg-cyan-400/80" : "bg-white/20"
                  }`}
                >
                  <span
                    className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${
                      onlyAvailable ? "left-6" : "left-1"
                    }`}
                  />
                </button>
              </div>

              <button
                type="button"
                onClick={resetFilters}
                className="mt-5 inline-flex min-h-11 w-full items-center justify-center rounded-full bg-white/10 px-5 py-3 text-sm font-semibold text-white ring-1 ring-white/15 hover:bg-white/15"
              >
                Сбросить фильтры
              </button>

              <div className="mt-6 rounded-2xl bg-white/[0.04] px-4 py-3 text-sm text-white/70 ring-1 ring-white/10">
                Подходящих моделей: <span className="font-semibold text-white">{filteredModels.length}</span>
              </div>
            </div>
          </aside>
        </div>

        <section className="mt-8">
          <h3 className="text-lg font-semibold sm:text-xl">Доступные модели</h3>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {filteredModels.map((m) => {
              const selected = selectedModel?.slug === m.slug;

              return (
                <motion.button
                  key={m.slug}
                  type="button"
                  onClick={() => setSelectedSlug(m.slug)}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.99 }}
                  transition={{ duration: 0.25, ease: [0.21, 0.98, 0.23, 0.99] }}
                  className={`group transform-gpu rounded-3xl bg-white/5 p-5 text-left ring-1 transition-all duration-300 sm:p-6 ${
                    selected
                      ? "scale-[1.02] ring-cyan-400/30 shadow-[0_0_40px_rgba(34,211,238,0.22)]"
                      : "ring-white/10 hover:bg-white/10 hover:ring-white/20"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-lg font-semibold sm:text-xl">{m.name}</div>
                      <div className="mt-1 text-xs text-white/60">{m.series}</div>
                    </div>
                    <div className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/80 ring-1 ring-white/15">
                      {m.hp} hp
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-white/70">{m.shortDescription}</p>
                </motion.button>
              );
            })}
          </div>
        </section>

        <div className="mt-10 rounded-3xl bg-white/5 p-5 ring-1 ring-white/10 sm:p-6">
          <h2 className="text-xl font-semibold">Выбранный трактор</h2>
          <div className="mt-4 text-sm text-white/70">
            <div>
              <strong>Модель:</strong> {selectedModel?.name}
            </div>
            <div className="mt-2">
              <strong>Мощность:</strong> {animatedHp} л.с.
            </div>
            <div className="mt-2">
              <strong>Гарантия:</strong> 24 месяца
            </div>
          </div>

          <button className="mt-6 inline-flex min-h-11 w-full items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-black hover:bg-white/90 active:bg-white/80">
            Запросить КП
          </button>
        </div>
      </div>
    </main>
  );
}
