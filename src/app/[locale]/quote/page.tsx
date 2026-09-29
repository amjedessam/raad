import { QuoteForm } from "@/components/quote-form";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("meta");
  return { title: t("quoteTitle"), description: t("quoteDescription") };
}

export default async function QuotePage() {
  const t = await getTranslations("quote");
  return (
    <section className="container max-w-3xl py-20">
      <p className="text-xs tracking-luxury text-copper">{t("eyebrow")}</p>
      <h1 className="mt-4 text-4xl md:text-5xl">{t("title")}</h1>
      <div className="mt-10">
        <QuoteForm />
      </div>
    </section>
  );
}
