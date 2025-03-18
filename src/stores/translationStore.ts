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
    techDescription: string; // Certifique-se de que essa chave está presente no JSON
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
  try {
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
  } catch (error) {
    console.error(
      `Erro ao carregar as traduções para o idioma ${locale}:`,
      error
    );
    return (await import("../messages/pt.json")).default; // Retorna PT como fallback
  }
};

// Obtém o idioma do navegador e verifica se é suportado
const getBrowserLocale = (): string => {
  const browserLocales = navigator.languages || [navigator.language];
  const supportedLocales = ["pt", "en", "es"];

  for (const lang of browserLocales) {
    const locale = lang.split("-")[0].toLowerCase();
    if (supportedLocales.includes(locale)) {
      return locale;
    }
  }
  return "pt"; // Padrão para português
};

// Definição do estado de tradução no Zustand
interface TranslationState {
  locale: string;
  translations: Translations | null;
  setLocale: (locale: string) => Promise<void>;
  t: (key: string) => string;
}

// Criação do Zustand Store
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

    return key.split(".").reduce((acc, curr) => {
      if (typeof acc !== "object" || acc === null) return key;
      return acc[curr as keyof typeof acc] ?? key;
    }, translations as unknown) as string;
  },
}));

// Inicializa as traduções ao carregar a aplicação
const initializeTranslations = async () => {
  const { locale, setLocale } = useTranslationStore.getState();
  await setLocale(locale);
};

initializeTranslations();
