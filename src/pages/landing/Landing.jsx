import PublicNav from "@/components/PublicNav";
import PublicFooter from "@/components/PublicFooter";
import LandingHero from "./components/LandingHero";
import LandingStats from "./components/LandingStats";
import LandingFeatures from "./components/LandingFeatures";
import LandingSecuritySection from "./components/LandingSecuritySection";
import LandingTestimonials from "./components/LandingTestimonials";
import LandingHowItWorks from "./components/LandingHowItWorks";
import LandingFAQ from "./components/LandingFAQ";
import LandingCTA from "./components/LandingCTA";

function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <PublicNav />
      <LandingHero />
      <LandingStats />
      <LandingFeatures />
      <LandingSecuritySection />
      <LandingTestimonials />
      <LandingHowItWorks />
      <LandingFAQ />
      <LandingCTA />
      <PublicFooter />
    </div>
  );
}

export { LandingPage as default };
