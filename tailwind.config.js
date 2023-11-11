/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        Aubergine: "#4A154B",
        Horchata: "#F4EDE4",
        Black: "#1D1C1D",
        White: "#FFFFFF",
        SlackBlue: "#36C5F0",
        SlackGreen: "#2EB67D",
        SlackYellow: "#ECB22E",
        SlackRed: "#E01E5A",
      },
      fontFamily: {
        lato: ["Lato", "sans-serif"],
      },
      fontSize: {
        h1: "clamp(1.5rem, 1.184rem + 1.579vw, 2.25rem)",
        h2: "clamp(1.25rem, 0.987rem + 1.316vw, 1.875rem)",
        h3: "clamp(1.125rem, 0.967rem + 0.789vw, 1.5rem)",
        h4: "clamp(1rem, 0.842rem + 0.789vw, 1.375rem)",
        h5: "clamp(0.875rem, 0.717rem + 0.789vw, 1.25rem)",
        h6: "clamp(0.75rem, 0.592rem + 0.789vw, 1.125rem)",
        body: "clamp(1rem, 0.947rem + 0.263vw, 1.125rem)",
        button: "clamp(0.875rem, 0.77rem + 0.526vw, 1.125rem)",
        input: "clamp(0.875rem, 0.822rem + 0.263vw, 1rem)",
      },
    },
  },
  plugins: [],
};
