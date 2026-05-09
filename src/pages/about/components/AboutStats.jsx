import { Users, TrendingUp, Globe, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { scaleIn, stagger, viewport } from "@/lib/motion";
import { useRef, useState, useEffect } from "react";

const stats = [
  { label: "Active Users", value: 2.4, suffix: "M+", icon: Users },
  { label: "Daily Volume", value: 180, suffix: "M+", icon: TrendingUp },
  { label: "Countries", value: 150, suffix: "+", icon: Globe },
  { label: "Uptime SLA", value: 99.99, suffix: "%", icon: CheckCircle },
];

function AnimatedCounter({ target, suffix, decimals = 0 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
          const duration = 1800;
          const steps = 60;
          const increment = target / steps;
          let current = 0;

          const timer = setInterval(() => {
            current = Math.min(current + increment, target);
            setCount(parseFloat(current.toFixed(decimals)));
            if (current >= target) clearInterval(timer);
          }, duration / steps);
        }
      },
      { threshold: 0.5 },
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, started, decimals]);

  return (
    <span ref={ref}>
      {decimals > 0 ? count.toFixed(decimals) : count}
      {suffix}
    </span>
  );
}

function AboutStats() {
  return (
    <section className="relative border-y border-border bg-primary dark:bg-primary overflow-hidden">
      {/* ================= LIGHT MODE MINT BACKGROUND ================= */}
      <div className="pointer-events-none absolute inset-0 dark:hidden">
        {/* soft mint base */}
        <div className="absolute inset-0 bg-[#f3faf6]" />

        {/* subtle glow */}
        <div className="absolute -top-24 left-1/4 h-[300px] w-[300px] rounded-full bg-emerald-200/20 blur-3xl" />
        <div className="absolute -bottom-24 right-1/4 h-[300px] w-[300px] rounded-full bg-teal-200/20 blur-3xl" />

        {/* noise texture */}
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
          viewport={viewport}
          className="grid grid-cols-2 gap-8 md:grid-cols-4"
        >
          {stats.map(({ label, value, suffix, icon: Icon }, i) => (
            <motion.div
              key={label}
              variants={scaleIn}
              custom={i}
              className="text-center"
            >
              {/* ICON */}
              <Icon className="mx-auto mb-2 h-6 w-6 text-accent opacity-80" />

              {/* VALUE */}
              <p className="mb-1 font-display text-3xl font-bold md:text-4xl text-foreground dark:text-accent">
                <AnimatedCounter
                  target={value}
                  suffix={suffix}
                  decimals={value % 1 !== 0 ? 2 : 0}
                />
              </p>

              {/* LABEL */}
              <p className="text-sm text-muted-foreground dark:text-primary-foreground/65">
                {label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default AboutStats;
