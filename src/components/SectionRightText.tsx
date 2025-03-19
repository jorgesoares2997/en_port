"use client";
import { useTranslationStore } from "@/stores/translationStore";

interface SectionProps {
  title: string;
  description: string;
  videoUrl?: string;
  bgColor: string;
  flags?: boolean;
}

export default function SectionRightText({ title, description, videoUrl, bgColor, flags = false }: SectionProps) {
  const { t, locale, setLocale } = useTranslationStore();

  const flagsMap: { [key: string]: string } = {
    pt: "🇧🇷",
    en: "🇬🇧",
    es: "🇪🇸",
  };

  const handleFlagClick = (code: string) => {
    setLocale(code); // Muda o idioma ao clicar na bandeira
  };

  return (
    <section className={`${bgColor} py-16`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          {flags ? (
            <div className="bg-neon-blue/10 p-6 rounded-lg flex flex-col items-center justify-center h-full">
              <p className="text-sm text-neon-blue/80 mb-4">{t("ToolsAndTechs.flagsLabel")}</p>
              <div className="flex space-x-6">
                {Object.entries(flagsMap).map(([code, flag]) => (
                  <button
                    key={code}
                    onClick={() => handleFlagClick(code)}
                    className={`text-3xl transition-opacity duration-300 ${
                      locale === code ? "opacity-100" : "opacity-50 hover:opacity-75"
                    }`}
                  >
                    {flag}
                  </button>
                ))}
              </div>
            </div>
          ) : videoUrl ? (
            <video
              src={videoUrl}
              autoPlay
              loop
              muted
              className="w-full rounded-lg shadow-lg border border-neon-blue/20"
            />
          ) : null}
        </div>
        <div className="text-neon-blue">
          <h2 className="text-4xl font-bold text-neon-green mb-4">{title}</h2>
          <p className="text-lg">{description}</p>
        </div>
      </div>
    </section>
  );
}