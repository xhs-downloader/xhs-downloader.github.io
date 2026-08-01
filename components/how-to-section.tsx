"use client";

import { useTranslation } from "@/lib/language-context";

export default function HowToSection() {
  const { t } = useTranslation();

  return (
    <section className="home-section" id="how-to">
      <div>
        <div className="home-section-title">
          <h2>{t("how-to-title")}</h2>
          <p>{t("how-to-description")}</p>
        </div>

        <div className="how-to-steps">
          <div className="step">
            <div className="step-number">1</div>
            <h3>{t("step-1-title")}</h3>
            <p>{t("step-1-description")}</p>
          </div>

          <div className="step">
            <div className="step-number">2</div>
            <h3>{t("step-2-title")}</h3>
            <p>{t("step-2-description")}</p>
          </div>

          <div className="step">
            <div className="step-number">3</div>
            <h3>{t("step-3-title")}</h3>
            <p>{t("step-3-description")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
