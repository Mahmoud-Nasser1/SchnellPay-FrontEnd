import { Users } from "lucide-react";
import { motion } from "framer-motion";
import { fadeUp, stagger, viewport } from "@/lib/motion";

const team = [
  {
    name: "Alexandra Chen",
    role: "CEO & Co-Founder",
    img: "",
    bio: "Former VP at Goldman Sachs with 15+ years in fintech.",
  },
  {
    name: "Marcus Reed",
    role: "CTO & Co-Founder",
    img: "",
    bio: "Ex-Google engineer, built payment infra serving 50M+ users.",
  },
  {
    name: "Priya Sharma",
    role: "Head of Security",
    img: "",
    bio: "Cybersecurity expert, former NSA cryptographer.",
  },
  {
    name: "Carlos Vega",
    role: "Head of Design",
    img: "",
    bio: "Award-winning UX designer previously at Stripe & Airbnb.",
  },
  {
    name: "Elena Kowalski",
    role: "CFO",
    img: "",
    bio: "CPA with expertise in fintech compliance & global payments.",
  },
];

function AboutTeam() {
  return (
    <section className="relative py-24 bg-secondary/40 dark:bg-secondary/40 overflow-hidden">

      {/* LIGHT BACKGROUND (neutral off-white) */}
      <div className="pointer-events-none absolute inset-0 dark:hidden">
        <div className="absolute inset-0 bg-[#f6f7f8]" />
        <div className="absolute -top-24 left-1/2 h-[280px] w-[280px] -translate-x-1/2 rounded-full bg-black/5 blur-3xl" />
        <div className="absolute -bottom-24 right-1/3 h-[260px] w-[260px] rounded-full bg-black/5 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, #000 1px, transparent 0)",
            backgroundSize: "44px 44px",
          }}
        />
      </div>

      <div className="container relative mx-auto px-4">

        {/* HEADER */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="mb-16 text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200/40 bg-emerald-50/60 px-3 py-1.5">
            <Users className="h-3 w-3 text-emerald-600" />
            <span className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
              The Team
            </span>
          </div>

          <h2 className="mb-4 font-display text-4xl font-bold text-foreground">
            Meet the people behind SecureWallet
          </h2>

          <p className="mx-auto max-w-xl text-muted-foreground">
            A team of fintech veterans, security experts, and design innovators.
          </p>
        </motion.div>

        {/* GRID */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="mx-auto grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              variants={fadeUp}
              custom={i}
              className="
                group overflow-hidden rounded-2xl
                border border-border bg-card
                transition-all duration-300
                hover:-translate-y-1
                hover:shadow-[0_0_0_1px_rgba(16,185,129,0.25),0_10px_30px_rgba(16,185,129,0.15)]
              "
            >

              {/* IMAGE */}
              <div className="h-44 w-full overflow-hidden bg-muted">
                {member.img ? (
                  <img
                    src={member.img}
                    alt={member.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-sm text-muted-foreground">
                    Add Image
                  </div>
                )}
              </div>

              {/* CONTENT */}
              <div className="p-5 text-center">
                <h3 className="font-display font-bold text-foreground">
                  {member.name}
                </h3>

                <p className="mt-1 text-xs font-semibold text-emerald-600">
                  {member.role}
                </p>

                <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                  {member.bio}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}

export default AboutTeam;