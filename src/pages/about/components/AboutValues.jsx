import { Shield, Globe, Heart, Zap, Target, Building2 } from "lucide-react";
import { motion } from "framer-motion";
import { fadeUp, scaleUp, stagger, viewport } from "@/lib/motion";

const values = [
  {
    icon: Shield,
    title: "Security First",
    desc: "Every feature starts with the question: is it secure? We never compromise.",
  },
  {
    icon: Globe,
    title: "Global Access",
    desc: "Financial inclusion for all, regardless of geography or background.",
  },
  {
    icon: Heart,
    title: "User Centric",
    desc: "We obsess over making complex financial tools simple and delightful.",
  },
  {
    icon: Zap,
    title: "Speed & Reliability",
    desc: "99.99% uptime SLA. Transactions that complete in seconds, not hours.",
  },
  {
    icon: Target,
    title: "Transparency",
    desc: "No hidden fees. Clear pricing. Honest communication always.",
  },
  {
    icon: Building2,
    title: "Enterprise Grade",
    desc: "Built for individuals and businesses of all sizes worldwide.",
  },
];

function AboutValues() {
  return (
    <section className="relative bg-background dark:bg-background py-24 overflow-hidden">

      {/* ================= LIGHT MODE MINT BACKGROUND ================= */}
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

        {/* HEADER */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="mb-16 text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-3 py-1.5">
            <Heart className="h-3 w-3 text-accent" />
            <span className="text-xs font-semibold uppercase tracking-wide text-accent">
              Core Values
            </span>
          </div>

          <h2 className="mb-4 font-display text-4xl font-bold text-foreground">
            What we stand for
          </h2>

          <p className="mx-auto max-w-xl text-muted-foreground">
            These principles guide every decision we make.
          </p>
        </motion.div>

        {/* GRID */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {values.map((item, i) => (
            <motion.div
              key={item.title}
              variants={scaleUp}
              custom={i}
              className="
                group rounded-2xl border border-border bg-card
                p-6 text-center
                transition-all duration-300
                hover:-translate-y-1 hover:border-accent/40 hover:shadow-lifted
              "
            >

              {/* ICON (unified system - no random colors) */}
              <div className="
                mx-auto mb-4 flex h-14 w-14 items-center justify-center
                rounded-2xl bg-accent/10 text-accent
                transition-transform duration-300 group-hover:scale-110
              ">
                <item.icon className="h-7 w-7" />
              </div>

              {/* TITLE */}
              <h3 className="mb-2 font-display font-bold text-foreground">
                {item.title}
              </h3>

              {/* DESC */}
              <p className="text-sm leading-relaxed text-muted-foreground">
                {item.desc}
              </p>

            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}

export default AboutValues;