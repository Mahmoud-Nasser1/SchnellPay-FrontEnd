import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const chartData = [
  { month: "Feb", amount: 285 },
  { month: "Mar", amount: 320 },
  { month: "Apr", amount: 298 },
  { month: "May", amount: 345 },
  { month: "Jun", amount: 273 },
  { month: "Jul", amount: 223 },
];

function BillSpendingChart() {
  return (
    <motion.div
      variants={fadeUp}
      custom={1}
      className="rounded-2xl border border-border bg-card p-5 shadow-card"
    >
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="font-display font-semibold text-foreground">Monthly Bill Spending</h3>
          <p className="mt-0.5 text-xs text-muted-foreground">6-month trend</p>
        </div>
        <span className="rounded-full border border-accent/20 bg-accent/10 px-2.5 py-1 text-xs font-medium text-accent">
          ↓ 18% vs last month
        </span>
      </div>
      <ResponsiveContainer width="100%" height={160}>
        <BarChart data={chartData} barSize={32}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `$${v}`}
          />
          <Tooltip
            contentStyle={{
              background: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "0.75rem",
              fontSize: "12px",
              color: "hsl(var(--foreground))",
            }}
            formatter={(v) => [`$${v}`, "Total"]}
          />
          <Bar dataKey="amount" fill="hsl(var(--accent))" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );
}

export default BillSpendingChart;
