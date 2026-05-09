import { Award, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeUp, scaleIn, stagger, viewport } from "@/lib/motion";

function AboutCTA() {
  return (
    <section className="gradient-hero relative overflow-hidden py-24">
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 animate-pulse-glow rounded-full opacity-[0.08]"
          style={{ background: "radial-gradient(circle, hsl(162 90% 44%), transparent)" }}
        />
      </div>
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="container relative z-10 mx-auto max-w-2xl px-4 text-center"
      >
        <motion.div variants={scaleIn} custom={0}>
          <Award className="mx-auto mb-5 h-14 w-14 text-accent drop-shadow-[0_0_16px_hsl(162_90%_44%/0.8)]" />
        </motion.div>
        <motion.h2
          variants={fadeUp}
          custom={1}
          className="mb-4 font-display text-4xl font-bold text-primary-foreground md:text-5xl"
        >
          Ready to join us?
        </motion.h2>
        <motion.p variants={fadeUp} custom={2} className="mb-8 text-lg text-primary-foreground/70">
          Join 2.4M+ users managing their money smarter with SecureWallet.
        </motion.p>
        <motion.div variants={fadeUp} custom={3}>
          <Button variant="accent" size="xl" asChild className="group shadow-glow">
            <Link to="/register">
              Get Started Free{" "}
              <ArrowRight className="ml-1 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default AboutCTA;
