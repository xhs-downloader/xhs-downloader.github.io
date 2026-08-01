import Header from "@/components/header";
import Footer from "@/components/footer";
import HeroSection from "@/components/hero-section";
import HowToSection from "@/components/how-to-section";
import DownloadSection from "@/components/download-section";
import FAQSection from "@/components/faq-section";
import ToolsSection from "@/components/tools-section";

export default function HomePage() {
  return (
    <>
      <Header />
      <div className="container">
        <HeroSection />
        <HowToSection />
        <DownloadSection />
        <FAQSection />
        <ToolsSection />
      </div>
      <Footer />
    </>
  );
}
