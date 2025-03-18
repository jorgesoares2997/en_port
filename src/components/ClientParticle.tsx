// src/components/ClientParticle.tsx
"use client";
import dynamic from "next/dynamic";

const ParticleComponent = dynamic(() => import("./Particles"), {
  ssr: false,
});

export default function ClientParticle() {
  return <ParticleComponent />;
}
