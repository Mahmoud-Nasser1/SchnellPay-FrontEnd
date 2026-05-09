import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { scaleIn, viewport } from "@/lib/motion";

function FAQCTA() {
  return (
    <motion.section
      variants={scaleIn}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      className="bg-secondary/40 py-20"
    >
      <div className="container mx-auto max-w-2xl px-4 text-center">
        <div className="gradient-accent mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl shadow-glow">
          <MessageSquare className="h-8 w-8 text-accent-foreground" />
        </div>
        <h2 className="mb-4 font-display text-3xl font-bold text-foreground">
          Still have questions?
        </h2>
        <p className="mb-8 text-muted-foreground">
          Our support team responds within 2 hours on business days.
        </p>
        <Button variant="accent" size="lg" asChild className="shadow-glow">
          <Link to="/contact">Contact Us</Link>
        </Button>
      </div>
    </motion.section>
  );
}

export default FAQCTA;
