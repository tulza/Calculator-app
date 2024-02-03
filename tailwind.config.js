/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontSize: {
      sm: "0.750rem",
      base: "1rem",
      xl: "1.333rem",
      "2xl": "1.777rem",
      "3xl": "2.369rem",
      "4xl": "3.158rem",
      "5xl": "4.210rem",
    },
    extend: {
      colors: {
        Background: "var(--background)",
        Toggle: "var(--toggle)",
        Screen: "var(--screen)",
        Keypad: "var(--keypad)",

        Text: "var(--text)",
        KeyText: "var(--key-text)",
        FuncKey: "var(--key-function)",
        EqualText: "var(--equal-text)",

        Key: "var(--key)",
        KeyShadow: "var(--key-shadow)",

        Key2: "var(--key2)",
        KeyShadow2: "var(--key-shadow2)",

        Key3: "var(--key3)",
        KeyShadow3: "var(--key-shadow3)",
      },
      screens: {},
      transitionProperty: {},
    },
  },
  plugins: [],
};
