import { motion } from "framer-motion";
import { scaleIn } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function KYCStats({ stats }) {
  const statItems = [
    { label: "Pending Review", value: stats.pending, color: "text-warning" },
    { label: "Total Approved", value: stats.approved, color: "text-accent" },
    { label: "Total Rejected", value: stats.rejected, color: "text-destructive" },
  ];

  return (
    <div className="grid grid-cols-3 gap-4">
      {statItems.map(({ label, value, color }, i) => (
        <motion.div
          key={label}
          variants={scaleIn}
          custom={i}
          className="rounded-xl border border-border bg-card p-4 text-center shadow-card"
        >
          <p className={cn("font-display text-3xl font-bold", color)}>{value}</p>
          <p className="mt-1 text-xs text-muted-foreground">{label}</p>
        </motion.div>
      ))}
    </div>
  );
}
