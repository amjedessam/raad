import { routing } from "@/i18n/routing";

export default function sitemap() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const paths = [
    "",
    "/about",
    "/services",
    "/services/architectural",
    "/services/structural",
    "/services/surveying",
    "/services/permits",
    "/services/interior",
    "/services/quantities",
    "/work",
    "/work/north-riyadh-villa",
    "/work/olaya-commercial",
    "/work/najd-majlis",
    "/work/plot-subdivision",
    "/blog",
    "/blog/quantity-takeoff-2026",
    "/blog/building-permit-riyadh",
    "/blog/certified-survey",
    "/blog/choose-architect-riyadh",
    "/quote",
    "/contact",
  ];

  return routing.locales.flatMap((locale) =>
    paths.map((path) => ({
      url:
        locale === "ar"
          ? `${base}${path || "/"}`
          : `${base}/en${path || ""}`,
      lastModified: new Date(),
      alternates: {
        languages: {
          ar: `${base}${path || "/"}`,
          en: `${base}/en${path || ""}`,
        },
      },
    })),
  );
}
