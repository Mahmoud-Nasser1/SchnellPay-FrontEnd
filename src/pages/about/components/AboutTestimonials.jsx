import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";
import { fadeUp, scaleUp, stagger, viewport } from "@/lib/motion";

const testimonials = [
  {
    name: "Sofia Martinez",
    role: "CFO, TechCorp",
    avatar: "SM",
    text: "SecureWallet transformed our cross-border payroll. What took days now takes minutes.",
    stars: 5,
  },
  {
    name: "James Osei",
    role: "E-commerce Founder",
    avatar: "JO",
    text: "The virtual cards and instant transfers cut our payment costs by 40%. Incredible product.",
    stars: 5,
  },
  {
    name: "Yuki Tanaka",
    role: "Freelance Designer",
    avatar: "YT",
    text: "I receive payments from 12 countries. The currency conversion is seamless.",
    stars: 5,
  },
];

function AboutTestimonials() {
  return (
    <section className="bg-background py-24">
      <div className="container mx-auto px-4">

        {/* HEADER */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="mb-16 text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-200/40 bg-amber-50/60 px-3 py-1.5">
            <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
            <span className="text-xs font-semibold uppercase tracking-wide text-amber-700">
              Testimonials
            </span>
          </div>

          <h2 className="mb-4 font-display text-4xl font-bold text-foreground">
            Loved by businesses worldwide
          </h2>

          <p className="text-muted-foreground">
            Real feedback from teams using SecureWallet every day
          </p>
        </motion.div>

        {/* GRID */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-3"
        >
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              variants={scaleUp}
              custom={i}
              className="
                group relative overflow-hidden rounded-2xl
                border border-border bg-card
                p-6
                transition-all duration-300
                hover:-translate-y-1
                hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)]
              "
            >

              {/* QUOTE ICON */}
              <Quote className="absolute right-5 top-5 h-10 w-10 text-muted-foreground/10" />

              {/* STARS */}
              <div className="mb-4 flex gap-1">
                {Array.from({ length: t.stars }).map((_, j) => (
                  <Star
                    key={j}
                    className="h-4 w-4 fill-amber-500 text-amber-500"
                  />
                ))}
              </div>

              {/* TEXT */}
              <p className="mb-6 text-sm leading-relaxed text-foreground/80">
                “{t.text}”
              </p>

              {/* USER */}
              <div className="flex items-center gap-3">
                <div className="
                  flex h-10 w-10 items-center justify-center
                  rounded-full bg-gradient-to-br from-emerald-500 to-teal-500
                  text-xs font-bold text-white shadow-sm
                ">
                  {t.avatar}
                </div>

                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {t.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {t.role}
                  </p>
                </div>
              </div>

            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}

export default AboutTestimonials;