import {
  Rocket,
  ShieldCheck,
  Globe2,
  BarChart3,
  WalletCards,
  Fingerprint,
  Zap,
} from "lucide-react";
import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/lib/motion";

const features = [
  {
    icon: Rocket,
    title: "Instant Transfers",
    desc: "Send money globally in seconds with near-zero fees.",
  },
  {
    icon: ShieldCheck,
    title: "Bank-Grade Security",
    desc: "256-bit encryption, biometric auth, and real-time fraud detection.",
  },
  {
    icon: Globe2,
    title: "150+ Countries",
    desc: "Accept and send payments in 50+ currencies worldwide.",
  },
  {
    icon: BarChart3,
    title: "Smart Analytics",
    desc: "Visualize your spending and earning patterns with AI insights.",
  },
  {
    icon: WalletCards,
    title: "Virtual Cards",
    desc: "Generate unlimited virtual cards for secure online shopping.",
  },
  {
    icon: Fingerprint,
    title: "2FA & Biometrics",
    desc: "Multiple layers of authentication keep your funds safe.",
  },
];

function LandingFeatures() {
  return (
    <section id="features" className="bg-background py-24">
      <div className="container mx-auto px-4">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-16 text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-3 py-1.5">
            <Zap className="h-3 w-3 text-accent" />
            <span className="text-xs font-semibold uppercase tracking-wide text-accent">
              Powerful Features
            </span>
          </div>

          <h2 className="mb-4 font-display text-4xl font-bold text-foreground md:text-5xl">
            Everything you need to manage money
          </h2>

          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            From instant global transfers to advanced analytics, SecureWallet is
            built for the modern economy.
          </p>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              variants={fadeUp}
              custom={i}
              className="group rounded-2xl border border-border bg-card/80 backdrop-blur-sm p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_0_40px_rgba(59,130,246,0.15)]"
            >
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10 border border-accent/20 shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                <feature.icon className="h-7 w-7 text-accent" />
              </div>

              <h3 className="mb-2 font-display text-xl font-semibold text-foreground">
                {feature.title}
              </h3>

              <p className="text-sm leading-relaxed text-muted-foreground">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default LandingFeatures;
