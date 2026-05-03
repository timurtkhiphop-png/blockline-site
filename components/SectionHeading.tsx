"use client";

import { SplitReveal } from "./SplitReveal";
import { Reveal } from "./Reveal";

type Props = {
  eyebrow: string;
  title: string;
  className?: string;
};

export function SectionHeading({ eyebrow, title, className }: Props) {
  return (
    <div className={className}>
      <Reveal>
        <p className="flex items-center gap-3 text-[12px] uppercase tracking-[0.28em] text-whisper">
          <span className="inline-block h-px w-10 bg-lineStrong" />
          {eyebrow}
        </p>
      </Reveal>
      <h2 className="mt-6 max-w-4xl font-display text-[40px] font-light leading-[1.02] tracking-tighter text-white md:text-[64px] lg:text-[80px]">
        <SplitReveal text={title} />
      </h2>
    </div>
  );
}
