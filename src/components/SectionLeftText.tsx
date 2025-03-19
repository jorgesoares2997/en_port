"use client";
import { useTranslationStore } from "@/stores/translationStore";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import { FaArrowAltCircleRight } from "react-icons/fa";

interface SectionProps {
  title: string;
  description: string;
  videoUrl?: string;
  imageUrl?: string; // Novo prop para imagem estática
  bgColor: string;
  form?: boolean;
  link?: string;
}

export default function SectionLeftText({
  title,
  description,
  videoUrl,
  imageUrl,
  bgColor,
  form = false,
  link,
}: SectionProps) {
  const { t } = useTranslationStore();
  const [formData, setFormData] = useState({ to: "", subject: "", body: "" });
  const [status, setStatus] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.to.includes("@") || !formData.to.includes(".")) {
      setStatus(t("Form.invalidEmail"));
      setTimeout(() => setStatus(null), 3000);
      return;
    }

    setStatus(t("Form.sending"));
    try {
      const response = await axios.post(
        "https://compras-auth.onrender.com/api/email/send",
        null,
        { params: formData }
      );
      setStatus(`${t("Form.success")}${response}`);
      setFormData({ to: "", subject: "", body: "" });
      setTimeout(() => setStatus(null), 3000);
    } catch (error) {
      const axiosError = error as AxiosError;
      setStatus(
        t("Form.error") + (axiosError.response?.data || axiosError.message)
      );
      setTimeout(() => setStatus(null), 3000);
    }
  };

  return (
    <section className={`${bgColor} py-16`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="text-neon-blue">
          <h2 className="text-4xl font-bold text-neon-green mb-4">{title}</h2>
          <p className="text-lg">{description}</p>
          <a href={link} target="_blank">
            <FaArrowAltCircleRight />
          </a>
        </div>
        <div>
          {form ? (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <input
                  type="email"
                  name="to"
                  value={formData.to}
                  onChange={handleInputChange}
                  placeholder={t("Form.toPlaceholder")}
                  required
                  className="w-full p-2 bg-dark-bg text-neon-blue border border-neon-blue/20 rounded-md focus:outline-none focus:border-neon-pink text-sm"
                />
              </div>
              <div>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder={t("Form.subjectPlaceholder")}
                  required
                  className="w-full p-2 bg-dark-bg text-neon-blue border border-neon-blue/20 rounded-md focus:outline-none focus:border-neon-pink text-sm"
                />
              </div>
              <div>
                <textarea
                  name="body"
                  value={formData.body}
                  onChange={handleInputChange}
                  placeholder={t("Form.bodyPlaceholder")}
                  required
                  rows={3}
                  className="w-full p-2 bg-dark-bg text-neon-blue border border-neon-blue/20 rounded-md focus:outline-none focus:border-neon-pink text-sm"
                />
              </div>
              <button
                type="submit"
                className="w-full py-1.5 bg-neon-green text-dark-blue font-bold rounded-md hover:bg-neon-pink transition-colors text-sm"
              >
                {t("Form.submitButton")}
              </button>
              {status && (
                <p className="text-center text-neon-blue text-sm">
                  {status === t("Form.sending") ? (
                    <>
                      {status}{" "}
                      <span className="animate-spin inline-block">⏳</span>
                    </>
                  ) : (
                    status
                  )}
                </p>
              )}
            </form>
          ) : imageUrl ? (
            <img
              src={imageUrl}
              alt={title}
              className="w-full rounded-lg shadow-lg border border-neon-blue/20 object-cover"
            />
          ) : (
            videoUrl && (
              <video
                src={videoUrl}
                autoPlay
                loop
                muted
                className="w-full rounded-lg shadow-lg border border-neon-blue/20"
              />
            )
          )}
        </div>
      </div>
    </section>
  );
}
