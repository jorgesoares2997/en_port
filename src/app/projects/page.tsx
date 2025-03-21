"use client";
import { useTranslationStore } from "@/stores/translationStore";
import SectionRightText from "@/components/SectionRightText";
import SectionLeftText from "@/components/SectionLeftText";

interface Project {
  title: string;
  description: string;
  videoUrl?: string;
  link?: string;
  videoOptional?: string;
  bgColor: string;
}

export default function Projects() {
  const { t } = useTranslationStore();

  const projects: Project[] = [
    {
      title: t("Projects.project1.title"),
      description: t("Projects.project1.description"),
      videoUrl: "https://port-bu.s3.amazonaws.com/weather-video.mp4",
      link: "https://weather-seven-weld.vercel.app",
      bgColor: "bg-dark-blue/60",
    },
    {
      title: t("Projects.project2.title"),
      description: t("Projects.project2.description"),
      videoUrl: "https://port-bu.s3.eu-north-1.amazonaws.com/comprasapp.mp4",
      bgColor: "bg-neon-pink/60",
      link: "https://compras-sand.vercel.app",
    },
    {
      title: t("Projects.comprasApp.title"),
      description: t("Projects.comprasApp.description"),
      videoUrl: "https://port-bu.s3.eu-north-1.amazonaws.com/flutter.mp4",
      bgColor: "bg-dark-blue/60",
      link: "https://audioibpapp.web.app",
      videoOptional:"max-w-80 m-auto"
    },
  ];

  return (
    <div className="min-h-screen">
      <h1 className="text-5xl md:text-6xl font-bold text-neon-green mb-12 text-center pt-16 animate-fade-in">
        {t("Projects.title")}
      </h1>
      {projects.map((project, index) =>
        index % 2 === 0 ? (
          <SectionRightText
            key={index}
            title={project.title}
            description={project.description}
            videoUrl={project.videoUrl}
            bgColor={project.bgColor}
            link={project.link}
            videoOptional={project.videoOptional}
          />
        ) : (
          <SectionLeftText
            key={index}
            title={project.title}
            description={project.description}
            videoUrl={project.videoUrl}
            bgColor={project.bgColor}
            link={project.link}
          />
        )
      )}
    </div>
  );
}
