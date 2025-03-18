// src/stores/languageStore.ts
import { create } from "zustand";

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

// Função para carregar traduções dinamicamente
const loadTranslations = async (locale: string): Promise<Translations> => {
  switch (locale) {
    case "pt":
      return (await import("../messages/pt.json")).default;
    case "en":
      return (await import("../messages/en.json")).default;
    case "es":
      return (await import("../messages/es.json")).default;
    default:
      return (await import("../messages/pt.json")).default; // Fallback para "pt"
  }
};

// Função para detectar o idioma do navegador
const getBrowserLocale = (): string => {
  const browserLocales = navigator.languages || [navigator.language];
  const supportedLocales = ["pt", "en", "es"];

  for (const lang of browserLocales) {
    const locale = lang.split("-")[0].toLowerCase();
    if (supportedLocales.includes(locale)) {
      return locale;
    }
  }
  return "pt"; // Fallback para "pt"
};

// Interface do estado e ações do store
interface LanguageState {
  locale: string;
  translations: Translations | null;
  setLocale: (locale: string) => void;
  t: (key: string) => string;
}

export const useLanguageStore = create<LanguageState>((set, get) => ({
  locale: getBrowserLocale(), // Inicializa com o idioma do navegador
  translations: null, // Inicialmente nulo até carregar

  // Função para mudar o idioma e carregar traduções
  setLocale: async (locale: string) => {
    const translations = await loadTranslations(locale);
    set({ locale, translations });
  },

  // Função de tradução
  t: (key: string) => {
    const { translations } = get();
    if (!translations) return key;

    const keys = key.split(".");
    let value: Translations | Translations[keyof Translations] | string =
      translations;

    for (const k of keys) {
      if (typeof value === "string") return value;
      value = (value as Translations)[k as keyof Translations] ?? key;
    }

    return typeof value === "string" ? value : key;
  },
}));

// Carrega as traduções iniciais ao criar o store
const initializeTranslations = async () => {
  const { setLocale, locale } = useLanguageStore.getState();
  await setLocale(locale); // Carrega as traduções para o idioma inicial
};
initializeTranslations();
