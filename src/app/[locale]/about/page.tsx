import { team } from "@/content/site";
import { MEDIA } from "@/content/media";
import { FaqList } from "@/components/faq-list";
import { SiteImage } from "@/components/site-image";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("meta");
  return { title: t("aboutTitle"), description: t("aboutDescription") };
}

export default async function AboutPage() {
  const t = await getTranslations("aboutPage");
  const g = await getTranslations("goals");
  const cta = await getTranslations("cta");
  const locale = await getLocale();
  const isAr = locale === "ar";
  const certs = t.raw("certs") as string[];
  const goals = ["excellence", "innovation", "sustainability", "community"] as const;

  return (
    <>
      <section className="bg-[#0F1B2D] py-20 text-white">
        <div className="container max-w-3xl">
          <p className="text-xs tracking-luxury text-copper">{t("eyebrow")}</p>
          <h1 className="mt-4 text-4xl md:text-5xl">{t("title")}</h1>
          <p className="mt-6 leading-8 text-white/70">{t("lead")}</p>
        </div>
      </section>

      <section className="container grid gap-10 py-20 lg:grid-cols-2">
        <Reveal>
          <SiteImage src={MEDIA.about} alt={t("title")} ratio="aspect-[4/3]" />
        </Reveal>
        <div className="grid gap-8">
          <Reveal delay={0.08}>
            <h2 className="text-2xl">{t("visionTitle")}</h2>
            <p className="mt-3 leading-8 text-ink/70">{t("vision")}</p>
          </Reveal>
          <Reveal delay={0.16}>
            <h2 className="text-2xl">{t("missionTitle")}</h2>
            <p className="mt-3 leading-8 text-ink/70">{t("mission")}</p>
          </Reveal>
        </div>
      </section>

      <section className="bg-alt py-20">
        <div className="container">
          <h2 className="mb-10 text-3xl">{g("title")}</h2>
          <div className="grid gap-6 md:grid-cols-4">
            {goals.map((key, i) => (
              <Reveal key={key} delay={i * 0.08}>
                <div className="card-interactive rounded-[1.5rem] bg-card p-6">
                  <h3 className="text-lg">{g(`items.${key}.title`)}</h3>
                  <p className="mt-3 text-sm leading-7 text-ink/65">{g(`items.${key}.body`)}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="container py-20">
        <h2 className="text-3xl">{t("teamTitle")}</h2>
        <p className="mt-3 text-ink/60">{t("teamSubtitle")}</p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member, i) => {
            const copy = isAr ? member.ar : member.en;
            return (
              <Reveal key={member.id} delay={i * 0.08}>
                <div className="card-elevated rounded-[1.5rem] bg-card p-6">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-mist text-sm text-copper">
                    {copy.name.slice(0, 1)}
                  </div>
                  <h3 className="mt-4">{copy.name}</h3>
                  <p className="text-sm text-ink/50">{copy.role}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="section-gradient py-20">
        <div className="container">
          <h2 className="text-3xl">{t("certsTitle")}</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {certs.map((c, i) => (
              <Reveal key={c} delay={i * 0.08}>
                <div className="card-elevated rounded-2xl bg-card p-8 text-sm leading-7 text-ink/70">
                  {c}
                </div>
              </Reveal>
            ))}
          </div>
          <Button asChild className="mt-10">
            <Link href="/quote">{cta("quote")}</Link>
          </Button>
        </div>
      </section>
      <FaqList />
    </>
  );
}
