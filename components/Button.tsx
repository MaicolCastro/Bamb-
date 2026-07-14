"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "whatsapp";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  asChild?: boolean;
  href?: string;
  external?: boolean;
}

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-bamboo text-white hover:bg-bamboo-dark shadow-lg shadow-bamboo/20 hover:shadow-bamboo/35 hover:-translate-y-0.5",
  secondary:
    "bg-white text-bamboo border border-earth/20 hover:bg-earth-muted shadow-lg shadow-black/5 hover:-translate-y-0.5",
  outline:
    "border-2 border-white/80 text-white hover:bg-white/15 backdrop-blur-sm",
  ghost: "text-bamboo hover:bg-bamboo-muted",
  whatsapp:
    "bg-[#25D366] text-white hover:bg-[#20bd5a] shadow-lg shadow-[#25D366]/30 hover:-translate-y-0.5",
};

const sizes: Record<ButtonSize, string> = {
  sm: "px-5 py-2 text-sm rounded-full",
  md: "px-7 py-3 text-base rounded-full",
  lg: "px-8 py-4 text-lg rounded-full",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      href,
      external,
      children,
      ...props
    },
    ref
  ) => {
    const classes = cn(
      "inline-flex items-center justify-center gap-2 font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bamboo focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
      variants[variant],
      sizes[size],
      className
    );

    if (href) {
      return (
        <a
          href={href}
          className={classes}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          aria-label={typeof children === "string" ? children : undefined}
        >
          {children}
        </a>
      );
    }

    return (
      <button ref={ref} className={classes} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
