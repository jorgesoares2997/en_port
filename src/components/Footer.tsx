// src/components/Footer.tsx
"use client";
import { useLanguageStore } from "@/stores/languageStore";

export default function Footer() {
  const { t } = useLanguageStore();

  return (
    <footer className="bg-dark-blue text-neon-blue py-8 mt-auto">
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
            <p className="mt-2 text-sm">{t("Footer.email")}</p>
          </div>
        </div>
        <div className="mt-8 text-center text-sm">
          <p>{t("Footer.rights")}</p>
        </div>
      </div>
    </footer>
  );
}
