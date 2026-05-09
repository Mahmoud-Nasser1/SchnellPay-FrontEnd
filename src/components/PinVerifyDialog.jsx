import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { ShieldCheck, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
const MOCK_PIN = "123456";
function PinVerifyDialog({
  open,
  onOpenChange,
  onVerified,
  title = "Verify Transaction PIN",
  description = "Enter your 6-digit TransPIN to authorize this transaction.",
}) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [attempts, setAttempts] = useState(0);
  useEffect(() => {
    if (open) {
      setPin("");
      setError("");
      setAttempts(0);
    }
  }, [open]);
  const handleVerify = async () => {
    if (pin.length < 6) {
      setError("Please enter your 6-digit PIN.");
      return;
    }
    setLoading(true);
    setError("");
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    if (pin === MOCK_PIN) {
      onOpenChange(false);
      onVerified();
    } else {
      setAttempts((a) => a + 1);
      setError("Incorrect PIN. Please try again.");
      setPin("");
    }
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-2xl border border-accent/20 bg-accent/10">
            <ShieldCheck className="h-6 w-6 text-accent" />
          </div>
          <DialogTitle className="font-display">{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center gap-4 py-3">
          <InputOTP
            maxLength={6}
            value={pin}
            onChange={(v) => {
              setPin(v);
              setError("");
            }}
            inputMode="numeric"
            pattern="[0-9]*"
          >
            <InputOTPGroup className="gap-2">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <InputOTPSlot
                  key={i}
                  index={i}
                  className="h-12 w-10 rounded-xl border border-input text-lg first:rounded-xl last:rounded-xl"
                />
              ))}
            </InputOTPGroup>
          </InputOTP>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-1.5 text-xs text-destructive"
            >
              <AlertCircle className="h-3.5 w-3.5" />
              {error} {attempts >= 2 && `(${attempts} attempts)`}
            </motion.div>
          )}
          <p className="text-center text-[11px] text-muted-foreground">
            Demo PIN: <span className="font-mono font-semibold text-foreground">123456</span>
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => onOpenChange(false)}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            variant="accent"
            className="flex-1 shadow-glow"
            onClick={handleVerify}
            disabled={loading || pin.length < 6}
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-accent-foreground/30 border-t-accent-foreground" />
                Verifying…
              </div>
            ) : (
              "Verify & Continue"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
export { PinVerifyDialog as default };
