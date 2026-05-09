import {
  ArrowDownLeft,
  ArrowUpRight,
  TrendingUp,
  CreditCard,
} from "lucide-react";
import { motion } from "framer-motion";
import { scaleIn, stagger } from "@/lib/motion";
import { cn } from "@/lib/utils";

const statsData = [
  {
    label: "Income (Jul)",
    value: "$8,200",
    change: "+18%",
    up: true,
    icon: ArrowDownLeft,
    iconBg: "bg-success/10",
    iconColor: "text-success",
  },
  {
    label: "Expenses (Jul)",
    value: "$3,800",
    change: "+5%",
    up: false,
    icon: ArrowUpRight,
    iconBg: "bg-destructive/10",
    iconColor: "text-destructive",
  },

  {
    label: "Transactions",
    value: "47",
    change: "+12",
    up: true,
    icon: CreditCard,
    iconBg: "bg-warning/10",
    iconColor: "text-warning",
  },
];

function StatsRow() {
  return (
    <motion.div
      variants={stagger}
      className="grid grid-cols-2 gap-3 md:grid-cols-4"
    >
      {statsData.map((stat, i) => (
        <motion.div
          key={stat.label}
          variants={scaleIn}
          custom={i}
          className="rounded-2xl border border-border bg-card p-4 shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lifted"
        >
          <div className="mb-3 flex items-start justify-between">
            <p className="text-xs font-medium leading-tight text-muted-foreground">
              {stat.label}
            </p>
            <div
              className={cn(
                "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg",
                stat.iconBg,
              )}
            >
              <stat.icon className={cn("h-3.5 w-3.5", stat.iconColor)} />
            </div>
          </div>
          <p className="font-display text-xl font-bold text-foreground">
            {stat.value}
          </p>
          <p
            className={cn(
              "mt-1 text-xs font-medium",
              stat.up ? "text-success" : "text-destructive",
            )}
          >
            {stat.change} vs last month
          </p>
        </motion.div>
      ))}
    </motion.div>
  );
}

export default StatsRow;
