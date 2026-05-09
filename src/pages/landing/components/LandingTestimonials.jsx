import { Star, Quote, Sparkles, UserRound } from "lucide-react";
import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/lib/motion";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "E-commerce Owner",
    avatar: "SJ",
    text: "SecureWallet transformed how I manage business finances. The instant transfers and analytics are incredible.",
    stars: 5,
  },
  {
    name: "Marcus Chen",
    role: "Freelance Developer",
    avatar: "MC",
    text: "I receive payments from 12 countries. SecureWallet makes currency conversion seamless and affordable.",
    stars: 5,
  },
  {
    name: "Priya Sharma",
    role: "Digital Nomad",
    avatar: "PS",
    text: "The security features give me peace of mind while traveling. The biometric lock is a game changer.",
    stars: 5,
  },
];

function LandingTestimonials() {
  return (
    <section className="bg-background py-24">
      <div className="container mx-auto px-4">
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
              Customer Stories
            </span>
          </div>

          <h2 className="mb-4 font-display text-4xl font-bold text-foreground md:text-5xl">
            Loved by users worldwide
          </h2>

          <p className="text-muted-foreground">
            Real feedback from people using SecureWallet every day
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 gap-6 md:grid-cols-3"
        >
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              variants={fadeUp}
              custom={i}
              className="group relative rounded-3xl border border-border/60 bg-background/60 p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-accent/30 hover:shadow-[0_0_40px_rgba(59,130,246,0.12)]"
            >
              {/* Quote icon */}
              <Quote className="absolute right-5 top-5 h-6 w-6 text-accent/30" />

              {/* Stars */}
              <div className="mb-4 flex gap-1">
                {Array.from({ length: t.stars }).map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-accent text-accent" />
                ))}
              </div>

              {/* Text */}
              <p className="mb-6 text-sm leading-relaxed text-foreground/80 italic">
                "{t.text}"
              </p>

              {/* User */}
              <div className="flex items-center gap-3">
                <div className="relative flex h-11 w-11 items-center justify-center rounded-full bg-accent/10 border border-accent/20 text-xs font-bold text-accent">
                  {t.avatar}
                  <div className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-background border border-border">
                    <UserRound className="h-3 w-3 text-muted-foreground" />
                  </div>
                </div>

                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {t.name}
                  </p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default LandingTestimonials;
