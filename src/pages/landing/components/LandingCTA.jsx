import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, ShieldCheck, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";

function LandingCTA() {
  return (
    <section className="relative overflow-hidden py-28 bg-gradient-to-b from-background to-secondary/20">
      {/* soft glow background */}
      <div className="absolute inset-0 flex justify-center">
        <div className="h-[500px] w-[500px] rounded-full bg-accent/10 blur-3xl" />
      </div>

      {/* subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(hsl(0 0% 100%) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 100%) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="container relative z-10 mx-auto px-4 text-center"
      >
        {/* badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-4 py-2 backdrop-blur-sm">
          <Sparkles className="h-4 w-4 text-accent" />
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            Join Millions Worldwide
          </span>
        </div>

        {/* headline */}
        <h2 className="mx-auto mb-6 max-w-3xl font-display text-4xl font-bold leading-tight text-foreground md:text-5xl">
          Ready to take control of your{" "}
          <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
            financial future
          </span>
          ?
        </h2>

        {/* subtext */}
        <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground">
          Open your free account in seconds. No hidden fees, no minimum balance
          — just secure, global financial freedom.
        </p>

        {/* buttons */}
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          {/* primary */}
          <Button
            variant="accent"
            size="xl"
            asChild
            className="group shadow-[0_0_40px_rgba(59,130,246,0.25)] hover:shadow-[0_0_60px_rgba(59,130,246,0.35)] transition-all"
          >
            <Link to="/register">
              <Zap className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
              Get Started Free
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>

          {/* secondary */}
          <Button
            variant="ghost"
            size="xl"
            asChild
            className="border border-foreground/20 text-foreground/80 hover:bg-foreground/5 hover:text-foreground"
          >
            <Link to="/login">Sign In</Link>
          </Button>
        </div>

        {/* footer note */}
        <div className="mt-10 flex flex-col items-center gap-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-accent" />
            Secure banking-grade encryption
          </div>
          <p className="text-muted-foreground/60">
            By signing up you agree to our Terms & Privacy Policy
          </p>
        </div>
      </motion.div>
    </section>
  );
}

export default LandingCTA;
