import React, { useState } from "react";
import { Book, ArrowRight, Lightbulb } from "lucide-react";

const examples = [
  {
    context: "Periodic Table Elements",
    prompt:
      "Hydrogen (H), Helium (He), Lithium (Li), Beryllium (Be), Boron (B), Carbon (C), Nitrogen (N), Oxygen (O), Fluorine (F), and Neon (Ne)",
    mnemonic: "Hi Hello Listen B B C News On Friday Night",
    icon: <Book className="w-6 h-6" />,
  },
  {
    context: "Taxonomy Hierarchy",
    prompt: "Kingdom, Phylum, Class, Order, Family, Genus, Species",
    mnemonic: "Keep Pots Clean, Otherwise Family Gets Sick",
    icon: <Book className="w-6 h-6" />,
  },
  {
    context: "Thermodynamic Derivatives",
    prompt:
      "G = Gibbs free energy, P = pressure, H = enthalpy, S = entropy, U = internal energy, V = volume, F = Helmholtz free energy, T = temperature",
    mnemonic: "Good Physicists Have Studied Under Very Fine Teachers",
    icon: <Book className="w-6 h-6" />,
  },
];

const ExamplesSection = () => {
  const [activeExample, setActiveExample] = useState(0);

  return (
    <div className="py-24 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            See MnemonicsAI in Action
          </h2>
          <p className="mt-4 text-muted-foreground">
            Discover how our AI transforms complex information into memorable
            mnemonics
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {examples.map((example, index) => (
            <div
              key={index}
              className={`mb-8 transform transition-all duration-300 ${
                activeExample === index
                  ? "scale-100 opacity-100"
                  : "scale-95 opacity-50"
              }`}
            >
              <button
                onClick={() => setActiveExample(index)}
                className={`w-full text-left p-6 rounded-xl transition-all duration-200 border ${
                  activeExample === index
                    ? "bg-primary/5 border-primary shadow-md"
                    : "bg-secondary border-transparent hover:bg-secondary/80"
                }`}
              >
                <div className="flex items-start space-x-4">
                  <div
                    className={`p-3 rounded-lg ${
                      activeExample === index
                        ? "bg-primary/20 text-primary"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <Lightbulb className="w-6 h-6" />
                  </div>

                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {example.context}
                    </h3>

                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          Input:
                        </p>
                        <p className="text-foreground">{example.prompt}</p>
                      </div>

                      {activeExample === index && (
                        <div className="animate-fade-in">
                          <div className="flex items-center space-x-2 mb-2">
                            <ArrowRight className="w-4 h-4 text-primary" />
                            <p className="text-sm font-medium text-muted-foreground">
                              Generated Mnemonic:
                            </p>
                          </div>
                          <p className="text-lg font-medium text-primary">
                            {example.mnemonic}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </button>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground">
            Try it yourself with your own content!
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="mt-4 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            Generate Your Mnemonic
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExamplesSection;
