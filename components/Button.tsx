"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { useMagnetic } from "@/hooks/useMagnetic";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "whatsapp";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  asChild?: boolean;
  href?: string;
  external?: boolean;
  magnetic?: boolean;
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

const magneticVariants: ButtonVariant[] = ["primary", "whatsapp"];

function ButtonContent({
  children,
  magnetic,
}: {
  children: React.ReactNode;
  magnetic: boolean;
}) {
  const magneticRef = useMagnetic<HTMLSpanElement>(0.28);

  if (!magnetic) {
    return (
      <span className="inline-flex items-center justify-center gap-2">
        {children}
      </span>
    );
  }

  return (
    <span
      ref={magneticRef}
      className="inline-flex items-center justify-center gap-2 transition-transform duration-200 ease-out"
    >
      {children}
    </span>
  );
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      href,
      external,
      magnetic,
      children,
      ...props
    },
    ref
  ) => {
    const useMagneticEffect =
      magnetic ?? magneticVariants.includes(variant);

    const classes = cn(
      "inline-flex items-center justify-center font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bamboo focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
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
          <ButtonContent magnetic={useMagneticEffect}>
            {children}
          </ButtonContent>
        </a>
      );
    }

    return (
      <button ref={ref} className={classes} {...props}>
        <ButtonContent magnetic={useMagneticEffect}>
          {children}
        </ButtonContent>
      </button>
    );
  }
);

Button.displayName = "Button";
