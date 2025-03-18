// src/components/SocialButton.tsx
import {
  FaLinkedin,
  FaGithub,
  FaGoogle,
  FaApple,
  FaWhatsapp,
} from "react-icons/fa";

interface SocialButtonProps {
  provider: string;
  onClick: () => void;
  disabled: boolean;
}

export default function SocialButton({
  provider,
  onClick,
  disabled,
}: SocialButtonProps) {
  const icons = {
    linkedin: <FaLinkedin />,
    github: <FaGithub />,
    google: <FaGoogle />,
    apple: <FaApple />,
    whatsapp: <FaWhatsapp />,
  };

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="bg-neon-blue text-dark-bg p-3 rounded-md font-semibold hover:bg-neon-pink hover:text-neon-blue transition-colors disabled:opacity-50 flex items-center justify-center w-12 h-12"
    >
      {icons[provider as keyof typeof icons]}
    </button>
  );
}
