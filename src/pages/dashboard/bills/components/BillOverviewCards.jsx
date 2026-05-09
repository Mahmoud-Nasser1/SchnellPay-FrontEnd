import { CreditCard, AlertCircle, Check } from "lucide-react";
import { motion } from "framer-motion";
import { scaleIn, stagger } from "@/lib/motion";

function BillOverviewCards({ totalDue, dueSoon }) {
  const cards = [
    {
      label: "Total Monthly Bills",
      value: `$${totalDue.toFixed(2)}`,
      sub: "6 active bills",
      icon: CreditCard,
      color: "text-primary",
    },
    {
      label: "Due Soon",
      value: `${dueSoon.length}`,
      sub: "Within 7 days",
      icon: AlertCircle,
      color: "text-destructive",
    },
    {
      label: "Bills Paid (Jun)",
      value: "4",
      sub: "$274.90 saved",
      icon: Check,
      color: "text-success",
    },
  ];

  return (
    <motion.div variants={stagger} className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {cards.map(({ label, value, sub, icon: Icon, color }, i) => (
        <motion.div
          key={label}
          variants={scaleIn}
          custom={i}
          className="rounded-2xl border border-border bg-card p-5 shadow-card transition-all hover:shadow-lifted"
        >
          <div className="mb-3 flex items-center justify-between">
            <p className="text-xs font-medium text-muted-foreground">{label}</p>
            <Icon className={`h-4 w-4 ${color}`} />
          </div>
          <p className="font-display text-2xl font-bold text-foreground">{value}</p>
          <p className={`mt-1 text-xs font-medium ${color}`}>{sub}</p>
        </motion.div>
      ))}
    </motion.div>
  );
}

export default BillOverviewCards;
