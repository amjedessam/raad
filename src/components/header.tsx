"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { SITE } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import { Button } from "./ui/button";
import { ThemeToggle } from "./theme-toggle";
import { SocialLinks } from "./social-links";

const links = [
  { href: "/", key: "home" as const },
  { href: "/about", key: "about" as const },
  { href: "/services", key: "services" as const },
  { href: "/work", key: "work" as const },
  { href: "/blog", key: "blog" as const },
  { href: "/contact", key: "contact" as const },
];

export function Header() {
  const t = useTranslations("nav");
  const cta = useTranslations("cta");
  const locale = useLocale();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line/80 bg-background/80 text-ink backdrop-blur-xl">
      <div className="container flex h-[4.5rem] items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-navy text-xs font-semibold tracking-wide text-white dark:bg-copper">
            ر ع
          </div>
          <div className="leading-tight">
            <p className="text-sm font-semibold">{SITE.nameAr}</p>
            <p className="text-[10px] tracking-luxury text-ink/50">{SITE.nameEn}</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-7 text-sm text-ink/60 xl:flex">
          {links.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`relative transition hover:text-copper ${pathname === item.href ? "text-ink" : ""}`}
            >
              {t(item.key)}
              {pathname === item.href && (
                <span className="absolute -bottom-1 start-0 h-px w-full bg-copper" />
              )}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <SocialLinks className="hidden lg:flex" />
          <ThemeToggle />
          <Link
            href={pathname || "/"}
            locale={locale === "ar" ? "en" : "ar"}
            className="hidden text-xs tracking-luxury text-ink/50 hover:text-copper sm:inline"
          >
            {t("language")}
          </Link>
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link href="/quote">{cta("quote")}</Link>
          </Button>
          <button className="xl:hidden" onClick={() => setOpen((v) => !v)} aria-label="Menu">
            {open ? <X className="stroke-[1.25]" /> : <Menu className="stroke-[1.25]" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-line bg-background px-6 py-6 xl:hidden">
          <div className="flex flex-col gap-4 text-sm">
            {links.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
                {t(item.key)}
              </Link>
            ))}
            <Link href="/quote" onClick={() => setOpen(false)}>
              {cta("quote")}
            </Link>
            <Link href={pathname || "/"} locale={locale === "ar" ? "en" : "ar"}>
              {t("language")}
            </Link>
            <SocialLinks />
          </div>
        </div>
      )}
    </header>
  );
}
