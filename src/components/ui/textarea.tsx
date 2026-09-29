import { cn } from "@/lib/utils";
import { TextareaHTMLAttributes, forwardRef } from "react";

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      "min-h-32 w-full rounded-xl border border-line bg-card px-4 py-3 text-sm text-ink outline-none transition focus:border-copper focus:ring-2 focus:ring-copper/20",
      className,
    )}
    {...props}
  />
));
Textarea.displayName = "Textarea";
