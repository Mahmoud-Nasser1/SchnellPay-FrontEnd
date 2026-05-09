import { useState } from "react";
import { Plus, Edit2, Trash2, Layers, X, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp, fadeDown, scaleIn, stagger } from "@/lib/motion";
import { cn } from "@/lib/utils";
const providers = [
  { id: "p1", name: "Stripe" },
  { id: "p2", name: "PayPal" },
  { id: "p3", name: "Flutterwave" },
  { id: "p4", name: "Paystack" },
];
const categories = ["Payments", "Bills", "Airtime", "Transfers", "Crypto"];
const seed = [
  {
    id: "s1",
    name: "Card Payment",
    category: "Payments",
    providerId: "p1",
    fee: 1.5,
    active: true,
  },
  {
    id: "s2",
    name: "Bank Transfer",
    category: "Transfers",
    providerId: "p4",
    fee: 0.5,
    active: true,
  },
  { id: "s3", name: "Electricity Bill", category: "Bills", providerId: "p3", fee: 0, active: true },
  {
    id: "s4",
    name: "Airtime Top-up",
    category: "Airtime",
    providerId: "p2",
    fee: 0,
    active: false,
  },
];
const empty = { id: "", name: "", category: "Payments", providerId: "p1", fee: 0, active: true };
function AdminServices() {
  const [list, setList] = useState(seed);
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState(null);
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const providerName = (id) => providers.find((p) => p.id === id)?.name ?? "\u2014";
  const filtered = list.filter(
    (s) =>
      s.name.toLowerCase().includes(query.toLowerCase()) ||
      s.category.toLowerCase().includes(query.toLowerCase()) ||
      providerName(s.providerId).toLowerCase().includes(query.toLowerCase()),
  );
  const startCreate = () => {
    setEditing({ ...empty });
    setOpen(true);
  };
  const startEdit = (s) => {
    setEditing({ ...s });
    setOpen(true);
  };
  const save = () => {
    if (!editing) return;
    if (!editing.name.trim()) {
      toast({
        title: "Missing name",
        description: "Service name is required.",
        variant: "destructive",
      });
      return;
    }
    if (editing.fee < 0) {
      toast({
        title: "Invalid fee",
        description: "Fee cannot be negative.",
        variant: "destructive",
      });
      return;
    }
    if (editing.id) {
      setList((l) => l.map((s) => (s.id === editing.id ? editing : s)));
      toast({ title: "Service updated", description: editing.name });
    } else {
      setList((l) => [{ ...editing, id: `s${Date.now()}` }, ...l]);
      toast({ title: "Service added", description: editing.name });
    }
    setOpen(false);
    setEditing(null);
  };
  const remove = (s) => {
    setList((l) => l.filter((x) => x.id !== s.id));
    toast({ title: "Service deleted", description: s.name });
  };
  const toggle = (s) => {
    setList((l) => l.map((x) => (x.id === s.id ? { ...x, active: !x.active } : x)));
  };
  return (
    <motion.div variants={stagger} initial="hidden" animate="visible" className="space-y-6">
      <motion.div
        variants={fadeDown}
        custom={0}
        className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
      >
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Services</h1>
          <p className="mt-1 text-sm text-muted-foreground">Configure offered services and fees</p>
        </div>
        <Button variant="accent" onClick={startCreate} className="shadow-glow">
          <Plus className="h-4 w-4" /> Add Service
        </Button>
      </motion.div>
      <motion.div variants={fadeUp} custom={1} className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search services…"
          className="pl-10"
        />
      </motion.div>
      <motion.div
        variants={fadeUp}
        custom={2}
        className="overflow-hidden rounded-2xl border border-border bg-card shadow-card"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/40 text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-5 py-3 text-left font-semibold">Service</th>
                <th className="px-5 py-3 text-left font-semibold">Category</th>
                <th className="px-5 py-3 text-left font-semibold">Provider</th>
                <th className="px-5 py-3 text-left font-semibold">Fee</th>
                <th className="px-5 py-3 text-left font-semibold">Status</th>
                <th className="px-5 py-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((s, i) => (
                <motion.tr
                  key={s.id}
                  variants={scaleIn}
                  custom={i}
                  className="border-t border-border transition-colors hover:bg-muted/30"
                >
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="gradient-card flex h-9 w-9 items-center justify-center rounded-lg">
                        <Layers className="h-4 w-4 text-accent" />
                      </div>
                      <span className="font-semibold text-foreground">{s.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <span className="rounded-full border border-accent/20 bg-accent/10 px-2 py-0.5 text-[11px] font-semibold text-accent">
                      {s.category}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-muted-foreground">{providerName(s.providerId)}</td>
                  <td className="px-5 py-3 font-mono text-foreground">{s.fee.toFixed(2)}%</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <Switch checked={s.active} onCheckedChange={() => toggle(s)} />
                      <span
                        className={cn(
                          "text-xs font-semibold",
                          s.active ? "text-accent" : "text-muted-foreground",
                        )}
                      >
                        {s.active ? "Active" : "Inactive"}
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-right">
                    <div className="inline-flex gap-1">
                      <Button variant="ghost-muted" size="icon-sm" onClick={() => startEdit(s)}>
                        <Edit2 className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        variant="ghost-muted"
                        size="icon-sm"
                        onClick={() => remove(s)}
                        className="hover:bg-destructive/10 hover:text-destructive"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </td>
                </motion.tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-sm text-muted-foreground">
                    No services found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
      <AnimatePresence>
        {open && editing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-4 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 20, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-lifted"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-5 flex items-center justify-between">
                <h3 className="font-display text-lg font-bold text-foreground">
                  {editing.id ? "Edit Service" : "Add Service"}
                </h3>
                <button
                  onClick={() => setOpen(false)}
                  className="rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <Label className="text-xs font-medium">Service name</Label>
                  <Input
                    className="mt-1.5"
                    value={editing.name}
                    onChange={(e) => setEditing({ ...editing, name: e.target.value })}
                    placeholder="Card Payment"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-xs font-medium">Category</Label>
                    <Select
                      value={editing.category}
                      onValueChange={(v) => setEditing({ ...editing, category: v })}
                    >
                      <SelectTrigger className="mt-1.5">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((c) => (
                          <SelectItem key={c} value={c}>
                            {c}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-xs font-medium">Provider</Label>
                    <Select
                      value={editing.providerId}
                      onValueChange={(v) => setEditing({ ...editing, providerId: v })}
                    >
                      <SelectTrigger className="mt-1.5">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {providers.map((p) => (
                          <SelectItem key={p.id} value={p.id}>
                            {p.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label className="text-xs font-medium">Fee (%)</Label>
                  <Input
                    className="mt-1.5"
                    type="number"
                    step="0.1"
                    min="0"
                    value={editing.fee}
                    onChange={(e) =>
                      setEditing({ ...editing, fee: parseFloat(e.target.value) || 0 })
                    }
                  />
                </div>
                <div className="flex items-center justify-between rounded-xl border border-border p-3">
                  <div>
                    <p className="text-sm font-medium text-foreground">Active</p>
                    <p className="text-xs text-muted-foreground">
                      Make this service available to users.
                    </p>
                  </div>
                  <Switch
                    checked={editing.active}
                    onCheckedChange={(v) => setEditing({ ...editing, active: v })}
                  />
                </div>
                <div className="flex gap-2 pt-2">
                  <Button variant="ghost-muted" className="flex-1" onClick={() => setOpen(false)}>
                    Cancel
                  </Button>
                  <Button variant="accent" className="flex-1 shadow-glow" onClick={save}>
                    {editing.id ? "Save changes" : "Add service"}
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
export { AdminServices as default };
