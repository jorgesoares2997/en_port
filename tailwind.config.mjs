// tailwind.config.mjs
export default {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "neon-green": "#39FF14",
        "neon-pink": "#FF007F",
        "neon-blue": "#00DDEB",
        "dark-blue": "#1E3A8A",
        "dark-bg": "#1A1A1A",
      },
    },
  },
  plugins: [],
};
