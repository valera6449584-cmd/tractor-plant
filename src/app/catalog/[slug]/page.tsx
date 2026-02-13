"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { models } from "@/data/models";

export default function ModelPage() {
  const params = useParams<{ slug: string }>();
  const slug = decodeURIComponent(String(params.slug ?? ""))
    .trim()
    .toLowerCase();

  const model = models.find((m) => m.slug.trim().toLowerCase() === slug);
  const formatRub = (v: number) => `${new Intl.NumberFormat("ru-RU").format(v)} RUB`;

  if (!model) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-transparent p-6 text-white">
        <div className="w-full max-w-3xl rounded-3xl bg-white/5 p-6 ring-1 ring-white/10">
          <div className="text-xl font-semibold">Модель не найдена</div>
          <div className="mt-3 text-sm text-white/70">
            slug из URL: <span className="text-white/90">{slug || "(пусто)"}</span>
          </div>

          <div className="mt-4 text-sm text-white/70">slug в данных:</div>
          <pre className="mt-2 whitespace-pre-wrap rounded-2xl bg-transparent/40 p-4 text-xs text-white/80 ring-1 ring-white/10">
            {models.map((m) => m.slug).join("\n")}
          </pre>

          <Link
            href="/catalog"
            className="mt-4 inline-flex min-h-11 items-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-black"
          >
            В каталог
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-transparent text-white">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/catalog" className="inline-flex min-h-11 items-center text-sm text-white/70 hover:text-white">
            ← Назад в каталог
          </Link>

          <div className="inline-flex min-h-9 items-center rounded-full bg-white/10 px-3 py-1 text-xs text-white/70 ring-1 ring-white/15">
            {model.price?.note ? `${model.price.note} ` : ""}
            {model.price ? formatRub(model.price.from) : "Цена по запросу"}
          </div>
        </div>

        <section className="overflow-hidden rounded-3xl bg-white/5 ring-1 ring-white/10">
          <div className="relative w-full aspect-[4/3] md:aspect-[16/9]">
            <Image
              src={model.images.hero}
              alt={model.name}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 1024px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs text-white/80 ring-1 ring-white/15">
                {model.series} • {model.hp} hp • {model.purpose}
              </div>

              <h1 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl">{model.name}</h1>

              <p className="mt-2 max-w-2xl text-sm text-white/70 md:text-base">{model.shortDescription}</p>
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl bg-white/5 p-5 ring-1 ring-white/10 sm:p-6">
            <div className="text-sm font-semibold">Характеристики</div>

            <dl className="mt-4 space-y-3 text-sm text-white/70">
              <Row label="Двигатель" value={model.specs.engine} />
              <Row label="Трансмиссия" value={model.specs.transmission} />
              <Row label="Крутящий момент" value={model.specs.torque} />
              <Row label="Масса" value={model.specs.weight} />
            </dl>
          </div>

          <div className="rounded-3xl bg-white/5 p-5 ring-1 ring-white/10 sm:p-6">
            <div className="text-sm font-semibold">Комплектации</div>

            <div className="mt-4 space-y-3">
              {model.trims.map((t) => (
                <div key={t.name} className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
                  <div className="text-sm font-semibold">{t.name}</div>
                  <div className="mt-1 text-sm text-white/70">{t.note}</div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/configurator"
                className="inline-flex min-h-11 items-center justify-center rounded-full bg-white px-5 py-3 text-center text-sm font-semibold text-black hover:bg-white/90 active:bg-white/80"
              >
                Конфигурировать
              </Link>

              <Link
                href="/catalog"
                className="inline-flex min-h-11 items-center justify-center rounded-full bg-white/10 px-5 py-3 text-center text-sm font-semibold text-white ring-1 ring-white/15 hover:bg-white/15 active:bg-white/20"
              >
                Назад в каталог
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
      <dt>{label}</dt>
      <dd className="text-white/90">{value}</dd>
    </div>
  );
}
