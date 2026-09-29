import { services } from "@/content/site";
import { LineIcon } from "@/components/line-icon";
import { SiteImage } from "@/components/site-image";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("meta");
  return { title: t("servicesTitle"), description: t("servicesDescription") };
}

export default async function ServicesPage() {
  const t = await getTranslations("services");
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
      <section className="container grid gap-8 py-20">
        {services.map((s, i) => {
          const copy = isAr ? s.ar : s.en;
          return (
            <Reveal key={s.slug} delay={i * 0.08}>
              <article className="card-interactive group grid items-center gap-8 rounded-[2rem] bg-card p-6 lg:grid-cols-2 lg:p-10">
                <div className="overflow-hidden rounded-[1.5rem]">
                  <SiteImage src={s.image} alt={copy.title} />
                </div>
                <div>
                  <LineIcon name={s.icon} className="card-icon text-copper" />
                  <h2 className="mt-4 text-3xl">{copy.title}</h2>
                  <p className="mt-4 leading-8 text-ink/70">{copy.intro}</p>
                  <Button asChild className="mt-6">
                    <Link href={`/services/${s.slug}`}>{cta("readMore")}</Link>
                  </Button>
                </div>
              </article>
            </Reveal>
          );
        })}
      </section>
    </>
  );
}
