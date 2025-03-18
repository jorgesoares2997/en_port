"use client";
import { useTranslationStore } from "@/stores/translationStore";
import ProjectSectionLeftText from "@/components/ProjectSectionLeftText";
import ProjectSectionRightText from "@/components/ProjectSectionRightText";

interface Project {
  title: string;
  description: string;
  videoUrl: string;
}

export default function Projects() {
  const { t } = useTranslationStore();

  const projects: Project[] = [
    {
      title: "Projeto 1: Sistema de Compras",
      description:
        "Um sistema de compras online com autenticação social e envio de emails, desenvolvido com Next.js e Spring Boot.",
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", // Vídeo de exemplo
    },
    {
      title: "Projeto 2: Dashboard Interativo",
      description:
        "Um dashboard para visualização de dados em tempo real, usando React e WebSocket.",
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", // Vídeo de exemplo
    },
    {
      title: "Projeto 3: Chatbot Inteligente",
      description:
        "Um chatbot alimentado por IA para suporte ao cliente, integrado com APIs externas.",
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", // Vídeo de exemplo
    },
    {
      title: "Projeto 4: Aplicativo de Tarefas",
      description:
        "Um gerenciador de tarefas com sincronização em nuvem e interface amigável.",
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", // Vídeo de exemplo
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
        {t("Projects.title")}
      </h1>
      {projects.map((project, index) =>
        index % 2 === 0 ? (
          <ProjectSectionLeftText
            key={index}
            title={project.title}
            description={project.description}
            videoUrl={project.videoUrl}
            bgColor={bgColors[index]}
          />
        ) : (
          <ProjectSectionRightText
            key={index}
            title={project.title}
            description={project.description}
            videoUrl={project.videoUrl}
            bgColor={bgColors[index]}
          />
        )
      )}
    </div>
  );
}
