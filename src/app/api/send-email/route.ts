// src/app/api/send-email/route.ts
import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();
    const token = request.headers.get("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 });
    }

    const emailData = {
      from: email,
      to: "jorgesoares2997@gmail.com",
      cc: email,
      subject: `Contato do Portfólio - ${name}`,
      body: `Nome: ${name}\nEmail: ${email}\nMensagem: ${message}`,
    };

    const response = await axios.post(
      "https://reports-api-ru9g.onrender.com/send-email",
      emailData,
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200) {
      return NextResponse.json({ success: true }, { status: 200 });
    } else {
      throw new Error("Erro ao enviar email via JavaMail API");
    }
  } catch (error) {
    console.error("Erro na API de envio de email:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}