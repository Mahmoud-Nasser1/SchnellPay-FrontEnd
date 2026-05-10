import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Shield, Home, ArrowLeft, Search, HelpCircle, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/lib/motion";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: Accessing non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background px-4 py-20">
      {/* BACKGROUND ELEMENTS */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-[10%] -left-[10%] h-[40%] w-[40%] rounded-full bg-accent/5 blur-[120px]" />
        <div className="absolute -bottom-[10%] -right-[10%] h-[40%] w-[40%] rounded-full bg-primary/5 blur-[120px]" />
        <div 
          className="absolute inset-0 opacity-[0.03]" 
          style={{ 
            backgroundImage: "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)", 
            backgroundSize: "40px 40px" 
          }} 
        />
      </div>

      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="container relative z-10 mx-auto flex max-w-2xl flex-col items-center"
      >
        {/* LOGO */}
        <motion.div variants={fadeUp} className="mb-12">
          <Link to="/" className="flex items-center gap-2.5 font-display text-2xl font-bold transition-opacity hover:opacity-80">
            <div className="gradient-accent flex h-9 w-9 items-center justify-center rounded-xl shadow-glow">
              <Shield className="h-5 w-5 text-accent-foreground" />
            </div>
            <span className="text-foreground">Secure<span className="text-accent">Wallet</span></span>
          </Link>
        </motion.div>

        {/* HERO SECTION */}
        <div className="relative mb-8 flex flex-col items-center">
          <motion.div
            variants={fadeUp}
            className="select-none font-display text-[150px] font-black leading-none tracking-tighter opacity-[0.07] md:text-[220px]"
          >
            404
          </motion.div>
          <motion.div
            variants={fadeUp}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="gradient-accent flex h-24 w-24 animate-float items-center justify-center rounded-3xl shadow-glow md:h-32 md:w-32">
              <Search className="h-10 w-10 text-accent-foreground md:h-14 md:w-14" />
            </div>
          </motion.div>
        </div>

        {/* TEXT CONTENT */}
        <motion.div variants={fadeUp} className="text-center">
          <h1 className="mb-4 font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            Lost in the digital void?
          </h1>
          <p className="mx-auto mb-8 max-w-md text-lg leading-relaxed text-muted-foreground">
            We couldn't find the page you're looking for. It might have been moved, deleted, or never existed.
          </p>

          <div className="mb-10 inline-flex flex-wrap items-center justify-center gap-3 rounded-2xl border border-border bg-muted/30 px-5 py-3 backdrop-blur-sm">
            <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/60">Path Error:</span>
            <span className="font-mono text-sm font-medium text-accent">{location.pathname}</span>
          </div>
        </motion.div>

        {/* ACTIONS */}
        <motion.div variants={fadeUp} className="flex w-full flex-col items-center justify-center gap-4 sm:flex-row">
          <Button variant="accent" size="xl" asChild className="h-14 w-full px-8 shadow-glow sm:w-auto">
            <Link to="/">
              <Home className="mr-2 h-5 w-5" />
              Back to Home
            </Link>
          </Button>
          <Button variant="outline" size="xl" asChild className="h-14 w-full border-border bg-card px-8 sm:w-auto">
            <Link to="/dashboard">
              <ArrowLeft className="mr-2 h-5 w-5" />
              User Dashboard
            </Link>
          </Button>
        </motion.div>

        {/* QUICK LINKS GRID */}
        <motion.div variants={fadeUp} className="mt-16 w-full border-t border-border pt-12">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { label: "Help Center", to: "/faq", icon: HelpCircle },
              { label: "Contact Support", to: "/contact", icon: Mail },
              { label: "About Us", to: "/about", icon: Shield },
              { label: "Back Home", to: "/", icon: Home },
            ].map(({ label, to, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                className="group flex flex-col items-center gap-3 rounded-2xl border border-border bg-card p-4 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-md"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted transition-colors group-hover:bg-accent/10 group-hover:text-accent">
                  <Icon className="h-5 w-5" />
                </div>
                <span className="text-xs font-bold text-foreground/80 group-hover:text-accent">{label}</span>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* FOOTER BADGE */}
        <motion.div variants={fadeUp} className="mt-16">
          <div className="secure-badge bg-muted/50 py-2 px-4 border-none shadow-sm">
            <Shield className="h-3.5 w-3.5 text-accent" />
            <span className="text-[11px] font-bold uppercase tracking-wider opacity-70">
              Verified Secure Infrastructure
            </span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFound;
