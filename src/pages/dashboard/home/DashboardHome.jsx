import { useState } from "react";
import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/lib/motion";
import BalanceCard from "./components/BalanceCard";
import QuickActions from "./components/QuickActions";
import StatsRow from "./components/StatsRow";
import IncomeExpenseChart from "./components/IncomeExpenseChart";
import RecentTransactions from "./components/RecentTransactions";

function DashboardHome() {
  const [balanceHidden, setBalanceHidden] = useState(false);

  return (
    <motion.div variants={stagger} initial="hidden" animate="visible" className="space-y-6">
      {/* Header */}
      <motion.div variants={fadeUp} custom={0}>
        <h1 className="font-display text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Welcome back — here's your financial overview.
        </p>
      </motion.div>

      {/* Balance + Quick Actions */}
      <motion.div variants={fadeUp} custom={1} className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <BalanceCard balanceHidden={balanceHidden} setBalanceHidden={setBalanceHidden} />
        <QuickActions />
      </motion.div>

      {/* Stats Row */}
      <motion.div variants={fadeUp} custom={2}>
        <StatsRow />
      </motion.div>

      {/* Chart */}
      <motion.div variants={fadeUp} custom={3}>
        <IncomeExpenseChart />
      </motion.div>

      {/* Recent Transactions */}
      <motion.div variants={fadeUp} custom={4}>
        <RecentTransactions />
      </motion.div>
    </motion.div>
  );
}

export { DashboardHome as default };
