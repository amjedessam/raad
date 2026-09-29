import { LucideIcon } from "lucide-react";
import * as Icons from "lucide-react";
import { cn } from "@/lib/utils";

export function LineIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Icon = (Icons as unknown as Record<string, LucideIcon>)[name] || Icons.Circle;
  return <Icon className={cn("h-6 w-6 stroke-[1.25]", className)} />;
}
