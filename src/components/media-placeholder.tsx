import { cn } from "@/lib/utils";

type Props = {
  name: string;
  className?: string;
  ratio?: string;
};

export function MediaPlaceholder({ name, className, ratio = "aspect-[16/10]" }: Props) {
  return (
    <div
      className={cn(
        "relative flex w-full flex-col items-center justify-center overflow-hidden rounded-[1.5rem] border border-dashed border-line bg-gradient-to-br from-[#e8edf3] to-[#d5dde6] text-center",
        ratio,
        className,
      )}
      aria-label={name}
    >
      <span className="text-[10px] uppercase tracking-[0.22em] text-navy/40">Asset</span>
      <span className="mt-2 max-w-[90%] break-all px-4 font-mono text-xs text-navy/70">{name}</span>
      <span className="mt-3 text-[11px] text-navy/40">Replace with client photography / logo</span>
    </div>
  );
}
