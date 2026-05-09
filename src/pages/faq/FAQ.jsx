import PublicNav from "@/components/PublicNav";
import PublicFooter from "@/components/PublicFooter";
import FAQHero from "./components/FAQHero";
import FAQContent from "./components/FAQContent";
import FAQCTA from "./components/FAQCTA";

function FAQPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <PublicNav />
      <main className="flex-1 pt-16">
        <FAQHero />
        <FAQContent />
        <FAQCTA />
      </main>
      <PublicFooter />
    </div>
  );
}

export { FAQPage as default };
