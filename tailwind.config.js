/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        gradient: "linear-gradient(135deg, #f761a1 0%, #8c1bab 100%)",
        sally:
          "url('./assets/sally-mobile.png'), linear-gradient(135deg, #f761a1 0%, #8c1bab 100%)",
        "sally-desktop":
          "url('./assets/try-again.png'), linear-gradient(135deg, #f761a1 0%, #8c1bab 100%)",
      },
      backgroundPosition: {
        "tr-3": "top -400% right",
        "tr-6": "111% 40%",
      },
      fontSize: {
        "2.25xl": "26px",
        md: "13px",
      },
      colors: {
        "black-800": "#1C1C1E",
        gray: "#F7F8F9",
        "gray-100": "#8998A9",
        "gray-200": "#566576",
      },
    },
  },
  plugins: [],
};
