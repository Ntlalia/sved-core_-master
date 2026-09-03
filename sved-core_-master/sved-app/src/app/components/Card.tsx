import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "primary" | "dark";
  onClick?: () => void;
  selected?: boolean;
  hoverable?: boolean;
}

export function Card({ children, className = "", variant = "default", onClick, selected, hoverable }: CardProps) {
  const baseStyles = "rounded-xl p-6 transition-all duration-200";

  const variantStyles = {
    default: "bg-white border border-gray-light",
    primary: "bg-blue-light border border-blue-medium/20",
    dark: "bg-blue-institutional text-white"
  };

  const interactionStyles = onClick || hoverable
    ? "cursor-pointer hover:shadow-hover"
    : "";

  const selectedStyles = selected
    ? "border-blue-medium border-2 bg-blue-light shadow-hover"
    : "";

  return (
    <div
      onClick={onClick}
      className={`${baseStyles} ${variantStyles[variant]} ${interactionStyles} ${selectedStyles} ${className}`}
      style={{ boxShadow: "var(--shadow-card)" }}
    >
      {children}
    </div>
  );
}
