import {
  ShieldCheck,
  LockKeyhole,
  ScanFace,
  BadgeCheck,
  Check,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";
import { slideLeft, slideRight, scaleIn, fadeUp } from "@/lib/motion";

function LandingSecuritySection() {
  const securityItems = [
    "256-bit AES end-to-end encryption",
    "Real-time AI fraud detection & alerts",
    "Biometric & multi-factor authentication",
    "Zero-knowledge infrastructure",
    "Continuous third-party security audits",
  ];

  const securityCards = [
    {
      icon: ShieldCheck,
      title: "Encrypted",
      desc: "Advanced encryption secures all transactions and data.",
    },
    {
      icon: LockKeyhole,
      title: "Multi-Layer Protection",
      desc: "2FA and smart device verification for every login.",
    },
    {
      icon: ScanFace,
      title: "Biometric Access",
      desc: "Face ID and fingerprint authentication support.",
    },
    {
      icon: BadgeCheck,
      title: "Certified Security",
      desc: "Compliant with PCI DSS and SOC 2 standards.",
    },
  ];

  return (
    <section
      id="security"
      className="relative overflow-hidden bg-secondary/30 py-24"
    >
      {/* Background Glow */}
      <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-accent/10 blur-3xl" />

      <div className="container relative z-10 mx-auto px-4">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          {/* Left Content */}
          <motion.div
            variants={slideLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-4 py-2 backdrop-blur-sm">
              <Sparkles className="h-4 w-4 text-accent" />

              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                Enterprise Security
              </span>
            </div>

            <h2 className="mb-6 max-w-xl font-display text-4xl font-bold leading-tight text-foreground md:text-5xl">
              Your funds protected with{" "}
              <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                next-generation security
              </span>
            </h2>

            <p className="mb-10 max-w-lg text-lg leading-relaxed text-muted-foreground">
              Built with banking-level infrastructure, intelligent fraud
              monitoring, and advanced authentication systems to keep your
              assets secure 24/7.
            </p>

            <div className="space-y-4">
              {securityItems.map((item, i) => (
                <motion.div
                  key={item}
                  variants={fadeUp}
                  custom={i}
                  className="group flex items-center gap-4 rounded-xl border border-border/60 bg-background/50 p-4 backdrop-blur-sm transition-all duration-300 hover:border-accent/30 hover:bg-background"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/10 transition-all duration-300 group-hover:scale-110">
                    <Check className="h-4 w-4 text-accent" />
                  </div>

                  <span className="text-sm font-medium text-foreground/90">
                    {item}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Cards */}
          <motion.div
            variants={slideRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="relative"
          >
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {securityCards.map(({ icon: Icon, title, desc }, i) => (
                <motion.div
                  key={title}
                  variants={scaleIn}
                  custom={i}
                  className="group relative overflow-hidden rounded-3xl border border-border/60 bg-background/70 p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-accent/30 hover:shadow-[0_0_50px_rgba(59,130,246,0.12)]"
                >
                  {/* Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  <div className="relative z-10">
                    <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-accent/20 bg-accent/10 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                      <Icon className="h-7 w-7 text-accent" />
                    </div>

                    <h4 className="mb-2 text-lg font-semibold text-foreground">
                      {title}
                    </h4>

                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default LandingSecuritySection;
