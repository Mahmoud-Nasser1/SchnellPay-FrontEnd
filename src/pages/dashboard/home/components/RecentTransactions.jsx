import { ArrowUpRight, ArrowDownLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const transactions = [
  {
    id: "TXN001",
    name: "Alice Johnson",
    type: "received",
    amount: "+$350.00",
    date: "Today, 9:14 AM",
    avatar: "AJ",
    status: "completed",
  },
  {
    id: "TXN002",
    name: "Netflix Premium",
    type: "sent",
    amount: "-$15.99",
    date: "Today, 8:30 AM",
    avatar: "NF",
    status: "completed",
  },
  {
    id: "TXN003",
    name: "Electric Bill",
    type: "sent",
    amount: "-$84.50",
    date: "Yesterday",
    avatar: "EB",
    status: "completed",
  },
  {
    id: "TXN004",
    name: "Bob Smith",
    type: "received",
    amount: "+$1,200.00",
    date: "Jul 6",
    avatar: "BS",
    status: "completed",
  },
  {
    id: "TXN005",
    name: "Spotify",
    type: "sent",
    amount: "-$9.99",
    date: "Jul 5",
    avatar: "SP",
    status: "completed",
  },
];

function RecentTransactions() {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-card">
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <h3 className="font-display font-semibold text-foreground">Recent Transactions</h3>
        <Button variant="ghost" size="sm" asChild className="text-xs text-accent hover:text-accent">
          <Link to="/dashboard/transactions">View All</Link>
        </Button>
      </div>
      <div className="divide-y divide-border">
        {transactions.map((tx) => (
          <div
            key={tx.id}
            className="flex items-center gap-4 px-5 py-3.5 transition-colors hover:bg-muted/30"
          >
            <div className="gradient-card flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-[10px] font-bold text-primary-foreground">
              {tx.avatar}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-foreground">{tx.name}</p>
              <p className="text-xs text-muted-foreground">{tx.date}</p>
            </div>
            <div className="flex items-center gap-2 text-right">
              <p
                className={cn(
                  "text-sm font-bold",
                  tx.type === "received" ? "text-success" : "text-foreground",
                )}
              >
                {tx.amount}
              </p>
              {tx.type === "received" ? (
                <ArrowDownLeft className="h-3.5 w-3.5 text-success" />
              ) : (
                <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentTransactions;
