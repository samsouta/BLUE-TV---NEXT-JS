/** @type {import('tailwindcss').Config} */
import { heroui } from "@heroui/react";
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // fontFamily: {
      //   montserrat: ['Montserrat', 'italic'],
      //   openSans: ['Open Sans', 'sans-serif'],
      //   poppins: ['Poppins', 'sans-serif'],
      //   sigmarOneRegular: ['Sigmar One','cursive'],
      // },
    },
  },
  darkMode: "class",
  plugins: [heroui()],
};
