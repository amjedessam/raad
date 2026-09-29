import { faqs } from "@/content/site";
import { SITE } from "@/lib/utils";

export function JsonLd() {
  const origin = process.env.NEXT_PUBLIC_SITE_URL || "https://t-f-consult.com";
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: SITE.legalEn,
        alternateName: SITE.legalAr,
        url: origin,
        email: SITE.email,
        telephone: `+${SITE.phoneIntl}`,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Riyadh",
          addressCountry: "SA",
          streetAddress: SITE.addressEn,
        },
      },
      {
        "@type": "LocalBusiness",
        "@id": `${origin}#local`,
        name: SITE.legalEn,
        image: `${origin}/placeholder-logo-tf`,
        telephone: `+${SITE.phoneIntl}`,
        email: SITE.email,
        url: origin,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Riyadh",
          addressCountry: "SA",
          streetAddress: SITE.addressEn,
        },
        areaServed: "Riyadh",
        priceRange: "$$",
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((item) => ({
          "@type": "Question",
          name: item.ar.q,
          acceptedAnswer: { "@type": "Answer", text: item.ar.a },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
