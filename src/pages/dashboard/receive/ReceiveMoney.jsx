import { motion } from "framer-motion";
import { fadeDown, stagger } from "@/lib/motion";
import ReceiveQR from "./components/ReceiveQR";
import ReceiveRequestAmount from "./components/ReceiveRequestAmount";
import ReceiveScanBanner from "./components/ReceiveScanBanner";

function ReceiveMoneyPage() {
  const walletId = "SW-2847-XQTZ-8834";

  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="visible"
      className="mx-auto max-w-md space-y-6"
    >
      <motion.div variants={fadeDown} custom={0}>
        <h1 className="font-display text-2xl font-bold text-foreground">Receive Money</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Share your Wallet ID or QR code to receive payments
        </p>
      </motion.div>
      <ReceiveQR walletId={walletId} />
      <ReceiveRequestAmount />
      <ReceiveScanBanner />
    </motion.div>
  );
}
export { ReceiveMoneyPage as default };
