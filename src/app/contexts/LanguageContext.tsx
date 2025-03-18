// src/contexts/LanguageContext.tsx
"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

// Tipo para as traduções
interface Translations {
  Navbar: {
    home: string;
    about: string;
    projects: string;
  };
  Home: {
    title: string;
    description: string;
  };
  About: {
    title: string;
    description: string;
  };
  Projects: {
    title: string;
    description: string;
  };
  Footer: {
    about: string;
    description: string;
    links: string;
    contact: string;
    email: string;
    rights: string;
  };
}

interface LanguageContextType {
  locale: string;
  setLocale: (locale: string) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

// Função para carregar traduções dinamicamente
const loadTranslations = async (locale: string): Promise<Translations> => {
  switch (locale) {
    case "pt":
      return (await import("../../messages/pt.json")).default;
    case "en":
      return (await import("../../messages/en.json")).default;
    case "es":
      return (await import("../../messages/es.json")).default;
    default:
      return (await import("../../messages/pt.json")).default; // Fallback para "pt"
  }
};

// Função para detectar o idioma do navegador
const getBrowserLocale = (): string => {
  const browserLocales = navigator.languages || [navigator.language];
  const supportedLocales = ["pt", "en", "es"];

  // Procura o primeiro idioma suportado nas preferências do navegador
  for (const lang of browserLocales) {
    const locale = lang.split("-")[0].toLowerCase(); // Extrai "pt" de "pt-BR", "en" de "en-US", etc.
    if (supportedLocales.includes(locale)) {
      return locale;
    }
  }

  return "en"; // Fallback para "pt" se nenhum idioma suportado for encontrado
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState(getBrowserLocale()); // Usa o idioma do navegador como padrão
  const [translations, setTranslations] = useState<Translations | null>(null);

  // Carrega as traduções quando o locale muda
  useEffect(() => {
    loadTranslations(locale).then((data) => setTranslations(data));
  }, [locale]);

  const t = (key: string): string => {
    if (!translations) return key; // Retorna a chave se as traduções ainda não foram carregadas

    const keys = key.split(".");
    let value: Translations | Translations[keyof Translations] | string =
      translations;

    for (const k of keys) {
      if (typeof value === "string") return value;
      value = (value as Translations)[k as keyof Translations] ?? key;
    }

    return typeof value === "string" ? value : key;
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
