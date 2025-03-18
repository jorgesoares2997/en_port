// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ClientParticle from "@/components/ClientParticle";
import { LanguageProvider } from "./contexts/LanguageContext";

export const metadata: Metadata = {
  title: "My Neon Next App",
  description: "A disruptive neon-themed Next.js project",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt">
      {" "}
      {/* Idioma padrão fixo ou pode ser dinâmico */}
      <body className="min-h-screen flex flex-col bg-dark-bg text-neon-blue">
        <LanguageProvider>
          <ClientParticle />
          <Navbar />
          <main className="flex-grow pt-16 relative z-10">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
