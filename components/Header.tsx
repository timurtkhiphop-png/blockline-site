"use client";

import { useEffect, useState } from "react";

import { nav as NAV } from "@/lib/siteCopy";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed left-0 right-0 top-0 z-50 flex h-16 items-center justify-between px-8 transition-all duration-300 xl:px-12 ${
          scrolled
            ? "border-b border-[rgba(0,212,184,0.1)] bg-[rgba(2,12,12,0.85)] backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <a href="#top" className="flex w-32 flex-shrink-0 items-center gap-2.5">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00d4b8] opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#00d4b8]" />
          </span>
          <span
            style={{ fontFamily: "var(--font-display), sans-serif" }}
            className="text-[14px] font-bold tracking-[-0.02em] text-[#00d4b8]"
          >
            8:20 lab
          </span>
        </a>

        <nav
          className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 md:flex"
          aria-label="Основная навигация"
        >
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="relative text-[10px] font-medium uppercase tracking-[0.18em] text-[#6b8e8a] transition-colors duration-200 after:absolute after:bottom-[-4px] after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-[#00d4b8] after:transition-transform after:duration-200 hover:text-white hover:after:scale-x-100"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex w-32 flex-shrink-0 items-center justify-end gap-3">
          <a
            href="#contact"
            className="hidden h-9 items-center justify-center rounded-sm bg-[#00d4b8] px-5 text-[11px] font-medium uppercase tracking-[0.08em] text-[#020c0c] transition-all duration-200 hover:-translate-y-px hover:opacity-85 md:inline-flex"
          >
            Заявка
          </a>
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="flex flex-col gap-[5px] p-1 md:hidden"
            aria-label="Меню"
          >
            <span className="block h-px w-5 bg-white" />
            <span className="block h-px w-5 bg-white" />
            <span className="block h-px w-3 bg-white" />
          </button>
        </div>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-[200] flex flex-col items-center justify-center gap-8 bg-[#020c0c]">
          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            className="absolute right-6 top-5 text-3xl text-[#6b8e8a]"
            aria-label="Закрыть меню"
          >
            ×
          </button>
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              style={{ fontFamily: "var(--font-display), sans-serif" }}
              className="text-[28px] font-bold tracking-[-0.02em] text-[#00d4b8] transition-colors duration-200 hover:text-white"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="mt-4 inline-flex h-12 items-center justify-center rounded-sm bg-[#00d4b8] px-8 text-[13px] font-medium text-[#020c0c]"
          >
            Оставить заявку
          </a>
        </div>
      )}
    </>
  );
}
