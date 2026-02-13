import Link from "next/link";

export default function ContactsPage() {
  return (
    <main className="min-h-screen bg-transparent text-white">
      <div className="mx-auto max-w-6xl px-6 py-10">
        {/* top */}
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="text-sm text-white/60">Tractor Plant • Premium Machinery</div>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight">Контакты</h1>
          </div>

          <Link
            href="/"
            className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white ring-1 ring-white/15 hover:bg-white/15"
          >
            На главную
          </Link>
        </div>

        <p className="mt-4 max-w-2xl text-white/70">
          Учебный проект: здесь мы тестируем верстку и навигацию. Данные выдуманные.
        </p>

        {/* cards */}
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <Card title="Телефон">
            <div className="text-white/90">+7 (800) 555-35-35</div>
            <div className="mt-1 text-sm text-white/60">Пн–Пт, 09:00–18:00</div>
          </Card>

          <Card title="Email">
            <div className="text-white/90">sales@tractorplant.demo</div>
            <div className="mt-1 text-sm text-white/60">Ответим в течение 1 рабочего дня</div>
          </Card>

          <Card title="Адрес">
            <div className="text-white/90">г. Тракторовск, ул. Индустриальная, 7</div>
            <div className="mt-1 text-sm text-white/60">Шоурум + сервисный центр</div>
          </Card>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <Card title="График работы">
            <ul className="space-y-2 text-sm text-white/70">
              <li className="flex justify-between gap-4">
                <span>Понедельник – Пятница</span>
                <span className="text-white/90">09:00 – 18:00</span>
              </li>
              <li className="flex justify-between gap-4">
                <span>Суббота</span>
                <span className="text-white/90">10:00 – 15:00</span>
              </li>
              <li className="flex justify-between gap-4">
                <span>Воскресенье</span>
                <span className="text-white/90">Выходной</span>
              </li>
            </ul>
          </Card>

          <Card title="Дальше сделаем">
            <div className="text-sm text-white/70">
              Следующий шаг — карта, форма заявки и кнопка &ldquo;заказать звонок&rdquo;.
            </div>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/catalog"
                className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-black hover:bg-white/90 text-center"
              >
                Перейти в каталог
              </Link>

              <Link
                href="/configurator"
                className="rounded-full bg-white/10 px-5 py-3 text-sm font-semibold text-white ring-1 ring-white/15 hover:bg-white/15 text-center"
              >
                Открыть конфигуратор
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-3xl bg-white/[0.03] p-6 ring-1 ring-white/10 backdrop-blur-[2px]">
      <div className="text-sm font-semibold">{title}</div>
      <div className="mt-3">{children}</div>
    </div>
  );
}
