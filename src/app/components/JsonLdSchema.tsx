// src/app/components/JsonLdSchema.tsx
import React from "react";

const JsonLdSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": "https://mnemonicsai.com/#software",
        name: "MnemonicsAI",
        description:
          "Transform any list of words or concepts into memorable mnemonics instantly using AI. Learn faster, retain longer.",
        applicationCategory: "EducationalApplication",
        operatingSystem: "Any",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
          description: "Free tier with 5 mnemonic generations",
        },
        features: [
          "AI-powered mnemonic generation",
          "Instant memorization techniques",
          "Learning enhancement tools",
          "Spaced repetition support",
        ],
      },
      {
        "@type": "Organization",
        "@id": "https://mnemonicsai.com/#organization",
        name: "MnemonicsAI",
        url: "https://mnemonicsai.com",
        logo: {
          "@type": "ImageObject",
          url: "https://mnemonicsai.com/mnemonicsAi.svg",
        },
      },
      {
        "@type": "WebSite",
        "@id": "https://mnemonicsai.com/#website",
        url: "https://mnemonicsai.com",
        name: "MnemonicsAI",
        publisher: {
          "@id": "https://mnemonicsai.com/#organization",
        },
        description: "AI-powered memory enhancement and learning tools",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export default JsonLdSchema;
