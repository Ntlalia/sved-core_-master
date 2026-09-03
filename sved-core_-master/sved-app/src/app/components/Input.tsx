import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className = "", ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-dark mb-2">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`w-full px-4 py-3 rounded-lg border bg-white transition-all duration-200
            ${error
              ? "border-red-alert focus:border-red-alert focus:ring-2 focus:ring-red-alert/20"
              : "border-gray-light focus:border-blue-medium focus:ring-2 focus:ring-blue-medium/20"
            }
            disabled:bg-gray-light disabled:cursor-not-allowed
            outline-none
            ${className}
          `}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-red-alert">{error}</p>
        )}
        {helperText && !error && (
          <p className="mt-1 text-sm text-gray-medium">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
