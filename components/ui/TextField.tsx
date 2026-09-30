import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

type TextFieldProps = Omit<ComponentProps<"input">, "id"> & {
  id: string;
  label: string;
  /** Validation message shown under the field (also marks it invalid for assistive tech). */
  error?: string;
};

/** Labelled input from the auth forms (52px, 12px radius, gray border). */
export function TextField({ id, label, error, className, ...inputProps }: TextFieldProps) {
  const errorId = `${id}-error`;

  return (
    <div className="flex w-full flex-col gap-2">
      <label htmlFor={id} className="text-label-s font-medium text-ink">
        {label}
      </label>
      <input
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        // 23px + 1px border = the design's 24px inner padding (Figma strokes don't take space)
        className={cn(
          "h-[52px] w-full rounded-md border bg-white px-[23px] text-body-l text-ink transition-colors outline-none placeholder:text-gray-400 focus:border-primary",
          error ? "border-danger" : "border-gray-100",
          className,
        )}
        {...inputProps}
      />
      {error && (
        <p id={errorId} className="text-[12px] leading-[19px] text-danger">
          {error}
        </p>
      )}
    </div>
  );
}
