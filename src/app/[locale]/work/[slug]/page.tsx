import { projects, services } from "@/content/site";
import { SiteImage } from "@/components/site-image";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { notFound } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  const locale = await getLocale();
  const copy = locale === "ar" ? project.ar : project.en;
  return { title: copy.title, description: copy.challenge };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();
  const locale = await getLocale();
  const isAr = locale === "ar";
  const copy = isAr ? project.ar : project.en;
  const t = await getTranslations("workPage");
  const cta = await getTranslations("cta");
  const related = services.find((s) => s.slug === project.category);

  return (
    <>
      <section className="bg-[#0F1B2D] py-16 text-white">
        <div className="container">
          <p className="text-xs tracking-luxury text-copper">
            {isAr ? project.locationAr : project.locationEn} · {project.year}
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl md:text-5xl">{copy.title}</h1>
        </div>
      </section>
      <section className="container py-12">
        <SiteImage src={project.image} alt={copy.title} ratio="aspect-[21/9]" sizes="100vw" />
        <div className="mt-12 grid gap-10 lg:grid-cols-3">
          <div>
            <h2 className="text-sm tracking-luxury text-copper">{t("client")}</h2>
            <p className="mt-2">{copy.client}</p>
            <p className="mt-4 text-sm text-ink/55">{isAr ? project.area : project.areaEn}</p>
          </div>
          <div className="space-y-8 lg:col-span-2">
            <div>
              <h2 className="text-2xl">{t("challenge")}</h2>
              <p className="mt-3 leading-8 text-ink/75">{copy.challenge}</p>
            </div>
            <div>
              <h2 className="text-2xl">{t("solution")}</h2>
              <p className="mt-3 leading-8 text-ink/75">{copy.solution}</p>
            </div>
            <div>
              <h2 className="text-2xl">{t("result")}</h2>
              <p className="mt-3 leading-8 text-ink/75">{copy.result}</p>
            </div>
          </div>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {project.gallery.map((img) => (
            <SiteImage key={img} src={img} alt={copy.title} />
          ))}
        </div>
        {related && (
          <p className="mt-10 text-sm">
            {t("related")}:{" "}
            <Link href={`/services/${related.slug}`} className="text-copper">
              {isAr ? related.ar.title : related.en.title}
            </Link>
          </p>
        )}
        <Button asChild className="mt-8">
          <Link href="/quote">{cta("quote")}</Link>
        </Button>
      </section>
    </>
  );
}
