// src/components/Footer.tsx
"use client";
import { useTranslationStore } from "@/stores/translationStore";

export default function Footer() {
  const { t } = useTranslationStore();

  return (
    <footer className="relative bg-dark-blue text-neon-blue py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-neon-green text-lg font-semibold">
              {t("Footer.about")}
            </h3>
            <p className="mt-2 text-sm">{t("Footer.description")}</p>
          </div>

          <div>
            <h3 className="text-neon-green text-lg font-semibold">
              {t("Footer.contact")}
            </h3>
            <div className="relative flex flex-col pointer-events-auto">
              <p className="mt-2 cursor-pointer hover:text-neon-pink text-sm">
                {t("Footer.email")}
              </p>

              <a
                href="https://www.linkedin.com/in/jorge-soares-18b667204/"
                className="mt-2 cursor-pointer hover:text-neon-pink text-sm"
                target="_blank"
                rel="noopener noreferrer"
              >
                Linkedin
              </a>
              <a
                href="https://github.com/jorgesoares2997"
                className="mt-2 cursor-pointer hover:text-neon-pink text-sm"
                target="_blank"
                rel="noopener noreferrer"
              >
                Github
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center text-sm">
          <p>{t("Footer.rights")}</p>
        </div>
      </div>
    </footer>
  );
}
