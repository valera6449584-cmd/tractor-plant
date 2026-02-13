import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-transparent text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl items-start justify-center px-4 pb-12 pt-20 sm:px-6 sm:pt-24">
        <div className="w-full max-w-md rounded-3xl bg-white/[0.06] p-6 ring-1 ring-white/15 backdrop-blur-[8px] shadow-[0_20px_60px_rgba(0,0,0,0.35)] sm:p-8">
          <div className="text-sm text-white/60">Tractor Plant • Secure Access</div>
          <h1 className="mt-3 text-2xl font-semibold sm:text-3xl">Вход в Tractor Plant</h1>
          <p className="mt-3 text-sm text-white/70">
            Доступ к конфигуратору, подборкам и сохранённым комплектациям.
          </p>

          <form className="mt-6 space-y-4">
            <label className="block">
              <span className="mb-2 block text-sm text-white/80">Email или Телефон</span>
              <input
                type="text"
                placeholder="name@company.com"
                className="w-full rounded-2xl bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/45 ring-1 ring-white/15 outline-none transition focus:ring-white/35"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm text-white/80">Пароль</span>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full rounded-2xl bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/45 ring-1 ring-white/15 outline-none transition focus:ring-white/35"
              />
            </label>

            <div className="flex items-center justify-between gap-3">
              <label className="inline-flex items-center gap-2 text-sm text-white/75">
                <input type="checkbox" className="h-4 w-4 rounded border-white/20 bg-white/10 text-white" />
                Запомнить меня
              </label>
              <Link href="/login" className="text-sm text-white/70 hover:text-white">
                Забыли пароль?
              </Link>
            </div>

            <button
              type="button"
              className="inline-flex min-h-11 w-full items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-black hover:bg-white/90 active:bg-white/80"
            >
              Войти
            </button>
          </form>

          <div className="my-5 flex items-center gap-3">
            <div className="h-px flex-1 bg-white/15" />
            <span className="text-xs uppercase tracking-wide text-white/50">или</span>
            <div className="h-px flex-1 bg-white/15" />
          </div>

          <button
            type="button"
            className="inline-flex min-h-11 w-full items-center justify-center rounded-full bg-white/10 px-6 py-3 text-sm font-semibold text-white ring-1 ring-white/15 hover:bg-white/15 active:bg-white/20"
          >
            Продолжить с Google
          </button>

          <div className="mt-6 text-center text-sm text-white/70">
            Нет аккаунта?{" "}
            <Link href="/login" className="font-semibold text-white hover:text-white/85">
              Запросить доступ
            </Link>
          </div>

          <p className="mt-4 text-center text-xs text-white/50">
            Это демонстрационный макет. Авторизация не подключена.
          </p>
        </div>
      </div>
    </main>
  );
}
