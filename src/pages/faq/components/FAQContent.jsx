import { Globe, Shield, CreditCard, HelpCircle } from "lucide-react";
import { motion } from "framer-motion";
import { fadeUp, viewport } from "@/lib/motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    category: "General",
    icon: Globe,
    items: [
      {
        q: "Is SecureWallet free to use?",
        a: "Yes! Creating an account, receiving payments, and internal transfers are completely free. We only charge on currency conversions (0.5%) and instant bank withdrawals.",
      },
      {
        q: "Which countries are supported?",
        a: "SecureWallet is available in 150+ countries. Full KYC verification and fiat currency accounts are available in 80+ countries.",
      },
      {
        q: "How do I get started?",
        a: "Simply create an account, complete KYC verification, and add a payment method. The whole process takes about 5 minutes.",
      },
    ],
  },
  {
    category: "Security",
    icon: Shield,
    items: [
      {
        q: "How is my money protected?",
        a: "Your funds are protected by 256-bit AES encryption, two-factor authentication, and real-time AI fraud detection. We are PCI DSS Level 1 certified.",
      },
      {
        q: "What happens if my account is compromised?",
        a: "Contact us immediately. We can freeze your account within seconds. Our fraud team operates 24/7.",
      },
      {
        q: "Is my personal data safe?",
        a: "We never sell your data. All data is encrypted at rest and in transit. We comply with GDPR, CCPA, and international privacy laws.",
      },
    ],
  },
  {
    category: "Payments",
    icon: CreditCard,
    items: [
      {
        q: "How fast are transfers?",
        a: "Internal transfers between SecureWallet users are instant. Bank withdrawals take 1-2 business days.",
      },
      {
        q: "Is there a transfer limit?",
        a: "Unverified accounts: $500/day. KYC verified accounts: $50,000/day. Business accounts have custom limits.",
      },
      {
        q: "What currencies are supported?",
        a: "We support 50+ currencies. Real-time exchange rates are updated every minute. Conversion fee is just 0.5%.",
      },
    ],
  },
];

function FAQContent() {
  return (
    <section className="bg-background py-24">
      <div className="container mx-auto max-w-4xl px-4">
        {/* HEADER */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="mb-14 text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-muted bg-muted/40 px-3 py-1.5">
            <HelpCircle className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Frequently Asked Questions
            </span>
          </div>

          <h2 className="font-display text-4xl font-bold text-foreground">
            Everything you need to know
          </h2>
        </motion.div>

        {/* CONTENT */}
        <div className="space-y-12">
          {faqs.map(({ category, icon: Icon, items }, catIdx) => (
            <motion.div
              key={category}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              custom={catIdx}
            >
              {/* CATEGORY HEADER */}
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted text-foreground shadow-sm">
                  <Icon className="h-5 w-5 text-accent" />
                </div>

                <h3 className="font-display text-lg font-semibold text-foreground">
                  {category}
                </h3>
              </div>

              {/* ACCORDION */}
              <Accordion type="single" collapsible className="space-y-3">
                {items.map((faq, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={viewport}
                    transition={{ delay: i * 0.06, duration: 0.35 }}
                  >
                    <AccordionItem
                      value={`${category}-${i}`}
                      className="
                        rounded-xl border border-border bg-card px-5
                        transition-all duration-300
                        hover:border-accent/30 hover:shadow-sm
                      "
                    >
                      <AccordionTrigger className="py-4 text-left font-medium text-foreground hover:text-accent hover:no-underline">
                        {faq.q}
                      </AccordionTrigger>

                      <AccordionContent className="pb-4 text-sm leading-relaxed text-muted-foreground">
                        {faq.a}
                      </AccordionContent>
                    </AccordionItem>
                  </motion.div>
                ))}
              </Accordion>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FAQContent;
