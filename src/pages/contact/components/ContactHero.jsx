import { HeadphonesIcon } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { fadeUp, fadeDown, stagger } from "@/lib/motion";
import { useRef } from "react";

function ContactHero({ heroRef }) {
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section className="gradient-hero relative flex min-h-[65vh] items-center overflow-hidden">
      {/* Background */}
      <motion.div
        style={{ y: heroY }}
        className="pointer-events-none absolute inset-0"
      >
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(hsl(0 0% 100%) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 100%) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        <div
          className="absolute left-10 top-20 h-[400px] w-[400px] animate-pulse-glow rounded-full opacity-[0.10]"
          style={{
            background:
              "radial-gradient(circle, hsl(162 90% 44%), transparent)",
          }}
        />

        <div
          className="absolute bottom-0 right-0 h-[350px] w-[350px] rounded-full opacity-[0.07]"
          style={{
            background:
              "radial-gradient(circle, hsl(213 85% 50%), transparent)",
          }}
        />
      </motion.div>

      <div className="container relative z-10 mx-auto px-4 py-32">
        <motion.div
          style={{ opacity: heroOpacity }}
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-3xl text-center"
        >
          {/* Badge */}
          <motion.div
            variants={fadeDown}
            custom={0}
            className="
              mb-6 inline-flex items-center gap-3
              rounded-full border border-accent/25
              bg-accent/10 px-4 py-2
              backdrop-blur-md
            "
          >
            {/* Lucide Icon styled */}
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/20">
              <HeadphonesIcon className="h-4 w-4 text-accent" />
            </div>

            <span className="text-xs font-semibold uppercase tracking-wide text-accent">
              24/7 Support Available
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            variants={fadeUp}
            custom={1}
            className="mb-6 font-display text-5xl font-bold leading-[1.05] text-primary-foreground md:text-7xl"
          >
            We're here to <span className="text-gradient-accent">help you</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={fadeUp}
            custom={2}
            className="mx-auto mb-8 max-w-xl text-xl leading-relaxed text-primary-foreground/70"
          >
            Our world-class support team is available around the clock. Get
            answers fast.
          </motion.p>

          {/* Info chips */}
          <motion.div
            variants={fadeUp}
            custom={3}
            className="flex flex-wrap justify-center gap-3"
          >
            {[
              "⚡ Avg. 2-min response",
              "🌍 24/7 global support",
              "🔒 Secure & private",
            ].map((item) => (
              <span
                key={item}
                className="
                    rounded-full border border-primary-foreground/20
                    bg-primary-foreground/10 px-4 py-2
                    text-sm text-primary-foreground/80
                    backdrop-blur-sm
                  "
              >
                {item}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default ContactHero;
