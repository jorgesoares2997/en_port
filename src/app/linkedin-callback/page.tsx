"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LinkedInCallback() {
  const router = useRouter();

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get("code");
    if (code) {
      // Redireciona para o backend com o código
      window.location.href = `http://localhost:8080/api/auth/linkedin/callback?code=${code}`;
    } else {
      router.push("/contact");
    }
  }, [router]);

  return <div>Redirecionando...</div>;
}
