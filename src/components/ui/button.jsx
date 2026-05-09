import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium",
    "ring-offset-background transition-all duration-200",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
    "active:scale-[0.97]",
  ].join(" "),
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-sm",
        outline:
          "border border-border bg-background text-foreground hover:bg-muted hover:border-border/80",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/70 border border-border/50",
        ghost: "text-foreground hover:bg-muted hover:text-foreground",
        link: "text-accent underline-offset-4 hover:underline p-0 h-auto",
        accent:
          "bg-accent text-accent-foreground hover:bg-accent/90 shadow-glow hover:shadow-glow font-semibold",
        navy: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-navy font-semibold",
        "accent-outline":
          "border border-accent/50 text-accent bg-accent/5 hover:bg-accent/10 hover:border-accent/70",
        "ghost-muted": "text-muted-foreground hover:text-foreground hover:bg-muted",
      },
      size: {
        default: "h-10 px-4 py-2 text-sm rounded-lg",
        sm: "h-8 px-3 py-1.5 text-xs rounded-md gap-1.5",
        lg: "h-11 px-6 text-sm rounded-xl",
        xl: "h-12 px-8 text-base rounded-xl",
        icon: "h-9 w-9 rounded-lg",
        "icon-sm": "h-8 w-8 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);
const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
});
Button.displayName = "Button";
export { Button, buttonVariants };
