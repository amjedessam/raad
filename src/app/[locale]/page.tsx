import { Link } from "@/i18n/navigation";
import { SITE } from "@/lib/utils";
import { ALL_IMAGES, MEDIA } from "@/content/media";
import { partners, projects, services, testimonials } from "@/content/site";
import { Button } from "@/components/ui/button";
import { FaqList } from "@/components/faq-list";
import { LineIcon } from "@/components/line-icon";
import { Reveal } from "@/components/reveal";
import { SiteImage } from "@/components/site-image";
import { SocialLinks } from "@/components/social-links";
import { HeroEditorial } from "@/components/hero-editorial";
import { getLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("meta");
  return { title: t("homeTitle"), description: t("homeDescription") };
}

export default async function HomePage() {
  const t = await getTranslations();
  const hero = await getTranslations("hero");
  const locale = await getLocale();
  const isAr = locale === "ar";

  return (
    <>
      <HeroEditorial
        imageSrc={MEDIA.hero}
        eyebrow={hero("eyebrow")}
        title={hero("title")}
        subtitle={hero("subtitle")}
      >
        <Button asChild>
          <Link href="/quote">{t("cta.quote")}</Link>
        </Button>
        <Button asChild variant="outline">
          <a href={SITE.whatsapp} target="_blank" rel="noreferrer">
            {t("cta.whatsapp")}
          </a>
        </Button>
        <SocialLinks inverted />
      </HeroEditorial>

      <section className="section-gradient py-24">
        <div className="container grid gap-12 lg:grid-cols-2">
          <Reveal>
            <p className="text-xs tracking-luxury text-copper">{t("aboutPreview.eyebrow")}</p>
            <h2 className="mt-3 max-w-lg text-3xl md:text-4xl">{t("aboutPreview.title")}</h2>
          </Reveal>
          <Reveal delay={0.09}>
            <p className="text-base leading-8 text-ink-muted">{t("aboutPreview.body")}</p>
            <Link href="/about" className="mt-6 inline-block text-sm text-copper">
              {t("cta.readMore")}
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="bg-alt py-24">
        <div className="container">
          <Reveal>
            <p className="text-xs tracking-luxury text-copper">{t("services.eyebrow")}</p>
            <h2 className="mt-3 max-w-2xl text-3xl md:text-4xl">{t("services.title")}</h2>
            <p className="mt-4 max-w-2xl text-ink-muted">{t("services.subtitle")}</p>
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => {
              const copy = isAr ? s.ar : s.en;
              return (
                <Reveal key={s.slug} delay={i * 0.09}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="card-interactive group block h-full rounded-[1.5rem] bg-card p-8"
                  >
                    <LineIcon name={s.icon} className="card-icon text-copper" />
                    <h3 className="mt-6 text-xl">{copy.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-ink-muted">{copy.short}</p>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-background py-24">
        <div className="container">
          <div className="mb-12 flex items-end justify-between gap-6">
            <div>
              <p className="text-xs tracking-luxury text-copper">{t("work.eyebrow")}</p>
              <h2 className="mt-3 max-w-xl text-3xl md:text-4xl">{t("work.title")}</h2>
            </div>
            <Link href="/work" className="hidden text-sm text-copper md:inline">
              {t("cta.viewAll")}
            </Link>
          </div>
          <div className="grid gap-8 lg:grid-cols-2">
            {projects.slice(0, 4).map((p, i) => {
              const copy = isAr ? p.ar : p.en;
              return (
                <Reveal key={p.slug} delay={i * 0.09}>
                  <Link
                    href={`/work/${p.slug}`}
                    className="card-interactive group block overflow-hidden rounded-[1.5rem] bg-card"
                  >
                    <SiteImage src={p.image} alt={copy.title} className="rounded-none" />
                    <div className="p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-xl transition group-hover:text-copper">{copy.title}</h3>
                          <p className="mt-2 text-sm text-ink-muted">
                            {isAr ? p.locationAr : p.locationEn} · {p.year}
                          </p>
                        </div>
                        <span className="text-xs text-copper">{t("cta.viewCase")}</span>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
          <div className="mt-16 columns-2 gap-3 md:columns-3 lg:columns-4">
            {ALL_IMAGES.slice(0, 12).map((src, i) => (
              <Reveal key={src} delay={i * 0.04} className="mb-3 break-inside-avoid">
                <div className="group overflow-hidden rounded-2xl card-elevated">
                  <SiteImage src={src} alt="" ratio="aspect-[4/5]" className="rounded-2xl" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-gradient py-24">
        <div className="container">
          <p className="text-xs tracking-luxury text-copper">{t("partners.eyebrow")}</p>
          <h2 className="mt-3 text-3xl">{t("partners.title")}</h2>
          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-6">
            {partners.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.08}>
                <div className="card-elevated flex aspect-[4/3] items-center justify-center rounded-2xl bg-card px-3 text-center text-xs text-ink-muted">
                  {isAr ? p.labelAr : p.labelEn}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-alt py-24">
        <div className="container">
          <p className="text-xs tracking-luxury text-copper">{t("testimonials.eyebrow")}</p>
          <h2 className="mt-3 max-w-xl text-3xl md:text-4xl">{t("testimonials.title")}</h2>
          <p className="mt-4 max-w-2xl text-ink-muted">{t("testimonials.subtitle")}</p>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {testimonials.map((item, i) => {
              const copy = isAr ? item.ar : item.en;
              return (
                <Reveal key={copy.name} delay={i * 0.1}>
                  <blockquote className="card-elevated rounded-[1.5rem] bg-card p-8">
                    <p className="text-[15px] leading-8 text-ink/80">&quot;{copy.quote}&quot;</p>
                    <footer className="mt-6 text-sm text-ink">
                      {copy.name}
                      <span className="mt-1 block text-ink-muted">{copy.role}</span>
                    </footer>
                  </blockquote>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <FaqList />

      <section className="relative overflow-hidden bg-[#0F1B2D] py-20 text-white">
        <div className="container relative z-10 grid items-center gap-8 lg:grid-cols-2">
          <div>
            <p className="text-xs tracking-luxury text-copper">{t("contactBand.eyebrow")}</p>
            <h2 className="mt-3 text-3xl md:text-4xl">{t("contactBand.title")}</h2>
            <p className="mt-4 max-w-lg text-white/65">{t("contactBand.body")}</p>
          </div>
          <div className="flex flex-wrap items-center gap-4 sm:gap-5">
            <Button asChild>
              <Link href="/quote">{t("cta.quote")}</Link>
            </Button>
            <Button asChild variant="outline">
              <a href={SITE.whatsapp}>{t("cta.whatsapp")}</a>
            </Button>
            <SocialLinks inverted />
          </div>
        </div>
      </section>
    </>
  );
}
