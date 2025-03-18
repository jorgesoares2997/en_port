// src/app/contact/page.tsx
"use client";
import { useState } from "react";
import { useTranslationStore } from "@/stores/translationStore";
import {
  FaLinkedin,
  FaGithub,
  FaGoogle,
  FaApple,
  FaWhatsapp,
} from "react-icons/fa";

import axios from "axios";
import { useAuthStore } from "@/stores/authStore";

export default function Contact() {
  const { t } = useTranslationStore();
  const { token, setToken } = useAuthStore();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSending, setIsSending] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSocialLogin = async (provider: string) => {
    try {
      const response = await axios.post(
        "https://reports-api-ru9g.onrender.com/auth/login",
        {
          provider, // Simulação: em produção, envie credenciais reais
          token: `${provider}-simulated-token`, // Substitua por token OAuth real
        }
      );
      const { jwt } = response.data; // Assume que a API retorna um campo "jwt"
      setToken(jwt);
      setIsLoggedIn(true);
      alert(`Logado com ${provider}!`);
    } catch (error) {
      console.error(`Erro ao logar com ${provider}:`, error);
      alert(t("Contact.errorMessage"));
    }
  };

  const handleSubmit = async (provider: string) => {
    if (!token) {
      alert(`Por favor, faça login primeiro!${provider}`);
      return;
    }
    setIsSending(true);

    try {
      const response = await axios.post(
        "https://reports-api-ru9g.onrender.com/send-email",
        {
          from: formData.email,
          to: "jorge@example.com",
          cc: formData.email,
          subject: `Contato do Portfólio - ${formData.name}`,
          body: `Nome: ${formData.name}\nEmail: ${formData.email}\nMensagem: ${formData.message}`,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        alert(t("Contact.successMessage"));
        setFormData({ name: "", email: "", message: "" });
      }
    } catch (error) {
      console.error("Erro ao enviar email:", error);
      alert(t("Contact.errorMessage"));
    } finally {
      setIsSending(false);
    }
  };

  const handleWhatsApp = async () => {
    if (!token) {
      alert("Por favor, faça login primeiro!");
      return;
    }
    try {
      const response = await axios.post(
        "https://reports-api-ru9g.onrender.com/send-whatsapp",
        {
          to: "+5581987594291",
          message: `Mensagem de ${formData.name} (${formData.email}): ${formData.message}`,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        alert("Mensagem enviada via WhatsApp!");
      }
    } catch (error) {
      console.error("Erro ao enviar WhatsApp:", error);
      alert(t("Contact.errorMessage"));
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
      <h1 className="text-5xl md:text-6xl font-bold text-neon-green mb-12 text-center animate-fade-in">
        {t("Contact.title")}
      </h1>

      <p className="text-lg text-neon-blue mb-8 text-center max-w-3xl mx-auto">
        {t("Contact.techDescription")}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Card de Informações de Contato */}
        <div className="bg-dark-blue/50 rounded-lg p-8 shadow-lg border border-neon-blue/20">
          <h2 className="text-3xl font-semibold text-neon-pink mb-6">
            {t("Contact.myInfo")}
          </h2>
          <ul className="space-y-4 text-neon-blue">
            <li>
              <strong>Email:</strong>{" "}
              <a
                href="mailto:jorge@example.com"
                className="hover:text-neon-pink"
              >
                jorge@example.com
              </a>
            </li>
            <li>
              <strong>LinkedIn:</strong>{" "}
              <a
                href="https://www.linkedin.com/in/jorge-soares-18b667204/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-neon-pink"
              >
                Jorge Soares
              </a>
            </li>
            <li>
              <strong>GitHub:</strong>{" "}
              <a
                href="https://github.com/jorgesoares2997"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-neon-pink"
              >
                jorgesoares2997
              </a>
            </li>
            <li>
              <strong>WhatsApp:</strong>{" "}
              {isLoggedIn ? (
                <a
                  href="https://wa.me/5581987594291"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-neon-pink"
                >
                  (+55) 81 98759-4291
                </a>
              ) : (
                <span>{t("Contact.loginToWhatsApp")}</span>
              )}
            </li>
          </ul>
        </div>

        {/* Formulário de Envio */}
        <div className="bg-dark-blue/50 rounded-lg p-8 shadow-lg border border-neon-blue/20">
          <h2 className="text-3xl font-semibold text-neon-pink mb-6">
            {t("Contact.sendMessage")}
          </h2>
          <form className="space-y-6">
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
              <button
                type="button"
                onClick={() => handleSocialLogin("linkedin")}
                disabled={isSending}
                className="bg-neon-green text-dark-bg px-4 py-2 rounded-md font-semibold hover:bg-neon-pink hover:text-neon-blue transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                Login via
                <span>
                  <FaLinkedin />
                </span>
              </button>
              <button
                type="button"
                onClick={() => handleSocialLogin("github")}
                disabled={isSending}
                className="bg-neon-green text-dark-bg px-4 py-2 rounded-md font-semibold hover:bg-neon-pink hover:text-neon-blue transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                Login via
                <span>
                  <FaGithub />
                </span>
              </button>
              <button
                type="button"
                onClick={() => handleSocialLogin("google")}
                disabled={isSending}
                className="bg-neon-green text-dark-bg px-4 py-2 rounded-md font-semibold hover:bg-neon-pink hover:text-neon-blue transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                Login via
                <span>
                  <FaGoogle />
                </span>
              </button>
              <button
                type="button"
                onClick={() => handleSocialLogin("apple")}
                disabled={isSending}
                className="bg-neon-green text-dark-bg px-4 py-2 rounded-md font-semibold hover:bg-neon-pink hover:text-neon-blue transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                Login via
                <span>
                  <FaApple />
                </span>
              </button>
            </div>
            <div className="flex flex-wrap gap-4 justify-center">
              <button
                type="button"
                onClick={() => handleSubmit("linkedin")}
                disabled={isSending || !token}
                className="bg-neon-blue text-dark-bg px-4 py-2 rounded-md font-semibold hover:bg-neon-pink hover:text-neon-blue transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                Send using{" "}
                <span>
                  <FaLinkedin />
                </span>
              </button>
              <button
                type="button"
                onClick={() => handleSubmit("github")}
                disabled={isSending || !token}
                className="bg-neon-blue text-dark-bg px-4 py-2 rounded-md font-semibold hover:bg-neon-pink hover:text-neon-blue transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                Send using{" "}
                <span>
                  <FaGithub />
                </span>
              </button>
              <button
                type="button"
                onClick={() => handleSubmit("google")}
                disabled={isSending || !token}
                className="bg-neon-blue text-dark-bg px-4 py-2 rounded-md font-semibold hover:bg-neon-pink hover:text-neon-blue transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                Send using{" "}
                <span>
                  <FaGoogle />
                </span>
              </button>
              <button
                type="button"
                onClick={() => handleSubmit("apple")}
                disabled={isSending || !token}
                className="bg-neon-blue text-dark-bg px-4 py-2 rounded-md font-semibold hover:bg-neon-pink hover:text-neon-blue transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                Send using{" "}
                <span>
                  <FaApple />
                </span>
              </button>
              <button
                type="button"
                onClick={handleWhatsApp}
                disabled={isSending || !token}
                className="bg-neon-blue text-dark-bg px-4 py-2 rounded-md font-semibold hover:bg-neon-pink hover:text-neon-blue transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                Send via
                <span>
                  <FaWhatsapp />
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
