/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    // screens: {
    //   lt: "400px",
    //   sm: "600px",
    //   md: "728px",
    //   lg: "984px",
    //   xl: "1140px",
    //   "2xl": "1296px",
    // },
    variants: {
      extend: {},
    },
    extend: {
      colors: {
        mainColor: "#00B3A8",
        bgColor: "#f1f3f3",
        textColor: "#6f7977",
        bgHelper: "rgba(48,74,230,.08)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    container: {
      screens: {
        lt: "400px",
        sm: "600px",
        md: "728px",
        lg: "984px",
        xl: "1140px",
        "2xl": "1296px",
      },
    },
  },
  plugins: [],
};
