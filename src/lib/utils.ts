import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const SITE = {
  nameAr: "المهندس رعد العمري",
  nameEn: "Eng. Raad Alomari",
  legalAr: "المهندس رعد العمري للاستشارات الهندسية المعمارية",
  legalEn: "Eng. Raad Alomari for Architectural Engineering Consultancy",
  phone: "0576421281",
  phoneIntl: "966576421281",
  email: "amjedelieli@gmail.com",
  addressAr: "الرياض، المملكة العربية السعودية",
  addressEn: "Riyadh, Saudi Arabia",
  whatsapp: "https://wa.me/966576421281",
  mapEmbed: "https://www.google.com/maps?q=Riyadh+Saudi+Arabia&output=embed",
  social: {
    facebook: "https://www.facebook.com/",
    instagram: "https://www.instagram.com/",
    linkedin: "https://www.linkedin.com/",
  },
} as const;
