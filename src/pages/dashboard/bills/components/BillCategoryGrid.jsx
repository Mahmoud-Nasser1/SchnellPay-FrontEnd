import { Plus } from "lucide-react";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";
import { cn } from "@/lib/utils";

function BillCategoryGrid({ categories, selected, setSelected }) {
  return (
    <motion.div
      variants={fadeUp}
      custom={2}
      className="rounded-2xl border border-border bg-card p-5 shadow-card"
    >
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-display font-semibold text-foreground">Select Bill Category</h3>
        <button className="flex items-center gap-1 text-xs font-medium text-accent hover:underline">
          <Plus className="h-3 w-3" />
          Add category
        </button>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {categories.map(({ id, icon: Icon, label, color, amount: billAmt, due, status }) => (
          <button
            key={id}
            onClick={() => setSelected(id)}
            className={cn(
              "relative flex flex-col items-center gap-2 rounded-xl border p-3 transition-all hover:scale-[1.03]",
              selected === id
                ? "bg-accent/8 border-accent shadow-card"
                : "border-border hover:border-accent/40",
            )}
          >
            {status === "due" && (
              <span className="absolute right-1.5 top-1.5 h-2 w-2 animate-pulse rounded-full bg-destructive" />
            )}
            <div className={cn("flex h-10 w-10 items-center justify-center rounded-xl", color)}>
              <Icon className="h-5 w-5" />
            </div>
            <div className="text-center">
              <span className="block text-xs font-semibold text-foreground">{label}</span>
              <span className="text-[10px] font-bold text-accent">{billAmt}</span>
              <span className="block text-[10px] text-muted-foreground">Due {due}</span>
            </div>
          </button>
        ))}
      </div>
    </motion.div>
  );
}

export default BillCategoryGrid;
