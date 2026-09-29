import { Link } from "@/i18n/navigation";
import { SITE } from "@/lib/utils";
import { services } from "@/content/site";
import { getLocale, getTranslations } from "next-intl/server";
import { SocialLinks } from "./social-links";

export async function Footer() {
  const t = await getTranslations("footer");
  const nav = await getTranslations("nav");
  const locale = await getLocale();
  const isAr = locale === "ar";

  return (
    <footer className="bg-[#0F1B2D] text-white">
      <div className="container grid gap-12 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-white/10 text-sm tracking-wide">
            ر ع
          </div>
          <h2 className="text-xl">{isAr ? SITE.legalAr : SITE.legalEn}</h2>
          <p className="mt-3 max-w-md text-sm leading-7 text-white/60">{t("tagline")}</p>
          <SocialLinks inverted className="mt-6" />
        </div>
        <div>
          <p className="mb-4 text-xs tracking-luxury text-white/40">{nav("services")}</p>
          <ul className="space-y-2 text-sm text-white/70">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className="hover:text-copper">
                  {isAr ? s.ar.title : s.en.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="text-sm text-white/70">
          <p className="mb-4 text-xs tracking-luxury text-white/40">{nav("contact")}</p>
          <p>{SITE.phone}</p>
          <p className="mt-2">{SITE.email}</p>
          <p className="mt-2 leading-7">{isAr ? SITE.addressAr : SITE.addressEn}</p>
        </div>
      </div>
      <div className="border-t border-white/10 py-6 text-center text-xs text-white/35">
        {t("rights")} {new Date().getFullYear()}
      </div>
    </footer>
  );
}
