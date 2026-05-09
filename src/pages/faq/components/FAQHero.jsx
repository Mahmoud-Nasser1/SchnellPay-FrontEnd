import { HelpCircle, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeUp, fadeDown, stagger } from "@/lib/motion";

function FAQHero() {
  return (
    <section className="gradient-hero relative overflow-hidden px-4 py-28 text-center">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute right-20 top-10 h-80 w-80 animate-pulse-glow rounded-full opacity-[0.10]"
          style={{ background: "radial-gradient(circle, hsl(162 90% 44%), transparent)" }}
        />
        <div
          className="absolute bottom-0 left-10 h-60 w-60 rounded-full opacity-[0.07]"
          style={{ background: "radial-gradient(circle, hsl(213 85% 50%), transparent)" }}
        />
      </div>
      <div className="container relative z-10 mx-auto max-w-3xl">
        <motion.div variants={stagger} initial="hidden" animate="visible">
          <motion.div
            variants={fadeDown}
            custom={0}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-2"
          >
            <HelpCircle className="h-3.5 w-3.5 text-accent" />
            <span className="text-xs font-semibold uppercase tracking-wide text-accent">
              Help Center
            </span>
          </motion.div>
          <motion.h1
            variants={fadeUp}
            custom={1}
            className="mb-4 font-display text-5xl font-bold leading-tight text-primary-foreground md:text-6xl"
          >
            Frequently Asked <span className="text-gradient-accent">Questions</span>
          </motion.h1>
          <motion.p
            variants={fadeUp}
            custom={2}
            className="mb-8 text-lg text-primary-foreground/70"
          >
            Everything you need to know about SecureWallet. Can't find an answer?
          </motion.p>
          <motion.div variants={fadeUp} custom={3}>
            <Button variant="accent" size="lg" asChild className="shadow-glow">
              <Link to="/contact">
                <MessageSquare className="mr-2 h-4 w-4" />
                Contact Support
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default FAQHero;
