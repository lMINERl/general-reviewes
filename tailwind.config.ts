/* eslint-disable prettier/prettier */

import { Config } from "tailwindcss";
const config: Config = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        gray: {
          1000: "#1A1A1A",
          800: "#2E2E2E",
          700: "#3C3C3C",
          600: "#484848",
          400: "#757575",
          300: "#989898",
          200: "#BABABA",
          50: "#FFFFFF",
        },
        primary: {
          700: "#2D2D2D",
        },

        // util-colors
        progress: "#3580DE",
        modalShade: "#050505",
        neutral: "#efc83d",
        processing: "#29D459",
        danger: "#D96464",
        warning: "#38a169",
      },
      fontFamily: {
        sans: ["Roboto", "Helvetica", "Arial", "sans-serif"],
      },
      spacing: {
        px: "1px",
        xs0: "0.8rem",
        xs1: "1rem",
        xs2: "1.2rem",
        xs3: "1.4rem",
        sm0: "1.6rem",
        md0: "2rem",
        md1: "2.4rem",
        md2: "2.6rem",
        lg0: "3.4rem",
        lg1: "3.6rem",
      },
      fontSize: {
        xs: ["1.2rem", { lineHeight: "1.6rem" }],
        sm: ["1.4rem", { lineHeight: "2rem" }],
        base: ["1.6rem", { lineHeight: "2.4rem" }],
        lg: ["1.8rem", { lineHeight: "2.8rem" }],
        xl: ["2rem", { lineHeight: "2.8rem" }],
        "2xl": ["2.4rem", { lineHeight: "3.2rem" }],
        "3xl": ["3rem", { lineHeight: "3.2rem" }],
        "4xl": ["3.6rem", { lineHeight: "3.6rem" }],
        "5xl": ["4.8rem", { lineHeight: "4rem" }],
        "6xl": ["6rem", { lineHeight: "1.6rem" }],
        "7xl": ["7.2rem", { lineHeight: "1.6rem" }],
        "8xl": ["9.6rem", { lineHeight: "1.6rem" }],
        "9xl": ["8rem", { lineHeight: "1.6rem" }],
      },
      fontWeight: {
        regular: 400,
      },
      borderRadius: {
        custom: "0.4 rem",
        roundedButton: "50px",
      },
      backgroundImage: {
        customGradient:
          "linear-gradient(270deg, rgba(56, 178, 172, 0.3) 0%, rgba(56, 178, 172, 0) 100%)",
      },
      width: {
        "1/10": "10%",
      },
    },
  },
  plugins: [],
};

export default config;
