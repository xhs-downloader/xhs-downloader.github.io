import Header from "@/components/header";
import Footer from "@/components/footer";
import PolicyContent from "@/components/policy-content";

export const metadata = {
  title: "Policy - Xiaohongshu Downloader",
  description: "Privacy Policy for Xiaohongshu Downloader",
};

export default function PolicyPage() {
  return (
    <>
      <Header />
      <main>
        <div className="container">
          <PolicyContent />
        </div>
      </main>
      <Footer />
    </>
  );
}
