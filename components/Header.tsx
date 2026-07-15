"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { nav as NAV } from "@/lib/siteCopy";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>("");
  const [coarse, setCoarse] = useState(false);
  const menuRef = useRef<HTMLElement | null>(null);
  const burgerRef = useRef<HTMLButtonElement | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const q = window.matchMedia("(pointer: coarse)");
    const fn = () => setCoarse(q.matches);
    fn();
    q.addEventListener("change", fn);
    return () => q.removeEventListener("change", fn);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (coarse) return;
    
    // Only scroll spy on home page for hash links
    if (pathname !== "/") {
      setActiveId("");
      return;
    }

    const ids = NAV.map((item) => {
      const parts = item.href.split("#");
      return parts.length > 1 ? parts[1] : null;
    }).filter(Boolean) as string[];

    const pickActive = () => {
      let current = "";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top <= 140) current = id;
      }
      setActiveId(current);
    };
    pickActive();
    window.addEventListener("scroll", pickActive, { passive: true });
    return () => window.removeEventListener("scroll", pickActive);
  }, [coarse, pathname]);

  // Открытое меню: блокировка прокрутки, Escape, удержание фокуса внутри панели
  useEffect(() => {
    if (!menuOpen) return;
    const html = document.documentElement;
    const prevHtmlOverflow = html.style.overflow;
    const prevBodyOverflow = document.body.style.overflow;
    html.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    const panel = menuRef.current;
    const focusables = () =>
      panel
        ? Array.from(panel.querySelectorAll<HTMLElement>("a[href], button:not([disabled])"))
        : [];
    focusables()[0]?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        return;
      }
      if (e.key !== "Tab") return;
      const items = focusables();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement as HTMLElement | null;
      if (e.shiftKey && (active === first || !panel?.contains(active))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      html.style.overflow = prevHtmlOverflow;
      document.body.style.overflow = prevBodyOverflow;
      document.removeEventListener("keydown", onKeyDown);
      burgerRef.current?.focus({ preventScroll: true });
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`${coarse ? "sticky" : "fixed"} left-0 right-0 top-0 z-50 flex h-16 items-center justify-between px-6 transition-all duration-300 md:px-12 xl:px-[48px] ${
          scrolled
            ? "border-b border-[var(--site-border)] bg-[rgba(8,8,8,0.72)] backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <a href="/" className="flex w-32 flex-shrink-0 items-center gap-2.5">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full lab-accent-bg opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full lab-accent-bg" />
          </span>
          <span
            style={{ fontFamily: "var(--font-section-display), sans-serif" }}
            className="text-[18px] font-normal uppercase tracking-[0.06em] lab-accent-text"
          >
            8:20 lab
          </span>
        </a>

        <nav
          className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 lg:flex"
          aria-label="Основная навигация"
        >
          {NAV.map((item) => {
            let active = false;
            if (item.href.startsWith("/#")) {
              const id = item.href.split("#")[1];
              active = pathname === "/" && activeId === id;
            } else if (item.href === "/") {
              active = pathname === "/";
            } else {
              active = pathname.startsWith(item.href);
            }

            return (
              <a
                key={item.href}
                href={item.href}
                style={{ fontFamily: "var(--font-mono)" }}
                className={`text-[11px] uppercase tracking-[0.12em] transition-colors duration-200 ${
                  active
                    ? "lab-accent-text"
                    : "text-[var(--site-muted)] hover:text-[var(--site-text)]"
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        <div className="flex flex-shrink-0 items-center justify-end gap-3">
          <a
            href="/#contact"
            className="hidden h-9 items-center justify-center rounded-[2px] border border-[var(--site-accent)] px-5 text-[11px] uppercase tracking-[0.08em] text-[var(--site-accent)] transition-all duration-300 hover:lab-accent-bg hover:text-[#080808] active:scale-[0.97] md:inline-flex"
          >
            Получить оценку
          </a>
          <button
            ref={burgerRef}
            type="button"
            onClick={() => setMenuOpen(true)}
            className="flex flex-col gap-[5px] p-1 lg:hidden"
            aria-label="Открыть меню"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <span className="block h-px w-5 bg-[var(--site-text)]" />
            <span className="block h-px w-5 bg-[var(--site-text)]" />
            <span className="block h-px w-3 bg-[var(--site-text)]" />
          </button>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-[190] bg-black/60 backdrop-blur-sm transition-opacity lg:hidden ${
          menuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!menuOpen}
        onClick={() => setMenuOpen(false)}
      />

      <aside
        id="mobile-menu"
        ref={menuRef}
        inert={!menuOpen}
        className={`fixed inset-y-0 right-0 z-[200] flex w-[min(100%,320px)] flex-col border-l border-[var(--site-border)] bg-[var(--site-surface)] shadow-[-24px_0_48px_rgba(0,0,0,0.45)] transition-[transform,visibility] duration-300 ease-out lg:hidden ${
          menuOpen ? "visible translate-x-0" : "invisible translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-[var(--site-border)] px-6 py-5">
          <span style={{ fontFamily: "var(--font-section-display)" }} className="text-lg uppercase lab-accent-text">
            Меню
          </span>
          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            className="text-2xl text-[var(--site-muted)] transition-colors hover:text-[var(--site-text)]"
            aria-label="Закрыть меню"
          >
            ×
          </button>
        </div>
        <nav className="flex flex-col gap-1 px-4 py-6" aria-label="Мобильная навигация">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              style={{ fontFamily: "var(--font-mono)" }}
              className="rounded-[2px] px-3 py-3 text-[13px] uppercase tracking-[0.12em] text-[var(--site-muted)] transition-colors hover:bg-[var(--site-surface-2)] hover:lab-accent-text"
            >
              {item.label}
            </a>
          ))}
          <a
            href="/#contact"
            onClick={() => setMenuOpen(false)}
            className="mx-3 mt-6 inline-flex h-11 items-center justify-center rounded-[2px] border border-[var(--site-accent)] text-[12px] uppercase tracking-[0.08em] text-[var(--site-accent)] hover:lab-accent-bg hover:text-[#080808]"
          >
            Получить оценку
          </a>
        </nav>
      </aside>
    </>
  );
}
