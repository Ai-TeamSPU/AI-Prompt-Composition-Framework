/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#1F2933",
        panel: "#F7F8FA",
        line: "#CBD5E1"
      }
    }
  },
  plugins: []
};
