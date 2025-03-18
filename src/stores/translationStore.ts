// src/stores/translationStore.ts
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
    techStackTitle: string;
    techStackDescription: string;
    tech: {
      nextjs: string;
      typescript: string;
      tailwind: string;
      zustand: string;
      tsparticles: string;
    };
    contactPrompt: string;
    cta: string;
  };
  About: {
    title: string;
    description: string;
  };
  Projects: {
    title: string;
    description: string;
  };
  Contact: {
    title: string;
    myInfo: string;
    sendMessage: string;
    form: {
      name: string;
      email: string;
      message: string;
    };
    submit: string;
    sending: string;
    successMessage: string;
    errorMessage: string;
    loginToWhatsApp: string;
    techDescription: string;
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
      return (await import("../messages/pt.json")).default;
  }
};

const getBrowserLocale = (): string => {
  const browserLocales = navigator.languages || [navigator.language];
  const supportedLocales = ["pt", "en", "es"];
  for (const lang of browserLocales) {
    const locale = lang.split("-")[0].toLowerCase();
    if (supportedLocales.includes(locale)) {
      return locale;
    }
  }
  return "pt";
};

interface TranslationState {
  locale: string;
  translations: Translations | null;
  setLocale: (locale: string) => void;
  t: (key: string) => string;
}

export const useTranslationStore = create<TranslationState>((set, get) => ({
  locale: getBrowserLocale(),
  translations: null,

  setLocale: async (locale: string) => {
    const translations = await loadTranslations(locale);
    set({ locale, translations });
  },

  t: (key: string) => {
    const { translations } = get();
    if (!translations) return key;
    const keys = key.split(".");
    let value: Translations | Translations[keyof Translations] | string = translations;
    for (const k of keys) {
      if (typeof value === "string") return value;
      value = (value as Translations)[k as keyof Translations] ?? key;
    }
    return typeof value === "string" ? value : key;
  },
}));

const initializeTranslations = async () => {
  const { setLocale, locale } = useTranslationStore.getState();
  await setLocale(locale);
};
initializeTranslations();