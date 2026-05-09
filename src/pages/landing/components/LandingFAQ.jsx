import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/lib/motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle, Sparkles } from "lucide-react";

const faqs = [
  {
    q: "Is SecureWallet free to use?",
    a: "Yes! Creating an account and basic transfers are completely free. We only charge small fees on currency conversions and instant withdrawals.",
  },
  {
    q: "How secure is my money?",
    a: "Your funds are protected by 256-bit encryption, 2FA, biometric authentication, and real-time fraud detection AI. We are PCI DSS Level 1 certified.",
  },
  {
    q: "How fast are transfers?",
    a: "Internal transfers are instant. Bank withdrawals typically take 1–2 business days depending on your bank.",
  },
  {
    q: "What countries are supported?",
    a: "We support users in 150+ countries with full KYC verification. Currency exchange is available for 50+ currencies.",
  },
];

function LandingFAQ() {
  return (
    <section id="faq" className="relative bg-background py-24 overflow-hidden">
      {/* background glow */}
      <div className="absolute inset-0 flex justify-center">
        <div className="h-[400px] w-[400px] rounded-full bg-accent/10 blur-3xl" />
      </div>

      <div className="container relative z-10 mx-auto max-w-3xl px-4">
        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-14 text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-4 py-2">
            <HelpCircle className="h-4 w-4 text-accent" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              FAQ
            </span>
          </div>

          <h2 className="mb-3 font-display text-4xl font-bold text-foreground md:text-5xl">
            Frequently Asked Questions
          </h2>

          <p className="text-muted-foreground">
            Everything you need to know about SecureWallet
          </p>
        </motion.div>

        {/* Accordion */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="space-y-4"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.div key={faq.q} variants={fadeUp} custom={i}>
                <AccordionItem
                  value={`faq-${i}`}
                  className="group rounded-2xl border border-border/60 bg-background/60 px-6 backdrop-blur-xl transition-all duration-300 hover:border-accent/30 hover:shadow-[0_0_30px_rgba(59,130,246,0.08)]"
                >
                  <AccordionTrigger className="py-5 text-left text-base font-medium text-foreground hover:no-underline group-hover:text-accent transition-colors">
                    <span className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-accent/70" />
                      {faq.q}
                    </span>
                  </AccordionTrigger>

                  <AccordionContent className="pb-5 text-sm leading-relaxed text-muted-foreground">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}

export default LandingFAQ;
