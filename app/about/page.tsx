import Header from "@/components/header";
import Footer from "@/components/footer";
import AboutContent from "@/components/about-content";

export const metadata = {
  title: "About - Xiaohongshu Downloader",
  description: "About Xiaohongshu Downloader",
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        <div className="container">
          <AboutContent />
        </div>
      </main>
      <Footer />
    </>
  );
}
