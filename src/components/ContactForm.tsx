"use client";
import { useState } from "react";
import { useTranslationStore } from "@/stores/translationStore";
import axios from "axios";

interface FormData {
  name: string;
  email: string;
  message: string;
}

export default function ContactForm() {
  const { t } = useTranslationStore();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [isSending, setIsSending] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    try {
      const payload = {
        to: "jorgesoares2997@gmail.com", // Seu email fixo como destinatário
        subject: `Contato do Portfólio - ${formData.name}`,
        body: `Nome: ${formData.name}\nEmail: ${formData.email}\nMensagem: ${formData.message}`,
      };

      const response = await axios.post(
        "https://api-mail-sw48.onrender.com/api/public/emails", // URL da sua API pública
        payload
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

  return (
    <div className="bg-dark-blue/50 rounded-lg p-8 shadow-lg border border-neon-blue/20">
      <h2 className="text-3xl font-semibold text-neon-pink mb-6">
        {t("Contact.sendMessage")}
      </h2>
      <form className="space-y-6" onSubmit={handleSubmit}>
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
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={isSending}
            className={`px-6 py-3 rounded-md text-white font-semibold ${
              isSending
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-neon-pink hover:bg-neon-pink/80"
            } transition-colors`}
          >
            {isSending ? t("Contact.sending") : t("Contact.send")}
          </button>
        </div>
      </form>
    </div>
  );
}
