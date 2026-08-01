import Header from "@/components/header";
import Footer from "@/components/footer";
import TermsContent from "@/components/terms-content";

export const metadata = {
  title: "Terms - Xiaohongshu Downloader",
  description: "Terms of Service for Xiaohongshu Downloader",
};

export default function TermsPage() {
  return (
    <>
      <Header />
      <main>
        <div className="container">
          <TermsContent />
        </div>
      </main>
      <Footer />
    </>
  );
}
