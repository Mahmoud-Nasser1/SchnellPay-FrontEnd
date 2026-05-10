import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { format, subMonths } from "date-fns";

const chartData = [
  { month: format(subMonths(new Date(), 6), "MMM"), income: 6200, expenses: 4100 },
  { month: format(subMonths(new Date(), 5), "MMM"), income: 7100, expenses: 3800 },
  { month: format(subMonths(new Date(), 4), "MMM"), income: 5900, expenses: 4600 },
  { month: format(subMonths(new Date(), 3), "MMM"), income: 8400, expenses: 3200 },
  { month: format(subMonths(new Date(), 2), "MMM"), income: 7800, expenses: 4900 },
  { month: format(subMonths(new Date(), 1), "MMM"), income: 9200, expenses: 3600 },
  { month: format(new Date(), "MMM"), income: 8200, expenses: 3800 },
];

function IncomeExpenseChart() {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
      <div className="mb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-display font-bold text-foreground flex items-center gap-2">
            Cash Flow Trend
            <span className="rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-bold text-accent uppercase">Realtime</span>
          </h3>
          <p className="mt-0.5 text-xs text-muted-foreground">Detailed view of your income vs expenses</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-accent" />
            <span className="text-[11px] font-medium text-muted-foreground">Income</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-destructive" />
            <span className="text-[11px] font-medium text-muted-foreground">Expenses</span>
          </div>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={chartData} margin={{ top: 5, right: 0, bottom: 0, left: 0 }}>
          <defs>
            <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.15} />
              <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="expGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--destructive))" stopOpacity={0.12} />
              <stop offset="95%" stopColor="hsl(var(--destructive))" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} opacity={0.5} />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 10, fontWeight: 500, fill: "hsl(var(--muted-foreground))" }}
            axisLine={false}
            tickLine={false}
            dy={10}
          />
          <YAxis
            tick={{ fontSize: 10, fontWeight: 500, fill: "hsl(var(--muted-foreground))" }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
          />
          <Tooltip
            contentStyle={{
              background: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "0.75rem",
              fontSize: "12px",
              boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
            }}
            itemStyle={{ padding: "2px 0" }}
            formatter={(v, n) => [`$${v.toLocaleString()}`, n === "income" ? "Income" : "Expenses"]}
          />
          <Area
            type="monotone"
            dataKey="income"
            stroke="hsl(var(--accent))"
            strokeWidth={3}
            fill="url(#incomeGrad)"
            dot={false}
            activeDot={{ r: 5, fill: "hsl(var(--accent))", strokeWidth: 2, stroke: "white" }}
          />
          <Area
            type="monotone"
            dataKey="expenses"
            stroke="hsl(var(--destructive))"
            strokeWidth={3}
            fill="url(#expGrad)"
            dot={false}
            activeDot={{ r: 5, fill: "hsl(var(--destructive))", strokeWidth: 2, stroke: "white" }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default IncomeExpenseChart;
