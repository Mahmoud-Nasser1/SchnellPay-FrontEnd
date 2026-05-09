import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { fadeUp, scaleIn, fadeLeft, viewport } from "@/lib/motion";

const contactInfo = [
  {
    icon: Mail,
    label: "Email Support",
    value: "support@securewallet.io",
    desc: "We reply within 2 hours",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+1 (888) 000-WALLET",
    desc: "Mon–Fri, 9am–6pm ET",
  },
  {
    icon: MapPin,
    label: "Headquarters",
    value: "123 Fintech Ave, San Francisco",
    desc: "CA 94102, United States",
  },
  {
    icon: Clock,
    label: "Business Hours",
    value: "Mon–Fri: 9am – 6pm ET",
    desc: "Emergency support: 24/7",
  },
];

function ContactInfo() {
  return (
    <motion.div
      variants={fadeLeft}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      className="space-y-6 lg:col-span-2"
    >
      {/* HEADER */}
      <div>
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-3 py-1.5">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/10">
            <Phone className="h-3.5 w-3.5 text-accent" />
          </div>
          <span className="text-xs font-semibold uppercase tracking-wide text-accent">
            Contact Details
          </span>
        </div>

        <h2 className="mb-3 font-display text-3xl font-bold text-foreground">
          Get in touch
        </h2>

        <p className="leading-relaxed text-muted-foreground">
          Choose the channel that works best for you. Our team is always ready
          to assist.
        </p>
      </div>

      {/* CARDS */}
      <div className="space-y-4">
        {contactInfo.map(({ icon: Icon, label, value, desc }, i) => (
          <motion.div
            key={label}
            variants={fadeUp}
            custom={i}
            className="
              flex items-start gap-4
              rounded-2xl border border-border bg-card
              p-5
              transition-all duration-300
              hover:-translate-y-1 hover:border-emerald-500 hover:shadow-lifted
            "
          >
            {/* ICON */}
            <div
              className="
                flex h-11 w-11 shrink-0 items-center justify-center
                rounded-xl border border-border
                bg-muted/40 text-accent
                hover:border-emerald-500 transition-colors
              "
            >
              <Icon className="h-5 w-5" />
            </div>

            {/* TEXT */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-accent">
                {label}
              </p>

              <p className="mt-0.5 text-sm font-medium text-foreground">
                {value}
              </p>

              <p className="text-xs text-muted-foreground">{desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* MAP */}
      <motion.div
        variants={scaleIn}
        custom={0}
        className="
          relative h-40 w-full overflow-hidden
          rounded-2xl border border-border bg-card
          hover:border-emerald-500 transition-colors
        "
      >
        <div className="absolute inset-0 flex items-center justify-center bg-muted/30">
          <div className="text-center">
            <MapPin className="mx-auto mb-2 h-7 w-7 text-accent" />
            <p className="text-xs font-medium text-foreground">
              San Francisco, CA
            </p>
            <p className="text-xs text-muted-foreground">123 Fintech Avenue</p>
          </div>
        </div>

        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
            backgroundSize: "26px 26px",
          }}
        />
      </motion.div>
    </motion.div>
  );
}

export default ContactInfo;
