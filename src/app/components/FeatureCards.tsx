"use client";

import React from "react";
import { Brain, Clock, History, Star } from "lucide-react";

const features = [
  {
    icon: <Brain className="w-6 h-6" />,
    title: "AI-Powered Learning",
    description:
      "Advanced algorithms create memorable mnemonics tailored to your learning style",
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: "Save Time",
    description: "Generate effective memory aids in seconds instead of hours",
  },
  {
    icon: <History className="w-6 h-6" />,
    title: "Track Progress",
    description: "Save and revisit your generated mnemonics anytime",
  },
  {
    icon: <Star className="w-6 h-6" />,
    title: "Multiple Formats",
    description: "Get acronyms, rhymes, and stories for better retention",
  },
];

const FeatureCards = () => {
  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900">
            Why Choose MnemonicAI?
          </h2>
          <p className="mt-4 text-gray-600">
            Supercharge your learning with our powerful features
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 bg-gray-50 rounded-xl hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600 mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeatureCards;
