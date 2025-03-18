// src/app/api/login/route.ts
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { provider, token } = await request.json();
    // Simulação de login (substitua por integração real com OAuth/WhatsApp API)
    if (provider === "whatsapp" && token) {
      return NextResponse.json(
        { success: true, message: "Logged in" },
        { status: 200 }
      );
    }
    return NextResponse.json(
      { error: "Invalid provider or token" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Erro na API de login:", error);
    return NextResponse.json({ error: "Login failed" }, { status: 401 });
  }
}
