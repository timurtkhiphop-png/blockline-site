"use client";

import { useState, useRef, useEffect } from "react";
import { brand } from "@/lib/content";
import { contact } from "@/lib/siteCopy";

function TelegramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M22 2L11 13" />
      <path d="M22 2l-7 20-4-9-9-4 20-7z" />
    </svg>
  );
}

function EmailIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

function MaxIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none" className={className}>
      <path fill="currentColor" fillRule="evenodd" d="M50.76 0c27.53 0 49.12 22.34 49.12 49.89S77.61 99.23 51.02 99.23c-9.43 0-14.01-1.33-21.37-6.54-.5-.36-1.2-.26-1.63.19-5.66 6.04-20.17 10.28-20.83 2.03C7.19 80.53 0 71.18 0 49.61 0 21.3 23.22 0 50.76 0m.77 24.55c-13.07-.68-23.26 8.39-25.51 22.58-1.86 11.75 1.44 26.07 4.26 26.8 1.2.3 4.08-1.9 6.18-3.88.4-.37.99-.44 1.45-.15 3.27 2 6.97 3.5 11.05 3.71 13.42.7 25.3-9.8 26-23.21.71-13.42-10.01-25.14-23.43-25.85" clipRule="evenodd"/>
    </svg>
  );
}

type FormState = "idle" | "submitting" | "success" | "error" | "error-rate-limit";

