import type { Metadata } from "next";
import Script from "next/script";
import type { ReactNode } from "react";
import { LanguageProvider } from "@/lib/language-context";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Xiaohongshu Downloader - Download Videos and Images",
  description:
    "Free and easy-to-use Xiaohongshu downloader tool. Download videos and images without watermarks directly from Xiaohongshu (RED) to your device. No installation required.",
  keywords: ["xiaohongshu", "downloader", "video download", "image download", "RED"],
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/assets/images/favicon.png", type: "image/png" },
    ],
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: "Xiaohongshu Downloader",
    description:
      "Download Xiaohongshu videos and images without watermarks. Free, safe and easy to use.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4988552421895566"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-PDMK4XW92X"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-PDMK4XW92X');`}
        </Script>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
