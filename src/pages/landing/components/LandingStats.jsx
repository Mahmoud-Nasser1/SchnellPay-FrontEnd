import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/lib/motion";

const stats = [
  { label: "Active Users", value: "2.4M+" },
  { label: "Transactions Daily", value: "$180M+" },
  { label: "Countries", value: "150+" },
  { label: "Uptime SLA", value: "99.99%" },
];

function LandingStats() {
  return (
    <section className="relative border-y border-border bg-primary dark:bg-primary overflow-hidden">

      {/* ================= LIGHT MODE MINT BACKGROUND ================= */}
      <div className="pointer-events-none absolute inset-0 dark:hidden">

        {/* soft mint background */}
        <div className="absolute inset-0 bg-[#f3faf6]" />

        {/* subtle green glow */}
        <div className="absolute -top-24 left-1/4 h-[280px] w-[280px] rounded-full bg-emerald-200/20 blur-3xl" />
        <div className="absolute -bottom-24 right-1/4 h-[280px] w-[280px] rounded-full bg-teal-200/20 blur-3xl" />

        {/* texture */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, #000 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="container relative mx-auto px-4 py-16">

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-2 gap-8 md:grid-cols-4"
        >

          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              variants={fadeUp}
              custom={i}
              className="text-center"
            >

              {/* VALUE */}
              <p className="
                mb-1 font-display text-3xl font-bold md:text-4xl
                text-foreground dark:text-accent
              ">
                {stat.value}
              </p>

              {/* LABEL */}
              <p className="
                text-sm text-muted-foreground
                dark:text-primary-foreground/65
              ">
                {stat.label}
              </p>

            </motion.div>
          ))}

        </motion.div>

      </div>
    </section>
  );
}

export default LandingStats;