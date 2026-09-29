"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [ready, setReady] = useState(false);

  useEffect(() => setReady(true), []);
  if (!ready) {
    return <span className="inline-block h-10 w-10" aria-hidden />;
  }

  const dark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(dark ? "light" : "dark")}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink transition duration-300 hover:border-copper hover:text-copper"
      aria-label={dark ? "Light mode" : "Dark mode"}
    >
      {dark ? <Sun className="h-4 w-4 stroke-[1.4]" /> : <Moon className="h-4 w-4 stroke-[1.4]" />}
    </button>
  );
}
