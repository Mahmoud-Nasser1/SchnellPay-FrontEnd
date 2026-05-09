import { Award, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { fadeUp, fadeDown, stagger } from "@/lib/motion";
import { useRef } from "react";

function AboutHero() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={heroRef}
      className="gradient-hero relative flex min-h-[75vh] items-center overflow-hidden"
    >
      {/* Parallax BG layer */}
      <motion.div style={{ y: heroY }} className="pointer-events-none absolute inset-0">
        <div
          className="absolute bottom-0 left-0 right-0 top-0"
          style={{
            backgroundImage:
              "linear-gradient(hsl(0 0% 100%) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 100%) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            opacity: 0.03,
          }}
        />
        <div
          className="absolute right-10 top-20 h-[480px] w-[480px] animate-pulse-glow rounded-full opacity-[0.12]"
          style={{ background: "radial-gradient(circle, hsl(162 90% 44%), transparent)" }}
        />
        <div
          className="absolute -bottom-20 -left-10 h-[300px] w-[300px] rounded-full opacity-[0.07]"
          style={{ background: "radial-gradient(circle, hsl(213 85% 50%), transparent)" }}
        />
      </motion.div>

      <div className="container relative z-10 mx-auto px-4 py-32">
        <motion.div
          style={{ opacity: heroOpacity }}
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-4xl text-center"
        >
          <motion.div
            variants={fadeDown}
            custom={0}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-2"
          >
            <Award className="h-3.5 w-3.5 text-accent" />
            <span className="text-xs font-semibold uppercase tracking-wide text-accent">
              Fintech Award Winner 2024
            </span>
          </motion.div>
          <motion.h1
            variants={fadeUp}
            custom={1}
            className="mb-6 font-display text-5xl font-bold leading-[1.05] text-primary-foreground md:text-7xl"
          >
            We're Building the Future of{" "}
            <span className="text-gradient-accent">Digital Finance</span>
          </motion.h1>
          <motion.p
            variants={fadeUp}
            custom={2}
            className="mx-auto mb-8 max-w-2xl text-xl leading-relaxed text-primary-foreground/70"
          >
            SecureWallet was founded with one mission: make global financial access safe, instant,
            and equitable for every person on Earth.
          </motion.p>
          <motion.div
            variants={fadeUp}
            custom={3}
            className="flex flex-col justify-center gap-4 sm:flex-row"
          >
            <Button variant="accent" size="lg" asChild className="group shadow-glow">
              <Link to="/register">
                Start Free Today{" "}
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="lg"
              className="border border-primary-foreground/25 text-primary-foreground/85 hover:bg-primary-foreground/10 hover:text-primary-foreground"
            >
              Learn More
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default AboutHero;
