import { Link } from "react-router-dom";
import {
  ShieldCheck,
  Twitter,
  Linkedin,
  Github,
  Mail,
  Phone,
  MapPin,
  Sparkles,
} from "lucide-react";

function PublicFooter() {
  return (
    <footer className="relative mt-auto bg-primary text-primary-foreground overflow-hidden">
      {/* glow background */}
      <div className="absolute inset-0 flex justify-center">
        <div className="h-[400px] w-[400px] rounded-full bg-accent/10 blur-3xl" />
      </div>

      <div className="container relative z-10 mx-auto px-4 py-20">
        {/* Top Grid */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="mb-5 flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent/20 border border-accent/30 shadow-lg">
                <ShieldCheck className="h-4 w-4 text-accent" />
              </div>

              <span className="font-display text-xl font-bold">
                Schnell<span className="text-accent">Pay </span>
              </span>
            </div>

            <p className="mb-5 text-sm leading-relaxed text-primary-foreground/60">
              A secure and modern digital wallet built for global payments,
              analytics, and financial control.
            </p>

            {/* social */}
            <div className="flex gap-3">
              {[Twitter, Linkedin, Github].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="group flex h-9 w-9 items-center justify-center rounded-lg border border-primary-foreground/10 bg-primary-foreground/5 transition-all hover:border-accent/40 hover:bg-accent/10 hover:shadow-[0_0_20px_rgba(59,130,246,0.2)]"
                >
                  <Icon className="h-4 w-4 text-primary-foreground/70 group-hover:text-accent" />
                </a>
              ))}
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-accent flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              Product
            </h4>

            <ul className="space-y-3">
              {["Features", "Security", "Pricing", "Changelog"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-sm text-primary-foreground/60 transition-all hover:text-accent hover:translate-x-1 inline-block"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-accent">
              Company
            </h4>

            <ul className="space-y-3">
              {[
                { label: "About Us", to: "/about" },
                { label: "Contact", to: "/contact" },
                { label: "FAQ", to: "/faq" },
                { label: "Privacy Policy", to: "/privacy" },
                { label: "Terms", to: "/terms" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    className="text-sm text-primary-foreground/60 transition-all hover:text-accent hover:translate-x-1 inline-block"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-accent">
              Contact
            </h4>

            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-sm text-primary-foreground/60">
                <Mail className="h-4 w-4 text-accent" />
                support@securewallet.io
              </li>

              <li className="flex items-center gap-3 text-sm text-primary-foreground/60">
                <Phone className="h-4 w-4 text-accent" />
                +1 (888) 000-WALLET
              </li>

              <li className="flex items-center gap-3 text-sm text-primary-foreground/60">
                <MapPin className="h-4 w-4 text-accent" />
                San Francisco, CA
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-primary-foreground/10 pt-8 md:flex-row">
          <p className="text-sm text-primary-foreground/40">
            © 2025 SchnellPay. All rights reserved.
          </p>

          <div className="flex items-center gap-2 text-xs text-primary-foreground/40">
            <ShieldCheck className="h-3 w-3 text-accent" />
            <span>SSL Encrypted · PCI DSS · SOC 2 Certified</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default PublicFooter;
