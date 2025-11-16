"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "How to use MnemonicsAI.com?",
    answer:
      "Here’s the deal: Using MnemonicsAI is dead simple. Pop your words or concepts into the box, hit 'Generate Mnemonic,' and bam – your custom mnemonic is ready in seconds. You get five for free, and if you're hooked (you will be), sign in for unlimited access. Oh, and your dashboard? It keeps everything saved and ready when you are.",
  },
  {
    question: "Why should you use MnemonicsAI.com?",
    answer:
      "Let’s be real: memorising stuff can be a grind. MnemonicsAI flips the script. It’s like having an AI-powered coach that crafts mnemonics tailored just for you – acronyms, stories, you name it. Want to learn complex list of words? This tool does the heavy lifting so you can focus on smashing your goals. Plus, it tracks your progress – because who doesn’t love a bit of accountability? ",
  },
  {
    question: "Who should use MnemonicsAI.com?",
    answer:
      "If you’ve got stuff to memorise, MnemonicsAI is your new best mate. Students cramming for exams, language learners tackling vocab mountains, medical pros memorising terminology – you name it. Whether you’re a visual learner, or love a good story, MnemonicsAI adapts to you.",
  },
];

export const FAQList = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="max-w-3xl mx-auto">
      {faqs.map((faq, index) => (
        <div key={index} className="mb-4">
          <button
            className="w-full flex items-center justify-between p-6 bg-white rounded-xl hover:shadow-md transition-all duration-200 ease-in-out"
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
          >
            <div className="flex items-center">
              <HelpCircle className="w-5 h-5 text-indigo-600 mr-4" />
              <span className="text-left text-lg font-semibold text-gray-900">
                {faq.question}
              </span>
            </div>
            <ChevronDown
              className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                openIndex === index ? "transform rotate-180" : ""
              }`}
            />
          </button>

          <div
            className={`overflow-hidden transition-all duration-200 ease-in-out ${
              openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="p-6 bg-white border-t border-gray-100 rounded-b-xl">
              <p className="text-gray-600">{faq.answer}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
