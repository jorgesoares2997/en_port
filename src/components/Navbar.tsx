// src/components/Navbar.tsx
"use client";
import Link from "next/link";
import { useState } from "react";
import { useTranslationStore } from "@/stores/translationStore";

export default function Navbar() {
  const { t, locale, setLocale } = useTranslationStore();
  const [isOpen, setIsOpen] = useState(false);

  const flags: { [key: string]: string } = {
    pt: "🇧🇷",
    en: "🇬🇧",
    es: "🇪🇸",
  };

  const languages = [
    { code: "pt", name: "Português" },
    { code: "en", name: "English" },
    { code: "es", name: "Español" },
  ];

  return (
    <nav className="fixed top-0 w-full bg-dark-blue/80 backdrop-blur-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-neon-green">
              Logo
            </Link>
          </div>
          <div className="flex items-center space-x-8">
            <Link
              href="/"
              className="text-neon-blue hover:text-neon-pink transition-colors"
            >
              {t("Navbar.home")}
            </Link>
            <Link
              href="/about"
              className="text-neon-blue hover:text-neon-pink transition-colors"
            >
              {t("Navbar.about")}
            </Link>
            <Link
              href="/projects"
              className="text-neon-blue hover:text-neon-pink transition-colors"
            >
              {t("Navbar.projects")}
            </Link>
            <div className="relative">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-2xl focus:outline-none"
              >
                {flags[locale]}
              </button>
              {isOpen && (
                <div className="absolute right-0 mt-2 w-12 bg-dark-blue rounded-md shadow-lg z-50">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLocale(lang.code);
                        setIsOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-neon-blue hover:text-neon-pink transition-colors"
                    >
                      {flags[lang.code]} 
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
