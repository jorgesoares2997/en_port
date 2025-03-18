// src/app/contact/page.tsx
"use client";
import { useTranslationStore } from "@/stores/translationStore";
import ContactInfo from "@/components/ContactInfo";
import ContactForm from "@/components/ContactForm";

export default function Contact() {
  const { t } = useTranslationStore();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
      <h1 className="text-5xl md:text-6xl font-bold text-neon-green mb-12 text-center animate-fade-in">
        {t("Contact.title")}
      </h1>

      <p className="text-lg text-neon-blue mb-8 text-center max-w-3xl mx-auto">
        {t("Contact.techDescription")} To send a message, choose a platform
        below. You will need to log in via social authentication (this is just a
        demo of the tool—no real messages are sent yet!).
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ContactInfo isLoggedIn={false} />
        <ContactForm />
      </div>
    </div>
  );
}
