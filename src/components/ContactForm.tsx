"use client";
import { useState, useEffect } from "react";
import { useTranslationStore } from "@/stores/translationStore";
import { useAuthStore } from "@/stores/authStore";
import { useSearchParams } from "next/navigation";
import SocialButton from "./SocialButton";
import axios from "axios";

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface SocialProvider {
  id: string;
  loginEndpoint: string;
}

export default function ContactForm() {
  const { t } = useTranslationStore();
  const { setToken } = useAuthStore();
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [isSending, setIsSending] = useState(false);

  const socialProviders: SocialProvider[] = [
    { id: "linkedin", loginEndpoint: "/linkedin/login" },
    { id: "github", loginEndpoint: "/github/login" },
    { id: "google", loginEndpoint: "/google/login" },
    { id: "apple", loginEndpoint: "/apple/login" },
    { id: "whatsapp", loginEndpoint: "/whatsapp/login" },
  ];

  useEffect(() => {
    const tokenFromUrl = searchParams.get("token");
    const state = searchParams.get("state");
    if (tokenFromUrl && state) {
      setToken(tokenFromUrl);
      const [name, email, message] = atob(state).split("|");
      setFormData({ name, email, message });
      sendMessage("auto", tokenFromUrl);
    }
  }, [searchParams, setToken]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSendWithProvider = (provider: SocialProvider) => {
    window.location.href = `https://compras-auth.onrender.com/api/auth${
      provider.loginEndpoint
    }?name=${encodeURIComponent(formData.name)}&email=${encodeURIComponent(
      formData.email
    )}&message=${encodeURIComponent(formData.message)}`;
  };

  const sendMessage = async (providerId: string, authToken: string) => {
    setIsSending(true);
    try {
      const endpoint =
        providerId === "whatsapp" ? "/send-whatsapp" : "/send-email";
      const payload =
        providerId === "whatsapp"
          ? {
              to: "+5581987594291",
              message: `Mensagem de ${formData.name} (${formData.email}): ${formData.message}`,
            }
          : {
              from: formData.email,
              to: "jorge@example.com",
              cc: formData.email,
              subject: `Contato do Portfólio - ${formData.name}`,
              body: `Nome: ${formData.name}\nEmail: ${formData.email}\nMensagem: ${formData.message}`,
            };

      const response = await axios.post(
        `https://compras-auth.onrender.com${endpoint}`,
        payload,
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );

      if (response.status === 200) {
        alert(
          providerId === "whatsapp"
            ? "Mensagem enviada via WhatsApp!"
            : t("Contact.successMessage")
        );
        setFormData({ name: "", email: "", message: "" });
      }
    } catch (error) {
      console.error(`Erro ao enviar via ${providerId}:`, error);
      alert(t("Contact.errorMessage"));
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="bg-dark-blue/50 rounded-lg p-8 shadow-lg border border-neon-blue/20">
      <h2 className="text-3xl font-semibold text-neon-pink mb-6">
        {t("Contact.sendMessage")}
      </h2>
      <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label htmlFor="name" className="block text-neon-blue mb-2">
            {t("Contact.form.name")}
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="w-full p-3 bg-dark-bg text-neon-blue border border-neon-blue/20 rounded-md focus:outline-none focus:border-neon-pink"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-neon-blue mb-2">
            {t("Contact.form.email")}
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="w-full p-3 bg-dark-bg text-neon-blue border border-neon-blue/20 rounded-md focus:outline-none focus:border-neon-pink"
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-neon-blue mb-2">
            {t("Contact.form.message")}
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            required
            rows={5}
            className="w-full p-3 bg-dark-bg text-neon-blue border border-neon-blue/20 rounded-md focus:outline-none focus:border-neon-pink"
          />
        </div>
        <div className="flex flex-wrap gap-4 justify-center">
          {socialProviders.map((provider) => (
            <SocialButton
              key={provider.id}
              provider={provider.id}
              onClick={() => handleSendWithProvider(provider)}
              disabled={isSending}
            />
          ))}
        </div>
      </form>
    </div>
  );
}
