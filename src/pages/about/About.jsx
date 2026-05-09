import PublicNav from "@/components/PublicNav";
import PublicFooter from "@/components/PublicFooter";
import AboutHero from "./components/AboutHero";
import AboutStats from "./components/AboutStats";
import AboutMission from "./components/AboutMission";
import AboutValues from "./components/AboutValues";
import AboutTeam from "./components/AboutTeam";
import AboutTestimonials from "./components/AboutTestimonials";
import AboutCTA from "./components/AboutCTA";

function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <PublicNav />
      <main className="flex-1 pt-16">
        <AboutHero />
        <AboutStats />
        <AboutTeam />

        <AboutMission />
        <AboutTestimonials />

        <AboutValues />
        <AboutCTA />
      </main>
      <PublicFooter />
    </div>
  );
}

export { AboutPage as default };
