import { Check, Plus, CreditCard } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";

function FundsPaymentMethodList({ methods, selected, setSelected, onAddNew }) {
  return (
    <motion.div
      variants={fadeUp}
      custom={3}
      className="rounded-2xl border border-border bg-card p-5 shadow-card"
    >
      {/* HEADER */}
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="font-display text-sm font-semibold text-foreground">
            Payment Method
          </h3>
          <p className="text-xs text-muted-foreground">Choose source account</p>
        </div>

        <button
          onClick={onAddNew}
          className="flex items-center gap-1 text-xs font-semibold text-accent transition hover:opacity-80"
        >
          <Plus className="h-3.5 w-3.5" />
          Add new
        </button>
      </div>

      {/* LIST */}
      <div className="space-y-2">
        {methods.map(({ id, label, last4, icon: Icon, badge, color }) => (
          <button
            key={id}
            onClick={() => setSelected(id)}
            className={cn(
              "group flex w-full items-center gap-3 rounded-xl border p-3.5 text-left transition-all",
              selected === id
                ? "border-accent bg-accent/10 shadow-glow"
                : "border-border hover:border-accent/40 hover:bg-muted/30",
            )}
          >
            {/* ICON */}
            <div
              className={cn(
                "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all",
                color,
                selected === id && "scale-105",
              )}
            >
              {Icon ? (
                <Icon className="h-4.5 w-4.5" />
              ) : (
                <CreditCard className="h-4.5 w-4.5" />
              )}
            </div>

            {/* INFO */}
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-foreground">{label}</p>
              <p className="text-xs text-muted-foreground">•••• {last4}</p>
            </div>

            {/* BADGE */}
            {badge && (
              <span className="rounded-full border border-accent/20 bg-accent/10 px-2 py-0.5 text-[10px] font-semibold text-accent">
                {badge}
              </span>
            )}

            {/* SELECTED */}
            <div
              className={cn(
                "flex h-5 w-5 items-center justify-center rounded-full border transition-all",
                selected === id
                  ? "border-accent bg-accent text-accent-foreground"
                  : "border-border group-hover:border-accent/40",
              )}
            >
              {selected === id && <Check className="h-3.5 w-3.5" />}
            </div>
          </button>
        ))}
      </div>
    </motion.div>
  );
}

export default FundsPaymentMethodList;
