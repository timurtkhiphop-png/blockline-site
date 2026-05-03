import { brand } from "@/lib/content";
import { footer } from "@/lib/siteCopy";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-[var(--site-border)] bg-[var(--site-bg)] px-6 py-10 md:px-12 xl:px-[48px]">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-8 md:flex-row md:items-start md:justify-between">
        <div className="flex flex-col gap-3">
          <a href="#top" className="inline-flex items-center gap-2">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full lab-accent-bg" />
            <span
              style={{ fontFamily: "var(--font-section-display), sans-serif" }}
              className="text-[20px] font-normal uppercase tracking-[0.06em] lab-accent-text"
            >
              {footer.logo}
            </span>
          </a>
          <p style={{ fontFamily: "var(--font-mono)" }} className="max-w-[360px] text-[10px] uppercase tracking-[0.15em] text-[var(--site-muted)]">
            {footer.tagline}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-6 md:justify-end">
          <div className="flex items-center gap-5">
            <a
              href={brand.telegram}
              target="_blank"
              rel="noreferrer"
              className="text-[var(--site-muted)] transition-colors hover:text-[var(--site-text)]"
              aria-label="Telegram"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-2.04 9.604c-.149.672-.549.836-1.113.52l-3.084-2.27-1.484 1.43c-.165.163-.303.3-.618.3l.22-3.12 5.664-5.116c.247-.22-.053-.34-.381-.12L7.27 14.514l-3.034-.946c-.66-.205-.672-.66.136-.977l11.848-4.572c.547-.2 1.027.13.342.23z" />
              </svg>
            </a>
            <a
              href={`mailto:${brand.email}`}
              className="text-[var(--site-muted)] transition-colors hover:text-[var(--site-text)]"
              aria-label="Email"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
            </a>
          </div>
          <span style={{ fontFamily: "var(--font-mono)" }} className="text-[11px] text-[var(--site-muted)]">
            © {year} {brand.name}
          </span>
        </div>
      </div>
    </footer>
  );
}
