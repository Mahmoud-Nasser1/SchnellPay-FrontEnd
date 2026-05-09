import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";

export default function ReceiveRequestAmount() {
  return (
    <motion.div
      variants={fadeUp}
      custom={3}
      className="rounded-2xl border border-border bg-card p-5 shadow-card"
    >
      <h3 className="mb-4 font-display font-semibold text-foreground">Request Specific Amount</h3>
      <div className="flex gap-3">
        <input
          type="number"
          placeholder="Enter amount ($)"
          className="h-11 flex-1 rounded-xl border border-input bg-background px-4 text-sm text-foreground transition-all focus:outline-none focus:ring-2 focus:ring-ring/50"
        />
        <Button variant="accent" className="shrink-0 shadow-glow">
          Generate QR
        </Button>
      </div>
    </motion.div>
  );
}
