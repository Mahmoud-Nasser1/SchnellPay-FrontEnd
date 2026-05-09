import { MessageSquare, HeadphonesIcon, Mail, Shield } from "lucide-react";
import { motion } from "framer-motion";
import { scaleIn, stagger, viewport } from "@/lib/motion";

const supportOptions = [
  {
    icon: MessageSquare,
    title: "Live Chat",
    desc: "Chat with our team in real-time",
    badge: "Online now",
    accent: "emerald",
  },
  {
    icon: HeadphonesIcon,
    title: "Phone Support",
    desc: "Speak to a specialist directly",
    badge: "< 2 min wait",
    accent: "blue",
  },
  {
    icon: Mail,
    title: "Email Us",
    desc: "Get a detailed written response",
    badge: "< 2 hr reply",
    accent: "purple",
  },
  {
    icon: Shield,
    title: "Security Team",
    desc: "Report vulnerabilities safely",
    badge: "Encrypted",
    accent: "orange",
  },
];

const accentMap = {
  emerald: "text-emerald-600 bg-emerald-500/10 border-emerald-500/20",
  blue: "text-blue-600 bg-blue-500/10 border-blue-500/20",
  purple: "text-purple-600 bg-purple-500/10 border-purple-500/20",
  orange: "text-orange-600 bg-orange-500/10 border-orange-500/20",
};

function ContactSupportOptions() {
  return (
    <section className="border-b border-border bg-background py-16">
      <div className="container mx-auto px-4">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="mx-auto grid max-w-5xl grid-cols-2 gap-4 md:grid-cols-4"
        >
          {supportOptions.map(
            ({ icon: Icon, title, desc, badge, accent }, i) => (
              <motion.div
                key={title}
                variants={scaleIn}
                custom={i}
                className="
                group cursor-pointer rounded-2xl
                border border-border bg-card
                p-5 text-center
                transition-all duration-300
                hover:-translate-y-1 hover:border-emerald-500 hover:shadow-lifted
              "
              >
                {/* ICON */}
                <div
                  className={`
                  mx-auto mb-3 flex h-12 w-12 items-center justify-center
                  rounded-xl border
                  transition-transform duration-300 group-hover:scale-110
                  ${accentMap[accent]}
                `}
                >
                  <Icon className="h-6 w-6" />
                </div>

                {/* TITLE */}
                <h3 className="mb-1 text-sm font-semibold text-foreground">
                  {title}
                </h3>

                {/* DESC */}
                <p className="mb-2 text-xs text-muted-foreground">{desc}</p>

                {/* BADGE */}
                <span
                  className="
                inline-flex items-center rounded-full
                border border-border bg-muted/40
                px-2 py-0.5 text-[10px] font-medium
                text-muted-foreground
                hover:border-emerald-500 transition-colors
              "
                >
                  {badge}
                </span>
              </motion.div>
            ),
          )}
        </motion.div>
      </div>
    </section>
  );
}

export default ContactSupportOptions;
