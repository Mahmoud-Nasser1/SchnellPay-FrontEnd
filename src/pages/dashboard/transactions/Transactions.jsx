import { useState } from "react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { fadeDown, stagger } from "@/lib/motion";

import TransactionsFilter from "./components/TransactionsFilter";
import TransactionsTable from "./components/TransactionsTable";

const transactions = [
  {
    id: "TXN-001",
    name: "Salary Deposit",
    type: "credit",
    amount: 5200,
    date: "Jul 1, 2025",
    category: "Income",
    status: "completed",
  },
  {
    id: "TXN-002",
    name: "Netflix Subscription",
    type: "debit",
    amount: 15.99,
    date: "Jul 2, 2025",
    category: "Entertainment",
    status: "completed",
  },
  {
    id: "TXN-003",
    name: "Transfer to Alice Johnson",
    type: "debit",
    amount: 250,
    date: "Jul 3, 2025",
    category: "Transfer",
    status: "completed",
  },
  {
    id: "TXN-004",
    name: "Amazon Purchase",
    type: "debit",
    amount: 89.99,
    date: "Jul 4, 2025",
    category: "Shopping",
    status: "completed",
  },
  {
    id: "TXN-005",
    name: "Freelance Payment from Bob",
    type: "credit",
    amount: 1200,
    date: "Jul 5, 2025",
    category: "Income",
    status: "completed",
  },
  {
    id: "TXN-006",
    name: "Electricity Bill",
    type: "debit",
    amount: 120.5,
    date: "Jul 6, 2025",
    category: "Utilities",
    status: "completed",
  },
  {
    id: "TXN-007",
    name: "Spotify Premium",
    type: "debit",
    amount: 9.99,
    date: "Jul 7, 2025",
    category: "Entertainment",
    status: "completed",
  },
  {
    id: "TXN-008",
    name: "Restaurant \u2013 The Oak",
    type: "debit",
    amount: 68,
    date: "Jul 8, 2025",
    category: "Food",
    status: "completed",
  },
  {
    id: "TXN-009",
    name: "PayPal Transfer",
    type: "credit",
    amount: 450,
    date: "Jul 9, 2025",
    category: "Transfer",
    status: "pending",
  },
  {
    id: "TXN-010",
    name: "Gym Membership",
    type: "debit",
    amount: 45,
    date: "Jul 10, 2025",
    category: "Health",
    status: "failed",
  },
];

function TransactionsPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [downloadLoading, setDownloadLoading] = useState(false);

  const filtered = transactions.filter((t) => {
    const matchSearch =
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.id.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || t.type === filter;
    return matchSearch && matchFilter;
  });

  const handleDownload = async () => {
    setDownloadLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setDownloadLoading(false);
  };

  return (
    <motion.div variants={stagger} initial="hidden" animate="visible" className="space-y-6">
      <motion.div
        variants={fadeDown}
        custom={0}
        className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center"
      >
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Transaction History</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            View and manage all your transactions
          </p>
        </div>
        <Button variant="outline" onClick={handleDownload} disabled={downloadLoading}>
          {downloadLoading ? (
            <div className="flex items-center gap-2">
              <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-muted-foreground/30 border-t-foreground" />
              Generating PDF...
            </div>
          ) : (
            <>
              <Download className="mr-2 h-4 w-4" />
              Download PDF
            </>
          )}
        </Button>
      </motion.div>

      <TransactionsFilter
        search={search}
        setSearch={setSearch}
        filter={filter}
        setFilter={setFilter}
      />

      <TransactionsTable filtered={filtered} totalCount={transactions.length} />
    </motion.div>
  );
}
export { TransactionsPage as default };
