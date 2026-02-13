import Link from "next/link";

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

const dealerStats = [
  { value: "120+", label: "Сервисных точек" },
  { value: "12", label: "Региональных хабов" },
  { value: "48 ч", label: "Средняя логистика" },
  { value: "24/7", label: "Поддержка и консультации" },
  { value: "300+", label: "Инженеров на выезде" },
  { value: "95%", label: "Запчастей в наличии" },
];

const dealers = [
  {
    name: "ТехноТрактор Север",
    city: "Санкт-Петербург, СЗФО",
    phone: "+7 (812) 555-10-20",
    email: "nw@dealer.demo",
    badges: ["Сервис", "Запчасти", "Продажи"],
  },
  {
    name: "АгроПоток Центр",
    city: "Москва, ЦФО",
    phone: "+7 (495) 555-11-30",
    email: "center@dealer.demo",
    badges: ["Сервис", "Продажи"],
  },
  {
    name: "Волга Маш Сервис",
    city: "Казань, ПФО",
    phone: "+7 (843) 555-12-40",
    email: "volga@dealer.demo",
    badges: ["Запчасти", "Сервис"],
  },
  {
    name: "Урал Трактор Профи",
    city: "Екатеринбург, УрФО",
    phone: "+7 (343) 555-13-50",
    email: "ural@dealer.demo",
    badges: ["Сервис", "Запчасти", "Продажи"],
  },
  {
    name: "Сибирь Агро Дилер",
    city: "Новосибирск, СФО",
    phone: "+7 (383) 555-14-60",
    email: "siberia@dealer.demo",
    badges: ["Продажи", "Сервис"],
  },
  {
    name: "Восток Маш Хаб",
    city: "Хабаровск, ДФО",
    phone: "+7 (4212) 555-15-70",
    email: "east@dealer.demo",
    badges: ["Запчасти", "Сервис", "Продажи"],
  },
  {
    name: "Юг Трактор Лайн",
    city: "Краснодар, ЮФО",
    phone: "+7 (861) 555-16-80",
    email: "south@dealer.demo",
    badges: ["Продажи", "Запчасти"],
  },
  {
    name: "Поволжье Трак Сервис",
    city: "Самара, ПФО",
    phone: "+7 (846) 555-17-90",
    email: "samara@dealer.demo",
    badges: ["Сервис", "Запчасти"],
  },
];

export default function DealersPage() {
  return (
    <main className="min-h-screen bg-transparent text-white">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <section className="rounded-3xl bg-white/5 p-6 ring-1 ring-white/10 backdrop-blur-[2px] sm:p-8">
          <div className="text-sm text-white/60">Tractor Plant • Dealer Network</div>
          <h1 className="mt-3 text-2xl font-semibold tracking-tight sm:text-4xl">Дилеры и сервисная сеть</h1>
          <p className="mt-3 max-w-3xl text-sm text-white/70 sm:text-base">
            Дилеры, сервис и запасные части рядом с вашей техникой. Поддержка по регионам, быстрая логистика и
            инженерные выезды без простоев в сезон.
          </p>
        </section>

        <section className="mt-6 grid gap-4 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="relative h-[420px] w-full overflow-hidden rounded-3xl bg-white/5 p-6 ring-1 ring-white/10 md:h-[460px]">
              <div className="relative h-full w-full overflow-hidden rounded-2xl bg-black/20 ring-1 ring-white/10">
                <img
                  src="/images/map.png"
                  alt=""
                  className="pointer-events-none absolute inset-0 h-full w-full scale-115 object-contain opacity-90 brightness-110 contrast-125 [filter:drop-shadow(0_8px_30px_rgba(0,0,0,0.45))]"
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
                        <span className="absolute h-6 w-6 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full bg-red-500/30" />
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

          <div className="grid gap-3 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-2">
            {dealerStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl bg-white/5 p-5 ring-1 ring-white/10 transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="text-2xl font-semibold">{stat.value}</div>
                <div className="mt-2 text-sm text-white/65">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-3xl bg-white/5 p-6 ring-1 ring-white/10 backdrop-blur-[2px] sm:p-8">
          <h2 className="text-xl font-semibold sm:text-2xl">Найти дилера</h2>
          <p className="mt-2 text-sm text-white/65">Выберите регион и город, чтобы подобрать ближайший дилерский центр.</p>

          <div className="mt-5 grid gap-3 md:grid-cols-2">
            <select className="w-full rounded-2xl bg-white/10 px-4 py-3 text-sm text-white ring-1 ring-white/15 outline-none focus:ring-white/30">
              <option className="bg-slate-900">Все регионы</option>
              <option className="bg-slate-900">ЦФО</option>
              <option className="bg-slate-900">СЗФО</option>
              <option className="bg-slate-900">ПФО</option>
              <option className="bg-slate-900">УрФО</option>
              <option className="bg-slate-900">СФО</option>
              <option className="bg-slate-900">ДФО</option>
            </select>
            <input
              type="text"
              placeholder="Поиск по городу"
              className="w-full rounded-2xl bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/50 ring-1 ring-white/15 outline-none focus:ring-white/30"
            />
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-2">
            {dealers.map((dealer) => (
              <article key={dealer.name} className="rounded-2xl bg-white/[0.04] p-5 ring-1 ring-white/10">
                <h3 className="text-base font-semibold">{dealer.name}</h3>
                <p className="mt-1 text-sm text-white/65">{dealer.city}</p>
                <div className="mt-3 space-y-1 text-sm text-white/80">
                  <div>{dealer.phone}</div>
                  <div>{dealer.email}</div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {dealer.badges.map((badge) => (
                    <span key={`${dealer.name}-${badge}`} className="rounded-full bg-white/10 px-3 py-1 text-xs ring-1 ring-white/15">
                      {badge}
                    </span>
                  ))}
                </div>
                <button
                  type="button"
                  className="mt-4 inline-flex min-h-10 items-center justify-center rounded-full bg-white px-4 py-2 text-sm font-semibold text-black hover:bg-white/90 active:bg-white/80"
                >
                  Оставить заявку
                </button>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-3xl bg-white/5 p-8 text-center ring-1 ring-white/10 backdrop-blur-[2px]">
          <h3 className="text-lg font-semibold sm:text-xl">Нужна помощь с выбором дилера?</h3>
          <p className="mt-2 text-sm text-white/70">
            Подскажем ближайший сервисный центр и сформируем быстрый маршрут по поставке и обслуживанию техники.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/contacts"
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-black hover:bg-white/90 active:bg-white/80"
            >
              Связаться
            </Link>
            <Link
              href="/catalog"
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-white/10 px-6 py-3 text-sm font-semibold text-white ring-1 ring-white/15 hover:bg-white/15 active:bg-white/20"
            >
              Открыть каталог
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
