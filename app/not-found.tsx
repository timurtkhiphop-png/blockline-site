import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[var(--site-bg)] text-center px-6">
      <h1 
        className="hero-headline-gradient text-[clamp(120px,20vw,240px)] font-black leading-none tracking-tighter"
        style={{ fontFamily: "var(--font-display), sans-serif" }}
      >
        404
      </h1>
      <p className="mt-6 max-w-md text-[var(--site-muted)] text-lg">
        Похоже, мы зашли в тупик. Страница, которую вы ищете, была удалена или никогда не существовала.
      </p>
      <Link 
        href="/"
        className="mt-12 inline-flex items-center justify-center rounded-full bg-white/10 px-8 py-4 text-sm font-medium text-white backdrop-blur-md transition-colors hover:bg-white/20"
      >
        Вернуться в лабораторию
      </Link>
    </div>
  )
}
