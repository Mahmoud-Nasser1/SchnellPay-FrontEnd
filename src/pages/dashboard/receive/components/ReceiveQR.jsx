import { Copy, Share2, Download, QrCode, Check } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { fadeUp, scaleIn } from "@/lib/motion";

export default function ReceiveQR({ walletId }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(walletId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      variants={fadeUp}
      custom={1}
      className="space-y-6 rounded-2xl border border-border bg-card p-6 text-center shadow-card"
    >
      {/* HEADER */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Receive Funds
        </p>
        <h3 className="mt-1 font-display text-xl font-bold text-foreground">
          Your Payment QR
        </h3>
        <p className="mt-1 text-xs text-muted-foreground">
          Share this code to receive instant transfers
        </p>
      </div>

      {/* QR */}
      <motion.div variants={scaleIn} custom={0} className="relative">
        <div className="relative mx-auto flex h-52 w-52 items-center justify-center rounded-2xl border border-border bg-muted/40 shadow-inner">
          
          {/* fake QR pattern */}
          <div className="grid grid-cols-10 gap-[2px] p-3 opacity-70">
            {Array.from({ length: 100 }).map((_, i) => (
              <div
                key={i}
                className={cn(
                  "h-3 w-3 rounded-[3px]",
                  i % 2 === 0 || i % 7 === 0
                    ? "bg-foreground"
                    : "bg-transparent"
                )}
              />
            ))}
          </div>

          {/* center logo */}
          <div className="absolute flex h-12 w-12 items-center justify-center rounded-xl bg-accent shadow-glow">
            <QrCode className="h-6 w-6 text-accent-foreground" />
          </div>
        </div>

        {/* glow ring */}
        <div className="pointer-events-none absolute inset-0 rounded-2xl border border-accent/20 blur-sm" />
      </motion.div>

      {/* WALLET ID */}
      <motion.div variants={fadeUp} custom={1}>
        <p className="mb-2 text-xs font-medium text-muted-foreground">
          Wallet ID
        </p>

        <div className="flex items-center justify-between rounded-xl border border-border bg-muted/30 px-4 py-3">
          <code className="font-mono text-sm font-semibold tracking-widest text-foreground">
            {walletId}
          </code>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1 text-xs font-medium text-muted-foreground transition hover:text-accent"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 text-accent" />
                Copied
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                Copy
              </>
            )}
          </button>
        </div>
      </motion.div>

      {/* ACTIONS */}
      <motion.div
        variants={fadeUp}
        custom={2}
        className="grid grid-cols-3 gap-3"
      >
        {[
          {
            icon: Share2,
            label: "Share",
            onClick: () => {},
          },
          {
            icon: Download,
            label: "Download",
            onClick: () => {},
          },
          {
            icon: QrCode,
            label: "Show QR",
            onClick: () => {},
          },
        ].map(({ icon: Icon, label, onClick }) => (
          <button
            key={label}
            onClick={onClick}
            className="flex flex-col items-center gap-2 rounded-xl border border-border bg-background p-3 text-muted-foreground transition-all hover:border-accent/40 hover:text-accent hover:shadow-sm"
          >
            <Icon className="h-5 w-5" />
            <span className="text-xs font-medium">{label}</span>
          </button>
        ))}
      </motion.div>
    </motion.div>
  );
}