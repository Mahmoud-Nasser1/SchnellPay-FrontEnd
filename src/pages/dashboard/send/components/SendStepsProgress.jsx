import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";

export default function SendStepsProgress({ step, steps, stepIndex }) {
  if (step === "success") return null;

  return (
    <motion.div variants={fadeUp} custom={1} className="flex items-center gap-2">
      {steps.map((s, i) => (
        <div key={s} className="flex items-center gap-2">
          <div
            className={cn(
              "flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold transition-all",
              i < stepIndex[step]
                ? "gradient-accent text-accent-foreground"
                : i === stepIndex[step]
                  ? "border-2 border-accent bg-accent/10 text-accent"
                  : "border-2 border-border text-muted-foreground",
            )}
          >
            {i < stepIndex[step] ? <Check className="h-3.5 w-3.5" /> : i + 1}
          </div>
          <span
            className={cn(
              "hidden text-sm font-medium sm:block",
              i === stepIndex[step] ? "text-foreground" : "text-muted-foreground",
            )}
          >
            {s}
          </span>
          {i < 2 && (
            <div
              className={cn(
                "mx-1 h-px flex-1",
                i < stepIndex[step] ? "bg-accent" : "bg-border",
              )}
              style={{ minWidth: "20px" }}
            />
          )}
        </div>
      ))}
    </motion.div>
  );
}
