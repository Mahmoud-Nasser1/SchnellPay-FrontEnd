import { Edit2, Trash2, Server, Search, Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { motion } from "framer-motion";
import { fadeUp, scaleIn } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function ProvidersTable({ 
  providers, 
  loading, 
  query, 
  setQuery, 
  page, 
  total, 
  limit, 
  onPageChange, 
  onEdit, 
  onDelete, 
  onToggle 
}) {
  const totalPages = Math.ceil(total / limit);

  return (
    <div className="space-y-6">
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
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center">
                    <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
                  </td>
                </tr>
              ) : (
                providers.map((p, i) => (
                  <motion.tr
                    key={p.provider_id}
                    variants={scaleIn}
                    custom={i}
                    className="border-t border-border transition-colors hover:bg-muted/30"
                  >
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className="gradient-card flex h-9 w-9 items-center justify-center rounded-lg">
                          <Server className="h-4 w-4 text-accent" />
                        </div>
                        <span className="font-semibold text-foreground">{p.provider_name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3 font-mono text-xs text-muted-foreground">{p.provider_code}</td>
                    <td className="px-5 py-3 text-muted-foreground">{p.contact_mail}</td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <Switch checked={p.is_active} onCheckedChange={() => onToggle(p)} />
                        <span
                          className={cn(
                            "text-xs font-semibold",
                            p.is_active ? "text-accent" : "text-muted-foreground",
                          )}
                        >
                          {p.is_active ? "Active" : "Inactive"}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-right">
                      <div className="inline-flex gap-1">
                        <Button variant="ghost-muted" size="icon-sm" onClick={() => onEdit(p)}>
                          <Edit2 className="h-3.5 w-3.5" />
                        </Button>
                        <Button
                          variant="ghost-muted"
                          size="icon-sm"
                          onClick={() => onDelete(p)}
                          className="hover:bg-destructive/10 hover:text-destructive"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
              {!loading && providers.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-sm text-muted-foreground">
                    No providers found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Footer */}
        {total > 0 && (
          <div className="flex items-center justify-between border-t border-border px-5 py-4 bg-muted/20">
            <p className="text-xs text-muted-foreground">
              Showing <span className="font-medium text-foreground">{(page - 1) * limit + 1}</span> to{" "}
              <span className="font-medium text-foreground">
                {Math.min(page * limit, total)}
              </span> of{" "}
              <span className="font-medium text-foreground">{total}</span> providers
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange(page - 1)}
                disabled={page <= 1 || loading}
                className="h-8 w-8 p-0"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div className="flex items-center px-2">
                <span className="text-xs font-medium">Page {page} of {totalPages}</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange(page + 1)}
                disabled={page >= totalPages || loading}
                className="h-8 w-8 p-0"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
