"use client";
import { useTranslationStore } from "@/stores/translationStore";
import WeatherMini from "./WeatherMini";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { motion } from "framer-motion";

interface SectionProps {
  title: string;
  description: string;
  videoUrl?: string;
  bgColor: string;
  flags?: boolean;
  weatherDemo?: boolean;
  link?: string;
  videoOptional?: string;
  links?: { label: string; url: string }[];
}

export default function SectionRightText({
  title,
  description,
  videoUrl,
  bgColor,
  flags = false,
  weatherDemo = false,
  videoOptional,
  link,
  links,
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
            <motion.video
              src={videoUrl}
              autoPlay
              loop
              muted
              className={`w-full rounded-lg ${videoOptional} shadow-lg border border-neon-blue/20`}
              initial={{ scale: 1, boxShadow: "none" }}
              whileHover={{
                scale: 1.1,
                boxShadow: "0px 4px 15px rgba(0, 255, 255, 0.5)",
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
          ) : null}
        </div>
        <div className="text-neon-blue">
          <h2 className="text-4xl font-bold text-neon-green mb-4">{title}</h2>
          <p className="text-lg">{description}</p>
          {link ? (
            <a href={link} target="_blank">
              <FaArrowAltCircleRight />
            </a>
          ) : null}
          {links ? <a href={links[1].url}>{links[1].label}</a> : null}
        </div>
      </div>
    </section>
  );
}
