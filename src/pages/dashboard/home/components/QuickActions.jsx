import { Send, Download, Plus, CreditCard } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const quickActions = [
  {
    icon: Send,
    label: "Send",
    to: "/dashboard/send",
    bg: "bg-accent/10 hover:bg-accent group-hover:bg-accent",
    icon_color: "text-accent group-hover:text-accent-foreground",
    label_color: "text-accent group-hover:text-accent-foreground",
  },
  {
    icon: Download,
    label: "Receive",
    to: "/dashboard/receive",
    bg: "bg-primary/10 hover:bg-primary group-hover:bg-primary",
    icon_color: "text-primary dark:text-primary-foreground group-hover:text-primary-foreground",
    label_color: "text-primary dark:text-primary-foreground group-hover:text-primary-foreground",
  },
  {
    icon: Plus,
    label: "Add Money",
    to: "/dashboard/funds",
    bg: "bg-success/10 hover:bg-success group-hover:bg-success",
    icon_color: "text-success group-hover:text-success-foreground",
    label_color: "text-success group-hover:text-success-foreground",
  },
  {
    icon: CreditCard,
    label: "Pay Bills",
    to: "/dashboard/bills",
    bg: "bg-warning/10 hover:bg-warning group-hover:bg-warning",
    icon_color: "text-warning group-hover:text-warning-foreground",
    label_color: "text-warning group-hover:text-warning-foreground",
  },
];

function QuickActions() {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-display text-sm font-semibold text-foreground">Quick Actions</h3>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {quickActions.map(({ icon: Icon, label, to, bg, icon_color, label_color }) => (
          <Link
            key={label}
            to={to}
            className={cn(
              "group flex flex-col items-center justify-center gap-2.5 rounded-2xl py-5",
              "transition-all duration-200 hover:scale-[1.03] active:scale-[0.98]",
              bg,
            )}
          >
            <Icon className={cn("h-5 w-5 transition-colors", icon_color)} />
            <span className={cn("text-xs font-semibold transition-colors", label_color)}>
              {label}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default QuickActions;
