"use client";

import Link from "next/link";
import { useState } from "react";
import { useTranslation, type Language } from "@/lib/language-context";

export default function Header() {
  const { t, lang, switchLanguage } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header>
      <div className="header-container">
        <Link href="/" className="logo">
          <span>{t("logo-text")}</span>
        </Link>
        <div className="mobile-menu" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          �?
        </div>
        <nav className={`nav-menu ${mobileMenuOpen ? "active" : ""}`}>
          <ul>
            <li>
              <Link href="/">{t("nav-home")}</Link>
            </li>
            <li>
              <Link href="/#how-to">{t("nav-how-to")}</Link>
            </li>
            <li>
              <Link href="/#faq">{t("nav-faq")}</Link>
            </li>
            <li>
              <Link href="/#tools">{t("nav-tools")}</Link>
            </li>
            <li>
              <Link href="/policy/">{t("link-privacy")}</Link>
            </li>
            <li>
              <Link href="/about/">{t("link-about")}</Link>
            </li>
            <li>
              <Link href="/terms/">{t("terms-about")}</Link>
            </li>
            <li>
              <div className="language-switcher">
                <div
                  className={`language-option ${lang === "en" ? "active" : ""}`}
                  onClick={() => switchLanguage("en")}
                >
                  English
                </div>
                <div
                  className={`language-option ${lang === "zh" ? "active" : ""}`}
                  onClick={() => switchLanguage("zh")}
                >
                  中文
                </div>
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
