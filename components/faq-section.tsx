"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "@/lib/language-context";

export default function FAQSection() {
  const { t } = useTranslation();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const faqItems = [
    { key: "1" },
    { key: "2" },
    { key: "3" },
    { key: "4" },
    { key: "5" },
  ];

  const handleToggleFAQ = (index: number) => {
    if (!isClient) return;
    const items = document.querySelectorAll(".faq-item");
    items[index]?.classList.toggle("active");
    const icon = items[index]?.querySelector("span:last-child");
    if (icon) {
      icon.textContent = items[index]?.classList.contains("active") ? "-" : "+";
    }
  };

  return (
    <section className="home-section" id="faq">
      <div>
        <div className="home-section-title">
          <h2>{t("faq-title")}</h2>
          <p>{t("faq-description")}</p>
        </div>

        <div className="faq-container">
          {faqItems.map((item, index) => (
            <div key={item.key} className="faq-item active">
              <div className="faq-question" onClick={() => handleToggleFAQ(index)}>
                <span>{t(`faq-${item.key}-question`)}</span>
                <span>-</span>
              </div>
              <div className="faq-answer">
                <p>{t(`faq-${item.key}-answer`)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
