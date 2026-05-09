import { useState, useRef } from "react";
import PublicNav from "@/components/PublicNav";
import PublicFooter from "@/components/PublicFooter";
import ContactHero from "./components/ContactHero";
import ContactSupportOptions from "./components/ContactSupportOptions";
import ContactInfo from "./components/ContactInfo";
import ContactForm from "./components/ContactForm";

function ContactPage() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const heroRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setSent(true);
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <PublicNav />
      <main className="flex-1 pt-16">
        <ContactHero heroRef={heroRef} />
        <ContactSupportOptions />
        {/* ── MAIN SECTION ── */}
        <section className="bg-secondary/30 py-24">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-5">
              <ContactInfo />
              <ContactForm
                sent={sent}
                setSent={setSent}
                loading={loading}
                handleSubmit={handleSubmit}
              />
            </div>
          </div>
        </section>
      </main>
      <PublicFooter />
    </div>
  );
}

export { ContactPage as default };
