import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "btn-slide inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper/60 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        copper:
          "btn-slide-copper bg-copper text-white hover:shadow-soft hover:-translate-y-0.5 px-6 py-3",
        navy: "bg-navy text-white hover:opacity-90 px-6 py-3 dark:bg-ink dark:text-navy",
        /* Light secondary: transparent + navy border — not washed gray */
        outline:
          "border border-white/35 bg-transparent text-white btn-slide-dark hover:text-white px-6 py-3",
        ghost:
          "border border-[#0F1B2D] bg-transparent text-[#0F1B2D] btn-slide-navy hover:text-white px-6 py-3 dark:border-line dark:text-ink dark:hover:text-[#0B121D]",
        link: "text-copper underline-offset-4 hover:underline px-0",
      },
      size: {
        default: "h-12",
        sm: "h-10 px-4 text-xs tracking-wide",
        lg: "h-14 px-8",
      },
    },
    defaultVariants: {
      variant: "copper",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  },
);
Button.displayName = "Button";

export { buttonVariants };
