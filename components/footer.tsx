"use client";

import Link from "next/link";
import { useTranslation } from "@/lib/language-context";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer>
      <div className="footer-container">
        <div className="footer-column">
          <h3>{t("footer-about-title")}</h3>
          <p>{t("footer-about-description")}</p>
        </div>

        <div className="footer-column">
          <h3>{t("footer-links-title")}</h3>
          <ul>
            <li>
              <Link href="/">{t("footer-link-home")}</Link>
            </li>
            <li>
              <Link href="/#how-to">{t("footer-link-how-to")}</Link>
            </li>
            <li>
              <Link href="/#faq">{t("footer-link-faq")}</Link>
            </li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>{t("footer-legal-title")}</h3>
          <ul>
            <li>
              <Link href="/policy/">{t("footer-link-privacy")}</Link>
            </li>
            <li>
              <Link href="/about/">{t("footer-link-about")}</Link>
            </li>
            <li>
              <Link href="/terms/">{t("footer-terms-about")}</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="copyright-container">
        <div className="copyright">
          <p>{t("copyright-text")}</p>
        </div>
      </div>
    </footer>
  );
}
