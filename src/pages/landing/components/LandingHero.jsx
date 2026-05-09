import { Link } from "react-router-dom";
import {
  Shield,
  ArrowRight,
  TrendingUp,
  Send,
  CheckCircle,
  ChevronDown,
  Play,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import heroDashboard from "@/assets/hero-dashboard.jpg";
import { motion } from "framer-motion";
import { fadeUp, fadeDown, slideRight, stagger } from "@/lib/motion";

function LandingHero() {
  return (
<section className="relative min-h-screen overflow-hidden flex items-center bg-[#f6fbf8] dark:bg-background transition-colors duration-300">      {/* ================= BACKGROUND ================= */}
      <div className="pointer-events-none absolute inset-0">
        {/* main glow (top right) - optimized for light mode */}
        <div className="absolute -top-40 right-0 h-[600px] w-[600px] rounded-full bg-accent/5 blur-[100px] dark:bg-accent/10 dark:blur-3xl" />

        {/* secondary glow (bottom left) */}
        <div className="absolute -bottom-40 left-0 h-[600px] w-[600px] rounded-full bg-primary/5 blur-[100px] dark:bg-primary/10 dark:blur-3xl" />

        {/* soft grid texture - slightly more visible in light mode */}
        <div
          className="absolute inset-0 opacity-[0.05] dark:opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      {/* ================= CONTENT ================= */}
      <div className="container relative z-10 mx-auto px-4 pt-28 pb-16">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          {/* LEFT SIDE */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            {/* badge */}
            <motion.div
              variants={fadeDown}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50/50 px-4 py-2 backdrop-blur-sm dark:border-border dark:bg-muted/40"
            >
              <Sparkles className="h-4 w-4 text-accent" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-foreground/80">
                Trusted by 2.4M+ users worldwide
              </span>
            </motion.div>

            {/* title */}
            <motion.h1
              variants={fadeUp}
              className="font-display text-5xl font-extrabold leading-[1.1] text-slate-900 md:text-6xl lg:text-7xl dark:text-foreground"
            >
              The Future of{" "}
              <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                Digital Finance
              </span>{" "}
              is Here
            </motion.h1>

            {/* description */}
            <motion.p
              variants={fadeUp}
              className="max-w-xl text-lg leading-relaxed text-slate-600 dark:text-muted-foreground"
            >
              Send, receive, and manage money globally with enterprise-grade
              security. One wallet. Every currency. Zero hassle.
            </motion.p>

            {/* buttons */}
            <motion.div
              variants={fadeUp}
              className="flex flex-col gap-4 sm:flex-row"
            >
              <Button variant="accent" size="xl" asChild className="group shadow-lg shadow-accent/20">
                <Link to="/register">
                  Open Free Account
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>

              <Button variant="outline" size="xl" asChild className="bg-white/50 dark:bg-transparent">
                <Link to="/about" className="flex items-center">
                  <Play className="mr-2 h-4 w-4 fill-current" />
                  Watch Demo
                </Link>
              </Button>
            </motion.div>

            {/* trust badges */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
              {["PCI DSS", "SOC 2", "256-bit SSL"].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-500 shadow-sm dark:border-border dark:bg-muted/40 dark:text-muted-foreground"
                >
                  <Shield className="h-3.5 w-3.5 text-accent" />
                  {item}
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT SIDE */}
          <motion.div
            variants={slideRight}
            initial="hidden"
            animate="visible"
            className="relative hidden lg:block"
          >
            {/* glow behind card - subtle in light mode */}
            <div className="absolute -inset-10 rounded-3xl bg-accent/5 blur-[80px] dark:bg-accent/10 dark:blur-3xl" />

            <div className="relative animate-float">
              {/* dashboard card */}
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-border dark:bg-card">
                <img
                  src={heroDashboard}
                  alt="Dashboard"
                  className="w-full object-cover"
                />

                {/* LIVE badge */}
                <div className="absolute right-6 top-6 flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-[10px] font-black tracking-widest text-accent-foreground shadow-lg">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-white" />
                  LIVE
                </div>

                {/* balance card */}
                <div className="absolute bottom-6 left-6 right-6 rounded-xl border border-slate-100 bg-white/90 p-5 shadow-lg backdrop-blur dark:border-border dark:bg-background/80">
                  <p className="text-xs font-medium text-slate-500 dark:text-muted-foreground">Total Balance</p>
                  <p className="text-3xl font-bold text-slate-900 dark:text-foreground">
                    $48,250.00
                  </p>

                  <div className="mt-2 flex items-center gap-1.5 text-emerald-600 dark:text-accent">
                    <TrendingUp className="h-4 w-4" />
                    <span className="text-sm font-semibold">+12.4% this month</span>
                  </div>
                </div>
              </div>

              {/* floating stat 1 - Sent */}
              <div className="absolute -left-12 top-1/3 hidden lg:block">
                <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xl backdrop-blur-md dark:border-border dark:bg-background/80">
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-accent/10 p-2 text-accent">
                        <Send className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-tight text-slate-400">
                        Sent today
                      </p>
                      <p className="text-lg font-bold text-slate-900 dark:text-foreground">$1,240</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* floating stat 2 - Verified */}
              <div className="absolute -right-6 top-12 hidden lg:block">
                <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xl backdrop-blur-md dark:border-border dark:bg-background/80">
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-emerald-100 p-2 text-emerald-600">
                        <CheckCircle className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-tight text-slate-400">
                        Security
                      </p>
                      <p className="text-sm font-bold text-emerald-600">Verified</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="h-6 w-6 text-slate-400" />
      </div>
    </section>
  );
}

export default LandingHero;