"use client";
import { useTranslationStore } from "@/stores/translationStore";
import WeatherMini from "./WeatherMini";
import { FaArrowAltCircleRight } from "react-icons/fa";

interface SectionProps {
  title: string;
  description: string;
  videoUrl?: string;
  bgColor: string;
  flags?: boolean;
  weatherDemo?: boolean;
  link?: string;
}

export default function SectionRightText({
  title,
  description,
  videoUrl,
  bgColor,
  flags = false,
  weatherDemo = false,
  link,
}: SectionProps) {
  const { t, locale, setLocale } = useTranslationStore();

  const flagsMap: { [key: string]: string } = {
    pt: "🇧🇷",
    en: "🇬🇧",
    es: "🇪🇸",
  };

  const handleFlagClick = (code: string) => {
    setLocale(code);
  };

  return (
    <section className={`${bgColor} py-16`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          {weatherDemo ? (
            <WeatherMini
              apiKey={process.env.NEXT_PUBLIC_API_KEY as string}
              accessKey={process.env.NEXT_PUBLIC_ACCESS_KEY as string}
            />
          ) : flags ? (
            <div className="bg-neon-blue/10 p-6 rounded-lg flex flex-col items-center justify-center h-full">
              <p className="text-sm text-neon-blue/80 mb-4">
                {t("ToolsAndTechs.flagsLabel")}
              </p>
              <div className="flex space-x-6">
                {Object.entries(flagsMap).map(([code, flag]) => (
                  <button
                    key={code}
                    onClick={() => handleFlagClick(code)}
                    className={`text-3xl transition-opacity duration-300 ${
                      locale === code
                        ? "opacity-100"
                        : "opacity-50 hover:opacity-75"
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
          <a href={link} target="_blank">
            <FaArrowAltCircleRight />
          </a>
        </div>
      </div>
    </section>
  );
}
