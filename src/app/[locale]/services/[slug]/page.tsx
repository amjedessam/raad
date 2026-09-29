import { services } from "@/content/site";
import { LineIcon } from "@/components/line-icon";
import { SiteImage } from "@/components/site-image";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/reveal";
import { SITE } from "@/lib/utils";
import { notFound } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};
  const locale = await getLocale();
  const copy = locale === "ar" ? service.ar : service.en;
  return { title: `${copy.title} | Eng. Raad Alomari`, description: copy.short };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();
  const locale = await getLocale();
  const cta = await getTranslations("cta");
  const copy = locale === "ar" ? service.ar : service.en;

  return (
    <>
      <section className="bg-[#0F1B2D] py-20 text-white">
        <div className="container grid items-center gap-10 lg:grid-cols-2">
          <div>
            <LineIcon name={service.icon} className="text-copper" />
            <h1 className="mt-4 text-4xl md:text-5xl">{copy.title}</h1>
            <p className="mt-5 text-xl text-white/70">{copy.hero}</p>
            <div className="mt-8 flex gap-3">
              <Button asChild>
                <Link href="/quote">{cta("quote")}</Link>
              </Button>
              <Button asChild variant="outline">
                <a href={SITE.whatsapp}>{cta("whatsapp")}</a>
              </Button>
            </div>
          </div>
          <SiteImage src={service.image} alt={copy.title} />
        </div>
      </section>

      <section className="container grid gap-12 py-20 lg:grid-cols-12">
        <Reveal className="lg:col-span-7">
          <p className="leading-8 text-ink/75">{copy.intro}</p>
          <p className="mt-6 leading-8 text-ink/75">{copy.body}</p>
        </Reveal>
        <Reveal delay={0.1} className="lg:col-span-5">
          <aside className="card-elevated rounded-[1.5rem] bg-card p-8">
            <h2 className="text-xl">{copy.title}</h2>
            <ul className="mt-5 space-y-3 text-sm text-ink/70">
              {copy.offerings.map((item) => (
                <li key={item} className="border-b border-line pb-3">
                  {item}
                </li>
              ))}
            </ul>
          </aside>
        </Reveal>
      </section>

      <section className="bg-alt py-16">
        <div className="container grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {copy.benefits.map((b, i) => (
            <Reveal key={b} delay={i * 0.06}>
              <div className="card-elevated rounded-2xl bg-card p-6 text-sm leading-7">
                {b}
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
