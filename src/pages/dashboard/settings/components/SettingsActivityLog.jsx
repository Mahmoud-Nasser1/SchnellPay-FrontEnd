import { Activity, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export default function SettingsActivityLog({ activityLog }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-display font-semibold text-foreground">
          Security Activity Log
        </h3>
        <Button variant="outline" size="sm">
          Export Log
        </Button>
      </div>
      <div className="space-y-3">
        {activityLog.map((log, i) => (
          <motion.div
            key={log.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.07, duration: 0.35, ease: "easeOut" }}
            className="flex items-start gap-3 rounded-xl border border-border p-3.5 transition-colors hover:bg-muted/30"
          >
            <div
              className={cn(
                "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl",
                log.risk === "low"
                  ? "bg-accent/15"
                  : log.risk === "medium"
                    ? "bg-warning/15"
                    : "bg-destructive/10",
              )}
            >
              {log.risk === "high" ? (
                <AlertTriangle className="h-4 w-4 text-destructive" />
              ) : (
                <Activity
                  className={cn(
                    "h-4 w-4",
                    log.risk === "low" ? "text-accent" : "text-warning",
                  )}
                />
              )}
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-foreground">{log.action}</p>
              <p className="text-xs text-muted-foreground">
                {log.device} · {log.location}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">{log.time}</p>
              {log.risk === "high" && (
                <span className="badge-danger mt-0.5 inline-block rounded-full px-1.5 py-0.5 text-[10px] font-medium">
                  Suspicious
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
