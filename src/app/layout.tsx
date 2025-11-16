import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { AuthProvider } from "./contexts/AuthContext";
import { Toaster } from "sonner";
import JsonLdSchema from "./components/JsonLdSchema";
import GoogleAnalytics from "./components/GoogleAnalytics";
import { LingoProvider, loadDictionary } from "lingo.dev/react/rsc";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  // ... your metadata remains unchanged
  metadataBase: new URL("https://mnemonicsai.com"),
  title: {
    default: "MnemonicsAI - AI-Powered mnemonic generator",
    template: "%s | MnemonicsAI - Generate mnemonics with AI",
  },
  description:
    "Transform any list of words or concepts into memorable mnemonics instantly. Learn faster, retain longer.",
  keywords: [
    "mnemonic generator",
    "create mnemonics",
    "mnemonic devices",
    "AI mnemonic maker",
    "memory techniques",
    "free mnemonic maker",
    "memory tricks that work",
    "study mnemonics",
    "medical mnemonics",
    "learning mnemonics",
    "smart study aids",
    "AI-powered mnemonics",
    "Generate mnemonics with AI",
    "AI-generated mnemonics",
    "ai statement generator",
    "how to remember lists easily",
    "create memory devices online",
    "automatic mnemonic generator",
    "Generate unlimited mnemonics for free",
    "how are mnemonics created",
    "mnemonic maker that makes sense",
    "how to learn using mnemonics",
    "how to study using mnemonics",
    "how to remember lists",
    "mnemonic generator from letters that makes sense",
    "mnemonic generator for kids",
    "using mnemonics to improve your memory",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://mnemonicsai.com",
  },
  openGraph: {
    type: "website",
    url: "https://mnemonicsai.com",
    title: "AI-Powered mnemonic generator",
    description:
      "Transform any list of words or concepts into memorable mnemonics instantly. Learn faster, retain longer.",
    images: [
      {
        url: "https://mnemonicsai.com/og-image.png",
        width: 1200,
        height: 536,
        alt: "MnemonicsAI - AI-Powered Mnemonic Generator",
      },
    ],
    siteName: "MnemonicsAI - AI-Powered mnemonic generator",
  },
  twitter: {
    card: "summary_large_image",
    title: "Remember everything with AI-powered mnemonics",
    description:
      "Transform any list of words or concepts into memorable mnemonics instantly. Learn faster, retain longer.",
    images: ["https://mnemonicsai.com/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <LingoProvider loadDictionary={(locale) => loadDictionary(locale)}>
      <html
        lang="en"
        suppressHydrationWarning
        itemScope
        itemType="https://schema.org/WebApplication"
      >
        <head>
          <JsonLdSchema />
          <meta name="application-name" content="MnemonicsAI" />
          <meta name="format-detection" content="telephone=no" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="msapplication-TileColor" content="#0a0a0a" />
          <meta name="msapplication-tap-highlight" content="no" />
          <meta name="theme-color" content="#0a0a0a" />

          {/* Icons and Favicons */}
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="96x96"
            href="/favicon-96x96.png"
          />
          <link rel="icon" type="image/svg+xml" href="/mnemonics.svg" />
          <link rel="icon" type="image/x-icon" href="/mnemonics.ico" />

          {/* Android Icons */}
          <link
            rel="icon"
            type="image/png"
            sizes="192x192"
            href="/android-chrome-192x192.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="512x512"
            href="/android-chrome-512x512.png"
          />

          {/* Web Manifest */}
          <link rel="manifest" href="/site.webmanifest" />

          <GoogleAnalytics GA_MEASUREMENT_ID="G-ZD02CQFRPP" />
        </head>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
          itemScope
          itemType="https://schema.org/WebPage"
        >
          <AuthProvider>{children}</AuthProvider>
          <Toaster richColors position="top-center" />
        </body>
      </html>
    </LingoProvider>
  );
}
