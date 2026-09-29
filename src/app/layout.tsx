import type { Metadata } from "next";
import { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: "المهندس رعد العمري للاستشارات الهندسية المعمارية",
  description: "مكتب هندسي في الرياض للتصميم المعماري والإنشائي والتراخيص",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
