interface BadgeProps {
  status: "pending" | "voted" | "disabled" | "active" | "confirmed" | "rejected" | "success";
  children: React.ReactNode;
  className?: string;
}

export function Badge({ status, children, className = "" }: BadgeProps) {
  const statusStyles = {
    pending: "bg-blue-light text-blue-medium border-blue-medium",
    voted: "bg-green-verified/10 text-green-verified border-green-verified",
    disabled: "bg-red-alert/10 text-red-alert border-red-alert",
    active: "bg-green-verified/10 text-green-verified border-green-verified animate-pulse",
    confirmed: "bg-green-verified/10 text-green-verified border-green-verified",
    rejected: "bg-red-alert/10 text-red-alert border-red-alert",
    success: "bg-green-verified/10 text-green-verified border-green-verified"
  };

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full border text-sm font-medium ${statusStyles[status]} ${className}`}>
      {children}
    </span>
  );
}
