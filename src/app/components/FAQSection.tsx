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

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="py-24 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-muted-foreground">
            Everything you need to know about using MnemonicsAI
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div key={index} className="mb-4">
              <button
                className="w-full flex items-center justify-between p-6 bg-card border border-border rounded-xl hover:shadow-md transition-all duration-200 ease-in-out"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <div className="flex items-center text-left">
                  <HelpCircle className="w-5 h-5 text-primary mr-4 flex-shrink-0" />
                  <span className="text-lg font-semibold text-foreground">
                    {faq.question}
                  </span>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-muted-foreground transition-transform duration-200 flex-shrink-0 ml-4 ${
                    openIndex === index ? "transform rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-200 ease-in-out ${
                  openIndex === index
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="p-6 bg-card border-x border-b border-border rounded-b-xl">
                  <p className="text-muted-foreground">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQSection;
