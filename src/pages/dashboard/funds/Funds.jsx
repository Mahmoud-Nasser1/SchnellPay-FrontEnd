import { useState } from "react";
import {
  CreditCard,
  Building,
  Plus,
  ArrowRight,
  Check,
  Lock,
  X,
  Smartphone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp, fadeIn, scaleUp, stagger } from "@/lib/motion";
import { useToast } from "@/hooks/use-toast";
import PinVerifyDialog from "@/components/PinVerifyDialog";
const paymentMethods = [
  {
    id: "card1",
    type: "card",
    label: "Visa",
    last4: "4532",
    icon: CreditCard,
    badge: "Default",
    color: "text-blue-500 bg-blue-500/10",
  },
  {
    id: "card2",
    type: "card",
    label: "Mastercard",
    last4: "8821",
    icon: CreditCard,
    badge: null,
    color: "text-orange-500 bg-orange-500/10",
  },
  {
    id: "bank1",
    type: "bank",
    label: "Chase Bank",
    last4: "0042",
    icon: Building,
    badge: null,
    color: "text-emerald-500 bg-emerald-500/10",
  },
];
const BALANCE = 46100;
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
          <h3 className="font-display text-lg font-bold text-foreground">
            Add Payment Method
          </h3>
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
              {t === "card"
                ? "Credit/Debit Card"
                : t === "bank"
                  ? "Bank Account"
                  : "Mobile Wallet"}
            </button>
          ))}
        </div>
        <form onSubmit={handleAdd} className="space-y-4">
          {tab === "card" && (
            <>
              <div>
                <Label className="text-xs font-medium text-foreground">
                  Card Number
                </Label>
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
                <Label className="text-xs font-medium text-foreground">
                  Cardholder Name
                </Label>
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
                  <Label className="text-xs font-medium text-foreground">
                    Expiry (MM/YY)
                  </Label>
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
                  <Label className="text-xs font-medium text-foreground">
                    CVV
                  </Label>
                  <div className="relative mt-1.5">
                    <Input
                      type="password"
                      className="h-11"
                      placeholder="•••"
                      maxLength={4}
                      value={form.cvv}
                      onChange={(e) =>
                        update("cvv", e.target.value.replace(/\D/g, ""))
                      }
                      required
                    />
                  </div>
                </div>
              </div>
              {/* Live preview */}
              {form.number && (
                <div className="gradient-card rounded-xl p-4 text-xs text-primary-foreground/90">
                  <p className="mb-1 font-mono text-base tracking-widest">
                    {form.number ||
                      "\u2022\u2022\u2022\u2022 \u2022\u2022\u2022\u2022 \u2022\u2022\u2022\u2022 \u2022\u2022\u2022\u2022"}
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
                <Label className="text-xs font-medium text-foreground">
                  Account Number
                </Label>
                <Input
                  className="mt-1.5 h-11"
                  placeholder="000123456789"
                  value={form.account}
                  onChange={(e) => update("account", e.target.value)}
                  required
                />
              </div>
              <div>
                <Label className="text-xs font-medium text-foreground">
                  Routing Number
                </Label>
                <Input
                  className="mt-1.5 h-11"
                  placeholder="021000021"
                  maxLength={9}
                  value={form.routing}
                  onChange={(e) =>
                    update("routing", e.target.value.replace(/\D/g, ""))
                  }
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
            <span>
              Your details are encrypted with 256-bit SSL. We never store CVV.
            </span>
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
                Add{" "}
                {tab === "card"
                  ? "Card"
                  : tab === "bank"
                    ? "Bank Account"
                    : "Wallet"}
              </>
            )}
          </Button>
        </form>
      </motion.div>
    </motion.div>
  );
}
function FundsPage() {
  const [selected, setSelected] = useState("card1");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [methods, setMethods] = useState(paymentMethods);
  const [pinOpen, setPinOpen] = useState(false);
  const { toast } = useToast();
  const handleSubmit = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 2e3));
    setLoading(false);
    setDone(true);
  };
  if (done) {
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
            Deposit Successful!
          </h2>
          <p className="mb-1 text-muted-foreground">
            <span className="text-lg font-bold text-accent">
              ${Number(amount).toFixed(2)}
            </span>{" "}
            has been added to your wallet.
          </p>
          <Button
            variant="accent"
            className="mt-6 shadow-glow"
            onClick={() => {
              setDone(false);
              setAmount("");
            }}
          >
            Deposit More
          </Button>
        </div>
      </motion.div>
    );
  }
  return (
    <>
      <AnimatePresence>
        {showAdd && (
          <AddMethodModal
            onClose={() => setShowAdd(false)}
            onAdd={(m) => {
              setMethods((prev) => [...prev, m]);
              setSelected(m.id);
              toast({
                title: "Payment method added",
                description: `${m.label} \u2022\u2022\u2022\u2022 ${m.last4} has been added.`,
              });
            }}
          />
        )}
      </AnimatePresence>
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="mx-auto max-w-lg space-y-6"
      >
        <motion.div variants={fadeUp} custom={0}>
          <h1 className="font-display text-2xl font-bold text-foreground">
            Deposit
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Add money to your wallet securely
          </p>
        </motion.div>
        {/* Amount */}
        <motion.div
          variants={fadeUp}
          custom={2}
          className="space-y-4 rounded-2xl border border-border bg-card p-5 shadow-card"
        >
          <div>
            <Label className="text-xs font-medium text-foreground">
              Amount
            </Label>
            <div className="relative mt-1.5">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-bold text-muted-foreground">
                $
              </span>
              <Input
                type="number"
                placeholder="0.00"
                className="h-16 pl-10 font-display text-2xl font-bold"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
          </div>
          {/* Quick amounts */}
          <div className="grid grid-cols-4 gap-2">
            {["50", "100", "500", "1000"].map((q) => (
              <button
                key={q}
                onClick={() => setAmount(q)}
                className={cn(
                  "rounded-lg border py-2 text-sm font-semibold transition-all",
                  amount === q
                    ? "border-accent bg-accent/10 text-accent"
                    : "border-border text-muted-foreground hover:border-accent/50 hover:text-foreground",
                )}
              >
                ${q}
              </button>
            ))}
          </div>
        </motion.div>
        {/* Payment Method */}
        <motion.div
          variants={fadeUp}
          custom={3}
          className="rounded-2xl border border-border bg-card p-5 shadow-card"
        >
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-display text-sm font-semibold text-foreground">
              From Payment Method
            </h3>
            <button
              onClick={() => setShowAdd(true)}
              className="flex items-center gap-1 text-xs font-semibold text-accent transition-opacity hover:underline hover:opacity-80"
            >
              <Plus className="h-3 w-3" /> Add new
            </button>
          </div>
          <div className="space-y-2">
            {methods.map(({ id, label, last4, icon: Icon, badge, color }) => (
              <button
                key={id}
                onClick={() => setSelected(id)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-xl border p-3.5 text-left transition-all",
                  selected === id
                    ? "bg-accent/8 border-accent shadow-card"
                    : "border-border hover:border-accent/40 hover:bg-muted/30",
                )}
              >
                <div
                  className={cn(
                    "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
                    color,
                  )}
                >
                  <Icon className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-sm font-semibold text-foreground">
                    {label} •••• {last4}
                  </span>
                </div>
                {badge && (
                  <span className="bg-accent/12 rounded-full border border-accent/20 px-2 py-0.5 text-[10px] font-semibold text-accent">
                    {badge}
                  </span>
                )}
                {selected === id && (
                  <Check className="h-4 w-4 shrink-0 text-accent" />
                )}
              </button>
            ))}
          </div>
        </motion.div>
        {/* Security note */}
        <motion.div
          variants={fadeIn}
          custom={4}
          className="flex items-center gap-2 text-xs text-muted-foreground"
        >
          <Lock className="h-3.5 w-3.5 text-accent" />
          <span>
            256-bit SSL encryption · PCI DSS Level 1 certified · Funds
            guaranteed
          </span>
        </motion.div>
        <motion.div variants={fadeUp} custom={5}>
          <Button
            variant="accent"
            size="lg"
            className="group relative h-12 w-full overflow-hidden rounded-xl text-base font-semibold shadow-glow transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
            onClick={() => setPinOpen(true)}
            disabled={!amount || Number(amount) <= 0 || loading}
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-accent-foreground/30 border-t-accent-foreground" />
                Processing secure transaction…
              </div>
            ) : (
              <span className="flex items-center gap-2">
                Deposit <span className="font-bold">${amount || "0.00"}</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            )}

            {/* subtle glow layer */}
            <span className="absolute inset-0 bg-white/5 opacity-0 transition-opacity group-hover:opacity-100" />
          </Button>
        </motion.div>
      </motion.div>
      <PinVerifyDialog
        open={pinOpen}
        onOpenChange={setPinOpen}
        onVerified={handleSubmit}
        description={`Enter your 6-digit TransPIN to deposit $${Number(amount || 0).toFixed(2)}.`}
      />
    </>
  );
}
export { FundsPage as default };
