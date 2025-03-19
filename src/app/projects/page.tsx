"use client";
import { useTranslationStore } from "@/stores/translationStore";
import SectionRightText from "@/components/SectionRightText";

interface Project {
  title: string;
  description: string;
  videoUrl?: string;
  link?: string;
  bgColor: string;
}

export default function Projects() {
  const { t } = useTranslationStore();

  const projects: Project[] = [
    {
      title: t("Projects.project1.title"),
      description: t("Projects.project1.description"),
      videoUrl:
        "https://port-bu.s3.eu-north-1.amazonaws.com/weather-video.mp4?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZ24ISQYTZDR25FSS%2F20250319%2Feu-north-1%2Fs3%2Faws4_request&X-Amz-Date=20250319T151236Z&X-Amz-Expires=300&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB8aCmV1LW5vcnRoLTEiRjBEAiBrQxdq1GgW3ctUgZomZVp70wQwu1qTNKF9kvQzIRWtQQIgIwKvEzxZndlwlMNwAEV3BV673LzWQh53w1jFj39rej0q6AIIeBAAGgw2NzYyMDY5MDQ4NzEiDCHy0EPpFLHVwz4e3CrFAuipq6%2FBWWIkyXZ22zNV7Cf%2BEXkpburF2bhgjUKT%2Fwz%2FzAvNzeiqixgVXbRI%2BepNX1ZyJxHpCF5RV0w3yrcxabWkqpuk1iO0%2BP2fWhoSS9O4aw8K3c0Aq4Rb%2F7XTZE253jvpSFw5TpGmvQzQlweyq2g4bPPZ6g9weyrFSVaq78EzLb5eC4E6Lm5OMOe0GhDx9ecYf9tIIIzUdqQycG8IOxnaEVWt%2B7mmqYwiuC7DLz81dKJ4g5hu98zZueZ7D6aqO3H64JL1EnrAt%2BNH8ZtCEawRXNO%2Fy26MNR2zsKnKB1NKeq7bGlq4CFPGSuShjE3FQpfjdqbzI1%2BILY%2Fg5hGhbx1ZXAEaYof3AJm5AwxdgWG%2Bh%2BAH7AbMIwPm9fmPOa0SOKJKZgzk1BXlsuPRPblUrxpC469UnOju%2BPWz55GiXacqq1S18xowjqvrvgY6tALKWXHFYZcJzOSvW5XJ8CO%2Faj%2BfFIHoVfM%2B%2FJfW%2FZ1hcFw2r9TUwIdA2lXnMCroCPf9CvWGj6Yu%2BEqF3gTI7btO1xiO2ju7lpoGN2t1cCkjQeUvOBIrjK3o%2F8Kw%2BCC6USceKr%2B9xlQ%2FzoUzCD1tAtS99%2B5tntmb0SgMMeZNMJb%2B0oJeFlqgLH%2FvsK5L67NOox0K4uzBGANDOooFYDhu3CQ92cOujXLjmcWxsgA0%2BsoyXjOaA0ryjxOpw0XlvAet5vFwmY1BP78QSY4YlKixpTTJ%2FmChhYTvBR%2FUTp4w6ahI9QWSs2AdnTLEbqws0GXnMvnY7LtkuYRndo%2BYQtRPLvjCLUU7poVFej5ig2FrNjICPDkDbgKk8EWUIVUCOV1Okg%2F%2FR21ikqqyh3gua%2BK9iNh3sVSACQ%3D%3D&X-Amz-Signature=c3a8d2605d15f6e3016dd7048f367af84dc901d8e007cd1503da9ebc78676c6f&X-Amz-SignedHeaders=host&response-content-disposition=inline",
      link: "https://weather-seven-weld.vercel.app",
      bgColor: "bg-dark-blue/60",
    },
    {
      title: t("Projects.project1.title"),
      description: t("Projects.project1.description"),
      videoUrl: "s3://port-bu/weather-video.mp4", // Vídeo hospedado no S3
      link: "https://weather-seven-weld.vercel.app",
      bgColor: "bg-dark-blue/60",
    },
    {
      title: t("Projects.project1.title"),
      description: t("Projects.project1.description"),
      videoUrl: "s3://port-bu/weather-video.mp4", // Vídeo hospedado no S3
      link: "https://weather-seven-weld.vercel.app",
      bgColor: "bg-dark-blue/60",
    },
    // Adicione mais projetos aqui no futuro
  ];

  return (
    <div className="min-h-screen">
      <h1 className="text-5xl md:text-6xl font-bold text-neon-green mb-12 text-center pt-16 animate-fade-in">
        {t("Projects.title")}
      </h1>
      {projects.map((project, index) => (
        <SectionRightText
          key={index}
          title={project.title}
          description={`${project.description} ${
            project.link ? project.link : ""
          }`}
          videoUrl={project.videoUrl}
          bgColor={project.bgColor}
          link={project.link}
        />
      ))}
    </div>
  );
}