export function ContactForm() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formStartedAt, setFormStartedAt] = useState<number>(0);
  const formRef = useRef<HTMLFormElement>(null);

  // Set formStartedAt on mount to avoid hydration mismatch
  useEffect(() => {
    setFormStartedAt(Date.now());
  }, []);

  const validate = (formData: FormData) => {
    const newErrors: Record<string, string> = {};
    const name = formData.get("name")?.toString().trim();
    const contactMethod = formData.get("contactMethod")?.toString().trim();
    const description = formData.get("description")?.toString().trim();

    if (!name) newErrors.name = "Укажите, как к вам обращаться.";
    if (!contactMethod) newErrors.contactMethod = "Оставьте удобный способ связи.";
    if (!description) newErrors.description = "Коротко опишите задачу.";
    else if (description.length < 10) newErrors.description = "Пожалуйста, напишите чуть подробнее.";

    if (!formData.get("consent")) newErrors.consent = "Подтвердите согласие на обработку персональных данных.";

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formState === "submitting") return;

    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.append("form_started_at", formStartedAt.toString());

    const newErrors = validate(formData);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);

      const firstInvalidField = Object.keys(newErrors)[0];
      const el = form.elements.namedItem(firstInvalidField) as HTMLElement;
      if (el) el.focus();
      return;
    }

    setErrors({});
    setFormState("submitting");

    try {
      // Convert FormData to JSON
      const jsonBody: Record<string, any> = {};
      formData.forEach((value, key) => {
        if (key === "consent") {
            jsonBody[key] = value === "on";
        } else {
            jsonBody[key] = value;
        }
      });

      const response = await fetch("/api/lead.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(jsonBody)
      });

      if (response.status === 429) {
        setFormState("error-rate-limit");
        return;
      }

      if (!response.ok) {
        throw new Error("HTTP Error");
      }

      const data = await response.json();
      if (data && data.ok) {
        setFormState("success");
        form.reset();
        setFormStartedAt(Date.now());
      } else {
        throw new Error("API returned not ok");
      }
    } catch (err) {
      setFormState("error");
    }
  };

  return (
    <section
      id="contact"
      className="relative flex min-h-[85svh] lg:min-h-[900px] scroll-mt-24 items-center justify-center border-t border-black overflow-hidden isolation-isolate px-6 py-16 md:py-24 md:px-12"
    >
      <div className="absolute inset-0 bg-[#080a0a] -z-30 hidden motion-reduce:block" aria-hidden="true" />
      <video
        ref={(el) => {
          if (!el) return;
          // IntersectionObserver and Page Visibility logic
          const handleVisibility = () => {
            if (document.hidden) {
              el.pause();
            } else {
              const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
              if (!mq.matches && el.dataset.inView === "true") {
                el.play().catch(() => {});
              }
            }
          };

          if (!el.dataset.observerAttached) {
            el.dataset.observerAttached = "true";
            document.addEventListener("visibilitychange", handleVisibility);

            const observer = new IntersectionObserver(
              (entries) => {
                entries.forEach((entry) => {
                  if (entry.isIntersecting) {
                    el.dataset.inView = "true";
                    
                    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
                    const conn = (navigator as any).connection;
                    const saveData = conn && conn.saveData;

                    if (!mq.matches && !saveData) {
                      if (!el.src) {
                        el.src = "/bg-loop.mp4";
                        el.load();
                      }
                      if (!document.hidden) {
                        el.play().catch(() => {});
                      }
                    }
                  } else {
                    el.dataset.inView = "false";
                    el.pause();
                  }
                });
              },
              { rootMargin: "800px 0px" }
            );
            observer.observe(el);

            // Cleanup function attachment (React 19 style)
            return () => {
              observer.disconnect();
              document.removeEventListener("visibilitychange", handleVisibility);
              delete el.dataset.observerAttached;
            };
          }
        }}
        className="pointer-events-none absolute inset-0 -z-30 h-full w-full object-cover object-[20%_center] lg:object-[30%_center] select-none motion-reduce:hidden"
        loop
        muted
        playsInline
        preload="none"
        aria-hidden="true"
        tabIndex={-1}
      />

      {/* Слой 1: Равномерное затемнение */}
      <div className="pointer-events-none absolute inset-0 -z-20 bg-black/40" aria-hidden="true" />

      {/* Слой 2: Горизонтальный градиент (слева светлее, справа темнее под форму) */}
      <div className="pointer-events-none absolute inset-0 -z-20 bg-gradient-to-r from-transparent via-black/50 to-black/95" aria-hidden="true" />

      {/* Слой 3: Вертикальный градиент (плавный уход в футер) */}
      <div className="pointer-events-none absolute inset-0 -z-20 bg-gradient-to-b from-black/10 via-transparent to-[#050505] md:from-black/20" aria-hidden="true" />

      <div className="relative z-10 mx-auto w-full max-w-[1440px] flex flex-col h-full justify-between">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-24 mb-12 lg:mb-24 flex-grow items-center">
          {/* Left Side: Editorial Typography */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <span className="section-label mb-6 lg:mb-8 inline-flex after:hidden">{contact.eyebrow}</span>

            <h2 data-reveal className="mb-6 lg:mb-8 flex flex-col gap-1 lg:gap-2 w-full max-w-full">
              <span
                style={{ fontFamily: "var(--font-section-display), sans-serif" }}
                className="block text-[clamp(34px,10vw,96px)] font-normal uppercase leading-[0.9] tracking-[0.02em] text-[var(--site-text)]"
              >
                {contact.title}
              </span>
              <span
                style={{ fontFamily: "var(--font-section-display), sans-serif" }}
                className="lab-accent-text block text-[clamp(34px,10vw,96px)] font-normal uppercase leading-[0.9] tracking-[0.02em]"
              >
                {contact.titleAccent}
              </span>
            </h2>

            <p data-reveal className="mb-4 max-w-[480px] text-[16px] lg:text-[20px] leading-relaxed text-[var(--site-muted)]">
              {contact.sub}
            </p>

            <p data-reveal style={{ fontFamily: "var(--font-mono)" }} className="text-[12px] uppercase tracking-wider text-[var(--site-muted)] opacity-70">
              {contact.micro}
            </p>
          </div>

          {/* Right Side: Integrated Form */}
          <div className="lg:col-span-5 flex flex-col justify-center relative">
            {/* Локальное затемнение формы для лучшей читаемости */}
            <div className="pointer-events-none absolute inset-[-24px] lg:inset-[-40px] -z-10 bg-black/10 rounded-[40px] lg:rounded-none lg:bg-transparent" aria-hidden="true" />

            <form
              ref={formRef}
              onSubmit={handleSubmit}
              noValidate
              className="flex w-full flex-col gap-6 lg:gap-8 lg:border-l lg:border-white/10 lg:pl-10"
              aria-label="Форма отправки задачи"
            >
              {/* Honeypot field (hidden from users and AT) */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="bot_check">Не заполняйте это поле, если вы человек:</label>
                <input type="text" id="bot_check" name="bot_check" tabIndex={-1} autoComplete="off" />
              </div>

              <div className="flex flex-col gap-2 lg:gap-3">
                <label htmlFor="name" className="text-[12px] uppercase tracking-wider text-white/60 font-mono">
                  Ваше имя <span className="text-[var(--site-accent)]">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Тимур"
                  maxLength={80}
                  disabled={formState === "submitting"}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  className={`w-full border-b bg-transparent pb-3 text-[18px] text-white/90 placeholder:text-white/40 focus-visible:outline-none transition-colors disabled:opacity-50 hover:border-white/45 ${
                    errors.name ? "border-red-400 focus-visible:border-red-400" : "border-white/30 focus-visible:border-[var(--site-accent)]"
                  }`}
                />
                {errors.name && (
                  <span id="name-error" className="mt-1 text-[13px] text-red-400 font-medium">
                    {errors.name}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-2 lg:gap-3">
                <label htmlFor="contactMethod" className="text-[12px] uppercase tracking-wider text-white/60 font-mono">
                  Как с вами связаться <span className="text-[var(--site-accent)]">*</span>
                </label>
                <input
                  type="text"
                  id="contactMethod"
                  name="contactMethod"
                  placeholder="Telegram, WhatsApp, email или телефон"
                  maxLength={180}
                  disabled={formState === "submitting"}
                  aria-invalid={!!errors.contactMethod}
                  aria-describedby={errors.contactMethod ? "contactMethod-error" : undefined}
                  className={`w-full border-b bg-transparent pb-3 text-[18px] text-white/90 placeholder:text-white/40 focus-visible:outline-none transition-colors disabled:opacity-50 hover:border-white/45 ${
                    errors.contactMethod ? "border-red-400 focus-visible:border-red-400" : "border-white/30 focus-visible:border-[var(--site-accent)]"
                  }`}
                />
                {errors.contactMethod && (
                  <span id="contactMethod-error" className="mt-1 text-[13px] text-red-400 font-medium">
                    {errors.contactMethod}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-2 lg:gap-3">
                <label htmlFor="description" className="text-[12px] uppercase tracking-wider text-white/60 font-mono">
                  Коротко о задаче <span className="text-[var(--site-accent)]">*</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  placeholder="Например: корпоративный сайт для производственной компании..."
                  maxLength={2000}
                  disabled={formState === "submitting"}
                  aria-invalid={!!errors.description}
                  aria-describedby={errors.description ? "description-error" : undefined}
                  rows={3}
                  className={`w-full resize-y border-b bg-transparent pb-3 text-[18px] text-white/90 placeholder:text-white/40 focus-visible:outline-none transition-colors disabled:opacity-50 min-h-[100px] lg:min-h-[120px] hover:border-white/45 ${
                    errors.description ? "border-red-400 focus-visible:border-red-400" : "border-white/30 focus-visible:border-[var(--site-accent)]"
                  }`}
                />
                {errors.description && (
                  <span id="description-error" className="mt-1 text-[13px] text-red-400 font-medium">
                    {errors.description}
                  </span>
                )}
              </div>

              <div className="mt-2 flex flex-col gap-6 lg:gap-8">
                {/* Consent Checkbox */}
                <div className="flex flex-col gap-1">
                  <div className="flex min-h-10 items-start gap-3 group">
                    <span className="relative mt-0.5 block h-[16px] w-[16px] shrink-0">
                      <input
                        id="consent"
                        name="consent"
                        type="checkbox"
                        disabled={formState === "submitting"}
                        aria-invalid={!!errors.consent}
                        aria-describedby={errors.consent ? "consent-error" : undefined}
                        className="peer absolute inset-0 z-10 h-full w-full cursor-pointer appearance-none opacity-0 disabled:cursor-not-allowed"
                      />
                      <span
                        aria-hidden="true"
                        className="
                          pointer-events-none absolute inset-0 rounded-[2px]
                          border border-white/30 bg-transparent
                          transition-colors
                          peer-checked:border-[var(--site-accent)]
                          peer-checked:bg-[var(--site-accent)]
                          peer-focus-visible:ring-2
                          peer-focus-visible:ring-[var(--site-accent)]
                          peer-focus-visible:ring-offset-2
                          peer-focus-visible:ring-offset-[#111]
                          peer-disabled:opacity-50
                        "
                      />
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 16 16"
                        fill="none"
                        className="
                          pointer-events-none absolute inset-[2px]
                          h-3 w-3
                          opacity-0
                          transition-opacity
                          peer-checked:opacity-100
                        "
                      >
                        <path
                          d="M3 8.25 6.25 11.5 13 4.75"
                          stroke="#020c0c"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <p className="text-[12px] md:text-[13px] leading-[1.45] text-white/50">
                      <label htmlFor="consent" className="cursor-pointer select-none">
                        Я соглашаюсь на обработку персональных данных в соответствии с{" "}
                      </label>
                      <a
                        href="/privacy"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
                          relative z-10 text-white/70 underline-offset-4 transition-colors
                          hover:text-[var(--site-accent)] hover:underline
                          focus-visible:text-[var(--site-accent)]
                          focus-visible:outline-none focus-visible:ring-2
                          focus-visible:ring-[var(--site-accent)]
                        "
                      >
                        Политикой конфиденциальности
                      </a>
                      <label htmlFor="consent" className="cursor-pointer select-none">
                        .
                      </label>
                    </p>
                  </div>
                  {errors.consent && (
                    <span id="consent-error" className="text-[13px] text-red-400 font-medium pl-7">
                      {errors.consent}
                    </span>
                  )}
                </div>

                {/* Submit Button */}
                <div>
                  <button
                    type="submit"
                    disabled={formState === "submitting"}
                    className="group/btn relative inline-flex h-16 w-full items-center justify-center bg-[#111] border border-[var(--site-accent)] text-[15px] font-medium text-white transition-colors hover:bg-[var(--site-accent)] hover:text-[#020c0c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--site-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:pointer-events-none disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    <span className="relative z-10">
                      {formState === "submitting" ? "ОТПРАВЛЯЮ..." : contact.submitBtn}
                    </span>
                    {!formState || formState !== "submitting" ? (
                      <span className="ml-2 text-[var(--site-accent)] transition-colors group-hover/btn:text-[#020c0c]">→</span>
                    ) : null}
                  </button>
                </div>
              </div>

              {/* Form Status Messages */}
              <div aria-live="polite" className="mt-0">
                {formState === "error" && (
                  <div className="border-l-2 border-red-500 bg-red-500/10 p-4 text-[14px] text-red-200">
                    {contact.errorMsg}
                  </div>
                )}
                {formState === "error-rate-limit" && (
                  <div className="border-l-2 border-red-500 bg-red-500/10 p-4 text-[14px] text-red-200">
                    {contact.rateLimitMsg}
                  </div>
                )}
                {formState === "success" && (
                  <div className="border-l-2 border-[var(--site-accent)] bg-[var(--site-accent)]/10 p-4 text-[14px] text-[var(--site-accent)]">
                    {contact.successMsg}
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* Direct Contacts Bar */}
        <div data-reveal className="mt-auto border-t border-white/10 pt-6 lg:pt-8">
          <span className="mb-4 lg:mb-6 block text-[11px] uppercase tracking-wider text-white/50 font-mono">
            {contact.directLabel}
          </span>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 lg:gap-12">
            <a
              href="https://max.ru/u/f9LHodD0cOImSQaNISqEJEH8sGjd_55FIifR1HcxtxRfob9EMSsmqsN3VEk"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 text-[15px] lg:text-[18px] font-medium text-[var(--site-text)] transition-colors hover:text-[var(--site-accent)] focus-visible:outline-none focus-visible:text-[var(--site-accent)]"
              aria-label="Написать в MAX"
            >
              <span>MAX</span>
              <span className="text-white/30 transition-colors group-hover:text-[var(--site-accent)] text-[14px] -translate-y-0.5">↗</span>
            </a>
            <a
              href={brand.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 text-[15px] lg:text-[18px] font-medium text-[var(--site-text)] transition-colors hover:text-[var(--site-accent)] focus-visible:outline-none focus-visible:text-[var(--site-accent)]"
              aria-label="Написать в Telegram"
            >
              <span>TELEGRAM</span>
              <span className="text-white/30 transition-colors group-hover:text-[var(--site-accent)] text-[14px] -translate-y-0.5">↗</span>
            </a>
            <a
              href={brand.mailtoHref}
              className="group flex items-center gap-2 text-[15px] lg:text-[18px] font-medium text-[var(--site-text)] transition-colors hover:text-[var(--site-accent)] focus-visible:outline-none focus-visible:text-[var(--site-accent)]"
              aria-label="Написать на email"
            >
              <span>EMAIL</span>
              <span className="text-white/30 transition-colors group-hover:text-[var(--site-accent)] text-[14px] -translate-y-0.5">↗</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
