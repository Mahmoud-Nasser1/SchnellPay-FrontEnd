import { Shield, Globe, Zap, Heart, Target } from "lucide-react";
import { motion } from "framer-motion";
import { fadeLeft, fadeRight, scaleIn, viewport } from "@/lib/motion";

function AboutMission() {
  return (
    <section className="relative bg-background dark:bg-background py-24 overflow-hidden">
      {/* LIGHT MODE MINT BACKGROUND */}
      <div className="pointer-events-none absolute inset-0 dark:hidden">
        <div className="absolute inset-0 bg-[#f3faf6]" />
        <div className="absolute -top-24 left-1/4 h-[300px] w-[300px] rounded-full bg-emerald-200/20 blur-3xl" />
        <div className="absolute -bottom-24 right-1/4 h-[300px] w-[300px] rounded-full bg-teal-200/20 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, #000 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="container relative mx-auto px-4">
        <div className="mx-auto grid max-w-6xl items-center gap-16 lg:grid-cols-2">
          {/* LEFT CONTENT */}
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-3 py-1.5">
              <Target className="h-3 w-3 text-accent" />
              <span className="text-xs font-semibold uppercase tracking-wide text-accent">
                Our Mission
              </span>
            </div>

            <h2 className="mb-6 font-display text-4xl font-bold leading-tight text-foreground md:text-5xl">
              Empowering everyone to{" "}
              <span className="text-gradient-accent">
                participate in finance
              </span>
            </h2>

            <p className="mb-6 text-lg leading-relaxed text-muted-foreground">
              Over 1.4 billion adults remain unbanked globally. We're changing
              that by building technology that is borderless, secure, and
              accessible to everyone.
            </p>

            <p className="leading-relaxed text-muted-foreground">
              Our platform removes the barriers — no minimum balance, no hidden
              fees, no discrimination by geography — so every person can send,
              save, and grow their money.
            </p>
          </motion.div>

          {/* RIGHT GRID */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            <div className="relative">
              <div className="gradient-accent absolute -inset-4 rounded-3xl opacity-5 blur-3xl" />

              <div className="relative grid grid-cols-2 gap-4">
                {[
                  {
                    icon: Shield,
                    title: "Bank-Grade Security",
                  },
                  {
                    icon: Globe,
                    title: "150+ Countries",
                  },
                  {
                    icon: Zap,
                    title: "Instant Transfers",
                  },
                  {
                    icon: Heart,
                    title: "People First",
                  },
                ].map(({ icon: Icon, title }, i) => (
                  <motion.div
                    key={title}
                    variants={scaleIn}
                    custom={i}
                    className="
                      rounded-2xl border border-border bg-card
                      p-6 text-center
                      transition-all duration-300
                      hover:-translate-y-1 hover:shadow-lifted
                      dark:bg-card
                    "
                  >
                    {/* ICON (unified professional style) */}
                    <div
                      className="
                      mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl
                      bg-accent/10 text-accent
                    "
                    >
                      <Icon className="h-6 w-6" />
                    </div>

                    <p className="text-sm font-semibold text-foreground">
                      {title}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default AboutMission;
