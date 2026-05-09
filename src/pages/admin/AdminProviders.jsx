import { useState } from "react";
import { Plus, Edit2, Trash2, Server, X, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp, fadeDown, scaleIn, stagger } from "@/lib/motion";
import { cn } from "@/lib/utils";
const seed = [
  { id: "p1", name: "Stripe", code: "STRIPE", contact: "support@stripe.com", active: true },
  { id: "p2", name: "PayPal", code: "PAYPAL", contact: "ops@paypal.com", active: true },
  { id: "p3", name: "Flutterwave", code: "FLW", contact: "team@flutterwave.com", active: false },
  { id: "p4", name: "Paystack", code: "PSTK", contact: "hello@paystack.com", active: true },
];
function AdminProviders() {
  const [list, setList] = useState(seed);
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState(null);
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const filtered = list.filter(
    (p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.code.toLowerCase().includes(query.toLowerCase()),
  );
  const startCreate = () => {
    setEditing({ id: "", name: "", code: "", contact: "", active: true });
    setOpen(true);
  };
  const startEdit = (p) => {
    setEditing({ ...p });
    setOpen(true);
  };
  const save = () => {
    if (!editing) return;
    if (!editing.name.trim() || !editing.code.trim()) {
      toast({
        title: "Missing fields",
        description: "Name and code are required.",
        variant: "destructive",
      });
      return;
    }
    if (editing.id) {
      setList((l) => l.map((p) => (p.id === editing.id ? editing : p)));
      toast({ title: "Provider updated", description: editing.name });
    } else {
      const newP = { ...editing, id: `p${Date.now()}` };
      setList((l) => [newP, ...l]);
      toast({ title: "Provider added", description: editing.name });
    }
    setOpen(false);
    setEditing(null);
  };
  const remove = (p) => {
    setList((l) => l.filter((x) => x.id !== p.id));
    toast({ title: "Provider deleted", description: p.name });
  };
  const toggle = (p) => {
    setList((l) => l.map((x) => (x.id === p.id ? { ...x, active: !x.active } : x)));
  };
  return (
    <motion.div variants={stagger} initial="hidden" animate="visible" className="space-y-6">
      <motion.div
        variants={fadeDown}
        custom={0}
        className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
      >
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Providers</h1>
          <p className="mt-1 text-sm text-muted-foreground">Manage payment and service providers</p>
        </div>
        <Button variant="accent" onClick={startCreate} className="shadow-glow">
          <Plus className="h-4 w-4" /> Add Provider
        </Button>
      </motion.div>
      <motion.div variants={fadeUp} custom={1} className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search providers…"
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
                <th className="px-5 py-3 text-left font-semibold">Provider</th>
                <th className="px-5 py-3 text-left font-semibold">Code</th>
                <th className="px-5 py-3 text-left font-semibold">Contact</th>
                <th className="px-5 py-3 text-left font-semibold">Status</th>
                <th className="px-5 py-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p, i) => (
                <motion.tr
                  key={p.id}
                  variants={scaleIn}
                  custom={i}
                  className="border-t border-border transition-colors hover:bg-muted/30"
                >
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="gradient-card flex h-9 w-9 items-center justify-center rounded-lg">
                        <Server className="h-4 w-4 text-accent" />
                      </div>
                      <span className="font-semibold text-foreground">{p.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 font-mono text-xs text-muted-foreground">{p.code}</td>
                  <td className="px-5 py-3 text-muted-foreground">{p.contact}</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <Switch checked={p.active} onCheckedChange={() => toggle(p)} />
                      <span
                        className={cn(
                          "text-xs font-semibold",
                          p.active ? "text-accent" : "text-muted-foreground",
                        )}
                      >
                        {p.active ? "Active" : "Inactive"}
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-right">
                    <div className="inline-flex gap-1">
                      <Button variant="ghost-muted" size="icon-sm" onClick={() => startEdit(p)}>
                        <Edit2 className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        variant="ghost-muted"
                        size="icon-sm"
                        onClick={() => remove(p)}
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
                  <td colSpan={5} className="py-12 text-center text-sm text-muted-foreground">
                    No providers found.
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
                  {editing.id ? "Edit Provider" : "Add Provider"}
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
                  <Label className="text-xs font-medium">Name</Label>
                  <Input
                    className="mt-1.5"
                    value={editing.name}
                    onChange={(e) => setEditing({ ...editing, name: e.target.value })}
                    placeholder="Stripe"
                  />
                </div>
                <div>
                  <Label className="text-xs font-medium">Code</Label>
                  <Input
                    className="mt-1.5 font-mono"
                    value={editing.code}
                    onChange={(e) => setEditing({ ...editing, code: e.target.value.toUpperCase() })}
                    placeholder="STRIPE"
                  />
                </div>
                <div>
                  <Label className="text-xs font-medium">Contact email</Label>
                  <Input
                    className="mt-1.5"
                    type="email"
                    value={editing.contact}
                    onChange={(e) => setEditing({ ...editing, contact: e.target.value })}
                    placeholder="support@example.com"
                  />
                </div>
                <div className="flex items-center justify-between rounded-xl border border-border p-3">
                  <div>
                    <p className="text-sm font-medium text-foreground">Active</p>
                    <p className="text-xs text-muted-foreground">
                      Toggle availability for transactions.
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
                    {editing.id ? "Save changes" : "Add provider"}
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
export { AdminProviders as default };
