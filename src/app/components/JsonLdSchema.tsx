import React from "react";

const JsonLdSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": "https://mnemonicsai.com/#software",
        name: "MnemonicsAI - AI-Powered mnemonic generator",
        description:
          "Transform any list of words or concepts into memorable mnemonics instantly. Learn faster, retain longer.",
        applicationCategory: "EducationalApplication",
        operatingSystem: "Any",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
        },
        features: [
          "AI-powered mnemonic generation",
          "Create mnemonics from letters or words",
          "Spaced repetition learning",
          "Memorization aids for students",
          "Memory tricks for studying",
          "Smart study aids",
          "Automatic mnemonic generation",
        ],
        audience: {
          "@type": "EducationalAudience",
          educationalRole: [
            "Student",
            "Teacher",
            "Professional",
            "Lifelong Learner",
          ],
          audienceType: "Global",
        },
        browserRequirements: "Requires JavaScript. Requires HTML5.",
        softwareVersion: "1.0",
      },
      {
        "@type": "Organization",
        "@id": "https://mnemonicsai.com/#organization",
        name: "MnemonicsAI - AI-Powered mnemonic generator",
        url: "https://mnemonicsai.com",
        logo: {
          "@type": "ImageObject",
          url: "https://mnemonicsai.com/android-chrome-512x512.png",
          width: 512,
          height: 512,
        },
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "Customer Support",
          email: "sahilprasadroxxxx11@gmail.com",
        },
      },
      {
        "@type": "WebSite",
        "@id": "https://mnemonicsai.com/#website",
        name: "MnemonicsAI - AI-Powered mnemonic generator",
        description:
          "Transform any list of words or concepts into memorable mnemonics instantly. Learn faster, retain longer.",
        url: "https://mnemonicsai.com",
      },
      {
        "@type": "FAQPage",
        "@id": "https://mnemonicsai.com/#main-content",
        mainEntity: [
          {
            "@type": "Question",
            name: "How to use MnemonicsAI.com?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Here's the deal: Using MnemonicsAI is dead simple. Pop your words or concepts into the box, hit 'Generate Mnemonic,' and bam – your custom mnemonic is ready in seconds. You get five for free, and if you're hooked (you will be), sign in for unlimited access. Oh, and your dashboard? It keeps everything saved and ready when you are.",
            },
          },
          {
            "@type": "Question",
            name: "Why should you use MnemonicsAI.com?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Let's be real: memorising stuff can be a grind. MnemonicsAI flips the script. It's like having an AI-powered coach that crafts mnemonics tailored just for you – acronyms, stories, you name it. Want to learn complex list of words? This tool does the heavy lifting so you can focus on smashing your goals. Plus, it tracks your progress – because who doesn't love a bit of accountability?",
            },
          },
          {
            "@type": "Question",
            name: "Who should use MnemonicsAI.com?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "If you've got stuff to memorise, MnemonicsAI is your new best mate. Students cramming for exams, language learners tackling vocab mountains, medical pros memorising terminology – you name it. Whether you're a visual learner, or love a good story, MnemonicsAI adapts to you.",
            },
          },
        ],
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
