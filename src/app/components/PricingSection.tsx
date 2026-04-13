"use client";

import React from "react";
import { Check } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabase";

const PricingSection = () => {
  const router = useRouter();

  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
        },
      });
      if (error) throw error;
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const handleButtonClick = (planName: string) => {
    if (planName === "Free") {
      handleGoogleLogin();
    } else {
      router.push("/checkout");
    }
  };

  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for individual learners",
      features: [
        "Unlimited mnemonic generation",
        "Basic word lists",
        "Standard templates",
        "Email support",
      ],
      buttonText: "Get Started",
      highlighted: false,
    },
    {
      name: "Community",
      price: "$3",
      period: "per month",
      description: "Access to community features",
      features: [
        "All Free features",
        "Community mnemonics access",
        "Save favorite mnemonics",
        "Share with community",
        "Priority support",
      ],
      buttonText: "Start Trial",
      highlighted: true,
    },
  ];

  return (
    <div className="py-24 bg-background relative">
      <div className="absolute inset-0 bg-grid-slate-200 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:[mask-image:linear-gradient(0deg,black,rgba(0,0,0,0.6))] dark:bg-grid-slate-800 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600"
          >
            Simple Pricing
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-xl text-muted-foreground"
          >
            Choose the plan that fits your needs
          </motion.p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className={`rounded-2xl p-8 border ${
                plan.highlighted
                  ? "bg-card shadow-2xl border-primary ring-1 ring-primary relative overflow-hidden"
                  : "bg-card shadow-lg border-border"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-bl-lg">
                  POPULAR
                </div>
              )}
              <div className="text-center">
                <h3 className="text-2xl font-bold text-foreground">
                  {plan.name}
                </h3>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                  <span className="text-muted-foreground">/{plan.period}</span>
                </div>
                <p className="mt-4 text-muted-foreground">{plan.description}</p>
              </div>
              <ul className="mt-8 space-y-4">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <Check className="h-5 w-5 text-primary mr-3" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleButtonClick(plan.name)}
                className={`mt-8 w-full py-3 px-6 rounded-lg font-medium transition-colors ${
                  plan.highlighted
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                {plan.buttonText}
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingSection;
