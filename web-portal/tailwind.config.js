/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        "primary-blue": "#0000FF",
        text: "#000000",
        "primary-button": "#487d89",
        "secondary-button": "#fcfdfd",
        blueShades: {
          text: "#336699",
          background: "#EDF2F8",
        },
        greenShades: {
          text: "#006633",
          background: "#EAF5EB",
        },
        redShades: {
          text: "#990000",
          background: "#F9EAEA",
        },
        yellowShades: {
          text: "#996600",
          background: "#FDF4E5",
        },
        purpleShades: {
          text: "#663366",
          background: "#F5EDF5",
        },
        orangeShades: {
          text: "#994C00",
          background: "#FDF4E9",
        },
        accent: "#518c9a",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        "filter-hide": {
          "0%": {
            transform: "translateX(0%)",
          },
          "90%": {
            transform: "translateX(-120%)",
          },
          "100%": {
            display: "none",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "filter-hide": "filter-hide 0.3s ease-out forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};