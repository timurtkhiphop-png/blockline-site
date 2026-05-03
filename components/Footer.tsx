import { brand } from "@/lib/content";
import { footerCopy } from "@/lib/siteCopy";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-[rgba(0,212,184,0.1)] bg-[#020c0c] px-6 py-8 md:px-12 xl:px-20">
      <div className="mx-auto flex max-w-[1280px] flex-col items-center justify-between gap-4 md:flex-row">
        <a href="#top" className="flex items-center gap-2.5">
          <span className="h-1.5 w-1.5 rounded-full bg-[#00d4b8]" />
          <span
            style={{ fontFamily: "var(--font-display), sans-serif" }}
            className="text-[13px] font-bold tracking-[-0.02em] text-[#00d4b8]"
          >
            {footerCopy.logo}
          </span>
        </a>

        <p className="text-center text-[12px] text-[#2e4d4a] md:text-left">{footerCopy.tagline}</p>

        <div className="flex items-center gap-5">
          <a
            href={brand.telegram}
            target="_blank"
            rel="noreferrer"
            className="text-[#2e4d4a] transition-colors duration-200 hover:text-[#00d4b8]"
            aria-label="Telegram"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-2.04 9.604c-.149.672-.549.836-1.113.52l-3.084-2.27-1.484 1.43c-.165.163-.303.3-.618.3l.22-3.12 5.664-5.116c.247-.22-.053-.34-.381-.12L7.27 14.514l-3.034-.946c-.66-.205-.672-.66.136-.977l11.848-4.572c.547-.2 1.027.13.342.23z" />
            </svg>
          </a>
          <a
            href="#"
            className="text-[#2e4d4a] transition-colors duration-200 hover:text-[#00d4b8]"
            aria-label="Behance"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M22 7h-7V5h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H15.97c.13 1.2.836 1.83 2.12 1.83.93 0 1.662-.4 1.937-1.4zM15.97 13h5.06c-.124-1.34-.8-2.1-2.444-2.1-1.523 0-2.4.77-2.616 2.1zM6.9 9.42c1.12 0 2.58.36 2.58 1.94 0 1.14-.74 1.62-1.04 1.7.45.1 1.56.5 1.56 1.94 0 1.76-1.56 2.44-2.9 2.44H1V9.42h5.9zm-3.6 3.44h2.54c.78 0 1.32-.3 1.32-.94 0-.72-.5-.98-1.3-.98H3.3v1.92zm0 3.5h2.82c.78 0 1.4-.24 1.4-1.04s-.58-1.06-1.4-1.06H3.3v2.1z" />
            </svg>
          </a>
          <span className="text-[12px] text-[#2e4d4a]">
            © {year} {footerCopy.brandLine}
          </span>
        </div>
      </div>
    </footer>
  );
}
