import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Shield,
  Star,
  Zap,
  Globe,
  TrendingUp,
  CreditCard,
} from "lucide-react";
import { fadeUp, stagger } from "@/lib/motion";

const benefits = [
  { icon: Zap, text: "Instant global transfers" },
  { icon: Globe, text: "150+ countries supported" },
  { icon: TrendingUp, text: "Smart analytics & insights" },
  { icon: CreditCard, text: "Free virtual cards" },
];

const testimonial = {
  name: "Sarah Johnson",
  role: "E-commerce Owner",
  avatar: "SJ",
  text: "SchnellPay transformed how I manage business finances. Absolutely love it!",
  stars: 5,
};

function RegisterSidebar() {
  return (
    <motion.aside
      initial={{ x: -60, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="gradient-hero relative hidden flex-col justify-between overflow-hidden p-12 lg:flex lg:w-5/12"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute -right-20 top-20 h-[420px] w-[420px] rounded-full opacity-[0.10]"
          style={{
            background:
              "radial-gradient(circle, hsl(162 90% 45%), transparent 70%)",
          }}
        />
        <div
          className="absolute -bottom-24 -left-24 h-[320px] w-[320px] rounded-full opacity-[0.06]"
          style={{
            background:
              "radial-gradient(circle, hsl(213 70% 50%), transparent 70%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(hsl(0 0% 100%) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 100%) 1px, transparent 1px)",
            backgroundSize: "42px 42px",
          }}
        />
      </div>

      {/* Logo */}
      <Link
        to="/"
        className="relative z-10 flex items-center gap-2 font-display text-xl font-bold text-primary-foreground"
      >
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent shadow-glow">
          <Shield className="h-4.5 w-4.5 text-accent-foreground" />
        </div>
        Schnell<span className="text-accent">Pay</span>
      </Link>

      {/* Content */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="relative z-10 space-y-10"
      >
        {/* Heading */}
        <motion.div variants={fadeUp}>
          <h2 className="mb-3 font-display text-3xl font-bold leading-tight text-primary-foreground">
            Join 2.4M+ users managing money{" "}
            <span className="text-accent">securely</span>
          </h2>
          <p className="text-sm leading-relaxed text-primary-foreground/70">
            Free forever. No hidden fees. Built with enterprise-grade security
            for everyone.
          </p>
        </motion.div>

        {/* Benefits */}
        <motion.div variants={stagger} className="space-y-3">
          {benefits.map(({ icon: Icon, text }, i) => (
            <motion.div
              key={text}
              variants={fadeUp}
              custom={i}
              className="flex items-center gap-3"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/15">
                <Icon className="h-4 w-4 text-accent" />
              </div>
              <span className="text-sm font-medium text-primary-foreground/85">
                {text}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonial */}
        <motion.div
          variants={fadeUp}
          className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md"
        >
          <div className="mb-3 flex gap-1">
            {Array.from({ length: testimonial.stars }).map((_, i) => (
              <Star
                key={i}
                className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400"
              />
            ))}
          </div>

          <p className="mb-4 text-sm italic leading-relaxed text-primary-foreground/80">
            “{testimonial.text}”
          </p>

          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-xs font-bold text-white">
              {testimonial.avatar}
            </div>
            <div>
              <p className="text-xs font-semibold text-primary-foreground">
                {testimonial.name}
              </p>
              <p className="text-xs text-primary-foreground/60">
                {testimonial.role}
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Footer */}
      <p className="relative z-10 text-xs text-primary-foreground/30">
        © 2025 SecureWallet. All rights reserved.
      </p>
    </motion.aside>
  );
}

export default RegisterSidebar;