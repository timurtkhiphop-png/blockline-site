import { testimonials } from "@/lib/siteCopy";

export function TestimonialsSection() {
  const mainReview = testimonials.items.find((item) => item.featured);
  const shortReviews = testimonials.items.filter((item) => !item.featured);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <section
      id="reviews"
      className="relative scroll-mt-24 bg-[var(--site-bg)] px-4 py-14 md:px-12 md:py-28 xl:px-[48px]"
    >
      {/* Верхний разделитель */}
      <div className="absolute inset-x-0 top-0 h-px bg-[var(--site-border)]" aria-hidden />

      <div className="mx-auto max-w-[1280px]">
        
        {/* ── Eyebrow ─────────────────────────────────────────────────── */}
        <div className="mb-6 flex items-center gap-3 md:mb-10" data-reveal>
          <div className="lab-accent-rule shrink-0" />
          <span className="section-label">{testimonials.eyebrow}</span>
        </div>

        {/* ── Заголовок + вводный текст ───────────────────────────────── */}
        <div className="mb-14 flex flex-col gap-5 md:mb-20 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
          <h2
            data-reveal
            style={{ fontFamily: "var(--font-section-display), sans-serif" }}
            className="text-[clamp(28px,8vw,72px)] font-normal uppercase leading-[1.04] tracking-[0.02em] text-[var(--site-text)] lg:max-w-[720px]"
          >
            {testimonials.title}
            <br />
            <span className="lab-accent-text">{testimonials.titleAccent}</span>
          </h2>
          <p
            data-reveal
            className="max-w-[440px] text-[13px] leading-relaxed text-[var(--site-muted)] md:text-[14px] lg:pb-1"
          >
            {testimonials.intro}
          </p>
        </div>

        {/* ── Композиция отзывов (7/12 + 5/12) ───────────────────────── */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 items-start">
          
          {/* Главный отзыв (слева) - 7/12 */}
          {mainReview && (
            <div className="lg:col-span-7 flex flex-col gap-6 md:gap-8 min-w-0" data-reveal>
              <div 
                lang="ru"
                style={{ fontFamily: "var(--font-section-display), sans-serif" }}
                className="text-[clamp(24px,6.6vw,28px)] md:text-[36px] lg:text-[40px] leading-[1.08] tracking-[0.01em] text-[var(--site-text)] font-normal max-w-full min-w-0 break-words hyphens-manual lg:max-w-[95%]"
              >
                «{mainReview.quote.replace("клиентоориентированности", "клиентоориентирован\u00ADности")}{!mainReview.quoteExtended && "»"}
              </div>
              
              {mainReview.quoteExtended && (
                <div className="text-[17px] leading-[1.55] text-[var(--site-text)]/85 md:text-[20px] md:leading-[1.5] lg:max-w-[90%]">
                  {mainReview.quoteExtended}»
                </div>
              )}
              
              <div className="flex items-center gap-4 mt-2 md:mt-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--site-border)] bg-[var(--site-surface)]">
                  <span className="font-mono text-[11px] text-[var(--site-text)]">{getInitials(mainReview.name)}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[14px] font-medium text-[var(--site-text)]">{mainReview.name}</span>
                  <div className="flex flex-wrap items-center gap-x-2 mt-0.5 text-[11px] font-mono text-[var(--site-muted)] uppercase tracking-[0.08em]">
                    <span>{mainReview.date}</span>
                    <span className="text-[var(--site-border)]">/</span>
                    <span>{mainReview.projectType}</span>
                    <span className="text-[var(--site-border)]">/</span>
                    <span className="lab-accent-text opacity-80">{mainReview.source}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Короткие отзывы (справа) - 5/12 */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="w-full h-px bg-[var(--site-border)] lg:hidden mb-8" aria-hidden />
            
            <div className="flex flex-col">
              {shortReviews.map((review, idx) => (
                <div 
                  key={review.id} 
                  className="flex flex-col gap-4 py-6 first:pt-0 border-b border-[var(--site-border)] last:border-b-0 last:pb-0"
                  data-reveal
                  style={{ "--reveal-delay": `${idx * 100}ms` } as React.CSSProperties}
                >
                  <div className="text-[15px] md:text-[16px] leading-[1.6] text-[var(--site-text)]/90">
                    «{review.quote}»
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <span className="text-[13px] font-medium text-[var(--site-text)]">
                      {review.name}
                    </span>
                    <span className="text-[10px] text-[var(--site-border)]">—</span>
                    <div className="flex flex-wrap items-center gap-x-2 text-[10px] font-mono text-[var(--site-muted)] uppercase tracking-[0.08em]">
                      <span>{review.date}</span>
                      <span className="text-[var(--site-border)]">·</span>
                      <span>{review.projectType}</span>
                      <span className="text-[var(--site-border)]">·</span>
                      <span className="lab-accent-text opacity-80">{review.source}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Footer секции: ссылка ────────────────────────────────────── */}
        <div 
          data-reveal 
          className="mt-16 flex flex-col items-start gap-8 border-t border-[var(--site-border)] pt-8 md:mt-24 md:flex-row md:items-center md:justify-between"
        >
          {/* Общая ссылка на Профи.ру */}
          <a
            href={testimonials.profiLinkHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Смотреть все отзывы на Профи.ру (откроется в новой вкладке)"
            className="group inline-flex h-12 items-center justify-center gap-3 border border-[var(--site-border)] bg-[var(--site-surface)] px-6 text-[12px] font-mono font-medium uppercase tracking-[0.08em] text-[var(--site-text)] transition-colors duration-300 hover:border-[var(--site-accent)]/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--site-accent)]"
          >
            <span>{testimonials.profiLinkText}</span>
          </a>
        </div>

      </div>
    </section>
  );
}
