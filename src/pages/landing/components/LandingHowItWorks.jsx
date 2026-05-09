import {
  UserPlus,
  BadgeCheck,
  Rocket,
  Sparkles,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/lib/motion";

const steps = [
  {
    step: "01",
    title: "Create Account",
    desc: "Sign up in under 2 minutes with email or social login.",
    icon: UserPlus,
  },
  {
    step: "02",
    title: "Verify Identity",
    desc: "Quick KYC verification to keep your account secure.",
    icon: ShieldCheck,
  },
  {
    step: "03",
    title: "Start Transacting",
    desc: "Send and receive money globally with zero friction.",
    icon: Rocket,
  },
];

function LandingHowItWorks() {
  return (
    <section className="relative bg-secondary/30 py-24 overflow-hidden">
      {/* background glow */}
      <div className="absolute inset-0 flex justify-center">
        <div className="h-[400px] w-[400px] rounded-full bg-accent/10 blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4">
        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-16 text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-4 py-2">
            <Sparkles className="h-4 w-4 text-accent" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Simple Process
            </span>
          </div>

          <h2 className="mb-4 font-display text-4xl font-bold text-foreground md:text-5xl">
            Get started in 3 simple steps
          </h2>

          <p className="mx-auto max-w-2xl text-muted-foreground">
            Your secure digital wallet is just minutes away from activation
          </p>
        </motion.div>

        {/* Steps */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="relative grid grid-cols-1 gap-10 md:grid-cols-3"
        >
          {/* connector line (desktop) */}
          <div className="absolute left-1/2 top-10 hidden h-[2px] w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-accent/30 to-transparent md:block" />

          {steps.map(({ step, title, desc, icon: Icon }, i) => (
            <motion.div
              key={step}
              variants={fadeUp}
              custom={i}
              className="group relative text-center"
            >
              {/* step number background */}
              <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-10 font-display text-7xl font-bold text-foreground/5 select-none">
                {step}
              </div>

              {/* icon */}
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-accent/20 bg-accent/10 shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                <Icon className="h-7 w-7 text-accent" />
              </div>

              {/* content */}
              <h3 className="mb-2 text-xl font-semibold text-foreground">
                {title}
              </h3>

              <p className="text-sm leading-relaxed text-muted-foreground">
                {desc}
              </p>

              {/* arrow (mobile flow hint) */}
              {i !== steps.length - 1 && (
                <div className="mt-6 flex justify-center md:hidden">
                  <ArrowRight className="h-5 w-5 text-accent/50" />
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default LandingHowItWorks;
