import {
  ArrowDownLeft,
  ArrowUpRight,
  TrendingUp,
  CreditCard,
  Calendar,
} from "lucide-react";
import { motion } from "framer-motion";
import { scaleIn, stagger } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

function StatsRow({ stats }) {
  const currentMonth = format(new Date(), "MMM");
  
  const defaultStats = [
    {
      label: `Income (${currentMonth})`,
      value: stats?.income || "$0.00",
      change: "+0% vs last month",
      up: true,
      icon: ArrowDownLeft,
      iconBg: "bg-success/10",
      iconColor: "text-success",
    },
    {
      label: `Expenses (${currentMonth})`,
      value: stats?.expenses || "$0.00",
      change: "+0% vs last month",
      up: false,
      icon: ArrowUpRight,
      iconBg: "bg-destructive/10",
      iconColor: "text-destructive",
    },
    {
      label: "Transactions",
      value: stats?.count || "0",
      change: "Total activity",
      up: true,
      icon: CreditCard,
      iconBg: "bg-warning/10",
      iconColor: "text-warning",
    },
 
  ];

  return (
    <motion.div
      variants={stagger}
      className="grid grid-cols-2 gap-4 lg:grid-cols-4"
    >
      {defaultStats.map((stat, i) => (
        <motion.div
          key={stat.label}
          variants={scaleIn}
          custom={i}
          className="group relative overflow-hidden rounded-2xl border border-border bg-card p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
        >
          <div className="relative z-10">
            <div className="mb-3 flex items-center justify-between">
              <div
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-xl transition-colors duration-300",
                  stat.iconBg,
                )}
              >
                <stat.icon className={cn("h-4 w-4", stat.iconColor)} />
              </div>
              <span className={cn(
                "text-[10px] font-bold uppercase tracking-wider",
                stat.up ? "text-success" : "text-destructive"
              )}>
                {stat.change}
              </span>
            </div>
            
            <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/80">
              {stat.label}
            </p>
            
            <p className="mt-1 font-display text-2xl font-bold text-foreground">
              {stat.value}
            </p>
          </div>
          
          {/* Subtle background decoration */}
          <div className={cn(
            "absolute -right-2 -bottom-2 h-12 w-12 rounded-full opacity-[0.03] transition-transform duration-500 group-hover:scale-150",
            stat.iconBg
          )} />
        </motion.div>
      ))}
    </motion.div>
  );
}

export default StatsRow;
