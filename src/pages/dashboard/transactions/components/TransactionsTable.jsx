import { ChevronDown, ArrowDownLeft, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { fadeUp, scaleIn } from "@/lib/motion";

const statusBadge = {
  completed: "badge-success",
  pending: "badge-warning",
  failed: "badge-danger",
};

export default function TransactionsTable({ filtered, totalCount }) {
  return (
    <motion.div
      variants={fadeUp}
      custom={2}
      className="overflow-hidden rounded-2xl border border-border bg-card shadow-card"
    >
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              {["Transaction", "Category", "Date", "Status", "Amount"].map((h) => (
                <th
                  key={h}
                  className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                >
                  <button className="flex items-center gap-1 transition-colors hover:text-foreground">
                    {h} <ChevronDown className="h-3 w-3" />
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filtered.map((tx, i) => (
              <motion.tr
                key={tx.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04, duration: 0.3, ease: "easeOut" }}
                className="group transition-colors hover:bg-muted/30"
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl",
                        tx.type === "credit" ? "bg-accent/15" : "bg-destructive/10",
                      )}
                    >
                      {tx.type === "credit" ? (
                        <ArrowDownLeft className="h-4 w-4 text-accent" />
                      ) : (
                        <ArrowUpRight className="h-4 w-4 text-destructive" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{tx.name}</p>
                      <p className="text-xs text-muted-foreground">{tx.id}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
                    {tx.category}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-muted-foreground">{tx.date}</td>
                <td className="px-4 py-3">
                  <span
                    className={cn(
                      "rounded-full px-2.5 py-1 text-xs font-medium capitalize",
                      statusBadge[tx.status],
                    )}
                  >
                    {tx.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={cn(
                      "text-sm font-semibold",
                      tx.type === "credit" ? "text-accent" : "text-foreground",
                    )}
                  >
                    {tx.type === "credit" ? "+" : "-"}${tx.amount.toLocaleString()}
                  </span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
      {filtered.length === 0 && (
        <motion.div
          variants={scaleIn}
          initial="hidden"
          animate="visible"
          className="py-12 text-center text-muted-foreground"
        >
          <p className="font-medium">No transactions found</p>
          <p className="mt-1 text-sm">Try adjusting your filters</p>
        </motion.div>
      )}
      <div className="flex items-center justify-between border-t border-border px-4 py-3 text-sm text-muted-foreground">
        <span>
          Showing {filtered.length} of {totalCount} transactions
        </span>
        <div className="flex gap-2">
          <button className="rounded-lg border border-border px-3 py-1.5 text-xs transition-colors hover:bg-muted">
            Previous
          </button>
          <button className="rounded-lg border border-border px-3 py-1.5 text-xs transition-colors hover:bg-muted">
            Next
          </button>
        </div>
      </div>
    </motion.div>
  );
}
