"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { translations, Language } from "./translations";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, replacements?: Record<string, string>) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("ar");

  // Load language from localStorage on mount
  useEffect(() => {
    try {
      const savedLang = localStorage.getItem("lang") as Language;
      if (savedLang && (savedLang === "en" || savedLang === "ar" || savedLang === "fr")) {
        setLanguageState(savedLang);
      }
    } catch {}
  }, []);

  const setLanguage = useCallback((lang: Language) => {
    if (lang === language) return;

    if (typeof document !== "undefined") {
      document.body.classList.add("switching-lang");
    }

    setTimeout(() => {
      setLanguageState(lang);
      try {
        localStorage.setItem("lang", lang);
      } catch {}

      // Keep the logo overlay fully visible for 500ms before starting to fade back out
      setTimeout(() => {
        if (typeof document !== "undefined") {
          document.body.classList.remove("switching-lang");
        }
      }, 500);
    }, 250);
  }, [language]);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  }, [language]);

  const t = useCallback(
    (key: string, replacements?: Record<string, string>): string => {
      const entry = translations[key];
      if (!entry) return key;
      let text = entry[language] ?? entry.en ?? key;
      if (replacements) {
        for (const [k, v] of Object.entries(replacements)) {
          text = text.replace(`{${k}}`, v);
        }
      }
      return text;
    },
    [language]
  );

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      <div className="switching-lang-overlay">
        <img src="/assets/logo.png" alt="Hollah" className="h-20 md:h-24 object-contain animate-pulse-slow" />
      </div>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
