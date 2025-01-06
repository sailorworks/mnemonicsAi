import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./sanity/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "none",
            color: "#374151",
            a: {
              color: "#2563eb",
              "&:hover": {
                color: "#1d4ed8",
              },
            },
            h1: {
              color: "#111827",
            },
            h2: {
              color: "#111827",
            },
            h3: {
              color: "#111827",
            },
            h4: {
              color: "#111827",
            },
            strong: {
              color: "#111827",
            },
            blockquote: {
              color: "#4B5563",
            },
            code: {
              color: "#111827",
            },
            figcaption: {
              color: "#6B7280",
            },
            "ul > li::marker": {
              color: "#374151",
            },
            "ol > li::marker": {
              color: "#374151",
            },
          },
        },
      },
    },
  },
  plugins: [typography],
} satisfies Config;
