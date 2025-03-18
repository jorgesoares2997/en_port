import { useTranslationStore } from "@/stores/translationStore";
import Link from "next/link";

export default function AboutMeSection() {
  const { t } = useTranslationStore();

  return (
    <section className="bg-dark-blue/60 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-neon-green mb-6 text-center">
          {t("Aboutpage.me.title")}
        </h2>
        <div className="text-neon-blue text-lg leading-relaxed space-y-4">
          <p>{t("Aboutpage.me.intro")}</p>
          <p>
            {t("Aboutpage.me.expertise1")} <strong>Java Spring Boot</strong>
            {t("Aboutpage.me.expertise2")} <strong>Docker</strong>{" "}
            {t("Aboutpage.me.and")} <strong>Docker Compose</strong>
            {t("Aboutpage.me.expertise3")}
          </p>
          <p>
            {t("Aboutpage.me.frontend1")} <strong>React</strong>,{" "}
            <strong>Next.js</strong> {t("Aboutpage.me.and")} <strong>Svelte</strong>
            {t("Aboutpage.me.frontend2")} <strong>Tailwind CSS</strong>.{" "}
            {t("Aboutpage.me.frontend3")} <strong>Zustand</strong>
            {t("Aboutpage.me.frontend4")} <strong>TypeScript</strong>.{" "}
            {t("Aboutpage.me.database")} <strong>PostgreSQL</strong>
            {t("Aboutpage.me.database2")}
          </p>
          <p>
            {t("Aboutpage.me.currently1")}{" "}
            <Link
              href="https://nearx.com.br"
              target="_blank"
              className="text-neon-pink hover:underline"
            >
              NearX Innovation Platform
            </Link>
            {t("Aboutpage.me.currently2")} {t("Aboutpage.me.goal")}{" "}
            <strong>Flutter</strong>
            {t("Aboutpage.me.goal2")}
          </p>
          <p>{t("Aboutpage.me.connect")}</p>
        </div>
      </div>
    </section>
  );
}
