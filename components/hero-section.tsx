"use client";

import { useTranslation } from "@/lib/language-context";

export default function HeroSection() {
  const { t } = useTranslation();

  return (
    <section className="hero" id="what-is-xhs-dl">
      <div>
        <div className="home-section-title hero-title">
          <h1>{t("what-is-xhs-dl-title")}</h1>
          <p>{t("what-is-xhs-dl-description")}</p>
        </div>
      </div>
    </section>
  );
}
