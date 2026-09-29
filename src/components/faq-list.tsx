"use client";

import { faqs } from "@/content/site";
import { Reveal } from "@/components/reveal";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

export function FaqList() {
  const locale = useLocale();
  const t = useTranslations("faq");
  const [open, setOpen] = useState(0);

  return (
    <section className="bg-background py-20">
      <div className="container">
        <Reveal>
          <h2 className="mb-10 max-w-xl text-3xl">{t("title")}</h2>
        </Reveal>
        <div className="divide-y border-y" style={{ borderColor: "var(--border-card)" }}>
          {faqs.map((item, i) => {
            const copy = locale === "ar" ? item.ar : item.en;
            return (
              <Reveal key={copy.q} delay={i * 0.08}>
                <button
                  type="button"
                  className="flex w-full items-start justify-between gap-6 py-6 text-start transition-colors hover:text-copper"
                  onClick={() => setOpen(open === i ? -1 : i)}
                >
                  <span>
                    <span className="block text-lg text-ink">{copy.q}</span>
                    {open === i && (
                      <span className="mt-3 block max-w-3xl text-sm leading-7 text-ink-muted">{copy.a}</span>
                    )}
                  </span>
                  <ChevronDown
                    className={`mt-1 h-5 w-5 shrink-0 stroke-[1.25] transition duration-300 ${
                      open === i ? "rotate-180 text-copper" : "text-ink-muted"
                    }`}
                  />
                </button>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
