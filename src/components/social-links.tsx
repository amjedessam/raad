import { SITE } from "@/lib/utils";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { href: SITE.social.facebook, label: "Facebook", Icon: Facebook },
  { href: SITE.social.instagram, label: "Instagram", Icon: Instagram },
  { href: SITE.social.linkedin, label: "LinkedIn", Icon: Linkedin },
] as const;

export function SocialLinks({ className, inverted = false }: { className?: string; inverted?: boolean }) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      {items.map(({ href, label, Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noreferrer"
          aria-label={label}
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-full border transition duration-300 hover:-translate-y-0.5 hover:rotate-6 hover:border-copper hover:text-copper",
            inverted ? "border-white/20 text-white" : "border-line text-ink",
          )}
        >
          <Icon className="h-4 w-4 stroke-[1.4]" />
        </a>
      ))}
    </div>
  );
}
