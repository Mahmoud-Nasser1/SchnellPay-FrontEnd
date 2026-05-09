import * as React from "react";
import { cn } from "@/lib/utils";
const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        // Base
        "flex h-11 w-full rounded-xl border bg-background px-3.5 py-2.5",
        "text-sm text-foreground",
        // Border & ring
        "border-border",
        "ring-offset-background",
        // Placeholder
        "placeholder:text-muted-foreground/55",
        // Focus
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/70 focus-visible:ring-offset-0",
        "focus-visible:border-ring/60",
        // File input
        "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground",
        // Disabled
        "disabled:cursor-not-allowed disabled:bg-muted/40 disabled:opacity-50",
        // Transition
        "transition-colors duration-150",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";
export { Input };
