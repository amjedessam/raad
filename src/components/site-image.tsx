"use client";

import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  className?: string;
  ratio?: string;
  priority?: boolean;
  sizes?: string;
};

export function SiteImage({
  src,
  alt,
  className,
  ratio = "aspect-[16/10]",
  priority,
  sizes = "(max-width: 768px) 100vw, 50vw",
}: Props) {
  const reduce = useReducedMotion();

  return (
    <div className={cn("relative overflow-hidden rounded-[1.5rem] bg-mist", ratio, className)}>
      <motion.div
        className="card-image absolute inset-0"
        initial={reduce ? false : { scale: 1.08 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover"
        />
      </motion.div>
    </div>
  );
}
