import { Users, DollarSign, TrendingUp, Shield } from "lucide-react";
import { motion } from "framer-motion";
import { scaleIn, stagger } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function StatsCards({ stats }) {
  const statCards = [
    {
      label: "Total Users",
      value: stats.totalUsers.toLocaleString(),
      change: `+${stats.newUsersThisWeek}`,
      up: true,
      icon: Users,
      color: "text-primary dark:text-accent",
    },
    {
      label: "Transaction Volume",
      value: stats.totalVolume >= 1000000 
        ? `$${(stats.totalVolume / 1000000).toFixed(1)}M`
        : stats.totalVolume >= 1000 
          ? `$${(stats.totalVolume / 1000).toFixed(1)}K` 
          : `$${stats.totalVolume.toLocaleString()}`,
      change: "Total processed",
      up: true,
      icon: DollarSign,
      color: "text-accent",
    },
    {
      label: "Pending Trans.",
      value: stats.pendingTransactions,
      change: "Action required",
      up: false,
      icon: TrendingUp,
      color: "text-success",
    },
    {
      label: "Active Users",
      value: stats.activeUsers.toLocaleString(),
      change: stats.totalUsers > 0 
        ? `${((stats.activeUsers / stats.totalUsers) * 100).toFixed(1)}% of total`
        : "0%",
      up: true,
      icon: Shield,
      color: "text-destructive",
    },
  ];

  return (
    <motion.div variants={stagger} className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {statCards.map((s, i) => (
        <motion.div
          key={s.label}
          variants={scaleIn}
          custom={i}
          className="rounded-2xl border border-border bg-card p-5 shadow-card transition-all hover:shadow-lifted"
        >
          <div className="mb-3 flex items-center justify-between">
            <p className="text-xs font-medium text-muted-foreground">{s.label}</p>
            <s.icon className={cn("h-4 w-4", s.color)} />
          </div>
          <p className="font-display text-2xl font-bold text-foreground">{s.value}</p>
          <p
            className={cn("mt-1 text-xs font-medium", s.up ? "text-accent" : "text-destructive")}
          >
            {s.change} {s.up && s.label === "Total Users" ? "new" : ""}
          </p>
        </motion.div>
      ))}
    </motion.div>
  );
}
