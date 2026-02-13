"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Bell, Headphones, LayoutGrid, MapPin, Shield, SlidersHorizontal, User } from "lucide-react";
import { useMemo, useState } from "react";
import { notificationsMock } from "@/data/notifications";

type NavItem = {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
};

const navItems: NavItem[] = [
  { href: "/catalog", label: "Каталог", icon: LayoutGrid },
  { href: "/configurator", label: "Конфигуратор", icon: SlidersHorizontal },
  { href: "/dealers", label: "Дилеры", icon: MapPin },
  { href: "/contacts", label: "Поддержка", icon: Headphones },
  { href: "/technology", label: "О компании", icon: Shield },
];

export default function Navbar() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [hovered, setHovered] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const hasUnreadNotifications = notificationsMock.some((item) => item.unread);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 40);
  });

  const navState = useMemo(
    () => ({
      height: isScrolled ? 64 : 72,
      backgroundColor: isScrolled ? "rgba(255,255,255,0.10)" : "rgba(255,255,255,0.05)",
      backdropFilter: isScrolled ? "blur(26px)" : "blur(20px)",
    }),
    [isScrolled],
  );

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <motion.div
      initial={{ y: -40, opacity: 0 }}
      animate={{ ...navState, y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="pointer-events-none fixed left-1/2 top-4 z-[90] flex w-[92%] max-w-[1200px] -translate-x-1/2 items-center overflow-x-hidden rounded-2xl ring-1 ring-white/10 shadow-[0_15px_50px_rgba(0,0,0,0.35)]"
    >
      <div className="flex w-full items-center justify-between gap-1 px-4 sm:gap-0 sm:px-6">
        <Link
          href="/"
          className="pointer-events-auto shrink-0 transition-transform duration-300 hover:scale-105 max-[479px]:hidden"
        >
          <img src="/brand/logo.png" alt="" className="h-16 w-auto" />
        </Link>

        <div className="flex min-w-0 flex-1 items-center justify-center gap-1 sm:gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);

            return (
              <div
                key={`${item.href}-${item.label}`}
                className="relative"
                onMouseEnter={() => setHovered(item.label)}
                onMouseLeave={() => setHovered(null)}
              >
                <Link
                  href={item.href}
                  className={`pointer-events-auto relative flex h-10 w-10 items-center justify-center rounded-full text-white transition-all duration-300 backdrop-blur-md ${
                    active
                      ? "bg-white/20 ring-1 ring-white/25 shadow-[inset_0_0_12px_rgba(255,255,255,0.15)]"
                      : "bg-white/5 ring-1 ring-white/10 hover:scale-110 hover:bg-white/10 hover:shadow-[0_0_15px_rgba(255,255,255,0.15)]"
                  }`}
                >
                  <Icon className="h-[18px] w-[18px]" />
                </Link>

                <AnimatePresence>
                  {hovered === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.2 }}
                      className="pointer-events-none absolute left-1/2 top-[calc(100%+8px)] z-[100] hidden -translate-x-1/2 whitespace-nowrap rounded-md bg-black/70 px-3 py-1 text-xs text-white backdrop-blur sm:block"
                    >
                      {item.label}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
          <Link
            href="/notifications"
            className="pointer-events-auto relative flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-white ring-1 ring-white/10 backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-white/10 hover:shadow-[0_0_15px_rgba(255,255,255,0.15)]"
          >
            <Bell className="h-[18px] w-[18px]" />
            {hasUnreadNotifications && (
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
            )}
          </Link>

          <Link
            href="/login"
            className="pointer-events-auto inline-flex h-10 items-center gap-2 rounded-full bg-white px-4 text-black shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all duration-300 hover:scale-105 hover:bg-white/90 active:bg-white/80 max-[479px]:w-10 max-[479px]:justify-center max-[479px]:px-0"
          >
            <User className="h-4 w-4" />
            <span className="text-sm font-medium max-[479px]:hidden">Вход</span>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
