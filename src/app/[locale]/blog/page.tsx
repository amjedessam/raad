import { posts } from "@/content/site";
import { SiteImage } from "@/components/site-image";
import { Reveal } from "@/components/reveal";
import { Link } from "@/i18n/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("meta");
  return { title: t("blogTitle"), description: t("blogDescription") };
}

export default async function BlogPage() {
  const t = await getTranslations("blog");
  const locale = await getLocale();
  const isAr = locale === "ar";

  return (
    <>
      <section className="bg-[#0F1B2D] py-20 text-white">
        <div className="container max-w-3xl">
          <p className="text-xs tracking-luxury text-copper">{t("eyebrow")}</p>
          <h1 className="mt-4 text-4xl md:text-5xl">{t("title")}</h1>
        </div>
      </section>
      <section className="bg-background py-20">
        <div className="container grid gap-10 md:grid-cols-2">
          {posts.map((post, i) => {
            const copy = isAr ? post.ar : post.en;
            return (
              <Reveal key={post.slug} delay={i * 0.09}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="card-interactive group block overflow-hidden rounded-[1.5rem] bg-card"
                >
                  <SiteImage src={post.image} alt={copy.title} className="rounded-none" />
                  <div className="p-6">
                    <p className="text-xs text-ink-muted">{post.date}</p>
                    <h2 className="mt-2 text-2xl transition group-hover:text-copper">{copy.title}</h2>
                    <p className="mt-3 text-sm leading-7 text-ink-muted">{copy.excerpt}</p>
                    <span className="mt-4 inline-block text-xs text-copper">{t("read")}</span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>
    </>
  );
}
