type Props = {
  className?: string;
  size?: "sm" | "md" | "lg";
  href?: string | null;
  /** Тёмный хедер: весь логотип в teal/cyan без «раздвоения» цвета */
  variant?: "default" | "headerCyan";
};

const sizes = {
  sm: "text-[15px] leading-none",
  md: "text-[17px] leading-none",
  lg: "text-4xl md:text-5xl",
};

/**
 * Текстовый логотип без иконок; позже — замена на SVG.
 */
export function LogoMark({
  className = "",
  size = "md",
  href = "#top",
  variant = "default",
}: Props) {
  const body =
    variant === "headerCyan" ? (
      <span
        className={`font-display font-semibold tracking-tight ${sizes[size]} ${className} bg-gradient-to-r from-teal-300 via-cyan-300 to-cyan-400 bg-clip-text text-transparent`}
      >
        8:20 lab
      </span>
    ) : (
      <span
        className={`font-display font-semibold tracking-tight text-white ${sizes[size]} ${className}`}
      >
        <span className="text-accent">8:20</span>
        <span className="font-normal text-mist"> lab</span>
      </span>
    );

  if (href) {
    return (
      <a href={href} className="inline-block">
        {body}
      </a>
    );
  }
  return <span className="inline-block">{body}</span>;
}
