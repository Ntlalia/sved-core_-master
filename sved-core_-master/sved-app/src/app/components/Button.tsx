import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "destructive" | "ghost";
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", className = "", disabled, isLoading, children, ...props }, ref) => {
    const baseStyles = "px-6 py-3 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed";

    const variantStyles = {
      primary: "bg-blue-institutional text-white hover:shadow-hover active:scale-[0.98]",
      secondary: "bg-blue-medium text-white hover:shadow-hover active:scale-[0.98]",
      destructive: "bg-red-alert text-white hover:shadow-hover active:scale-[0.98]",
      ghost: "bg-transparent text-gray-dark hover:bg-gray-light active:scale-[0.98]"
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={`${baseStyles} ${variantStyles[variant]} ${className}`}
        style={{ boxShadow: variant !== "ghost" ? "var(--shadow-card)" : undefined }}
        {...props}
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {children}
          </span>
        ) : children}
      </button>
    );
  }
);

Button.displayName = "Button";
