// components/Particle.tsx
"use client";
import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadFull } from "tsparticles";

export default function Particle() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadFull(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  return (
    <>
      {init && (
        <Particles
          id="tsparticles"
          style={{
            zIndex: 1,
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
          options={{
            fpsLimit: 120,
            interactivity: {
              events: {
                onClick: { enable: true, mode: "push" },
                onHover: { enable: true, mode: "repulse" },
              },
              modes: {
                push: { quantity: 4 },
                repulse: { distance: 150, duration: 0.4 },
              },
            },
            particles: {
              color: { value: "#39FF14" },
              links: {
                color: "#FF007F",
                distance: 100,
                enable: true,
                opacity: 0.7,
                width: 1,
              },
              move: {
                direction: "none",
                enable: true,
                outModes: { default: "bounce" },
                random: false,
                speed: 1.5,
                straight: false,
              },
              number: { density: { enable: true }, value: 160 },
              opacity: { value: 0.6 },
              shape: { type: "circle" },
              size: { value: { min: 1, max: 5 } },
            },
            detectRetina: true,
          }}
        />
      )}
    </>
  );
}