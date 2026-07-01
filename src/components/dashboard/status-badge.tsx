import { Badge } from "@/components/ui/badge";

interface StatusBadgeProps {
  status: string;
  variant?: "default" | "secondary" | "destructive" | "outline";
  statusStyles?: Record<string, string>;
}

const defaultStatusStyles: Record<string, string> = {
  // Default status styles - can be overridden
  Active: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  Inactive: "bg-slate-100 text-slate-700 dark:bg-slate-800/50 dark:text-slate-400",
  Pending: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  Completed: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  Cancelled: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

export function StatusBadge({
  status,
  variant = "secondary",
  statusStyles = defaultStatusStyles
}: StatusBadgeProps) {
  const customStyle = statusStyles[status] || "";

  return (
    <Badge variant={variant} className={`text-xs font-medium ${customStyle}`}>
      {status}
    </Badge>
  );
}

export { defaultStatusStyles };
