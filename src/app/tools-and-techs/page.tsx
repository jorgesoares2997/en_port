"use client";
import { useTranslationStore } from "@/stores/translationStore";
import SectionLeftText from "@/components/SectionLeftText";
import SectionRightText from "@/components/SectionRightText";

interface Tech {
  title: string;
  description: string;
  videoUrl?: string;
  form?: boolean;
  flags?: boolean; // Novo prop para bandeiras
}

export default function ToolsAndTechs() {
  const { t } = useTranslationStore();

  const techs: Tech[] = [
    {
      title: t("ToolsAndTechs.tech1.title"),
      description: t("ToolsAndTechs.tech1.description"),
      form: true,
    },
    {
      title: t("ToolsAndTechs.tech2.title"),
      description: t("ToolsAndTechs.tech2.description"),
      flags: true, // Ativa as bandeiras na seção Intl
    },
    {
      title: t("ToolsAndTechs.tech3.title"),
      description: t("ToolsAndTechs.tech3.description"),
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    },
    {
      title: t("ToolsAndTechs.tech4.title"),
      description: t("ToolsAndTechs.tech4.description"),
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    },
  ];
  const bgColors = [
    "bg-dark-blue/60",
    "bg-neon-pink/60",
    "bg-dark-blue/60",
    "bg-neon-pink/60",
  ];

  return (
    <div className="min-h-screen">
      <h1 className="text-5xl md:text-6xl font-bold text-neon-green mb-12 text-center pt-16 animate-fade-in">
        {t("ToolsAndTechs.title")}
      </h1>
      {techs.map((tech, index) =>
        index % 2 === 0 ? (
          <SectionLeftText
            key={index}
            title={tech.title}
            description={tech.description}
            videoUrl={tech.videoUrl}
            bgColor={bgColors[index]}
            form={tech.form}
          />
        ) : (
          <SectionRightText
            key={index}
            title={tech.title}
            description={tech.description}
            videoUrl={tech.videoUrl}
            bgColor={bgColors[index]}
            flags={tech.flags}
          />
        )
      )}
    </div>
  );
}
