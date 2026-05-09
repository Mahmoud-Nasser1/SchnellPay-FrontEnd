import { Send, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import {
  fadeUp,
  fadeDown,
  fadeIn,
  fadeRight,
  scaleIn,
  stagger,
  viewport,
} from "@/lib/motion";

function ContactForm({ sent, setSent, loading, handleSubmit }) {
  return (
    <motion.div
      variants={fadeRight}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      className="rounded-2xl border border-border bg-card p-8 shadow-card lg:col-span-3 hover:border-emerald-500 transition-colors"
    >
      {sent ? (
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="py-16 text-center"
        >
          <motion.div
            variants={scaleIn}
            custom={0}
            className="gradient-success mx-auto mb-6 flex h-20 w-20 animate-bounce-in items-center justify-center rounded-full shadow-glow"
          >
            <Send className="h-10 w-10 text-accent-foreground" />
          </motion.div>
          <motion.h3
            variants={fadeUp}
            custom={1}
            className="mb-3 font-display text-2xl font-bold text-foreground"
          >
            Message Sent!
          </motion.h3>
          <motion.p
            variants={fadeUp}
            custom={2}
            className="mb-2 text-muted-foreground"
          >
            We've received your message and will reply within 2 hours.
          </motion.p>
          <motion.p
            variants={fadeUp}
            custom={3}
            className="text-sm text-muted-foreground"
          >
            Check your email for a confirmation.
          </motion.p>
          <motion.div variants={fadeUp} custom={4}>
            <Button
              variant="accent"
              className="mt-6 shadow-glow"
              onClick={() => setSent(false)}
            >
              Send another message
            </Button>
          </motion.div>
        </motion.div>
      ) : (
        <motion.form
          variants={stagger}
          initial="hidden"
          animate="visible"
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <motion.div variants={fadeDown} custom={0}>
            <h3 className="mb-1 font-display text-2xl font-bold text-foreground">
              Send us a message
            </h3>
            <p className="text-sm text-muted-foreground">
              We'll get back to you within 2 hours.
            </p>
          </motion.div>
          <motion.div
            variants={fadeUp}
            custom={1}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2"
          >
            <div>
              <Label className="text-xs font-medium text-foreground">
                First Name
              </Label>
              <Input className="mt-1.5 h-11" placeholder="John" required />
            </div>
            <div>
              <Label className="text-xs font-medium text-foreground">
                Last Name
              </Label>
              <Input className="mt-1.5 h-11" placeholder="Doe" required />
            </div>
          </motion.div>
          <motion.div variants={fadeUp} custom={2}>
            <Label className="text-xs font-medium text-foreground">
              Email Address
            </Label>
            <Input
              type="email"
              className="mt-1.5 h-11"
              placeholder="you@example.com"
              required
            />
          </motion.div>
          <motion.div variants={fadeUp} custom={3}>
            <Label className="text-xs font-medium text-foreground">
              Subject
            </Label>
            <Input
              className="mt-1.5 h-11"
              placeholder="How can we help?"
              required
            />
          </motion.div>
          <motion.div variants={fadeUp} custom={4}>
            <Label className="text-xs font-medium text-foreground">
              Message
            </Label>
            <textarea
              className="mt-1.5 h-32 w-full resize-none rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground transition-all focus:outline-none focus:ring-2 focus:ring-ring/50"
              placeholder="Tell us more about your inquiry..."
              required
            />
          </motion.div>
          <motion.div variants={fadeUp} custom={5}>
            <Button
              type="submit"
              variant="accent"
              size="lg"
              className="h-12 w-full text-base shadow-glow"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-accent-foreground/30 border-t-accent-foreground" />
                  Sending...
                </div>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Send Message
                </>
              )}
            </Button>
          </motion.div>
          <motion.p
            variants={fadeIn}
            custom={6}
            className="text-center text-xs text-muted-foreground"
          >
            <Shield className="mr-1 inline h-3 w-3 text-accent" />
            Your message is encrypted and private.
          </motion.p>
        </motion.form>
      )}
    </motion.div>
  );
}

export default ContactForm;
