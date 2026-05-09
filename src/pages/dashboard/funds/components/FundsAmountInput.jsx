import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";

function FundsAmountInput({ amount, setAmount }) {
  return (
    <motion.div
      variants={fadeUp}
      custom={2}
      className="space-y-4 rounded-2xl border border-border bg-card p-5 shadow-card"
    >
      <div>
        <Label className="text-xs font-medium text-foreground">Amount</Label>
        <div className="relative mt-1.5">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-bold text-muted-foreground">
            $
          </span>
          <Input
            type="number"
            placeholder="0.00"
            className="h-16 pl-10 font-display text-2xl font-bold"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
      </div>
      {/* Quick amounts */}
      <div className="grid grid-cols-4 gap-2">
        {["50", "100", "500", "1000"].map((q) => (
          <button
            key={q}
            onClick={() => setAmount(q)}
            className={cn(
              "rounded-lg border py-2 text-sm font-semibold transition-all",
              amount === q
                ? "border-accent bg-accent/10 text-accent"
                : "border-border text-muted-foreground hover:border-accent/50 hover:text-foreground",
            )}
          >
            ${q}
          </button>
        ))}
      </div>
    </motion.div>
  );
}

export default FundsAmountInput;
