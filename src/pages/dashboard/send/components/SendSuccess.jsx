import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { scaleUp } from "@/lib/motion";

export default function SendSuccess({ selected, amount, setStep, setSelected, setAmount }) {
  return (
    <motion.div
      variants={scaleUp}
      initial="hidden"
      animate="visible"
      className="py-6 text-center"
    >
      <div className="gradient-success mx-auto mb-6 flex h-20 w-20 animate-bounce-in items-center justify-center rounded-full shadow-glow">
        <Check className="h-10 w-10 text-accent-foreground" />
      </div>
      <h2 className="mb-2 font-display text-2xl font-bold text-foreground">
        Transfer Sent!
      </h2>
      <p className="mb-6 text-muted-foreground">
        <span className="font-semibold text-accent">${Number(amount).toFixed(2)}</span> has
        been sent to <span className="font-semibold text-foreground">{selected.name}</span>
      </p>
      <div className="mb-6 space-y-2 rounded-xl border border-border bg-muted/50 p-4 text-left">
        {[
          { label: "Transaction ID", value: "#TXN-847362" },
          { label: "Status", value: "\u2713 Completed" },
          { label: "Date", value: new Date().toLocaleDateString() },
        ].map(({ label, value }) => (
          <div key={label} className="flex justify-between text-sm">
            <span className="text-muted-foreground">{label}</span>
            <span className="font-medium text-foreground">{value}</span>
          </div>
        ))}
      </div>
      <div className="flex gap-3">
        <Button variant="outline" className="flex-1">
          Download Receipt
        </Button>
        <Button
          variant="accent"
          className="flex-1 shadow-glow"
          onClick={() => {
            setStep("recipient");
            setSelected(null);
            setAmount("");
          }}
        >
          Send Again
        </Button>
      </div>
    </motion.div>
  );
}
