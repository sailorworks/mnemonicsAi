"use client";

import React from "react";
import { Brain, Clock, History, Star } from "lucide-react";
import { motion } from "framer-motion";

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
    description:
      "Learn using acronyms, rhymes, and stories for better retention",
  },
];

const FeatureCards = () => {
  return (
    <div className="py-24 bg-secondary/30 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Why Choose MnemonicsAI?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Supercharge your learning with our powerful features designed to help
            you master any subject.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="p-6 bg-card border border-border/50 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeatureCards;
