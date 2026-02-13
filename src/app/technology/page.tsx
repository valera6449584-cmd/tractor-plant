"use client";

import Link from "next/link";
import Reveal from "@/components/Reveal";
import { motion } from "framer-motion";

const techBlocks = [
  {
    id: "drivetrain",
    title: "Тяга и трансмиссия",
    text: "Передаточные числа подобраны под тяжелую работу: стабильная тяга под нагрузкой, предсказуемое ускорение и контроль на низких скоростях.",
    meta: "Control • Torque • Stability",
  },
  {
    id: "cooling",
    title: "Охлаждение и ресурс",
    text: "Тепловой запас и защита узлов рассчитаны на длительные смены. Меньше перегрева - больше ресурса и стабильности в сезоне.",
    meta: "Thermal headroom • Durability",
  },
  {
    id: "chassis",
    title: "Рама и балансировка",
    text: "Жесткость конструкции и развесовка помогают держать курс и тяговый класс, особенно с навесным и при работе в грунте.",
    meta: "Chassis • Balance • Traction",
  },
  {
    id: "cabin",
    title: "Кабина оператора",
    text: "Обзор, шумоизоляция и климат-контроль для концентрации. Комфорт - это тоже производительность.",
    meta: "Comfort • Visibility • Climate",
  },
  {
    id: "hydraulics",
    title: "Гидравлика и навесное",
    text: "Работа с навесным оборудованием без лишних рывков: точность управления и стабильность потока под задачи.",
    meta: "Hydraulics • Implements",
  },
  {
    id: "qa",
    title: "Контроль качества",
    text: "Проверки и испытания на каждом этапе: от сборки до финального контроля, чтобы техника работала, а не стояла.",
    meta: "QA • Testing • Reliability",
  },
] as const;

export default function TechnologyPage() {
  return (
    <main className="min-h-screen bg-transparent text-white">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-sm text-white/70 hover:text-white">
            ← На главную
          </Link>
        </div>

        <Reveal className="mt-10">
          <div className="relative overflow-hidden rounded-3xl bg-white/5 p-8 ring-1 ring-white/10 md:p-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_0%,rgba(120,160,200,0.14),transparent_55%)]" />
            <div className="relative">
              <div className="text-sm text-white/60">Tractor Plant • Engineering</div>

              <h1 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">Технологии, которые держат нагрузку</h1>

              <p className="mt-4 max-w-2xl text-white/70">
                Мы проектируем тракторы так, чтобы они работали сезон за сезоном: стабильная тяга, ресурс узлов,
                комфорт оператора и контроль качества. Никакой &quot;магии&quot; - только инженерия.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/catalog"
                  className="rounded-full bg-white px-6 py-3 text-center text-sm font-semibold text-black hover:bg-white/90"
                >
                  Смотреть модели
                </Link>
                <Link
                  href="/configurator"
                  className="rounded-full bg-white/10 px-6 py-3 text-center text-sm font-semibold text-white ring-1 ring-white/15 hover:bg-white/15"
                >
                  Подобрать комплектацию
                </Link>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal className="mt-6" delay={0.03}>
          <div className="flex flex-wrap gap-2">
            {techBlocks.map((b) => (
              <a
                key={b.id}
                href={`#${b.id}`}
                className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white ring-1 ring-white/15 hover:bg-white/15"
              >
                {b.title}
              </a>
            ))}
          </div>
        </Reveal>

        <Reveal className="mt-10" delay={0.05}>
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold">Ключевые системы</h2>
              <p className="mt-2 text-sm text-white/60">
                Коротко и по делу - что делает Tractor Plant надежным в реальной работе.
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {techBlocks.map((b) => (
              <TechCard key={b.id} id={b.id} title={b.title} text={b.text} meta={b.meta} />
            ))}
          </div>
        </Reveal>

        <Reveal className="mt-10" delay={0.08}>
          <div className="rounded-3xl bg-white/[0.03] p-8 ring-1 ring-white/10 md:p-10">
            <h3 className="text-xl font-semibold">Почему это важно</h3>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <Mini
                value="Меньше простоев"
                text="Стабильная работа узлов и тепловой запас - меньше перегревов и непредвиденных остановок."
              />
              <Mini
                value="Предсказуемая тяга"
                text="Тяговый класс и развесовка дают контроль в грунте и с навесным оборудованием."
              />
              <Mini
                value="Комфорт = результат"
                text="Когда оператор не устает, техника работает точнее и эффективнее весь день."
              />
            </div>
          </div>
        </Reveal>

        <Reveal className="mt-10" delay={0.09}>
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold">Серии и задачи</h2>
              <p className="mt-2 text-sm text-white/60">
                Быстрый ориентир - какая линейка лучше подходит под вашу работу.
              </p>
            </div>
            <Link href="/catalog" className="text-sm text-white/70 hover:text-white">
              Открыть каталог →
            </Link>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <SeriesCompareCard
              title="Field Series"
              meta="80-140 hp"
              bullets={[
                "Ежедневные задачи и небольшие хозяйства",
                "Экономичный режим и простое обслуживание",
                "Универсальность для навесного",
              ]}
              tag="Field"
            />
            <SeriesCompareCard
              title="Heavy Duty"
              meta="150-240 hp"
              bullets={[
                "Тяжелые работы и тяговый класс",
                "Стабильность под высокой нагрузкой",
                "Оптимально для крупного навесного",
              ]}
              tag="Heavy"
            />
            <SeriesCompareCard
              title="Pro Cabin"
              meta="Premium"
              bullets={[
                "Комфорт, обзор, шумоизоляция",
                "Управляемость и контроль в смене",
                "Для тех, кто работает много и долго",
              ]}
              tag="Pro"
            />
          </div>
        </Reveal>

        <Reveal className="mt-10" delay={0.1}>
          <div className="rounded-3xl bg-white/5 p-8 text-center ring-1 ring-white/10 md:p-10">
            <h3 className="text-xl font-semibold">Готовы выбрать модель?</h3>
            <p className="mt-2 text-sm text-white/70">
              Откройте каталог и сравните серии по мощности и назначению.
            </p>

            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/catalog"
                className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-black hover:bg-white/90"
              >
                Открыть каталог
              </Link>
              <Link
                href="/configurator"
                className="rounded-full bg-white/10 px-6 py-3 text-sm font-semibold text-white ring-1 ring-white/15 hover:bg-white/15"
              >
                Конфигуратор
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </main>
  );
}

