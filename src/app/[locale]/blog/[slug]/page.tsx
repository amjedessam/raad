import { posts } from "@/content/site";
import { SiteImage } from "@/components/site-image";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { notFound } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};
  const locale = await getLocale();
  const copy = locale === "ar" ? post.ar : post.en;
  return { title: copy.title, description: copy.excerpt };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();
  const locale = await getLocale();
  const copy = locale === "ar" ? post.ar : post.en;
  const cta = await getTranslations("cta");

  return (
    <article className="container max-w-3xl py-16">
      <p className="text-xs text-ink/40">{post.date}</p>
      <h1 className="mt-4 text-4xl leading-tight">{copy.title}</h1>
      <div className="mt-8">
        <SiteImage src={post.image} alt={copy.title} />
      </div>
      <div className="mt-10 space-y-6 text-[17px] leading-8 text-ink/80">
        {copy.body.map((p) => (
          <p key={p.slice(0, 24)}>{p}</p>
        ))}
      </div>
      <Button asChild className="mt-12">
        <Link href="/quote">{cta("quote")}</Link>
      </Button>
    </article>
  );
}
