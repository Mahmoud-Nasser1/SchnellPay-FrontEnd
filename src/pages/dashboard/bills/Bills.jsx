import { useState } from "react";
import {
  Zap,
  Wifi,
  Droplets,
  Flame,
  Phone,
  Tv,
  ArrowRight,
  Check,
  Plus,
  TrendingUp,
  Clock,
  CreditCard,
  AlertCircle,
  Download,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp, scaleIn, scaleUp, stagger } from "@/lib/motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import PinVerifyDialog from "@/components/PinVerifyDialog";
const categories = [
  {
    id: "electricity",
    icon: Zap,
    label: "Electricity",
    color: "bg-yellow-500/15 text-yellow-500",
    amount: "$84.50",
    due: "Jul 15",
    status: "due",
  },
  {
    id: "internet",
    icon: Wifi,
    label: "Internet",
    color: "bg-blue-500/15 text-blue-500",
    amount: "$59.99",
    due: "Jul 18",
    status: "upcoming",
  },
  {
    id: "water",
    icon: Droplets,
    label: "Water",
    color: "bg-cyan-500/15 text-cyan-500",
    amount: "$32.00",
    due: "Jul 22",
    status: "upcoming",
  },
  {
    id: "gas",
    icon: Flame,
    label: "Gas",
    color: "bg-orange-500/15 text-orange-500",
    amount: "$47.30",
    due: "Jul 28",
    status: "upcoming",
  },
  {
    id: "phone",
    icon: Phone,
    label: "Mobile",
    color: "bg-accent/15 text-accent",
    amount: "$85.00",
    due: "Aug 1",
    status: "upcoming",
  },
  {
    id: "cable",
    icon: Tv,
    label: "Cable TV",
    color: "bg-purple-500/15 text-purple-500",
    amount: "$120.00",
    due: "Aug 3",
    status: "upcoming",
  },
];
const billHistory = [
  {
    id: "B001",
    provider: "Pacific Gas",
    category: "Electricity",
    amount: "$84.50",
    date: "Jun 15",
    status: "paid",
  },
  {
    id: "B002",
    provider: "Comcast",
    category: "Internet",
    amount: "$59.99",
    date: "Jun 18",
    status: "paid",
  },
  {
    id: "B003",
    provider: "City Water",
    category: "Water",
    amount: "$28.40",
    date: "Jun 22",
    status: "paid",
  },
  {
    id: "B004",
    provider: "AT&T Mobile",
    category: "Mobile",
    amount: "$85.00",
    date: "Jun 30",
    status: "paid",
  },
  {
    id: "B005",
    provider: "Pacific Gas",
    category: "Electricity",
    amount: "$91.20",
    date: "May 15",
    status: "paid",
  },
  {
    id: "B006",
    provider: "DirecTV",
    category: "Cable TV",
    amount: "$120.00",
    date: "May 3",
    status: "failed",
  },
];
const chartData = [
  { month: "Feb", amount: 285 },
  { month: "Mar", amount: 320 },
  { month: "Apr", amount: 298 },
  { month: "May", amount: 345 },
  { month: "Jun", amount: 273 },
  { month: "Jul", amount: 223 },
];
function BillsPage() {
  const [selected, setSelected] = useState(null);
  const [paid, setPaid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchQ, setSearchQ] = useState("");
  const [account, setAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [provider, setProvider] = useState("");
  const [pinOpen, setPinOpen] = useState(false);
  const handlePay = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1600));
    setLoading(false);
    setPaid(true);
  };
  const totalDue = categories.reduce(
    (s, c) => s + parseFloat(c.amount.replace("$", "")),
    0,
  );
  const dueSoon = categories.filter((c) => c.status === "due");
  const upcoming = categories.filter((c) => c.status === "upcoming");
  const filteredHistory = billHistory.filter(
    (b) =>
      b.provider.toLowerCase().includes(searchQ.toLowerCase()) ||
      b.category.toLowerCase().includes(searchQ.toLowerCase()),
  );
  if (paid) {
    return (
      <motion.div
        variants={scaleUp}
        initial="hidden"
        animate="visible"
        className="mx-auto max-w-md"
      >
        <div className="rounded-2xl border border-border bg-card p-12 text-center shadow-card">
          <div className="gradient-success mx-auto mb-6 flex h-24 w-24 animate-bounce-in items-center justify-center rounded-full shadow-glow">
            <Check className="h-12 w-12 text-accent-foreground" />
          </div>
          <h2 className="mb-2 font-display text-2xl font-bold text-foreground">
            Payment Successful!
          </h2>
          <p className="mb-1 text-muted-foreground">
            Your{" "}
            <span className="font-semibold text-foreground">
              {categories.find((c) => c.id === selected)?.label}
            </span>{" "}
            bill has been paid.
          </p>
          <p className="mb-6 text-lg font-bold text-accent">
            {categories.find((c) => c.id === selected)?.amount}
          </p>
          <div className="flex justify-center gap-3">
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Receipt
            </Button>
            <Button
              variant="accent"
              className="shadow-glow"
              onClick={() => {
                setPaid(false);
                setSelected(null);
                setAccount("");
                setAmount("");
                setProvider("");
              }}
            >
              Pay Another Bill
            </Button>
          </div>
        </div>
      </motion.div>
    );
  }
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <motion.div variants={fadeUp} custom={0}>
        <h1 className="font-display text-2xl font-bold text-foreground">
          Bills & Payments
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage and pay all your bills in one place
        </p>
      </motion.div>
      {/* ── Overview Cards ── */}
      <motion.div
        variants={stagger}
        className="grid grid-cols-1 gap-4 sm:grid-cols-3"
      >
        {[
          {
            label: "Total Monthly Bills",
            value: `$${totalDue.toFixed(2)}`,
            sub: "6 active bills",
            icon: CreditCard,
            color: "text-primary",
          },
          {
            label: "Due Soon",
            value: `${dueSoon.length}`,
            sub: "Within 7 days",
            icon: AlertCircle,
            color: "text-destructive",
          },
          {
            label: "Bills Paid (Jun)",
            value: "4",
            sub: "$274.90 saved",
            icon: Check,
            color: "text-success",
          },
        ].map(({ label, value, sub, icon: Icon, color }, i) => (
          <motion.div
            key={label}
            variants={scaleIn}
            custom={i}
            className="rounded-2xl border border-border bg-card p-5 shadow-card transition-all hover:shadow-lifted"
          >
            <div className="mb-3 flex items-center justify-between">
              <p className="text-xs font-medium text-muted-foreground">
                {label}
              </p>
              <Icon className={`h-4 w-4 ${color}`} />
            </div>
            <p className="font-display text-2xl font-bold text-foreground">
              {value}
            </p>
            <p className={`mt-1 text-xs font-medium ${color}`}>{sub}</p>
          </motion.div>
        ))}
      </motion.div>
      {/* ── Spending Chart ── */}
      <motion.div
        variants={fadeUp}
        custom={1}
        className="rounded-2xl border border-border bg-card p-5 shadow-card"
      >
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="font-display font-semibold text-foreground">
              Monthly Bill Spending
            </h3>
            <p className="mt-0.5 text-xs text-muted-foreground">
              6-month trend
            </p>
          </div>
          <span className="rounded-full border border-accent/20 bg-accent/10 px-2.5 py-1 text-xs font-medium text-accent">
            ↓ 18% vs last month
          </span>
        </div>
        <ResponsiveContainer width="100%" height={160}>
          <BarChart data={chartData} barSize={32}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="hsl(var(--border))"
              vertical={false}
            />
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
            <Bar
              dataKey="amount"
              fill="hsl(var(--accent))"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>
      {/* ── Bill Category Grid + Pay Form ── */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Categories */}
        <motion.div
          variants={fadeUp}
          custom={2}
          className="rounded-2xl border border-border bg-card p-5 shadow-card"
        >
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-display font-semibold text-foreground">
              Select Bill Category
            </h3>
            <button className="flex items-center gap-1 text-xs font-medium text-accent hover:underline">
              <Plus className="h-3 w-3" />
              Add category
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {categories.map(
              ({
                id,
                icon: Icon,
                label,
                color,
                amount: billAmt,
                due,
                status,
              }) => (
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
                  <div
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-xl",
                      color,
                    )}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="text-center">
                    <span className="block text-xs font-semibold text-foreground">
                      {label}
                    </span>
                    <span className="text-[10px] font-bold text-accent">
                      {billAmt}
                    </span>
                    <span className="block text-[10px] text-muted-foreground">
                      Due {due}
                    </span>
                  </div>
                </button>
              ),
            )}
          </div>
        </motion.div>
        {/* Pay Form */}
        <motion.div
          variants={fadeUp}
          custom={3}
          className="rounded-2xl border border-border bg-card p-5 shadow-card"
        >
          <h3 className="mb-4 font-display font-semibold text-foreground">
            Payment Details
          </h3>
          <AnimatePresence mode="wait">
            {selected ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-4"
              >
                <div className="flex items-center gap-3 rounded-xl border border-accent/20 bg-accent/5 p-3.5">
                  {(() => {
                    const cat = categories.find((c) => c.id === selected);
                    const Icon = cat.icon;
                    return (
                      <>
                        <div
                          className={cn(
                            "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
                            cat.color,
                          )}
                        >
                          <Icon className="w-4.5 h-4.5" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-foreground">
                            {cat.label} Bill
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Suggested:{" "}
                            <span className="font-bold text-accent">
                              {cat.amount}
                            </span>{" "}
                            · Due {cat.due}
                          </p>
                        </div>
                      </>
                    );
                  })()}
                </div>
                <div>
                  <Label className="text-xs font-medium text-foreground">
                    Account / Customer ID
                  </Label>
                  <Input
                    className="mt-1.5 h-11"
                    placeholder="Enter account number"
                    value={account}
                    onChange={(e) => setAccount(e.target.value)}
                  />
                </div>
                <div>
                  <Label className="text-xs font-medium text-foreground">
                    Amount ($)
                  </Label>
                  <div className="relative mt-1.5">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-muted-foreground">
                      $
                    </span>
                    <Input
                      type="number"
                      className="h-11 pl-8"
                      placeholder="0.00"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <Label className="text-xs font-medium text-foreground">
                    Service Provider
                  </Label>
                  <Input
                    className="mt-1.5 h-11"
                    placeholder="e.g. Pacific Gas & Electric"
                    value={provider}
                    onChange={(e) => setProvider(e.target.value)}
                  />
                </div>
                <Button
                  variant="accent"
                  size="lg"
                  className="w-full shadow-glow"
                  onClick={() => setPinOpen(true)}
                  disabled={loading || !account || !amount}
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-accent-foreground/30 border-t-accent-foreground" />
                      Processing…
                    </div>
                  ) : (
                    <>
                      Pay Now <ArrowRight className="ml-1 h-4 w-4" />
                    </>
                  )}
                </Button>
              </motion.div>
            ) : (
              <motion.div
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-12 text-center"
              >
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-muted">
                  <CreditCard className="h-8 w-8 text-muted-foreground" />
                </div>
                <p className="mb-1 font-medium text-foreground">
                  Select a bill category
                </p>
                <p className="text-sm text-muted-foreground">
                  Choose from the grid to fill in payment details
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
      {/* ── Payment History ── */}
      <motion.div
        variants={fadeUp}
        custom={5}
        className="overflow-hidden rounded-2xl border border-border bg-card shadow-card"
      >
        <div className="flex items-center justify-between gap-3 border-b border-border px-5 py-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
            <h3 className="font-display font-semibold text-foreground">
              Payment History
            </h3>
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
                {["ID", "Provider", "Category", "Amount", "Date", "Status"].map(
                  (h) => (
                    <th
                      key={h}
                      className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                    >
                      {h}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredHistory.map((b) => (
                <tr key={b.id} className="transition-colors hover:bg-muted/30">
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                    {b.id}
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-foreground">
                    {b.provider}
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">
                    {b.category}
                  </td>
                  <td className="px-4 py-3 text-sm font-bold text-foreground">
                    {b.amount}
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">
                    {b.date}
                  </td>
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
      <PinVerifyDialog
        open={pinOpen}
        onOpenChange={setPinOpen}
        onVerified={handlePay}
        description={`Enter your 6-digit TransPIN to pay $${Number(amount || 0).toFixed(2)}.`}
      />
    </motion.div>
  );
}
export { BillsPage as default };