function TechCard({
  id,
  title,
  text,
  meta,
}: {
  id: string;
  title: string;
  text: string;
  meta: string;
}) {
  return (
    <motion.div
      id={id}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.25, ease: [0.21, 0.98, 0.23, 0.99] }}
      className="group relative h-full overflow-hidden rounded-3xl bg-white/5 p-6 ring-1 ring-white/10"
    >
      <div
        className="
          pointer-events-none absolute -inset-24 opacity-0 transition-opacity duration-300
          bg-[radial-gradient(circle_at_25%_10%,rgba(255,255,255,0.10),transparent_55%)]
          group-hover:opacity-100
        "
      />
      <div className="relative flex h-full flex-col">
        <div className="text-sm font-semibold">{title}</div>
        <p className="mt-3 text-sm text-white/70">{text}</p>
        <div className="mt-4 text-xs text-white/50">{meta}</div>
      </div>
    </motion.div>
  );
}

function Mini({ value, text }: { value: string; text: string }) {
  return (
    <div className="rounded-2xl bg-white/5 p-5 ring-1 ring-white/10">
      <div className="text-sm font-semibold">{value}</div>
      <p className="mt-2 text-sm text-white/70">{text}</p>
    </div>
  );
}

function SeriesCompareCard({
  title,
  meta,
  bullets,
  tag,
}: {
  title: string;
  meta: string;
  bullets: string[];
  tag: "Field" | "Heavy" | "Pro";
}) {
  const href = `/catalog?series=${encodeURIComponent(tag)}`;

  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ duration: 0.25, ease: [0.21, 0.98, 0.23, 0.99] }}
      className="group relative h-full overflow-hidden rounded-3xl bg-white/5 p-6 ring-1 ring-white/10"
    >
      <div
        className="
          pointer-events-none absolute -inset-24 opacity-0 transition-opacity duration-300
          bg-[radial-gradient(circle_at_25%_10%,rgba(255,255,255,0.10),transparent_55%)]
          group-hover:opacity-100
        "
      />

      <div className="relative flex h-full flex-col">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-lg font-semibold">{title}</div>
            <div className="mt-1 text-xs text-white/60">{meta}</div>
          </div>
          <div className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/70 ring-1 ring-white/10">{tag}</div>
        </div>

        <ul className="mt-4 min-h-[124px] space-y-2 text-sm text-white/70">
          {bullets.map((b) => (
            <li key={b} className="flex gap-2">
              <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-white/40" />
              <span>{b}</span>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-col gap-2 md:mt-auto">
          <Link
            href={href}
            className="rounded-full bg-white px-5 py-2.5 text-center text-sm font-semibold text-black hover:bg-white/90"
          >
            Смотреть {tag}
          </Link>
          <Link
            href="/catalog"
            className="rounded-full bg-white/10 px-5 py-2.5 text-center text-sm font-semibold text-white ring-1 ring-white/15 hover:bg-white/15"
          >
            В каталог
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
