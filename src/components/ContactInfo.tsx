import { useTranslationStore } from "@/stores/translationStore";

export default function ContactInfo() {
  const { t } = useTranslationStore();

  return (
    <div className="bg-dark-blue/50 rounded-lg p-8 shadow-lg border border-neon-blue/20">
      <h2 className="text-3xl font-semibold text-neon-pink mb-6">
        {t("Contact.myInfo")}
      </h2>
      <ul className="space-y-4 text-neon-blue">
        <li>
          <strong>Email:</strong>{" "}
          <a href="mm" className="hover:text-neon-pink">
            Jorgesoares2997@gmail.com
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
          <a
            href="https://wa.me/5581987594291"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-neon-pink"
          >
            (+55) 81 98759-4291
          </a>
        </li>
      </ul>
    </div>
  );
}
