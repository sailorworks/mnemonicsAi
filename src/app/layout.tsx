import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { AuthProvider } from "./contexts/AuthContext";
import { Toaster } from "sonner";
import JsonLdSchema from "./components/JsonLdSchema"; // Ensure this matches the actual filename.
import GoogleAnalytics from "./components/GoogleAnalytics";

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
  metadataBase: new URL("https://mnemonicsai.com"),
  title: {
    default: "MnemonicsAI - AI-Powered mnemonic generator",
    template: "%s | MnemonicsAI - Smart Memory Enhancement Tools",
  },
  description:
    "Transform your learning experience with AI-powered mnemonics, spaced repetition, and smart memory techniques. Perfect for students, professionals, and lifelong learners seeking effective memorization tools.",
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
    "memory improvement tools",
    "AI memory tools",
    "artificial intelligence learning",
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
    title: "Create Memorable Mnemonics Instantly with AI",
    description:
      "Transform any list or information into memorable mnemonics. Perfect for studying, learning, and remembering important information.",
    images: [
      {
        url: "/og-image.png", // Next.js will automatically prefix with your domain
        width: 1200,
        height: 630,
        alt: "MnemonicsAI - AI-Powered Mnemonic Generator",
      },
    ],
    siteName: "MnemonicsAI",
  },
  twitter: {
    card: "summary_large_image",
    title: "Remember everything with AI-powered mnemonics",
    description:
      "Transform any list of words or concepts into memorable mnemonics instantly. Learn faster, retain longer.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
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
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" type="image/svg+xml" href="/mnemonicsai.jpg" />
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
  );
}
