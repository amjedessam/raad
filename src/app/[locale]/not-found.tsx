import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";

export default async function NotFound() {
  const t = await getTranslations("notFound");
  return (
    <section className="container py-32 text-center">
      <h1 className="text-4xl">{t("title")}</h1>
      <Link href="/" className="mt-6 inline-block text-copper">
        {t("back")}
      </Link>
    </section>
  );
}
