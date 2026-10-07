import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
type Language = "en" | "zh";
const LanguageContext = createContext<{
  language: Language;
  setLanguage: (l: Language) => void;
  t: (en: string, zh: string) => string;
}>({ language: "en", setLanguage: () => {}, t: (en) => en });
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const saved = sessionStorage.getItem("pixel-language");
    if (saved === "zh") setLanguage("zh");
    setReady(true);
  }, []);
  useEffect(() => {
    document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
  }, [language]);
  const change = (l: Language) => {
    sessionStorage.setItem("pixel-language", l);
    setLanguage(l);
  };
  return (
    <LanguageContext.Provider
      value={{ language, setLanguage: change, t: (en, zh) => (language === "en" ? en : zh) }}
    >
      <div data-language-ready={ready}>{children}</div>
    </LanguageContext.Provider>
  );
}
export const useLanguage = () => useContext(LanguageContext);
