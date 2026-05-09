import { DollarSign, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export default function SendAmountStep({ selected, amount, setAmount, note, setNote, setStep }) {
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3 rounded-xl border border-border bg-muted/50 p-3">
        <div className="gradient-card flex h-10 w-10 items-center justify-center rounded-full text-xs font-bold text-primary-foreground">
          {selected.avatar}
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">{selected.name}</p>
          <p className="text-xs text-muted-foreground">{selected.email}</p>
        </div>
      </div>
      <div>
        <Label className="text-xs font-medium text-foreground">Amount</Label>
        <div className="relative mt-1.5">
          <DollarSign className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="number"
            placeholder="0.00"
            className="h-14 pl-10 font-display text-2xl font-bold"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <p className="mt-1.5 text-xs text-muted-foreground">
          Available balance: <span className="font-semibold text-accent">$46,100.00</span>
        </p>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {["50", "100", "250", "500"].map((q) => (
          <button
            key={q}
            onClick={() => setAmount(q)}
            className={cn(
              "rounded-lg border py-2 text-sm font-medium transition-all",
              amount === q
                ? "border-accent bg-accent/10 text-accent"
                : "border-border text-muted-foreground hover:border-accent/50",
            )}
          >
            ${q}
          </button>
        ))}
      </div>
      <div>
        <Label className="text-xs font-medium text-foreground">Note (optional)</Label>
        <Input
          className="mt-1.5"
          placeholder="What's this for?"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
      </div>
      <div className="flex gap-3">
        <Button
          variant="outline"
          size="lg"
          onClick={() => setStep("recipient")}
          className="flex-1"
        >
          Back
        </Button>
        <Button
          variant="accent"
          size="lg"
          className="flex-1 shadow-glow"
          disabled={!amount || Number(amount) <= 0}
          onClick={() => setStep("confirm")}
        >
          Review <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
