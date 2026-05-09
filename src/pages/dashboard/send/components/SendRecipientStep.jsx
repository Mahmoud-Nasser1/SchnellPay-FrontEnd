import { Search, ArrowRight, Shield, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export default function SendRecipientStep({ selected, setSelected, setStep, recentContacts }) {
  return (
    <div className="space-y-5">
      <div>
        <Label className="text-xs font-medium text-foreground">Search recipient</Label>
        <div className="relative mt-1.5">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Name, email, or wallet ID" className="h-11 pl-10" />
        </div>
      </div>
      <div>
        <p className="mb-3 text-sm font-medium text-muted-foreground">Recent contacts</p>
        <div className="space-y-2">
          {recentContacts.map((contact, i) => (
            <motion.button
              key={contact.id}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.07, duration: 0.35, ease: "easeOut" }}
              onClick={() => setSelected(contact)}
              className={cn(
                "flex w-full items-center gap-3 rounded-xl border p-3 text-left transition-all",
                selected?.id === contact.id
                  ? "border-accent bg-accent/10"
                  : "border-border hover:border-accent/50 hover:bg-muted/50",
              )}
            >
              <div className="gradient-card flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold text-primary-foreground">
                {contact.avatar}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <p className="text-sm font-semibold text-foreground">{contact.name}</p>
                  {contact.verified && <Shield className="h-3 w-3 text-accent" />}
                </div>
                <p className="text-xs text-muted-foreground">{contact.email}</p>
              </div>
              {selected?.id === contact.id && (
                <Check className="h-4 w-4 shrink-0 text-accent" />
              )}
            </motion.button>
          ))}
        </div>
      </div>
      <Button
        variant="accent"
        size="lg"
        className="w-full shadow-glow"
        disabled={!selected}
        onClick={() => setStep("amount")}
      >
        Continue <ArrowRight className="ml-1 h-4 w-4" />
      </Button>
    </div>
  );
}
