import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeDown, stagger } from "@/lib/motion";
import PinVerifyDialog from "@/components/PinVerifyDialog";

import SendStepsProgress from "./components/SendStepsProgress";
import SendRecipientStep from "./components/SendRecipientStep";
import SendAmountStep from "./components/SendAmountStep";
import SendReviewStep from "./components/SendReviewStep";
import SendSuccess from "./components/SendSuccess";

const recentContacts = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com", avatar: "AJ", verified: true },
  { id: 2, name: "Bob Smith", email: "bob@example.com", avatar: "BS", verified: true },
  { id: 3, name: "Carol White", email: "carol@example.com", avatar: "CW", verified: false },
  { id: 4, name: "David Lee", email: "david@example.com", avatar: "DL", verified: true },
];

function SendMoneyPage() {
  const [step, setStep] = useState("recipient");
  const [selected, setSelected] = useState(null);
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [pinOpen, setPinOpen] = useState(false);

  const handleSend = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 2e3));
    setLoading(false);
    setStep("success");
  };

  const steps = ["Recipient", "Amount", "Confirm"];
  const stepIndex = { recipient: 0, amount: 1, confirm: 2, success: 3 };

  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="visible"
      className="mx-auto max-w-lg space-y-6"
    >
      <motion.div variants={fadeDown} custom={0}>
        <h1 className="font-display text-2xl font-bold text-foreground">Send Money</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Fast, secure transfers to anyone worldwide
        </p>
      </motion.div>

      <SendStepsProgress step={step} steps={steps} stepIndex={stepIndex} />

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-2xl border border-border bg-card p-6 shadow-card"
        >
          {step === "recipient" && (
            <SendRecipientStep
              selected={selected}
              setSelected={setSelected}
              setStep={setStep}
              recentContacts={recentContacts}
            />
          )}

          {step === "amount" && selected && (
            <SendAmountStep
              selected={selected}
              amount={amount}
              setAmount={setAmount}
              note={note}
              setNote={setNote}
              setStep={setStep}
            />
          )}

          {step === "confirm" && selected && (
            <SendReviewStep
              selected={selected}
              amount={amount}
              note={note}
              loading={loading}
              setPinOpen={setPinOpen}
              setStep={setStep}
            />
          )}

          {step === "success" && selected && (
            <SendSuccess
              selected={selected}
              amount={amount}
              setStep={setStep}
              setSelected={setSelected}
              setAmount={setAmount}
            />
          )}
        </motion.div>
      </AnimatePresence>

      <PinVerifyDialog
        open={pinOpen}
        onOpenChange={setPinOpen}
        onVerified={handleSend}
        description={`Enter your 6-digit TransPIN to send $${Number(amount || 0).toFixed(2)}.`}
      />
    </motion.div>
  );
}
export { SendMoneyPage as default };
