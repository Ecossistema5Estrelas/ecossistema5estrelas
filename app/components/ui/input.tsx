import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, "aria-invalid": ariaInvalid, ...props }, ref): JSX.Element => {
    return (
      <input
        ref={ref}
        id={props.id ?? props.name}
        name={props.name ?? props.id}
        aria-label={props["aria-label"] ?? props.placeholder ?? "input"}
        aria-invalid={ariaInvalid}
        className={cn(
          "flex h-10 w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-white placeholder-zinc-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };