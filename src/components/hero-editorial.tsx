"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { Children, isValidElement, ReactNode } from "react";
import { StaggeredText } from "./staggered-text";
import { MagneticWrap } from "./magnetic-wrap";
import { AnimatedCounter } from "./animated-counter";

type HeroProps = {
  imageSrc: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  statLabel?: string;
  statValue?: number;
  statPrefix?: string;
  statSuffix?: string;
  children: ReactNode;
};

export function HeroEditorial({
  imageSrc,
  eyebrow,
  title,
  subtitle,
  statLabel,
  statValue,
  statPrefix = "+",
  statSuffix = "",
  children,
}: HeroProps) {
  const reduce = useReducedMotion();
  const childList = Children.toArray(children);

  return (
    <section className="relative isolate min-h-[92vh] overflow-hidden bg-[#0F1B2D]">
      {/* Elevated image plane under editorial type */}
      <motion.div
        className="absolute inset-0"
        initial={reduce ? false : { scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.05, ease: [0.16, 1, 0.3, 1] }}
      >
        <Image src={imageSrc} alt="" fill priority sizes="100vw" className="object-cover" />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-t from-[#0F1B2D] via-[#0F1B2D]/72 to-[#0F1B2D]/25" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0F1B2D]/55 via-transparent to-transparent" />

      <div className="container relative z-10 flex min-h-[92vh] flex-col justify-end pb-16 pt-28 md:pb-24">
        <div className="relative max-w-5xl">
          <motion.p
            className="text-xs tracking-luxury text-copper"
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            {eyebrow}
          </motion.p>

          <StaggeredText
            text={title}
            className="mt-4 max-w-[18ch] text-[clamp(2.4rem,6vw,4.75rem)] leading-[1.08] text-white"
            as="h1"
          />

          <motion.p
            className="mt-6 max-w-xl text-base leading-8 text-white/70 md:text-lg"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            {subtitle}
          </motion.p>

          <motion.div
            className="mt-9 flex flex-wrap items-center gap-4 sm:gap-5"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
          >
            {childList.map((child, i) => {
              /* Magnetic only on primary CTA (first button) */
              if (i === 0 && isValidElement(child)) {
                return (
                  <MagneticWrap key={i} strength={0.22}>
                    {child}
                  </MagneticWrap>
                );
              }
              return <span key={i}>{child}</span>;
            })}
          </motion.div>
        </div>

        {statValue !== undefined && statLabel && (
          <motion.div
            className="glass-card absolute bottom-20 end-4 hidden rounded-2xl px-6 py-5 sm:end-8 md:block lg:bottom-28 lg:end-12"
            initial={reduce ? false : { opacity: 0, y: 28, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.95, ease: [0.16, 1, 0.3, 1] }}
          >
            <AnimatedCounter
              value={statValue}
              prefix={statPrefix}
              suffix={statSuffix}
              className="block text-3xl font-bold text-white"
            />
            <span className="mt-1 block text-xs tracking-wide text-white/65">{statLabel}</span>
          </motion.div>
        )}
      </div>
    </section>
  );
}
