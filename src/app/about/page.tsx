"use client";
import { useTranslationStore } from "@/stores/translationStore";
import AboutMeSection from "@/components/AboutMeSection";
import AboutPortfolioSection from "@/components/AboutPortfolioSection";

export default function About() {
  const { t } = useTranslationStore();

  return (
    <div className="min-h-screen">
      <h1 className="text-5xl md:text-6xl font-bold text-neon-green mb-12 text-center pt-16 animate-fade-in">
        {t("About.title")}
      </h1>
      <AboutMeSection />
      <AboutPortfolioSection />
    </div>
  );
}
