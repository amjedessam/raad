import { ContactForm } from "@/components/contact-form";
import { SocialLinks } from "@/components/social-links";
import { SITE } from "@/lib/utils";
import { getLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("meta");
  return { title: t("contactTitle"), description: t("contactDescription") };
}

export default async function ContactPage() {
  const t = await getTranslations("contact");
  const locale = await getLocale();
  const isAr = locale === "ar";

  return (
    <>
      <section className="bg-[#0F1B2D] py-20 text-white">
        <div className="container max-w-3xl">
          <p className="text-xs tracking-luxury text-copper">{t("eyebrow")}</p>
          <h1 className="mt-4 text-4xl">{t("title")}</h1>
        </div>
      </section>
      <section className="bg-background py-20">
        <div className="container grid gap-10 lg:grid-cols-2">
          <div className="space-y-6 text-sm leading-7">
            <div>
              <p className="text-xs tracking-luxury text-copper">{t("phone")}</p>
              <a href={`tel:+${SITE.phoneIntl}`} className="mt-1 block text-lg text-ink">
                {SITE.phone}
              </a>
            </div>
            <div>
              <p className="text-xs tracking-luxury text-copper">{t("email")}</p>
              <a href={`mailto:${SITE.email}`} className="mt-1 block text-lg text-ink">
                {SITE.email}
              </a>
            </div>
            <div>
              <p className="text-xs tracking-luxury text-copper">{t("address")}</p>
              <p className="mt-1 text-lg text-ink">{isAr ? SITE.addressAr : SITE.addressEn}</p>
            </div>
            <SocialLinks />
            <div
              className="overflow-hidden rounded-[1.5rem]"
              style={{ border: "1px solid var(--border-card)" }}
            >
              <iframe title={t("map")} src={SITE.mapEmbed} className="h-72 w-full" loading="lazy" />
            </div>
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
