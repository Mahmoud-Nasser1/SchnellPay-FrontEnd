import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Shield,
  ArrowRight,
  RefreshCw,
  AlertCircle,
  Smartphone,
  KeyRound,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { fadeUp, fadeDown, stagger } from "@/lib/motion";

const MOCK_CODE = "123456";

function TwoFactorVerifyPage() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(45);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState("");
  const [verified, setVerified] = useState(false);
  const inputs = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    inputs.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (timer <= 0) return;
    const t = setTimeout(() => setTimer((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [timer]);

  const handleChange = (i, value) => {
    if (!/^\d?$/.test(value)) return;
    const next = [...otp];
    next[i] = value;
    setOtp(next);
    setError("");
    if (value && i < 5) inputs.current[i + 1]?.focus();
  };

  const handleKeyDown = (i, e) => {
    if (e.key === "Backspace" && !otp[i] && i > 0) {
      inputs.current[i - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);
    if (!pasted) return;
    e.preventDefault();
    const next = pasted.split("").concat(Array(6).fill("")).slice(0, 6);
    setOtp(next);
    inputs.current[Math.min(pasted.length, 5)]?.focus();
  };

  const handleVerify = async () => {
    const code = otp.join("");
    if (code.length < 6) return;

    setLoading(true);
    setError("");

    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);

    if (code === MOCK_CODE) {
      setVerified(true);
      await new Promise((r) => setTimeout(r, 900));
      navigate("/dashboard");
    } else {
      setError("Invalid verification code. Try 123456 (mock).");
      setOtp(["", "", "", "", "", ""]);
      inputs.current[0]?.focus();
    }
  };

  const handleResend = async () => {
    setResending(true);
    await new Promise((r) => setTimeout(r, 900));
    setResending(false);
    setTimer(45);
    setOtp(["", "", "", "", "", ""]);
    setError("");
    inputs.current[0]?.focus();
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md"
      >
        {/* Header */}
        <motion.div variants={fadeDown} custom={0} className="mb-8 text-center">
          <Link
            to="/"
            className="mb-6 inline-flex items-center gap-2 font-display text-xl font-bold"
          >
            <div className="gradient-accent flex h-8 w-8 items-center justify-center rounded-lg shadow-glow">
              <Shield className="h-4 w-4 text-accent-foreground" />
            </div>
            Schnell<span className="text-accent">Pay</span>
          </Link>

          {verified ? (
            <div className="animate-bounce-in">
              <div className="gradient-accent mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full shadow-glow">
                <CheckCircle2 className="h-10 w-10 text-accent-foreground" />
              </div>
              <h2 className="font-display text-2xl font-bold">Verified!</h2>
              <p className="mt-1 text-muted-foreground">
                Redirecting to dashboard...
              </p>
            </div>
          ) : (
            <>
              <div className="gradient-card mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl shadow-navy">
                <Smartphone className="h-8 w-8 text-accent" />
              </div>

              <h1 className="mb-2 font-display text-3xl font-bold">
                Two-factor authentication
              </h1>

              <p className="text-sm text-muted-foreground">
                Enter the 6-digit code from your authenticator app
              </p>
            </>
          )}
        </motion.div>

        {!verified && (
          <>
            {/* OTP Inputs */}
            <motion.div
              variants={fadeUp}
              custom={1}
              className="mb-3 flex justify-center gap-2 sm:gap-3"
            >
              {otp.map((digit, i) => (
                <input
                  key={i}
                  ref={(el) => (inputs.current[i] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(i, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(i, e)}
                  onPaste={handlePaste}
                  className={cn(
                    "h-14 w-11 rounded-xl border-2 bg-card text-center text-xl font-bold transition-all sm:w-12 focus:outline-none",
                    error
                      ? "border-destructive text-destructive"
                      : digit
                        ? "border-accent text-accent shadow-glow"
                        : "border-border focus:border-accent/50",
                  )}
                />
              ))}
            </motion.div>

            {/* Error */}
            {error && (
              <motion.p className="mb-4 flex items-center justify-center gap-1.5 text-xs text-destructive">
                <AlertCircle className="h-4 w-4" />
                {error}
              </motion.p>
            )}

            {/* Verify Button */}
            <motion.div variants={fadeUp} custom={2}>
              <Button
                variant="accent"
                size="lg"
                className="mb-3 w-full shadow-glow"
                onClick={handleVerify}
                disabled={otp.join("").length < 6 || loading}
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    Verifying...
                  </div>
                ) : (
                  <>
                    Verify & continue
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </motion.div>

            {/* Resend */}
            <motion.div variants={fadeUp} custom={3} className="text-center">
              {timer > 0 ? (
                <p className="text-sm text-muted-foreground">
                  Resend code in{" "}
                  <span className="font-semibold text-foreground">
                    0:{String(timer).padStart(2, "0")}
                  </span>
                </p>
              ) : (
                <button
                  onClick={handleResend}
                  disabled={resending}
                  className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:underline"
                >
                  <RefreshCw
                    className={cn("h-4 w-4", resending && "animate-spin")}
                  />
                  {resending ? "Sending..." : "Resend code"}
                </button>
              )}
            </motion.div>

            <motion.p className="mt-6 text-center text-xs text-muted-foreground">
              Need help?{" "}
              <Link to="/login" className="text-accent hover:underline">
                Back to login
              </Link>
            </motion.p>
          </>
        )}
      </motion.div>
    </div>
  );
}

export default TwoFactorVerifyPage;
