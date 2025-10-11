/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,jsx,ts,tsx}", // ajuste conforme a estrutura do seu projeto
    ],
    theme: {
      extend: {
        // Fontes
        fontFamily: {
           inter: ["'Inter'", "sans-serif"],
        },
        scale: {
            'hover-scale': '1.05', // define o valor de escala
          },
  
        // Cores personalizadas
        colors: {
          primary: "#0b0b0f",
          accent: "#00ffff",
        },
  
        // 🔹 Animações personalizadas
        keyframes: {
          "fade-down": {
            "0%": { opacity: "0", transform: "translateY(-20px)" },
            "100%": { opacity: "1", transform: "translateY(0)" },
          },
          "pulse-soft": {
            "0%, 100%": { transform: "scale(1)" },
            "50%": { transform: "scale(1.05)" },
          },
          "bounce-soft": {
            "0%, 20%, 50%, 80%, 100%": { transform: "translateY(0)" },
            "40%": { transform: "translateY(-10px)" },
            "60%": { transform: "translateY(-5px)" },
          },
          "pulse-hover": {
            '0%, 100%': { transform: 'scale(1)' },
            '50%': { transform: 'scale(1.05)' },
          },
          "hover-bounce": {
            "0%": { transform: "scale(1)" },
            "100%": { transform: "scale(1.1)" },
          },
        },
        animation: {
          "fade-down": "fade-down 0.75s ease forwards",
          "pulse-soft": "pulse-soft 2s ease-in-out infinite",
          "bounce-soft": "bounce-soft 2s ease-in-out infinite",
          "pulse-hover": "pulse-hover 0.6s ease-in-out",
          "hover-bounce": "hover-bounce 0.3s ease-in-out",
        },
      },
    },
    plugins: [],
  };
  