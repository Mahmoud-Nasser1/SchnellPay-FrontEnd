import { Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export default function SendReviewStep({ selected, amount, note, loading, setPinOpen, setStep }) {
  return (
    <div className="space-y-5">
      <h3 className="font-display text-lg font-semibold text-foreground">
        Review Transfer
      </h3>
      <div className="space-y-3">
        {[
          { label: "To", value: `${selected.name} (${selected.email})` },
          { label: "Amount", value: `$${Number(amount).toFixed(2)}` },
          { label: "Fee", value: "Free" },
          { label: "Note", value: note || "\u2014" },
          { label: "Total", value: `$${Number(amount).toFixed(2)}` },
        ].map(({ label, value }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.06 }}
            className="flex justify-between border-b border-border/50 py-2 last:border-0"
          >
            <span className="text-sm text-muted-foreground">{label}</span>
            <span
              className={cn(
                "text-sm font-semibold text-foreground",
                label === "Total" && "text-base text-accent",
              )}
            >
              {value}
            </span>
          </motion.div>
        ))}
      </div>
      <div className="flex items-center gap-2 rounded-xl border border-accent/20 bg-accent/5 p-3">
        <Shield className="h-4 w-4 shrink-0 text-accent" />
        <p className="text-xs text-muted-foreground">
          This transfer is protected by SecureWallet's fraud detection system.
        </p>
      </div>
      <div className="flex gap-3">
        <Button
          variant="outline"
          size="lg"
          onClick={() => setStep("amount")}
          className="flex-1"
        >
          Back
        </Button>
        <Button
          variant="accent"
          size="lg"
          className="flex-1 shadow-glow"
          onClick={() => setPinOpen(true)}
          disabled={loading}
        >
          {loading ? (
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-accent-foreground/30 border-t-accent-foreground" />
              Sending...
            </div>
          ) : (
            <>Confirm & Send</>
          )}
        </Button>
      </div>
    </div>
  );
}
