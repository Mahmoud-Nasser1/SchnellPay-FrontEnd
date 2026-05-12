import { TrendingUp, Search, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";
import { cn } from "@/lib/utils";

function BillHistoryTable({ filteredHistory, searchQ, setSearchQ }) {
  return (
    <motion.div
      variants={fadeUp}
      custom={5}
      className="overflow-hidden rounded-2xl border border-border bg-card shadow-card"
    >
      <div className="flex items-center justify-between gap-3 border-b border-border px-5 py-4">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
          <h3 className="font-display font-semibold text-foreground">Payment History</h3>
        </div>
        <div className="flex max-w-xs flex-1 gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search..."
              className="h-8 pl-9 text-xs"
              value={searchQ}
              onChange={(e) => setSearchQ(e.target.value)}
            />
          </div>
          <Button variant="outline" size="sm" className="h-8 px-3">
            <Download className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              {["Reference", "Provider", "Category", "Amount", "Date", "Status"].map((h) => (
                <th
                  key={h}
                  className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filteredHistory.map((b) => (
              <tr key={b.id} className="transition-colors hover:bg-muted/30">
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">#{b.reference_number || b.id}</td>
                <td className="px-4 py-3 text-sm font-medium text-foreground">{b.provider}</td>
                <td className="px-4 py-3 text-sm text-muted-foreground">{b.category}</td>
                <td className="px-4 py-3 text-sm font-bold text-destructive">-{b.amount}</td>
                <td className="px-4 py-3 text-sm text-muted-foreground">{b.date}</td>
                <td className="px-4 py-3">
                  <span
                    className={cn(
                      "rounded-full px-2.5 py-1 text-xs font-semibold",
                      b.status === "paid" ? "badge-success" : "badge-danger",
                    )}
                  >
                    {b.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}

export default BillHistoryTable;
