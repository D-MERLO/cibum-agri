import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        contrastColor: "var(--contrastColor)",
        contrastHover: "var(--hoverContrast)",
      },
      animation: {
        grow: "grow 2s infinite", // Define la animación "grow"
      },
      keyframes: {
        grow: {
          "0%, 100%": { transform: "scale(1)" }, // Tamaño original
          "50%": { transform: "scale(1.1)" }, // Crecimiento
        },
      },
    },
  },
  variants:{
      extend: {
        textColor: ['hover'],
      }
  },
  plugins: [],
} satisfies Config;

