import { QrCode } from "lucide-react";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";

export default function ReceiveScanBanner() {
  return (
    <motion.div
      variants={fadeUp}
      custom={4}
      className="flex items-center gap-3 rounded-xl border border-accent/20 bg-accent/5 p-4"
    >
      <div className="gradient-accent flex h-8 w-8 shrink-0 items-center justify-center rounded-lg">
        <QrCode className="h-4 w-4 text-accent-foreground" />
      </div>
      <div>
        <p className="text-xs font-semibold text-foreground">Scan to pay instantly</p>
        <p className="text-xs text-muted-foreground">
          Share your QR with anyone to receive payments in seconds
        </p>
      </div>
    </motion.div>
  );
}
