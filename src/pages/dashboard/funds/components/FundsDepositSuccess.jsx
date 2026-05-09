import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { scaleUp } from "@/lib/motion";

function FundsDepositSuccess({ amount, onReset }) {
  return (
    <motion.div variants={scaleUp} initial="hidden" animate="visible" className="mx-auto max-w-md">
      <div className="rounded-2xl border border-border bg-card p-12 text-center shadow-card">
        <div className="gradient-success mx-auto mb-6 flex h-24 w-24 animate-bounce-in items-center justify-center rounded-full shadow-glow">
          <Check className="h-12 w-12 text-accent-foreground" />
        </div>
        <h2 className="mb-2 font-display text-2xl font-bold text-foreground">
          Deposit Successful!
        </h2>
        <p className="mb-1 text-muted-foreground">
          <span className="text-lg font-bold text-accent">${Number(amount).toFixed(2)}</span> has
          been added to your wallet.
        </p>
        <Button variant="accent" className="mt-6 shadow-glow" onClick={onReset}>
          Deposit More
        </Button>
      </div>
    </motion.div>
  );
}

export default FundsDepositSuccess;
