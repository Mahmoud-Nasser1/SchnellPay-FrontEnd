import { TrendingUp, Eye, EyeOff, Wallet, Shield } from "lucide-react";

function BalanceCard({ balanceHidden, setBalanceHidden }) {
  return (
    <div className="balance-card relative overflow-hidden rounded-2xl p-6 shadow-navy lg:col-span-2">
      <div className="relative z-10">
        <div className="mb-5 flex items-start justify-between">
          <div>
            <p className="mb-2 text-xs font-medium uppercase tracking-widest text-primary-foreground/60">
              Total Balance
            </p>
            <div className="flex items-center gap-3">
              <p className="font-display text-4xl font-bold tracking-tight text-primary-foreground">
                {balanceHidden ? "••••••••" : "$48,250.00"}
              </p>
              <button
                onClick={() => setBalanceHidden(!balanceHidden)}
                className="p-1 text-primary-foreground/50 transition-colors hover:text-primary-foreground/90"
                aria-label={balanceHidden ? "Show balance" : "Hide balance"}
              >
                {balanceHidden ? (
                  <Eye className="w-4.5 h-4.5" />
                ) : (
                  <EyeOff className="w-4.5 h-4.5" />
                )}
              </button>
            </div>
            <div className="mt-2 flex items-center gap-1.5">
              <TrendingUp className="h-3.5 w-3.5 text-accent" />
              <span className="text-sm font-semibold text-accent">+12.4% this month</span>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2 text-right">
            <div className="secure-badge">
              <Shield className="h-3 w-3" /> Secured
            </div>
            <div className="gradient-accent flex h-11 w-11 items-center justify-center rounded-2xl shadow-glow">
              <Wallet className="h-5 w-5 text-accent-foreground" />
            </div>
          </div>
        </div>
        {/* Sub-balances */}
        <div className="mt-4 grid grid-cols-3 gap-3 border-t border-primary-foreground/10 pt-4">
          {[
            { label: "Available", value: "$46,100.00" },
            { label: "Pending", value: "$2,150.00" },
            { label: "Savings", value: "$12,400.00" },
          ].map(({ label, value }) => (
            <div key={label}>
              <p className="mb-1 text-[11px] uppercase tracking-wide text-primary-foreground/50">
                {label}
              </p>
              <p className="text-sm font-semibold text-primary-foreground">
                {balanceHidden ? "••••" : value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BalanceCard;
