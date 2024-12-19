import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { AuthProvider } from "./contexts/AuthContext";
import { Toaster } from "sonner";
import JsonLdSchema from "./components/JsonLdSchema"; // Ensure this matches the actual filename.

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
    default: "MnemonicsAI - AI-Powered Memory & Learning Techniques",
    template: "%s | MnemonicsAI - Smart Memory Enhancement Tools",
  },
  description:
    "Transform your learning experience with AI-powered mnemonics, spaced repetition, and smart memory techniques. Perfect for students, professionals, and lifelong learners seeking effective memorization tools.",
  keywords: [
    "memory techniques",
    "mnemonic devices",
    "AI learning tools",
    "spaced repetition",
    "memorization tricks",
    "study techniques",
    "memory improvement",
    "smart study tools",
    "educational technology",
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
