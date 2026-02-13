"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { TractorModel } from "@/data/models";
import { motion } from "framer-motion";

const FALLBACK = "/tractors/placeholder.png";

export function ModelCard({ model }: { model: TractorModel }) {
  const slug = String(model.slug ?? "").trim();
  const href = slug ? `/catalog/${encodeURIComponent(slug)}` : "/catalog";
  const [imageSrc, setImageSrc] = useState(model.images.hero || FALLBACK);
  const formatRub = (v: number) => `${new Intl.NumberFormat("ru-RU").format(v)} RUB`;

  return (
    <Link href={href} className="group block focus-visible:outline-none">
      <motion.article
        whileHover={{ y: -4 }}
        whileTap={{ scale: 0.99 }}
        transition={{ duration: 0.25, ease: [0.21, 0.98, 0.23, 0.99] }}
        className="
          relative overflow-hidden rounded-3xl
          bg-white/5 ring-1 ring-white/10
          transition-colors hover:bg-white/10 active:bg-white/10
        "
      >
        <div
          className="
            pointer-events-none absolute -inset-24 z-0
            opacity-0 transition-opacity duration-300
            bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.10),transparent_55%)]
            group-hover:opacity-100 group-active:opacity-100
          "
        />

        <div className="relative z-10 h-44 w-full overflow-hidden sm:h-48">
          <Image
            src={imageSrc}
            alt={model.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px"
            className="
              object-cover opacity-90
              transition duration-500
              group-hover:scale-[1.04]
            "
            onError={() => {
              if (imageSrc === FALLBACK) return;
              setImageSrc(FALLBACK);
            }}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

          <div className="absolute left-4 top-4 rounded-full bg-white/10 px-3 py-1 text-xs text-white/80 ring-1 ring-white/15">
            {model.series} • {model.hp} hp
          </div>
        </div>

        <div className="relative z-10 p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-sm text-white/60">{model.purpose}</div>
              <h3 className="mt-1 text-base font-semibold tracking-tight sm:text-lg">{model.name}</h3>
            </div>

            <div className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/70 ring-1 ring-white/10">
              {model.price?.note ? `${model.price.note} ` : ""}
              {model.price ? formatRub(model.price.from) : "Цена по запросу"}
            </div>
          </div>

          <p className="mt-3 text-sm text-white/70">{model.shortDescription}</p>

          <div className="mt-5 grid grid-cols-2 gap-3 text-xs text-white/60">
            <div className="rounded-2xl bg-white/5 p-3 ring-1 ring-white/10">
              Двигатель
              <div className="mt-1 text-white/80">{model.specs.engine}</div>
            </div>
            <div className="rounded-2xl bg-white/5 p-3 ring-1 ring-white/10">
              Трансмиссия
              <div className="mt-1 text-white/80">{model.specs.transmission}</div>
            </div>
          </div>

          <div className="mt-5 text-sm text-white/70 transition-colors group-hover:text-white group-active:text-white">
            Подробнее →
          </div>
        </div>
      </motion.article>
    </Link>
  );
}
