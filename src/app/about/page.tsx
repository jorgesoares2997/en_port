// src/app/about/page.tsx
"use client";
import { useLanguageStore } from "@/stores/languageStore";

export default function About() {
  const { t } = useLanguageStore();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold text-neon-green mb-4">
        {t("About.title")}
      </h1>
      <p className="text-lg text-neon-pink">{t("About.description")}</p>
    </div>
  );
}
