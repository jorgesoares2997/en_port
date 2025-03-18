import { useTranslationStore } from "@/stores/translationStore";
import Link from "next/link";

export default function AboutPortfolioSection() {
  const { t } = useTranslationStore();

  return (
    <section className="bg-dark-blue/80 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-neon-green mb-6 text-center">
          {t("Aboutpage.portfolio.title")}
        </h2>
        <div className="text-neon-blue text-lg leading-relaxed space-y-4">
          <p>
            {t("Aboutpage.portfolio.intro")} <strong>Next.js</strong>
            {t("Aboutpage.portfolio.intro2")} <strong>TypeScript</strong>{" "}
            {t("Aboutpage.me.and")} <strong>Tailwind CSS</strong>
            {t("Aboutpage.portfolio.intro3")}
          </p>
          <p>
            {t("Aboutpage.portfolio.frontend1")} <strong>Zustand</strong>
            {t("Aboutpage.portfolio.frontend2")} {t("Aboutpage.portfolio.frontend3")}
          </p>
          <p>
            {t("Aboutpage.portfolio.backend1")} <strong>Java Spring Boot</strong>
            {t("Aboutpage.portfolio.backend2")}{" "}
            <Link
              href="https://compras-auth.onrender.com"
              target="_blank"
              className="text-neon-pink hover:underline"
            >
              compras-auth.onrender.com
            </Link>
            . {t("Aboutpage.portfolio.backend3")} <strong>JavaMail</strong>{" "}
            {t("Aboutpage.me.and")} <strong>JWT</strong>
            {t("Aboutpage.portfolio.backend4")}
          </p>
          <p>{t("Aboutpage.portfolio.goal")}</p>
        </div>
      </div>
    </section>
  );
}
