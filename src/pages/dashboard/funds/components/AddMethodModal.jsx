import { useState } from "react";
import { CreditCard, Building, Plus, Lock, X, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

function AddMethodModal({ onClose, onAdd }) {
  const [tab, setTab] = useState("card");
  const [form, setForm] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
    account: "",
    routing: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);
  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleAdd = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    if (tab === "card")
      onAdd({
        id: `card${Date.now()}`,
        type: "card",
        label: "New Card",
        last4: form.number.slice(-4) || "0000",
        icon: CreditCard,
        badge: null,
        color: "text-indigo-500 bg-indigo-500/10",
      });
    else if (tab === "bank")
      onAdd({
        id: `bank${Date.now()}`,
        type: "bank",
        label: "New Bank",
        last4: form.account.slice(-4) || "0000",
        icon: Building,
        badge: null,
        color: "text-teal-500 bg-teal-500/10",
      });
    else
      onAdd({
        id: `wallet${Date.now()}`,
        type: "wallet",
        label: "Mobile Wallet",
        last4: form.phone.slice(-4) || "0000",
        icon: Smartphone,
        badge: null,
        color: "text-purple-500 bg-purple-500/10",
      });
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0, y: 24 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.92, opacity: 0, y: 24 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-lifted"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-5 flex items-center justify-between">
          <h3 className="font-display text-lg font-bold text-foreground">Add Payment Method</h3>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-muted-foreground transition-all hover:bg-muted hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Type tabs */}
        <div className="mb-5 flex gap-2 rounded-xl bg-muted p-1">
          {["card", "bank", "wallet"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                "flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-semibold capitalize transition-all",
                tab === t
                  ? "bg-card text-foreground shadow"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {t === "card" && <CreditCard className="h-3.5 w-3.5" />}
              {t === "bank" && <Building className="h-3.5 w-3.5" />}
              {t === "wallet" && <Smartphone className="h-3.5 w-3.5" />}
              {t === "card" ? "Credit/Debit Card" : t === "bank" ? "Bank Account" : "Mobile Wallet"}
            </button>
          ))}
        </div>

        <form onSubmit={handleAdd} className="space-y-4">
          {tab === "card" && (
            <>
              <div>
                <Label className="text-xs font-medium text-foreground">Card Number</Label>
                <Input
                  className="mt-1.5 h-11"
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                  value={form.number}
                  onChange={(e) =>
                    update(
                      "number",
                      e.target.value
                        .replace(/\D/g, "")
                        .replace(/(.{4})/g, "$1 ")
                        .trim(),
                    )
                  }
                  required
                />
              </div>
              <div>
                <Label className="text-xs font-medium text-foreground">Cardholder Name</Label>
                <Input
                  className="mt-1.5 h-11"
                  placeholder="John Doe"
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs font-medium text-foreground">Expiry (MM/YY)</Label>
                  <Input
                    className="mt-1.5 h-11"
                    placeholder="12/28"
                    maxLength={5}
                    value={form.expiry}
                    onChange={(e) =>
                      update(
                        "expiry",
                        e.target.value
                          .replace(/\D/g, "")
                          .replace(/^(.{2})(.+)$/, "$1/$2")
                          .slice(0, 5),
                      )
                    }
                    required
                  />
                </div>
                <div>
                  <Label className="text-xs font-medium text-foreground">CVV</Label>
                  <div className="relative mt-1.5">
                    <Input
                      type="password"
                      className="h-11"
                      placeholder="•••"
                      maxLength={3}
                      minLength={3}
                      value={form.cvv}
                      onChange={(e) => update("cvv", e.target.value.replace(/\D/g, ""))}
                      required
                    />
                  </div>
                </div>
              </div>
              {/* Live preview */}
              {form.number && (
                <div className="gradient-card rounded-xl p-4 text-xs text-primary-foreground/90">
                  <p className="mb-1 font-mono text-base tracking-widest">
                    {form.number || "•••• •••• •••• ••••"}
                  </p>
                  <div className="flex justify-between">
                    <span>{form.name || "CARDHOLDER NAME"}</span>
                    <span>{form.expiry || "MM/YY"}</span>
                  </div>
                </div>
              )}
            </>
          )}
          {tab === "bank" && (
            <>
              <div>
                <Label className="text-xs font-medium text-foreground">Account Number</Label>
                <Input
                  className="mt-1.5 h-11"
                  placeholder="000123456789"
                  value={form.account}
                  onChange={(e) => update("account", e.target.value)}
                  required
                />
              </div>
              <div>
                <Label className="text-xs font-medium text-foreground">Routing Number</Label>
                <Input
                  className="mt-1.5 h-11"
                  placeholder="021000021"
                  maxLength={9}
                  value={form.routing}
                  onChange={(e) => update("routing", e.target.value.replace(/\D/g, ""))}
                  required
                />
              </div>
            </>
          )}
          {tab === "wallet" && (
            <div>
              <Label className="text-xs font-medium text-foreground">
                Mobile Number / Wallet ID
              </Label>
              <Input
                className="mt-1.5 h-11"
                placeholder="+1 (555) 000-0000"
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
                required
              />
            </div>
          )}
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Lock className="h-3.5 w-3.5 shrink-0 text-accent" />
            <span>Your details are encrypted with 256-bit SSL. We never store CVV.</span>
          </div>
          <Button
            type="submit"
            variant="accent"
            size="lg"
            className="w-full shadow-glow"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-accent-foreground/30 border-t-accent-foreground" />
                Adding…
              </div>
            ) : (
              <>
                <Plus className="mr-2 h-4 w-4" />
                Add {tab === "card" ? "Card" : tab === "bank" ? "Bank Account" : "Wallet"}
              </>
            )}
          </Button>
        </form>
      </motion.div>
    </motion.div>
  );
}

export default AddMethodModal;
