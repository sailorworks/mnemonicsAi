"use client";

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

export const ExamplesList = () => {
  const [activeExample, setActiveExample] = useState(0);

  return (
    <>
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
              className={`w-full text-left p-6 rounded-xl transition-all duration-200 ${
                activeExample === index
                  ? "bg-indigo-50 shadow-md"
                  : "bg-gray-50 hover:bg-gray-100"
              }`}
            >
              <div className="flex items-start space-x-4">
                <div
                  className={`p-3 rounded-lg ${
                    activeExample === index
                      ? "bg-indigo-100 text-indigo-600"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  <Lightbulb className="w-6 h-6" />
                </div>

                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {example.context}
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Input:
                      </p>
                      <p className="text-gray-700">{example.prompt}</p>
                    </div>

                    {activeExample === index && (
                      <div className="animate-fade-in">
                        <div className="flex items-center space-x-2 mb-2">
                          <ArrowRight className="w-4 h-4 text-indigo-600" />
                          <p className="text-sm font-medium text-gray-500">
                            Generated Mnemonic:
                          </p>
                        </div>
                        <p className="text-lg font-medium text-indigo-600">
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
        <p className="text-gray-600">Try it yourself with your own content!</p>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="mt-4 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Generate Your Mnemonic
        </button>
      </div>
    </>
  );
};
