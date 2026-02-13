"use client";

import { Suspense } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { models } from "@/data/models";
import { ModelCard } from "@/components/ModelCard";

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

type SeriesValue = (typeof seriesOptions)[number]["value"];
type HpValue = (typeof hpBuckets)[number]["value"];

function isSeriesValue(v: string | null): v is Exclude<SeriesValue, "all"> {
  return v === "Field" || v === "Heavy" || v === "Pro";
}

function isHpValue(v: string | null): v is Exclude<HpValue, "all"> {
  return v === "lte120" || v === "121_170" || v === "gte171";
}

function CatalogContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const spSeries = searchParams.get("series");
  const spHp = searchParams.get("hp");

  const series: SeriesValue = isSeriesValue(spSeries) ? spSeries : "all";
  const hp: HpValue = isHpValue(spHp) ? spHp : "all";

  const pushParams = (next: { series?: SeriesValue; hp?: HpValue }) => {
    const current = new URLSearchParams(searchParams.toString());
    const nextSeries = next.series ?? series;
    const nextHp = next.hp ?? hp;

    if (nextSeries === "all") current.delete("series");
    else current.set("series", nextSeries);

    if (nextHp === "all") current.delete("hp");
    else current.set("hp", nextHp);

    const qs = current.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname);
  };

  const filtered = models.filter((m) => {
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

  return (
    <main className="min-h-screen bg-transparent text-white">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold sm:text-3xl">Каталог</h1>
            <div className="mt-2 text-sm text-white/60">
              Найдено: <span className="text-white/80">{filtered.length}</span>
            </div>
          </div>

          <Link href="/" className="inline-flex min-h-11 items-center text-sm text-white/70 hover:text-white">
            ← На главную
          </Link>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          {seriesOptions.map((o) => (
            <button
              key={o.value}
              onClick={() => {
                pushParams({ series: o.value });
              }}
              className={`inline-flex min-h-11 items-center rounded-full px-4 text-sm ring-1 ring-white/15 transition ${
                series === o.value ? "bg-white text-black" : "bg-white/10 text-white hover:bg-white/15 active:bg-white/20"
              }`}
            >
              {o.label}
            </button>
          ))}
        </div>

        <div className="mt-3 flex flex-wrap gap-3">
          {hpBuckets.map((o) => (
            <button
              key={o.value}
              onClick={() => {
                pushParams({ hp: o.value });
              }}
              className={`inline-flex min-h-11 items-center rounded-full px-4 text-sm ring-1 ring-white/15 transition ${
                hp === o.value ? "bg-white text-black" : "bg-white/10 text-white hover:bg-white/15 active:bg-white/20"
              }`}
            >
              {o.label}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {filtered.map((m) => (
            <ModelCard key={m.slug} model={m} />
          ))}
        </div>
      </div>
    </main>
  );
}

export default function CatalogPage() {
  return (
    <Suspense fallback={<main className="min-h-screen bg-transparent" />}>
      <CatalogContent />
    </Suspense>
  );
}
