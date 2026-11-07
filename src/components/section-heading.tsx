import { cn } from "cn";

type SectionHeadingProps = {
  label: string;
  title: string;
  className?: string;
  titleClassName?: string;
};

export default function SectionHeading({
  label,
  title,
  className,
  titleClassName,
}: SectionHeadingProps) {
  return (
    <div className={cn("flex flex-col items-center text-center", className)}>
      <span className="inline-flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.22em] text-[#8b7cf6] sm:text-[11px]">
        <span aria-hidden className="size-1 rounded-full bg-[#8b7cf6]" />
        {label}
        <span aria-hidden className="size-1 rounded-full bg-[#8b7cf6]" />
      </span>
      <h2
        className={cn(
          "mt-4 max-w-[640px] text-3xl font-semibold leading-[1.15] tracking-tight text-balance text-white sm:text-4xl lg:text-[44px]",
          titleClassName,
        )}
      >
        {title}
      </h2>
    </div>
  );
}
