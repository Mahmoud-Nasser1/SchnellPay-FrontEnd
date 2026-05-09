import { X, Bell, Check, DollarSign, Shield, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
const notifications = [
  {
    id: 1,
    type: "success",
    icon: DollarSign,
    iconBg: "bg-accent/15 text-accent",
    title: "Transfer received",
    message: "You received $250.00 from Alice Johnson",
    time: "2 min ago",
    read: false,
  },
  {
    id: 2,
    type: "security",
    icon: Shield,
    iconBg: "bg-primary/15 text-primary",
    title: "New login detected",
    message: "Login from Chrome on MacOS \u2022 San Francisco, CA",
    time: "1 hour ago",
    read: false,
  },
  {
    id: 3,
    type: "warning",
    icon: AlertTriangle,
    iconBg: "bg-warning/15 text-warning",
    title: "Large transaction alert",
    message: "Transaction of $2,500 to Acme Corp is pending",
    time: "3 hours ago",
    read: true,
  },
  {
    id: 4,
    type: "success",
    icon: Check,
    iconBg: "bg-success/15 text-success",
    title: "KYC Verified",
    message: "Your identity has been successfully verified",
    time: "Yesterday",
    read: true,
  },
];
function NotificationsPanel({ onClose }) {
  return (
    <div className="absolute right-0 top-full z-50 mt-2 w-80 animate-slide-down overflow-hidden rounded-2xl border border-border bg-card shadow-lifted">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <div className="flex items-center gap-2">
          <Bell className="h-4 w-4 text-foreground" />
          <span className="text-sm font-semibold text-foreground">Notifications</span>
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground">
            2
          </span>
        </div>
        <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
          <X className="h-4 w-4" />
        </button>
      </div>
      <div className="max-h-80 overflow-y-auto">
        {notifications.map((n) => (
          <div
            key={n.id}
            className={cn(
              "flex cursor-pointer items-start gap-3 border-b border-border/50 px-4 py-3 transition-colors last:border-0 hover:bg-muted/40",
              !n.read && "bg-accent/5",
            )}
          >
            <div
              className={cn(
                "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl",
                n.iconBg,
              )}
            >
              <n.icon className="h-4 w-4" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm font-semibold leading-tight text-foreground">{n.title}</p>
                {!n.read && <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-accent" />}
              </div>
              <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{n.message}</p>
              <p className="mt-1 text-xs text-muted-foreground/60">{n.time}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="border-t border-border px-4 py-3 text-center">
        <button className="text-xs font-medium text-accent hover:underline">
          View all notifications
        </button>
      </div>
    </div>
  );
}
export { NotificationsPanel as default };
