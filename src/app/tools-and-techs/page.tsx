"use client";
import { useTranslationStore } from "@/stores/translationStore";
import SectionLeftText from "@/components/SectionLeftText";
import SectionRightText from "@/components/SectionRightText";

interface Tech {
  title: string;
  description: string;
  videoUrl?: string;
  imageUrl?: string;
  form?: boolean;
  flags?: boolean;
  weatherDemo?: boolean; // Novo prop para demo de clima
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
      flags: true,
    },
    {
      title: t("ToolsAndTechs.tech3.title"),
      description: t("ToolsAndTechs.tech3.description"),
      imageUrl: "https://port-bu.s3.eu-north-1.amazonaws.com/docker.webp",
    },
    {
      title: t("ToolsAndTechs.tech4.title"),
      description: t("ToolsAndTechs.tech4.description"),
      weatherDemo: true, // Ativa o demo de clima
    },
    {
      title: t("ToolsAndTechs.tech5.title"),
      description: t("ToolsAndTechs.tech5.description"),
      imageUrl: "https://port-bu.s3.eu-north-1.amazonaws.com/bucket.jpg",
    },
    {
      title: t("ToolsAndTechs.tech6.title"),
      description: t("ToolsAndTechs.tech6.description"),
    },
    {
      title: t("ToolsAndTechs.tech7.title"),
      description: t("ToolsAndTechs.tech7.description"),
    },
    {
      title: t("ToolsAndTechs.tech8.title"),
      description: t("ToolsAndTechs.tech8.description"),
    },
  ];
  const bgColors = [
    "bg-dark-blue/60",
    "bg-neon-pink/60",
    "bg-dark-blue/60",
    "bg-neon-pink/60",
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
            imageUrl={tech.imageUrl}
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
            weatherDemo={tech.weatherDemo}
          />
        )
      )}
    </div>
  );
}
