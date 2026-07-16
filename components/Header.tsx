"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { nav as NAV } from "@/lib/siteCopy";
import { brand } from "@/lib/content";

const pad = (n: number) => String(n).padStart(2, "0");

const MAX_URL = "https://max.ru/u/f9LHodD0cOImSQaNISqEJEH8sGjd_55FIifR1HcxtxRfob9EMSsmqsN3VEk";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();

  const isHomePage = pathname === "/";

  const [scrollY, setScrollY] = useState(0);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const menuRef = useRef<HTMLElement | null>(null);
  const burgerRef = useRef<HTMLButtonElement | null>(null);

  const isScrolled = !isHomePage || scrollY > 40;

  useEffect(() => {
    let rafId: number;
    const onScroll = () => {
      rafId = requestAnimationFrame(() => {
        setScrollY(window.scrollY);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const progressRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const updateProgress = () => {
      if (!progressRef.current) return;
      const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = totalHeight > 0 ? (window.scrollY / totalHeight) : 0;
      progressRef.current.style.transform = `scaleX(${progress})`;
    };
    window.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  useEffect(() => {
    if (!isHomePage) {
      setActiveId(null);
      return;
    }

    const sectionIds = ["projects", "process", "about", "product", "pricing"];
    const visibleSections = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          visibleSections.set(entry.target.id, entry.intersectionRatio);
        });

        let maxRatio = 0;
        let mostVisibleId: string | null = null;

        visibleSections.forEach((ratio, id) => {
          if (ratio > maxRatio) {
            maxRatio = ratio;
            mostVisibleId = id;
          }
        });

        if (maxRatio > 0) {
          setActiveId(mostVisibleId);
        } else {
          setActiveId(null);
        }
      },
      {
        root: null,
        rootMargin: "-90px 0px -40% 0px",
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [isHomePage]);

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isHomePage) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      history.pushState("", document.title, window.location.pathname + window.location.search);
      setMenuOpen(false);
      setActiveId(null);
    } else {
      setMenuOpen(false);
    }
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, sectionId: string) => {
    setMenuOpen(false);
    if (isHomePage && href.startsWith("#")) {
      e.preventDefault();
      const el = document.getElementById(sectionId);
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - 90;
        window.scrollTo({ top: y, behavior: "smooth" });
        history.pushState("", document.title, window.location.pathname + "#" + sectionId);
      }
    }
  };

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    if (menuOpen) {
      const currentScrollY = window.scrollY;
      body.style.position = "fixed";
      body.style.top = `-${currentScrollY}px`;
      body.style.width = "100%";
      body.style.overflow = "hidden";
      html.style.scrollBehavior = "auto";

      setTimeout(() => {
        const firstFocusable = menuRef.current?.querySelector<HTMLElement>("a[href], button:not([disabled])");
        firstFocusable?.focus();
      }, 100);

      const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setMenuOpen(false);
        } else if (e.key === "Tab") {
          const focusables = Array.from(menuRef.current?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])") || []);
          if (focusables.length === 0) return;
          const first = focusables[0];
          const last = focusables[focusables.length - 1];
          const active = document.activeElement as HTMLElement | null;

          if (e.shiftKey && active === first) {
            e.preventDefault();
            last.focus();
          } else if (!e.shiftKey && active === last) {
            e.preventDefault();
            first.focus();
          }
        }
      };
      document.addEventListener("keydown", onKeyDown);

      return () => {
        const scrolledY = Math.abs(parseInt(body.style.top || "0"));
        body.style.position = "";
        body.style.top = "";
        body.style.width = "";
        body.style.overflow = "";
        window.scrollTo(0, scrolledY);
        html.style.scrollBehavior = "";
        document.removeEventListener("keydown", onKeyDown);
        burgerRef.current?.focus({ preventScroll: true });
      };
    }
  }, [menuOpen]);

  const isProjectsRoute = pathname === "/projects" || pathname.startsWith("/projects/");

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 pointer-events-none transition-all duration-300">
        {/* DESKTOP HEADER */}
        <div className={`hidden md:block pointer-events-auto w-full transition-all duration-300 border-b border-white/10 ${
          isScrolled
            ? "bg-[#070909]/95 backdrop-blur-md shadow-xl"
            : "bg-gradient-to-b from-black/55 to-transparent backdrop-blur-[4px]"
        }`}>
          <div className={`mx-auto flex w-full max-w-[1440px] items-stretch justify-between px-4 md:px-6 xl:px-[48px] transition-all duration-300 ${
            isScrolled ? "h-[68px]" : "h-[80px]"
          }`}>

            {/* Left Module: LOGO */}
            <div className="flex shrink-0 items-center pr-6 md:pr-10 border-r border-white/10">
              <Link
                href="/"
                onClick={handleLogoClick}
                className="flex items-center gap-2.5 transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--site-accent)]"
                aria-label="На главную"
              >
                <span className="relative flex h-1.5 w-1.5 items-center justify-center shrink-0">
                  <span className="absolute inline-flex h-full w-full rounded-full lab-accent-bg opacity-60"></span>
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full lab-accent-bg"></span>
                </span>
                <span
                  style={{ fontFamily: "var(--font-section-display)" }}
                  className="text-[19px] tracking-[0.08em] text-white uppercase"
                >
                  8:20 lab
                </span>
              </Link>
            </div>

            {/* Middle Module: Navigation */}
            <nav className="flex flex-1 items-center justify-center gap-8 lg:gap-12 px-6" aria-label="Основная навигация">
              {NAV.map((item, index) => {
                const num = pad(index + 1);
                let active = false;
                let ariaCurrent: "page" | "location" | undefined = undefined;

                if (item.id === "projects") {
                  if (isHomePage) {
                    active = activeId === "projects";
                    ariaCurrent = active ? "location" : undefined;
                  } else {
                    active = isProjectsRoute;
                    ariaCurrent = active ? "page" : undefined;
                  }
                } else {
                  active = isHomePage && activeId === item.sectionId;
                  ariaCurrent = active ? "page" : undefined;
                }

                let href = item.routeHref;
                if (isHomePage) {
                  if (item.id === "projects") {
                    href = "#projects";
                  } else if (item.routeHref.startsWith("/#")) {
                    href = item.routeHref.replace("/", "");
                  }
                }

                return (
                  <Link
                    key={item.id}
                    href={href}
                    onClick={(e) => handleNavClick(e, href, item.sectionId)}
                    aria-current={ariaCurrent}
                    className="group relative flex h-[44px] items-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--site-accent)]"
                  >
                    <span style={{ fontFamily: "var(--font-mono)" }} className={`text-[10px] transition-colors ${active ? "lab-accent-text" : "text-white/30"}`}>
                      {num}
                    </span>
                    <span className={`text-[13px] uppercase transition-colors ${active ? "text-white font-medium" : "text-white/70 font-normal group-hover:text-white"}`}>
                      {item.label}
                    </span>
                    {/* Editorial Underline */}
                    <span className={`absolute bottom-[6px] left-0 h-[1px] bg-[var(--site-accent)] transition-all duration-300 ${active ? "w-full opacity-100" : "w-0 opacity-0"}`}></span>
                  </Link>
                );
              })}
            </nav>

            {/* Right Module: CTA */}
            <div className="flex shrink-0 items-stretch border-l border-white/10">
               <Link
                  href="/#contact"
                  className="flex h-full items-center pl-6 md:pl-10 text-[13px] font-medium uppercase tracking-[0.08em] text-white/85 transition-all hover:bg-[var(--site-accent)] hover:text-[#050606] hover:px-8 group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--site-accent)]"
                >
                  ОБСУДИТЬ ПРОЕКТ
                  <span className="ml-2 font-mono transition-transform group-hover:translate-x-1">↗</span>
                </Link>
            </div>
          </div>

          {/* PROGRESS INDICATOR */}
          <div className="absolute bottom-0 left-0 right-0 h-[1px] md:h-[2px] bg-white/5 pointer-events-none">
            <div className="w-full h-full lab-accent-bg origin-left transform-gpu" style={{ transform: "scaleX(0)" }} ref={progressRef} />
          </div>
        </div>

        {/* MOBILE HEADER */}
        <div className={`flex md:hidden pointer-events-auto w-full items-center justify-between border-b border-white/10 transition-all duration-300 px-4 ${
          isScrolled ? "h-[64px] bg-[#070909]/95 backdrop-blur-md" : "h-[70px] bg-gradient-to-b from-black/60 to-transparent backdrop-blur-md"
        }`}>
          <Link
            href="/"
            onClick={handleLogoClick}
            className="flex items-center gap-2.5 transition-opacity hover:opacity-80 focus-visible:outline-none"
            aria-label="На главную"
          >
            <span className="relative flex h-1.5 w-1.5 items-center justify-center shrink-0">
              <span className="absolute inline-flex h-full w-full rounded-full lab-accent-bg opacity-60"></span>
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full lab-accent-bg"></span>
            </span>
            <span
              style={{ fontFamily: "var(--font-section-display)" }}
              className="text-[18px] tracking-[0.08em] text-white uppercase"
            >
              8:20 lab
            </span>
          </Link>

          <button
            ref={burgerRef}
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex h-[44px] items-center justify-center gap-2 px-2 text-[12px] uppercase tracking-wider text-white transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--site-accent)]"
            aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            МЕНЮ
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="14" height="1.5" fill="currentColor" />
              <rect y="4" width="14" height="1.5" fill="currentColor" />
              <rect y="8" width="10" height="1.5" fill="currentColor" />
            </svg>
          </button>
        </div>
      </header>

      {/* MOBILE MENU FULLSCREEN */}
      <aside
        id="mobile-menu"
        ref={menuRef}
        inert={!menuOpen ? true : undefined}
        className={`fixed inset-0 z-[60] bg-[#050606] flex flex-col md:hidden transition-opacity duration-300 ${
          menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        {/* Mobile Header Mimic inside overlay */}
        <div className="flex h-[70px] items-center justify-between border-b border-white/10 px-4 shrink-0">
          <span style={{ fontFamily: "var(--font-section-display)" }} className="text-[18px] text-white tracking-[0.08em] uppercase flex items-center gap-2.5">
            <span className="relative flex h-1.5 w-1.5 items-center justify-center shrink-0">
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full lab-accent-bg"></span>
            </span>
            8:20 lab
          </span>
          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            className="flex h-[44px] items-center justify-center px-2 text-[13px] uppercase tracking-wider text-white/80 hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--site-accent)] gap-1.5"
            aria-label="Закрыть меню"
          >
            ЗАКРЫТЬ
            <span className="text-[16px] leading-none mb-0.5">×</span>
          </button>
        </div>

        {/* Menu Items */}
        <div className="flex-1 overflow-y-auto px-6 py-8 flex flex-col">
          <nav className="flex flex-col gap-8 flex-1" aria-label="Мобильная навигация">
            {NAV.map((item, index) => {
              const num = pad(index + 1);
              let active = false;
              let ariaCurrent: "page" | "location" | undefined = undefined;

              if (item.id === "projects") {
                if (isHomePage) {
                  active = activeId === "projects";
                  ariaCurrent = active ? "location" : undefined;
                } else {
                  active = isProjectsRoute;
                  ariaCurrent = active ? "page" : undefined;
                }
              } else {
                active = isHomePage && activeId === item.sectionId;
                ariaCurrent = active ? "page" : undefined;
              }

              let href = item.routeHref;
              if (isHomePage) {
                if (item.id === "projects") {
                  href = "#projects";
                } else if (item.routeHref.startsWith("/#")) {
                  href = item.routeHref.replace("/", "");
                }
              }

              return (
                <Link
                  key={item.id}
                  href={href}
                  onClick={(e) => handleNavClick(e, href, item.sectionId)}
                  aria-current={ariaCurrent}
                  className="group flex items-start gap-5 cursor-pointer py-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--site-accent)]"
                >
                  <span style={{ fontFamily: "var(--font-mono)" }} className={`text-[13px] mt-2 transition-colors ${active ? "lab-accent-text" : "text-white/30 group-hover:text-white/50"}`}>
                    {num}
                  </span>
                  <span style={{ fontFamily: "var(--font-section-display)" }} className={`text-[clamp(34px,9vw,56px)] uppercase tracking-[0.02em] leading-[1.1] transition-colors ${active ? "text-white" : "text-white/70 group-hover:text-white"}`}>
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* Bottom Actions */}
          <div className="mt-12 flex flex-col gap-8 shrink-0 pb-8">
            <Link
              href="/#contact"
              onClick={() => setMenuOpen(false)}
              className="flex h-[64px] w-full items-center justify-center gap-3 border border-white/10 bg-[var(--site-accent)] text-[14px] font-medium uppercase tracking-[0.1em] text-[#050606] transition-all hover:bg-[var(--site-accent)]/90 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--site-accent)]"
            >
              ОБСУДИТЬ ПРОЕКТ
              <span className="font-mono text-[16px]">→</span>
            </Link>

            <div className="flex flex-wrap items-center justify-center gap-10">
              <a
                href={MAX_URL}
                target="_blank"
                rel="noreferrer"
                className="text-[13px] uppercase tracking-widest text-white/50 hover:text-white transition-colors font-mono focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--site-accent)]"
              >
                MAX
              </a>
              <a
                href={brand.telegram}
                target="_blank"
                rel="noreferrer"
                className="text-[13px] uppercase tracking-widest text-white/50 hover:text-white transition-colors font-mono focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--site-accent)]"
              >
                TELEGRAM
              </a>
              <a
                href={brand.mailtoHref}
                className="text-[13px] uppercase tracking-widest text-white/50 hover:text-white transition-colors font-mono focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--site-accent)]"
              >
                EMAIL
              </a>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
