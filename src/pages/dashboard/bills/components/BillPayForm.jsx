import { ArrowRight, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp } from "@/lib/motion";
import { cn } from "@/lib/utils";

function BillPayForm({
  categories,
  selected,
  account,
  setAccount,
  amount,
  setAmount,
  provider,
  setProvider,
  loading,
  onPay,
}) {
  return (
    <motion.div
      variants={fadeUp}
      custom={3}
      className="rounded-2xl border border-border bg-card p-5 shadow-card"
    >
      <h3 className="mb-4 font-display font-semibold text-foreground">Payment Details</h3>
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
                      <p className="text-sm font-semibold text-foreground">{cat.label} Bill</p>
                      <p className="text-xs text-muted-foreground">
                        Suggested: <span className="font-bold text-accent">{cat.amount}</span> ·
                        Due {cat.due}
                      </p>
                    </div>
                  </>
                );
              })()}
            </div>
            <div>
              <Label className="text-xs font-medium text-foreground">Account / Customer ID</Label>
              <Input
                className="mt-1.5 h-11"
                placeholder="Enter account number"
                value={account}
                onChange={(e) => setAccount(e.target.value)}
              />
            </div>
            <div>
              <Label className="text-xs font-medium text-foreground">Amount ($)</Label>
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
              <Label className="text-xs font-medium text-foreground">Service Provider</Label>
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
              onClick={onPay}
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
            <p className="mb-1 font-medium text-foreground">Select a bill category</p>
            <p className="text-sm text-muted-foreground">
              Choose from the grid to fill in payment details
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default BillPayForm;
