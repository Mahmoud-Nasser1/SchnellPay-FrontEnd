import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const chartData = [
  { month: "Jan", income: 6200, expenses: 4100 },
  { month: "Feb", income: 7100, expenses: 3800 },
  { month: "Mar", income: 5900, expenses: 4600 },
  { month: "Apr", income: 8400, expenses: 3200 },
  { month: "May", income: 7800, expenses: 4900 },
  { month: "Jun", income: 9200, expenses: 3600 },
  { month: "Jul", income: 8200, expenses: 3800 },
];

function IncomeExpenseChart() {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h3 className="font-display font-semibold text-foreground">Cash Flow</h3>
          <p className="mt-0.5 text-xs text-muted-foreground">Income vs Expenses (YTD)</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-accent" />
            <span className="text-xs text-muted-foreground">Income</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-destructive/60" />
            <span className="text-xs text-muted-foreground">Expenses</span>
          </div>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={180}>
        <AreaChart data={chartData} margin={{ top: 5, right: 0, bottom: 0, left: 0 }}>
          <defs>
            <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.2} />
              <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="expGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--destructive))" stopOpacity={0.15} />
              <stop offset="95%" stopColor="hsl(var(--destructive))" stopOpacity={0} />
            </linearGradient>
          </defs>
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
            tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
          />
          <Tooltip
            contentStyle={{
              background: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "0.75rem",
              fontSize: "12px",
              color: "hsl(var(--foreground))",
            }}
            formatter={(v, n) => [`$${v.toLocaleString()}`, n === "income" ? "Income" : "Expenses"]}
          />
          <Area
            type="monotone"
            dataKey="income"
            stroke="hsl(var(--accent))"
            strokeWidth={2}
            fill="url(#incomeGrad)"
            dot={false}
            activeDot={{ r: 4, fill: "hsl(var(--accent))" }}
          />
          <Area
            type="monotone"
            dataKey="expenses"
            stroke="hsl(var(--destructive))"
            strokeWidth={1.5}
            strokeOpacity={0.7}
            fill="url(#expGrad)"
            dot={false}
            activeDot={{ r: 4, fill: "hsl(var(--destructive))" }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default IncomeExpenseChart;
