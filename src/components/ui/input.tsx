import { cn } from "@/lib/utils";
import { InputHTMLAttributes, forwardRef } from "react";

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
                "flex h-12 w-full rounded-xl border border-line bg-card px-4 text-sm text-ink outline-none transition focus:border-copper focus:ring-2 focus:ring-copper/20",
        className,
      )}
      {...props}
    />
  ),
);
Input.displayName = "Input";
