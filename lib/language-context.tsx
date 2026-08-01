"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { translations } from "@/lib/translations";

export type Language = "zh" | "en";

interface LanguageContextValue {
  lang: Language;
  t: (key: string) => string;
  switchLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>("en");

  useEffect(() => {
    const saved = localStorage.getItem("lang") as Language;
    if (saved === "zh" || saved === "en") setLang(saved);
  }, []);

  const t = useCallback(
    (key: string): string =>
      translations[lang]?.[key as keyof (typeof translations)["en"]] || key,
    [lang]
  );

  const switchLanguage = useCallback((newLang: Language) => {
    setLang(newLang);
    localStorage.setItem("lang", newLang);
  }, []);

  return (
    <LanguageContext.Provider value={{ lang, t, switchLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useTranslation must be used inside LanguageProvider");
  return ctx;
}
