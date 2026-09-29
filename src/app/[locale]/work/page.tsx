import { projects } from "@/content/site";
import { ALL_IMAGES } from "@/content/media";
import { SiteImage } from "@/components/site-image";
import { Reveal } from "@/components/reveal";
import { Link } from "@/i18n/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("meta");
  return { title: t("workTitle"), description: t("workDescription") };
}

export default async function WorkPage() {
  const t = await getTranslations("work");
  const cta = await getTranslations("cta");
  const locale = await getLocale();
  const isAr = locale === "ar";

  return (
    <>
      <section className="bg-[#0F1B2D] py-20 text-white">
        <div className="container max-w-3xl">
          <p className="text-xs tracking-luxury text-copper">{t("eyebrow")}</p>
          <h1 className="mt-4 text-4xl md:text-5xl">{t("title")}</h1>
          <p className="mt-6 text-white/70">{t("subtitle")}</p>
        </div>
      </section>
      <section className="bg-background py-20">
        <div className="container grid gap-10 md:grid-cols-2">
          {projects.map((p, i) => {
            const copy = isAr ? p.ar : p.en;
            return (
              <Reveal key={p.slug} delay={i * 0.09}>
                <Link
                  href={`/work/${p.slug}`}
                  className="card-interactive group block overflow-hidden rounded-[1.5rem] bg-card"
                >
                  <SiteImage src={p.image} alt={copy.title} className="rounded-none" />
                  <div className="p-6">
                    <h2 className="text-2xl transition group-hover:text-copper">{copy.title}</h2>
                    <p className="mt-2 text-sm text-ink-muted">
                      {isAr ? p.locationAr : p.locationEn} · {isAr ? p.area : p.areaEn} · {p.year}
                    </p>
                    <p className="mt-3 text-sm leading-7 text-ink-muted">{copy.challenge}</p>
                    <span className="mt-4 inline-block text-xs text-copper">{cta("viewCase")}</span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>
      <section className="bg-alt pb-24 pt-4">
        <div className="container">
          <h2 className="mb-8 text-2xl">{t("archive")}</h2>
          <div className="columns-2 gap-3 md:columns-3 lg:columns-4">
            {ALL_IMAGES.map((src, i) => (
              <Reveal key={src} delay={(i % 8) * 0.04} className="mb-3 break-inside-avoid">
                <div className="group overflow-hidden rounded-2xl card-elevated">
                  <SiteImage src={src} alt="" ratio="aspect-[3/4]" className="rounded-2xl" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
