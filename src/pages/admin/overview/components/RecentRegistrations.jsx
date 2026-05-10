import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function RecentRegistrations({ users }) {
  return (
    <motion.div
      variants={fadeUp}
      custom={3}
      className="overflow-hidden rounded-2xl border border-border bg-card shadow-card"
    >
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <h3 className="font-display font-semibold text-foreground">Recent Registrations</h3>
        <a href="/admin/users" className="text-xs font-medium text-accent hover:underline">
          View all
        </a>
      </div>
      <div className="divide-y divide-border">
        {users.map((u, i) => (
          <motion.div
            key={u.email}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + i * 0.07, duration: 0.4, ease: "easeOut" }}
            className="flex items-center gap-3 px-5 py-3 transition-colors hover:bg-muted/30"
          >
            <div className="gradient-card flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold text-primary-foreground">
              {u.f_name?.[0]}{u.l_name?.[0]}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-foreground">{u.f_name} {u.l_name}</p>
              <p className="text-xs text-muted-foreground">{u.email}</p>
            </div>
            <span className="hidden text-xs text-muted-foreground sm:block">
              {new Date(u.creation_date).toLocaleDateString()}
            </span>
            <span
              className={cn(
                "rounded-full px-2 py-0.5 text-[10px] font-medium capitalize",
                u.account_status === "active" ? "badge-success" : "badge-danger",
              )}
            >
              {u.account_status}
            </span>
            <span
              className={cn(
                "rounded-full px-2 py-0.5 text-[10px] font-medium capitalize",
                u.is_verified ? "badge-success" : "badge-warning",
              )}
            >
              {u.is_verified ? "Verified" : "Unverified"}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
