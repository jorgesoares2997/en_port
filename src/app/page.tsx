"use client";
import Link from "next/link";
import { useTranslationStore } from "@/stores/translationStore";
import { motion } from "framer-motion";

export default function Home() {
  const { t } = useTranslationStore();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
      {/* Cabeçalho */}
      <h1 className="text-5xl md:text-6xl font-bold text-neon-green mb-6 text-center animate-fade-in">
        {t("Home.title")}
      </h1>
      <p className="text-xl text-neon-blue mb-12 text-center max-w-3xl mx-auto">
        {t("Home.description")}
      </p>

      {/* Seção de Tecnologias */}
      <div className="bg-dark-blue/50 rounded-lg p-8 shadow-lg border border-neon-blue/20">
        <h2 className="text-3xl font-semibold text-neon-pink mb-6 text-center">
          {t("Home.techStackTitle")}
        </h2>
        <p className="text-lg text-neon-blue mb-6 text-center">
          {t("Home.techStackDescription")}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {/* Tecnologia 1: JavaMail */}
          <motion.div className="group bg-dark-bg p-4 rounded-md hover:bg-neon-blue/10 transition-all duration-300">
            <h3 className="text-xl font-bold text-neon-green group-hover:text-neon-pink">
              JavaMail
            </h3>
            <p className="text-neon-blue text-sm">{t("Home.tech.javamail")}</p>
            <Link
              href="/tools-and-techs"
              className="text-neon-blue text-sm mt-2 italic hover:text-neon-pink"
            >
              {t("Home.contactPrompt")}
            </Link>
          </motion.div>

          {/* Tecnologia 2: Intl */}
          <motion.div className="group bg-dark-bg p-4 rounded-md hover:bg-neon-blue/10 transition-all duration-300">
            <h3 className="text-xl font-bold text-neon-green group-hover:text-neon-pink">
              Intl
            </h3>
            <p className="text-neon-blue text-sm">{t("Home.tech.intl")}</p>
            <Link
              href="/tools-and-techs"
              className="text-neon-blue text-sm mt-2 italic hover:text-neon-pink"
            >
              {t("Home.contactPrompt")}
            </Link>
          </motion.div>

          {/* Tecnologia 3: Docker */}
          <motion.div className="group bg-dark-bg p-4 rounded-md hover:bg-neon-blue/10 transition-all duration-300">
            <h3 className="text-xl font-bold text-neon-green group-hover:text-neon-pink">
              Docker
            </h3>
            <p className="text-neon-blue text-sm">{t("Home.tech.docker")}</p>
            <Link
              href="/tools-and-techs"
              className="text-neon-blue text-sm mt-2 italic hover:text-neon-pink"
            >
              {t("Home.contactPrompt")}
            </Link>
          </motion.div>

          {/* Tecnologia 4: TypeScript */}
          <motion.div className="group bg-dark-bg p-4 rounded-md hover:bg-neon-blue/10 transition-all duration-300">
            <h3 className="text-xl font-bold text-neon-green group-hover:text-neon-pink">
              TypeScript
            </h3>
            <p className="text-neon-blue text-sm">{t("Home.tech.typescript")}</p>
            <Link
              href="/tools-and-techs"
              className="text-neon-blue text-sm mt-2 italic hover:text-neon-pink"
            >
              {t("Home.contactPrompt")}
            </Link>
          </motion.div>

          {/* Tecnologia 5: Tailwind CSS */}
          <motion.div className="group bg-dark-bg p-4 rounded-md hover:bg-neon-blue/10 transition-all duration-300">
            <h3 className="text-xl font-bold text-neon-green group-hover:text-neon-pink">
              Tailwind CSS
            </h3>
            <p className="text-neon-blue text-sm">{t("Home.tech.tailwind")}</p>
            <Link
              href="/tools-and-techs"
              className="text-neon-blue text-sm mt-2 italic hover:text-neon-pink"
            >
              {t("Home.contactPrompt")}
            </Link>
          </motion.div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-10">
          <Link
            href="/projects"
            className="inline-block bg-neon-green text-dark-bg px-8 py-4 rounded-md font-semibold text-lg hover:bg-neon-pink hover:text-neon-blue transition-colors"
          >
            {t("Home.cta")}
          </Link>
        </div>
      </div>
    </div>
  );
}