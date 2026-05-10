import { X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { motion, AnimatePresence } from "framer-motion";

export function ProviderModal({ open, onClose, editing, setEditing, onSave, loading }) {
  if (!open || !editing) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-4 backdrop-blur-sm"
        onClick={onClose}
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
              {editing.provider_id ? "Edit Provider" : "Add Provider"}
            </h3>
            <button
              onClick={onClose}
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
                value={editing.provider_name}
                onChange={(e) => setEditing({ ...editing, provider_name: e.target.value })}
                placeholder="Stripe"
              />
            </div>
            <div>
              <Label className="text-xs font-medium">Code</Label>
              <Input
                className="mt-1.5 font-mono"
                value={editing.provider_code}
                onChange={(e) => setEditing({ ...editing, provider_code: e.target.value.toUpperCase() })}
                placeholder="STRIPE"
              />
            </div>
            <div>
              <Label className="text-xs font-medium">Contact email</Label>
              <Input
                className="mt-1.5"
                type="email"
                value={editing.contact_mail}
                onChange={(e) => setEditing({ ...editing, contact_mail: e.target.value })}
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
                checked={editing.is_active}
                onCheckedChange={(v) => setEditing({ ...editing, is_active: v })}
              />
            </div>
            <div className="flex gap-2 pt-2">
              <Button variant="ghost-muted" className="flex-1" onClick={onClose}>
                Cancel
              </Button>
              <Button variant="accent" className="flex-1 shadow-glow" onClick={onSave} disabled={loading}>
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : editing.provider_id ? "Save changes" : "Add provider"}
              </Button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
