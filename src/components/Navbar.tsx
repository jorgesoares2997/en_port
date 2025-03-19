"use client";
import Link from "next/link";
import { useState } from "react";
import { useTranslationStore } from "@/stores/translationStore";

export default function Navbar() {
  const { t, locale, setLocale } = useTranslationStore();
  const [isOpen, setIsOpen] = useState(false); // Para o seletor de idiomas
  const [isMobileOpen, setIsMobileOpen] = useState(false); // Para o menu mobile

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

  const navLinks = [
    { href: "/", label: t("Navbar.home") },
    { href: "/about", label: t("Navbar.about") },
    { href: "/projects", label: t("Navbar.projects") },
    { href: "/tools-and-techs", label: t("Navbar.toolsAndTechs") },
    { href: "/contact", label: t("Navbar.contact") },
  ];

  return (
    <nav className="fixed top-0 w-full bg-dark-blue/80 backdrop-blur-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-neon-green">

            </Link>
          </div>
          {/* Links Desktop */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-neon-blue hover:text-neon-pink transition-colors"
              >
                {link.label}
              </Link>
            ))}
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
          {/* Botão Hambúrguer Mobile com Animação */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="focus:outline-none"
              aria-label="Toggle mobile menu"
            >
              <svg
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
                className="text-neon-blue"
              >
                <rect
                  x="5"
                  y="9"
                  width="20"
                  height="2"
                  fill="currentColor"
                  style={{ transformOrigin: "center" }}
                  className={`transition-all duration-500 ease-in-out ${
                    isMobileOpen
                      ? "translate-y-0 rotate-45"
                      : "translate-y-0 rotate-0"
                  }`}
                />
                <rect
                  x="5"
                  y="19"
                  width="20"
                  height="2"
                  fill="currentColor"
                  style={{ transformOrigin: "center" }}
                  className={`transition-all duration-1000 ease-in-out ${
                    isMobileOpen
                      ? "translate-y-[-7px] -rotate-45"
                      : "translate-y-0 rotate-0"
                  }`}
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* Menu Mobile Dropdown com Animação */}
      <div
        className={`md:hidden bg-dark-blue/90 px-4 py-4 space-y-4 transition-all duration-1000 ease-in-out ${
          isMobileOpen
            ? "opacity-100 translate-y-0 max-h-screen"
            : "opacity-0 -translate-y-4 max-h-0 overflow-hidden"
        }`}
      >
        {isMobileOpen &&
          navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileOpen(false)}
              className="block text-neon-blue hover:text-neon-pink transition-colors text-lg"
            >
              {link.label}
            </Link>
          ))}
        {isMobileOpen && (
          <div className="flex justify-center space-x-4">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  setLocale(lang.code);
                  setIsMobileOpen(false);
                }}
                className="text-2xl text-neon-blue hover:text-neon-pink transition-colors"
              >
                {flags[lang.code]}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
