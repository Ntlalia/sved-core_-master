import { AlertCircle, CheckCircle, Info, XCircle } from "lucide-react";
import { ReactNode } from "react";

interface AlertProps {
  type: "success" | "error" | "warning" | "info";
  children: ReactNode;
  onClose?: () => void;
  className?: string;
}

export function Alert({ type, children, onClose, className = "" }: AlertProps) {
  const styles = {
    success: {
      bg: "bg-green-verified/10",
      border: "border-green-verified",
      text: "text-green-verified",
      icon: CheckCircle
    },
    error: {
      bg: "bg-red-alert/10",
      border: "border-red-alert",
      text: "text-red-alert",
      icon: XCircle
    },
    warning: {
      bg: "bg-gold-accent/10",
      border: "border-gold-accent",
      text: "text-gold-accent",
      icon: AlertCircle
    },
    info: {
      bg: "bg-blue-light",
      border: "border-blue-medium",
      text: "text-blue-medium",
      icon: Info
    }
  };

  const config = styles[type];
  const Icon = config.icon;

  return (
    <div className={`flex items-start gap-3 p-4 rounded-lg border ${config.bg} ${config.border} ${className}`}>
      <Icon className={`w-5 h-5 mt-0.5 ${config.text} flex-shrink-0`} />
      <div className="flex-1 text-sm text-gray-dark">
        {children}
      </div>
      {onClose && (
        <button onClick={onClose} className={`${config.text} hover:opacity-70`}>
          <XCircle className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
